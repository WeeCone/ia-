"use client";

import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { auth } from "@/lib/firebase";
import type { Plan } from "@/lib/plans";
import { useI18n } from "@/i18n/client";
import { FormError } from "./auth-card";

export function DeleteAccount({ plan }: { plan: Plan | undefined }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [typed, setTyped] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { t, locale, href } = useI18n();
  const d = t.deleteAccount;
  const CONFIRMATION = d.confirmWord;

  async function confirmDelete() {
    const user = auth.currentUser;
    if (!user) return;
    setPending(true);
    setError(null);
    try {
      const response = await fetch("/api/account", {
        method: "DELETE",
        headers: { Authorization: `Bearer ${await user.getIdToken()}`, "X-Locale": locale },
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error ?? d.failed);
      }
      await signOut(auth).catch(() => {});
      router.replace(href("/"));
    } catch (err) {
      setError(err instanceof Error ? err.message : d.failed);
      setPending(false);
    }
  }

  return (
    <section className="mt-10 border-t border-border/70 pt-8">
      <h2 className="display text-xl">{d.title}</h2>
      {!open ? (
        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted">{d.intro}</p>
          <button type="button" onClick={() => setOpen(true)} className="btn-secondary hover:border-bear hover:text-bear">
            {d.open}
          </button>
        </div>
      ) : (
        <div className="panel mt-6 space-y-4 border-bear/50 p-6">
          <p className="font-semibold text-bear">{d.warning}</p>
          <ul className="list-disc space-y-1 pl-5 text-sm text-muted">
            <li>{d.history}</li>
            {plan === "monthly" && <li>{d.monthly}</li>}
            {plan === "lifetime" && <li>{d.lifetime}</li>}
            <li>{d.invoices}</li>
          </ul>
          <label className="field">
            <span>
              {d.typeA}
              <strong className="text-foreground">{CONFIRMATION}</strong>
              {d.typeB}
            </span>
            <input value={typed} onChange={(event) => setTyped(event.target.value)} autoComplete="off" />
          </label>
          <FormError message={error} />
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={confirmDelete}
              disabled={typed.trim().toUpperCase() !== CONFIRMATION || pending}
              className="btn-primary bg-bear shadow-none hover:bg-bear/90 hover:shadow-none"
            >
              {pending ? d.pending : d.confirm}
            </button>
            <button type="button" onClick={() => setOpen(false)} disabled={pending} className="btn-secondary">
              {d.cancel}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
