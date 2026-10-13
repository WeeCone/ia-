"use client";

import { useEffect, useRef, useState } from "react";
import type { ChartAnalysis } from "@/lib/analysis";
import { auth } from "@/lib/firebase";
import { checkCapture } from "@/lib/capture-check";
import { prepareImage } from "@/lib/image";
import { takePendingChart } from "@/lib/pending-chart";
import { FormError } from "./auth-card";
import { LogoMark } from "./logo";

export type AnalysisOutcome = { analysis: ChartAnalysis; imageUrl: string };

type Props = {
  disabled: boolean;
  /** Shown under the composer when analysing is not possible (no offer, no credits left). */
  disabledNotice?: React.ReactNode;
  /** Onboarding tour: which part of the composer to spotlight. */
  highlight?: "zone" | "send" | null;
  onAnalyzed: (outcome: AnalysisOutcome) => void;
};

// Shown while the request runs, to make a ~30-60 s wait legible. Purely cosmetic: the model works in one pass.
const STEPS = [
  "Lecture de l'axe des prix",
  "Repérage de la structure de marché",
  "Détection des supports et résistances",
  "Recherche de figures chartistes",
  "Construction des scénarios",
];
const STEP_SECONDS = 6;
const TRADINGVIEW_URL = "https://www.tradingview.com/chart/";

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-4" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 10h12M11 5l5 5-5 5" />
    </svg>
  );
}

