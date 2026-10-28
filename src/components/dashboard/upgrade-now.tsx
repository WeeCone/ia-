"use client";

import { useState } from "react";
import { useI18n } from "@/i18n/client";
import { INTL_LOCALE } from "@/i18n/config";
import { formatEur } from "@/i18n/format";
import { auth } from "@/lib/firebase";
import { MONTHLY_CREDITS, OFFER_PRICE_EUR } from "@/lib/plans";
import { FormError } from "../auth-card";

/**
 * Ends the trial early and starts the subscription now. Two steps, because the second click takes the monthly price from the saved
 * card: the button first turns into an explicit confirmation stating the amount.
 */
export function UpgradeNow({ trialEndsAt, compact = false }: { trialEndsAt: number; compact?: boolean }) {
  const { t, locale } = useI18n();
  const d = t.dashboard;
  const monthly = formatEur(locale, OFFER_PRICE_EUR.monthly);
  const [step, setStep] = useState<"idle" | "confirm" | "pending" | "done">("idle");
  const [error, setError] = useState<string | null>(null);

  async function upgrade() {
    setStep("pending");
    setError(null);
    try {
      const token = await auth.currentUser?.getIdToken();
      const response = await fetch("/api/billing/end-trial", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "X-Locale": locale },
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error ?? t.checkout.unavailable);
      setStep("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : t.checkout.unavailable);
      setStep("idle");
    }
  }

  if (step === "done") return <p className="rounded-xl border border-bull/40 bg-bull/10 px-3 py-2 text-sm text-bull">{d.upgradeDone}</p>;

  const button =
    step === "idle" ? (
      <button type="button" onClick={() => setStep("confirm")} className={compact ? "btn-secondary w-full px-3 py-2 text-xs" : "btn-primary"}>
        {compact ? t.account.upgradeShort : d.upgradeCta(monthly)}
      </button>
    ) : (
      <div className={`flex flex-wrap gap-2 ${compact ? "flex-col" : ""}`}>
        <button type="button" onClick={upgrade} disabled={step === "pending"} className={`btn-primary ${compact ? "w-full px-3 py-2 text-xs" : ""}`}>
          {step === "pending" ? d.upgradePending : d.upgradeConfirm(monthly)}
        </button>
        <button type="button" onClick={() => setStep("idle")} disabled={step === "pending"} className={`btn-ghost ${compact ? "px-3 py-1.5 text-xs" : ""}`}>
          {d.upgradeCancel}
        </button>
      </div>
    );

  if (compact) {
    return (
      <div className="mt-3 space-y-2">
        {button}
        <FormError message={error} />
      </div>
    );
  }

  const date = new Date(trialEndsAt).toLocaleDateString(INTL_LOCALE[locale], { day: "numeric", month: "long" });
  return (
    <div className="panel space-y-3 border-accent/40 p-5 text-left">
      <p className="font-semibold">{d.upgradeTitle}</p>
      <p className="text-sm text-muted">{d.upgradeText(monthly, MONTHLY_CREDITS, date)}</p>
      {button}
      <FormError message={error} />
    </div>
  );
}
