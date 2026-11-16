import type { ChartAnalysis } from "./analysis";

/** What a visitor sees for free: what the AI spotted and the overall trend, never the plan (no verdict, no prices, no probabilities). */
export type PreviewTeaser = {
  is_chart: boolean;
  asset: string;
  timeframe: string;
  confidence: ChartAnalysis["confidence"]["level"];
  /** The overall trend visible on the chart: what the reader can see anyway, given away free (absent on readings made before it was). */
  trend?: ChartAnalysis["trend"];
  /** The context, then what is at stake on the chart: never the direction, a price or a verdict. */
  summary: string;
  stakes: string;
  /** Where the levels sit on the capture (lines only, their prices stay locked). */
  marks: { kind: "support" | "resistance"; y: number }[];
  /** How much the locked part holds, to say it plainly. */
  locked: { levels: number; patterns: number };
  /** Share of the report shown for free, in percent: its words over those of a typical full report. */
  shownPercent: number;
};
