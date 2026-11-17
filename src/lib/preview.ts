import "server-only";
import { createHash } from "node:crypto";
import { FieldValue } from "firebase-admin/firestore";
import type { ChartPreview } from "./analysis";
import type { PreviewTeaser } from "./preview-types";
import { adminDb } from "./firebase-admin";

export type { PreviewTeaser };

/**
 * The free preview: a visitor without an account sees a first reading of their chart before paying (a light model,
 * a fraction of a cent). The screenshot and that reading are kept server-side; once a pack is bought, the full report is made
 * from them, consistent with what the visitor saw. No plan exists before payment, so none can leak.
 */

/** Free readings per connection (IP) per day: high enough that a person never meets it, a bound on scripted abuse. */
const PER_VISITOR_PER_DAY = 30;
/** AI spend allowed on free readings per day, across all visitors (about a thousand readings): a safety net against scripted abuse. */
const DAILY_BUDGET_EUR = 3;
/** Worst case of one free reading: the image, a short prompt and at most 1 500 output tokens on the light model. */
const PREVIEW_MAX_COST_EUR = 0.05;
/** A preview can be unlocked for this long after it ran. */
export const PREVIEW_TTL_MS = 48 * 60 * 60 * 1000;

const countWords = (text: string) => text.split(/\s+/).filter(Boolean).length;

/**
 * Words in a typical full report besides the reading shown for free: plan, both scenarios, levels, patterns and risk
 * notes. Measured from real reports: the median full analysis is about 2 200 output tokens, of which roughly 900 words
 * of text (the rest is the structure around it), so the free reading's share is a few percent, not a fifth.
 */
const TYPICAL_LOCKED_WORDS = 900;

/** What the free reading may show of the AI's own words: a short summary and a short note, never more. */
const SUMMARY_MAX_WORDS = 14;
const STAKES_MAX_WORDS = 22;

/** The first sentences of a text that fit in `max` words; a single longer sentence is cut at the limit. */
function trimToWords(text: string, max: number) {
  const sentences = text.trim().match(/[^.!?]+[.!?]+(\s|$)|[^.!?]+$/g) ?? [text];
  let kept = "";
  for (const sentence of sentences) {
    const next = `${kept}${sentence}`.trim();
    if (countWords(next) > max) break;
    kept = `${next} `;
  }
  if (kept.trim()) return kept.trim();
  return `${text.trim().split(/\s+/).slice(0, max).join(" ").replace(/[,;:\s]+$/, "")}…`;
}

/** The beginning of the report, as a visitor sees it for free: the market, the AI's confidence and what it spotted. */
export function teaserOf(preview: ChartPreview): PreviewTeaser {
  const summary = trimToWords(preview.summary, SUMMARY_MAX_WORDS);
  const stakes = trimToWords(preview.stakes, STAKES_MAX_WORDS);
  const shown = [preview.asset.split(/[(,]/)[0] ?? preview.asset, preview.timeframe, preview.confidence, summary, stakes].map(countWords).reduce((a, b) => a + b, 0);
  const marks = preview.level_marks.filter((mark) => Number.isFinite(mark.y) && mark.y >= 0 && mark.y <= 1);
  return {
    is_chart: preview.is_chart,
    asset: preview.asset,
    timeframe: preview.timeframe,
    confidence: preview.confidence,
    trend: preview.trend,
    summary,
    stakes,
    marks,
    locked: { levels: marks.length, patterns: Math.max(0, Math.round(preview.patterns_count)) },
    shownPercent: Math.max(1, Math.round((shown / (shown + TYPICAL_LOCKED_WORDS)) * 100)),
  };
}

const today = () => new Date().toISOString().slice(0, 10);

/** The visitor's address as the hosting saw it, hashed: only used to count previews, never stored in clear. */
function visitorKey(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  return createHash("sha256").update(`${today()}:${ip}`).digest("hex").slice(0, 32);
}

/**
 * Reserves one preview for this visitor today, within the day's budget: "limit" when the visitor has used theirs,
 * "budget" when the day's spend is reached.
 */
export async function reservePreview(request: Request): Promise<"ok" | "limit" | "budget"> {
  const visitor = adminDb.collection("previewLimits").doc(visitorKey(request));
  const day = adminDb.collection("previewBudget").doc(today());
  return adminDb.runTransaction(async (tx) => {
    const [visitorSnap, daySnap] = await Promise.all([tx.get(visitor), tx.get(day)]);
    if ((visitorSnap.get("count") ?? 0) >= PER_VISITOR_PER_DAY) return "limit";
    // Counts the worst case of the call about to run; the real cost replaces it once known.
    if ((daySnap.get("spendEur") ?? 0) + PREVIEW_MAX_COST_EUR > DAILY_BUDGET_EUR) return "budget";
    tx.set(visitor, { count: FieldValue.increment(1), day: today() }, { merge: true });
    tx.set(day, { count: FieldValue.increment(1) }, { merge: true });
    return "ok";
  });
}

/** Gives a reserved reading back when it failed: a failure never uses up a visitor's free readings. */
export function releasePreview(request: Request) {
  return adminDb
    .collection("previewLimits")
    .doc(visitorKey(request))
    .set({ count: FieldValue.increment(-1) }, { merge: true })
    .catch((err) => console.error("preview: release failed", err));
}

/** A free reading that failed, kept for the admin "Analyses" tab with the other failures (no visitor identity). */
export function recordPreviewError(detail: string) {
  return adminDb
    .collection("analysisErrors")
    .add({ uid: "lecture-gratuite", seconds: 0, detail: detail.slice(0, 500), createdAt: FieldValue.serverTimestamp() })
    .catch(() => {});
}

export function recordPreviewSpend(costEur: number) {
  return adminDb
    .collection("previewBudget")
    .doc(today())
    .set({ spendEur: FieldValue.increment(costEur) }, { merge: true })
    .catch((err) => console.error("preview spend tracking failed", err));
}
