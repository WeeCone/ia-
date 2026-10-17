"use client";

import { useRouter } from "next/navigation";
import { savePendingOffer } from "@/lib/offers-client";
import { useI18n } from "@/i18n/client";
import { formatEur } from "@/i18n/format";
import { OFFER_PRICE_EUR, type Plan } from "@/lib/plans";
import { useAuth } from "./auth-provider";
import { BillingButton } from "./billing-button";

/** The monthly subscription, the only offer on sale (lifetime access is no longer sold; existing owners keep it). */
function OfferCard({ compact }: { compact: boolean }) {
  const { user } = useAuth();
  const router = useRouter();
  const { t, locale, href } = useI18n();
  const p = t.pricing;
  const button = `btn-primary w-full ${compact ? "mt-6" : "mt-8"}`;

  return (
    <div className={`panel relative flex flex-col border-brand/50 ring-1 ring-brand/30 ${compact ? "p-6" : "p-8"}`}>
      <h3 className="display text-2xl">{t.common.monthly}</h3>
      <p className={`flex items-baseline gap-2 ${compact ? "mt-4" : "mt-6"}`}>
        <span className={`display ${compact ? "text-5xl" : "text-6xl"}`}>{formatEur(locale, OFFER_PRICE_EUR.monthly)}</span>
        <span className="text-sm text-muted">{p.ttcMonthly}</span>
      </p>
      <p className="mt-3 font-medium leading-snug">{p.monthlyPitch}</p>
      <p className="mt-1 text-sm text-muted">{p.monthlyNote}</p>
      <div className="mt-auto">
        {user ? (
          <BillingButton route="checkout" offer="monthly" block className={button}>
            {p.monthlyCta}
          </BillingButton>
        ) : (
          <button
            type="button"
            onClick={() => {
              savePendingOffer("monthly");
              router.push(href("/auth/signup"));
            }}
            className={button}
          >
            {p.monthlyCta}
          </button>
        )}
      </div>
    </div>
  );
}

/**
 * The offer card and what it includes. `compact` is the dashboard picker; an account that already pays sees nothing to buy.
 * Logged out, the choice is remembered and checkout opens right after sign-up.
 */
export function PricingPlans({ compact = false, currentPlan = null }: { compact?: boolean; currentPlan?: Plan | null }) {
  const { t } = useI18n();
  if (currentPlan === "monthly" || currentPlan === "lifetime") return null;
  return (
    <div>
      {compact ? (
        <div className="mx-auto max-w-md">
          <OfferCard compact />
          <p className="mt-4 text-center text-sm text-muted">{t.pricing.compactNote}</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-[minmax(0,26rem)_1fr]">
          <OfferCard compact={false} />
          <div className="panel p-6 sm:p-8">
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
