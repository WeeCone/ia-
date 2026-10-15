"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { DEMO_ANALYSIS } from "@/lib/demo";
import { prepareImage } from "@/lib/image";
import { savePendingChart } from "@/lib/pending-chart";
import { formatRatio, rewardRatios } from "@/lib/risk";
import { verdictFor } from "@/lib/verdicts";
import { useAuth } from "./auth-provider";
import { DemoChart } from "./demo-chart";
import { PriceNote } from "./price-note";
import { VerdictSymbol } from "./verdict-symbol";

/** Keeps "65 400" on one line. */
const nb = (text: string) => text.replace(/(\d) (\d)/g, "$1\u00a0$2");

const { bullish, bearish, confidence, verdict, asset, timeframe } = DEMO_ANALYSIS;
const VERDICT = verdictFor(verdict.action);
const RATIOS = rewardRatios(bullish, "long");

/** The example game: the demo chart as a diagram, the line of analysis as numbered moves, and the evaluation. */
function Diagram() {
  return (
    <figure className="paper relative border border-border p-4 shadow-[0_2px_0_rgb(20_22_19/0.08),0_40px_60px_-40px_rgb(0_0_0/0.75)] sm:p-6">
      <figcaption className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-foreground pb-2">
        <span className="font-[family-name:var(--font-bodoni)] text-lg italic">Diagramme 1</span>
        <span className="font-mono text-sm font-semibold">
          {asset} · {timeframe}
        </span>
        <span className="text-xs text-muted">Exemple illustratif</span>
      </figcaption>

      <div className="mt-4 grid grid-cols-[1fr_auto] gap-3 sm:gap-4">
        <div className="border border-foreground/80 bg-card p-1.5">
          <div className="sm:hidden">
            <DemoChart annotated compact />
          </div>
          <div className="hidden sm:block">
            <DemoChart annotated labels />
          </div>
        </div>
        {/* Evaluation bar: settles from 50/50 on the verdict split. */}
        <div className="flex w-9 flex-col items-center gap-1.5 sm:w-11" role="img" aria-label={`Évaluation : ${bullish.probability} % haussier, ${bearish.probability} % baissier`}>
          <span className="font-mono text-xs font-semibold text-bear">{bearish.probability}</span>
          <div className="relative w-3 flex-1 border border-foreground bg-bear">
            <div
              className="absolute inset-x-0 bottom-0 bg-bull motion-safe:animate-[settle_1.4s_cubic-bezier(0.16,1,0.3,1)_0.5s_backwards]"
              style={{ height: `${bullish.probability}%` }}
            />
            <div className="absolute inset-x-[-5px] top-1/2 h-px bg-foreground" />
          </div>
          <span className="font-mono text-xs font-semibold text-bull">{bullish.probability}</span>
        </div>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-[1.1fr_1fr]">
        <ol className="space-y-1.5 font-mono text-[13px] leading-snug">
          <li>
            <span className="text-muted">1.</span> {nb(bullish.entry)} <b className="text-bull">!</b>
          </li>
          <li>
            <span className="text-muted">2.</span> Stop {nb(bullish.stop_loss)}
          </li>
          <li>
            <span className="text-muted">3.</span> Objectifs {nb(bullish.targets.join(", puis "))}
          </li>
          <li className="text-muted">
            Variante : {nb(bearish.entry.charAt(0).toLowerCase() + bearish.entry.slice(1))} <b className="text-bear">?!</b>{"\u00a0"}({bearish.probability}{"\u00a0"}%)
          </li>
          {RATIOS && (
            <li className="text-muted">
              Gain / risque {RATIOS.map(formatRatio).join(" · ")}
            </li>
          )}
        </ol>
        <div className="border-t border-foreground pt-3 sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0">
          <div className="flex items-center gap-3">
            <VerdictSymbol
              mark={VERDICT.mark}
              className="size-12 shrink-0 text-bull motion-safe:animate-[set-in_0.5s_ease-out_1.9s_backwards]"
              title={VERDICT.glyph}
            />
            <div>
              <p className="font-[family-name:var(--font-bodoni)] text-xl font-bold leading-tight">{VERDICT.title}</p>
              <p className="text-xs text-muted">
                {bullish.probability} % · confiance {confidence.level}
              </p>
            </div>
          </div>
          <p className="mt-2.5 text-sm leading-snug">
            <span className="font-semibold">Change d&apos;avis :</span> {nb(verdict.change_mind)}
          </p>
        </div>
      </div>
      <p className="mt-4 border-t border-border pt-2 text-[12px] text-muted">Analyse fictive à titre d&apos;exemple. Ce n&apos;est pas un conseil en investissement.</p>
    </figure>
  );
}

