import type { Metadata } from "next";
import { PricingPlans } from "@/components/pricing-plans";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TrustStrip } from "@/components/trust-strip";

export const metadata: Metadata = { title: "Tarifs — Scanzivo" };

export default function PricingPage() {
  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />
      <main id="contenu" className="mx-auto w-full max-w-5xl flex-1 px-4 pb-24 pt-16 sm:pt-24">
        <div>
          <h1 className="display text-4xl sm:text-6xl">
            Deux offres. <span className="mark">Prix affichés.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted">Pas d&apos;offre gratuite : un abonnement mensuel sans engagement, ou un accès à vie en un seul paiement.</p>
        </div>
        <div className="mt-12">
          <PricingPlans />
        </div>
        <div className="mt-10 border-t border-border pt-8">
          <TrustStrip />
        </div>
        <p className="mt-12 text-xs text-muted">
          Les analyses sont fournies à titre informatif et ne constituent pas un conseil en investissement.
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
