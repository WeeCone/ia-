import Anthropic from "@anthropic-ai/sdk";
import { FieldValue } from "firebase-admin/firestore";
import { isAdminRequest } from "@/lib/admin-auth";
import { ALLOWED_IMAGE_TYPES, MAX_IMAGE_BYTES, type AllowedImageType } from "@/lib/analysis";
import { analyzeChart, AnalysisRefusedError } from "@/lib/claude";
import { availableCredits, creditPeriod } from "@/lib/plans";
import { adminBucket, adminDb } from "@/lib/firebase-admin";
import { getRequestUid } from "@/lib/server-auth";
import { TEST_ANALYSIS } from "@/lib/test-analysis";

export const maxDuration = 120;

const NO_CREDITS_MESSAGE = "Plus de crédits d'analyse disponibles.";

const error = (message: string, status: number) => Response.json({ error: message }, { status });

export async function POST(request: Request) {
  const uid = await getRequestUid(request);
  if (!uid) return error("Session expirée, reconnectez-vous.", 401);

  const form = await request.formData();
  const image = form.get("image");
  const note = String(form.get("note") ?? "").trim().slice(0, 500);

  if (!(image instanceof File)) return error("Aucune image reçue.", 400);
  if (!ALLOWED_IMAGE_TYPES.includes(image.type as AllowedImageType)) {
    return error("Format non supporté (PNG, JPEG, WebP ou GIF).", 400);
  }
  if (image.size > MAX_IMAGE_BYTES) return error("Image trop lourde (5 Mo maximum).", 400);

  // Admin test mode: canned report, no model call, no credit, nothing stored.
  if (form.get("test") === "1") {
    if (!(await isAdminRequest(request))) return error("Mode test réservé à l'administrateur.", 403);
    await new Promise((resolve) => setTimeout(resolve, 4000)); // lets the progress screen show
    return Response.json({ id: null, analysis: TEST_ANALYSIS, charged: false, test: true });
  }

  const userRef = adminDb.collection("users").doc(uid);
  const userSnap = await userRef.get();
  if (availableCredits(userSnap.data() ?? {}) < 1) return error(NO_CREDITS_MESSAGE, 402);

  let result: Awaited<ReturnType<typeof analyzeChart>>;
  const bytes = Buffer.from(await image.arrayBuffer());
  try {
    result = await analyzeChart(bytes.toString("base64"), image.type as AllowedImageType, note || undefined);
  } catch (err) {
    if (err instanceof AnalysisRefusedError) return error("L'IA n'a pas pu analyser cette image.", 422);
    if (err instanceof Anthropic.RateLimitError) return error("Service saturé, réessayez dans un instant.", 503);
    console.error("analyze failed", err);
    return error("L'analyse a échoué. Aucun crédit n'a été débité.", 502);
  }

  // Only charge for a usable chart; re-check credits inside the transaction to avoid double spending.
  const charged = result.analysis.is_chart;
  const analysisRef = userRef.collection("analyses").doc();
  try {
    await adminDb.runTransaction(async (tx) => {
      const credits = availableCredits((await tx.get(userRef)).data() ?? {});
      if (charged && credits < 1) throw new Error("NO_CREDITS");
      // Absolute write (not increment) so a lifetime monthly refill and the debit land together.
      if (charged) tx.update(userRef, { credits: credits - 1, creditsPeriod: creditPeriod() });
      tx.set(analysisRef, {
        ...result.analysis,
        note: note || null,
        model: result.model,
        createdAt: FieldValue.serverTimestamp(),
      });
    });
  } catch (err) {
    if (err instanceof Error && err.message === "NO_CREDITS") {
      return error(NO_CREDITS_MESSAGE, 402);
    }
    throw err;
  }

  // Keep the screenshot so the history can show it annotated again. Best effort: the analysis is already saved.
  if (result.analysis.is_chart) {
    const imagePath = `users/${uid}/analyses/${analysisRef.id}.${image.type.split("/")[1]}`;
    try {
      await adminBucket().file(imagePath).save(bytes, { contentType: image.type, resumable: false });
      await analysisRef.update({ imagePath });
    } catch (err) {
      console.error("screenshot upload failed", err);
    }
  }

  return Response.json({ id: analysisRef.id, analysis: result.analysis, charged });
}
