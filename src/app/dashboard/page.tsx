"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { RecentAnalyses, useAnalysisHistory, type StoredAnalysis } from "@/components/analysis-history";
import { AnalysisView } from "@/components/analysis-view";
import { useAuth } from "@/components/auth-provider";
import { ChartUploader, type AnalysisOutcome } from "@/components/chart-uploader";
import { AccountPanel } from "@/components/dashboard/account-panel";
import { EmailBanner } from "@/components/dashboard/email-banner";
import { AccountMenu } from "@/components/dashboard/account-menu";
import { TourPopover } from "@/components/dashboard/tour";
import { Logo } from "@/components/logo";
import { ReviewPrompt } from "@/components/review-prompt";
import type { ChartAnalysis } from "@/lib/analysis";
import { availableCredits, MONTHLY_CREDITS, PLAN_LABELS } from "@/lib/plans";
import { subscribeUserProfile, type UserProfile } from "@/lib/users";

const TOUR_KEY = "scanzivo-tour-done";

type Current = { analysis: ChartAnalysis; imageUrl: string | null; id: string | null };

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [current, setCurrent] = useState<Current | null>(null);
  const [view, setView] = useState<"analyze" | "account">("analyze");
  const [refreshKey, setRefreshKey] = useState(0);
  const [tour, setTour] = useState<0 | 1 | 2>(0);
  const mainRef = useRef<HTMLDivElement>(null);
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

  // First visit: a short two-step tour of the composer.
  useEffect(() => {
    if (!user) return;
    let done = true;
    try {
      done = localStorage.getItem(TOUR_KEY) === "1";
    } catch {}
    if (!done) {
      const timer = setTimeout(() => setTour(1), 600);
      return () => clearTimeout(timer);
    }
  }, [user]);

  const endTour = useCallback(() => {
    setTour(0);
    try {
      localStorage.setItem(TOUR_KEY, "1");
    } catch {}
  }, []);

  const history = useAnalysisHistory(user?.uid ?? null, refreshKey);

  function scrollTop() {
    requestAnimationFrame(() => mainRef.current?.scrollTo({ top: 0, behavior: "smooth" }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function show(next: Current) {
    setCurrent((previous) => {
      if (previous?.imageUrl && previous.imageUrl !== next.imageUrl) URL.revokeObjectURL(previous.imageUrl);
      return next;
    });
    setView("analyze");
    scrollTop();
  }

  function startNew() {
    setCurrent((previous) => {
      if (previous?.imageUrl) URL.revokeObjectURL(previous.imageUrl);
      return null;
    });
    setView("analyze");
    scrollTop();
  }

  const credits = profile ? availableCredits(profile) : null;

  if (loading || !user) {
    return <div className="label flex flex-1 items-center justify-center text-muted">Chargement…</div>;
  }

  const firstName = (user.displayName || "").split(" ")[0];
  const gauge = Math.round((Math.min(credits ?? 0, MONTHLY_CREDITS) / MONTHLY_CREDITS) * 100);

  const noCredits = credits !== null && credits < 1;
  const disabledNotice =
    profile?.plan === "none" ? (
      <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-sm text-muted">
        Choisissez une offre pour lancer votre première analyse.
        <Link href="/pricing" className="font-medium text-accent underline underline-offset-4">
          Voir les offres
        </Link>
      </p>
    ) : (
      <p className="text-center text-sm text-muted">Vous avez utilisé toutes vos analyses du mois. Elles seront rechargées au prochain renouvellement.</p>
    );

  return (
    <div className="flex flex-1 flex-col">
      <header className="sticky top-0 z-30 border-b border-border/70 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <Logo />
          <div className="flex items-center gap-2 sm:gap-3">
            {current && view === "analyze" && (
              <button type="button" onClick={startNew} className="btn-secondary hidden px-4 py-2 sm:inline-flex">
                Nouvelle analyse +
              </button>
            )}
            {profile?.plan === "none" && (
              <Link href="/pricing" className="btn-primary px-4 py-2">
                Choisir une offre
              </Link>
            )}
            {/* Credits: count + gauge */}
            <div className="flex items-center gap-2.5 rounded-full border border-border bg-card/70 py-1.5 pl-3 pr-3.5" title={`${credits ?? "–"} crédits restants ce mois-ci`}>
              <span className="hidden h-1.5 w-16 overflow-hidden rounded-full bg-border sm:block" aria-hidden>
                <span className="block h-full rounded-full bg-accent" style={{ width: `${gauge}%` }} />
              </span>
              <span className="font-mono text-xs">
                {credits ?? "–"}
                <span className="text-muted"> crédits</span>
              </span>
              {profile && <span className="hidden font-mono text-[11px] text-muted md:inline">· {PLAN_LABELS[profile.plan]}</span>}
            </div>
            <AccountMenu user={user} profile={profile} onAccount={() => setView("account")} />
          </div>
        </div>
      </header>

      <EmailBanner user={user} />
      {checkoutDone && (
        <div className="flex items-center gap-3 border-b border-bull/30 bg-bull/10 px-4 py-2.5 text-sm text-bull">
          <p className="mx-auto w-full max-w-6xl flex-1">
            {profile && profile.plan !== "none" ? "Paiement confirmé. Vos crédits sont disponibles." : "Paiement reçu, activation de votre offre en cours…"}
          </p>
          <button type="button" onClick={() => setCheckoutDone(false)} aria-label="Fermer" className="px-1 text-lg leading-none">
            ×
          </button>
        </div>
      )}

      <main ref={mainRef} className="relative mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:py-12">
        {view === "account" ? (
          <div className="max-w-3xl">
            <AccountPanel user={user} profile={profile} credits={credits} onBack={() => setView("analyze")} />
          </div>
        ) : current ? (
          <AnalysisView analysis={current.analysis} imageUrl={current.imageUrl} onNew={startNew} />
        ) : (
          <>
            <h1 className="display text-4xl sm:text-5xl">
              Salut{firstName ? "," : ""} <span className="mark">{firstName || "et bienvenue"}</span>
            </h1>
            <p className="mt-3 max-w-2xl text-lg text-muted">
              Importez une capture de graphique : Scanzivo la lit comme un analyste et vous rend deux scénarios chiffrés, avec les niveaux tracés.
            </p>

            <div className={`mt-8 ${tour ? "relative z-50" : ""}`}>
              {tour > 0 && <TourPopover step={tour as 1 | 2} onNext={() => (tour === 1 ? setTour(2) : endTour())} onSkip={endTour} />}
              <ChartUploader
                disabled={noCredits}
                disabledNotice={disabledNotice}
                highlight={tour === 1 ? "zone" : tour === 2 ? "send" : null}
                onAnalyzed={(outcome: AnalysisOutcome) => {
                  show({ ...outcome, id: null });
                  setRefreshKey((key) => key + 1);
                }}
              />
            </div>

            <p className="mt-4 text-xs text-muted">
              Conseil : une capture nette, avec l&apos;axe des prix lisible, donne une meilleure analyse. Précisez votre unité de temps et votre style dans le contexte.
            </p>

            <RecentAnalyses items={history} onSelect={(item: StoredAnalysis) => show({ analysis: item, imageUrl: null, id: item.id })} />
          </>
        )}

        {view === "analyze" && <ReviewPrompt uid={user.uid} displayName={user.displayName} analysisCount={history?.length ?? 0} />}
      </main>

      {/* Tour backdrop: dims everything but the analysis panel. */}
      {tour > 0 && <button type="button" aria-label="Passer la visite" onClick={endTour} className="fixed inset-0 z-40 cursor-default bg-background/75 backdrop-blur-[2px]" />}
    </div>
  );
}
