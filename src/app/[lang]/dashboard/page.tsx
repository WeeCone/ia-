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
import { getDownloadURL, ref } from "firebase/storage";
import { isAdminUser } from "@/lib/admin";
import { storage } from "@/lib/firebase";
import { preloadStripe } from "@/components/checkout-dialog";
import { OfferDialog } from "@/components/dashboard/offer-dialog";
import { UpgradeNow } from "@/components/dashboard/upgrade-now";
import { redirectToBilling } from "@/lib/billing-client";
import { EMBEDDED_CHECKOUT, hasPendingOffer, onOpenCheckout, onOpenOffers, openCheckout, openOffers, takePendingOffer } from "@/lib/offers-client";
import { pixel } from "@/lib/meta-pixel";
import { hasPendingChart } from "@/lib/pending-chart";
import { availableCredits, MONTHLY_CREDITS } from "@/lib/plans";
import { useI18n } from "@/i18n/client";
import { subscribeUserProfile, type UserProfile } from "@/lib/users";

const TOUR_KEY = "scanzivo-tour-done";
const TEST_MODE_KEY = "scanzivo-test-mode";
// The offer picker opens by itself once per browser session for an account without an offer.
const OFFERS_SHOWN_KEY = "scanzivo:offers-shown";

type Current = {
  analysis: ChartAnalysis;
  imageUrl: string | null;
  id: string | null;
};

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { t, locale, href } = useI18n();
  const d = t.dashboard;
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [current, setCurrent] = useState<Current | null>(null);
  const [view, setView] = useState<"analyze" | "account">("analyze");
  const [refreshKey, setRefreshKey] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [tour, setTour] = useState<0 | 1 | 2>(0);
  const [offersOpen, setOffersOpen] = useState(false);
  // Set while handing over to Stripe for an offer picked before sign-up.
  const [redirecting, setRedirecting] = useState(() => typeof window !== "undefined" && !EMBEDDED_CHECKOUT && hasPendingOffer());
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
    if (!loading && !user) router.replace(href("/auth/login"));
  }, [loading, user, router]);

  // Back from payment: ask the server to check the session with Stripe and open what was paid, without depending on the
  // webhook alone. A few tries while Stripe finishes the payment; the profile listener shows the result.
  useEffect(() => {
    if (!user) return;
    const sessionId = new URLSearchParams(window.location.search).get("session_id");
    if (!sessionId) return;
    let stale = false;
    (async () => {
      for (let attempt = 0; attempt < 5 && !stale; attempt++) {
        try {
          const response = await fetch("/api/billing/confirm", {
            method: "POST",
            headers: { Authorization: `Bearer ${await user.getIdToken()}`, "Content-Type": "application/json", "X-Locale": locale },
            body: JSON.stringify({ sessionId }),
          });
          const data = await response.json().catch(() => ({}));
          // The ad pixel's purchase event (consent permitting); the session id keeps it counted once.
          if (data.ok && data.purchase) pixel("Purchase", { value: data.purchase.value, currency: "EUR" }, data.purchase.id);
          if (data.ok || !data.pending) break;
        } catch {}
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
      // Done with the return parameters: a reload must not confirm again.
      if (!stale) window.history.replaceState(null, "", window.location.pathname);
    })();
    return () => {
      stale = true;
    };
  }, [user, locale]);

  // An account with a Stripe customer but no offer may have paid without being activated: ask the server to check
  // Stripe once per visit and repair it. Nothing changes for an account that simply never paid.
  const needsSync = profile?.plan === "none" && Boolean(profile?.stripeCustomerId);
  useEffect(() => {
    if (!user || !needsSync) return;
    try {
      if (sessionStorage.getItem("scanzivo:synced") === "1") return;
      sessionStorage.setItem("scanzivo:synced", "1");
    } catch {}
    user
      .getIdToken()
      .then((token) => fetch("/api/billing/sync", { method: "POST", headers: { Authorization: `Bearer ${token}`, "X-Locale": locale } }))
      .catch(() => {});
  }, [user, needsSync, locale]);

  // Most payments start from here: have Stripe's script ready before anyone clicks.
  useEffect(() => preloadStripe(), []);

  useEffect(() => {
    if (user) return subscribeUserProfile(user.uid, setProfile);
  }, [user]);

  useEffect(() => onOpenOffers(() => setOffersOpen(true)), []);
  // Paying happens in its own dialog: the offer picker steps aside.
  useEffect(() => onOpenCheckout(() => setOffersOpen(false)), []);

  // An offer picked before signing up goes straight to checkout; otherwise an account without an offer sees the offers once.
  const plan = profile?.plan;
  // A paid trial leaves the plan at "none" with a credit to spend: such an account can analyse.
  const hasCredits = profile ? availableCredits(profile) > 0 : false;
  const trialTaken = Boolean(profile?.trialSessionId);
  useEffect(() => {
    if (!plan || checkoutDone) return;
    const offer = takePendingOffer();
    // The trial is for accounts without an offer that never had one; otherwise the choice is simply dropped.
    const allowed = offer === "trial" ? plan === "none" && !trialTaken : plan !== "lifetime";
    if (offer && allowed) {
      if (EMBEDDED_CHECKOUT) {
        const timer = setTimeout(() => openCheckout(offer), 0);
        return () => clearTimeout(timer);
      }
      redirectToBilling("checkout", offer, locale).catch(() => {
        setRedirecting(false);
        setOffersOpen(true);
      });
      return;
    }
    if (plan !== "none" || hasCredits) return;
    let shown = true;
    try {
      shown = sessionStorage.getItem(OFFERS_SHOWN_KEY) === "1";
      sessionStorage.setItem(OFFERS_SHOWN_KEY, "1");
    } catch {}
    if (shown) return;
    const timer = setTimeout(() => setOffersOpen(true), 400);
    return () => clearTimeout(timer);
  }, [plan, hasCredits, trialTaken, checkoutDone]);

  // First visit with an offer: a short two-step tour of the composer (pointless before one can analyse).
  useEffect(() => {
    if (!user || !plan || (plan === "none" && !hasCredits)) return;
    let done = true;
    try {
      done = localStorage.getItem(TOUR_KEY) === "1";
    } catch {}
    if (!done) {
      const timer = setTimeout(() => setTour(1), 600);
      return () => clearTimeout(timer);
    }
  }, [user, plan, hasCredits]);

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

  // Reopen a saved analysis; its screenshot (when stored) loads just after the report.
  function openStored(item: StoredAnalysis) {
    show({ analysis: item, imageUrl: null, id: item.id });
    if (!item.imagePath) return;
    getDownloadURL(ref(storage, item.imagePath))
      .then((url) => setCurrent((current) => (current?.id === item.id ? { ...current, imageUrl: url } : current)))
      .catch(() => {});
  }

  const credits = profile ? availableCredits(profile) : null;

  if (loading || !user) {
    return <div className="theme-light label flex flex-1 items-center justify-center text-muted">{d.loading}</div>;
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
      onSelect={openStored}
      onAccount={() => {
        setView("account");
        setDrawerOpen(false);
      }}
    />
  );

  const noCredits = credits !== null && credits < 1;
  // No offer: the uploader itself turns into "choose an offer". Out of credits: a notice under it.
  // A trial whose analysis is spent: offer to start the subscription now rather than wait for its end.
  const disabledNotice = profile?.trialEndsAt ? (
    <UpgradeNow trialEndsAt={profile.trialEndsAt} />
  ) : (
    <p className="text-center text-sm text-muted">{d.outOfCredits}</p>
  );

  return (
    <div className="theme-light flex flex-1">
      {/* Desktop sidebar */}
      {/* The column carries the sidebar ground down the whole page; the sidebar itself stays pinned. */}
      <div className="hidden w-72 shrink-0 border-r border-border/70 bg-surface/80 lg:block">
        <aside className="sticky top-0 h-dvh">{sidebar}</aside>
      </div>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-background/70 backdrop-blur-sm"
            aria-label={d.closeMenu}
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
                aria-label={d.openMenu}
                className="grid size-9 place-items-center rounded-lg border border-border"
              >
                <svg viewBox="0 0 20 20" className="size-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden>
                  <path d="M3 5h14M3 10h14M3 15h14" />
                </svg>
              </button>
              <Logo href={href("/")} />
            </div>
            <p className="label hidden text-muted lg:block">{view === "account" ? d.viewAccount : current ? d.viewReport : d.viewAnalyse}</p>
            <div className="flex items-center gap-2 sm:gap-3">
              {current && view === "analyze" && (
                <button type="button" onClick={startNew} className="btn-secondary hidden px-4 py-2 sm:inline-flex">
                  {d.newAnalysis}
                </button>
              )}
              {profile?.plan === "none" && (
                <button type="button" onClick={openOffers} className="btn-primary hidden px-4 py-2 sm:inline-flex">
                  {d.chooseOffer}
                </button>
              )}
              {/* Credits: count + gauge */}
              <div
                className="flex items-center gap-2.5 whitespace-nowrap rounded-full border border-border bg-card/70 py-1.5 pl-3 pr-3.5 lg:hidden"
                title={d.creditsLeft(String(credits ?? "–"))}
              >
                <span className="hidden h-1.5 w-16 overflow-hidden rounded-full bg-border sm:block" aria-hidden>
                  <span className="block h-full rounded-full bg-accent" style={{ width: `${gauge}%` }} />
                </span>
                <span className="font-mono text-xs">
                  {credits ?? "–"}
                  <span className="text-muted">{d.credits}</span>
                </span>
                {profile && <span className="hidden font-mono text-[11px] text-muted md:inline">· {t.plans[profile.plan]}</span>}
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
              {profile && profile.plan !== "none" ? d.paymentConfirmed : d.paymentPending}
            </p>
            <button type="button" onClick={() => setCheckoutDone(false)} aria-label={t.common.close} className="px-1 text-lg leading-none">
              ×
            </button>
          </div>
        )}

        <main id="contenu" ref={mainRef} className="relative mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:py-12">
          {view === "account" ? (
            <div className="max-w-3xl">
              <AccountPanel user={user} profile={profile} credits={credits} onBack={() => setView("analyze")} />
            </div>
          ) : current ? (
            <AnalysisView analysis={current.analysis} imageUrl={current.imageUrl} onNew={startNew} />
          ) : (
            <>
              <h1 className="display text-4xl sm:text-5xl">
                {d.hello}
                {firstName ? "," : ""} <span className="mark">{firstName || d.welcome}</span>
              </h1>
              <p className="mt-3 max-w-2xl text-lg text-muted">
                {d.intro}
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
                    <span className="font-semibold text-bear">{d.testMode}</span>
                    <span className="text-muted">{d.testModeHint}</span>
                  </span>
                </label>
              )}

              <div className={`mt-8 ${tour ? "relative z-50" : ""}`}>
                {tour > 0 && <TourPopover step={tour as 1 | 2} onNext={() => (tour === 1 ? setTour(2) : endTour())} onSkip={endTour} />}
                <ChartUploader
                  disabled={noCredits}
                  canAutoRun={credits !== null && credits > 0}
                  disabledNotice={disabledNotice}
                  needsOffer={profile?.plan === "none" && !hasCredits}
                  trialAvailable={!profile?.trialSessionId}
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

              <RecentAnalyses items={history} onSelect={openStored} />
            </>
          )}

          {view === "analyze" && <ReviewPrompt uid={user.uid} displayName={user.displayName} analysisCount={history?.length ?? 0} />}
        </main>
      </div>

      {/* Tour backdrop: dims everything but the analysis panel. */}
      {tour > 0 && (
        <button
          type="button"
          aria-label={d.skipTour}
          onClick={endTour}
          className="fixed inset-0 z-40 cursor-default bg-background/75 backdrop-blur-[2px]"
        />
      )}

      <OfferDialog
        open={offersOpen}
        onClose={() => setOffersOpen(false)}
        plan={profile?.plan ?? null}
        trialUsed={Boolean(profile?.trialSessionId)}
        hasCapture={offersOpen && hasPendingChart()}
      />
      {redirecting && !checkoutDone && plan !== "lifetime" && (
        <div role="status" className="fixed inset-0 z-50 grid place-items-center bg-background/85 backdrop-blur-sm">
          <p className="label text-muted">{d.redirecting}</p>
        </div>
      )}
    </div>
  );
}
