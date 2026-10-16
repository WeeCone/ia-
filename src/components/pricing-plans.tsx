"use client";

import { useRouter } from "next/navigation";
import { savePendingOffer } from "@/lib/offers-client";
import { OFFERS, type Offer, type Plan } from "@/lib/plans";
import { useAuth } from "./auth-provider";
import { BillingButton } from "./billing-button";

const nbsp = (text: string) => text.replace(/ /g, " ");
const MONTHLY_EUR = Number.parseInt(OFFERS.monthly.price, 10);
const LIFETIME_EUR = Number.parseInt(OFFERS.lifetime.price, 10);
const MONTHS_TO_LIFETIME = (LIFETIME_EUR / MONTHLY_EUR).toLocaleString("fr-FR", { maximumFractionDigits: 1 });

export const INCLUDED = [
  "Crypto, forex, actions, indices, matières premières",
  "Un verdict : le scénario le plus probable, formulé en plan",
  "Entrée, stop, objectifs et ratio gain / risque",
  "Niveaux tracés sur votre capture",
  "Historique de vos analyses",
];

// Lifetime first: it is the better deal, and on phones the first card is the one people read.
const ORDER: Offer[] = ["lifetime", "monthly"];

const DETAILS: Record<Offer, { pitch: string; cta: string; note: string }> = {
  lifetime: {
    pitch: `Le prix de ${MONTHS_TO_LIFETIME} mois d'abonnement, puis plus rien à payer.`,
    cta: "Obtenir l'accès à vie",
    note: `Une année d'abonnement mensuel coûte ${nbsp(`${MONTHLY_EUR * 12} €`)}.`,
  },
  monthly: {
    pitch: "Sans engagement : résiliable en un clic, depuis votre espace.",
    cta: "S'abonner au mois",
    note: "Prélevé chaque mois, à la date de souscription.",
  },
};

function OfferCard({ offer, compact, currentPlan }: { offer: Offer; compact: boolean; currentPlan: Plan | null }) {
  const { user } = useAuth();
  const router = useRouter();
  const { name, price } = OFFERS[offer];
  const { pitch, cta, note } = DETAILS[offer];
  const best = offer === "lifetime";
  const button = `${best ? "btn-primary" : "btn-secondary"} w-full ${compact ? "mt-6" : "mt-8"}`;
  const upgrade = offer === "lifetime" && currentPlan === "monthly";

  return (
    <div className={`panel relative flex flex-col ${compact ? "p-6" : "p-8"} ${best ? "border-brand/50 ring-1 ring-brand/30" : ""}`}>
      <div className="flex items-center justify-between gap-3">
        <h3 className="display text-2xl">{name}</h3>
        {best && <span className="chip border-brand/40 bg-brand/10 text-brand">Meilleure offre</span>}
      </div>
      <p className={`flex items-baseline gap-2 ${compact ? "mt-4" : "mt-6"}`}>
        <span className={`display ${compact ? "text-5xl" : "text-6xl"}`}>{nbsp(price)}</span>
        <span className="text-sm text-muted">{offer === "monthly" ? "TTC / mois" : "TTC, paiement unique"}</span>
      </p>
      <p className="mt-3 font-medium leading-snug">{pitch}</p>
      <p className="mt-1 text-sm text-muted">{note}</p>
      {upgrade && <p className="mt-3 text-sm text-muted">Votre abonnement mensuel sera arrêté automatiquement, sans nouveau prélèvement.</p>}
      <div className="mt-auto">
        {user ? (
          <BillingButton route="checkout" offer={offer} block className={button}>
            {cta}
          </BillingButton>
        ) : (
          <button
            type="button"
            onClick={() => {
              savePendingOffer(offer);
              router.push("/auth/signup");
            }}
            className={button}
          >
            {cta}
          </button>
        )}
      </div>
    </div>
  );
}

/**
 * The two offers. `compact` is the dashboard picker; `currentPlan` hides what the account already has.
 * Logged out, the chosen offer is remembered and checkout opens right after sign-up.
 */
export function PricingPlans({ compact = false, currentPlan = null }: { compact?: boolean; currentPlan?: Plan | null }) {
  const offers = ORDER.filter((offer) => !(currentPlan === "monthly" && offer === "monthly"));
  return (
    <div>
      <div className={`grid ${compact ? "gap-4" : "gap-6"} ${offers.length > 1 ? "md:grid-cols-2" : ""}`}>
        {offers.map((offer) => (
          <OfferCard key={offer} offer={offer} compact={compact} currentPlan={currentPlan} />
        ))}
      </div>
      {compact ? (
        <p className="mt-4 text-center text-sm text-muted">
          Paiement sécurisé par Stripe · sans engagement pour l&apos;offre mensuelle
        </p>
      ) : (
        <div className="panel mt-6 p-6 sm:p-8">
          <h3 className="display text-lg">Inclus dans les deux offres</h3>
          <ul className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
            {INCLUDED.map((feature) => (
              <li key={feature} className="flex gap-3 text-sm text-muted">
                <svg viewBox="0 0 16 16" className="mt-0.5 size-4 shrink-0 text-accent" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M3.5 8.5l3 3 6-7" />
                </svg>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
