"use client";

import Link from "next/link";
import { FREE_CREDITS, PRO_MONTHLY_CREDITS, PRO_PRICE_LABEL } from "@/lib/plans";
import { useAuth } from "./auth-provider";
import { BillingButton } from "./billing-button";

const check = (
  <svg viewBox="0 0 20 20" className="mt-0.5 size-4 shrink-0 text-brand" fill="currentColor" aria-hidden>
    <path fillRule="evenodd" d="M16.7 5.3a1 1 0 010 1.4l-8 8a1 1 0 01-1.4 0l-4-4a1 1 0 111.4-1.4L8 12.6l7.3-7.3a1 1 0 011.4 0z" clipRule="evenodd" />
  </svg>
);

function Features({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 space-y-3 text-sm">
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          {check}
          {item}
        </li>
      ))}
    </ul>
  );
}

export function PricingPlans() {
  const { user } = useAuth();

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="flex flex-col rounded-2xl border border-border bg-surface p-8">
        <h2 className="text-lg font-semibold">Gratuit</h2>
        <p className="mt-4">
          <span className="text-4xl font-bold">0 €</span>
        </p>
        <Features items={[`${FREE_CREDITS} analyses offertes`, "Scénarios haussier et baissier", "Historique des analyses"]} />
        <Link href={user ? "/dashboard" : "/auth/signup"} className="btn-secondary mt-8">
          {user ? "Aller au tableau de bord" : "Créer un compte"}
        </Link>
      </div>
      <div className="relative flex flex-col rounded-2xl border border-brand bg-surface p-8 shadow-[0_0_40px_-12px] shadow-brand/40">
        <span className="absolute -top-3 left-8 rounded-full bg-brand px-3 py-0.5 text-xs font-semibold text-background">Populaire</span>
        <h2 className="text-lg font-semibold">Pro</h2>
        <p className="mt-4">
          <span className="text-4xl font-bold">{PRO_PRICE_LABEL}</span>
          <span className="text-muted"> / mois</span>
        </p>
        <Features
          items={[
            `${PRO_MONTHLY_CREDITS} analyses par mois`,
            "Crédits renouvelés à chaque échéance",
            "Toutes les fonctionnalités du plan Gratuit",
            "Sans engagement, résiliable en un clic",
          ]}
        />
        {user ? (
          <BillingButton route="checkout" className="btn-primary mt-8 w-full">
            Passer Pro
          </BillingButton>
        ) : (
          <Link href="/auth/signup" className="btn-primary mt-8">
            Commencer
          </Link>
        )}
      </div>
    </div>
  );
}
