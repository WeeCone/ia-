import type { Metadata } from "next";
import Image from "next/image";
import { ChartAnatomy } from "@/components/chart-anatomy";
import { ActivityToast } from "@/components/activity-toast";
import { Faq } from "@/components/faq";
import { DropBar } from "@/components/drop-bar";
import { ScanDemo } from "@/components/scan-demo";
import { PlatformMarquee } from "@/components/platform-marquee";
import { PricingPlans } from "@/components/pricing-plans";
import { RotatingWord } from "@/components/rotating-word";
import { ScrollReveal } from "@/components/scroll-reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Testimonials } from "@/components/testimonials";
import { TrustStrip } from "@/components/trust-strip";
import { TrialButton } from "@/components/trial-button";
import { formatEur } from "@/i18n/format";
import { getI18n, languageAlternates } from "@/i18n/server";
import { OFFER_PRICE_EUR } from "@/lib/plans";

export async function generateMetadata(): Promise<Metadata> {
  const { locale } = await getI18n();
  return { alternates: languageAlternates(locale, "/") };
}

export default async function Home() {
  const { t, locale } = await getI18n();
  const trialLine = t.hero.trialLine(formatEur(locale, OFFER_PRICE_EUR.trial), formatEur(locale, OFFER_PRICE_EUR.monthly));
  // What search engines and AI assistants read about the product: the offer and the FAQ, as structured data.
  const site = `https://scanzivo.com${locale === "fr" ? "" : `/${locale}`}`;
  const structured = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Scanzivo",
      url: site,
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      inLanguage: locale,
      description: t.hero.subtitle,
      offers: [
        { "@type": "Offer", name: t.common.trial, price: OFFER_PRICE_EUR.trial, priceCurrency: "EUR" },
        { "@type": "Offer", name: t.common.monthly, price: OFFER_PRICE_EUR.monthly, priceCurrency: "EUR" },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      inLanguage: locale,
      mainEntity: t.faq.items.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })),
    },
  ];
  return (
    <div className="theme-light flex flex-1 flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structured).replace(/</g, "\\u003c") }} />
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
            <h1 className="rise-in display mx-auto max-w-6xl text-[2.6rem] leading-[0.98] tracking-[-0.035em] [text-shadow:0_2px_28px_var(--background)] sm:text-7xl lg:text-[5rem]">
              {t.hero.titleLine1}
              <br />
              {t.hero.titleLine2}
              <br />
              <RotatingWord words={t.hero.words} />
            </h1>
            <p style={{ "--d": "0.15s" } as React.CSSProperties} className="rise-in mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
              {t.hero.subtitle}
            </p>
            <div style={{ "--d": "0.3s" } as React.CSSProperties} className="rise-in mt-10">
              <DropBar />
              <p className="mx-auto mt-4 max-w-xl text-sm text-muted [text-shadow:0_1px_12px_var(--background)]">
                {trialLine.before}
                <TrialButton className="font-semibold text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent">
                  {trialLine.offer}
                </TrialButton>
                {trialLine.after}
              </p>
            </div>
          </div>
          <div data-reveal="fade" className="mx-2 rounded-[2.5rem] border border-border/70 bg-card/40 py-8 backdrop-blur sm:mx-4">
            <p className="mb-5 text-center text-sm text-muted">{t.hero.platforms}</p>
            <PlatformMarquee />
          </div>
        </section>

        {/* The scan, in video */}
        <section id="video" data-reveal="circle" className="theme-dark mx-2 scroll-mt-24 rounded-[2.5rem] sm:mx-4">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:py-24">
            <ScanDemo />
          </div>
        </section>

        {/* Features — what the AI reads, annotated on an example capture */}
        <section id="fonctionnalites" className="scroll-mt-24">
          <div className="mx-auto max-w-6xl px-4 py-20">
            <h2 data-reveal="fade" className="display max-w-2xl text-4xl sm:text-5xl">
              {t.features.titleA} <span className="mark">{t.features.titleB}</span>
            </h2>
            <p data-reveal="fade" className="mt-5 max-w-xl text-lg leading-relaxed text-muted">{t.features.subtitle}</p>
            <ChartAnatomy />
          </div>
        </section>

        {/* Method */}
        <section id="methode" className="scroll-mt-24">
          <div className="mx-auto max-w-6xl px-4 py-20">
            <h2 data-reveal="fade" className="display text-4xl sm:text-5xl">
              {t.method.titleA} <span className="mark">{t.method.titleB}</span>
            </h2>
            {/* Progress line over the steps: it fills as the steps arrive. */}
            <div aria-hidden className="mt-12 hidden h-0.5 overflow-hidden rounded-full bg-border md:block">
              <div data-reveal="line" className="h-full bg-brand" />
            </div>
            <ol data-reveal-stagger className="mt-12 grid gap-5 md:mt-6 md:grid-cols-3">
              {t.method.steps.map((step, index) => (
                <li key={step.title} className="panel p-6">
                  <span className="font-mono text-sm font-medium text-brand">
                    {t.method.step} {index + 1}
                  </span>
                  <h3 className="display mt-2 text-2xl">{step.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <Testimonials />

        {/* Pricing */}
        <section id="tarifs" className="relative isolate scroll-mt-24 overflow-hidden">
          {/* The New York Stock Exchange facade on the right, washed into the light page like the hero's bull (photo supplied by the owner). */}
          <div
            className="pointer-events-none absolute inset-y-0 right-0 -z-10 w-full sm:w-[55%] [mask-composite:intersect] [mask-image:linear-gradient(to_right,transparent,black_45%),linear-gradient(to_bottom,transparent,black_18%,black_75%,transparent)]"
            aria-hidden
          >
            <Image src="/media/nyse-facade.jpg" alt="" fill sizes="(min-width: 640px) 55vw, 100vw" className="object-cover object-[50%_30%] opacity-[0.16] sm:opacity-[0.3]" />
          </div>
          <div className="mx-auto max-w-6xl px-4 py-20">
            <h2 data-reveal="fade" className="display text-4xl sm:text-5xl">
              {t.pricing.titleA} <span className="mark">{t.pricing.titleB}</span>
            </h2>
            <p data-reveal="fade" className="mt-5 max-w-xl text-lg text-muted">
              {t.pricing.subtitle}
            </p>
            <div data-reveal="fade" className="mt-12">
              <PricingPlans />
            </div>
            <div data-reveal="fade" className="mt-10 border-t border-border pt-8">
              <TrustStrip />
            </div>
          </div>
        </section>

        <Faq />

        {/* Closing CTA */}
        <section data-reveal="circle" className="theme-dark mx-2 mb-4 rounded-[2.5rem] sm:mx-4">
          <div className="mx-auto w-full max-w-6xl px-4 py-20">
            <div className="panel relative overflow-hidden px-6 py-16 text-center sm:px-12">
              <h2 className="display mx-auto max-w-3xl text-4xl sm:text-6xl">
                {t.closing.titleA} <span className="mark">{t.closing.titleB}</span>
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-muted">{t.closing.subtitle}</p>
              <TrialButton className="btn-primary mt-9 text-base" />
              <p className="mt-4 text-sm text-muted">{t.closing.trialNote(formatEur(locale, OFFER_PRICE_EUR.monthly))}</p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <ScrollReveal />
      <ActivityToast />
    </div>
  );
}
