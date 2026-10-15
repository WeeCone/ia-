"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { RecentAnalyses, useAnalysisHistory, type StoredAnalysis } from "@/components/analysis-history";
import { AnalysisView } from "@/components/analysis-view";
import { useAuth } from "@/components/auth-provider";
import { CaptureGuide } from "@/components/capture-guide";
import { ChartUploader, type AnalysisOutcome } from "@/components/chart-uploader";
import { AccountPanel } from "@/components/dashboard/account-panel";
import { EmailBanner } from "@/components/dashboard/email-banner";
import { AccountMenu } from "@/components/dashboard/account-menu";
import { Sidebar } from "@/components/dashboard/sidebar";
import { TourPopover } from "@/components/dashboard/tour";
import { Logo } from "@/components/logo";
import { ReviewPrompt } from "@/components/review-prompt";
import type { ChartAnalysis } from "@/lib/analysis";
import { isAdminUser } from "@/lib/admin";
import { availableCredits, MONTHLY_CREDITS, PLAN_LABELS } from "@/lib/plans";
import { subscribeUserProfile, type UserProfile } from "@/lib/users";

const TOUR_KEY = "scanzivo-tour-done";
const TEST_MODE_KEY = "scanzivo-test-mode";

type Current = {
  analysis: ChartAnalysis;
  imageUrl: string | null;
  id: string | null;
};

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [current, setCurrent] = useState<Current | null>(null);
  const [view, setView] = useState<"analyze" | "account">("analyze");
  const [refreshKey, setRefreshKey] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [tour, setTour] = useState<0 | 1 | 2>(0);
  // Admin-only: canned reports without calling the model (remembered on this device).
  const [testMode, setTestMode] = useState(() => {
    try {
      return typeof window !== "undefined" && localStorage.getItem(TEST_MODE_KEY) === "1";
    } catch {
      return false;
    }
  });
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
    setDrawerOpen(false);
    scrollTop();
  }

  function startNew() {
    setCurrent((previous) => {
      if (previous?.imageUrl) URL.revokeObjectURL(previous.imageUrl);
      return null;
    });
    setView("analyze");
    setDrawerOpen(false);
    scrollTop();
  }

  const credits = profile ? availableCredits(profile) : null;

  if (loading || !user) {
    return <div className="label flex flex-1 items-center justify-center text-muted">Chargement…</div>;
  }

  const firstName = (user.displayName || "").split(" ")[0];
  const gauge = Math.round((Math.min(credits ?? 0, MONTHLY_CREDITS) / MONTHLY_CREDITS) * 100);

  const sidebar = (
    <Sidebar
      user={user}
      profile={profile}
      credits={credits}
      history={history}
      activeId={current?.id ?? null}
      onNew={startNew}
      onSelect={(item: StoredAnalysis) => show({ analysis: item, imageUrl: null, id: item.id })}
      onAccount={() => {
        setView("account");
        setDrawerOpen(false);
      }}
    />
  );

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
      <p className="text-center text-sm text-muted">
        Vous avez utilisé toutes vos analyses du mois. Elles seront rechargées au prochain renouvellement.
      </p>
    );

  return (
    <div className="flex flex-1">
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-dvh w-72 shrink-0 border-r border-border/70 bg-surface/80 lg:block">{sidebar}</aside>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-background/70 backdrop-blur-sm"
            aria-label="Fermer le menu"
            onClick={() => setDrawerOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 w-72 max-w-[85vw] border-r border-border bg-surface">{sidebar}</aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top bar: full on mobile; on desktop the sidebar carries logo, credits and account, so only quick actions remain. */}
        <header className="sticky top-0 z-30 border-b border-border/70 bg-background/70 backdrop-blur-xl">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
            <div className="flex items-center gap-3 lg:hidden">
              <button
                type="button"
                onClick={() => setDrawerOpen(true)}
                aria-label="Ouvrir le menu"
                className="grid size-9 place-items-center rounded-lg border border-border"
              >
                <svg viewBox="0 0 20 20" className="size-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden>
                  <path d="M3 5h14M3 10h14M3 15h14" />
                </svg>
              </button>
              <Logo />
            </div>
            <p className="label hidden text-muted lg:block">{view === "account" ? "Mon compte" : current ? "Rapport d'analyse" : "Analyse"}</p>
            <div className="flex items-center gap-2 sm:gap-3">
              {current && view === "analyze" && (
                <button type="button" onClick={startNew} className="btn-secondary hidden px-4 py-2 sm:inline-flex">
                  Nouvelle analyse +
                </button>
              )}
              {profile?.plan === "none" && (
                <Link href="/pricing" className="btn-primary hidden px-4 py-2 sm:inline-flex">
                  Choisir une offre
                </Link>
              )}
              {/* Credits: count + gauge */}
              <div
                className="flex items-center gap-2.5 whitespace-nowrap rounded-full border border-border bg-card/70 py-1.5 pl-3 pr-3.5 lg:hidden"
                title={`${credits ?? "–"} crédits restants ce mois-ci`}
              >
                <span className="hidden h-1.5 w-16 overflow-hidden rounded-full bg-border sm:block" aria-hidden>
                  <span className="block h-full rounded-full bg-accent" style={{ width: `${gauge}%` }} />
                </span>
                <span className="font-mono text-xs">
                  {credits ?? "–"}
                  <span className="text-muted"> crédits</span>
                </span>
                {profile && <span className="hidden font-mono text-[11px] text-muted md:inline">· {PLAN_LABELS[profile.plan]}</span>}
              </div>
              <div className="lg:hidden">
                <AccountMenu user={user} profile={profile} onAccount={() => setView("account")} />
              </div>
            </div>
          </div>
        </header>

        <EmailBanner user={user} />
        {checkoutDone && (
          <div className="flex items-center gap-3 border-b border-bull/30 bg-bull/10 px-4 py-2.5 text-sm text-bull">
            <p className="mx-auto w-full max-w-6xl flex-1">
              {profile && profile.plan !== "none"
                ? "Paiement confirmé. Vos crédits sont disponibles."
                : "Paiement reçu, activation de votre offre en cours…"}
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

              {isAdminUser(user) && (
                <label className="mt-6 flex w-fit cursor-pointer items-center gap-3 rounded-xl border border-bear/40 bg-bear/5 px-4 py-2.5 text-sm">
                  <input
                    type="checkbox"
                    checked={testMode}
                    onChange={(event) => {
                      setTestMode(event.target.checked);
                      try {
                        localStorage.setItem(TEST_MODE_KEY, event.target.checked ? "1" : "0");
                      } catch {}
                    }}
                    className="size-4 accent-bear"
                  />
                  <span>
                    <span className="font-semibold text-bear">Mode test (admin)</span>
                    <span className="text-muted"> : rapport d&apos;exemple, sans appeler l&apos;IA ni débiter de crédit</span>
                  </span>
                </label>
              )}

              <div className={`mt-8 ${tour ? "relative z-50" : ""}`}>
                {tour > 0 && <TourPopover step={tour as 1 | 2} onNext={() => (tour === 1 ? setTour(2) : endTour())} onSkip={endTour} />}
                <ChartUploader
                  disabled={noCredits}
                  disabledNotice={disabledNotice}
                  testMode={testMode && isAdminUser(user)}
                  highlight={tour === 1 ? "zone" : tour === 2 ? "send" : null}
                  onAnalyzed={(outcome: AnalysisOutcome) => {
                    show({ ...outcome, id: null });
                    setRefreshKey((key) => key + 1);
                  }}
                />
              </div>

              {/* Open by default until the first analysis. */}
              <CaptureGuide defaultOpen={history?.length === 0} />

              <RecentAnalyses items={history} onSelect={(item: StoredAnalysis) => show({ analysis: item, imageUrl: null, id: item.id })} />
            </>
          )}

          {view === "analyze" && <ReviewPrompt uid={user.uid} displayName={user.displayName} analysisCount={history?.length ?? 0} />}
        </main>
      </div>

      {/* Tour backdrop: dims everything but the analysis panel. */}
      {tour > 0 && (
        <button
          type="button"
          aria-label="Passer la visite"
          onClick={endTour}
          className="fixed inset-0 z-40 cursor-default bg-background/75 backdrop-blur-[2px]"
        />
      )}
    </div>
  );
}
