import Link from "next/link";
import { Faq } from "@/components/faq";
import { HeroShowcase } from "@/components/hero-showcase";
import { PricingPlans } from "@/components/pricing-plans";
import { ScanCta } from "@/components/scan-cta";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Testimonials } from "@/components/testimonials";
import { DEMO_ANALYSIS } from "@/lib/demo";

const MARKETS = ["Crypto", "Forex", "Actions", "Indices", "Matières premières"];

const steps = [
  { title: "Capturez", text: "Un screenshot de votre graphique, sur n'importe quelle plateforme : TradingView, Binance, MetaTrader…" },
  { title: "Déposez", text: "Glissez l'image ou collez-la avec Ctrl+V. Ajoutez un mot de contexte si vous voulez." },
  { title: "Décidez", text: "Tendance, niveaux clés, figures, et deux scénarios chiffrés avec entrée, stop et objectifs." },
];

function Icon({ path }: { path: string }) {
  return (
    <span className="grid size-10 place-items-center rounded-xl border border-brand/30 bg-brand/10 text-brand">
      <svg
        viewBox="0 0 24 24"
        className="size-5"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d={path} />
      </svg>
    </span>
  );
}

function Feature({
  icon,
  title,
  text,
  children,
  className = "",
}: {
  icon: string;
  title: string;
  text: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <li className={`panel group flex flex-col overflow-hidden p-6 transition-colors hover:border-brand/40 ${className}`}>
      <Icon path={icon} />
      <h3 className="display mt-5 text-xl">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
      <div className="mt-6 flex flex-1 items-end">{children}</div>
    </li>
  );
}