/** The analysis panel: drop or pick a screenshot, add context, analyse. Shows progress while the analysis runs. */
export function ChartUploader({ disabled, disabledNotice, highlight = null, onAnalyzed }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [preparing, setPreparing] = useState(false);
  const [pending, setPending] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [dragging, setDragging] = useState(false);
  // Instant capture advice: null until checked, [] when nothing to flag.
  const [advice, setAdvice] = useState<string[] | null>(null);
  const handedOff = useRef(false);

  async function pick(candidate: File | undefined | null) {
    if (!candidate || pending) return;
    setError(null);
    setPreparing(true);
    try {
      const ready = await prepareImage(candidate);
      setFile(ready);
      setPreview(URL.createObjectURL(ready));
      setAdvice(null);
      checkCapture(ready).then(setAdvice);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Impossible de lire cette image.");
    } finally {
      setPreparing(false);
    }
  }

  // Release the previous object URL, unless it was handed to the result view.
  useEffect(
    () => () => {
      if (preview && !handedOff.current) URL.revokeObjectURL(preview);
    },
    [preview],
  );

  // A chart dropped on the landing page before signing in.
  useEffect(() => {
    takePendingChart().then((pending) => pending && pick(pending));
    // eslint-disable-next-line react-hooks/exhaustive-deps -- once, on mount
  }, []);

  // Ctrl/Cmd+V a screenshot straight from the clipboard.
  useEffect(() => {
    const onPaste = (event: ClipboardEvent) => {
      const pasted = event.clipboardData?.files[0];
      if (pasted?.type.startsWith("image/")) pick(pasted);
    };
    window.addEventListener("paste", onPaste);
    return () => window.removeEventListener("paste", onPaste);
  });

  // Elapsed-time counter while analysing.
  useEffect(() => {
    if (!pending) return;
    const started = Date.now();
    const timer = setInterval(() => setElapsed(Math.floor((Date.now() - started) / 1000)), 500);
    return () => {
      clearInterval(timer);
      setElapsed(0);
    };
  }, [pending]);

  async function submit() {
    const user = auth.currentUser;
    if (!file || !preview || !user || disabled) return;
    setPending(true);
    setError(null);
    try {
      const body = new FormData();
      body.set("image", file);
      body.set("note", note);
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { Authorization: `Bearer ${await user.getIdToken()}` },
        body,
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error ?? "L'analyse a échoué. Aucun crédit n'a été débité.");
      handedOff.current = true;
      onAnalyzed({ analysis: data.analysis, imageUrl: preview });
    } catch (err) {
      setError(err instanceof Error ? err.message : "L'analyse a échoué. Aucun crédit n'a été débité.");
      setPending(false);
    }
  }

  function clear() {
    setFile(null);
    setPreview(null);
    setError(null);
    setAdvice(null);
  }

  if (pending && preview) {
    const current = Math.min(STEPS.length - 1, Math.floor(elapsed / STEP_SECONDS));
    return (
      <div className="panel overflow-hidden">
        <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-3">
          <span className="label text-muted">Analyse en cours</span>
          <span className="label tabular-nums text-brand">{elapsed} s</span>
        </div>
        <div className="grid gap-6 p-5 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          <div className="relative grid min-h-56 place-items-center overflow-hidden rounded-xl border border-border bg-background/60">
            {/* eslint-disable-next-line @next/next/no-img-element -- local object URL preview */}
            <img src={preview} alt="Graphique en cours d'analyse" className="max-h-80 object-contain opacity-60" />
            <div className="pointer-events-none absolute inset-0" aria-hidden>
              <div className="absolute inset-y-0 w-24 animate-[scan_2.4s_ease-in-out_infinite_alternate] bg-gradient-to-r from-transparent to-brand/40">
                <div className="absolute inset-y-0 right-0 w-0.5 bg-brand shadow-[0_0_14px_2px_rgb(0_210_255/0.6)]" />
              </div>
            </div>
          </div>
          <div aria-live="polite">
            <ol className="space-y-3">
              {STEPS.map((label, index) => {
                const status = index < current ? "done" : index === current ? "active" : "todo";
                return (
                  <li key={label} className={`flex items-center gap-3 text-sm ${status === "todo" ? "text-muted" : ""}`}>
                    <span
                      className={`grid size-5 shrink-0 place-items-center rounded-full border text-[10px] font-bold ${
                        status === "done"
                          ? "border-bull bg-bull text-background"
                          : status === "active"
                            ? "animate-pulse border-brand bg-brand/20"
                            : "border-border"
                      }`}
                    >
                      {status === "done" ? "✓" : ""}
                    </span>
                    {label}
                  </li>
                );
              })}
            </ol>
            <p className="mt-5 text-xs text-muted">Une analyse prend généralement moins d&apos;une minute. Gardez cette page ouverte.</p>
          </div>
        </div>
      </div>
    );
  }

  const canSend = Boolean(file) && !preparing && !disabled;
  const addContext = (tag: string) => setNote((current) => (current.includes(tag) ? current : current ? `${current}, ${tag}` : tag));

  return (
    <div>
      <div className="panel overflow-hidden">
        <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-3">
          <span className="label text-muted">Nouvelle analyse</span>
          <span className="font-mono text-[11px] text-muted">1 analyse = 1 crédit</span>
        </div>

        <div className="grid gap-5 p-5 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          {/* Drop zone / preview */}
          <div
            onDragOver={(event) => {
              event.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(event) => {
              event.preventDefault();
              setDragging(false);
              pick(event.dataTransfer.files[0]);
            }}
            className={`relative grid min-h-64 place-items-center overflow-hidden rounded-xl border-2 border-dashed transition-all ${
              dragging
                ? "border-accent bg-accent/10"
                : highlight === "zone"
                  ? "border-accent bg-accent/5 shadow-[0_0_0_4px_rgb(0_245_160/0.18),0_0_40px_-8px_rgb(0_245_160/0.5)]"
                  : preview
                    ? "border-border bg-background/60"
                    : "border-brand/40 bg-background/60 hover:border-brand"
            }`}
          >
            {preview ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element -- local object URL preview */}
                <img src={preview} alt="Aperçu du graphique" className="max-h-80 object-contain" />
                <button type="button" onClick={clear} className="label absolute right-2 top-2 rounded-lg border border-border bg-card/90 px-2 py-1 hover:border-bear hover:text-bear">
                  Changer
                </button>
              </>
            ) : (
              <>
                <div className="pointer-events-none absolute inset-x-0 h-0.5 animate-[scan-y_3.2s_ease-in-out_infinite] bg-brand/80 shadow-[0_0_14px_3px_rgb(0_210_255/0.45)]" aria-hidden />
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  disabled={preparing}
                  className="flex h-full w-full flex-col items-center justify-center gap-3 p-6 text-center"
                >
                  <LogoMark className="size-10" />
                  <span className="display text-2xl sm:text-3xl">{preparing ? "Préparation…" : "Déposez votre capture"}</span>
                  <span className="label hidden text-muted sm:inline">Clic · glisser-déposer · Ctrl+V</span>
                  <span className="label text-muted sm:hidden">Touchez pour choisir une image</span>
                </button>
              </>
            )}
          </div>

          {/* Context + action */}
          <div className="flex flex-col gap-4">
            <label className="field">
              <span>Contexte (optionnel)</span>
              <input
                id="analysis-note"
                value={note}
                onChange={(event) => setNote(event.target.value)}
                maxLength={500}
                placeholder="Ex. : scalping 5 min, je cherche un short"
              />
            </label>
            <div className="flex flex-wrap gap-1.5" aria-label="Ajouter un style de trading au contexte">
              {["Scalping", "Day trading", "Swing", "Long terme", "Je cherche un long", "Je cherche un short"].map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => addContext(tag.toLowerCase())}
                  className="rounded-full border border-border bg-background/60 px-2.5 py-1 text-xs text-muted transition-colors hover:border-brand/50 hover:text-foreground"
                >
                  + {tag}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              <a
                href={TRADINGVIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-border bg-background/60 px-3 py-1.5 text-xs font-medium text-foreground/90 transition-colors hover:border-brand/50"
              >
                Ouvrir TradingView ↗
              </a>
              <button
                type="button"
                onClick={() => cameraRef.current?.click()}
                className="rounded-lg border border-border bg-background/60 px-3 py-1.5 text-xs font-medium text-foreground/90 sm:hidden"
              >
                Prendre une photo
              </button>
            </div>
            {file && advice && advice.length > 0 && (
              <div className="rounded-xl border border-amber-400/30 bg-amber-400/5 p-3 text-xs leading-relaxed">
                <p className="font-semibold text-amber-300">À vérifier avant d&apos;analyser</p>
                <ul className="mt-1.5 list-disc space-y-1 pl-4 text-foreground/85">
                  {advice.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p className="mt-1.5 text-muted">Vous pouvez quand même lancer l&apos;analyse, ou changer de capture.</p>
              </div>
            )}
            {file && advice?.length === 0 && <p className="text-xs text-bull">✓ Capture nette et de bonne taille</p>}
            <button
              type="button"
              onClick={submit}
              disabled={!canSend}
              className={`btn-primary mt-auto w-full ${highlight === "send" ? "ring-4 ring-accent/40 ring-offset-2 ring-offset-card" : ""}`}
            >
              {error && file ? "Réessayer" : "Analyser (1 crédit)"} <ArrowIcon />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-3 space-y-2">
        <FormError message={error} />
        {disabled && disabledNotice}
      </div>

      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(event) => pick(event.target.files?.[0])} />
      <input ref={cameraRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={(event) => pick(event.target.files?.[0])} />
    </div>
  );
}
