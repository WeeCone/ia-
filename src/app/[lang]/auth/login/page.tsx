"use client";

import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthCard, Divider, FormError } from "@/components/auth-card";
import { GoogleButton } from "@/components/google-button";
import { authErrorMessage } from "@/lib/auth-errors";
import { auth } from "@/lib/firebase";
import { useI18n } from "@/i18n/client";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const { t, locale, href } = useI18n();
  const a = t.auth;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setError(null);
    setPending(true);
    try {
      await signInWithEmailAndPassword(auth, String(form.get("email")).trim(), String(form.get("password")));
      router.replace(href("/dashboard"));
    } catch (err) {
      setError(authErrorMessage(err, locale));
      setPending(false);
    }
  }

  return (
    <AuthCard title={a.login.title} subtitle={a.login.subtitle}>
      <GoogleButton onError={setError} />
      <Divider />
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="field">
          <span>{a.email}</span>
          <input name="email" type="email" autoComplete="email" required placeholder={a.emailPlaceholder} />
        </label>
        <label className="field">
          <span className="flex justify-between">
            {a.password}
            <Link href={href("/auth/forgot-password")} className="underline decoration-2 underline-offset-2 hover:text-brand">
              {a.login.forgot}
            </Link>
          </span>
          <input name="password" type="password" autoComplete="current-password" required placeholder="••••••••" />
        </label>
        <FormError message={error} />
        <button type="submit" disabled={pending} className="btn-primary w-full">
          {pending ? a.login.pending : a.login.submit}
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-muted">
        {a.login.noAccount}{" "}
        <Link href={href("/auth/signup")} className="font-bold underline decoration-2 underline-offset-2 hover:text-brand">
          {a.login.signup}
        </Link>
      </p>
    </AuthCard>
  );
}
