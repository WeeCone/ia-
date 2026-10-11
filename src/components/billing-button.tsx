"use client";

import { useState } from "react";
import { redirectToBilling } from "@/lib/billing-client";
import type { Offer } from "@/lib/plans";

type Props = { route: "checkout" | "portal"; offer?: Offer; className?: string; children: React.ReactNode };

export function BillingButton({ route, offer, className = "btn-primary", children }: Props) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setPending(true);
    setError(null);
    try {
      await redirectToBilling(route, offer);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Paiement indisponible pour le moment.");
      setPending(false);
    }
  }

  return (
    <span className="inline-flex flex-col items-stretch gap-1">
      <button type="button" onClick={handleClick} disabled={pending} className={className}>
        {pending ? "Redirection…" : children}
      </button>
      {error && <span role="alert" className="text-xs text-bear">{error}</span>}
    </span>
  );
}
