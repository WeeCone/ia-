import type { Metadata } from "next";
import { PricingPlans } from "@/components/pricing-plans";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = { title: "Tarifs — Scanzivo" };

export default function PricingPage() {
  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 pb-24 pt-16 sm:pt-24">
        <div>
          <h1 className="display text-6xl sm:text-8xl">
            Deux offres. <span className="mark">Aucun piège.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg">Un abonnement mensuel sans engagement, ou un accès à vie en un seul paiement.</p>
        </div>
        <div className="mt-12">
          <PricingPlans />
        </div>
        <p className="mt-12 text-xs font-semibold">
          Paiement sécurisé par Stripe. Les analyses sont fournies à titre informatif et ne constituent pas un conseil en investissement.
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
