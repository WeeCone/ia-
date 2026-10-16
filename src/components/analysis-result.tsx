"use client";

import { useI18n } from "@/i18n/client";
import { keepNumbers } from "@/i18n/format";
import { type ChartAnalysis, preferredPlan } from "@/lib/analysis";
import { formatRatio, rewardRatios } from "@/lib/risk";

const confidenceStyle = {
  faible: "border-bear/40 bg-bear/10 text-bear",
  moyenne: "border-brand/40 bg-brand/10 text-brand",
  élevée: "border-bull/40 bg-bull/10 text-bull",
} as const;

const captureStyle = {
  bonne: "border-bull/40 bg-bull/10 text-bull",
  moyenne: "border-amber-400/40 bg-amber-400/10 text-warn",
  faible: "border-bear/40 bg-bear/10 text-bear",
} as const;

const actionStyle = {
  "acheter sur confirmation": "bg-bull text-background",
  "vendre sur confirmation": "bg-bear text-background",
  attendre: "bg-amber-400 text-background",
  "ne pas trader": "bg-muted text-background",
} as const;

const trendStyle = {
  haussière: "border-bull/40 bg-bull/10 text-bull",
  baissière: "border-bear/40 bg-bear/10 text-bear",
  neutre: "border-border text-muted",
} as const;

function Levels({ title, levels, tone }: { title: string; levels: string[]; tone: "bull" | "bear" }) {
  return (
    <div className="p-5">
      <h3 className="label text-muted">{title}</h3>
      <ul className="mt-3 space-y-2">
        {levels.length ? (
          levels.map((level) => (
            <li
              key={level}
              className={`inline-block w-full rounded-lg border px-3 py-1.5 font-mono text-lg font-bold ${tone === "bull" ? "border-bull/30 bg-bull/10 text-bull" : "border-bear/30 bg-bear/10 text-bear"}`}
            >
              {level}
            </li>
          ))
        ) : (
          <li className="text-muted">—</li>
        )}
      </ul>
    </div>
  );
}

