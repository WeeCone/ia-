"use client";

import type { User } from "firebase/auth";
import Link from "next/link";
import { openOffers } from "@/lib/offers-client";
import { MONTHLY_CREDITS } from "@/lib/plans";
import { useI18n } from "@/i18n/client";
import type { UserProfile } from "@/lib/users";
import { BillingButton } from "../billing-button";
import { DeleteAccount } from "../delete-account";

export function AccountPanel({ user, profile, credits, onBack }: { user: User; profile: UserProfile | null; credits: number | null; onBack: () => void }) {
  const { t } = useI18n();
  const a = t.account;
  const rows: [string, React.ReactNode][] = [
    [a.rowName, user.displayName || "—"],
    [a.rowEmail, user.email],
    [a.rowPlan, profile ? t.plans[profile.plan] : "—"],
    [a.rowCredits, `${credits ?? "–"} / ${MONTHLY_CREDITS}`],
  ];

  return (
    <div>
      <button type="button" onClick={onBack} className="btn-ghost -ml-3">
        {a.back}
      </button>
      <h1 className="display mt-4 text-3xl sm:text-4xl">{a.myAccount}</h1>
      <dl className="panel mt-8 divide-y divide-border">
        {rows.map(([term, value]) => (
          <div key={term} className="flex flex-wrap items-center justify-between gap-2 px-5 py-4">
            <dt className="text-sm text-muted">{term}</dt>
            <dd className="text-sm font-medium">{value}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-6 flex flex-wrap gap-3">
        {profile?.plan === "monthly" && (
          <BillingButton route="portal" className="btn-secondary">
            {a.manageSubscription}
          </BillingButton>
        )}
        {profile?.plan === "none" && (
          <button type="button" onClick={openOffers} className="btn-primary">
            {a.chooseOfferPlain}
          </button>
        )}
      </div>
      <DeleteAccount plan={profile?.plan} />
    </div>
  );
}
