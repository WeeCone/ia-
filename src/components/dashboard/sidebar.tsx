"use client";

import { signOut } from "firebase/auth";
import type { User } from "firebase/auth";
import Link from "next/link";
import { openOffers } from "@/lib/offers-client";
import { useState } from "react";
import { isAdminUser } from "@/lib/admin";
import { auth } from "@/lib/firebase";
import { availableCredits, MONTHLY_CREDITS } from "@/lib/plans";
import type { UserProfile } from "@/lib/users";
import { INTL_LOCALE } from "@/i18n/config";
import { useI18n } from "@/i18n/client";
import { HistoryList, type StoredAnalysis } from "../analysis-history";
import { BillingButton } from "../billing-button";
import { Logo } from "../logo";

type Props = {
  user: User;
  profile: UserProfile | null;
  credits: number | null;
  history: StoredAnalysis[] | null;
  activeId: string | null;
  onNew: () => void;
  onSelect: (item: StoredAnalysis) => void;
  onAccount: () => void;
};

function initials(user: User) {
  const source = user.displayName || user.email || "?";
  return source
    .split(/[\s@.]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]!.toUpperCase())
    .join("");
}

function PlanCard({ profile }: { profile: UserProfile | null }) {
  const { t, locale } = useI18n();
  if (!profile) return null;
  if (profile.plan === "none" && availableCredits(profile) > 0) {
    return (
      <div className="rounded-xl border border-accent/30 bg-accent/5 p-3">
        <p className="text-sm font-medium">{t.account.trialPlan}</p>
        <p className="mt-0.5 text-xs text-muted">{t.account.trialHint}</p>
      </div>
    );
  }
  if (profile.plan === "none") {
    return (
      <div className="rounded-xl border border-accent/30 bg-accent/5 p-3">
        <p className="text-sm font-medium">{t.account.noOffer}</p>
        <p className="mt-0.5 text-xs text-muted">{t.account.noOfferHint}</p>
        <button type="button" onClick={openOffers} className="btn-primary mt-3 w-full px-3 py-2 text-xs">
          {t.account.chooseOffer}
        </button>
      </div>
    );
  }
  return (
    <div className="rounded-xl border border-border bg-card/70 p-3">
      <p className="text-sm font-medium">{profile.plan === "monthly" ? t.account.monthlyPlan : t.account.lifetimePlan}</p>
      <p className="mt-0.5 text-xs text-muted">
        {/* Cleared by the webhook once the first monthly payment goes through. */}
        {profile.trialEndsAt
          ? t.account.trialUntil(new Date(profile.trialEndsAt).toLocaleDateString(INTL_LOCALE[locale], { day: "numeric", month: "long" }))
          : t.account.perMonth(MONTHLY_CREDITS)}
      </p>
    </div>
  );
}

function CreditsGauge({ credits }: { credits: number | null }) {
  const { t } = useI18n();
  const value = credits ?? 0;
  const filled = Math.round((Math.min(value, MONTHLY_CREDITS) / MONTHLY_CREDITS) * 10);
  return (
    <div className="px-1">
      <p className="flex items-center justify-between text-xs">
        <span className="text-muted">{t.account.credits}</span>
        <span className="font-mono text-foreground">
          {credits ?? "–"} <span className="text-muted">/ {MONTHLY_CREDITS}</span>
        </span>
      </p>
      <div className="mt-2 flex gap-1" aria-hidden>
        {Array.from({ length: 10 }, (_, index) => (
          <span key={index} className={`h-1.5 flex-1 rounded-full ${index < filled ? "bg-accent" : "bg-border"}`} />
        ))}
      </div>
    </div>
  );
}

/** App-style dashboard sidebar: new analysis, history, plan, credits and account menu. */
export function Sidebar({ user, profile, credits, history, activeId, onNew, onSelect, onAccount }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t, href } = useI18n();
  const a = t.account;

  return (
    <div className="flex h-full flex-col">
      <div className="px-4 pb-4 pt-5">
        <Logo href={href("/")} />
      </div>
      <div className="px-3">
        <button type="button" onClick={onNew} className="btn-primary w-full">
          {a.newAnalysis}
        </button>
      </div>

      <nav className="mt-6 min-h-0 flex-1 overflow-y-auto px-3" aria-label={a.historyLabel}>
        <p className="label px-2 pb-2 text-muted">{a.history}</p>
        <HistoryList items={history} activeId={activeId} onSelect={onSelect} />
      </nav>

      <div className="space-y-4 border-t border-border/70 p-3">
        <PlanCard profile={profile} />
        <CreditsGauge credits={credits} />

        <div className="relative">
          {menuOpen && (
            <>
              <button type="button" className="fixed inset-0 z-10 cursor-default" aria-label={a.closeMenu} onClick={() => setMenuOpen(false)} />
              <div className="absolute inset-x-0 bottom-full z-20 mb-2 overflow-hidden rounded-xl border border-border bg-card p-1 shadow-2xl">
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    onAccount();
                  }}
                  className="w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-background/60"
                >
                  {a.myAccount}
                </button>
                {profile?.plan === "monthly" && (
                  <BillingButton route="portal" block className="w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-background/60">
                    {a.mySubscription}
                  </BillingButton>
                )}
                <Link href={href("/pricing")} className="block rounded-lg px-3 py-2 text-sm hover:bg-background/60">
                  {a.offers}
                </Link>
                {isAdminUser(user) && (
                  <Link href="/admin" className="block rounded-lg px-3 py-2 text-sm text-brand hover:bg-background/60">
                    {a.admin}
                  </Link>
                )}
                <button
                  type="button"
                  onClick={() => signOut(auth)}
                  className="w-full rounded-lg px-3 py-2 text-left text-sm text-bear hover:bg-background/60"
                >
                  {a.signOut}
                </button>
              </div>
            </>
          )}
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            className="flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left transition-colors hover:bg-card"
          >
            <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-linear-to-br from-brand/30 to-accent/30 font-display text-sm font-bold text-foreground">
              {initials(user)}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-medium">{user.displayName || a.myAccount}</span>
              <span className="block truncate text-xs text-muted">{user.email}</span>
            </span>
            <span className="text-muted" aria-hidden>
              ⌃
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
