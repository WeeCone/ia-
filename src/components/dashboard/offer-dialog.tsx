"use client";

import { useEffect, useRef } from "react";
import { pendingChartUrl } from "@/lib/pending-chart";
import type { Plan } from "@/lib/plans";
import { useI18n } from "@/i18n/client";
import { PricingPlans } from "../pricing-plans";

/** The offer picker, opened inside the dashboard so choosing an offer goes straight to checkout. */
export function OfferDialog({
  open,
  onClose,
  plan,
  hasCapture,
}: {
  open: boolean;
  onClose: () => void;
  plan: Plan | null;
  hasCapture: boolean;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const { t } = useI18n();
  // A chart waiting to be analysed: shown beside the title, so the visitor sees what they are paying for.
  const chartUrl = open && hasCapture ? pendingChartUrl() : null;

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(event) => event.target === event.currentTarget && onClose()}
      aria-labelledby="offer-dialog-title"
      className="theme-light m-auto w-[min(64rem,calc(100%-2rem))] max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-3xl border border-border bg-background p-0 text-foreground shadow-[0_40px_120px_-30px_rgb(15_23_42/0.5)] backdrop:bg-[rgb(11_14_20/0.55)] backdrop:backdrop-blur-sm open:animate-[rise-in_0.35s_cubic-bezier(0.16,1,0.3,1)]"
    >
      <div className="p-5 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            {chartUrl && (
              // eslint-disable-next-line @next/next/no-img-element -- a local data URL, nothing for next/image to optimise
              <img src={chartUrl} alt="" className="hidden h-20 w-28 shrink-0 rounded-xl border border-border object-cover shadow-[0_8px_24px_-12px_rgb(15_23_42/0.5)] sm:block" />
            )}
            <div>
              <h2 id="offer-dialog-title" className="display text-3xl sm:text-4xl">
                {plan && plan !== "none" ? t.offerDialog.upgradeTitle : t.offerDialog.title}
              </h2>
              <p className="mt-2 text-muted">
                {hasCapture ? t.offerDialog.withCapture : t.offerDialog.withoutCapture}
              </p>
            </div>
          </div>
          <button type="button" onClick={onClose} aria-label={t.common.close} className="btn-ghost -mr-2 -mt-1 px-2 text-2xl leading-none">
            ×
          </button>
        </div>
        <div className="mt-6">
          <PricingPlans compact currentPlan={plan} />
        </div>
      </div>
    </dialog>
  );
}
