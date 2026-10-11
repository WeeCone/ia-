import Link from "next/link";
import { AnalysisResult } from "@/components/analysis-result";
import { DemoChart } from "@/components/demo-chart";
import { SiteHeader } from "@/components/site-header";
import { DEMO_ANALYSIS } from "@/lib/demo";

const steps = [
  { title: "Capturez", text: "Un screenshot de votre graphique, sur n'importe quelle plateforme : TradingView, Binance, MetaTrader…" },
  { title: "Déposez", text: "Glissez l'image, ou collez-la directement avec Ctrl+V. Ajoutez un mot de contexte si vous voulez." },
  { title: "Décidez", text: "Tendance, niveaux clés, figures, et deux scénarios chiffrés avec entrée, stop et objectifs." },
];

export default function Home() {
  const { bullish, bearish } = DEMO_ANALYSIS;

  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="mx-auto grid max-w-6xl gap-12 px-4 pb-20 pt-16 sm:pt-24 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <p className="label">§ Analyse technique par IA</p>
            <h1 className="mt-6 font-display text-6xl leading-[0.92] tracking-tight sm:text-8xl">
              Lisez le marché <em className="text-brand">avant</em> qu&apos;il ne bouge.
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">
              Envoyez une capture de votre graphique. NeuralTrade y lit la structure, les niveaux et les figures, puis vous
              rend deux scénarios chiffrés.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link href="/auth/signup" className="btn-primary">Analyser mon graphique →</Link>
              <Link href="/pricing" className="btn-secondary">Voir les offres</Link>
            </div>
            <dl className="mt-14 grid max-w-xl grid-cols-3 border-t border-border">
              {[
                ["Entrée", "1 capture"],
                ["Sortie", "2 scénarios"],
                ["Marchés", "Crypto · FX · Actions"],
              ].map(([term, value]) => (
                <div key={term} className="border-r border-border py-4 pr-4 last:border-r-0 [&:not(:first-child)]:pl-4">
                  <dt className="label">{term}</dt>
                  <dd className="mt-1 font-mono text-sm">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <aside className="panel self-end lg:col-span-5">
            <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
              <span className="label">btcusdt_4h.png</span>
              <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-bull">
                <span className="size-1.5 animate-pulse bg-bull" />
                Analysé
              </span>
            </div>
            <div className="p-4">
              <DemoChart />
            </div>
            <div className="grid grid-cols-2 border-t border-border">
              <div className="border-r border-border p-4">
                <p className="label">Haussier</p>
                <p className="mt-1 font-display text-5xl text-bull">{bullish.probability}%</p>
              </div>
              <div className="p-4">
                <p className="label">Baissier</p>
                <p className="mt-1 font-display text-5xl text-bear">{bearish.probability}%</p>
              </div>
            </div>
            <div className="flex h-1.5">
              <div className="bg-bull" style={{ width: `${bullish.probability}%` }} />
              <div className="flex-1 bg-bear" />
            </div>
          </aside>
        </section>

        {/* Method */}
        <section className="border-y border-border bg-surface/60">
          <div className="mx-auto max-w-6xl px-4 py-20">
            <p className="label">§ 01 — Méthode</p>
            <ol className="mt-10 divide-y divide-border border-y border-border">
              {steps.map((step, index) => (
                <li key={step.title} className="grid gap-4 py-8 sm:grid-cols-12 sm:items-baseline">
                  <span className="font-display text-6xl text-brand sm:col-span-2">{String(index + 1).padStart(2, "0")}</span>
                  <h2 className="font-display text-4xl sm:col-span-3">{step.title}</h2>
                  <p className="leading-relaxed text-muted sm:col-span-7">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Example */}
        <section className="mx-auto max-w-6xl px-4 py-20">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="label">§ 02 — Exemple de rapport</p>
              <h2 className="mt-4 font-display text-5xl leading-none sm:text-6xl">
                Ce que vous recevez, <em className="text-brand">mot pour mot.</em>
              </h2>
            </div>
            <p className="max-w-xs text-sm text-muted">Exemple illustratif, rédigé pour la démonstration. Il ne reflète pas le marché actuel.</p>
          </div>
          <div className="mt-12">
            <AnalysisResult analysis={DEMO_ANALYSIS} />
          </div>
        </section>

        {/* Closing CTA */}
        <section className="border-t border-border">
          <div className="mx-auto flex max-w-6xl flex-col items-start gap-8 px-4 py-24 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="max-w-2xl font-display text-5xl leading-[0.95] sm:text-7xl">
              Votre prochaine analyse tient dans une <em className="text-brand">capture d&apos;écran.</em>
            </h2>
            <Link href="/auth/signup" className="btn-primary shrink-0">Commencer →</Link>
          </div>
        </section>
      </main>
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 sm:flex-row sm:justify-between">
          <span className="label">© NeuralTrade</span>
          <span className="label normal-case tracking-normal">
            Les analyses sont fournies à titre informatif et ne constituent pas un conseil en investissement.
          </span>
        </div>
      </footer>
    </div>
  );
}
