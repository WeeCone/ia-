import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DropBar } from "@/components/drop-bar";
import { FaqList } from "@/components/faq";
import { ScrollReveal } from "@/components/scroll-reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { goldGuides, readingMinutes } from "@/content/blog";
import { GOLD, goldLocales } from "@/content/gold";
import Link from "next/link";
import { localePath } from "@/i18n/config";
import { getI18n } from "@/i18n/server";

const SITE = "https://scanzivo.com";

/** Heading of the list of gold guides, per language (the list shows only where guides exist). */
const GUIDES_TITLE: Record<string, string> = {
  fr: "Guides pour trader l'or",
  en: "Guides to trading gold",
  es: "Guías para operar el oro",
  it: "Guide per fare trading sull'oro",
  de: "Ratgeber zum Goldhandel",
  pt: "Guias para operar ouro",
  ja: "金（ゴールド）取引のガイド",
  ko: "금 거래 가이드",
  vi: "Hướng dẫn giao dịch vàng",
  id: "Panduan trading emas",
};

export async function generateMetadata(): Promise<Metadata> {
  const { locale } = await getI18n();
  const page = GOLD[locale];
  if (!page) return {};
  const path = localePath(locale, "/gold");
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: {
      canonical: path,
      languages: { ...Object.fromEntries(goldLocales().map((other) => [other, localePath(other, "/gold")])), "x-default": "/gold" },
    },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: `${SITE}${path}`,
      images: [{ url: `${path}/og`, width: 1200, height: 630, alt: page.metaTitle }],
    },
    twitter: { card: "summary_large_image", title: page.metaTitle, description: page.metaDescription, images: [`${path}/og`] },
  };
}

/**
 * The gold (XAU/USD) page: what the analysis does on gold, the 1H/15m/5m routine, the context the Pro pack adds, the
 * limits and the CFD risk, and the same drop bar as the home page. No price, no figures about users.
 */
