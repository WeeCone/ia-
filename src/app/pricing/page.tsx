import type { Metadata } from "next";
import { PricingPlans } from "@/components/pricing-plans";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = { title: "Tarifs — NeuralTrade" };

export default function PricingPage() {
  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 pb-24 pt-16 sm:pt-24">
        <div>
          <p className="label">§ Tarifs</p>
          <h1 className="mt-4 font-display text-6xl leading-none sm:text-7xl">
            Deux offres. <em className="text-brand">Aucun piège.</em>
          </h1>
          <p className="mt-6 max-w-xl text-muted">Un abonnement mensuel sans engagement, ou un accès à vie en un seul paiement.</p>
        </div>
        <div className="mt-12">
          <PricingPlans />
        </div>
        <p className="mt-8 text-xs text-muted">
          Paiement sécurisé par Stripe. Les analyses sont fournies à titre informatif et ne constituent pas un conseil en investissement.
        </p>
      </main>
    </div>
  );
}
