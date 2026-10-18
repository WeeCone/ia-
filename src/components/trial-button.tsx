"use client";

import { useRouter } from "next/navigation";
import { useI18n } from "@/i18n/client";
import { formatEur } from "@/i18n/format";
import { redirectToBilling } from "@/lib/billing-client";
import { EMBEDDED_CHECKOUT, openCheckout, savePendingOffer } from "@/lib/offers-client";
import { OFFER_PRICE_EUR } from "@/lib/plans";
import { useAuth } from "./auth-provider";

/**
 * Starts the paid trial from anywhere on the public site. Signed out, the payment opens right away: Stripe asks for the
 * email and the account is made from it once paid. Signed in, the dashboard opens the payment, and only for an account
 * that can still take the trial.
 */
export function TrialButton({ className, children }: { className?: string; children?: React.ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();
  const { t, locale, href } = useI18n();
  return (
    <button
      type="button"
      onClick={() => {
        if (user) {
          savePendingOffer("trial");
          router.push(href("/dashboard"));
        } else if (EMBEDDED_CHECKOUT) {
          openCheckout("trial");
        } else {
          redirectToBilling("checkout", "trial", locale).catch(() => router.push(href("/auth/signup")));
        }
      }}
      className={className}
    >
      {children ?? t.closing.trialCta(formatEur(locale, OFFER_PRICE_EUR.trial))}
    </button>
  );
}
