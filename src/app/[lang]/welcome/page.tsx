"use client";

import { signInWithCustomToken } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AuthCard } from "@/components/auth-card";
import { auth } from "@/lib/firebase";
import { useI18n } from "@/i18n/client";

type Claim =
  | { status: "working" | "slow" | "expired" | "failed" }
  | { status: "existing" | "alreadyActive"; email: string };

/**
 * Return page of a trial bought without an account. The account is made from the email given to Stripe, then the buyer
 * is signed in and sent to the dashboard, where the chart they dropped on the home page is waiting.
 */
export default function WelcomePage() {
  const router = useRouter();
  const { t, locale, href } = useI18n();
  const w = t.welcome;
  const [claim, setClaim] = useState<Claim>({ status: "working" });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const sessionId = new URLSearchParams(window.location.search).get("session_id");
    if (!sessionId) {
      router.replace(href("/"));
      return;
    }
    let cancelled = false;
    (async () => {
      // The payment may still be settling at Stripe: a few tries, two seconds apart, before saying it is slow.
      for (let tries = 0; tries < 10 && !cancelled; tries++) {
        const response = await fetch("/api/billing/guest-claim", {
          method: "POST",
          headers: { "Content-Type": "application/json", "X-Locale": locale },
          body: JSON.stringify({ sessionId }),
        }).catch(() => null);
        const data = (await response?.json().catch(() => null)) as { status?: string; token?: string; email?: string } | null;
        if (cancelled) return;
        if (!response?.ok || !data?.status) return setClaim({ status: "failed" });
        if (data.status === "created" && data.token) {
          try {
            await signInWithCustomToken(auth, data.token);
            router.replace(href("/dashboard"));
          } catch {
            setClaim({ status: "expired" });
          }
          return;
        }
        if (data.status === "existing" || data.status === "alreadyActive") return setClaim({ status: data.status, email: data.email ?? "" });
        if (data.status === "expired") return setClaim({ status: "expired" });
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
      if (!cancelled) setClaim({ status: "slow" });
    })();
    return () => {
      cancelled = true;
    };
  }, [attempt, href, locale, router]);

  const retry = () => {
    setClaim({ status: "working" });
    setAttempt((count) => count + 1);
  };

  const login = (
    <Link href={href("/auth/login")} className="btn-primary w-full">
      {w.login}
    </Link>
  );

  switch (claim.status) {
    case "working":
      return (
        <AuthCard title={w.title} subtitle={w.working}>
          <div className="h-1.5 overflow-hidden rounded-full bg-border" aria-hidden>
            <div className="h-full w-1/3 animate-[welcome-progress_1.4s_ease-in-out_infinite] rounded-full bg-accent" />
          </div>
        </AuthCard>
      );
    case "slow":
      return (
        <AuthCard title={w.title} subtitle={w.slow}>
          <button type="button" onClick={retry} className="btn-primary w-full">
            {w.retry}
          </button>
        </AuthCard>
      );
    case "expired":
      return (
        <AuthCard title={w.title} subtitle={w.expired}>
          {login}
        </AuthCard>
      );
    case "existing":
      return (
        <AuthCard title={w.title} subtitle={w.existing(claim.email)}>
          {login}
        </AuthCard>
      );
    case "alreadyActive":
      return (
        <AuthCard title={w.alreadyActiveTitle} subtitle={w.alreadyActive(claim.email)}>
          {login}
        </AuthCard>
      );
    default:
      return (
        <AuthCard title={w.title} subtitle={w.failed}>
          <button type="button" onClick={retry} className="btn-primary w-full">
            {w.retry}
          </button>
        </AuthCard>
      );
  }
}
