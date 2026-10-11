"use client";

import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { FormError } from "./auth-card";

const MIN_ANALYSES = 3;
const DISMISS_KEY = "scanzivo-review-dismissed";

/** Asks engaged users (3+ analyses) for one review, stored in reviews/{uid} for manual moderation. */
export function ReviewPrompt({ uid, displayName, analysisCount }: { uid: string; displayName: string | null; analysisCount: number }) {
  const [state, setState] = useState<"loading" | "hidden" | "open" | "sent">("loading");
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (analysisCount < MIN_ANALYSES) return;
    let dismissed = false;
    try {
      dismissed = sessionStorage.getItem(DISMISS_KEY) === "1";
    } catch {}
    getDoc(doc(db, "reviews", uid))
      .then((snap) => setState(snap.exists() || dismissed ? "hidden" : "open"))
      .catch(() => setState("hidden"));
  }, [uid, analysisCount]);

  if (analysisCount < MIN_ANALYSES || state === "loading" || state === "hidden") return null;

  if (state === "sent") {
    return (
      <section className="panel mt-16 border-bull p-6">
        <p className="display text-2xl text-bull">Merci pour votre avis.</p>
        <p className="mt-2 text-sm text-muted">Il nous aide à améliorer Scanzivo.</p>
      </section>
    );
  }

  function dismiss() {
    try {
      sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {}
    setState("hidden");
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!rating) return setError("Choisissez une note de 1 à 5.");
    if (text.trim().length < 10) return setError("Écrivez au moins quelques mots.");
    setPending(true);
    setError(null);
    try {
      await setDoc(doc(db, "reviews", uid), {
        uid,
        rating,
        text: text.trim(),
        publishConsent: consent,
        displayName,
        createdAt: serverTimestamp(),
      });
      setState("sent");
    } catch {
      setError("Envoi impossible pour le moment. Réessayez plus tard.");
      setPending(false);
    }
  }

  return (
    <section className="panel mt-16 p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="display text-3xl">Votre avis compte</h2>
          <p className="mt-2 text-sm text-muted">Vous avez fait {analysisCount} analyses. Qu&apos;en pensez-vous ?</p>
        </div>
        <button type="button" onClick={dismiss} className="btn-ghost shrink-0">
          Plus tard
        </button>
      </div>
      <form onSubmit={submit} className="mt-6 space-y-5">
        <fieldset>
          <legend className="label">Note</legend>
          <div className="mt-2 flex gap-2">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setRating(value)}
                aria-label={`${value} sur 5`}
                aria-pressed={rating === value}
                className={`grid size-11 place-items-center border-2 font-display text-lg transition-colors ${
                  value <= rating ? "border-brand bg-brand text-background" : "border-border bg-background text-muted hover:border-brand"
                }`}
              >
                {value}
              </button>
            ))}
          </div>
        </fieldset>
        <label className="field">
          <span>Votre retour</span>
          <textarea
            id="review-text"
            value={text}
            onChange={(event) => setText(event.target.value)}
            maxLength={600}
            rows={4}
            placeholder="Ce qui vous aide, ce qui manque…"
            className="border-2 border-border bg-background px-3 py-3 font-sans text-base normal-case tracking-normal text-foreground outline-none placeholder:text-muted/60 focus:border-brand"
          />
        </label>
        <label className="flex items-start gap-2 text-sm text-muted">
          <input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} className="mt-0.5 size-4 accent-brand" />
          <span>J&apos;accepte que cet avis soit publié sur le site avec mon prénom et l&apos;initiale de mon nom.</span>
        </label>
        <FormError message={error} />
        <button type="submit" disabled={pending} className="btn-primary">
          {pending ? "Envoi…" : "Envoyer mon avis"}
        </button>
      </form>
    </section>
  );
}
