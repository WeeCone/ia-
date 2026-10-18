"use client";

import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import { preloadStripe } from "@/components/checkout-dialog";
import { hasPendingOffer } from "@/lib/offers-client";
import { hasPendingChart } from "@/lib/pending-chart";
import { AuthCard, Divider, FormError } from "@/components/auth-card";
import { GoogleButton } from "@/components/google-button";
import { authErrorMessage } from "@/lib/auth-errors";
import { auth } from "@/lib/firebase";
import { ensureUserProfile } from "@/lib/users";
import { useI18n } from "@/i18n/client";

const noSubscribe = () => () => {};

export default function SignupPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { t, locale, href } = useI18n();
  const a = t.auth;
  // What the visitor already did before landing here, so the page says what happens next.
  const context = useSyncExternalStore(
    noSubscribe,
    () => (hasPendingOffer() ? "offer" : hasPendingChart() ? "chart" : null),
    () => null,
  );
  // A payment opens right after sign-up: fetch Stripe's script while the visitor fills the form.
  useEffect(() => {
    if (context === "offer") preloadStripe();
  }, [context]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email")).trim();
    const password = String(form.get("password"));

    if (!form.get("terms")) {
      setError(a.signup.termsRequired);
      return;
    }

    setError(null);
    setPending(true);
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await ensureUserProfile(user, undefined, locale);
      // Best effort: the dashboard banner offers to resend it.
      auth.languageCode = locale;
      sendEmailVerification(user).catch(() => {});
      router.replace(href("/dashboard"));
    } catch (err) {
      setError(authErrorMessage(err, locale));
      setPending(false);
    }
  }

  return (
    <AuthCard
      title={a.signup.title}
      subtitle={context === "offer" ? a.signup.subtitleOffer : context === "chart" ? a.signup.subtitleChart : a.signup.subtitle}
    >
      <GoogleButton onError={setError} />
      <Divider />
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="field">
          <span>{a.email}</span>
          <input name="email" type="email" autoComplete="email" required placeholder={a.emailPlaceholder} />
        </label>
        <div className="field">
          <label htmlFor="signup-password">{a.password}</label>
          <div className="relative">
            <input
              id="signup-password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              minLength={6}
              required
              placeholder={a.signup.passwordPlaceholder}
              className="w-full pr-24"
            />
            <button
              type="button"
              onClick={() => setShowPassword((shown) => !shown)}
              aria-pressed={showPassword}
              className="absolute inset-y-0 right-0 px-4 text-sm font-medium text-muted hover:text-foreground"
            >
              {showPassword ? a.signup.hide : a.signup.show}
            </button>
          </div>
        </div>
        <label className="flex items-start gap-2 text-xs leading-relaxed text-muted">
          <input name="terms" type="checkbox" className="mt-0.5 size-4 accent-brand" />
          <span>
            {a.signup.termsA}
            <Link href={href("/legal/cgv")} target="_blank" className="underline underline-offset-2 hover:text-brand">
              {a.signup.termsLink}
            </Link>
            {a.signup.termsB}
            <Link href={href("/legal/confidentialite")} target="_blank" className="underline underline-offset-2 hover:text-brand">
              {a.signup.privacyLink}
            </Link>
            {a.signup.termsC}
          </span>
        </label>
        <FormError message={error} />
        <button type="submit" disabled={pending} className="btn-primary w-full">
          {pending ? a.signup.pending : a.signup.submit}
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-muted">
        {a.signup.hasAccount}{" "}
        <Link href={href("/auth/login")} className="font-bold underline decoration-2 underline-offset-2 hover:text-brand">
          {a.signup.login}
        </Link>
      </p>
    </AuthCard>
  );
}
