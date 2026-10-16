"use client";

import { useRouter } from "next/navigation";
import { savePendingOffer } from "@/lib/offers-client";
import { useI18n } from "@/i18n/client";
import { INTL_LOCALE } from "@/i18n/config";
import { formatEur } from "@/i18n/format";
import { OFFER_PRICE_EUR, type Offer, type Plan } from "@/lib/plans";
import { useAuth } from "./auth-provider";
import { BillingButton } from "./billing-button";

// Lifetime first: it is the better deal, and on phones the first card is the one people read.
const ORDER: Offer[] = ["lifetime", "monthly"];

function OfferCard({ offer, compact, currentPlan }: { offer: Offer; compact: boolean; currentPlan: Plan | null }) {
  const { user } = useAuth();
  const router = useRouter();
  const { t, locale, href } = useI18n();
  const p = t.pricing;
  const name = offer === "monthly" ? t.common.monthly : t.common.lifetime;
  const price = formatEur(locale, OFFER_PRICE_EUR[offer]);
  const months = (OFFER_PRICE_EUR.lifetime / OFFER_PRICE_EUR.monthly).toLocaleString(INTL_LOCALE[locale], { maximumFractionDigits: 1 });
  const { pitch, cta, note } =
    offer === "lifetime"
      ? { pitch: p.lifetimePitch(months), cta: p.lifetimeCta, note: p.lifetimeNote(formatEur(locale, OFFER_PRICE_EUR.monthly * 12)) }
      : { pitch: p.monthlyPitch, cta: p.monthlyCta, note: p.monthlyNote };
  const best = offer === "lifetime";
  const button = `${best ? "btn-primary" : "btn-secondary"} w-full ${compact ? "mt-6" : "mt-8"}`;
  const upgrade = offer === "lifetime" && currentPlan === "monthly";

  return (
    <div className={`panel relative flex flex-col ${compact ? "p-6" : "p-8"} ${best ? "border-brand/50 ring-1 ring-brand/30" : ""}`}>
      <div className="flex items-center justify-between gap-3">
        <h3 className="display text-2xl">{name}</h3>
        {best && <span className="chip border-brand/40 bg-brand/10 text-brand">{p.best}</span>}
      </div>
      <p className={`flex items-baseline gap-2 ${compact ? "mt-4" : "mt-6"}`}>
        <span className={`display ${compact ? "text-5xl" : "text-6xl"}`}>{price}</span>
        <span className="text-sm text-muted">{offer === "monthly" ? p.ttcMonthly : p.ttcLifetime}</span>
      </p>
      <p className="mt-3 font-medium leading-snug">{pitch}</p>
      <p className="mt-1 text-sm text-muted">{note}</p>
      {upgrade && <p className="mt-3 text-sm text-muted">{p.upgradeNote}</p>}
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
              router.push(href("/auth/signup"));
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
  const { t } = useI18n();
  return (
    <div>
      <div className={`grid ${compact ? "gap-4" : "gap-6"} ${offers.length > 1 ? "md:grid-cols-2" : ""}`}>
        {offers.map((offer) => (
          <OfferCard key={offer} offer={offer} compact={compact} currentPlan={currentPlan} />
        ))}
      </div>
      {compact ? (
        <p className="mt-4 text-center text-sm text-muted">
          {t.pricing.compactNote}
        </p>
      ) : (
        <div className="panel mt-6 p-6 sm:p-8">
          <h3 className="display text-lg">{t.pricing.includedTitle}</h3>
          <ul className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
            {t.pricing.included.map((feature) => (
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
