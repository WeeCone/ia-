"use client";

import { useState } from "react";
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

function Excluded() {
  return (
    <svg viewBox="0 0 16 16" className="mt-0.5 size-4 shrink-0 text-muted/70" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden>
      <path d="M4 8h8" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="10" cy="10" r="7.25" />
      <path d="M2.75 10h14.5M10 2.75c2 2.1 3 4.5 3 7.25s-1 5.15-3 7.25c-2-2.1-3-4.5-3-7.25s1-5.15 3-7.25z" />
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
      className={`panel relative flex flex-col ${pro ? "border-brand/60 ring-1 ring-brand/40" : lifetime ? "border-amber-400/40" : ""} ${compact ? "p-4 sm:p-5" : "p-5 sm:p-7"}`}
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
      {/* What sets Pro apart from Starter, said before the list rather than lost in it. */}
      {pack.highlight && (
        <div className={`rounded-xl border border-brand/40 bg-brand/[0.07] ${compact ? "mt-4 p-3.5" : "mt-5 p-4"}`}>
          <p className="flex items-center gap-2 text-sm font-semibold text-brand">
            <GlobeIcon />
            {pack.highlight.title}
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-foreground/80">{pack.highlight.text}</p>
        </div>
      )}
      <ul className={`grid gap-2.5 ${compact ? "mt-4" : "mt-5"}`}>
        {pack.features.map((feature) => (
          <li key={feature} className="flex gap-2.5 text-sm text-foreground/85">
            <Check />
            {feature}
          </li>
        ))}
        {pack.excluded.map((feature) => (
          <li key={feature} className="flex gap-2.5 text-sm text-muted line-through decoration-muted/60">
            <Excluded />
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
                    {formatEur(locale, OFFER_PRICE_EUR[offer])}
                    {offer === "lifetime" ? "" : t.pricing.perMonth}
                  </span>
                </button>
              );
            })}
          </div>
          <div className={offers.includes("monthly") ? "pt-6" : "pt-4"}>
            <PackCard offer={shown} compact={compact} current={!compact && shown === currentPlan} />
          </div>
        </div>
      )}
      <div
        className={`${offers.length > 1 ? "hidden md:grid" : "grid"} gap-5 ${compact ? "pt-3" : "gap-6 pt-3"} ${offers.length === 3 ? "md:grid-cols-3" : offers.length === 2 ? "md:grid-cols-2" : "mx-auto max-w-md"}`}
      >
        {offers.map((offer) => (
          <PackCard key={offer} offer={offer} compact={compact} current={!compact && offer === currentPlan} />
        ))}
      </div>
      <p className="mt-4 text-center text-sm text-muted">{t.pricing.compactNote}</p>
    </div>
  );
}
