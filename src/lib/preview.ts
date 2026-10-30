import "server-only";
import { createHash } from "node:crypto";
import { FieldValue } from "firebase-admin/firestore";
import type { ChartAnalysis } from "./analysis";
import type { PreviewTeaser } from "./preview-types";
import { adminDb } from "./firebase-admin";
import { MAX_CALL_COST_EUR } from "./plans";

export type { PreviewTeaser };

/**
 * The free preview: a visitor without an account sees the general reading of their chart before paying, and the
 * plan stays locked. The full report is kept server-side and handed to the account once the trial is paid, so the
 * visitor gets the very analysis they previewed, at no second AI cost. Nothing locked ever leaves the server.
 */

/** Previews any one visitor (by IP) may run per day. */
const PER_VISITOR_PER_DAY = 2;
/** AI spend allowed on previews per day, across all visitors. Past it, "Analyse" goes straight to payment as before. */
const DAILY_BUDGET_EUR = 6;
/** A preview can be unlocked for this long after it ran. */
export const PREVIEW_TTL_MS = 48 * 60 * 60 * 1000;

export function teaserOf(analysis: ChartAnalysis): PreviewTeaser {
  return {
    is_chart: analysis.is_chart,
    asset: analysis.asset,
    timeframe: analysis.timeframe,
    trend: analysis.trend,
    confidence: analysis.confidence,
    capture_quality: analysis.capture_quality,
    summary: analysis.summary,
    patterns: analysis.patterns,
    marks: analysis.level_marks.map(({ kind, y }) => ({ kind, y })),
    locked: {
      supports: analysis.supports.length,
      resistances: analysis.resistances.length,
      targets: Math.max(analysis.bullish.targets.length, analysis.bearish.targets.length),
      // The news side is gathered when the trial is unlocked.
      macro: analysis.is_chart,
    },
  };
}

const today = () => new Date().toISOString().slice(0, 10);

/** The visitor's address as the hosting saw it, hashed: only used to count previews, never stored in clear. */
function visitorKey(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  return createHash("sha256").update(`${today()}:${ip}`).digest("hex").slice(0, 32);
}

/** Reserves one preview for this visitor today, within the day's budget. False when either limit is reached. */
export async function reservePreview(request: Request) {
  const visitor = adminDb.collection("previewLimits").doc(visitorKey(request));
  const day = adminDb.collection("previewBudget").doc(today());
  return adminDb.runTransaction(async (tx) => {
    const [visitorSnap, daySnap] = await Promise.all([tx.get(visitor), tx.get(day)]);
    if ((visitorSnap.get("count") ?? 0) >= PER_VISITOR_PER_DAY) return false;
    // Counts the worst case of the call about to run; the real cost replaces it once known.
    if ((daySnap.get("spendEur") ?? 0) + MAX_CALL_COST_EUR > DAILY_BUDGET_EUR) return false;
    tx.set(visitor, { count: FieldValue.increment(1), day: today() }, { merge: true });
    tx.set(day, { count: FieldValue.increment(1) }, { merge: true });
    return true;
  });
}

export function recordPreviewSpend(costEur: number) {
  return adminDb
    .collection("previewBudget")
    .doc(today())
    .set({ spendEur: FieldValue.increment(costEur) }, { merge: true })
    .catch((err) => console.error("preview spend tracking failed", err));
}
