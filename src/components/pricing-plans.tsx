"use client";

import { useRouter } from "next/navigation";
import { savePendingOffer } from "@/lib/offers-client";
import { useI18n } from "@/i18n/client";
import { formatEur } from "@/i18n/format";
import { OFFER_PRICE_EUR, type Plan } from "@/lib/plans";
import { useAuth } from "./auth-provider";
import { BillingButton } from "./billing-button";

type SoldOffer = "monthly" | "trial";

/**
 * One offer on sale: the monthly subscription (the main offer) or the paid trial that turns into it.
 * Lifetime access is no longer sold; existing owners keep it.
 */
function OfferCard({ offer, compact }: { offer: SoldOffer; compact: boolean }) {
  const { user } = useAuth();
  const router = useRouter();
  const { t, locale, href } = useI18n();
  const p = t.pricing;
  const main = offer === "monthly";
  const price = formatEur(locale, OFFER_PRICE_EUR[offer]);
  const { name, unit, pitch, note, cta } = main
    ? { name: t.common.monthly, unit: p.ttcMonthly, pitch: p.monthlyPitch, note: p.monthlyNote, cta: p.monthlyCta }
    : {
        name: t.common.trial,
        unit: p.ttcTrial,
        pitch: p.trialPitch,
        note: p.trialNote(formatEur(locale, OFFER_PRICE_EUR.monthly)),
        cta: p.trialCta(price),
      };
  const button = `${main ? "btn-primary" : "btn-secondary"} w-full ${compact ? "mt-6" : "mt-8"}`;

  return (
    <div className={`panel relative flex flex-col ${main ? "border-brand/50 ring-1 ring-brand/30" : ""} ${compact ? "p-6" : "p-8"}`}>
      <h3 className="display text-2xl">{name}</h3>
      <p className={`flex flex-wrap items-baseline gap-x-2 ${compact ? "mt-4" : "mt-6"}`}>
        <span className={`display ${compact ? "text-5xl" : "text-6xl"}`}>{price}</span>
        <span className="whitespace-nowrap text-sm text-muted">{unit}</span>
      </p>
      <p className="mt-3 font-medium leading-snug">{pitch}</p>
      <p className="mt-1 text-sm text-muted">{note}</p>
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
 * The offers and what they include. `compact` is the dashboard picker; an account that already pays sees nothing to buy,
 * and one that used its trial sees the subscription only. Logged out, the choice is remembered and checkout opens right
 * after sign-up.
 */
export function PricingPlans({
  compact = false,
  currentPlan = null,
  trialUsed = false,
}: {
  compact?: boolean;
  currentPlan?: Plan | null;
  trialUsed?: boolean;
}) {
  const { t } = useI18n();
  if (currentPlan === "monthly" || currentPlan === "lifetime") return null;
  const offers: SoldOffer[] = trialUsed ? ["monthly"] : ["monthly", "trial"];
  return (
    <div>
      {compact ? (
        <div className={offers.length > 1 ? "" : "mx-auto max-w-md"}>
          <div className={`grid gap-4 ${offers.length > 1 ? "md:grid-cols-2" : ""}`}>
            {offers.map((offer) => (
              <OfferCard key={offer} offer={offer} compact />
            ))}
          </div>
          <p className="mt-4 text-center text-sm text-muted">{t.pricing.compactNote}</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {offers.map((offer) => (
            <OfferCard key={offer} offer={offer} compact={false} />
          ))}
          <div className="panel p-6 sm:p-8 md:col-span-2 lg:col-span-1">
            <h3 className="display text-lg">{t.pricing.includedTitle}</h3>
            <ul className="mt-4 grid gap-3">
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
        </div>
      )}
    </div>
  );
}
