import type { ChartAnalysis } from "@/lib/analysis";
import { formatRatio, rewardRatios } from "@/lib/risk";

const confidenceStyle = {
  faible: "border-bear/40 bg-bear/10 text-bear",
  moyenne: "border-brand/40 bg-brand/10 text-brand",
  élevée: "border-bull/40 bg-bull/10 text-bull",
} as const;

const captureStyle = {
  bonne: "border-bull/40 bg-bull/10 text-bull",
  moyenne: "border-amber-400/40 bg-amber-400/10 text-amber-300",
  faible: "border-bear/40 bg-bear/10 text-bear",
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

function ScenarioCard({ title, scenario, tone }: { title: string; scenario: ChartAnalysis["bullish"]; tone: "bull" | "bear" }) {
  // Older analyses (before numeric prices were requested) simply have no ratio.
  const ratios = rewardRatios(scenario, tone === "bull" ? "long" : "short");
  const rows: [string, React.ReactNode][] = [
    ["Entrée", scenario.entry],
    ["Stop", scenario.stop_loss],
    ["Objectifs", scenario.targets.join(" → ") || "—"],
  ];
  if (ratios) {
    rows.push([
      "Gain / risque",
      <span key="rr" className="flex flex-wrap gap-x-3">
        {ratios.map((ratio, index) => (
          <span key={index} className={ratio >= 2 ? "text-bull" : ratio < 1 ? "text-bear" : ""}>
            {formatRatio(ratio)}
          </span>
        ))}
      </span>,
    ]);
  }
  if (scenario.invalidation) rows.push(["Invalidé si", <span key="inv" className="font-sans font-medium">{scenario.invalidation}</span>]);

  return (
    <div className="flex flex-col">
      <div className={`flex items-end justify-between gap-4 border-b border-border px-5 py-4 ${tone === "bull" ? "bg-bull/10 text-bull" : "bg-bear/10 text-bear"}`}>
        <h3 className="label">{title}</h3>
        <span className="display text-5xl">{Math.round(scenario.probability)} %</span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-lg font-semibold leading-snug">{scenario.thesis}</p>
        <dl className="mt-5 grid grid-cols-[auto_1fr] overflow-hidden rounded-xl border border-border text-sm">
          {rows.map(([term, value], index) => (
            <div key={String(term)} className={`contents ${index > 0 ? "[&>*]:border-t [&>*]:border-border" : ""}`}>
              <dt className="label border-r border-border bg-surface px-3 py-2.5 text-muted">{term}</dt>
              <dd className="px-3 py-2.5 font-mono font-bold">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

export function AnalysisResult({ analysis }: { analysis: ChartAnalysis }) {
  if (!analysis.is_chart) {
    return (
      <div className="panel p-6 font-semibold">
        Cette image ne semble pas être un graphique de prix. Aucun crédit n&apos;a été débité.
      </div>
    );
  }

  return (
    <article className="panel">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-surface/60 px-5 py-3">
        <span className="label">
          Rapport · {analysis.asset} · {analysis.timeframe}
          {analysis.horizon && <span className="text-muted"> · horizon {analysis.horizon}</span>}
        </span>
        <span className="flex flex-wrap gap-2">
          {analysis.confidence && (
            <span className={`chip ${confidenceStyle[analysis.confidence.level]}`}>
              Confiance {analysis.confidence.level}
            </span>
          )}
          {analysis.capture_quality && (
            <span className={`chip ${captureStyle[analysis.capture_quality.level]}`}>Capture {analysis.capture_quality.level}</span>
          )}
          <span className={`chip ${trendStyle[analysis.trend]}`}>Tendance {analysis.trend}</span>
        </span>
      </header>

      {/* Older analyses have no capture_quality. */}
      {analysis.capture_quality && analysis.capture_quality.level !== "bonne" && (
        <div className="flex flex-col gap-1 border-b border-amber-400/25 bg-amber-400/5 px-5 py-3 text-sm sm:flex-row sm:items-baseline sm:gap-3">
          <span className="label shrink-0 text-amber-300">Capture {analysis.capture_quality.level}</span>
          <p className="text-foreground/90">
            {analysis.capture_quality.issues.length > 0 && <span className="text-muted">{analysis.capture_quality.issues.join(" · ")}. </span>}
            {analysis.capture_quality.tip && <span>Pour une analyse plus précise : {analysis.capture_quality.tip}</span>}
          </p>
        </div>
      )}

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
          <Levels title="Résistances" levels={analysis.resistances} tone="bear" />
          <Levels title="Supports" levels={analysis.supports} tone="bull" />
        </div>
      </div>

      <div className="grid border-t border-border sm:grid-cols-2 sm:divide-x sm:divide-border">
        <ScenarioCard title="Scénario haussier" scenario={analysis.bullish} tone="bull" />
        <div className="border-t border-border sm:border-t-0">
          <ScenarioCard title="Scénario baissier" scenario={analysis.bearish} tone="bear" />
        </div>
      </div>

      {analysis.risk_notes?.length > 0 && (
        <section className="border-t border-border p-5">
          <h3 className="label text-muted">Gestion du risque</h3>
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
        Analyse générée par IA, à titre informatif uniquement. Ce n&apos;est pas un conseil en investissement.
      </footer>
    </article>
  );
}
