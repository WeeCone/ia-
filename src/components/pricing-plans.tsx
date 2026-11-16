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

function Excluded() {
  return (
    <svg viewBox="0 0 16 16" className="mt-px size-3.5 shrink-0 text-muted/70" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden>
      <path d="M4 8h8" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
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
      className={`panel relative flex flex-col ${pro ? "border-brand/60 ring-1 ring-brand/40" : lifetime ? "border-amber-400/40" : ""} p-3.5 sm:p-4`}
    >
      {pro && (
        <span className="label absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-brand px-3 py-1 text-background">
          {p.recommended}
        </span>
      )}
      <h3 className="display text-base">{name}</h3>
      <p className="mt-1.5 flex flex-wrap items-baseline gap-x-1.5">
        <span className={`display text-3xl ${lifetime ? "text-warn" : ""}`}>{formatPrice(locale, offer)}</span>
        <span className="whitespace-nowrap text-xs text-muted">{lifetime ? p.oneOff : p.perMonth}</span>
      </p>
      <p className="mt-2 text-sm font-medium leading-snug">{pack.pitch}</p>
      {/* What sets Pro apart from Starter, said before the list rather than lost in it. */}
      {pack.highlight && (
        <div className="mt-2.5 rounded-lg border border-brand/40 bg-brand/[0.07] px-2.5 py-1.5">
          <p className="flex items-center gap-1.5 text-xs font-semibold text-brand">
            <GlobeIcon />
            {pack.highlight.title}
          </p>
        </div>
      )}
      <ul className="mt-3 grid gap-1.5">
        {pack.features.map((feature) => (
          <li key={feature} className="flex gap-2 text-[13px] leading-snug text-foreground/85">
            <Check />
            {feature}
          </li>
        ))}
        {pack.excluded.map((feature) => (
          <li key={feature} className="flex gap-2 text-[13px] leading-snug text-muted line-through decoration-muted/60">
            <Excluded />
            {feature}
          </li>
        ))}
      </ul>
      <div className="mt-auto pt-3.5">
        {current ? (
          <p className="rounded-lg border border-border py-2 text-center text-xs text-muted">{p.current}</p>
        ) : (
          <BillingButton route="checkout" offer={offer} block className={`${pro ? "btn-primary" : "btn-secondary"} w-full !px-4 !py-2 !text-[13px]`}>
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
        className={`${offers.length > 1 ? "hidden md:grid" : "grid"} gap-3 pt-3 ${offers.length === 3 ? "mx-auto max-w-3xl md:grid-cols-3" : offers.length === 2 ? "mx-auto max-w-xl md:grid-cols-2" : "mx-auto max-w-xs"}`}
      >
        {offers.map((offer) => (
          <PackCard key={offer} offer={offer} compact={compact} current={!compact && offer === currentPlan} />
        ))}
      </div>
      <p className="mt-3 text-center text-xs text-muted">{t.pricing.compactNote}</p>
    </div>
  );
}
