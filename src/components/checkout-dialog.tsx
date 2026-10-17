"use client";

import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useCallback, useEffect, useRef, useState } from "react";
import { createEmbeddedCheckout, redirectToBilling } from "@/lib/billing-client";
import { EMBEDDED_CHECKOUT, onOpenCheckout } from "@/lib/offers-client";
import { useI18n } from "@/i18n/client";
import { formatEur } from "@/i18n/format";
import { OFFER_PRICE_EUR, type Offer } from "@/lib/plans";

// Loaded once, on the first payment only.
let stripePromise: ReturnType<typeof loadStripe> | null = null;
const getStripe = () => (stripePromise ??= loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!));

/** Stripe's payment form inside a dialog, so paying never leaves the site. Mounted once, opened with openCheckout(). */
export function CheckoutDialog() {
  const ref = useRef<HTMLDialogElement>(null);
  const [offer, setOffer] = useState<Offer | null>(null);
  // A new session per opening: Stripe sessions are single-use once completed.
  const [attempt, setAttempt] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const { t, locale } = useI18n();
  const c = t.checkout;

  useEffect(() => {
    if (!EMBEDDED_CHECKOUT) return;
    return onOpenCheckout((next) => {
      setError(null);
      setOffer(next);
      setAttempt((count) => count + 1);
    });
  }, []);

  useEffect(() => {
    const dialog = ref.current;
    if (!offer || !dialog) return;
    if (!dialog.open) dialog.showModal();
    // Stripe.js blocked (extension, network): say so and offer Stripe's own page instead of a blank dialog.
    getStripe()
      .then((stripe) => !stripe && Promise.reject())
      .catch(() => setError(c.loadFailed));
    // eslint-disable-next-line react-hooks/exhaustive-deps -- the message only changes with the language
  }, [offer, attempt]);

  const fetchClientSecret = useCallback(async () => {
    try {
      return await createEmbeddedCheckout(offer!, locale);
    } catch (err) {
      setError(err instanceof Error ? err.message : c.unavailable);
      throw err;
    }
  }, [offer, locale, c.unavailable]);

  if (!EMBEDDED_CHECKOUT) return null;
  const close = () => ref.current?.close();

  return (
    <dialog
      ref={ref}
      onClose={() => setOffer(null)}
      aria-label={c.dialogLabel}
      className="m-auto max-h-[calc(100dvh-1.5rem)] w-[min(64rem,calc(100%-1.5rem))] overflow-y-auto rounded-3xl border border-[#d0d7de] bg-white p-0 text-[#0b0e14] shadow-[0_40px_120px_-30px_rgb(15_23_42/0.5)] backdrop:bg-[rgb(11_14_20/0.6)] backdrop:backdrop-blur-sm"
    >
      <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-[#d0d7de] bg-white/95 px-5 py-3 backdrop-blur">
        <p className="flex items-center gap-2 text-sm font-medium">
          <svg viewBox="0 0 24 24" className="size-4 text-[#047857]" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M6 10V7a6 6 0 0 1 12 0v3M5 10h14v11H5z" />
          </svg>
          {c.secure}
          {offer ? ` · ${t.common.monthly}, ${formatEur(locale, OFFER_PRICE_EUR[offer])}` : ""}
        </p>
        <button type="button" onClick={close} aria-label={c.closeLabel} className="rounded-lg px-2 text-2xl leading-none text-[#57606a] hover:text-[#0b0e14]">
          ×
        </button>
      </div>
      <div className="relative min-h-[28rem] p-2 sm:p-4">
        {error ? (
          <div role="alert" className="px-4 py-16 text-center">
            <p className="text-sm text-[#e11d48]">{error}</p>
            {offer && (
              <button
                type="button"
                onClick={() => redirectToBilling("checkout", offer, locale).catch((err) => setError(err instanceof Error ? err.message : String(err)))}
                className="mt-5 rounded-xl bg-[#047857] px-5 py-3 text-sm font-semibold text-white hover:bg-[#065f46]"
              >
                {c.fallback}
              </button>
            )}
          </div>
        ) : (
          offer && (
            <>
              <p className="absolute inset-0 grid place-items-center text-sm text-[#57606a]" aria-hidden>
                {c.loading}
              </p>
              <div className="relative">
                <EmbeddedCheckoutProvider key={attempt} stripe={getStripe()} options={{ fetchClientSecret }}>
                  <EmbeddedCheckout />
                </EmbeddedCheckoutProvider>
              </div>
            </>
          )
        )}
      </div>
    </dialog>
  );
}
