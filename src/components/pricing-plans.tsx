"use client";

import Link from "next/link";
import { MONTHLY_CREDITS, OFFERS, type Offer } from "@/lib/plans";
import { useAuth } from "./auth-provider";
import { BillingButton } from "./billing-button";

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

function OfferCard({ offer, index }: { offer: Offer; index: number }) {
  const { user } = useAuth();
  const { name, price, period } = OFFERS[offer];
  const { features, cta, highlight } = details[offer];
  const button = highlight ? "btn-primary" : "btn-secondary";

  return (
    <div className={`relative flex flex-col p-8 ${highlight ? "bg-surface outline outline-1 outline-brand" : ""}`}>
      <div className="flex items-center justify-between">
        <span className="label">Offre {String(index + 1).padStart(2, "0")}</span>
        {highlight && <span className="bg-brand px-2 py-0.5 font-mono text-[11px] uppercase tracking-[0.18em] text-background">{highlight}</span>}
      </div>
      <h2 className="mt-8 font-display text-4xl">{name}</h2>
      <p className="mt-2 flex items-baseline gap-3">
        <span className="font-display text-7xl leading-none">{price}</span>
        <span className="label">{period}</span>
      </p>
      <ul className="mt-8 flex-1 divide-y divide-border border-y border-border text-sm">
        {features.map((feature) => (
          <li key={feature} className="flex gap-3 py-2.5">
            <span className="font-mono text-brand">+</span>
            {feature}
          </li>
        ))}
      </ul>
      {user ? (
        <BillingButton route="checkout" offer={offer} className={`${button} mt-8 w-full`}>
          {cta}
        </BillingButton>
      ) : (
        <Link href="/auth/signup" className={`${button} mt-8`}>
          {cta}
        </Link>
      )}
    </div>
  );
}

export function PricingPlans() {
  return (
    <div className="grid border border-border md:grid-cols-2 md:divide-x md:divide-border">
      <OfferCard offer="monthly" index={0} />
      <OfferCard offer="lifetime" index={1} />
    </div>
  );
}
