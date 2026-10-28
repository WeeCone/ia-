import Anthropic from "@anthropic-ai/sdk";
import { FieldValue } from "firebase-admin/firestore";
import { isAdminRequest } from "@/lib/admin-auth";
import { ALLOWED_IMAGE_TYPES, MAX_IMAGE_BYTES, type AllowedImageType } from "@/lib/analysis";
import { analyzeChart, AnalysisRefusedError } from "@/lib/claude";
import { macroContext } from "@/lib/macro";
import { availableCredits, creditPeriod, MAX_CALL_COST_EUR, MONTHLY_BUDGET_EUR } from "@/lib/plans";
import { adminBucket, adminDb } from "@/lib/firebase-admin";
import { getRequestUid } from "@/lib/server-auth";
import { recordActivity } from "@/lib/activity";
import { TEST_ANALYSIS } from "@/lib/test-analysis";
import { monthSpend } from "@/lib/usage-cost";
import { DICTIONARIES } from "@/i18n/dictionaries";
import { requestLocale } from "@/i18n/server";

export const maxDuration = 120;

const error = (message: string, status: number) => Response.json({ error: message }, { status });

export async function POST(request: Request) {
  // The report and every message come back in the customer's language.
  const locale = requestLocale(request);
  const text = DICTIONARIES[locale].api;
  const uid = await getRequestUid(request);
  if (!uid) return error(text.sessionExpired, 401);

  const form = await request.formData();
  const image = form.get("image");
  const note = String(form.get("note") ?? "")
    .trim()
    .slice(0, 500);

  if (!(image instanceof File)) return error(text.noImage, 400);
  if (!ALLOWED_IMAGE_TYPES.includes(image.type as AllowedImageType)) {
    return error(text.badFormat, 400);
  }
  if (image.size > MAX_IMAGE_BYTES) return error(text.tooLarge, 400);

  // Admin test mode: canned report, no model call, no credit, nothing stored.
  if (form.get("test") === "1") {
    if (!(await isAdminRequest(request))) return error(text.testOnly, 403);
    await new Promise((resolve) => setTimeout(resolve, 4000)); // lets the progress screen show
    return Response.json({ id: null, analysis: TEST_ANALYSIS, charged: false, test: true });
  }

  const userRef = adminDb.collection("users").doc(uid);
  const userSnap = await userRef.get();
  const userData = userSnap.data() ?? {};
  if (availableCredits(userData) < 1) return error(text.noCredits, 402);
  // Hard monthly ceiling on AI spend per customer, whatever the credits say. The admin is exempt.
  if (monthSpend(userData) + MAX_CALL_COST_EUR > MONTHLY_BUDGET_EUR && !(await isAdminRequest(request))) {
    return error(text.budget, 402);
  }

  let result: Awaited<ReturnType<typeof analyzeChart>>;
  const bytes = Buffer.from(await image.arrayBuffer());
  const startedAt = Date.now();
  // The news side comes with the trial's analysis only (and for the admin, to check it). It runs alongside the chart
  // reading (no extra wait) and never throws; its cost counts in every case.
  const inTrial = typeof userData.trialEndsAt === "number" && userData.trialEndsAt > Date.now();
  const withMacro = inTrial || (await isAdminRequest(request).catch(() => false));
  const macroPromise = withMacro
    ? macroContext(bytes.toString("base64"), image.type as AllowedImageType, locale)
    : Promise.resolve({ report: null, costEur: 0 });
  try {
    result = await analyzeChart(bytes.toString("base64"), image.type as AllowedImageType, note || undefined, locale);
  } catch (err) {
    // Not awaited: the error answers at once, the news side's cost is recorded when it ends.
    void macroPromise.then((macro) => recordSpend(userRef, macro.costEur));
    if (err instanceof AnalysisRefusedError) {
      await recordSpend(userRef, err.costEur);
      return error(text.refused, 422);
    }
    if (err instanceof Anthropic.RateLimitError) return error(text.busy, 503);
    // What really failed (API status and message, or the error itself) and how long the call ran: in the logs for
    // everyone, and appended to the message for the admin so a failure can be diagnosed from the dashboard.
    const seconds = Math.round((Date.now() - startedAt) / 1000);
    const detail =
      err instanceof Anthropic.APIError ? `API ${err.status ?? "?"} : ${err.message}` : err instanceof Error ? err.message : String(err);
    console.error("analyze failed", { seconds, detail, err });
    // Kept for the admin "Analyses" tab, so failures can be read without the hosting logs.
    await adminDb
      .collection("analysisErrors")
      .add({ uid, seconds, detail: detail.slice(0, 500), createdAt: FieldValue.serverTimestamp() })
      .catch(() => {});
    const admin = await isAdminRequest(request).catch(() => false);
    return error(admin ? `${text.failed} [admin · ${seconds} s · ${detail.slice(0, 300)}]` : text.failed, 502);
  }

  const macro = await macroPromise;
  // Every call counts toward the monthly budget, even one that is not charged a credit.
  await recordSpend(userRef, result.costEur + macro.costEur);
  // Not for an image that is not a chart: there is no asset to report on.
  const analysis = { ...result.analysis, macro: result.analysis.is_chart ? macro.report : null };

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
        ...analysis,
        note: note || null,
        model: result.model,
        createdAt: FieldValue.serverTimestamp(),
      });
    });
  } catch (err) {
    if (err instanceof Error && err.message === "NO_CREDITS") {
      return error(text.noCredits, 402);
    }
    throw err;
  }

  // Public "recent activity" feed: what was analysed and when, never who. Best effort.
  if (result.analysis.is_chart) recordActivity(result.analysis);

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

  return Response.json({ id: analysisRef.id, analysis, charged });
}

/** Adds a call's cost to the user's spend for the current month (reset when the month changes). */
async function recordSpend(userRef: FirebaseFirestore.DocumentReference, costEur: number) {
  try {
    await adminDb.runTransaction(async (tx) => {
      const spent = monthSpend((await tx.get(userRef)).data() ?? {});
      tx.set(userRef, { spendEur: spent + costEur, spendPeriod: creditPeriod() }, { merge: true });
    });
  } catch (err) {
    console.error("spend tracking failed", err);
  }
}
