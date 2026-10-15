"use client";

import { useRef, useState } from "react";

/** Looping product demo. Browsers only autoplay muted videos, so sound is opt-in. */
export function DemoVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  function toggleSound() {
    const video = ref.current;
    if (!video) return;
    video.muted = !muted;
    if (muted) {
      video.currentTime = 0;
      video.play().catch(() => {});
    }
    setMuted(!muted);
  }

  return (
    <div className="relative">
      <video
        ref={ref}
        className="block aspect-video w-full"
        poster="/media/btc-scan-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label="Démonstration : Scanzivo scanne un graphique BTC/USD hebdomadaire et produit un plan d'action"
      >
        <source src="/media/btc-scan.webm" type="video/webm" />
        <source src="/media/btc-scan.mp4" type="video/mp4" />
      </video>
      <button
        type="button"
        onClick={toggleSound}
        aria-pressed={!muted}
        className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/60 px-3.5 py-2 text-xs font-medium text-white backdrop-blur transition hover:bg-black/80"
      >
        <svg viewBox="0 0 20 20" className="size-4" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M3 8v4h3l4 3V5L6 8H3z" />
          {muted ? <path d="M13.5 8l4 4M17.5 8l-4 4" /> : <path d="M13.5 7.5a3.5 3.5 0 0 1 0 5M15.5 5.5a6.5 6.5 0 0 1 0 9" />}
        </svg>
        {muted ? "Activer le son" : "Couper le son"}
      </button>
    </div>
  );
}
