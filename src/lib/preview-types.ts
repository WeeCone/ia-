import type { ChartAnalysis } from "./analysis";

/** What a visitor sees for free: the reading of the market, no plan, no prices. */
export type PreviewTeaser = {
  is_chart: boolean;
  asset: string;
  timeframe: string;
  trend: ChartAnalysis["trend"];
  confidence: ChartAnalysis["confidence"];
  summary: string;
  /** Where the levels sit on the capture (lines only, their prices stay locked). */
  marks: { kind: "support" | "resistance"; y: number }[];
  /** How much the locked part holds, to say it plainly. */
  locked: { levels: number; patterns: number; macro: boolean };
  /** Share of the report shown for free, in percent: its words over those of a typical full report. */
  shownPercent: number;
};