export default function Home() {
  const { bullish, bearish } = DEMO_ANALYSIS;

  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative isolate overflow-hidden">
          <div className="grid-bg absolute inset-0 -z-10" aria-hidden />
          <div className="absolute -top-40 left-1/2 -z-10 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-brand/15 blur-[120px]" aria-hidden />
          <div className="absolute right-0 top-80 -z-10 h-80 w-96 rounded-full bg-accent/10 blur-[110px]" aria-hidden />
          <div className="mx-auto max-w-6xl px-4 pb-20 pt-12 sm:pt-16">
            <h1 className="display text-center text-4xl sm:text-6xl">Analyse technique propulsée par l&apos;IA</h1>
            <div className="mt-10 sm:mt-12">
              <HeroShowcase />
            </div>
            <div className="mx-auto mt-16 max-w-3xl text-center">
              <p className="text-lg leading-relaxed text-muted sm:text-xl">
                Transformez vos graphiques en <span className="mark font-semibold">opportunités de trading</span> en 1 clic : l&apos;IA repère les
                figures chartistes, les supports et résistances, et vous rend deux scénarios chiffrés en moins d&apos;une minute.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <ScanCta className="btn-primary text-base">Scanner un graphique →</ScanCta>
                <Link href="/pricing" className="btn-secondary text-base">
                  Voir les offres
                </Link>
              </div>
            </div>
            <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-wider text-muted">
              {MARKETS.map((market) => (
                <li key={market} className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-brand" aria-hidden />
                  {market}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Live scan video */}
        <section id="video" className="theme-light scroll-mt-20">
          <div className="mx-auto max-w-6xl px-4 py-20">
            <div className="mx-auto max-w-3xl text-center">
              <p className="label text-brand">En action</p>
              <h2 className="display mt-3 text-4xl sm:text-5xl">
                Regardez Scanzivo <span className="mark">lire un graphique.</span>
              </h2>
              <p className="mt-4 text-lg text-muted">
                Une capture hebdomadaire du Bitcoin : niveaux tracés, momentum, deux scénarios chiffrés. Le tout en moins d&apos;une minute.
              </p>
            </div>
            <div className="mx-auto mt-10 max-w-5xl overflow-hidden rounded-2xl border border-border bg-[#0b0e14] shadow-[0_30px_80px_-30px_rgb(8_145_178/0.55)]">
              <video
                className="block aspect-video w-full"
                src="/media/btc-scan.mp4"
                poster="/media/btc-scan-poster.jpg"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="Démonstration : Scanzivo scanne un graphique BTC/USD hebdomadaire et produit deux scénarios"
              />
            </div>
            <div className="mt-8 flex flex-col items-center gap-3">
              <ScanCta className="btn-primary text-base">Analyser mon graphique →</ScanCta>
              <p className="text-xs text-muted">Exemple d&apos;analyse illustratif. Pas un conseil en investissement.</p>
            </div>
          </div>
        </section>

        {/* Features — bento grid */}
        <section id="fonctionnalites" className="scroll-mt-20 border-y border-border/70 bg-surface/60">
          <div className="mx-auto max-w-6xl px-4 py-20">
            <p className="label text-brand">Fonctionnalités</p>
            <h2 className="display mt-3 max-w-2xl text-4xl sm:text-5xl">
              Tout ce que l&apos;IA lit <span className="mark">sur votre graphique.</span>
            </h2>
            <ul className="mt-12 grid gap-5 md:grid-cols-3">
              <Feature
                className="md:col-span-2"
                icon="M3 20l6-12 5 8 3-5 4 9"
                title="Détection de figures chartistes"
                text="Triangles, doubles creux, têtes-épaules, canaux, drapeaux : les figures visibles sur votre capture sont repérées et nommées."
              >
                <svg viewBox="0 0 400 110" className="h-auto w-full" aria-hidden>
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
              <Feature
                icon="M3 7h18M3 12h18M3 17h18"
                title="Supports & résistances"
                text="Les niveaux clés sont tracés directement sur votre capture, avec leur prix."
              >
                <div className="w-full space-y-2 font-mono text-xs">
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
                icon="M12 3v18M5 8l7-5 7 5M5 16l7 5 7-5"
                title="Synthèse décisionnelle"
                text="Deux scénarios probabilisés, haussier et baissier, avec un niveau de confiance justifié."
              >
                <div className="w-full">
                  <div className="flex justify-between font-mono text-xs">
                    <span className="text-bull">Haussier {bullish.probability} %</span>
                    <span className="text-bear">{bearish.probability} % Baissier</span>
                  </div>
                  <div className="mt-2 flex h-2.5 overflow-hidden rounded-full bg-background">
                    <span className="bg-bull" style={{ width: `${bullish.probability}%` }} />
                    <span className="flex-1 bg-bear" />
                  </div>
                </div>
              </Feature>
              <Feature
                className="md:col-span-2"
                icon="M4 19h16M7 15l3-4 3 2 4-6"
                title="Plan de trade chiffré"
                text="Pour chaque scénario : zone d'entrée, stop, objectifs, et le ratio gain / risque calculé à partir des prix."
              >
                <dl className="grid w-full grid-cols-2 gap-2 font-mono text-sm sm:grid-cols-4">
                  {[
                    ["Entrée", "65 400"],
                    ["Stop", "64 300"],
                    ["Objectifs", "66 200 · 67 000"],
                    ["Gain / risque", "1 : 1,5"],
                  ].map(([term, value]) => (
                    <div key={term} className="rounded-xl border border-border bg-background/70 px-3 py-2.5">
                      <dt className="text-[10px] uppercase tracking-wider text-muted">{term}</dt>
                      <dd className={`mt-1 font-bold ${term === "Gain / risque" ? "text-bull" : ""}`}>{value}</dd>
                    </div>
                  ))}
                </dl>
              </Feature>
              <Feature
                className="md:col-span-2"
                icon="M3 12h4l3-7 4 14 3-7h4"
                title="Lecture des indicateurs visibles"
                text="RSI, MACD, moyennes mobiles, volumes : s'ils figurent sur votre capture, ils sont pris en compte dans l'analyse."
              >
                <svg viewBox="0 0 400 80" className="h-auto w-full" aria-hidden>
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
              <Feature
                icon="M4 5h16v11H4zM8 20h8M12 16v4"
                title="Toutes vos plateformes"
                text="TradingView, Binance, MetaTrader… sur toutes les unités de temps."
              >
                <div className="flex flex-wrap gap-2">
                  {["1m", "15m", "1H", "4H", "1D", "1W"].map((tf) => (
                    <span key={tf} className="chip border-border text-muted">
                      {tf}
                    </span>
                  ))}
                </div>
              </Feature>
            </ul>
          </div>
        </section>

        {/* Method */}
        <section id="methode" className="theme-light scroll-mt-20">
          <div className="mx-auto max-w-6xl px-4 py-20">
            <p className="label text-brand">Comment ça marche</p>
            <h2 className="display mt-3 text-4xl sm:text-5xl">
              Trois étapes, <span className="mark">pas une de plus.</span>
            </h2>
            <ol className="mt-12 grid gap-5 md:grid-cols-3">
              {steps.map((step, index) => (
                <li key={step.title} className="panel p-6">
                  <span className="display mark text-5xl">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="display mt-5 text-2xl">{step.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <Testimonials />

        {/* Pricing */}
        <section id="tarifs" className="theme-light scroll-mt-20">
          <div className="mx-auto max-w-5xl px-4 py-20">
            <p className="label text-brand">Tarifs</p>
            <h2 className="display mt-3 text-4xl sm:text-5xl">
              Deux offres. <span className="mark">Aucun piège.</span>
            </h2>
            <p className="mt-5 max-w-xl text-lg text-muted">Un abonnement mensuel sans engagement, ou un accès à vie en un seul paiement.</p>
            <div className="mt-12">
              <PricingPlans />
            </div>
          </div>
        </section>

        <Faq />

        {/* Closing CTA */}
        <section className="theme-light">
          <div className="mx-auto w-full max-w-6xl px-4 py-20">
            <div className="panel glow relative overflow-hidden px-6 py-16 text-center sm:px-12">
              <div
                className="absolute -bottom-32 left-1/2 -z-10 h-64 w-[600px] -translate-x-1/2 rounded-full bg-accent/15 blur-[100px]"
                aria-hidden
              />
              <h2 className="display mx-auto max-w-3xl text-4xl sm:text-6xl">
                Arrêtez de deviner. <span className="mark">Analysez.</span>
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-muted">Votre prochain graphique mérite un second avis, chiffré et argumenté.</p>
              <ScanCta className="btn-primary mt-9 text-base">Scanner un graphique →</ScanCta>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
