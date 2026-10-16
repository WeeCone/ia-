"use client";

import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useSyncExternalStore } from "react";
import { hasPendingOffer } from "@/lib/offers-client";
import { hasPendingChart } from "@/lib/pending-chart";
import { AuthCard, Divider, FormError } from "@/components/auth-card";
import { GoogleButton } from "@/components/google-button";
import { authErrorMessage } from "@/lib/auth-errors";
import { auth } from "@/lib/firebase";
import { ensureUserProfile } from "@/lib/users";

const noSubscribe = () => () => {};

export default function SignupPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  // What the visitor already did before landing here, so the page says what happens next.
  const context = useSyncExternalStore(
    noSubscribe,
    () => (hasPendingOffer() ? "offer" : hasPendingChart() ? "chart" : null),
    () => null,
  );

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email")).trim();
    const password = String(form.get("password"));

    if (!form.get("terms")) {
      setError("Veuillez accepter les conditions d'utilisation.");
      return;
    }

    setError(null);
    setPending(true);
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await ensureUserProfile(user);
      // Best effort: the dashboard banner offers to resend it.
      sendEmailVerification(user).catch(() => {});
      router.replace("/dashboard");
    } catch (err) {
      setError(authErrorMessage(err));
      setPending(false);
    }
  }

  return (
    <AuthCard
      title="Ouvrir un compte"
      subtitle={
        context === "offer"
          ? "Créez votre compte : le paiement sécurisé s'ouvre juste après."
          : context === "chart"
            ? "Votre capture est prête. Créez votre compte pour l'analyser."
            : "Créez votre compte, puis choisissez votre offre."
      }
    >
      <GoogleButton onError={setError} />
      <Divider />
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="field">
          <span>Email</span>
          <input name="email" type="email" autoComplete="email" required placeholder="vous@exemple.com" />
        </label>
        <div className="field">
          <label htmlFor="signup-password">Mot de passe</label>
          <div className="relative">
            <input
              id="signup-password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              minLength={6}
              required
              placeholder="6 caractères minimum"
              className="w-full pr-24"
            />
            <button
              type="button"
              onClick={() => setShowPassword((shown) => !shown)}
              aria-pressed={showPassword}
              className="absolute inset-y-0 right-0 px-4 text-sm font-medium text-muted hover:text-foreground"
            >
              {showPassword ? "Masquer" : "Afficher"}
            </button>
          </div>
        </div>
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
