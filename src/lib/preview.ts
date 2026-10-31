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

/** Words of text in a report value: what "share of the analysis" is measured in. Positions on the image don't count. */
function words(value: unknown): number {
  if (typeof value === "string") return value.split(/\s+/).filter(Boolean).length;
  if (typeof value === "number") return 1;
  if (Array.isArray(value)) return value.reduce((sum: number, item) => sum + words(item), 0);
  if (value && typeof value === "object")
    return Object.entries(value).reduce((sum, [key, item]) => (key === "level_marks" ? sum : sum + words(item)), 0);
  return 0;
}

/**
 * The beginning of the report, as a visitor sees it for free: the market, its trend, the AI's confidence and its reading
 * of the structure. Everything after (plan, levels' prices, scenarios, patterns, risk) stays on the server.
 */
export function teaserOf(analysis: ChartAnalysis): PreviewTeaser {
  const shown = [analysis.asset, analysis.timeframe, analysis.trend, analysis.confidence?.level, analysis.summary];
  return {
    is_chart: analysis.is_chart,
    asset: analysis.asset,
    timeframe: analysis.timeframe,
    trend: analysis.trend,
    confidence: analysis.confidence,
    capture_quality: analysis.capture_quality,
    summary: analysis.summary,
    marks: analysis.level_marks.map(({ kind, y }) => ({ kind, y })),
    locked: {
      supports: analysis.supports.length,
      resistances: analysis.resistances.length,
      targets: Math.max(analysis.bullish.targets.length, analysis.bearish.targets.length),
      patterns: analysis.patterns.length,
      // The news side is gathered when a pack that includes it is unlocked.
      macro: analysis.is_chart,
    },
    // Measured on the report as stored; the news side, added at unlock, would make the share smaller still.
    shownPercent: Math.max(1, Math.round((words(shown) / Math.max(1, words(analysis))) * 100)),
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