function ScenarioTable({ scenario, tone }: { scenario: ChartAnalysis["bullish"]; tone: "bull" | "bear" }) {
  // Older analyses (before numeric prices were requested) simply have no ratio.
  const ratios = rewardRatios(scenario, tone === "bull" ? "long" : "short");
  const { t } = useI18n();
  const r = t.report;
  const rows: [string, React.ReactNode][] = [
    [r.entry, scenario.entry],
    [r.stop, scenario.stop_loss],
    [r.targets, scenario.targets.join(" → ") || "—"],
  ];
  if (ratios) {
    rows.push([
      r.rr,
      <span key="rr" className="flex flex-wrap gap-x-3">
        {ratios.map((ratio, index) => (
          <span key={index} className={ratio >= 2 ? "text-bull" : ratio < 1 ? "text-bear" : ""}>
            {formatRatio(ratio)}
          </span>
        ))}
      </span>,
    ]);
  }
  if (scenario.invalidation) rows.push([r.invalidated, <span key="inv" className="font-sans font-medium">{scenario.invalidation}</span>]);

  return (
    <dl className="grid grid-cols-[auto_1fr] overflow-hidden rounded-xl border border-border text-sm">
      {rows.map(([term, value], index) => (
        <div key={String(term)} className={`contents ${index > 0 ? "[&>*]:border-t [&>*]:border-border" : ""}`}>
          <dt className="label border-r border-border bg-surface px-3 py-2.5 text-muted">{term}</dt>
          <dd className="px-3 py-2.5 font-mono font-bold">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

/** The one scenario the AI favours, stated as a plan. */
function ActionPlan({ analysis }: { analysis: ChartAnalysis }) {
  const { bias, scenario, verdict } = preferredPlan(analysis);
  const tone = bias === "haussier" ? "bull" : "bear";
  const { t } = useI18n();
  const standAside = verdict.action === "attendre" || verdict.action === "ne pas trader";
  return (
    <section className={`border-b border-border ${tone === "bull" ? "bg-bull/5" : "bg-bear/5"}`}>
      <div className="grid gap-6 p-5 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="label text-muted">{t.report.plan}</h3>
            <span className={`rounded-md px-2.5 py-1 text-xs font-bold uppercase tracking-wide ${actionStyle[verdict.action]}`}>{t.enums.action[verdict.action]}</span>
          </div>
          <p className="display mt-4 text-2xl leading-snug sm:text-3xl">{keepNumbers(verdict.headline)}</p>
          {verdict.rationale && <p className="mt-4 leading-relaxed text-foreground/90">{keepNumbers(verdict.rationale)}</p>}
          {verdict.change_mind && (
            <p className="mt-4 rounded-xl border border-border bg-background/50 px-4 py-3 text-sm">
              <span className="label mr-2 text-muted">{t.report.changeMind}</span>
              {keepNumbers(verdict.change_mind)}
            </p>
          )}
        </div>
        <div className="lg:col-span-5">
          <div className={`flex items-end justify-between gap-4 ${tone === "bull" ? "text-bull" : "text-bear"}`}>
            <span className="label">{t.report.preferred(t.enums.bias[bias])}</span>
            <span className="display whitespace-nowrap text-5xl">{Math.round(scenario.probability)} %</span>
          </div>
          <div className="mt-4">
            <ScenarioTable scenario={scenario} tone={tone} />
          </div>
          {standAside && (
            <p className="mt-3 text-xs text-muted">{t.report.standAside}</p>
          )}
        </div>
      </div>
    </section>
  );
}

function AlternativeScenario({ analysis }: { analysis: ChartAnalysis }) {
  const { bias, alternative } = preferredPlan(analysis);
  const tone = bias === "haussier" ? "bear" : "bull";
  const { t } = useI18n();
  return (
    <details className="group border-t border-border">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-3.5 text-sm [&::-webkit-details-marker]:hidden">
        <span>
          <span className="label text-muted">{t.report.alternative}</span>{" "}
          <span className={`font-semibold ${tone === "bull" ? "text-bull" : "text-bear"}`}>
            {t.enums.bias[tone === "bull" ? "haussier" : "baissier"]} · {Math.round(alternative.probability)} %
          </span>
        </span>
        <span className="shrink-0 font-display text-xl leading-none text-brand transition-transform group-open:rotate-45" aria-hidden>
          +
        </span>
      </summary>
      <div className="grid gap-4 px-5 pb-5 lg:grid-cols-2">
        <p className="leading-relaxed">{alternative.thesis}</p>
        <ScenarioTable scenario={alternative} tone={tone} />
      </div>
    </details>
  );
}

export function AnalysisResult({ analysis }: { analysis: ChartAnalysis }) {
  const { t } = useI18n();
  const r = t.report;
  if (!analysis.is_chart) {
    return (
      <div className="panel p-6 font-semibold">
        {r.notChart}
      </div>
    );
  }

  return (
    <article className="panel">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-surface/60 px-5 py-3">
        <span className="label">
          {r.title} · {analysis.asset} · {analysis.timeframe}
          {analysis.horizon && (
            <span className="text-muted">
              {" "}
              · {r.horizon} {analysis.horizon}
            </span>
          )}
        </span>
        <span className="flex flex-wrap gap-2">
          {analysis.confidence && (
            <span className={`chip ${confidenceStyle[analysis.confidence.level]}`}>
              {r.confidence} {t.enums.confidence[analysis.confidence.level]}
            </span>
          )}
          {analysis.capture_quality && (
            <span className={`chip ${captureStyle[analysis.capture_quality.level]}`}>
              {r.capture} {t.enums.quality[analysis.capture_quality.level]}
            </span>
          )}
          <span className={`chip ${trendStyle[analysis.trend]}`}>
            {r.trend} {t.enums.trend[analysis.trend]}
          </span>
        </span>
      </header>

      {/* Older analyses have no capture_quality. */}
      {analysis.capture_quality && analysis.capture_quality.level !== "bonne" && (
        <div className="flex flex-col gap-1 border-b border-amber-400/25 bg-amber-400/5 px-5 py-3 text-sm sm:flex-row sm:items-baseline sm:gap-3">
          <span className="label shrink-0 text-warn">
            {r.capture} {t.enums.quality[analysis.capture_quality.level]}
          </span>
          <p className="text-foreground/90">
            {analysis.capture_quality.issues.length > 0 && <span className="text-muted">{analysis.capture_quality.issues.join(" · ")}. </span>}
            {analysis.capture_quality.tip && (
              <span>
                {r.captureTip}
                {analysis.capture_quality.tip}
              </span>
            )}
          </p>
        </div>
      )}

      <ActionPlan analysis={analysis} />

      <div className="grid lg:grid-cols-12">
        <div className="border-b border-border p-5 lg:col-span-6 lg:border-b-0 lg:border-r">
          <h2 className="display text-4xl">{analysis.asset}</h2>
          <p className="mt-4 text-lg leading-relaxed">{analysis.summary}</p>
          {analysis.confidence?.reason && <p className="mt-3 text-sm text-muted">{analysis.confidence.reason}</p>}
          {analysis.patterns.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-2">
              {analysis.patterns.map((pattern) => (
                <li key={pattern} className="rounded-lg border border-brand/30 bg-brand/10 px-2.5 py-1 text-sm font-medium text-brand">
                  {pattern}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="grid grid-cols-2 divide-x divide-border lg:col-span-6">
          <Levels title={r.resistances} levels={analysis.resistances} tone="bear" />
          <Levels title={r.supports} levels={analysis.supports} tone="bull" />
        </div>
      </div>

      <AlternativeScenario analysis={analysis} />

      {analysis.risk_notes?.length > 0 && (
        <section className="border-t border-border p-5">
          <h3 className="label text-muted">{r.risk}</h3>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {analysis.risk_notes.map((note) => (
              <li key={note} className="flex gap-2 text-sm">
                <span className="font-bold text-brand" aria-hidden>›</span>
                {note}
              </li>
            ))}
          </ul>
        </section>
      )}

      <footer className="border-t border-border px-5 py-3 text-xs text-muted">
        {r.footer}
      </footer>
    </article>
  );
}
