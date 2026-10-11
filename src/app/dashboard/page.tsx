"use client";

import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnalysisHistory } from "@/components/analysis-history";
import { AnalysisResult } from "@/components/analysis-result";
import { useAuth } from "@/components/auth-provider";
import { BillingButton } from "@/components/billing-button";
import { ChartUploader } from "@/components/chart-uploader";
import { Logo } from "@/components/logo";
import type { ChartAnalysis } from "@/lib/analysis";
import { auth } from "@/lib/firebase";
import { subscribeUserProfile, type UserProfile } from "@/lib/users";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [analysis, setAnalysis] = useState<ChartAnalysis | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const resultRef = useRef<HTMLDivElement>(null);
  // Read once on the client; the page renders a loading state until auth resolves, so this cannot mismatch.
  const [checkoutDone, setCheckoutDone] = useState(
    () => typeof window !== "undefined" && new URLSearchParams(window.location.search).get("checkout") === "success",
  );

  useEffect(() => {
    if (!loading && !user) router.replace("/auth/login");
  }, [loading, user, router]);

  useEffect(() => {
    if (user) return subscribeUserProfile(user.uid, setProfile);
  }, [user]);

  function show(next: ChartAnalysis) {
    setAnalysis(next);
    requestAnimationFrame(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }

  if (loading || !user) {
    return <div className="flex flex-1 items-center justify-center text-muted">Chargement…</div>;
  }

  return (
    <div className="flex flex-1 flex-col">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4">
          <Logo />
          <div className="flex items-center gap-3">
            <span className="hidden rounded-full border border-border px-3 py-1 text-sm text-muted sm:inline">
              {profile?.credits ?? "–"} crédits · {profile?.plan === "pro" ? "Pro" : "Gratuit"}
            </span>
            {profile?.plan === "pro" ? (
              <BillingButton route="portal" className="btn-ghost">
                Mon abonnement
              </BillingButton>
            ) : (
              <BillingButton route="checkout">Passer Pro</BillingButton>
            )}
            <button onClick={() => signOut(auth)} className="btn-secondary">
              Déconnexion
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10">
        {checkoutDone && (
          <div className="mb-6 flex items-center justify-between gap-4 rounded-xl border border-brand/30 bg-brand/10 px-4 py-3 text-sm text-brand">
            <span>
              {profile?.plan === "pro"
                ? "Bienvenue dans NeuralTrade Pro 🎉 Vos crédits ont été rechargés."
                : "Paiement reçu, activation de votre abonnement en cours…"}
            </span>
            <button onClick={() => setCheckoutDone(false)} aria-label="Fermer" className="text-lg leading-none">
              ×
            </button>
          </div>
        )}
        <h1 className="text-3xl font-semibold">Bonjour {user.displayName ?? user.email} 👋</h1>
        {profile && profile.credits < 1 && profile.plan === "free" && (
          <div className="mt-6 flex flex-col gap-3 rounded-xl border border-border bg-surface p-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm">Vous avez utilisé vos analyses gratuites. Passez Pro pour continuer.</p>
            <BillingButton route="checkout">Passer Pro</BillingButton>
          </div>
        )}
        <p className="mt-2 text-muted">Importez une capture de graphique pour obtenir une analyse technique et deux scénarios.</p>
        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
          <ChartUploader
            disabled={profile !== null && profile.credits < 1}
            onAnalyzed={(next) => {
              show(next);
              setRefreshKey((key) => key + 1);
            }}
          />
          <div ref={resultRef} className="scroll-mt-6">
            {analysis ? (
              <AnalysisResult analysis={analysis} />
            ) : (
              <div className="grid h-full min-h-56 place-items-center rounded-2xl border border-border bg-surface/50 p-6 text-center text-sm text-muted">
                Le résultat de l&apos;analyse s&apos;affichera ici.
              </div>
            )}
          </div>
        </div>
        <AnalysisHistory uid={user.uid} refreshKey={refreshKey} onSelect={show} />
      </main>
    </div>
  );
}
