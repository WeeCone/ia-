import Link from "next/link";
import { AnalysisResult } from "@/components/analysis-result";
import { Faq } from "@/components/faq";
import { HeroBackdrop } from "@/components/hero-backdrop";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Testimonials } from "@/components/testimonials";
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
        {/* Hero: live-drawn chart backdrop with an AI scan sweeping across it. */}
        <section className="relative isolate overflow-hidden border-b-2 border-border">
          <HeroBackdrop />
          <div
            className="absolute inset-0 -z-0 bg-[linear-gradient(90deg,var(--background)_8%,color-mix(in_srgb,var(--background)_70%,transparent)_45%,transparent_80%),linear-gradient(0deg,var(--background),transparent_30%)]"
            aria-hidden
          />
          <div className="relative mx-auto max-w-6xl px-4 pb-24 pt-20 sm:pb-32 sm:pt-32">
            <span className="label inline-flex items-center gap-2 border-2 border-border bg-card px-3 py-1">
              <span className="size-2 animate-pulse bg-brand" aria-hidden />
              Analyse technique par IA
            </span>
            <h1 className="display mt-6 max-w-4xl text-6xl sm:text-8xl">
              Lisez le marché <span className="mark">avant</span> qu&apos;il bouge.
            </h1>
            <p className="mt-8 max-w-xl text-xl leading-relaxed">
              Une capture de votre graphique. Une analyse complète. <strong>Deux scénarios chiffrés.</strong> C&apos;est tout.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href="/auth/signup" className="btn-primary text-base">Analyser mon graphique →</Link>
              <Link href="/pricing" className="btn-secondary text-base">Voir les offres</Link>
            </div>
            <dl className="mt-14 flex flex-wrap gap-3">
              {[
                ["Haussier", `${bullish.probability}%`, "bg-bull"],
                ["Baissier", `${bearish.probability}%`, "bg-bear"],
              ].map(([term, value, tone]) => (
                <div key={term} className={`flex items-baseline gap-3 border-2 border-border px-4 py-2 text-background ${tone}`}>
                  <dt className="label">{term}</dt>
                  <dd className="display text-3xl">{value}</dd>
                </div>
              ))}
              <div className="label flex items-center px-2 text-muted">Exemple de résultat · BTC/USDT 4H</div>
            </dl>
          </div>
        </section>

        {/* Method */}
        <section id="methode" className="scroll-mt-4 border-b-2 border-border bg-[repeating-linear-gradient(-45deg,transparent_0_12px,#ffffff08_12px_14px)]">
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

        <Testimonials />
        <Faq />

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
