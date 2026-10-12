"use client";

import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnalysisHistory } from "@/components/analysis-history";
import { AnalysisView } from "@/components/analysis-view";
import { useAuth } from "@/components/auth-provider";
import { BillingButton } from "@/components/billing-button";
import { ChartUploader, type AnalysisOutcome } from "@/components/chart-uploader";
import { DeleteAccount } from "@/components/delete-account";
import { ReviewPrompt } from "@/components/review-prompt";
import { Logo } from "@/components/logo";
import Link from "next/link";
import type { ChartAnalysis } from "@/lib/analysis";
import { auth } from "@/lib/firebase";
import { availableCredits, PLAN_LABELS } from "@/lib/plans";
import { subscribeUserProfile, type UserProfile } from "@/lib/users";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  // The analysis on screen: a fresh one (with the user's screenshot) or one reopened from history (no image).
  const [current, setCurrent] = useState<{ analysis: ChartAnalysis; imageUrl: string | null } | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [analysisCount, setAnalysisCount] = useState(0);
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

  function show(next: { analysis: ChartAnalysis; imageUrl: string | null }) {
    setCurrent((previous) => {
      if (previous?.imageUrl && previous.imageUrl !== next.imageUrl) URL.revokeObjectURL(previous.imageUrl);
      return next;
    });
    requestAnimationFrame(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }

  function startNew() {
    setCurrent((previous) => {
      if (previous?.imageUrl) URL.revokeObjectURL(previous.imageUrl);
      return null;
    });
  }

  const credits = profile ? availableCredits(profile) : null;

  if (loading || !user) {
    return <div className="label flex flex-1 items-center justify-center">Chargement…</div>;
  }

  return (
    <div className="flex flex-1 flex-col">
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
          <Logo />
          <div className="flex items-center gap-2">
            <span className="chip hidden border-brand/40 bg-brand/10 py-1.5 text-brand sm:inline-flex">
              {credits ?? "–"} crédits · {profile ? PLAN_LABELS[profile.plan] : "–"}
            </span>
            {profile?.plan === "monthly" && (
              <BillingButton route="portal" className="btn-ghost">
                Mon abonnement
              </BillingButton>
            )}
            {profile?.plan === "none" && (
              <Link href="/pricing" className="btn-primary px-4 py-2">
                Choisir une offre
              </Link>
            )}
            <button onClick={() => signOut(auth)} className="btn-ghost">
              Déconnexion
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-12">
        {checkoutDone && (
          <div className="mb-8 flex items-center justify-between gap-4 rounded-xl border border-bull/40 bg-bull/10 px-4 py-3 font-medium text-bull">
            <span>
              {profile && profile.plan !== "none"
                ? "Paiement confirmé. Vos crédits sont disponibles."
                : "Paiement reçu, activation de votre abonnement en cours…"}
            </span>
            <button onClick={() => setCheckoutDone(false)} aria-label="Fermer" className="text-lg leading-none">
              ×
            </button>
          </div>
        )}
        <h1 className="display text-4xl sm:text-5xl">
          Salut, <span className="mark">{user.displayName ?? user.email}</span>
        </h1>
        {profile && credits !== null && credits < 1 && (
          <div className="panel mt-6 flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm">
              {profile.plan === "none"
                ? "Choisissez une offre pour lancer votre première analyse."
                : "Vous avez utilisé toutes vos analyses du mois. Elles seront rechargées au prochain renouvellement."}
            </p>
            {profile.plan === "none" && (
              <Link href="/pricing" className="btn-primary">
                Voir les offres
              </Link>
            )}
          </div>
        )}
        <p className="mt-4 text-lg text-muted">Importez une capture de graphique pour obtenir une analyse technique et deux scénarios.</p>
        <div ref={resultRef} className="mt-10 scroll-mt-6">
          {current ? (
            <AnalysisView analysis={current.analysis} imageUrl={current.imageUrl} onNew={startNew} />
          ) : (
            <ChartUploader
              disabled={credits !== null && credits < 1}
              disabledLabel={profile?.plan === "none" ? "Choisissez une offre" : "Plus de crédits ce mois-ci"}
              onAnalyzed={(outcome: AnalysisOutcome) => {
                show(outcome);
                setRefreshKey((key) => key + 1);
              }}
            />
          )}
        </div>
        <AnalysisHistory uid={user.uid} refreshKey={refreshKey} onSelect={(analysis) => show({ analysis, imageUrl: null })} onLoaded={setAnalysisCount} />
        <ReviewPrompt uid={user.uid} displayName={user.displayName} analysisCount={analysisCount} />
        <DeleteAccount plan={profile?.plan} />
      </main>
    </div>
  );
}
