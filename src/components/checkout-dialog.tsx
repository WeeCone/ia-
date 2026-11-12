"use client";

import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useCallback, useEffect, useRef, useState } from "react";
import { createEmbeddedCheckout, redirectToBilling } from "@/lib/billing-client";
import { EMBEDDED_CHECKOUT, onOpenCheckout } from "@/lib/offers-client";
import { pendingChartUrl } from "@/lib/pending-chart";
import { useI18n } from "@/i18n/client";
import { INTL_LOCALE } from "@/i18n/config";
import { formatMoney, formatPrice } from "@/i18n/format";
import type { Currency, Offer } from "@/lib/plans";
import { useAuth } from "./auth-provider";
import { LogoMark } from "./logo";

// Loaded once, on the first payment only.
let stripePromise: ReturnType<typeof loadStripe> | null = null;
const getStripe = () => (stripePromise ??= loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!));

/** Starts downloading Stripe.js ahead of time, where a payment is likely next, so the form appears sooner. */
export function preloadStripe() {
  if (EMBEDDED_CHECKOUT) getStripe().catch(() => {});
}

/** Stripe's payment form inside a dialog, so paying never leaves the site. Mounted once, opened with openCheckout(). */
export function CheckoutDialog() {
  const ref = useRef<HTMLDialogElement>(null);
  const [offer, setOffer] = useState<Offer | null>(null);
  // A new session per opening: Stripe sessions are single-use once completed.
  const [attempt, setAttempt] = useState(0);
  const [error, setError] = useState<string | null>(null);
  // The chart waiting to be analysed, if any: shown beside the order so the visitor sees what they are paying for.
  const [chartUrl, setChartUrl] = useState<string | null>(null);
  const { t, locale } = useI18n();
  const { user } = useAuth();
  const c = t.checkout;
  // Starter to Pro: a one-click switch on the card on file, when the server can do it; otherwise Stripe's form.
  const [upgrade, setUpgrade] = useState<
    | { stage: "checking" | "paying" | "done" }
    | { stage: "ready"; amount: number; currency: Currency; monthly: number; nextAt: number; prorationDate: number }
    | { stage: "off"; note?: string }
  >({ stage: "off" });

  useEffect(() => {
    if (!EMBEDDED_CHECKOUT) return;
    return onOpenCheckout((next) => {
      setError(null);
      setChartUrl(pendingChartUrl());
      setUpgrade({ stage: next === "monthly" ? "checking" : "off" });
      setOffer(next);
      setAttempt((count) => count + 1);
    });
  }, []);

  // Asks for the one-click quote; anything but a quote (not on Starter, no saved card…) means the ordinary form.
  useEffect(() => {
    if (upgrade.stage !== "checking") return;
    let cancelled = false;
    (async () => {
      try {
        if (!user) throw new Error();
        const response = await fetch("/api/billing/upgrade", {
          method: "POST",
          headers: { Authorization: `Bearer ${await user.getIdToken()}`, "X-Locale": locale, "Content-Type": "application/json" },
          body: "{}",
        });
        const data = await response.json();
        if (!response.ok || typeof data.amount !== "number") throw new Error();
        if (!cancelled)
          setUpgrade({ stage: "ready", amount: data.amount, currency: data.currency, monthly: data.monthly, nextAt: data.nextAt, prorationDate: data.prorationDate });
      } catch {
        if (!cancelled) setUpgrade({ stage: "off" });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [upgrade.stage, user, locale]);

  async function confirmUpgrade() {
    if (upgrade.stage !== "ready" || !user) return;
    const { prorationDate } = upgrade;
    setUpgrade({ stage: "paying" });
    try {
      const response = await fetch("/api/billing/upgrade", {
        method: "POST",
        headers: { Authorization: `Bearer ${await user.getIdToken()}`, "X-Locale": locale, "Content-Type": "application/json" },
        body: JSON.stringify({ confirm: true, prorationDate }),
      });
      if (response.ok) {
        setUpgrade({ stage: "done" });
        return;
      }
    } catch {
      // Falls through to the ordinary form.
    }
    // Nothing changed on Stripe's side: the payment form takes over (a bank check is passed there).
    setUpgrade({ stage: "off", note: c.upgrade.fallback });
    setAttempt((count) => count + 1);
  }

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

  const price = offer ? formatPrice(locale, offer) : "";
  const name = offer ? t.common[offer] : "";

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
                  <span className="display text-5xl">{price}</span>
                  <span className="text-sm text-muted">{offer === "lifetime" ? c.oneOffPeriod : c.monthlyPeriod}</span>
                </p>
                {/* Signed out: no sign-up step, the email typed beside it becomes the account. */}
                {!user && <p className="mt-4 text-sm leading-relaxed text-muted">{c.guestHint}</p>}
                {chartUrl && (
                  <div className="mt-5 flex items-center gap-3 rounded-xl border border-border bg-card/60 p-2.5">
                    {/* eslint-disable-next-line @next/next/no-img-element -- a local data URL, nothing to optimise */}
                    <img src={chartUrl} alt="" className="h-12 w-16 shrink-0 rounded-md object-cover" />
                    <p className="text-sm leading-snug">{c.chartWaiting}</p>
                  </div>
                )}
                <ul className="mt-6 hidden space-y-2.5 md:block">
                  {[...(t.pricing.packs[offer].highlight ? [t.pricing.packs[offer].highlight.title] : []), ...t.pricing.packs[offer].features].map((feature) => (
                    <li key={feature} className="flex gap-2.5 text-sm text-muted">
                      <CheckIcon />
                      {feature}
                    </li>
                  ))}
                </ul>
                {/* Pushes the reassurance to the bottom of the column, never closer than 2rem to the offer. */}
                <div className="min-h-8 flex-1" aria-hidden />
                <ul className="space-y-2 border-t border-border pt-5 text-xs text-muted">
                  <li className="flex gap-2">
                    <LockIcon />
                    {c.trustBank}
                  </li>
                  <li className="flex gap-2">
                    <CheckIcon />
                    {offer === "lifetime" ? c.trustOneOff : c.trustCancel}
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
            {offer === "monthly" && upgrade.stage !== "off" ? (
              <UpgradePanel upgrade={upgrade} onConfirm={confirmUpgrade} onClose={close} />
            ) : error ? (
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
                  {upgrade.stage === "off" && upgrade.note && (
                    <p role="status" className="relative mx-2 mb-2 rounded-xl bg-amber-50 px-4 py-3 text-sm text-[#7c4a03]">
                      {upgrade.note}
                    </p>
                  )}
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

type UpgradeState =
  | { stage: "checking" | "paying" | "done" }
  | { stage: "ready"; amount: number; currency: Currency; monthly: number; nextAt: number; prorationDate: number };

/** The one-click switch from Starter to Pro: the amount due today, then a single confirmation. */
function UpgradePanel({ upgrade, onConfirm, onClose }: { upgrade: UpgradeState; onConfirm: () => void; onClose: () => void }) {
  const { t, locale, href } = useI18n();
  const u = t.checkout.upgrade;
  if (upgrade.stage === "checking") {
    return <p className="grid min-h-[28rem] place-items-center text-sm text-[#57606a]">{u.checking}</p>;
  }
  if (upgrade.stage === "done") {
    return (
      <div className="mx-auto flex min-h-[28rem] max-w-md flex-col items-center justify-center px-4 text-center">
        <span className="grid size-12 place-items-center rounded-full bg-[#047857]/10 text-[#047857]">
          <svg viewBox="0 0 16 16" className="size-6" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M3.5 8.5l3 3 6-7" />
          </svg>
        </span>
        <p className="mt-4 text-2xl font-semibold">{u.done}</p>
        <p className="mt-2 text-sm leading-relaxed text-[#57606a]">{u.doneText}</p>
        <button type="button" onClick={onClose} className="mt-6 rounded-xl bg-[#047857] px-6 py-3 text-sm font-semibold text-white hover:bg-[#065f46]">
          {u.close}
        </button>
      </div>
    );
  }
  const quote = upgrade.stage === "ready" ? upgrade : null;
  const date = quote ? new Date(quote.nextAt).toLocaleDateString(INTL_LOCALE[locale], { day: "numeric", month: "long" }) : "";
  return (
    <div className="mx-auto flex min-h-[28rem] max-w-md flex-col justify-center px-4 py-8">
      <p className="text-sm font-medium text-[#57606a]">{u.title}</p>
      <p className="mt-3 flex items-baseline gap-2">
        <span className="text-5xl font-semibold tracking-tight">{quote ? formatMoney(locale, quote.amount, quote.currency) : "…"}</span>
        <span className="text-sm text-[#57606a]">{u.today}</span>
      </p>
      <ul className="mt-5 space-y-2 text-sm text-[#3d4550]">
        <li>{u.deducted}</li>
        {quote && <li>{u.then(formatMoney(locale, quote.monthly, quote.currency), date)}</li>}
        <li>{u.card}</li>
      </ul>
      <button
        type="button"
        onClick={onConfirm}
        disabled={!quote}
        className="mt-7 w-full rounded-xl bg-[#047857] px-5 py-3.5 text-base font-semibold text-white hover:bg-[#065f46] disabled:opacity-60"
      >
        {upgrade.stage === "paying" ? u.paying : u.confirm}
      </button>
      <p className="mt-3 text-center text-xs leading-relaxed text-[#57606a]">
        {u.terms}{" "}
        <a href={href("/legal/cgv")} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
          {u.termsLink}
        </a>
      </p>
    </div>
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
