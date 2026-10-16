"use client";

import type { User } from "firebase/auth";
import Link from "next/link";
import { openOffers } from "@/lib/offers-client";
import { MONTHLY_CREDITS, PLAN_LABELS } from "@/lib/plans";
import type { UserProfile } from "@/lib/users";
import { BillingButton } from "../billing-button";
import { DeleteAccount } from "../delete-account";

export function AccountPanel({ user, profile, credits, onBack }: { user: User; profile: UserProfile | null; credits: number | null; onBack: () => void }) {
  const rows: [string, React.ReactNode][] = [
    ["Nom", user.displayName || "—"],
    ["E-mail", user.email],
    ["Offre", profile ? PLAN_LABELS[profile.plan] : "—"],
    ["Crédits ce mois-ci", `${credits ?? "–"} / ${MONTHLY_CREDITS}`],
  ];

  return (
    <div>
      <button type="button" onClick={onBack} className="btn-ghost -ml-3">
        ← Retour à l&apos;analyse
      </button>
      <h1 className="display mt-4 text-3xl sm:text-4xl">Mon compte</h1>
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
            Gérer mon abonnement
          </BillingButton>
        )}
        {profile?.plan === "none" && (
          <button type="button" onClick={openOffers} className="btn-primary">
            Choisir une offre
          </button>
        )}
        {profile?.plan === "monthly" && (
          <button type="button" onClick={openOffers} className="btn-secondary">
            Passer à l&apos;accès à vie
          </button>
        )}
      </div>
      <DeleteAccount plan={profile?.plan} />
    </div>
  );
}
