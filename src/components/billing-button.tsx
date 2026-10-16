"use client";

import { useState } from "react";
import { redirectToBilling } from "@/lib/billing-client";
import { useI18n } from "@/i18n/client";
import { EMBEDDED_CHECKOUT, openCheckout } from "@/lib/offers-client";
import type { Offer } from "@/lib/plans";

type Props = { route: "checkout" | "portal"; offer?: Offer; className?: string; block?: boolean; children: React.ReactNode };

export function BillingButton({ route, offer, className = "btn-primary", block = false, children }: Props) {
  const [pending, setPending] = useState(false);
  const { t, locale } = useI18n();
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    // Checkout opens inside the site when it can; the customer portal always goes to Stripe.
    if (route === "checkout" && offer && EMBEDDED_CHECKOUT) {
      openCheckout(offer);
      return;
    }
    setPending(true);
    setError(null);
    try {
      await redirectToBilling(route, offer, locale);
    } catch (err) {
      setError(err instanceof Error ? err.message : t.checkout.unavailable);
      setPending(false);
    }
  }

  return (
    <span className={`${block ? "flex" : "inline-flex"} flex-col items-stretch gap-1`}>
      <button type="button" onClick={handleClick} disabled={pending} className={className}>
        {pending ? t.checkout.redirecting : children}
      </button>
      {error && <span role="alert" className="text-xs font-semibold text-bear">{error}</span>}
    </span>
  );
}
