import Anthropic from "@anthropic-ai/sdk";
import { FieldValue } from "firebase-admin/firestore";
import { ALLOWED_IMAGE_TYPES, MAX_IMAGE_BYTES, type AllowedImageType } from "@/lib/analysis";
import { analyzeChart, AnalysisRefusedError } from "@/lib/claude";
import { adminAuth, adminDb } from "@/lib/firebase-admin";

export const maxDuration = 120;

const error = (message: string, status: number) => Response.json({ error: message }, { status });

export async function POST(request: Request) {
  const token = request.headers.get("authorization")?.replace(/^Bearer /, "");
  if (!token) return error("Non authentifié.", 401);

  let uid: string;
  try {
    uid = (await adminAuth.verifyIdToken(token)).uid;
  } catch {
    return error("Session expirée, reconnectez-vous.", 401);
  }

  const form = await request.formData();
  const image = form.get("image");
  const note = String(form.get("note") ?? "").trim().slice(0, 500);

  if (!(image instanceof File)) return error("Aucune image reçue.", 400);
  if (!ALLOWED_IMAGE_TYPES.includes(image.type as AllowedImageType)) {
    return error("Format non supporté (PNG, JPEG, WebP ou GIF).", 400);
  }
  if (image.size > MAX_IMAGE_BYTES) return error("Image trop lourde (5 Mo maximum).", 400);

  const userRef = adminDb.collection("users").doc(uid);
  const userSnap = await userRef.get();
  if ((userSnap.get("credits") ?? 0) < 1) return error("Plus de crédits d'analyse disponibles.", 402);

  let result: Awaited<ReturnType<typeof analyzeChart>>;
  try {
    const base64 = Buffer.from(await image.arrayBuffer()).toString("base64");
    result = await analyzeChart(base64, image.type as AllowedImageType, note || undefined);
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
      const credits = (await tx.get(userRef)).get("credits") ?? 0;
      if (charged && credits < 1) throw new Error("NO_CREDITS");
      if (charged) tx.update(userRef, { credits: FieldValue.increment(-1) });
      tx.set(analysisRef, {
        ...result.analysis,
        note: note || null,
        model: result.model,
        createdAt: FieldValue.serverTimestamp(),
      });
    });
  } catch (err) {
    if (err instanceof Error && err.message === "NO_CREDITS") {
      return error("Plus de crédits d'analyse disponibles.", 402);
    }
    throw err;
  }

  return Response.json({ id: analysisRef.id, analysis: result.analysis, charged });
}
