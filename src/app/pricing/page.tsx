import type { Metadata } from "next";
import { PricingPlans } from "@/components/pricing-plans";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = { title: "Tarifs — Scanzivo" };

export default function PricingPage() {
  return (
    <div className="paper flex flex-1 flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-24 pt-10 sm:pt-20">
        <h1 className="display text-4xl sm:text-7xl">Deux formules, prix affichés.</h1>
        <p className="mt-4 max-w-xl text-muted sm:mt-6 sm:text-lg">Pas d&apos;offre gratuite : un abonnement mensuel sans engagement, ou un accès à vie en un seul paiement.</p>
        <div className="mt-8 sm:mt-14">
          <PricingPlans />
        </div>
        <p className="mt-12 text-sm text-muted">
          Paiement sécurisé par Stripe. Les analyses sont fournies à titre informatif et ne constituent pas un conseil en investissement.
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
