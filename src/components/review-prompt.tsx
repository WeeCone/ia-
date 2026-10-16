"use client";

import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { useI18n } from "@/i18n/client";
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
  const { t } = useI18n();
  const r = t.review;

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
      <section className="panel mt-16 border-bull/40 p-6">
        <p className="display text-2xl text-bull">{r.thanks}</p>
        <p className="mt-2 text-sm text-muted">{r.thanksHint}</p>
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
    if (!rating) return setError(r.needRating);
    if (text.trim().length < 10) return setError(r.needText);
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
      setError(r.failed);
      setPending(false);
    }
  }

  return (
    <section className="panel mt-16 p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="display text-3xl">{r.title}</h2>
          <p className="mt-2 text-sm text-muted">{r.intro(analysisCount)}</p>
        </div>
        <button type="button" onClick={dismiss} className="btn-ghost shrink-0">
          {r.later}
        </button>
      </div>
      <form onSubmit={submit} className="mt-6 space-y-5">
        <fieldset>
          <legend className="label">{r.rating}</legend>
          <div className="mt-2 flex gap-2">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setRating(value)}
                aria-label={r.stars(value)}
                aria-pressed={rating === value}
                className={`grid size-11 place-items-center rounded-xl border font-display text-lg transition-colors ${
                  value <= rating ? "border-accent bg-accent text-background" : "border-border bg-background text-muted hover:border-brand"
                }`}
              >
                {value}
              </button>
            ))}
          </div>
        </fieldset>
        <label className="field">
          <span>{r.feedback}</span>
          <textarea
            id="review-text"
            value={text}
            onChange={(event) => setText(event.target.value)}
            maxLength={600}
            rows={4}
            placeholder={r.placeholder}
            className="rounded-xl border border-border bg-background/80 px-3.5 py-3 font-sans text-base text-foreground outline-none placeholder:text-muted/60 focus:border-brand focus:shadow-[0_0_0_3px_rgb(0_210_255/0.2)]"
          />
        </label>
        <label className="flex items-start gap-2 text-sm text-muted">
          <input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} className="mt-0.5 size-4 accent-brand" />
          <span>{r.consent}</span>
        </label>
        <FormError message={error} />
        <button type="submit" disabled={pending} className="btn-primary">
          {pending ? r.sending : r.submit}
        </button>
      </form>
    </section>
  );
}
