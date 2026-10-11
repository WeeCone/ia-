"use client";

import { useEffect, useRef, useState } from "react";
import type { ChartAnalysis } from "@/lib/analysis";
import { auth } from "@/lib/firebase";
import { prepareImage } from "@/lib/image";
import { FormError } from "./auth-card";

export type AnalysisOutcome = { analysis: ChartAnalysis; imageUrl: string };

type Props = { disabled: boolean; disabledLabel?: string; onAnalyzed: (outcome: AnalysisOutcome) => void };

// Shown while the request runs, to make a ~30-60 s wait legible. Purely cosmetic: the model works in one pass.
const STEPS = [
  "Lecture de l'axe des prix",
  "Repérage de la structure de marché",
  "Détection des supports et résistances",
  "Recherche de figures chartistes",
  "Construction des scénarios",
];
const STEP_SECONDS = 6;

export function ChartUploader({ disabled, disabledLabel = "Plus de crédits", onAnalyzed }: Props) {
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
  const handedOff = useRef(false);

  async function pick(candidate: File | undefined | null) {
    if (!candidate || pending) return;
    setError(null);
    setPreparing(true);
    try {
      const ready = await prepareImage(candidate);
      setFile(ready);
      setPreview(URL.createObjectURL(ready));
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
    if (!file || !preview || !user) return;
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
  }

  const step = STEPS[Math.min(STEPS.length - 1, Math.floor(elapsed / STEP_SECONDS))];

  return (
    <div className="panel">
      <div className="flex items-center justify-between gap-3 border-b-2 border-border px-5 py-3">
        <span className="label">{pending ? "Analyse en cours" : "Nouvelle analyse"}</span>
        {pending && <span className="label tabular-nums text-brand">{elapsed} s</span>}
      </div>

      <div className="grid gap-6 p-5 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        {/* Drop zone / preview */}
        <div
          onDragOver={(event) => {
            event.preventDefault();
            if (!pending) setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(event) => {
            event.preventDefault();
            setDragging(false);
            pick(event.dataTransfer.files[0]);
          }}
          className={`relative grid min-h-64 place-items-center overflow-hidden border-2 border-dashed transition-colors ${
            dragging ? "border-brand bg-brand/15" : preview ? "border-border bg-background" : "border-border bg-background hover:border-brand"
          }`}
        >
          {preview ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element -- local object URL preview */}
              <img src={preview} alt="Aperçu du graphique" className={`max-h-80 object-contain transition-opacity ${pending ? "opacity-60" : ""}`} />
              {pending && (
                <div className="pointer-events-none absolute inset-0" aria-hidden>
                  <div className="absolute inset-y-0 w-24 animate-[scan_2.4s_ease-in-out_infinite_alternate] bg-gradient-to-r from-transparent to-brand/40">
                    <div className="absolute inset-y-0 right-0 w-0.5 bg-brand" />
                  </div>
                </div>
              )}
              {!pending && (
                <button type="button" onClick={clear} className="label absolute right-2 top-2 border-2 border-border bg-card px-2 py-1 hover:border-bear hover:text-bear">
                  Changer
                </button>
              )}
            </>
          ) : (
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={preparing}
              className="flex h-full w-full flex-col items-center justify-center gap-3 p-6 text-center"
            >
              <span className="display text-3xl sm:text-4xl">{preparing ? "Préparation…" : "Déposez votre capture"}</span>
              <span className="label hidden text-muted sm:inline">Clic · glisser-déposer · Ctrl+V</span>
              <span className="label text-muted sm:hidden">Touchez pour choisir une image</span>
            </button>
          )}
        </div>

        {/* Context + action */}
        <div className="flex flex-col gap-5">
          {pending ? (
            <div aria-live="polite">
              <ol className="space-y-3">
                {STEPS.map((label) => {
                  const index = STEPS.indexOf(label);
                  const current = STEPS.indexOf(step);
                  const status = index < current ? "done" : index === current ? "active" : "todo";
                  return (
                    <li key={label} className={`flex items-center gap-3 text-sm ${status === "todo" ? "text-muted" : ""}`}>
                      <span
                        className={`grid size-5 shrink-0 place-items-center border-2 text-[10px] font-bold ${
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
          ) : (
            <>
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
              <button
                type="button"
                onClick={() => cameraRef.current?.click()}
                className="btn-secondary sm:hidden"
              >
                Prendre une photo
              </button>
              <FormError message={error} />
              <button type="button" onClick={submit} disabled={!file || preparing || disabled} className="btn-primary mt-auto w-full">
                {disabled ? disabledLabel : error && file ? "Réessayer" : "Analyser (1 crédit)"}
              </button>
            </>
          )}
        </div>
      </div>

      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(event) => pick(event.target.files?.[0])} />
      <input
        ref={cameraRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={(event) => pick(event.target.files?.[0])}
      />
    </div>
  );
}
