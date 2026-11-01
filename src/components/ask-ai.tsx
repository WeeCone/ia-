"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/i18n/client";
import { formatEur } from "@/i18n/format";
import { auth } from "@/lib/firebase";
import { OFFER_PRICE_EUR } from "@/lib/plans";
import { FormError } from "./auth-card";
import { BillingButton } from "./billing-button";

type Exchange = { question: string; answer: string; at: number };

function ChatIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={className} fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 4.75h12a1.25 1.25 0 0 1 1.25 1.25v7a1.25 1.25 0 0 1-1.25 1.25H9l-3.5 2.5v-2.5H4A1.25 1.25 0 0 1 2.75 13V6A1.25 1.25 0 0 1 4 4.75z" />
    </svg>
  );
}

/** Pro and À vie: one question a day to the AI about this analysis, with the earlier answers kept under it. */
export function AskAi({ analysisId }: { analysisId: string }) {
  const { t, locale } = useI18n();
  const c = t.report.chat;
  const [exchanges, setExchanges] = useState<Exchange[]>([]);
  const [left, setLeft] = useState<number | null>(null);
  const [question, setQuestion] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const user = auth.currentUser;
      if (!user) return;
      const response = await fetch(`/api/analyses/${analysisId}/ask`, {
        headers: { Authorization: `Bearer ${await user.getIdToken()}`, "X-Locale": locale },
      }).catch(() => null);
      if (!response?.ok || cancelled) return;
      const data = (await response.json()) as { exchanges: Exchange[]; left: number };
      setExchanges(data.exchanges);
      setLeft(data.left);
    })();
    return () => {
      cancelled = true;
    };
  }, [analysisId, locale]);

  async function ask(event: React.FormEvent) {
    event.preventDefault();
    const user = auth.currentUser;
    if (!user || busy || question.trim().length < 3) return;
    setBusy(true);
    setError(null);
    try {
      const response = await fetch(`/api/analyses/${analysisId}/ask`, {
        method: "POST",
        headers: { Authorization: `Bearer ${await user.getIdToken()}`, "X-Locale": locale, "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        setError(data.error ?? c.failed);
        if (response.status === 429) setLeft(0);
        return;
      }
      setExchanges((current) => [...current, data.exchange]);
      setLeft(data.left ?? 0);
      setQuestion("");
    } catch {
      setError(c.failed);
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="panel p-5">
      <h3 className="flex items-center gap-2 font-semibold">
        <ChatIcon className="size-4 text-brand" />
        {c.title}
      </h3>
      <p className="mt-1 text-sm text-muted">{c.hint}</p>

      {exchanges.length > 0 && (
        <ol className="mt-5 space-y-4">
          {exchanges.map((exchange) => (
            <li key={exchange.at} className="space-y-2">
              <p className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-brand/10 px-4 py-2.5 text-sm">
                <span className="sr-only">{c.you} : </span>
                {exchange.question}
              </p>
              <p className="max-w-[92%] whitespace-pre-line rounded-2xl rounded-bl-md border border-border bg-card px-4 py-3 text-sm leading-relaxed">
                {exchange.answer}
              </p>
            </li>
          ))}
        </ol>
      )}

      {left === 0 ? (
        <p className="mt-5 text-sm text-muted">{c.used}</p>
      ) : (
        <form onSubmit={ask} className="mt-5 flex flex-col gap-3 sm:flex-row">
          <input
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            maxLength={400}
            placeholder={c.placeholder}
            disabled={busy || left === null}
            className="min-w-0 flex-1 rounded-xl border border-border bg-background/80 px-3.5 py-2.5 text-sm outline-none focus:border-brand disabled:opacity-60"
          />
          <button type="submit" disabled={busy || left === null || question.trim().length < 3} className="btn-primary shrink-0 px-5 py-2.5 disabled:opacity-50">
            {busy ? c.asking : c.ask}
          </button>
        </form>
      )}
      {error && (
        <div className="mt-3">
          <FormError message={error} />
        </div>
      )}
    </section>
  );
}

/** Starter: the question box shown closed, with the way up to Pro. */
export function AskAiLocked() {
  const { t, locale } = useI18n();
  const c = t.report.chat;
  return (
    <section className="panel flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h3 className="flex items-center gap-2 font-semibold">
          <ChatIcon className="size-4 text-muted" />
          {c.lockedTitle}
        </h3>
        <p className="mt-1 max-w-xl text-sm text-muted">{c.lockedText}</p>
      </div>
      <BillingButton route="checkout" offer="monthly" className="btn-secondary shrink-0 px-4 py-2 text-sm">
        {t.report.lockedPro.cta(formatEur(locale, OFFER_PRICE_EUR.monthly))}
      </BillingButton>
    </section>
  );
}