export default async function GoldPage() {
  const { locale, t } = await getI18n();
  const page = GOLD[locale];
  if (!page) notFound();
  const url = `${SITE}${localePath(locale, "/gold")}`;
  const guides = goldGuides(locale);
  const structured = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: page.metaTitle,
      description: page.metaDescription,
      url,
      inLanguage: locale,
      about: { "@type": "Thing", name: "XAU/USD" },
      publisher: { "@id": "https://scanzivo.com/#organization" },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      inLanguage: locale,
      mainEntity: page.faq.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Scanzivo", item: `${SITE}${localePath(locale, "/")}` },
        { "@type": "ListItem", position: 2, name: page.breadcrumb, item: url },
      ],
    },
  ];

  return (
    <div className="theme-light flex flex-1 flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structured).replace(/</g, "\\u003c") }} />
      <SiteHeader />
      <main id="contenu" className="flex-1">
        {/* Hero: the promise, then straight to the drop bar. */}
        <section className="relative isolate -mt-20 overflow-hidden pt-20">
          <div className="absolute -top-48 left-1/2 -z-10 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-amber-400/20 blur-[120px]" aria-hidden />
          <div className="mx-auto max-w-5xl px-4 pb-16 pt-14 text-center sm:pt-20">
            <p className="label rise-in text-warn">{page.kicker}</p>
            <h1 className="rise-in display mx-auto mt-5 max-w-4xl text-[2.5rem] leading-[1.02] tracking-[-0.03em] sm:text-6xl lg:text-7xl">
              {page.title}
              <br />
              <span className="text-muted">{page.titleB}</span>
            </h1>
            <p style={{ "--d": "0.1s" } as React.CSSProperties} className="rise-in mx-auto mt-6 max-w-2xl text-xl font-medium leading-snug text-warn">
              {page.lede}
            </p>
            <p style={{ "--d": "0.15s" } as React.CSSProperties} className="rise-in mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted">
              {page.intro}
            </p>
            <div id="analyser" style={{ "--d": "0.3s" } as React.CSSProperties} className="rise-in mt-10 scroll-mt-32">
              <DropBar />
              <p className="mx-auto mt-4 max-w-xl text-sm text-muted">{t.hero.freeLine}</p>
            </div>
          </div>
        </section>

        {/* The routine, with an illustrative reading laid out the way a report reads. */}
        <section className="mx-auto max-w-6xl px-4 py-20">
          <h2 data-reveal="fade" className="display max-w-2xl text-4xl sm:text-5xl">
            {page.routineTitle}
          </h2>
          <p data-reveal="fade" className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
            {page.routineIntro}
          </p>
          <ol data-reveal-stagger className="mt-12 grid gap-10 border-t border-border pt-8 md:grid-cols-3 md:gap-12">
            {page.steps.map((step) => (
              <li key={step.tf}>
                <span className="display block font-mono text-4xl leading-none text-warn">{step.tf}</span>
                <h3 className="display mt-5 text-2xl">{step.title}</h3>
                <p className="mt-2 max-w-sm leading-relaxed text-muted">{step.text}</p>
              </li>
            ))}
          </ol>

          <figure data-reveal="fade" className="panel mt-14 overflow-hidden">
            <figcaption className="flex items-center justify-between gap-3 border-b border-border bg-surface/60 px-5 py-3">
              <span className="label">XAU/USD</span>
              <span className="chip border-amber-400/40 text-warn">{page.example.label}</span>
            </figcaption>
            <dl className="divide-y divide-border">
              {page.example.rows.map((row) => (
                <div key={row.tf} className="grid gap-1 px-5 py-4 sm:grid-cols-[5rem_1fr_1.4fr] sm:items-baseline sm:gap-6">
                  <dt className="font-mono text-sm font-semibold text-warn">{row.tf}</dt>
                  <dd className="text-foreground/90">{row.reading}</dd>
                  <dd className="font-mono text-sm text-muted">{row.plan}</dd>
                </div>
              ))}
            </dl>
            <p className="border-t border-border px-5 py-3 text-xs text-muted">{page.example.note}</p>
          </figure>
        </section>

        {/* What the analysis does differently on gold, then what the Pro pack adds. */}
        <section className="theme-dark mx-2 rounded-[2.5rem] sm:mx-4">
          <div className="mx-auto max-w-6xl px-4 py-20">
            <h2 data-reveal="fade" className="display max-w-2xl text-4xl sm:text-5xl">
              {page.knowsTitle}
            </h2>
            <ul data-reveal-stagger className="mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2">
              {page.knows.map((item) => (
                <li key={item.title} className="border-t border-border pt-5">
                  <h3 className="display text-xl">{item.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{item.text}</p>
                </li>
              ))}
            </ul>
            <div data-reveal="fade" className="mt-14 rounded-2xl border border-amber-400/30 bg-amber-400/[0.06] p-6 sm:p-8">
              <h3 className="display text-2xl text-warn">{page.macroTitle}</h3>
              <p className="mt-3 max-w-3xl leading-relaxed text-foreground/85">{page.macroText}</p>
            </div>
          </div>
        </section>

        {/* Tools, limits and the CFD warning, said plainly. */}
        <section className="mx-auto grid max-w-6xl gap-14 px-4 py-20 md:grid-cols-2">
          <div data-reveal="fade">
            <h2 className="display text-3xl sm:text-4xl">{page.platformsTitle}</h2>
            <p className="mt-4 leading-relaxed text-muted">{page.platformsText}</p>
          </div>
          <div data-reveal="fade">
            <h2 className="display text-3xl sm:text-4xl">{page.limitsTitle}</h2>
            <ul className="mt-4 space-y-2.5">
              {page.limits.map((limit) => (
                <li key={limit} className="flex gap-3 leading-relaxed text-muted">
                  <span className="mt-2.5 h-px w-3 shrink-0 bg-muted" aria-hidden />
                  {limit}
                </li>
              ))}
            </ul>
            <p className="mt-6 rounded-xl border border-border bg-card px-4 py-3 text-sm leading-relaxed">{page.cfd}</p>
          </div>
        </section>

        <section className="mx-auto w-full max-w-4xl px-4 pb-20">
          <h2 data-reveal="fade" className="display text-3xl sm:text-4xl">
            {page.faqTitle}
          </h2>
          <FaqList items={page.faq} className="mt-8" />
        </section>

        {guides.length > 0 && (
          <section className="mx-auto w-full max-w-6xl px-4 pb-20">
            <h2 data-reveal="fade" className="display text-3xl sm:text-4xl">
              {GUIDES_TITLE[locale] ?? GUIDES_TITLE.en}
            </h2>
            <ul data-reveal-stagger className="mt-8 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
              {guides.map((guide) => (
                <li key={guide.slug} className="border-t border-border pt-4">
                  <Link href={localePath(locale, `/blog/${guide.slug}`)} className="display text-lg leading-snug hover:text-warn">
                    {guide.title}
                  </Link>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{guide.description}</p>
                  <p className="mt-2 text-xs text-muted">{readingMinutes(guide)} min</p>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section data-reveal="circle" className="theme-dark mx-2 mb-4 rounded-[2.5rem] sm:mx-4">
          <div className="mx-auto max-w-4xl px-4 py-20 text-center">
            <h2 className="display mx-auto max-w-3xl text-4xl sm:text-5xl">{page.closingTitle}</h2>
            <a href="#analyser" className="btn-primary mt-9 text-base">
              {page.cta}
            </a>
            <p className="mt-4 text-sm text-muted">{t.hero.freeLine}</p>
            <p className="mx-auto mt-6 max-w-xl text-xs text-muted">{t.common.riskWarning}</p>
          </div>
        </section>
      </main>
      <SiteFooter />
      <ScrollReveal />
    </div>
  );
}
