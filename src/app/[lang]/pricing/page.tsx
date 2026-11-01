import type { Metadata } from "next";
import { FaqList } from "@/components/faq";
import { PricingPlans } from "@/components/pricing-plans";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TrustStrip } from "@/components/trust-strip";
import { localePath } from "@/i18n/config";
import { getI18n, languageAlternates } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, t } = await getI18n();
  return {
    title: t.meta.pricingTitle,
    description: t.meta.pricingDescription,
    alternates: languageAlternates(locale, "/pricing"),
    // Prices show after a chart is read, not in search results: this page serves signed-in customers.
    robots: { index: false, follow: true },
    openGraph: {
      title: t.meta.pricingTitle,
      description: t.meta.pricingDescription,
      images: [{ url: localePath(locale, "/og"), width: 1200, height: 630 }],
    },
  };
}

export default async function PricingPage() {
  const { t } = await getI18n();
  const p = t.pricing;
  return (
    <div className="theme-light flex flex-1 flex-col">
      <SiteHeader />
      <main id="contenu" className="mx-auto w-full max-w-5xl flex-1 px-4 pb-24 pt-16 sm:pt-24">
        <h1 className="display max-w-3xl text-4xl sm:text-6xl">
          {p.titleA} <span className="mark">{p.titleB}</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted">{p.subtitle}</p>

        <div className="mt-12">
          <PricingPlans />
        </div>

        <div className="mt-10">
          <TrustStrip />
        </div>

        {/* The questions that stop people at the payment step. */}
        <section aria-labelledby="questions-paiement" className="mt-20 grid gap-8 lg:grid-cols-12">
          <h2 id="questions-paiement" className="display text-3xl lg:col-span-4">
            {p.faqTitle}
          </h2>
          <FaqList items={p.faq} className="lg:col-span-8" />
        </section>

        <p className="mt-16 text-xs text-muted">{p.footnote}</p>
      </main>
      <SiteFooter />
    </div>
  );
}
