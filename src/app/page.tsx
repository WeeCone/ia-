import { DemoVideo } from "@/components/demo-video";
import { Faq } from "@/components/faq";
import { HeroScene } from "@/components/hero-scene";
import { DropBar } from "@/components/drop-bar";
import { BeforeAfter } from "@/components/before-after";
import { PhoneShowcase } from "@/components/phone-showcase";
import { PlatformMarquee } from "@/components/platform-marquee";
import { PriceNote } from "@/components/price-note";
import { PricingPlans } from "@/components/pricing-plans";
import { RotatingWord } from "@/components/rotating-word";
import { ScanCta } from "@/components/scan-cta";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Testimonials } from "@/components/testimonials";
import { TrustStrip } from "@/components/trust-strip";
import { DEMO_ANALYSIS } from "@/lib/demo";

const steps = [
  { title: "Capturez", text: "Un screenshot de votre graphique, sur n'importe quelle plateforme : TradingView, Binance, MetaTrader…" },
  { title: "Déposez", text: "Glissez l'image ou collez-la avec Ctrl+V. Ajoutez un mot de contexte si vous voulez." },
  {
    title: "Décidez",
    text: "Un verdict clair : le scénario le plus probable, avec entrée, stop et objectifs. Ou « attendre » quand le signal n'y est pas.",
  },
];

function Feature({ title, text, children, className = "" }: { title: string; text: string; children: React.ReactNode; className?: string }) {
  return (
    <li className={`panel group flex flex-col overflow-hidden p-6 transition-colors hover:border-brand/40 ${className}`}>
      <h3 className="display text-xl">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
      <div className="mt-6 flex flex-1 items-end">{children}</div>
    </li>
  );
}

