"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/i18n/client";
import { formatEur } from "@/i18n/format";
import { MONTHLY_CREDITS, OFFER_PRICE_EUR } from "@/lib/plans";
import { UpgradeNow } from "./upgrade-now";

const DISMISSED_KEY = "scanzivo:upsell-dismissed";
const DELAY_MS = 6000;

/**
 * Once the trial's single analysis is spent, a few seconds after its report: "a second analysis?", with the button that
 * starts the subscription now (two steps, the second states the amount). "Later" hides it for the visit.
 */
export function TrialUpsell({ trialEndsAt }: { trialEndsAt: number }) {
  const { t, locale } = useI18n();
  const d = t.dashboard;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(DISMISSED_KEY) === "1") return;
    } catch {}
    const timer = setTimeout(() => setOpen(true), DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  if (!open) return null;
  const later = () => {
    try {
      sessionStorage.setItem(DISMISSED_KEY, "1");
    } catch {}
    setOpen(false);
  };

  return (
    <div role="dialog" aria-label={d.upsellTitle} className="fixed inset-x-3 bottom-3 z-40 animate-[rise-in_0.5s_cubic-bezier(0.16,1,0.3,1)] sm:inset-x-auto sm:right-6 sm:bottom-6 sm:w-[24rem]">
      <div className="relative rounded-2xl bg-card shadow-[0_24px_60px_-20px_rgb(0_0_0/0.45)]">
        <button type="button" onClick={later} aria-label={d.upsellLater} className="absolute right-3 top-2 z-10 px-1 text-xl leading-none text-muted hover:text-foreground">
          ×
        </button>
        <UpgradeNow
          trialEndsAt={trialEndsAt}
          heading={d.upsellTitle}
          text={d.upsellText(formatEur(locale, OFFER_PRICE_EUR.monthly), MONTHLY_CREDITS)}
        />
      </div>
    </div>
  );
}
