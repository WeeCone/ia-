"use client";

import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnalysisHistory } from "@/components/analysis-history";
import { AnalysisResult } from "@/components/analysis-result";
import { useAuth } from "@/components/auth-provider";
import { BillingButton } from "@/components/billing-button";
import { ChartUploader } from "@/components/chart-uploader";
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
  const [analysis, setAnalysis] = useState<ChartAnalysis | null>(null);
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

  function show(next: ChartAnalysis) {
    setAnalysis(next);
    requestAnimationFrame(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }

  const credits = profile ? availableCredits(profile) : null;

  if (loading || !user) {
    return <div className="label flex flex-1 items-center justify-center">Chargement…</div>;
  }

  return (
    <div className="flex flex-1 flex-col">
      <header className="border-b-2 border-border bg-card">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
          <Logo />
          <div className="flex items-center gap-2">
            <span className="label hidden border-2 border-border bg-brand px-3 py-2 sm:inline text-background">
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
          <div className="mb-8 flex items-center justify-between gap-4 border-2 border-border bg-bull px-4 py-3 font-semibold text-background">
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
        <h1 className="display text-5xl sm:text-7xl">
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
        <p className="mt-6 text-lg">Importez une capture de graphique pour obtenir une analyse technique et deux scénarios.</p>
        <div className="mt-10 space-y-6">
          <ChartUploader
            disabled={credits !== null && credits < 1}
            onAnalyzed={(next) => {
              show(next);
              setRefreshKey((key) => key + 1);
            }}
          />
          <div ref={resultRef} className="scroll-mt-6">
            {analysis ? (
              <AnalysisResult analysis={analysis} />
            ) : (
              <div className="label grid min-h-32 place-items-center border-2 border-dashed border-border p-6 text-center">
                Le résultat de l&apos;analyse s&apos;affichera ici.
              </div>
            )}
          </div>
        </div>
        <AnalysisHistory uid={user.uid} refreshKey={refreshKey} onSelect={show} onLoaded={setAnalysisCount} />
        <ReviewPrompt uid={user.uid} displayName={user.displayName} analysisCount={analysisCount} />
        <DeleteAccount plan={profile?.plan} />
      </main>
    </div>
  );
}
