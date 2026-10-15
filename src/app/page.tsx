import { DemoVideo } from "@/components/demo-video";
import { Faq } from "@/components/faq";
import { HeroShowcase } from "@/components/hero-showcase";
import { PriceNote } from "@/components/price-note";
import { PricingPlans } from "@/components/pricing-plans";
import { ScanCta } from "@/components/scan-cta";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Testimonials } from "@/components/testimonials";
import { VerdictSymbol } from "@/components/verdict-symbol";
import { VERDICTS } from "@/lib/verdicts";

const READING = [
  { title: "Structure et tendance", text: "Plus hauts, plus bas, cassures et retests : la structure de marché telle qu'elle se lit sur vos bougies." },
  { title: "Supports et résistances", text: "Tracés sur votre capture, à leur vraie hauteur, avec leur prix." },
  { title: "Figures chartistes", text: "Triangles, doubles creux, têtes-épaules, canaux, drapeaux : nommés quand ils sont visibles." },
  { title: "Indicateurs affichés", text: "RSI, MACD, moyennes mobiles, volumes : pris en compte s'ils figurent sur la capture." },
  { title: "Plan chiffré", text: "Entrée, stop, objectifs, et le ratio gain / risque calculé à partir des prix lus sur l'axe." },
  { title: "Toutes vos plateformes", text: "TradingView, Binance, MetaTrader… Toutes les unités de temps, de 1m à 1W." },
];

