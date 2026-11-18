"use client";

import { type User } from "firebase/auth";
import { useState } from "react";
import { useI18n } from "@/i18n/client";
import type { UserProfile } from "@/lib/users";

/** Asks once, in the dashboard, whether tips and offers may be sent by email: a yes or a no, never assumed. */
export function MarketingPrompt({ user, profile }: { user: User; profile: UserProfile | null }) {
  const { t } = useI18n();
  const m = t.marketing.prompt;
  const [answer, setAnswer] = useState<"yes" | "no" | null>(null);
  // Not before the profile is known, and not again once the account has answered (here or at sign-up).
  if (!profile || profile.marketingDecidedAt || profile.marketingConsent !== undefined) return null;

  async function send(consent: boolean) {
    setAnswer(consent ? "yes" : "no");
    try {
      const token = await user.getIdToken();
      await fetch("/api/account/marketing", { method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }, body: JSON.stringify({ consent }) });
    } catch {
      // The question simply comes back at the next visit.
    }
  }

  if (answer) return <p role="status" className="border-b border-border bg-card/60 px-4 py-2.5 text-center text-sm text-muted">{m.thanks}</p>;
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-border bg-card/60 px-4 py-2.5 text-sm">
      <p className="mx-auto w-full max-w-6xl flex-1">
        <span className="font-semibold">{m.title}</span> <span className="text-muted">{m.text}</span>
      </p>
      <div className="flex gap-2">
        <button type="button" onClick={() => send(true)} className="btn-primary !px-4 !py-1.5 !text-sm">
          {m.accept}
        </button>
        <button type="button" onClick={() => send(false)} className="btn-secondary !px-4 !py-1.5 !text-sm">
          {m.decline}
        </button>
      </div>
    </div>
  );
}
