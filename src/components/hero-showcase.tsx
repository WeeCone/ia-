"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { DEMO_ANALYSIS } from "@/lib/demo";
import { prepareImage } from "@/lib/image";
import { savePendingChart } from "@/lib/pending-chart";
import { useAuth } from "./auth-provider";
import { DemoChart } from "./demo-chart";
import { TiltCard } from "./tilt-card";

function UploadIcon() {
  return (
    <svg viewBox="0 0 48 48" className="size-14" aria-hidden>
      <defs>
        <linearGradient id="upload-grad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#00D2FF" />
          <stop offset="1" stopColor="#00F5A0" />
        </linearGradient>
      </defs>
      <rect x="6" y="24" width="36" height="18" rx="5" fill="url(#upload-grad)" fillOpacity="0.18" stroke="url(#upload-grad)" strokeWidth="2.5" />
      <g fill="none" stroke="url(#upload-grad)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 32V6M15 15l9-9 9 9" />
      </g>
    </svg>
  );
}

/** Light rays fanning out of the "after" card. */
function Rays() {
  const angles = [-34, -22, -12, -4, 4, 13, 24, 36];
  return (
    <svg
      viewBox="0 0 420 420"
      style={{ "--d": "2s" } as React.CSSProperties}
      className="rise-in pointer-events-none absolute -right-[300px] top-1/3 hidden h-[420px] w-[420px] -translate-y-1/2 xl:block"
      aria-hidden
    >
      <defs>
        <linearGradient id="ray" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#00F5A0" stopOpacity="0.9" />
          <stop offset="0.5" stopColor="#00D2FF" stopOpacity="0.35" />
          <stop offset="1" stopColor="#00D2FF" stopOpacity="0" />
        </linearGradient>
        <filter id="ray-blur">
          <feGaussianBlur stdDeviation="1.6" />
        </filter>
      </defs>
      {angles.map((angle, index) => (
        <rect
          key={angle}
          x="0"
          y={209}
          width={index % 2 ? 300 : 400}
          height={index % 3 ? 1.5 : 2.5}
          fill="url(#ray)"
          filter="url(#ray-blur)"
          transform={`rotate(${angle} 0 210)`}
        />
      ))}
      <circle cx="0" cy="210" r="60" fill="#00F5A0" fillOpacity="0.12" filter="url(#ray-blur)" />
    </svg>
  );
}

