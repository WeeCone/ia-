"use client";

import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthCard, Divider, FormError } from "@/components/auth-card";
import { GoogleButton } from "@/components/google-button";
import { authErrorMessage } from "@/lib/auth-errors";
import { auth } from "@/lib/firebase";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setError(null);
    setPending(true);
    try {
      await signInWithEmailAndPassword(auth, String(form.get("email")).trim(), String(form.get("password")));
      router.replace("/dashboard");
    } catch (err) {
      setError(authErrorMessage(err));
      setPending(false);
    }
  }

  return (
    <AuthCard title="Bon retour." subtitle="Connectez-vous pour analyser vos graphiques.">
      <GoogleButton onError={setError} />
      <Divider />
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="field">
          <span>Email</span>
          <input name="email" type="email" autoComplete="email" required placeholder="vous@exemple.com" />
        </label>
        <label className="field">
          <span className="flex justify-between">
            Mot de passe
            <Link href="/auth/forgot-password" className="text-brand hover:underline">
              Oublié ?
            </Link>
          </span>
          <input name="password" type="password" autoComplete="current-password" required placeholder="••••••••" />
        </label>
        <FormError message={error} />
        <button type="submit" disabled={pending} className="btn-primary w-full">
          {pending ? "Connexion…" : "Se connecter"}
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-muted">
        Pas encore de compte ?{" "}
        <Link href="/auth/signup" className="font-medium text-brand hover:underline">
          S&apos;inscrire
        </Link>
      </p>
    </AuthCard>
  );
}
