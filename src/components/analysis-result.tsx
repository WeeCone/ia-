import type { ChartAnalysis } from "@/lib/analysis";

const trendStyle = {
  haussière: "bg-bull text-background",
  baissière: "bg-bear text-background",
  neutre: "bg-card",
} as const;

function Levels({ title, levels, tone }: { title: string; levels: string[]; tone: "bull" | "bear" }) {
  return (
    <div className="p-5">
      <h3 className="label">{title}</h3>
      <ul className="mt-3 space-y-2">
        {levels.length ? (
          levels.map((level) => (
            <li
              key={level}
              className={`inline-block w-full border-2 border-border px-3 py-1 font-mono text-lg font-bold ${tone === "bull" ? "bg-bull/15" : "bg-bear/15"}`}
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
  return (
    <div className="flex flex-col">
      <div className={`flex items-end justify-between gap-4 border-b-2 border-border px-5 py-4 text-background ${tone === "bull" ? "bg-bull" : "bg-bear"}`}>
        <h3 className="label">{title}</h3>
        <span className="display text-6xl">{Math.round(scenario.probability)}%</span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-lg font-semibold leading-snug">{scenario.thesis}</p>
        <dl className="mt-5 grid grid-cols-[auto_1fr] border-2 border-border text-sm">
          {[
            ["Entrée", scenario.entry],
            ["Stop", scenario.stop_loss],
            ["Objectifs", scenario.targets.join(" → ") || "—"],
          ].map(([term, value], index) => (
            <div key={term} className={`contents ${index > 0 ? "[&>*]:border-t-2 [&>*]:border-border" : ""}`}>
              <dt className="label border-r-2 border-border bg-brand px-3 py-2 text-background">{term}</dt>
              <dd className="px-3 py-2 font-mono font-bold">{value}</dd>
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
      <header className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-border bg-surface px-5 py-3">
        <span className="label">Rapport · {analysis.asset} · {analysis.timeframe}</span>
        <span className={`label border-2 border-background px-2 py-0.5 ${trendStyle[analysis.trend]}`}>Tendance {analysis.trend}</span>
      </header>

      <div className="grid lg:grid-cols-12">
        <div className="border-b-2 border-border p-5 lg:col-span-6 lg:border-b-0 lg:border-r-2">
          <h2 className="display text-5xl">{analysis.asset}</h2>
          <p className="mt-4 text-lg leading-relaxed">{analysis.summary}</p>
          {analysis.patterns.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-2">
              {analysis.patterns.map((pattern) => (
                <li key={pattern} className="border-2 border-border bg-brand px-2 py-1 text-sm font-semibold text-background">
                  {pattern}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="grid grid-cols-2 divide-x-2 divide-border lg:col-span-6">
          <Levels title="Résistances" levels={analysis.resistances} tone="bear" />
          <Levels title="Supports" levels={analysis.supports} tone="bull" />
        </div>
      </div>

      <div className="grid border-t-2 border-border sm:grid-cols-2 sm:divide-x-2 sm:divide-border">
        <ScenarioCard title="Scénario haussier" scenario={analysis.bullish} tone="bull" />
        <div className="border-t-2 border-border sm:border-t-0">
          <ScenarioCard title="Scénario baissier" scenario={analysis.bearish} tone="bear" />
        </div>
      </div>

      <footer className="border-t-2 border-border px-5 py-3 text-xs font-semibold">
        Analyse générée par IA, à titre informatif uniquement. Ce n&apos;est pas un conseil en investissement.
      </footer>
    </article>
  );
}
