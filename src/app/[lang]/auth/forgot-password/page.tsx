"use client";

import { sendPasswordResetEmail } from "firebase/auth";
import Link from "next/link";
import { useState } from "react";
import { AuthCard, FormError } from "@/components/auth-card";
import { authErrorMessage } from "@/lib/auth-errors";
import { auth } from "@/lib/firebase";
import { useI18n } from "@/i18n/client";

export default function ForgotPasswordPage() {
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [pending, setPending] = useState(false);
  const { t, locale, href } = useI18n();
  const a = t.auth;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const email = String(new FormData(event.currentTarget).get("email")).trim();
    setError(null);
    setPending(true);
    try {
      // Firebase writes the reset email in the visitor's language.
      auth.languageCode = locale;
      await sendPasswordResetEmail(auth, email);
      setSent(true);
    } catch (err) {
      setError(authErrorMessage(err, locale));
    } finally {
      setPending(false);
    }
  }

  return (
    <AuthCard title={a.forgot.title} subtitle={a.forgot.subtitle}>
      {sent ? (
        <p className="rounded-xl border border-bull/40 bg-bull/10 px-3 py-2 text-sm font-medium text-bull">
          {a.forgot.sent}
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="field">
            <span>{a.email}</span>
            <input name="email" type="email" autoComplete="email" required placeholder={a.emailPlaceholder} />
          </label>
          <FormError message={error} />
          <button type="submit" disabled={pending} className="btn-primary w-full">
            {pending ? a.forgot.pending : a.forgot.submit}
          </button>
        </form>
      )}
      <p className="mt-6 text-center text-sm text-muted">
        <Link href={href("/auth/login")} className="font-bold underline decoration-2 underline-offset-2 hover:text-brand">
          {a.forgot.back}
        </Link>
      </p>
    </AuthCard>
  );
}