export default function Home() {
  const { bullish } = DEMO_ANALYSIS;

  return (
    <div className="theme-light flex flex-1 flex-col">
      <SiteHeader />
      <main id="contenu" className="flex-1">
        {/* Hero */}
        <section className="relative isolate -mt-20 overflow-hidden pt-20">
          <div className="grid-bg absolute inset-0 -z-10" aria-hidden />
          <HeroScene />
          <div className="absolute -top-40 left-1/2 -z-10 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-brand/15 blur-[120px]" aria-hidden />
          <div className="mx-auto max-w-6xl px-4 pb-14 pt-14 text-center sm:pt-20">
            <h1 className="display mx-auto max-w-5xl text-[2.6rem] leading-[0.98] tracking-[-0.035em] [text-shadow:0_2px_28px_var(--background)] sm:text-7xl lg:text-[5.25rem]">
              L&apos;IA qui lit vos graphiques
              <br />
              et tranche sur <RotatingWord words={["la crypto", "le forex", "l\u2019or", "les indices", "les actions"]} />
            </h1>
            <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
              Une capture d&apos;écran, un verdict clair et un plan chiffré : entrée, stop, objectifs. En moins d&apos;une minute.
            </p>
            <div className="mt-10">
              <DropBar />
            </div>
            <PriceNote className="mt-4 text-muted" />
          </div>
          <div className="mx-2 rounded-[2.5rem] border border-border/70 bg-card/40 py-8 backdrop-blur sm:mx-4">
            <p className="mb-5 text-center text-sm text-muted">Fonctionne avec les captures de vos plateformes</p>
            <PlatformMarquee />
          </div>
        </section>

        {/* Before / after */}
        <section className="theme-dark mx-2 rounded-[2.5rem] sm:mx-4 scroll-mt-24">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:py-24">
            <BeforeAfter />
          </div>
        </section>

        {/* Markets: the 3D phone */}
        <section id="marches" className="scroll-mt-24 overflow-hidden">
          <div className="mx-auto max-w-6xl px-4 pb-10 pt-6">
            <h2 className="display mx-auto max-w-3xl text-center text-4xl leading-[1] tracking-[-0.03em] sm:text-6xl">
              Lire un graphique n&apos;a jamais été <span className="mark">aussi simple.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-center text-lg text-muted">
              Crypto, forex, or, indices : un seul verdict par graphique, ou « attendre » quand le signal n&apos;y est pas.
            </p>
            <div className="mt-10">
              <PhoneShowcase />
            </div>
          </div>
        </section>

        {/* Live scan video */}
        <section id="video" className="theme-dark mx-2 rounded-[2.5rem] sm:mx-4 scroll-mt-24">
          <div className="mx-auto max-w-6xl px-4 py-20">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="display text-4xl sm:text-5xl">
                Regardez Scanzivo <span className="mark">lire un graphique.</span>
              </h2>
              <p className="mt-4 text-lg text-muted">
                Une capture hebdomadaire du Bitcoin : niveaux tracés, momentum, et un plan d&apos;action chiffré. Le tout en moins d&apos;une minute.
              </p>
            </div>
            <div className="mx-auto mt-10 max-w-5xl overflow-hidden rounded-2xl border border-border bg-[#0b0e14] shadow-[0_30px_80px_-30px_rgb(8_145_178/0.55)]">
              <DemoVideo />
            </div>
            <div className="mt-8 flex flex-col items-center gap-3">
              <ScanCta className="btn-primary text-base">Analyser mon graphique →</ScanCta>
              <PriceNote className="text-muted" />
              <p className="text-xs text-muted">Exemple d&apos;analyse illustratif. Pas un conseil en investissement.</p>
            </div>
          </div>
        </section>

        {/* Features — bento grid */}
        <section id="fonctionnalites" className="scroll-mt-24">
          <div className="mx-auto max-w-6xl px-4 py-20">
            <h2 className="display max-w-2xl text-4xl sm:text-5xl">
              Tout ce que l&apos;IA lit <span className="mark">sur votre graphique.</span>
            </h2>
            <ul className="mt-12 grid gap-5 md:grid-cols-3">
              <Feature
                className="md:col-span-2"
                title="Détection de figures chartistes"
                text="Triangles, doubles creux, têtes-épaules, canaux, drapeaux : les figures visibles sur votre capture sont repérées et nommées."
              >
                <svg viewBox="0 0 400 110" className="draw-on-view h-auto w-full" aria-hidden>
                  <path
                    d="M10 95 L70 30 L110 75 L170 38 L205 68 L260 45 L285 60 L330 50"
                    fill="none"
                    stroke="var(--muted)"
                    strokeWidth="2"
                    strokeOpacity="0.6"
                  />
                  <line x1="60" y1="28" x2="340" y2="49" stroke="var(--bear)" strokeWidth="2" strokeDasharray="6 4" />
                  <line x1="100" y1="80" x2="340" y2="52" stroke="var(--bull)" strokeWidth="2" strokeDasharray="6 4" />
                  <path d="M330 50 L390 12" fill="none" stroke="var(--brand)" strokeWidth="2.5" />
                  <rect
                    x="262"
                    y="82"
                    width="116"
                    height="20"
                    rx="10"
                    fill="var(--brand)"
                    fillOpacity="0.12"
                    stroke="var(--brand)"
                    strokeOpacity="0.5"
                  />
                  <text x="320" y="96" textAnchor="middle" fontSize="9" fontFamily="var(--font-jetbrains-mono)" fill="var(--brand)">
                    TRIANGLE SYMÉTRIQUE
                  </text>
                </svg>
              </Feature>
              <Feature title="Supports & résistances" text="Les niveaux clés sont tracés directement sur votre capture, avec leur prix.">
                <div className="draw-on-view w-full space-y-2 font-mono text-xs">
                  {[
                    ["65 400", "bear"],
                    ["63 200", "bull"],
                    ["61 800", "bull"],
                  ].map(([price, tone]) => (
                    <div key={price} className="flex items-center gap-2">
                      <span className={`h-px flex-1 border-t border-dashed ${tone === "bull" ? "border-bull" : "border-bear"}`} />
                      <span className={`rounded px-1.5 py-0.5 font-bold text-background ${tone === "bull" ? "bg-bull" : "bg-bear"}`}>{price}</span>
                    </div>
                  ))}
                </div>
              </Feature>
              <Feature
                title="Un verdict, pas un « peut-être »"
                text="L'IA retient le scénario le plus probable et le formule en plan : acheter, vendre, attendre ou s'abstenir. L'alternative reste consultable."
              >
                <div className="w-full rounded-xl border border-bull/30 bg-bull/5 p-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded bg-bull px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-background">
                      {DEMO_ANALYSIS.verdict.action}
                    </span>
                    <span className="font-mono text-xs text-bull">{bullish.probability} %</span>
                  </div>
                  <p className="mt-2 text-sm font-medium leading-snug">{DEMO_ANALYSIS.verdict.headline}</p>
                </div>
              </Feature>
              <Feature
                className="md:col-span-2"
                title="Plan de trade chiffré"
                text="Pour le scénario retenu : zone d'entrée, stop, objectifs, et le ratio gain / risque calculé à partir des prix."
              >
                <dl className="grid w-full grid-cols-2 gap-2 font-mono text-sm sm:grid-cols-4">
                  {[
                    ["Entrée", "65 400"],
                    ["Stop", "64 300"],
                    ["Objectifs", "66 600 · 67 000"],
                    ["Gain / risque", "1 : 1,1 / 1,5"],
                  ].map(([term, value]) => (
                    <div key={term} className="rounded-xl border border-border bg-background/70 px-3 py-2.5">
                      <dt className="text-[11px] uppercase tracking-wider text-muted">{term}</dt>
                      <dd className={`mt-1 font-bold ${term === "Gain / risque" ? "text-bull" : ""}`}>{value}</dd>
                    </div>
                  ))}
                </dl>
              </Feature>
              <Feature
                className="md:col-span-2"
                title="Lecture des indicateurs visibles"
                text="RSI, MACD, moyennes mobiles, volumes : s'ils figurent sur votre capture, ils sont pris en compte dans l'analyse."
              >
                <svg viewBox="0 0 400 80" className="draw-on-view h-auto w-full" aria-hidden>
                  <rect x="0" y="0" width="400" height="80" rx="10" fill="var(--background)" fillOpacity="0.7" />
                  <line x1="0" y1="20" x2="400" y2="20" stroke="var(--bear)" strokeOpacity="0.5" strokeDasharray="4 4" />
                  <line x1="0" y1="60" x2="400" y2="60" stroke="var(--bull)" strokeOpacity="0.5" strokeDasharray="4 4" />
                  <path
                    d="M0 50 C30 45 45 62 70 58 S110 30 140 34 S180 64 210 55 S260 18 290 16 S340 40 360 36 S390 28 400 26"
                    fill="none"
                    stroke="var(--brand)"
                    strokeWidth="2.5"
                  />
                  <text x="10" y="14" fontSize="10" fontFamily="var(--font-jetbrains-mono)" fill="var(--muted)">
                    RSI 14
                  </text>
                </svg>
              </Feature>
              <Feature title="Toutes vos plateformes" text="TradingView, Binance, MetaTrader… sur toutes les unités de temps.">
                <div className="flex flex-wrap gap-2">
                  {["1m", "15m", "1H", "4H", "1D", "1W"].map((tf) => (
                    <span key={tf} className="chip border-border normal-case text-muted">
                      {tf}
                    </span>
                  ))}
                </div>
              </Feature>
            </ul>
          </div>
        </section>

        {/* Method */}
        <section id="methode" className="theme-dark mx-2 rounded-[2.5rem] sm:mx-4 scroll-mt-24">
          <div className="mx-auto max-w-6xl px-4 py-20">
            <h2 className="display text-4xl sm:text-5xl">
              Trois étapes, <span className="mark">pas une de plus.</span>
            </h2>
            <ol className="mt-12 grid gap-5 md:grid-cols-3">
              {steps.map((step, index) => (
                <li key={step.title} className="panel p-6">
                  <span className="font-mono text-sm font-medium text-brand">Étape {index + 1}</span>
                  <h3 className="display mt-2 text-2xl">{step.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <Testimonials />

        {/* Pricing */}
        <section id="tarifs" className="scroll-mt-24">
          <div className="mx-auto max-w-6xl px-4 py-20">
            <h2 className="display text-4xl sm:text-5xl">
              Deux offres. <span className="mark">Prix affichés.</span>
            </h2>
            <p className="mt-5 max-w-xl text-lg text-muted">
              Pas d&apos;offre gratuite : un abonnement mensuel sans engagement, ou un accès à vie en un seul paiement.
            </p>
            <div className="mt-12">
              <PricingPlans />
            </div>
            <div className="mt-10 border-t border-border pt-8">
              <TrustStrip />
            </div>
          </div>
        </section>

        <Faq />

        {/* Closing CTA */}
        <section className="theme-dark mx-2 rounded-[2.5rem] sm:mx-4 mb-4">
          <div className="mx-auto w-full max-w-6xl px-4 py-20">
            <div className="panel relative overflow-hidden px-6 py-16 text-center sm:px-12">
              <h2 className="display mx-auto max-w-3xl text-4xl sm:text-6xl">
                Arrêtez de deviner. <span className="mark">Analysez.</span>
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-muted">Votre prochain graphique mérite un second avis, chiffré et argumenté.</p>
              <ScanCta className="btn-primary mt-9 text-base">Scanner un graphique →</ScanCta>
              <PriceNote className="mt-4 text-muted" />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