/** Landing-page opening: promise, a working drop zone with the price beside it, and the example game. A dropped chart is carried to the dashboard. */
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
      setError(err instanceof Error ? `${err.message} Essayez une capture PNG ou JPG avec l'axe des prix visible.` : "Impossible de lire cette image.");
      setBusy(false);
    }
  }

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

  return (
    <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-5">
        <h1 className="display text-[clamp(2.6rem,4.6vw,4.25rem)]">
          <span className="whitespace-nowrap">Un graphique.</span>
          <br />
          <em className="whitespace-nowrap font-normal">Un verdict.</em>
        </h1>
        {/* Phones: the verdict reaches the first screen before the diagram does. */}
        <p className="mt-4 flex items-center gap-2.5 text-sm lg:hidden">
          <VerdictSymbol mark={VERDICT.mark} className="size-7 shrink-0" title={VERDICT.glyph} />
          <span>
            Exemple de verdict : <b>{VERDICT.title}</b>, {bullish.probability} %
          </span>
        </p>
        <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">
          Déposez une capture : Scanzivo trace les niveaux, lit la structure et tranche. Acheter, vendre, attendre ou s&apos;abstenir, avec un plan chiffré, en moins d&apos;une minute.
        </p>

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
          className={`relative mt-7 border border-dashed transition-colors ${dragging ? "border-foreground bg-white/10" : "border-foreground/55 hover:border-foreground hover:bg-white/5"}`}
        >
          {/* Diagram corner ticks. */}
          {["left-0 top-0 border-l-2 border-t-2", "right-0 top-0 border-r-2 border-t-2", "bottom-0 left-0 border-b-2 border-l-2", "bottom-0 right-0 border-b-2 border-r-2"].map((corner) => (
            <span key={corner} className={`pointer-events-none absolute size-3 border-foreground ${corner}`} aria-hidden />
          ))}
          <button type="button" onClick={() => inputRef.current?.click()} disabled={busy} className="flex w-full items-center gap-4 px-5 py-5 text-left">
            <svg viewBox="0 0 32 32" className="size-9 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="square" aria-hidden>
              <path d="M5 21v6h22v-6M16 4v16M10 10l6-6 6 6" />
            </svg>
            <span>
              <span className="block font-semibold">
                {busy ? "Préparation de votre capture…" : <span className="pointer-coarse:hidden">Glissez votre capture ici</span>}
                {!busy && <span className="hidden pointer-coarse:inline">Choisir une capture dans la galerie</span>}
              </span>
              <span className="block text-sm text-muted">
                <span className="pointer-coarse:hidden">
                  ou collez-la avec <kbd className="border border-foreground/40 px-1 font-mono text-xs">Ctrl</kbd>+<kbd className="border border-foreground/40 px-1 font-mono text-xs">V</kbd> · PNG, JPG, 5 Mo max
                </span>
                <span className="hidden pointer-coarse:inline">PNG ou JPG, 5 Mo max, graphique en bougies</span>
              </span>
            </span>
          </button>
          <input ref={inputRef} type="file" accept="image/png,image/jpeg,image/webp,image/gif" className="hidden" onChange={(event) => take(event.target.files?.[0])} />
        </div>
        {error && (
          <p role="alert" className="mt-2 text-sm font-semibold text-bear">
            {error}
          </p>
        )}

        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
          <button type="button" onClick={() => inputRef.current?.click()} disabled={busy} className="btn-primary px-6 py-3.5 text-base">
            Analyser mon graphique
          </button>
          <Link href="/#tarifs" className="font-semibold underline decoration-foreground/50 underline-offset-4 hover:decoration-foreground">
            Voir les offres
          </Link>
        </div>
        <PriceNote className="mt-3 text-muted" />
      </div>

      <div className="lg:col-span-7">
        <Diagram />
      </div>
    </div>
  );
}
