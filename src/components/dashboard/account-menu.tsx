"use client";

import { signOut, type User } from "firebase/auth";
import Link from "next/link";
import { useState } from "react";
import { isAdminEmail } from "@/lib/admin";
import { auth } from "@/lib/firebase";
import type { UserProfile } from "@/lib/users";
import { BillingButton } from "../billing-button";

function initials(user: User) {
  return (user.displayName || user.email || "?")
    .split(/[\s@.]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]!.toUpperCase())
    .join("");
}

const item = "block w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-background/60";

/** Avatar button in the dashboard header, opening the account menu. */
export function AccountMenu({ user, profile, onAccount }: { user: User; profile: UserProfile | null; onAccount: () => void }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label="Menu du compte"
        className="grid size-9 place-items-center rounded-full bg-linear-to-br from-brand/40 to-accent/40 font-display text-sm font-bold ring-1 ring-border transition hover:ring-brand/60"
      >
        {initials(user)}
      </button>
      {open && (
        <>
          <button type="button" className="fixed inset-0 z-40 cursor-default" aria-label="Fermer le menu" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-xl border border-border bg-card p-1 shadow-2xl">
            <div className="border-b border-border px-3 py-2.5">
              <p className="truncate text-sm font-medium">{user.displayName || "Mon compte"}</p>
              <p className="truncate text-xs text-muted">{user.email}</p>
            </div>
            <div className="py-1">
              <button
                type="button"
                className={item}
                onClick={() => {
                  setOpen(false);
                  onAccount();
                }}
              >
                Mon compte
              </button>
              {profile?.plan === "monthly" && (
                <BillingButton route="portal" block className={item}>
                  Mon abonnement
                </BillingButton>
              )}
              <Link href="/pricing" className={item}>
                Offres et tarifs
              </Link>
              {isAdminEmail(user.email) && (
                <Link href="/admin" className={`${item} text-brand`}>
                  Administration
                </Link>
              )}
              <button type="button" onClick={() => signOut(auth)} className={`${item} text-bear`}>
                Déconnexion
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
