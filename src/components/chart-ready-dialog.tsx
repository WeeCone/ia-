"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/i18n/client";
import { formatEur } from "@/i18n/format";
import { redirectToBilling } from "@/lib/billing-client";
import { EMBEDDED_CHECKOUT, onOpenChartReady, openCheckout, requestAutoAnalyze, savePreview } from "@/lib/offers-client";
import { pendingChartUrl, readPendingChart } from "@/lib/pending-chart";
import { OFFER_PRICE_EUR } from "@/lib/plans";
import type { PreviewTeaser } from "@/lib/preview-types";
import { AnalysisTeaser } from "./analysis-teaser";
import { preloadStripe } from "./checkout-dialog";

type Stage = { name: "ready" } | { name: "reading" } | { name: "teaser"; id: string | null; teaser: PreviewTeaser };

/**
 * A visitor without an account dropped a chart on the landing page: it is shown back, ready, with the button that
 * starts the analysis. The AI reads it for free first (trend, structure, patterns); the plan stays locked behind the
 * trial payment, and once paid the dashboard unlocks that same analysis. When the free reading is unavailable (daily
 * limits, an error), the button goes straight to payment and the dashboard runs the analysis after it, as before.
 */
export function ChartReadyDialog() {
  const ref = useRef<HTMLDialogElement>(null);
  const [chartUrl, setChartUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [stage, setStage] = useState<Stage>({ name: "ready" });
  const [elapsed, setElapsed] = useState(0);
  const { t, locale, href } = useI18n();
  const c = t.chartReady;

  useEffect(
    () =>
      onOpenChartReady(() => {
        setError(null);
        setStage({ name: "ready" });
        setChartUrl(pendingChartUrl());
        ref.current?.showModal();
        // The payment is the next step: fetch Stripe's script while the visitor looks at the chart.
        preloadStripe();
      }),
    [],
  );

  const close = () => ref.current?.close();

  // Seconds spent reading, for the progress steps.
  useEffect(() => {
    if (stage.name !== "reading") return;
    const started = Date.now();
    const timer = setInterval(() => setElapsed(Math.floor((Date.now() - started) / 1000)), 500);
    return () => {
      clearInterval(timer);
      setElapsed(0);
    };
  }, [stage.name]);

  function pay(previewId: string | null) {
    // Unlocks the previewed analysis after payment; without one, the dashboard runs the waiting chart.
    if (previewId) savePreview(previewId);
    else requestAutoAnalyze();
    if (EMBEDDED_CHECKOUT) {
      close();
      openCheckout("trial");
    } else {
      redirectToBilling("checkout", "trial", locale).catch((err) => setError(err instanceof Error ? err.message : t.checkout.unavailable));
    }
  }

  async function read() {
    const image = await readPendingChart();
    if (!image) return pay(null);
    setError(null);
    setStage({ name: "reading" });
    try {
      const body = new FormData();
      body.set("image", image);
      const response = await fetch("/api/preview", { method: "POST", headers: { "X-Locale": locale }, body });
      const data = await response.json().catch(() => ({}));
      if (response.ok && data.teaser) return setStage({ name: "teaser", id: data.id ?? null, teaser: data.teaser });
      // Limits reached or the reading failed: the paid path still works.
      if (data.fallback || !response.ok) {
        setStage({ name: "ready" });
        if (data.fallback) return pay(null);
        setError(data.error ?? t.uploader.failed);
      }
    } catch {
      setStage({ name: "ready" });
      pay(null);
    }
  }

  return (
    <dialog
      ref={ref}
      aria-label={c.title}
      className={`theme-dark m-auto max-h-[calc(100dvh-1.5rem)] w-[min(${stage.name === "teaser" ? "40rem" : "34rem"},calc(100%-1.5rem))] overflow-y-auto rounded-[1.75rem] border border-border bg-background p-0 text-foreground shadow-[0_40px_120px_-30px_rgb(0_0_0/0.8)] backdrop:bg-[rgb(11_14_20/0.6)] backdrop:backdrop-blur-sm open:animate-[rise-in_0.35s_cubic-bezier(0.16,1,0.3,1)]`}
    >
      <div className="p-5 sm:p-7">
        <div className="flex items-center justify-between gap-4">
          <p className="label text-muted">{c.label}</p>
          <button type="button" onClick={close} aria-label={c.close} className="-mr-2 rounded-lg px-2 text-2xl leading-none text-muted hover:text-foreground">
            ×
          </button>
        </div>

        {stage.name === "teaser" ? (
          stage.teaser.is_chart ? (
            <div className="mt-3">
              <AnalysisTeaser
                teaser={stage.teaser}
                imageUrl={chartUrl}
                onUnlock={() => pay(stage.id)}
                unlockLabel={c.unlock(formatEur(locale, OFFER_PRICE_EUR.trial))}
                terms={c.unlockTerms(formatEur(locale, OFFER_PRICE_EUR.trial), formatEur(locale, OFFER_PRICE_EUR.monthly))}
              />
            </div>
          ) : (
            <p role="alert" className="mt-4 rounded-xl border border-amber-400/30 bg-amber-400/5 p-4 leading-relaxed">
              {c.notChart}
            </p>
          )
        ) : (
          <>
            {chartUrl && (
              <div className="relative mt-3 overflow-hidden rounded-2xl border border-border bg-card">
                {/* eslint-disable-next-line @next/next/no-img-element -- a local data URL, nothing to optimise */}
                <img src={chartUrl} alt={c.alt} className={`max-h-[42dvh] w-full object-contain ${stage.name === "reading" ? "opacity-60" : ""}`} />
                {/* The scan line of the logo, passing over the waiting chart. */}
                <span
                  aria-hidden
                  className={`pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-accent shadow-[0_0_14px_2px_var(--accent)] ${stage.name === "reading" ? "motion-safe:animate-[scan-y_1.2s_ease-in-out_infinite]" : "motion-safe:animate-[scan-y_2.4s_ease-in-out_infinite]"}`}
                />
              </div>
            )}

            {stage.name === "reading" ? (
              <div aria-live="polite" className="mt-6">
                <h2 className="display text-3xl">{c.analysing}</h2>
                <ol className="mt-5 space-y-3">
                  {t.uploader.steps.map((label, index) => {
                    const current = Math.min(t.uploader.steps.length - 1, Math.floor(elapsed / 6));
                    const status = index < current ? "done" : index === current ? "active" : "todo";
                    return (
                      <li key={label} className={`flex items-center gap-3 text-sm ${status === "todo" ? "text-muted" : ""}`}>
                        <span
                          className={`grid size-5 shrink-0 place-items-center rounded-full border text-[10px] font-bold ${
                            status === "done" ? "border-bull bg-bull text-background" : status === "active" ? "animate-pulse border-brand bg-brand/20" : "border-border"
                          }`}
                        >
                          {status === "done" ? "✓" : ""}
                        </span>
                        {label}
                      </li>
                    );
                  })}
                </ol>
                <p className="mt-5 text-xs text-muted">{c.keepOpen}</p>
              </div>
            ) : (
              <>
                <h2 className="display mt-6 text-3xl">{c.title}</h2>
                <p className="mt-2 leading-relaxed text-muted">{c.previewText}</p>

                {/* Focused on opening: the next step, rather than the close button. */}
                {/* eslint-disable-next-line jsx-a11y/no-autofocus -- a dialog the visitor just opened by dropping a chart */}
                <button type="button" onClick={read} autoFocus className="btn-primary mt-6 w-full py-3.5 text-base">
                  {c.previewCta}
                </button>
                <p className="mt-3 text-center text-sm text-muted">
                  {c.previewTerms(formatEur(locale, OFFER_PRICE_EUR.trial), formatEur(locale, OFFER_PRICE_EUR.monthly))}
                </p>
              </>
            )}
          </>
        )}
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
