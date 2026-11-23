"use client";

import { useState } from "react";
import { hasChat, type Plan } from "@/lib/plans";
import { AskAi, AskAiLocked } from "./ask-ai";
import { LocaleProvider, useI18n } from "@/i18n/client";
import { hasLocale, LANGUAGE_NAMES, LOCALES, type Locale } from "@/i18n/config";
import type { Dict } from "@/i18n/dictionaries";
import { type ChartAnalysis, preferredPlan } from "@/lib/analysis";
import { auth } from "@/lib/firebase";
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
    w.disclaimer,
  ]
    .filter(Boolean)
    .join("\n\n");
}

/** A finished analysis: the annotated screenshot (when available), the report, and what to do next. */
function AnalysisViewInner({
  analysis,
  imageUrl,
  onNew,
  analysisId = null,
  plan,
}: {
  analysis: ChartAnalysis;
  imageUrl: string | null;
  onNew: () => void;
  /** The stored analysis, for questions to the AI (none for the admin's test report). */
  analysisId?: string | null;
  /** Starter: a reduced report, what Pro adds shown locked with the way up. */
  plan?: Plan;
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
      <AnalysisResult analysis={analysis} reduced={plan === "starter"} />
      {analysis.is_chart && analysisId && (hasChat(plan) ? <AskAi analysisId={analysisId} /> : plan === "starter" && <AskAiLocked />)}
    </div>
  );
}

/**
 * A report is shown whole in the language its text was written in (labels, buttons, the question to the AI), so one
 * report never mixes two languages when the page language differs. Reports from before the language was kept have none
 * and follow the page. The picker above it shows the same report in another language (translated once by the light
 * model, then kept with the report; the original is never changed).
 */
export function AnalysisView(props: React.ComponentProps<typeof AnalysisViewInner>) {
  const { locale, t } = useI18n();
  const [override, setOverride] = useState<{ source: ChartAnalysis; shown: ChartAnalysis } | null>(null);
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);
  // Only while it is the report it was made for: opening another one starts again from its own language.
  const shown = override && override.source === props.analysis ? override.shown : props.analysis;
  const stored = shown.locale;
  const current: Locale = stored && hasLocale(stored) ? stored : locale;
  const original: Locale = props.analysis.locale && hasLocale(props.analysis.locale) ? props.analysis.locale : locale;

  async function change(target: Locale) {
    setFailed(false);
    if (target === original) return setOverride(null);
    const known = (props.analysis as ChartAnalysis & { translations?: Record<string, ChartAnalysis> }).translations?.[target];
    if (known) return setOverride({ source: props.analysis, shown: known });
    const user = auth.currentUser;
    if (!user || !props.analysisId) return;
    setBusy(true);
    try {
      const response = await fetch(`/api/analyses/${props.analysisId}/translate`, {
        method: "POST",
        headers: { Authorization: `Bearer ${await user.getIdToken()}`, "Content-Type": "application/json", "X-Locale": locale },
        body: JSON.stringify({ locale: target }),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok || !data?.analysis) throw new Error();
      setOverride({ source: props.analysis, shown: data.analysis as ChartAnalysis });
    } catch {
      setFailed(true);
    } finally {
      setBusy(false);
    }
  }

  return (
    <LocaleProvider locale={current}>
      {props.analysis.is_chart && props.analysisId && (
        <div className="mb-3 flex items-center justify-end gap-2 text-sm text-muted">
          {busy && <span aria-live="polite">…</span>}
          {failed && <span role="alert">{t.uploader.failed}</span>}
          <svg viewBox="0 0 20 20" className="size-4" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden>
            <circle cx="10" cy="10" r="7.5" />
            <path d="M2.5 10h15M10 2.5C12.200 4.500 13.300 7 13.300 10S12.200 15.500 10 17.500M10 2.500C7.800 4.500 6.700 7 6.700 10s1.100 5.500 3.300 7.500" />
          </svg>
          <select
            aria-label="Report language"
            title="Report language"
            value={current}
            disabled={busy}
            onChange={(event) => change(event.target.value as Locale)}
            className="rounded-lg border border-border bg-background px-2 py-1 text-foreground"
          >
            {LOCALES.map((code) => (
              <option key={code} value={code}>
                {LANGUAGE_NAMES[code]}
              </option>
            ))}
          </select>
        </div>
      )}
      <AnalysisViewInner {...props} analysis={shown} />
    </LocaleProvider>
  );
}
