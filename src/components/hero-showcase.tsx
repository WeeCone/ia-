"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { DEMO_ANALYSIS } from "@/lib/demo";
import { prepareImage } from "@/lib/image";
import { savePendingChart } from "@/lib/pending-chart";
import { useAuth } from "./auth-provider";
import { DemoChart } from "./demo-chart";

function UploadIcon() {
  return (
    <svg viewBox="0 0 48 48" className="size-12" aria-hidden>
      <defs>
        <linearGradient id="upload-grad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#00D2FF" />
          <stop offset="1" stopColor="#00F5A0" />
        </linearGradient>
      </defs>
      <g fill="none" stroke="url(#upload-grad)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 30V8M15 17l9-9 9 9" />
        <path d="M8 28v8a4 4 0 0 0 4 4h24a4 4 0 0 0 4-4v-8" />
      </g>
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

  useEffect(() => {
    const onPaste = (event: ClipboardEvent) => {
      const pasted = event.clipboardData?.files[0];
      if (pasted?.type.startsWith("image/")) take(pasted);
    };
    window.addEventListener("paste", onPaste);
    return () => window.removeEventListener("paste", onPaste);
  });

  const { bullish, confidence, patterns } = DEMO_ANALYSIS;

  return (
    <div className="panel glow relative p-4 sm:p-6">
      <p className="label mb-4 text-center text-muted sm:mb-6">Essayez avec votre propre graphique</p>
      <div className="grid items-center gap-4 lg:grid-cols-[1fr_1.05fr_1fr] lg:gap-6">
        {/* Before */}
        <figure className="order-2 lg:order-1">
          <div className="overflow-hidden rounded-xl border border-border bg-background/80 p-2">
            <DemoChart />
          </div>
          <figcaption className="label mt-3 text-center text-muted">Avant</figcaption>
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
              dragging ? "border-accent bg-accent/10" : "border-brand/40 bg-background/60 hover:border-brand"
            }`}
          >
            {/* Laser sweeping down the zone. */}
            <div className="pointer-events-none absolute inset-x-0 h-0.5 animate-[scan-y_3.2s_ease-in-out_infinite] bg-brand shadow-[0_0_18px_4px_rgb(0_210_255/0.55)]" aria-hidden />
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={busy}
              className="flex min-h-64 w-full flex-col items-center justify-center gap-4 p-6 text-center"
            >
              <UploadIcon />
              <span className="font-display text-lg font-semibold">{busy ? "Préparation…" : "Glissez votre graphique ici"}</span>
              <span className="text-sm text-muted">
                PNG, JPG ou WEBP · ou <kbd className="rounded-md border border-border bg-card px-1.5 py-0.5 font-mono text-xs text-foreground">Ctrl+V</kbd>
              </span>
              <span className="btn-secondary px-4 py-2 text-xs">Choisir une image</span>
            </button>
          </div>
          {error && <p role="alert" className="mt-3 text-center text-sm text-bear">{error}</p>}
          <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(event) => take(event.target.files?.[0])} />
        </div>

        {/* After */}
        <figure className="order-3">
          <div className="overflow-hidden rounded-xl border border-accent/40 bg-background/80 shadow-[0_0_32px_-8px_rgb(0_245_160/0.35)]">
            <div className="flex flex-wrap gap-1.5 px-3 pt-3">
              <span className="chip border-bull/40 bg-bull/10 text-bull">Haussier {bullish.probability} %</span>
              <span className="chip border-brand/40 bg-brand/10 text-brand">Confiance {confidence.level}</span>
            </div>
            <div className="p-2">
              <DemoChart annotated />
            </div>
            <p className="border-t border-border px-3 py-2 text-xs leading-snug text-muted">
              <span className="font-mono text-brand">Synthèse ·</span> {patterns[0]}
            </p>
          </div>
          <figcaption className="label mt-3 text-center text-accent">Après</figcaption>
        </figure>
      </div>
    </div>
  );
}
