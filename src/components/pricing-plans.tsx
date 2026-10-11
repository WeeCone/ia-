"use client";

import Link from "next/link";
import { MONTHLY_CREDITS, OFFERS, type Offer } from "@/lib/plans";
import { useAuth } from "./auth-provider";
import { BillingButton } from "./billing-button";

const check = (
  <svg viewBox="0 0 20 20" className="mt-0.5 size-4 shrink-0 text-brand" fill="currentColor" aria-hidden>
    <path fillRule="evenodd" d="M16.7 5.3a1 1 0 010 1.4l-8 8a1 1 0 01-1.4 0l-4-4a1 1 0 111.4-1.4L8 12.6l7.3-7.3a1 1 0 011.4 0z" clipRule="evenodd" />
  </svg>
);

const common = [
  `${MONTHLY_CREDITS} analyses de graphiques par mois`,
  "Crypto, forex, actions, matières premières",
  "Scénarios haussier et baissier probabilisés",
  "Entrée, stop et objectifs pour chaque scénario",
  "Historique de vos analyses",
];

const details: Record<Offer, { features: string[]; cta: string; highlight?: string }> = {
  monthly: { features: [...common, "Sans engagement, résiliable en un clic"], cta: "S'abonner" },
  lifetime: {
    features: [...common, "Un seul paiement, aucun renouvellement"],
    cta: "Obtenir l'accès à vie",
    highlight: "Meilleure offre",
  },
};

function OfferCard({ offer }: { offer: Offer }) {
  const { user } = useAuth();
  const { name, price, period } = OFFERS[offer];
  const { features, cta, highlight } = details[offer];

  return (
    <div
      className={`relative flex flex-col rounded-2xl border bg-surface p-8 ${
        highlight ? "border-brand shadow-[0_0_40px_-12px] shadow-brand/40" : "border-border"
      }`}
    >
      {highlight && (
        <span className="absolute -top-3 left-8 rounded-full bg-brand px-3 py-0.5 text-xs font-semibold text-background">{highlight}</span>
      )}
      <h2 className="text-lg font-semibold">{name}</h2>
      <p className="mt-4">
        <span className="text-4xl font-bold">{price}</span>
        <span className="text-muted"> {period}</span>
      </p>
      <ul className="mt-6 flex-1 space-y-3 text-sm">
        {features.map((feature) => (
          <li key={feature} className="flex gap-2">
            {check}
            {feature}
          </li>
        ))}
      </ul>
      {user ? (
        <BillingButton route="checkout" offer={offer} className={`${highlight ? "btn-primary" : "btn-secondary"} mt-8 w-full`}>
          {cta}
        </BillingButton>
      ) : (
        <Link href="/auth/signup" className={`${highlight ? "btn-primary" : "btn-secondary"} mt-8`}>
          {cta}
        </Link>
      )}
    </div>
  );
}

export function PricingPlans() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <OfferCard offer="monthly" />
      <OfferCard offer="lifetime" />
    </div>
  );
}
