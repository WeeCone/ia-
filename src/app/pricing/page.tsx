import type { Metadata } from "next";
import { PricingPlans } from "@/components/pricing-plans";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = { title: "Tarifs — NeuralTrade" };

export default function PricingPage() {
  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 pb-24 pt-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight">Des tarifs simples</h1>
          <p className="mt-4 text-muted">Un abonnement mensuel sans engagement, ou un accès à vie en un seul paiement.</p>
        </div>
        <div className="mt-12">
          <PricingPlans />
        </div>
        <p className="mt-10 text-center text-xs text-muted">
          Paiement sécurisé par Stripe. Les analyses sont fournies à titre informatif et ne constituent pas un conseil en investissement.
        </p>
      </main>
    </div>
  );
}
