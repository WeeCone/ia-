"use client";

import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { auth } from "@/lib/firebase";
import type { Plan } from "@/lib/plans";
import { FormError } from "./auth-card";

const CONFIRMATION = "SUPPRIMER";

export function DeleteAccount({ plan }: { plan: Plan | undefined }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [typed, setTyped] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function confirmDelete() {
    const user = auth.currentUser;
    if (!user) return;
    setPending(true);
    setError(null);
    try {
      const response = await fetch("/api/account", {
        method: "DELETE",
        headers: { Authorization: `Bearer ${await user.getIdToken()}` },
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error ?? "La suppression a échoué.");
      }
      await signOut(auth).catch(() => {});
      router.replace("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "La suppression a échoué.");
      setPending(false);
    }
  }

  return (
    <section className="mt-10 border-t border-border/70 pt-8">
      <h2 className="display text-xl">Supprimer le compte</h2>
      {!open ? (
        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted">Supprimez définitivement votre compte et toutes vos analyses.</p>
          <button type="button" onClick={() => setOpen(true)} className="btn-secondary hover:border-bear hover:text-bear">
            Supprimer mon compte
          </button>
        </div>
      ) : (
        <div className="panel mt-6 space-y-4 border-bear/50 p-6">
          <p className="font-semibold text-bear">Cette action est définitive.</p>
          <ul className="list-disc space-y-1 pl-5 text-sm text-muted">
            <li>Votre profil et tout l&apos;historique de vos analyses seront effacés.</li>
            {plan === "monthly" && <li>Votre abonnement mensuel sera résilié immédiatement, sans remboursement de la période en cours.</li>}
            {plan === "lifetime" && <li>Vous perdrez votre accès à vie, sans remboursement.</li>}
            <li>Vos factures restent conservées par notre prestataire de paiement, comme la loi l&apos;exige.</li>
          </ul>
          <label className="field">
            <span>
              Tapez <strong className="text-foreground">{CONFIRMATION}</strong> pour confirmer
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
              {pending ? "Suppression…" : "Supprimer définitivement"}
            </button>
            <button type="button" onClick={() => setOpen(false)} disabled={pending} className="btn-secondary">
              Annuler
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
