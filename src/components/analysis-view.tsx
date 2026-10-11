"use client";

import { useState } from "react";
import type { ChartAnalysis } from "@/lib/analysis";
import { formatRatio, rewardRatios } from "@/lib/risk";
import { AnalysisResult } from "./analysis-result";
import { AnnotatedChart } from "./annotated-chart";

function summaryText(analysis: ChartAnalysis) {
  const scenario = (title: string, s: ChartAnalysis["bullish"], direction: "long" | "short") => {
    const ratios = rewardRatios(s, direction);
    return [
      `${title} (${Math.round(s.probability)} %) : ${s.thesis}`,
      `Entrée ${s.entry} · Stop ${s.stop_loss} · Objectifs ${s.targets.join(" → ")}`,
      ratios ? `Gain/risque ${ratios.map(formatRatio).join(" · ")}` : null,
      s.invalidation ? `Invalidé si : ${s.invalidation}` : null,
    ]
      .filter(Boolean)
      .join("\n");
  };
  return [
    `${analysis.asset} · ${analysis.timeframe} · tendance ${analysis.trend}` +
      (analysis.confidence ? ` · confiance ${analysis.confidence.level}` : "") +
      (analysis.horizon ? ` · horizon ${analysis.horizon}` : ""),
    analysis.summary,
    `Supports : ${analysis.supports.join(", ") || "—"} · Résistances : ${analysis.resistances.join(", ") || "—"}`,
    scenario("Haussier", analysis.bullish, "long"),
    scenario("Baissier", analysis.bearish, "short"),
    analysis.risk_notes?.length ? `Gestion du risque :\n- ${analysis.risk_notes.join("\n- ")}` : null,
    "Analyse Scanzivo, à titre informatif. Pas un conseil en investissement.",
  ]
    .filter(Boolean)
    .join("\n\n");
}

/** A finished analysis: the annotated screenshot (when available), the report, and what to do next. */
export function AnalysisView({
  analysis,
  imageUrl,
  onNew,
}: {
  analysis: ChartAnalysis;
  imageUrl: string | null;
  onNew: () => void;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(summaryText(analysis));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="label text-bull">● Analyse terminée</p>
        <div className="flex flex-wrap gap-3">
          {analysis.is_chart && (
            <button type="button" onClick={copy} className="btn-secondary px-4 py-2">
              {copied ? "Copié" : "Copier le résumé"}
            </button>
          )}
          <button type="button" onClick={onNew} className="btn-primary px-4 py-2">
            Nouvelle analyse
          </button>
        </div>
      </div>
      {imageUrl && analysis.is_chart && <AnnotatedChart imageUrl={imageUrl} marks={analysis.level_marks} />}
      <AnalysisResult analysis={analysis} />
    </div>
  );
}
