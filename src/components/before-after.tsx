"use client";

import { useState } from "react";
import { DEMO_ANALYSIS } from "@/lib/demo";
import { DemoChart } from "./demo-chart";
import { PriceNote } from "./price-note";
import { ScanCta } from "./scan-cta";

const POINTS = [
  "Les supports et résistances tracés à leur vraie hauteur, avec leur prix.",
  "La figure repérée et nommée : ici, une cassure puis un retest de 63 200.",
  "Un verdict chiffré : 62 % haussier, acheter sur clôture 4H au-dessus de 65 400.",
];

/** One chart, two states: drag the handle to compare the raw capture with what Scanzivo draws on it. */
export function BeforeAfter() {
  const [split, setSplit] = useState(50);
  const { bullish } = DEMO_ANALYSIS;

  return (
    <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
      <div>
        <h2 className="display text-4xl leading-[1.02] tracking-[-0.03em] sm:text-5xl">
          Avant / après : <span className="mark">ce que Scanzivo trace.</span>
        </h2>
        <ul className="mt-8 space-y-4">
          {POINTS.map((point) => (
            <li key={point} className="flex gap-3 text-lg leading-relaxed text-muted">
              <svg viewBox="0 0 20 20" className="mt-1.5 size-4 shrink-0 text-accent" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M4 10.5l4 4 8-9" />
              </svg>
              {point}
            </li>
          ))}
        </ul>
        <ScanCta className="btn-primary mt-9 rounded-full px-7 py-3.5 text-base">Analyser mon graphique</ScanCta>
        <PriceNote className="mt-3 text-muted" />
      </div>

      <figure>
        <div className="relative overflow-hidden rounded-3xl border border-border bg-background p-3 shadow-[0_30px_70px_-30px_rgb(0_0_0/0.9)] sm:p-4">
          {/* Raw capture underneath, annotated reading on top, revealed from the left up to the handle. */}
          <div className="relative select-none">
            <DemoChart />
            <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }}>
              <div className="bg-background">
                <DemoChart annotated labels />
              </div>
            </div>
            <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-brand" style={{ left: `${split}%` }} aria-hidden>
              <span className="absolute left-1/2 top-1/2 grid size-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-brand bg-background text-brand shadow-lg">
                <svg viewBox="0 0 20 20" className="size-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 5l-4 5 4 5M13 5l4 5-4 5" />
                </svg>
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={split}
              onChange={(event) => setSplit(Number(event.target.value))}
              aria-label="Comparer le graphique brut et le graphique annoté"
              className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
            />
          </div>
          <span className="pointer-events-none absolute left-5 top-5 rounded-full border border-accent/50 bg-background/90 px-3 py-1 text-xs font-semibold text-accent sm:left-6 sm:top-6">
            Après · {bullish.probability} % haussier
          </span>
          <span className="pointer-events-none absolute right-5 top-5 rounded-full border border-border bg-background/90 px-3 py-1 text-xs font-semibold text-muted sm:right-6 sm:top-6">
            Avant
          </span>
        </div>
        <figcaption className="mt-3 text-center text-sm text-muted">Faites glisser pour comparer · exemple illustratif BTC/USDT 4H</figcaption>
      </figure>
    </div>
  );
}
