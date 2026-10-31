import type { ChartAnalysis } from "./analysis";

/** What a visitor sees for free: what the AI spotted, never the result (no trend, no plan, no prices). */
export type PreviewTeaser = {
  is_chart: boolean;
  asset: string;
  timeframe: string;
  confidence: ChartAnalysis["confidence"]["level"];
  /** The context, then what is at stake on the chart: never the direction, a price or a verdict. */
  summary: string;
  stakes: string;
  /** Where the levels sit on the capture (lines only, their prices stay locked). */
  marks: { kind: "support" | "resistance"; y: number }[];
  /** How much the locked part holds, to say it plainly. */
  locked: { levels: number; patterns: number; macro: boolean };
  /** Share of the report shown for free, in percent: its words over those of a typical full report. */
  shownPercent: number;
};
