"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/i18n/client";
import { formatEur } from "@/i18n/format";
import { redirectToBilling } from "@/lib/billing-client";
import { EMBEDDED_CHECKOUT, onOpenChartReady, openCheckout, requestAutoAnalyze } from "@/lib/offers-client";
import { pendingChartUrl } from "@/lib/pending-chart";
import { OFFER_PRICE_EUR } from "@/lib/plans";
import { preloadStripe } from "./checkout-dialog";

/**
 * A visitor without an account dropped a chart on the landing page: it is shown back, ready, with the button that
 * starts the analysis. That button opens the trial payment; once paid, the dashboard runs the analysis by itself.
 */
export function ChartReadyDialog() {
  const ref = useRef<HTMLDialogElement>(null);
  const [chartUrl, setChartUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { t, locale, href } = useI18n();
  const c = t.chartReady;

  useEffect(
    () =>
      onOpenChartReady(() => {
        setError(null);
        setChartUrl(pendingChartUrl());
        ref.current?.showModal();
        // The payment is the next step: fetch Stripe's script while the visitor looks at the chart.
        preloadStripe();
      }),
    [],
  );

  const close = () => ref.current?.close();

  function analyse() {
    requestAutoAnalyze();
    if (EMBEDDED_CHECKOUT) {
      close();
      openCheckout("trial");
    } else {
      redirectToBilling("checkout", "trial", locale).catch((err) => setError(err instanceof Error ? err.message : t.checkout.unavailable));
    }
  }

  return (
    <dialog
      ref={ref}
      aria-label={c.title}
      className="theme-dark m-auto max-h-[calc(100dvh-1.5rem)] w-[min(34rem,calc(100%-1.5rem))] overflow-y-auto rounded-[1.75rem] border border-border bg-background p-0 text-foreground shadow-[0_40px_120px_-30px_rgb(0_0_0/0.8)] backdrop:bg-[rgb(11_14_20/0.6)] backdrop:backdrop-blur-sm open:animate-[rise-in_0.35s_cubic-bezier(0.16,1,0.3,1)]"
    >
      <div className="p-5 sm:p-7">
        <div className="flex items-center justify-between gap-4">
          <p className="label text-muted">{c.label}</p>
          <button type="button" onClick={close} aria-label={c.close} className="-mr-2 rounded-lg px-2 text-2xl leading-none text-muted hover:text-foreground">
            ×
          </button>
        </div>

        {chartUrl && (
          <div className="relative mt-3 overflow-hidden rounded-2xl border border-border bg-card">
            {/* eslint-disable-next-line @next/next/no-img-element -- a local data URL, nothing to optimise */}
            <img src={chartUrl} alt={c.alt} className="max-h-[42dvh] w-full object-contain" />
            {/* The scan line of the logo, passing over the waiting chart. */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-accent shadow-[0_0_14px_2px_var(--accent)] motion-safe:animate-[scan-y_2.4s_ease-in-out_infinite]"
            />
          </div>
        )}

        <h2 className="display mt-6 text-3xl">{c.title}</h2>
        <p className="mt-2 leading-relaxed text-muted">{c.text}</p>

        {/* Focused on opening: the next step, rather than the close button. */}
        {/* eslint-disable-next-line jsx-a11y/no-autofocus -- a dialog the visitor just opened by dropping a chart */}
        <button type="button" onClick={analyse} autoFocus className="btn-primary mt-6 w-full py-3.5 text-base">
          {c.cta}
        </button>
        <p className="mt-3 text-center text-sm text-muted">
          {c.terms(formatEur(locale, OFFER_PRICE_EUR.trial), formatEur(locale, OFFER_PRICE_EUR.monthly))}
        </p>
        {error && (
          <p role="alert" className="mt-3 text-center text-sm text-bear">
            {error}
          </p>
        )}

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4 text-sm">
          <button type="button" onClick={close} className="text-muted hover:text-foreground">
            {c.change}
          </button>
          <Link href={href("/auth/login")} onClick={close} className="font-medium text-muted underline underline-offset-2 hover:text-foreground">
            {c.haveAccount}
          </Link>
        </div>
      </div>
    </dialog>
  );
}
