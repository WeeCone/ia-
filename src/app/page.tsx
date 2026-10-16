import Image from "next/image";
import { ChartAnatomy } from "@/components/chart-anatomy";
import { Faq } from "@/components/faq";
import { DropBar } from "@/components/drop-bar";
import { ScanDemo } from "@/components/scan-demo";
import { PlatformMarquee } from "@/components/platform-marquee";
import { PriceNote } from "@/components/price-note";
import { PricingPlans } from "@/components/pricing-plans";
import { MONTHLY_CREDITS } from "@/lib/plans";
import { RotatingWord } from "@/components/rotating-word";
import { ScanCta } from "@/components/scan-cta";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Testimonials } from "@/components/testimonials";
import { TrustStrip } from "@/components/trust-strip";

const steps = [
  { title: "Capturez", text: "Un screenshot de votre graphique, sur n'importe quelle plateforme : TradingView, Binance, MetaTrader…" },
  { title: "Déposez", text: "Glissez l'image ou collez-la avec Ctrl+V. Ajoutez un mot de contexte si vous voulez." },
  {
    title: "Décidez",
    text: "Un verdict clair : le scénario le plus probable, avec entrée, stop et objectifs. Ou « attendre » quand le signal n'y est pas.",
  },
];

export default function Home() {
  return (
    <div className="theme-light flex flex-1 flex-col">
      <SiteHeader />
      <main id="contenu" className="flex-1">
        {/* Hero */}
        <section className="relative isolate -mt-20 overflow-hidden pt-20">
          {/* Wall Street's bull on the right, fading into the page (photo supplied by the owner). */}
          <div className="pointer-events-none absolute inset-y-0 right-0 -z-20 w-full sm:w-[58%] [mask-image:linear-gradient(to_right,transparent,black_45%)]" aria-hidden>
            <Image src="/media/hero-bull.jpg" alt="" fill priority sizes="(min-width: 640px) 58vw, 100vw" className="object-cover object-[55%_45%] opacity-[0.22] sm:opacity-[0.38]" />
          </div>
          <div className="absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-[linear-gradient(180deg,transparent,var(--background))]" aria-hidden />
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
          </div>
          <div className="mx-2 rounded-[2.5rem] border border-border/70 bg-card/40 py-8 backdrop-blur sm:mx-4">
            <p className="mb-5 text-center text-sm text-muted">Fonctionne avec les captures de vos plateformes</p>
            <PlatformMarquee />
          </div>
        </section>

        {/* The scan, in video */}
        <section id="video" className="theme-dark mx-2 scroll-mt-24 rounded-[2.5rem] sm:mx-4">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:py-24">
            <ScanDemo />
          </div>
        </section>

        {/* Features — what the AI reads, annotated on an example capture */}
        <section id="fonctionnalites" className="scroll-mt-24">
          <div className="mx-auto max-w-6xl px-4 py-20">
            <h2 className="display max-w-2xl text-4xl sm:text-5xl">
              Tout ce que l&apos;IA lit <span className="mark">sur votre graphique.</span>
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">Chaque point de la lecture est annoté sur la capture elle-même, au bon prix.</p>
            <ChartAnatomy />
          </div>
        </section>

        {/* Method */}
        <section id="methode" className="scroll-mt-24">
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
              {MONTHLY_CREDITS} analyses par mois. <span className="mark">Un verdict sur chaque graphique.</span>
            </h2>
            <p className="mt-5 max-w-xl text-lg text-muted">Un accès à vie en un seul paiement, ou un abonnement mensuel sans engagement.</p>
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
