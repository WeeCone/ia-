import Link from "next/link";
import { AnalysisResult } from "@/components/analysis-result";
import { DemoChart } from "@/components/demo-chart";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { DEMO_ANALYSIS } from "@/lib/demo";

const steps = [
  { title: "Capturez", text: "Un screenshot de votre graphique, sur n'importe quelle plateforme : TradingView, Binance, MetaTrader…", tone: "bg-brand text-background" },
  { title: "Déposez", text: "Glissez l'image ou collez-la avec Ctrl+V. Ajoutez un mot de contexte si vous voulez.", tone: "bg-card" },
  { title: "Décidez", text: "Tendance, niveaux clés, figures, et deux scénarios chiffrés avec entrée, stop et objectifs.", tone: "bg-surface" },
];

export default function Home() {
  const { bullish, bearish } = DEMO_ANALYSIS;

  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="mx-auto grid max-w-6xl items-center gap-14 px-4 pb-20 pt-14 sm:pt-20 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <span className="label inline-block border-2 border-border bg-card px-3 py-1">Analyse technique par IA</span>
            <h1 className="display mt-6 text-6xl sm:text-8xl">
              Lisez le marché <span className="mark">avant</span> qu&apos;il bouge.
            </h1>
            <p className="mt-8 max-w-xl text-xl leading-relaxed">
              Une capture de votre graphique. Une analyse complète. <strong>Deux scénarios chiffrés.</strong> C&apos;est tout.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href="/auth/signup" className="btn-primary text-base">Analyser mon graphique →</Link>
              <Link href="/pricing" className="btn-secondary text-base">Voir les offres</Link>
            </div>
          </div>

          <div className="relative lg:col-span-5">
            <div className="panel">
              <div className="flex items-center justify-between border-b-2 border-border bg-surface px-4 py-2">
                <span className="label">btcusdt_4h.png</span>
                <span className="label text-brand">● Analysé</span>
              </div>
              <div className="p-4">
                <DemoChart />
              </div>
              <div className="grid grid-cols-2 border-t-2 border-border">
                <div className="border-r-2 border-border bg-bull p-4 text-background">
                  <p className="label">Haussier</p>
                  <p className="display mt-1 text-5xl">{bullish.probability}%</p>
                </div>
                <div className="bg-bear p-4 text-background">
                  <p className="label">Baissier</p>
                  <p className="display mt-1 text-5xl">{bearish.probability}%</p>
                </div>
              </div>
            </div>
            <span className="absolute -bottom-5 -right-3 -rotate-6 border-2 border-border bg-brand px-3 py-1 font-display text-sm uppercase shadow-[4px_4px_0_0_var(--border)] text-background">
              Exemple
            </span>
          </div>
        </section>

        {/* Method */}
        <section className="border-y-2 border-border bg-[repeating-linear-gradient(-45deg,transparent_0_12px,#ffffff08_12px_14px)]">
          <div className="mx-auto max-w-6xl px-4 py-20">
            <h2 className="display text-5xl sm:text-6xl">
              Trois étapes, <span className="mark">pas une de plus.</span>
            </h2>
            <ol className="mt-12 grid gap-6 md:grid-cols-3">
              {steps.map((step, index) => (
                <li key={step.title} className={`panel p-6 ${step.tone}`}>
                  <span className="display text-7xl">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="display mt-6 text-3xl">{step.title}</h3>
                  <p className="mt-3 leading-relaxed">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Example */}
        <section className="mx-auto max-w-6xl px-4 py-20">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <h2 className="display text-5xl sm:text-6xl">
              Le rapport, <span className="mark">tel quel.</span>
            </h2>
            <p className="max-w-xs border-l-2 border-border pl-3 text-sm">
              Exemple illustratif, rédigé pour la démonstration. Il ne reflète pas le marché actuel.
            </p>
          </div>
          <div className="mt-12">
            <AnalysisResult analysis={DEMO_ANALYSIS} />
          </div>
        </section>

        {/* Closing CTA */}
        <section className="border-t-2 border-border bg-brand text-background">
          <div className="mx-auto flex max-w-6xl flex-col items-start gap-10 px-4 py-20 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="display max-w-3xl text-5xl sm:text-7xl">Arrêtez de deviner. Analysez.</h2>
            <Link href="/auth/signup" className="btn-secondary shrink-0 text-base">Commencer →</Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
