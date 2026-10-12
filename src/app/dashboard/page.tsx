"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useAnalysisHistory, type StoredAnalysis } from "@/components/analysis-history";
import { AnalysisView } from "@/components/analysis-view";
import { useAuth } from "@/components/auth-provider";
import { ChartUploader, type AnalysisOutcome } from "@/components/chart-uploader";
import { AccountPanel } from "@/components/dashboard/account-panel";
import { EmailBanner } from "@/components/dashboard/email-banner";
import { Sidebar } from "@/components/dashboard/sidebar";
import { TourPopover } from "@/components/dashboard/tour";
import { Logo } from "@/components/logo";
import { ReviewPrompt } from "@/components/review-prompt";
import type { ChartAnalysis } from "@/lib/analysis";
import { availableCredits } from "@/lib/plans";
import { subscribeUserProfile, type UserProfile } from "@/lib/users";

const TOUR_KEY = "scanzivo-tour-done";

const STEPS = [
  { title: "Déposez votre graphique", text: "Une capture suffit : n'importe quel actif, n'importe quelle unité de temps, depuis n'importe quelle plateforme." },
  { title: "Scanzivo le lit", text: "Structure de marché, supports et résistances, figures chartistes et indicateurs visibles sur la capture." },
  { title: "Vous recevez votre plan", text: "Deux scénarios probabilisés avec entrée, stop, objectifs, ratio gain / risque et niveaux tracés." },
];

type Current = { analysis: ChartAnalysis; imageUrl: string | null; id: string | null };

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [current, setCurrent] = useState<Current | null>(null);
  const [view, setView] = useState<"analyze" | "account">("analyze");
  const [refreshKey, setRefreshKey] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
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
      <p className="text-center text-sm text-muted">Vous avez utilisé toutes vos analyses du mois. Elles seront rechargées au prochain renouvellement.</p>
    );

  return (
    <div className="flex flex-1">
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-dvh w-72 shrink-0 border-r border-border/70 bg-surface/80 lg:block">{sidebar}</aside>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button type="button" className="absolute inset-0 bg-background/70 backdrop-blur-sm" aria-label="Fermer le menu" onClick={() => setDrawerOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-72 max-w-[85vw] border-r border-border bg-surface">{sidebar}</aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-border/70 bg-background/80 px-4 py-3 backdrop-blur-xl lg:hidden">
          <button type="button" onClick={() => setDrawerOpen(true)} aria-label="Ouvrir le menu" className="grid size-9 place-items-center rounded-lg border border-border">
            <svg viewBox="0 0 20 20" className="size-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden>
              <path d="M3 5h14M3 10h14M3 15h14" />
            </svg>
          </button>
          <Logo />
          <span className="chip ml-auto border-accent/40 bg-accent/10 text-accent">{credits ?? "–"} crédits</span>
        </header>

        <EmailBanner user={user} />
        {checkoutDone && (
          <div className="flex items-center gap-3 border-b border-bull/30 bg-bull/10 px-4 py-2.5 text-sm text-bull">
            <p className="flex-1">
              {profile && profile.plan !== "none" ? "Paiement confirmé. Vos crédits sont disponibles." : "Paiement reçu, activation de votre offre en cours…"}
            </p>
            <button type="button" onClick={() => setCheckoutDone(false)} aria-label="Fermer" className="px-1 text-lg leading-none">
              ×
            </button>
          </div>
        )}

        <main ref={mainRef} className="relative mx-auto w-full max-w-4xl flex-1 px-4 py-10 sm:py-14">
          {view === "account" ? (
            <AccountPanel user={user} profile={profile} credits={credits} onBack={() => setView("analyze")} />
          ) : current ? (
            <AnalysisView analysis={current.analysis} imageUrl={current.imageUrl} onNew={startNew} />
          ) : (
            <div className="flex min-h-[calc(100dvh-14rem)] flex-col justify-center">
              <div className="text-center">
                {firstName && <p className="label text-brand">Bon retour, {firstName}</p>}
                <h1 className="display mt-3 text-3xl sm:text-5xl">
                  Déposez un graphique. <span className="mark">Recevez un plan clair.</span>
                </h1>
                <p className="mx-auto mt-4 max-w-xl text-muted">
                  Scanzivo lit votre capture comme un analyste et vous rend deux scénarios chiffrés, avec les niveaux tracés sur votre graphique.
                </p>
              </div>

              <ul className="mt-10 hidden gap-3 sm:grid sm:grid-cols-3">
                {STEPS.map((step, index) => (
                  <li key={step.title} className="panel p-4">
                    <p className="flex items-center gap-2 font-display font-semibold">
                      <span className="mark font-mono text-sm">{String(index + 1).padStart(2, "0")}</span>
                      {step.title}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{step.text}</p>
                  </li>
                ))}
              </ul>

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

              <p className="mt-6 text-center text-xs text-muted">
                Conseil : une capture nette, avec l&apos;axe des prix lisible, donne une meilleure analyse. Précisez votre unité de temps et votre style dans le contexte.
              </p>
            </div>
          )}

          {view === "analyze" && <ReviewPrompt uid={user.uid} displayName={user.displayName} analysisCount={history?.length ?? 0} />}
        </main>
      </div>

      {/* Tour backdrop: dims everything but the composer. */}
      {tour > 0 && <button type="button" aria-label="Passer la visite" onClick={endTour} className="fixed inset-0 z-40 cursor-default bg-background/75 backdrop-blur-[2px]" />}
    </div>
  );
}
