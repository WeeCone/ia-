"use client";

import { useI18n } from "@/i18n/client";
import { formatEur } from "@/i18n/format";
import { OFFER_PRICE_EUR, type Offer, type Plan } from "@/lib/plans";
import { BillingButton } from "./billing-button";

const OFFERS: Offer[] = ["starter", "monthly", "lifetime"];

/** Which packs an account can still buy: nothing on top of À vie, only À vie on top of Pro, an upgrade from Starter. */
export function buyableOffers(plan: Plan | null | undefined): Offer[] {
  if (plan === "lifetime") return [];
  if (plan === "monthly") return ["lifetime"];
  if (plan === "starter") return ["monthly", "lifetime"];
  return OFFERS;
}

function Check() {
  return (
    <svg viewBox="0 0 16 16" className="mt-0.5 size-4 shrink-0 text-accent" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3.5 8.5l3 3 6-7" />
    </svg>
  );
}

/** One pack: its price, what it holds, and the button that opens Stripe's payment (signed in or not). */
export function PackCard({ offer, compact = false, current = false }: { offer: Offer; compact?: boolean; current?: boolean }) {
  const { t, locale } = useI18n();
  const p = t.pricing;
  const pack = p.packs[offer];
  const name = t.common[offer];
  const pro = offer === "monthly";
  const lifetime = offer === "lifetime";

  return (
    <div
      className={`panel relative flex flex-col ${pro ? "border-brand/60 ring-1 ring-brand/40" : lifetime ? "border-amber-400/40" : ""} ${compact ? "p-5" : "p-7"}`}
    >
      {pro && (
        <span className="label absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-brand px-3 py-1 text-background">
          {p.recommended}
        </span>
      )}
      <h3 className={`display ${compact ? "text-xl" : "text-2xl"}`}>{name}</h3>
      <p className={`flex flex-wrap items-baseline gap-x-2 ${compact ? "mt-3" : "mt-5"}`}>
        <span className={`display ${compact ? "text-4xl" : "text-5xl"} ${lifetime ? "text-warn" : ""}`}>{formatEur(locale, OFFER_PRICE_EUR[offer])}</span>
        <span className="whitespace-nowrap text-sm text-muted">{lifetime ? p.oneOff : p.perMonth}</span>
      </p>
      <p className="mt-3 font-medium leading-snug">{pack.pitch}</p>
      <ul className={`grid gap-2.5 ${compact ? "mt-4" : "mt-5"}`}>
        {pack.features.map((feature) => (
          <li key={feature} className="flex gap-2.5 text-sm text-foreground/85">
            <Check />
            {feature}
          </li>
        ))}
      </ul>
      <div className={`mt-auto ${compact ? "pt-5" : "pt-7"}`}>
        {current ? (
          <p className="rounded-xl border border-border py-3 text-center text-sm text-muted">{p.current}</p>
        ) : (
          <BillingButton route="checkout" offer={offer} block className={`${pro ? "btn-primary" : "btn-secondary"} w-full`}>
            {p.cta(name)}
          </BillingButton>
        )}
        <p className="mt-2 text-center text-xs text-muted">{pack.note}</p>
      </div>
    </div>
  );
}

/**
 * The three packs. `compact` is the dashboard picker: an account sees the packs it can still buy (an upgrade from
 * Starter, À vie from Pro, nothing on top of À vie). Any pack can be bought signed out: Stripe asks for the email.
 */
export function PricingPlans({ compact = false, currentPlan = null }: { compact?: boolean; currentPlan?: Plan | null }) {
  const { t } = useI18n();
  const offers = compact ? buyableOffers(currentPlan) : OFFERS;
  if (!offers.length) return null;
  return (
    <div>
      <div className={`grid gap-5 ${compact ? "pt-3" : "gap-6 pt-3"} ${offers.length === 3 ? "md:grid-cols-3" : offers.length === 2 ? "md:grid-cols-2" : "mx-auto max-w-md"}`}>
        {offers.map((offer) => (
          <PackCard key={offer} offer={offer} compact={compact} current={!compact && offer === currentPlan} />
        ))}
      </div>
      <p className="mt-4 text-center text-sm text-muted">{t.pricing.compactNote}</p>
    </div>
  );
}
