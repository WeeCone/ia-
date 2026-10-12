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

function OfferCard({ offer }: { offer: Offer }) {
  const { user } = useAuth();
  const { name, price, period } = OFFERS[offer];
  const { features, cta, highlight } = details[offer];
  const button = highlight ? "btn-primary" : "btn-secondary";

  return (
    <div className={`panel relative flex flex-col p-8 ${highlight ? "glow" : ""}`}>
      {highlight && (
        <span className="chip absolute -top-3 right-6 border-accent/50 bg-background text-accent">
          {highlight}
        </span>
      )}
      <h2 className="display text-2xl">{name}</h2>
      <p className="mt-6 flex items-baseline gap-3">
        <span className="display text-6xl">{price}</span>
        <span className="label text-muted">{period}</span>
      </p>
      <ul className="mt-8 flex-1 space-y-3">
        {features.map((feature) => (
          <li key={feature} className="flex gap-3 text-sm text-muted">
            <span className="grid size-5 shrink-0 place-items-center rounded-full bg-accent/15 text-[11px] font-bold text-accent">✓</span>
            {feature}
          </li>
        ))}
      </ul>
      {user ? (
        <BillingButton route="checkout" offer={offer} className={`${button} mt-10 w-full`}>
          {cta}
        </BillingButton>
      ) : (
        <Link href="/auth/signup" className={`${button} mt-10`}>
          {cta}
        </Link>
      )}
    </div>
  );
}

export function PricingPlans() {
  return (
    <div className="grid gap-10 md:grid-cols-2">
      <OfferCard offer="monthly" />
      <OfferCard offer="lifetime" />
    </div>
  );
}
