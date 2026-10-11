import type { ChartAnalysis } from "@/lib/analysis";

const trendStyle = {
  haussière: "border-bull text-bull",
  baissière: "border-bear text-bear",
  neutre: "border-muted text-muted",
} as const;

function Levels({ title, levels, tone }: { title: string; levels: string[]; tone: "bull" | "bear" }) {
  return (
    <div className="p-5">
      <h3 className="label">{title}</h3>
      <ul className="mt-3 space-y-1.5 font-mono text-lg">
        {levels.length ? (
          levels.map((level) => (
            <li key={level} className="flex items-center gap-3">
              <span className={`h-px w-6 ${tone === "bull" ? "bg-bull" : "bg-bear"}`} />
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
  const color = tone === "bull" ? "text-bull" : "text-bear";
  return (
    <div className="flex flex-col p-5">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className={`label ${color}`}>{title}</h3>
        <span className={`font-display text-6xl leading-none ${color}`}>{Math.round(scenario.probability)}%</span>
      </div>
      <p className="mt-4 font-display text-2xl leading-snug">{scenario.thesis}</p>
      <dl className="mt-5 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 border-t border-border pt-4 text-sm">
        <dt className="label leading-5">Entrée</dt>
        <dd className="font-mono">{scenario.entry}</dd>
        <dt className="label leading-5">Stop</dt>
        <dd className="font-mono">{scenario.stop_loss}</dd>
        <dt className="label leading-5">Objectifs</dt>
        <dd className="font-mono">{scenario.targets.join("  →  ") || "—"}</dd>
      </dl>
    </div>
  );
}

export function AnalysisResult({ analysis }: { analysis: ChartAnalysis }) {
  if (!analysis.is_chart) {
    return (
      <div className="panel p-6 text-sm text-muted">
        Cette image ne semble pas être un graphique de prix. Aucun crédit n&apos;a été débité.
      </div>
    );
  }

  const bull = Math.min(100, Math.max(0, analysis.bullish.probability));

  return (
    <article className="panel">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-3">
        <span className="label">Rapport · {analysis.asset} · {analysis.timeframe}</span>
        <span className={`border px-2 py-0.5 font-mono text-[11px] uppercase tracking-[0.18em] ${trendStyle[analysis.trend]}`}>
          Tendance {analysis.trend}
        </span>
      </header>

      <div className="grid lg:grid-cols-12">
        <div className="border-b border-border p-5 lg:col-span-6 lg:border-b-0 lg:border-r">
          <h2 className="font-display text-5xl leading-none">{analysis.asset}</h2>
          <p className="mt-4 leading-relaxed">{analysis.summary}</p>
          {analysis.patterns.length > 0 && (
            <ul className="mt-5 space-y-2 text-sm text-muted">
              {analysis.patterns.map((pattern) => (
                <li key={pattern} className="flex gap-2">
                  <span className="text-brand">◆</span>
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

      <div className="flex h-1.5" aria-hidden>
        <div className="bg-bull" style={{ width: `${bull}%` }} />
        <div className="flex-1 bg-bear" />
      </div>

      <div className="grid divide-y divide-border sm:grid-cols-2 sm:divide-x sm:divide-y-0">
        <ScenarioCard title="Scénario haussier" scenario={analysis.bullish} tone="bull" />
        <ScenarioCard title="Scénario baissier" scenario={analysis.bearish} tone="bear" />
      </div>

      <footer className="border-t border-border px-5 py-3 text-xs text-muted">
        Analyse générée par IA, à titre informatif uniquement. Ce n&apos;est pas un conseil en investissement.
      </footer>
    </article>
  );
}
