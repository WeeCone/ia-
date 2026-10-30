import { FieldValue } from "firebase-admin/firestore";
import type { AllowedImageType, ChartAnalysis } from "@/lib/analysis";
import { recordActivity } from "@/lib/activity";
import { adminBucket, adminDb } from "@/lib/firebase-admin";
import { macroContext } from "@/lib/macro";
import { availableCredits, creditPeriod, hasNewsSide, periodFor } from "@/lib/plans";
import { PREVIEW_TTL_MS } from "@/lib/preview";
import { getRequestUid } from "@/lib/server-auth";
import { monthSpend } from "@/lib/usage-cost";
import { DICTIONARIES } from "@/i18n/dictionaries";
import { requestLocale } from "@/i18n/server";

export const maxDuration = 120;

const error = (message: string, status: number) => Response.json({ error: message }, { status });

/**
 * After payment: the analysis the visitor previewed becomes theirs, for one credit, like any analysis. For Pro and
 * À vie the news side is gathered now (the preview had none). 404 / 410 tell the dashboard to run the chart afresh.
 */
export async function POST(request: Request) {
  const locale = requestLocale(request);
  const text = DICTIONARIES[locale].api;
  const uid = await getRequestUid(request);
  if (!uid) return error(text.sessionExpired, 401);

  const { id } = (await request.json().catch(() => ({}))) as { id?: unknown };
  if (typeof id !== "string" || !/^[A-Za-z0-9]{10,40}$/.test(id)) return error(text.failed, 404);

  const previewRef = adminDb.collection("previews").doc(id);
  const preview = await previewRef.get();
  if (!preview.exists) return error(text.failed, 404);
  const createdAt: number = preview.get("createdAt")?.toMillis?.() ?? 0;
  const claimedBy: string | null = preview.get("claimedBy") ?? null;
  if ((claimedBy && claimedBy !== uid) || Date.now() - createdAt > PREVIEW_TTL_MS) return error(text.failed, 410);

  const userRef = adminDb.collection("users").doc(uid);
  const userData = (await userRef.get()).data() ?? {};
  if (availableCredits(userData) < 1) return error(text.noCredits, 402);

  const stored = preview.get("analysis") as ChartAnalysis;
  const imagePath: string = preview.get("imagePath");
  const imageType = preview.get("imageType") as AllowedImageType;

  // The news side comes with Pro and À vie analyses, as for one run from the dashboard.
  let macro = { report: null as ChartAnalysis["macro"], costEur: 0 };
  if (hasNewsSide(userData.plan)) {
    try {
      const [bytes] = await adminBucket().file(imagePath).download();
      macro = await macroContext(bytes.toString("base64"), imageType, locale);
    } catch (err) {
      console.error("preview: news side skipped", err);
    }
  }
  const analysis: ChartAnalysis = { ...stored, macro: macro.report };

  const analysisRef = userRef.collection("analyses").doc();
  try {
    await adminDb.runTransaction(async (tx) => {
      const [user, current] = await Promise.all([tx.get(userRef), tx.get(previewRef)]);
      if (current.get("claimedBy")) throw new Error("CLAIMED");
      const data = user.data() ?? {};
      const credits = availableCredits(data);
      if (credits < 1) throw new Error("NO_CREDITS");
      // The preview's AI cost counts for this customer, like the analysis it becomes.
      const spent = monthSpend(data) + (preview.get("costEur") ?? 0) + macro.costEur;
      tx.update(userRef, { credits: credits - 1, creditsPeriod: periodFor(data.plan), spendEur: spent, spendPeriod: creditPeriod() });
      tx.set(analysisRef, { ...analysis, note: null, model: preview.get("model") ?? null, createdAt: FieldValue.serverTimestamp() });
      tx.update(previewRef, { claimedBy: uid, analysisId: analysisRef.id });
    });
  } catch (err) {
    if (err instanceof Error && err.message === "NO_CREDITS") return error(text.noCredits, 402);
    if (err instanceof Error && err.message === "CLAIMED") return error(text.failed, 410);
    throw err;
  }

  recordActivity(analysis);

  // The screenshot moves with it, so the history shows it annotated. Best effort: the analysis is already saved.
  const ownPath = `users/${uid}/analyses/${analysisRef.id}.${imageType.split("/")[1]}`;
  try {
    await adminBucket().file(imagePath).copy(adminBucket().file(ownPath));
    await analysisRef.update({ imagePath: ownPath });
  } catch (err) {
    console.error("preview screenshot copy failed", err);
  }

  return Response.json({ id: analysisRef.id, analysis, charged: true });
}
