"use client";

import { useEffect, useRef, useState } from "react";
import { ALLOWED_IMAGE_TYPES, MAX_IMAGE_BYTES, type AllowedImageType, type ChartAnalysis } from "@/lib/analysis";
import { auth } from "@/lib/firebase";
import { FormError } from "./auth-card";

type Props = { disabled: boolean; onAnalyzed: (analysis: ChartAnalysis) => void };

export function ChartUploader({ disabled, onAnalyzed }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [dragging, setDragging] = useState(false);

  function pick(candidate: File | undefined | null) {
    if (!candidate) return;
    if (!ALLOWED_IMAGE_TYPES.includes(candidate.type as AllowedImageType)) {
      setError("Format non supporté (PNG, JPEG, WebP ou GIF).");
      return;
    }
    if (candidate.size > MAX_IMAGE_BYTES) {
      setError("Image trop lourde (5 Mo maximum).");
      return;
    }
    setError(null);
    setFile(candidate);
    setPreview(URL.createObjectURL(candidate));
  }

  // Release the previous object URL whenever the preview changes or the component unmounts.
  useEffect(() => () => {
    if (preview) URL.revokeObjectURL(preview);
  }, [preview]);

  // Ctrl/Cmd+V a screenshot straight from the clipboard.
  useEffect(() => {
    const onPaste = (event: ClipboardEvent) => pick(event.clipboardData?.files[0]);
    window.addEventListener("paste", onPaste);
    return () => window.removeEventListener("paste", onPaste);
  }, []);

  async function submit() {
    const user = auth.currentUser;
    if (!file || !user) return;
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
      if (!response.ok) throw new Error(data.error ?? "L'analyse a échoué.");
      onAnalyzed(data.analysis);
    } catch (err) {
      setError(err instanceof Error ? err.message : "L'analyse a échoué.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="space-y-4 rounded-2xl border border-border bg-surface p-6">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
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
        className={`grid min-h-56 w-full place-items-center overflow-hidden rounded-xl border-2 border-dashed p-4 text-center transition ${
          dragging ? "border-brand bg-brand/5" : "border-border hover:border-muted"
        }`}
      >
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element -- local object URL preview
          <img src={preview} alt="Aperçu du graphique" className="max-h-80 rounded-lg object-contain" />
        ) : (
          <span>
            <span className="block font-medium">Déposez une capture de graphique</span>
            <span className="mt-1 block text-sm text-muted">ou cliquez pour choisir · collez avec Ctrl+V · 5 Mo max</span>
          </span>
        )}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept={ALLOWED_IMAGE_TYPES.join(",")}
        className="hidden"
        onChange={(event) => pick(event.target.files?.[0])}
      />
      <label className="field">
        <span>Contexte (optionnel)</span>
        <input
          value={note}
          onChange={(event) => setNote(event.target.value)}
          maxLength={500}
          placeholder="Ex. : BTC/USDT 4H, je cherche un point d'entrée long"
        />
      </label>
      <FormError message={error} />
      <button type="button" onClick={submit} disabled={!file || pending || disabled} className="btn-primary w-full">
        {pending ? "Analyse en cours… (jusqu'à 1 min)" : disabled ? "Plus de crédits" : "Analyser le graphique (1 crédit)"}
      </button>
    </div>
  );
}
