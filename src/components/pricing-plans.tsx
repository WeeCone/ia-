"use client";

import Link from "next/link";
import { MONTHLY_CREDITS, OFFERS, type Offer } from "@/lib/plans";
import { useAuth } from "./auth-provider";
import { BillingButton } from "./billing-button";

const INCLUDED = [
  `${MONTHLY_CREDITS} analyses de graphiques par mois`,
  "Le verdict et le plan chiffré : entrée, stop, objectifs, gain / risque",
  "Les niveaux tracés sur votre capture",
  "Crypto, forex, actions, indices, matières premières",
  "L'historique de vos analyses, captures comprises",
];

const DETAILS: Record<Offer, { line: string; note: string; cta: string }> = {
  monthly: { line: "Sans engagement, résiliable en un clic.", note: "Quota rechargé à chaque échéance.", cta: "S'abonner" },
  lifetime: { line: "Un seul paiement, aucun renouvellement.", note: "Le prix de 4,5 mois d'abonnement. Quota rechargé chaque mois civil.", cta: "Obtenir l'accès à vie" },
};

function Offer({ offer }: { offer: Offer }) {
  const { user } = useAuth();
  const { name, price, period } = OFFERS[offer];
  const { line, note, cta } = DETAILS[offer];
  const button = offer === "lifetime" ? "btn-primary" : "btn-secondary";

  return (
    <div className="flex flex-col py-6 md:px-8 md:py-2 md:first:pl-0 md:last:pr-0">
      <h3 className="font-[family-name:var(--font-bodoni)] text-3xl font-bold">{name}</h3>
      <p className="mt-4 flex items-baseline gap-3">
        <span className="font-[family-name:var(--font-bodoni)] text-6xl font-bold tracking-tight">{price}</span>
        <span className="text-muted">{period}</span>
      </p>
      <p className="mt-4 font-semibold">{line}</p>
      <p className="mt-1 flex-1 text-sm text-muted">{note}</p>
      {user ? (
        <BillingButton route="checkout" offer={offer} className={`${button} mt-7 w-full py-3.5`} block>
          {cta}
        </BillingButton>
      ) : (
        <Link href="/auth/signup" className={`${button} mt-7 py-3.5`}>
          {cta}
        </Link>
      )}
    </div>
  );
}

/** Both offers side by side, with what they share stated once. */
export function PricingPlans() {
  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <div className="order-2 lg:order-1 lg:col-span-4">
        <p className="font-[family-name:var(--font-bodoni)] text-xl font-bold italic">Inclus dans les deux formules</p>
        <ul className="mt-4 divide-y divide-border border-y border-border">
          {INCLUDED.map((item) => (
            <li key={item} className="flex gap-3 py-2.5 text-sm">
              <svg viewBox="0 0 16 16" className="mt-0.5 size-4 shrink-0 text-bull" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="square" aria-hidden>
                <path d="M3 8.5l3 3 7-7" />
              </svg>
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="order-1 grid divide-y divide-border border-y-2 border-foreground md:grid-cols-2 md:divide-x md:divide-y-0 md:py-8 lg:order-2 lg:col-span-8">
        <Offer offer="monthly" />
        <Offer offer="lifetime" />
      </div>
    </div>
  );
}
