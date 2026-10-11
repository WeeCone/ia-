import type { ChartAnalysis } from "@/lib/analysis";

const trendStyle = {
  haussière: "bg-brand/15 text-brand",
  baissière: "bg-bear/15 text-bear",
  neutre: "bg-muted/15 text-muted",
} as const;

function Levels({ title, levels, tone }: { title: string; levels: string[]; tone: "brand" | "bear" }) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-wide text-muted">{title}</h3>
      <ul className="mt-2 flex flex-wrap gap-2">
        {levels.length ? (
          levels.map((level) => (
            <li key={level} className={`rounded-md px-2 py-1 font-mono text-sm ${tone === "brand" ? "bg-brand/10 text-brand" : "bg-bear/10 text-bear"}`}>
              {level}
            </li>
          ))
        ) : (
          <li className="text-sm text-muted">—</li>
        )}
      </ul>
    </div>
  );
}

function ScenarioCard({ title, scenario, tone }: { title: string; scenario: ChartAnalysis["bullish"]; tone: "brand" | "bear" }) {
  const color = tone === "brand" ? "text-brand" : "text-bear";
  const bar = tone === "brand" ? "bg-brand" : "bg-bear";
  return (
    <div className="rounded-xl border border-border bg-background p-4">
      <div className="flex items-baseline justify-between">
        <h3 className={`font-semibold ${color}`}>{title}</h3>
        <span className={`font-mono text-2xl font-bold ${color}`}>{Math.round(scenario.probability)}%</span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-border">
        <div className={`h-full ${bar}`} style={{ width: `${Math.min(100, Math.max(0, scenario.probability))}%` }} />
      </div>
      <p className="mt-3 text-sm">{scenario.thesis}</p>
      <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm">
        <dt className="text-muted">Entrée</dt>
        <dd className="font-mono">{scenario.entry}</dd>
        <dt className="text-muted">Stop</dt>
        <dd className="font-mono">{scenario.stop_loss}</dd>
        <dt className="text-muted">Objectifs</dt>
        <dd className="font-mono">{scenario.targets.join(" · ") || "—"}</dd>
      </dl>
    </div>
  );
}

export function AnalysisResult({ analysis }: { analysis: ChartAnalysis }) {
  if (!analysis.is_chart) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-6 text-sm text-muted">
        Cette image ne semble pas être un graphique de prix. Aucun crédit n&apos;a été débité.
      </div>
    );
  }

  return (
    <div className="space-y-6 rounded-2xl border border-border bg-surface p-6">
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="text-xl font-semibold">{analysis.asset}</h2>
        <span className="rounded-md border border-border px-2 py-0.5 font-mono text-xs text-muted">{analysis.timeframe}</span>
        <span className={`rounded-full px-3 py-1 text-xs font-medium ${trendStyle[analysis.trend]}`}>Tendance {analysis.trend}</span>
      </div>
      <p className="text-sm leading-relaxed">{analysis.summary}</p>
      <div className="grid gap-4 sm:grid-cols-2">
        <Levels title="Supports" levels={analysis.supports} tone="brand" />
        <Levels title="Résistances" levels={analysis.resistances} tone="bear" />
      </div>
      {analysis.patterns.length > 0 && (
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-muted">Signaux</h3>
          <ul className="mt-2 list-inside list-disc text-sm">
            {analysis.patterns.map((pattern) => (
              <li key={pattern}>{pattern}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        <ScenarioCard title="Scénario haussier" scenario={analysis.bullish} tone="brand" />
        <ScenarioCard title="Scénario baissier" scenario={analysis.bearish} tone="bear" />
      </div>
      <p className="text-xs text-muted">Analyse générée par IA, à titre informatif uniquement. Ce n&apos;est pas un conseil en investissement.</p>
    </div>
  );
}
