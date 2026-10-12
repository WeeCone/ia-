"use client";

import { sendPasswordResetEmail } from "firebase/auth";
import Link from "next/link";
import { useState } from "react";
import { AuthCard, FormError } from "@/components/auth-card";
import { authErrorMessage } from "@/lib/auth-errors";
import { auth } from "@/lib/firebase";

export default function ForgotPasswordPage() {
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const email = String(new FormData(event.currentTarget).get("email")).trim();
    setError(null);
    setPending(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setSent(true);
    } catch (err) {
      setError(authErrorMessage(err));
    } finally {
      setPending(false);
    }
  }

  return (
    <AuthCard title="Mot de passe oublié" subtitle="Recevez un lien de réinitialisation par email.">
      {sent ? (
        <p className="rounded-xl border border-bull/40 bg-bull/10 px-3 py-2 text-sm font-medium text-bull">
          Si un compte existe pour cet email, un lien de réinitialisation vient d&apos;être envoyé.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="field">
            <span>Email</span>
            <input name="email" type="email" autoComplete="email" required placeholder="vous@exemple.com" />
          </label>
          <FormError message={error} />
          <button type="submit" disabled={pending} className="btn-primary w-full">
            {pending ? "Envoi…" : "Envoyer le lien"}
          </button>
        </form>
      )}
      <p className="mt-6 text-center text-sm text-muted">
        <Link href="/auth/login" className="font-bold underline decoration-2 underline-offset-2 hover:text-brand">
          ← Retour à la connexion
        </Link>
      </p>
    </AuthCard>
  );
}
