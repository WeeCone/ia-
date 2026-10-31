import Anthropic from "@anthropic-ai/sdk";
import { FieldValue } from "firebase-admin/firestore";
import type { AllowedImageType, ChartAnalysis, ChartPreview } from "@/lib/analysis";
import { recordActivity } from "@/lib/activity";
import { analyzeChart, AnalysisRefusedError } from "@/lib/claude";
import { adminBucket, adminDb } from "@/lib/firebase-admin";
import { macroContext } from "@/lib/macro";
import { availableCredits, budgetFor, creditPeriod, hasNewsSide, MAX_CALL_COST_EUR, periodFor, STARTER_MODEL } from "@/lib/plans";
import { PREVIEW_TTL_MS } from "@/lib/preview";
import { getRequestUid } from "@/lib/server-auth";
import { monthSpend } from "@/lib/usage-cost";
import { DICTIONARIES } from "@/i18n/dictionaries";
import { requestLocale } from "@/i18n/server";

export const maxDuration = 120;

const error = (message: string, status: number) => Response.json({ error: message }, { status });

/** The first reading the visitor saw, handed to the full analysis so the report stays consistent with it. */
const continuity = (preview: ChartPreview) =>
  `Une première lecture de ce graphique a déjà été montrée au client : tendance ${preview.trend}, « ${preview.summary} ». ` +
  "Reste cohérent avec elle, sauf si le graphique montre clairement autre chose ; dans ce cas, dis pourquoi dans la synthèse.";

/**
 * After payment: the full report is made from the screenshot the visitor previewed, for one credit like any analysis
 * (on the plan's model, with the news side for Pro and À vie). 404 / 410 tell the dashboard to run the chart afresh.
 */
export async function POST(request: Request) {
  const locale = requestLocale(request);
  const text = DICTIONARIES[locale].api;
  const uid = await getRequestUid(request);
  if (!uid) return error(text.sessionExpired, 401);

  const { id } = (await request.json().catch(() => ({}))) as { id?: unknown };
  if (typeof id !== "string" || !/^[A-Za-z0-9]{10,40}$/.test(id)) return error(text.failed, 404);

  const previewRef = adminDb.collection("previews").doc(id);
  const snapshot = await previewRef.get();
  // Previews made before the free reading went light hold no first reading: those run afresh.
  const preview = snapshot.get("preview") as ChartPreview | undefined;
  if (!snapshot.exists || !preview) return error(text.failed, 404);
  const createdAt: number = snapshot.get("createdAt")?.toMillis?.() ?? 0;
  const claimedBy: string | null = snapshot.get("claimedBy") ?? null;
  if ((claimedBy && claimedBy !== uid) || Date.now() - createdAt > PREVIEW_TTL_MS) return error(text.failed, 410);

  const userRef = adminDb.collection("users").doc(uid);
  const userData = (await userRef.get()).data() ?? {};
  if (availableCredits(userData) < 1) return error(text.noCredits, 402);
  if (monthSpend(userData) + MAX_CALL_COST_EUR > budgetFor(userData.plan)) return error(text.budget, 402);

  const imagePath: string = snapshot.get("imagePath");
  const imageType = snapshot.get("imageType") as AllowedImageType;
  const [bytes] = await adminBucket().file(imagePath).download();
  const image = bytes.toString("base64");

  // The news side runs alongside (Pro and À vie); it never throws and its cost counts in every case.
  const macroPromise = hasNewsSide(userData.plan) ? macroContext(image, imageType, locale) : Promise.resolve({ report: null, costEur: 0 });
  let result: Awaited<ReturnType<typeof analyzeChart>>;
  try {
    result = await analyzeChart(image, imageType, continuity(preview), locale, userData.plan === "starter" ? STARTER_MODEL : undefined);
  } catch (err) {
    const macro = await macroPromise;
    const spent = macro.costEur + (err instanceof AnalysisRefusedError ? err.costEur : 0);
    await userRef.set({ spendEur: monthSpend(userData) + spent, spendPeriod: creditPeriod() }, { merge: true }).catch(() => {});
    if (err instanceof AnalysisRefusedError) return error(text.refused, 422);
    if (err instanceof Anthropic.RateLimitError) return error(text.busy, 503);
    console.error("preview claim: analysis failed", err);
    return error(text.failed, 502);
  }
  const macro = await macroPromise;
  const analysis: ChartAnalysis = { ...result.analysis, macro: result.analysis.is_chart ? macro.report : null };

  const analysisRef = userRef.collection("analyses").doc();
  try {
    await adminDb.runTransaction(async (tx) => {
      const [user, current] = await Promise.all([tx.get(userRef), tx.get(previewRef)]);
      if (current.get("claimedBy")) throw new Error("CLAIMED");
      const data = user.data() ?? {};
      const credits = availableCredits(data);
      if (credits < 1) throw new Error("NO_CREDITS");
      // The free reading's cost counts for this customer too, with the report it led to.
      const spent = monthSpend(data) + (snapshot.get("costEur") ?? 0) + result.costEur + macro.costEur;
      const charged = analysis.is_chart;
      tx.update(userRef, {
        ...(charged ? { credits: credits - 1, creditsPeriod: periodFor(data.plan) } : {}),
        spendEur: spent,
        spendPeriod: creditPeriod(),
      });
      tx.set(analysisRef, { ...analysis, note: null, model: result.model, createdAt: FieldValue.serverTimestamp() });
      tx.update(previewRef, { claimedBy: uid, analysisId: analysisRef.id });
    });
  } catch (err) {
    if (err instanceof Error && err.message === "NO_CREDITS") return error(text.noCredits, 402);
    if (err instanceof Error && err.message === "CLAIMED") return error(text.failed, 410);
    throw err;
  }

  if (analysis.is_chart) recordActivity(analysis);

  // The screenshot moves with it, so the history shows it annotated. Best effort: the analysis is already saved.
  const ownPath = `users/${uid}/analyses/${analysisRef.id}.${imageType.split("/")[1]}`;
  try {
    await adminBucket().file(imagePath).copy(adminBucket().file(ownPath));
    await analysisRef.update({ imagePath: ownPath });
  } catch (err) {
    console.error("preview screenshot copy failed", err);
  }

  return Response.json({ id: analysisRef.id, analysis, charged: analysis.is_chart });
}
