"use client";

import { useState } from "react";
import { useI18n } from "@/i18n/client";
import type { Dict } from "@/i18n/dictionaries";
import { type ChartAnalysis, preferredPlan } from "@/lib/analysis";
import { formatRatio, rewardRatios } from "@/lib/risk";
import { AnalysisResult } from "./analysis-result";
import { AnnotatedChart } from "./annotated-chart";

function summaryText(analysis: ChartAnalysis, t: Dict) {
  const w = t.report.summary;
  const scenario = (title: string, s: ChartAnalysis["bullish"], direction: "long" | "short") => {
    const ratios = rewardRatios(s, direction);
    return [
      `${title} (${Math.round(s.probability)} %) : ${s.thesis}`,
      `${w.entry} ${s.entry} · Stop ${s.stop_loss} · ${w.targets} ${s.targets.join(" → ")}`,
      ratios ? `${w.rr} ${ratios.map(formatRatio).join(" · ")}` : null,
      s.invalidation ? `${w.invalidated}${s.invalidation}` : null,
    ]
      .filter(Boolean)
      .join("\n");
  };
  const { bias, scenario: preferred, alternative, verdict } = preferredPlan(analysis);
  const other = bias === "haussier" ? "baissière" : "haussière";
  return [
    `${analysis.asset} · ${analysis.timeframe} · ${w.trend} ${t.enums.trend[analysis.trend]}` +
      (analysis.confidence ? ` · ${w.confidence} ${t.enums.confidence[analysis.confidence.level]}` : "") +
      (analysis.horizon ? ` · ${w.horizon} ${analysis.horizon}` : ""),
    `${w.plan} (${t.enums.action[verdict.action]}) : ${verdict.headline}` +
      (verdict.rationale ? `\n${verdict.rationale}` : "") +
      (verdict.change_mind ? `\n${w.changeMind}${verdict.change_mind}` : ""),
    analysis.summary,
    `${w.supports} : ${analysis.supports.join(", ") || "—"} · ${w.resistances} : ${analysis.resistances.join(", ") || "—"}`,
    scenario(w.preferred(t.enums.bias[bias]), preferred, bias === "haussier" ? "long" : "short"),
    scenario(w.alternative(t.enums.trend[other]), alternative, bias === "haussier" ? "short" : "long"),
    analysis.risk_notes?.length ? `${w.risk}\n- ${analysis.risk_notes.join("\n- ")}` : null,
    analysis.macro
      ? [
          `${w.macro}\n${analysis.macro.context}`,
          ...analysis.macro.events.map((event) => `- ${event.date} · ${event.title} (${t.report.macro.impact[event.impact]})`),
          analysis.macro.plan_impact,
        ].join("\n")
      : null,
    w.disclaimer,
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
  const { t } = useI18n();

  async function copy() {
    try {
      await navigator.clipboard.writeText(summaryText(analysis, t));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="label text-bull">{t.report.done}</p>
        <div className="flex flex-wrap gap-3">
          {analysis.is_chart && (
            <button type="button" onClick={copy} className="btn-secondary px-4 py-2">
              {copied ? t.report.copied : t.report.copy}
            </button>
          )}
          <button type="button" onClick={onNew} className="btn-primary px-4 py-2">
            {t.report.newAnalysis}
          </button>
        </div>
      </div>
      {imageUrl && analysis.is_chart && <AnnotatedChart imageUrl={imageUrl} marks={analysis.level_marks} />}
      <AnalysisResult analysis={analysis} />
    </div>
  );
}
