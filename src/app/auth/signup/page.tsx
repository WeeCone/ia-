"use client";

import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthCard, Divider, FormError } from "@/components/auth-card";
import { GoogleButton } from "@/components/google-button";
import { authErrorMessage } from "@/lib/auth-errors";
import { auth } from "@/lib/firebase";
import { ensureUserProfile } from "@/lib/users";

export default function SignupPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name")).trim();
    const email = String(form.get("email")).trim();
    const password = String(form.get("password"));

    if (password !== form.get("confirm")) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }
    if (!form.get("terms")) {
      setError("Veuillez accepter les conditions d'utilisation.");
      return;
    }

    setError(null);
    setPending(true);
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(user, { displayName: name });
      await ensureUserProfile(user, name);
      // Best effort: the dashboard banner offers to resend it.
      sendEmailVerification(user).catch(() => {});
      router.replace("/dashboard");
    } catch (err) {
      setError(authErrorMessage(err));
      setPending(false);
    }
  }

  return (
    <AuthCard title="Ouvrir un compte" subtitle="Créez votre compte, puis choisissez votre offre.">
      <GoogleButton onError={setError} />
      <Divider />
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="field">
          <span>Nom complet</span>
          <input name="name" type="text" autoComplete="name" required placeholder="Jean Dupont" />
        </label>
        <label className="field">
          <span>Email</span>
          <input name="email" type="email" autoComplete="email" required placeholder="vous@exemple.com" />
        </label>
        <label className="field">
          <span>Mot de passe</span>
          <input name="password" type="password" autoComplete="new-password" minLength={6} required placeholder="••••••••" />
        </label>
        <label className="field">
          <span>Confirmer le mot de passe</span>
          <input name="confirm" type="password" autoComplete="new-password" minLength={6} required placeholder="••••••••" />
        </label>
        <label className="flex items-start gap-2 text-xs leading-relaxed text-muted">
          <input name="terms" type="checkbox" className="mt-0.5 size-4 accent-brand" />
          <span>
            J&apos;accepte les{" "}
            <Link href="/legal/cgv" target="_blank" className="underline underline-offset-2 hover:text-brand">
              conditions générales
            </Link>{" "}
            et la{" "}
            <Link href="/legal/confidentialite" target="_blank" className="underline underline-offset-2 hover:text-brand">
              politique de confidentialité
            </Link>
            , et je comprends que les analyses ne constituent pas un conseil en investissement.
          </span>
        </label>
        <FormError message={error} />
        <button type="submit" disabled={pending} className="btn-primary w-full">
          {pending ? "Création…" : "Créer mon compte"}
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-muted">
        Déjà un compte ?{" "}
        <Link href="/auth/login" className="font-bold underline decoration-2 underline-offset-2 hover:text-brand">
          Se connecter
        </Link>
      </p>
    </AuthCard>
  );
}
