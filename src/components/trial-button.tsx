"use client";

import { useRouter } from "next/navigation";
import { useI18n } from "@/i18n/client";
import { formatEur } from "@/i18n/format";
import { savePendingOffer } from "@/lib/offers-client";
import { OFFER_PRICE_EUR } from "@/lib/plans";
import { useAuth } from "./auth-provider";

/**
 * Starts the paid trial from anywhere on the public site: the choice is remembered, then the visitor signs up (or lands
 * on the dashboard when already signed in) and the payment opens there.
 */
export function TrialButton({ className }: { className?: string }) {
  const { user } = useAuth();
  const router = useRouter();
  const { t, locale, href } = useI18n();
  return (
    <button
      type="button"
      onClick={() => {
        savePendingOffer("trial");
        router.push(href(user ? "/dashboard" : "/auth/signup"));
      }}
      className={className}
    >
      {t.closing.trialCta(formatEur(locale, OFFER_PRICE_EUR.trial))}
    </button>
  );
}