/** Landing-page centrepiece: raw chart → drop zone → annotated result. A dropped chart is carried to the dashboard. */
export function HeroShowcase() {
  const router = useRouter();
  const { user } = useAuth();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function take(file: File | undefined | null) {
    if (!file || busy) return;
    setError(null);
    setBusy(true);
    try {
      await savePendingChart(await prepareImage(file));
      router.push(user ? "/dashboard" : "/auth/signup");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Impossible de lire cette image.");
      setBusy(false);
    }
  }

  // One paste listener for the page's lifetime, always calling the latest `take`.
  const takeRef = useRef(take);
  useEffect(() => {
    takeRef.current = take;
  });
  useEffect(() => {
    const onPaste = (event: ClipboardEvent) => {
      const pasted = event.clipboardData?.files[0];
      if (pasted?.type.startsWith("image/")) takeRef.current(pasted);
    };
    window.addEventListener("paste", onPaste);
    return () => window.removeEventListener("paste", onPaste);
  }, []);

  const { bullish, confidence } = DEMO_ANALYSIS;

  return (
    <div className="relative mx-auto max-w-5xl">
      {/* Glowing frame; the before/after cards overhang it on large screens. */}
      <div className="relative rounded-3xl bg-linear-to-br from-brand/60 via-brand/20 to-accent/70 p-px shadow-[0_0_60px_-10px_rgb(0_210_255/0.45),0_0_120px_-30px_rgb(0_245_160/0.4)]">
        <div className="rounded-3xl bg-[linear-gradient(180deg,rgb(22_27_34/0.92),rgb(11_14_20/0.92))] px-4 pb-6 pt-5 backdrop-blur-md sm:px-6 lg:px-8">
          <p className="text-center font-display text-xl font-semibold text-foreground/80 sm:text-2xl">Bienvenue sur Scanzivo</p>

          <div className="mt-5 grid items-center gap-5 xl:-mx-24 lg:grid-cols-[1fr_1.15fr_1fr] lg:gap-8">
            {/* Before */}
            <figure className="order-2 lg:order-1">
              <TiltCard className="rounded-xl">
                <div className="overflow-hidden rounded-xl border border-border bg-background p-2 shadow-[0_20px_50px_-20px_rgb(0_0_0/0.9)]">
                  <DemoChart />
                </div>
              </TiltCard>
              <figcaption className="mt-3 text-center font-display text-muted">Avant</figcaption>
            </figure>

            {/* Drop zone */}
            <div className="order-1 lg:order-2">
              <div
                onDragOver={(event) => {
                  event.preventDefault();
                  setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={(event) => {
                  event.preventDefault();
                  setDragging(false);
                  take(event.dataTransfer.files[0]);
                }}
                className={`relative overflow-hidden rounded-2xl border-2 border-dashed transition-colors ${
                  dragging ? "border-accent bg-accent/10" : "border-muted/40 bg-background/40 hover:border-brand"
                }`}
              >
                <div
                  className="pointer-events-none absolute inset-x-0 h-0.5 animate-[scan-y_3.2s_ease-in-out_infinite] bg-brand shadow-[0_0_18px_4px_rgb(0_210_255/0.55)]"
                  aria-hidden
                />
                <button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  disabled={busy}
                  className="flex min-h-56 w-full flex-col items-center justify-center gap-4 p-6 text-center"
                >
                  <UploadIcon />
                  <span className="text-[15px] leading-relaxed text-foreground/90">
                    {busy ? (
                      "Préparation…"
                    ) : (
                      <>
                        <span className="pointer-coarse:hidden">
                          Glissez votre capture de graphique
                          <br />
                          (PNG/JPG) ou{" "}
                          <kbd className="rounded-md border border-border bg-card px-1.5 py-0.5 font-mono text-xs text-foreground">Ctrl+V</kbd> pour
                          l&apos;analyser
                        </span>
                        <span className="hidden pointer-coarse:inline">
                          Touchez pour choisir une capture
                          <br />
                          de graphique dans votre galerie
                        </span>
                      </>
                    )}
                  </span>
                </button>
              </div>
              <p className="mt-3 text-center text-sm text-muted">
                Ou{" "}
                <button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  className="underline decoration-muted/50 underline-offset-4 hover:text-brand"
                >
                  choisissez une image
                </button>
              </p>
              {error && (
                <p role="alert" className="mt-2 text-center text-sm text-bear">
                  {error}
                </p>
              )}
              <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(event) => take(event.target.files?.[0])} />
            </div>

            {/* After */}
            <figure className="relative order-3">
              <Rays />
              <TiltCard className="rounded-xl">
                <div className="relative overflow-hidden rounded-xl border border-accent/60 bg-background p-2 shadow-[0_0_40px_-6px_rgb(0_245_160/0.55)]">
                  <span
                    className="pop-in absolute right-2 top-2 z-10 rounded-full border border-accent/50 bg-background/90 px-2.5 py-0.5 text-xs font-medium text-accent"
                    style={{ "--d": "2.4s" } as React.CSSProperties}
                  >
                    Score IA : {bullish.probability} % haussier<span className="hidden xl:inline"> · confiance {confidence.level}</span>
                  </span>
                  <div className="pt-6">
                    <DemoChart annotated labels animate />
                  </div>
                  <span
                    className="pop-in absolute bottom-2 left-2 rounded-full border border-accent/50 bg-background/90 px-2.5 py-0.5 text-xs font-medium text-accent"
                    style={{ "--d": "2.2s" } as React.CSSProperties}
                  >
                    Cassure + retest
                  </span>
                </div>
              </TiltCard>
              {/* Summary bubble overhanging the card. */}
              <div
                className="rise-in relative z-10 mt-3 rounded-lg border border-border bg-card/95 p-3 shadow-xl backdrop-blur xl:absolute xl:-bottom-20 xl:-right-24 xl:mt-0 xl:w-60"
                style={{ "--d": "2.7s" } as React.CSSProperties}
              >
                <p className="text-xs font-semibold text-foreground">Synthèse de l&apos;analyse</p>
                <p className="mt-1 text-xs leading-snug text-muted">
                  Cassure puis retest de 63 200 : une clôture 4H au-dessus de 65 400 viserait 67 000. Invalidé sous 63 200.
                </p>
              </div>
              <figcaption className="mt-3 text-center font-display text-accent">Après</figcaption>
            </figure>
          </div>
        </div>
      </div>
    </div>
  );
}
