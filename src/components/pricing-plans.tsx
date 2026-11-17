"use client";

import { useState } from "react";
import { useI18n } from "@/i18n/client";
import { formatPrice } from "@/i18n/format";
import { type Offer, type Plan } from "@/lib/plans";
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
    <svg viewBox="0 0 16 16" className="mt-px size-3.5 shrink-0 text-accent" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
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

  const [fullCapacity] = pack.features;
  // The card says one thing, how many analyses the pack holds ("1 analyse par jour", "Analyses illimitées", "30 analyses
  // complètes chaque mois"), first clause only. The detail of what each pack holds is shown in the payment window beside
  // the order, and in the FAQ and the terms.
  const capacity = fullCapacity.split(/\s*[,，、]\s*/)[0] || fullCapacity;

  return (
    <div
      className={`panel relative flex flex-col p-3.5 sm:p-4 ${
        pro ? "border-brand/70 bg-gradient-to-b from-brand/[0.10] to-transparent shadow-[0_16px_40px_-18px_rgb(0_210_255/0.45)] ring-1 ring-brand/50" : lifetime ? "border-amber-400/40" : ""
      }`}
    >
      {pro && (
        <span className="label absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-brand px-3 py-1 text-background">
          {p.recommended}
        </span>
      )}
      <h3 className="display text-base">{name}</h3>
      <p className="mt-1 flex flex-wrap items-baseline gap-x-1.5">
        <span className={`display text-3xl tabular-nums ${lifetime ? "text-warn" : ""}`}>{formatPrice(locale, offer)}</span>
        <span className="whitespace-nowrap text-xs text-muted">{lifetime ? p.oneOff : p.perMonth}</span>
      </p>
      <p className="mt-3 flex items-start gap-2 rounded-lg bg-accent/10 px-3 py-2.5 text-[15px] font-bold leading-snug">
        <Check />
        {capacity}
      </p>
      <div className="mt-auto pt-3.5">
        {current ? (
          <p className="rounded-lg border border-border py-2 text-center text-xs text-muted">{p.current}</p>
        ) : (
          <BillingButton route="checkout" offer={offer} block className={`${pro ? "btn-primary" : "btn-secondary"} w-full !px-4 !py-2.5 !text-sm`}>
            {p.cta(name)}
          </BillingButton>
        )}
        <p className="mt-1.5 text-center text-[11px] leading-tight text-muted">{pack.note}</p>
      </div>
    </div>
  );
}

/**
 * The three packs. `compact` is the dashboard picker: an account sees the packs it can still buy (an upgrade from
 * Starter, À vie from Pro, nothing on top of À vie). Any pack can be bought signed out: Stripe asks for the email.
 */
export function PricingPlans({ compact = false, currentPlan = null }: { compact?: boolean; currentPlan?: Plan | null }) {
  const { t, locale } = useI18n();
  const offers = compact ? buyableOffers(currentPlan) : OFFERS;
  // Phones: one pack at a time behind a three-way switch, Pro shown first, instead of three tall cards in a column.
  const [picked, setPicked] = useState<Offer>(offers.includes("monthly") ? "monthly" : (offers[0] ?? "monthly"));
  if (!offers.length) return null;
  const shown = offers.includes(picked) ? picked : offers[0];
  return (
    <div>
      {offers.length > 1 && (
        <div className="md:hidden">
          <div role="tablist" aria-label={t.pricing.titleA} className="grid gap-1 rounded-2xl border border-border bg-card/60 p-1" style={{ gridTemplateColumns: `repeat(${offers.length}, minmax(0, 1fr))` }}>
            {offers.map((offer) => {
              const active = offer === shown;
              return (
                <button
                  key={offer}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setPicked(offer)}
                  className={`rounded-xl px-2 py-2 text-center transition ${active ? "bg-foreground text-background" : "text-muted hover:text-foreground"}`}
                >
                  <span className="block text-sm font-semibold leading-tight">{t.common[offer]}</span>
                  <span className={`block text-xs ${active ? "opacity-80" : ""}`}>
                    {formatPrice(locale, offer)}
                    {offer === "lifetime" ? "" : t.pricing.perMonth}
                  </span>
                </button>
              );
            })}
          </div>
          <div className={offers.includes("monthly") ? "mx-auto max-w-xs pt-5" : "mx-auto max-w-xs pt-3"}>
            <PackCard offer={shown} compact={compact} current={!compact && shown === currentPlan} />
          </div>
        </div>
      )}
      <div
        className={`${offers.length > 1 ? "hidden md:grid" : "grid"} gap-3 pt-3 ${offers.length === 3 ? "mx-auto max-w-2xl md:grid-cols-3" : offers.length === 2 ? "mx-auto max-w-xl md:grid-cols-2" : "mx-auto max-w-xs"}`}
      >
        {offers.map((offer) => (
          <PackCard key={offer} offer={offer} compact={compact} current={!compact && offer === currentPlan} />
        ))}
      </div>
      <p className="mt-3 text-center text-xs text-muted">{t.pricing.compactNote}</p>
    </div>
  );
}
