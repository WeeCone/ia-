import "server-only";
import { createHash } from "node:crypto";
import { FieldValue } from "firebase-admin/firestore";
import type { ChartPreview } from "./analysis";
import type { PreviewTeaser } from "./preview-types";
import { adminDb } from "./firebase-admin";

export type { PreviewTeaser };

/**
 * The free preview: a visitor without an account sees a first reading of their chart before paying (a light model,
 * about 0,02 €). The screenshot and that reading are kept server-side; once a pack is bought, the full report is made
 * from them, consistent with what the visitor saw. No plan exists before payment, so none can leak.
 */

/** Previews any one visitor (by IP) may run per day. */
const PER_VISITOR_PER_DAY = 2;
/** AI spend allowed on previews per day, across all visitors (about 150 readings). Past it, "Analyse" goes straight to the packs. */
const DAILY_BUDGET_EUR = 3;
/** Worst case of one free reading: the image, a short prompt and at most 1 500 output tokens on the light model. */
const PREVIEW_MAX_COST_EUR = 0.05;
/** A preview can be unlocked for this long after it ran. */
export const PREVIEW_TTL_MS = 48 * 60 * 60 * 1000;

const countWords = (text: string) => text.split(/\s+/).filter(Boolean).length;

/**
 * Words in a typical full report besides the reading shown for free (plan, scenarios, levels, patterns, risk notes),
 * measured on real reports; the news side, when the pack includes it, comes on top.
 */
const TYPICAL_LOCKED_WORDS = 260;

/** The beginning of the report, as a visitor sees it for free: the market, the AI's confidence and what it spotted. */
export function teaserOf(preview: ChartPreview): PreviewTeaser {
  const shown = [preview.asset, preview.timeframe, preview.confidence, preview.hook].map(countWords).reduce((a, b) => a + b, 0);
  const marks = preview.level_marks.filter((mark) => Number.isFinite(mark.y) && mark.y >= 0 && mark.y <= 1);
  return {
    is_chart: preview.is_chart,
    asset: preview.asset,
    timeframe: preview.timeframe,
    confidence: preview.confidence,
    hook: preview.hook,
    marks,
    locked: { levels: marks.length, patterns: Math.max(0, Math.round(preview.patterns_count)), macro: preview.is_chart },
    shownPercent: Math.max(1, Math.round((shown / (shown + TYPICAL_LOCKED_WORDS)) * 100)),
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
    if ((daySnap.get("spendEur") ?? 0) + PREVIEW_MAX_COST_EUR > DAILY_BUDGET_EUR) return false;
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