const MOVES = [
  { title: "Capturez", text: "Le graphique en bougies, l'axe des prix visible, l'actif et l'unité de temps en haut." },
  { title: "Déposez", text: "Glissez, collez avec Ctrl+V ou choisissez dans la galerie. Un mot de contexte si vous voulez." },
  { title: "Lisez le verdict", text: "Niveaux tracés, scénario retenu, plan chiffré. Le scénario alternatif reste à un clic." },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="board">
          <div className="mx-auto max-w-6xl px-4 pb-20 pt-12 sm:pt-16 lg:pb-24">
            <HeroShowcase />
          </div>
        </section>

        <section id="demo" className="paper scroll-mt-20">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <h2 className="display text-4xl sm:text-5xl">Une partie commentée, coup par coup.</h2>
              <p className="mt-5 text-lg leading-relaxed text-muted">
                Le Bitcoin en hebdomadaire : lecture de l&apos;axe, structure, moyennes, momentum, puis le choix du scénario et le plan d&apos;action.
              </p>
              <ScanCta className="btn-primary mt-8 px-6 py-3.5 text-base">Analyser mon graphique</ScanCta>
              <PriceNote className="mt-3 text-muted" />
            </div>
            <figure className="lg:col-span-8">
              {/* Matted like a printed diagram: hairline frame and a time edge along the bottom. */}
              <div className="border border-foreground bg-card p-2.5 sm:p-4">
                <div className="border border-foreground bg-[#0b0e14]">
                  <DemoVideo />
                </div>
                <svg viewBox="0 0 260 10" preserveAspectRatio="none" className="mt-2 h-2.5 w-full text-foreground" aria-hidden>
                  {Array.from({ length: 27 }, (_, index) => (
                    <line key={index} x1={index * 10} x2={index * 10} y1={0} y2={index % 5 === 0 ? 10 : 5} stroke="currentColor" strokeWidth={1} vectorEffect="non-scaling-stroke" />
                  ))}
                </svg>
              </div>
              <figcaption className="mt-3 flex flex-wrap gap-x-2 text-sm text-muted">
                <span className="font-[family-name:var(--font-bodoni)] italic text-foreground">Diagramme 2.</span>
                Animation de démonstration. Les résultats sont floutés : l&apos;analyse complète est réservée aux abonnés.
              </figcaption>
            </figure>
          </div>
        </section>

        <section id="verdicts" className="paper scroll-mt-20 border-t border-border">
          <div className="mx-auto max-w-6xl px-4 py-20">
            <div className="grid gap-6 lg:grid-cols-12">
              <h2 className="display text-4xl sm:text-6xl lg:col-span-7">
                Quatre verdicts.
                <br />
                <em className="font-normal">Jamais « peut-être ».</em>
              </h2>
              <p className="self-end text-lg leading-relaxed text-muted lg:col-span-5">
                Comme un commentateur d&apos;échecs conclut une position par un signe, Scanzivo conclut votre graphique par un seul verdict, celui du scénario le
                plus probable. Le scénario alternatif reste consultable, replié.
              </p>
            </div>
            <dl className="mt-14 grid border-t-2 border-foreground md:grid-cols-2">
              {VERDICTS.map((verdict, index) => (
                <div
                  key={verdict.action}
                  className={`grid grid-cols-[4.5rem_1fr] gap-x-5 border-b border-border py-7 md:px-6 ${index % 2 === 0 ? "md:border-r md:pl-0" : "md:pr-0"}`}
                >
                  <dt className="contents">
                    <VerdictSymbol
                      mark={verdict.mark}
                      className={`row-span-2 size-16 ${verdict.mark === "plus-minus" ? "text-bull" : verdict.mark === "minus-plus" ? "text-bear" : "text-foreground"}`}
                      title={verdict.glyph}
                    />
                    <span className="font-[family-name:var(--font-bodoni)] text-2xl font-bold">{verdict.title}</span>
                  </dt>
                  <dd className="mt-1.5 leading-relaxed text-muted">{verdict.when}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-sm text-muted">
              Les probabilités sont des estimations du modèle, pas des certitudes. Les analyses ne constituent pas un conseil en investissement.
            </p>
          </div>
        </section>

        <section id="lecture" className="board scroll-mt-20">
          <div className="mx-auto max-w-6xl px-4 py-20">
            <div className="grid gap-6 lg:grid-cols-12">
              <h2 className="display text-4xl sm:text-5xl lg:col-span-6">Ce que Scanzivo lit sur votre capture.</h2>
              <p className="self-end text-lg leading-relaxed text-muted lg:col-span-5 lg:col-start-8">
                Uniquement ce qui est visible. Scanzivo ne voit ni l&apos;actualité ni les cotations en direct : une capture nette donne une lecture précise.
              </p>
            </div>
            <ul className="mt-12 grid border-t border-border sm:grid-cols-2 lg:grid-cols-3">
              {READING.map(({ title, text }) => (
                <li key={title} className="border-b border-border py-6 sm:pr-8">
                  <h3 className="font-[family-name:var(--font-bodoni)] text-2xl font-bold">{title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{text}</p>
                </li>
              ))}
            </ul>

            <h3 className="mt-16 font-[family-name:var(--font-bodoni)] text-3xl font-bold italic">En trois coups</h3>
            <ol className="mt-6 grid gap-8 md:grid-cols-3">
              {MOVES.map(({ title, text }, index) => (
                <li key={title} className="border-t-2 border-foreground pt-4">
                  <p className="flex items-baseline gap-3">
                    <span className="font-mono text-lg font-semibold">{index + 1}.</span>
                    <span className="text-xl font-bold">{title}</span>
                  </p>
                  <p className="mt-2 leading-relaxed text-muted">{text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <Testimonials />

        <section id="tarifs" className="paper scroll-mt-20">
          <div className="mx-auto max-w-6xl px-4 py-20">
            <h2 className="display text-4xl sm:text-6xl">Deux formules, prix affichés.</h2>
            <p className="mt-5 max-w-xl text-lg text-muted">Pas d&apos;offre gratuite : un abonnement mensuel sans engagement, ou un accès à vie en un seul paiement.</p>
            <div className="mt-12">
              <PricingPlans />
            </div>
            <p className="mt-8 text-sm text-muted">Paiement sécurisé par Stripe.</p>
          </div>
        </section>

        <Faq />

        <section className="board border-b border-border">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 py-20 lg:grid-cols-12 lg:items-end">
            <h2 className="display text-5xl sm:text-7xl lg:col-span-8">
              Votre prochain graphique mérite <em className="font-normal">un second avis.</em>
            </h2>
            <div className="lg:col-span-4">
              <ScanCta className="btn-primary w-full px-6 py-4 text-base sm:w-auto">Analyser mon graphique</ScanCta>
              <PriceNote className="mt-3 text-muted" />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
