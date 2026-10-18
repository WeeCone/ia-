"use client";

import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useCallback, useEffect, useRef, useState } from "react";
import { createEmbeddedCheckout, redirectToBilling } from "@/lib/billing-client";
import { EMBEDDED_CHECKOUT, onOpenCheckout } from "@/lib/offers-client";
import { useI18n } from "@/i18n/client";
import { formatEur } from "@/i18n/format";
import { OFFER_PRICE_EUR, type Offer } from "@/lib/plans";
import { LogoMark } from "./logo";
import { TrialTimeline } from "./pricing-plans";

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

  const price = offer ? formatEur(locale, OFFER_PRICE_EUR[offer]) : "";
  const name = offer === "trial" ? t.common.trial : t.common.monthly;

  return (
    <dialog
      ref={ref}
      onClose={() => setOffer(null)}
      aria-label={c.dialogLabel}
      className="m-auto max-h-[calc(100dvh-1.5rem)] w-[min(66rem,calc(100%-1.5rem))] overflow-y-auto rounded-[1.75rem] bg-white p-0 text-[#0b0e14] shadow-[0_40px_120px_-30px_rgb(0_0_0/0.65)] backdrop:bg-[rgb(11_14_20/0.6)] backdrop:backdrop-blur-sm open:animate-[rise-in_0.35s_cubic-bezier(0.16,1,0.3,1)]"
    >
      <div className="grid md:grid-cols-[minmax(0,22rem)_1fr]">
        {/* The order, in Scanzivo's own world; Stripe's form sits beside it on white. */}
        <aside className="theme-dark relative overflow-hidden bg-background p-6 text-foreground sm:p-8">
          <div className="pointer-events-none absolute -right-24 -top-24 size-64 rounded-full bg-accent/15 blur-3xl" aria-hidden />
          <div className="relative flex h-full flex-col">
            <div className="flex items-start justify-between gap-4">
              {/* Not a link: leaving from inside the payment would drop it. */}
              <p className="flex items-center gap-2.5" aria-label="Scanzivo">
                <LogoMark className="size-9 drop-shadow-[0_0_12px_rgb(0_210_255/0.45)]" />
                <span className="font-logo text-xl uppercase tracking-tight">Scanzivo</span>
              </p>
              <button type="button" onClick={close} aria-label={c.closeLabel} className="-mr-2 -mt-1 rounded-lg px-2 text-2xl leading-none text-muted hover:text-foreground md:hidden">
                ×
              </button>
            </div>
            {offer && (
              <>
                <p className="label mt-8 text-muted">{c.summary}</p>
                <p className="display mt-2 text-2xl">{name}</p>
                <p className="mt-3 flex flex-wrap items-baseline gap-x-2">
                  <span className={`display text-5xl ${offer === "trial" ? "text-accent" : ""}`}>{price}</span>
                  <span className="text-sm text-muted">{offer === "trial" ? t.pricing.ttcTrial : c.monthlyPeriod}</span>
                </p>
                <div className="hidden md:block">
                  {offer === "trial" ? (
                    <TrialTimeline />
                  ) : (
                    <ul className="mt-6 space-y-2.5">
                      {t.pricing.included.map((feature) => (
                        <li key={feature} className="flex gap-2.5 text-sm text-muted">
                          <CheckIcon />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                {/* Pushes the reassurance to the bottom of the column, never closer than 2rem to the offer. */}
                <div className="min-h-8 flex-1" aria-hidden />
                <ul className="space-y-2 border-t border-border pt-5 text-xs text-muted">
                  <li className="flex gap-2">
                    <LockIcon />
                    {c.trustBank}
                  </li>
                  <li className="flex gap-2">
                    <CheckIcon />
                    {c.trustCancel}
                  </li>
                </ul>
              </>
            )}
          </div>
        </aside>

        <div className="relative flex min-h-[32rem] flex-col">
          <div className="flex items-center justify-between gap-4 px-5 pt-4 sm:px-6">
            <p className="flex items-center gap-2 text-sm font-medium text-[#57606a]">
              <LockIcon />
              {c.secure}
            </p>
            <button type="button" onClick={close} aria-label={c.closeLabel} className="-mr-2 hidden rounded-lg px-2 text-2xl leading-none text-[#57606a] hover:text-[#0b0e14] md:block">
              ×
            </button>
          </div>
          <div className="relative flex-1 p-2 sm:p-4">
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
        </div>
      </div>
    </dialog>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" className="mt-px size-4 shrink-0 text-accent" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M6 10V7a6 6 0 0 1 12 0v3M5 10h14v11H5z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" className="mt-0.5 size-4 shrink-0 text-accent" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3.5 8.5l3 3 6-7" />
    </svg>
  );
}
