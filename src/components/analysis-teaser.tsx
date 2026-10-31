"use client";

import { useI18n } from "@/i18n/client";
import type { PreviewTeaser } from "@/lib/preview-types";

const confidenceWidth = { faible: "33%", moyenne: "66%", élevée: "100%" } as const;

function LockIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={className} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="4" y="9" width="12" height="8" rx="2" />
      <path d="M7 9V6.5a3 3 0 0 1 6 0V9" />
    </svg>
  );
}

/** A heading of the report, with its small marker. */
function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="flex items-center gap-2 text-base font-semibold">
      <span className="size-2 rounded-full bg-accent" aria-hidden />
      {children}
    </h3>
  );
}

/**
 * The beginning of a previewed report, read top to bottom like the report itself: the chart, a short summary, what is
 * at stake on it, the AI's confidence, then the plan and probabilities under a blur with the share shown. Nothing of
 * the result (direction, prices, verdict) is in the page: it does not exist before payment.
 */
export function AnalysisTeaser({
  teaser,
  imageUrl,
  onUnlock,
  unlockLabel,
  terms,
}: {
  teaser: PreviewTeaser;
  imageUrl: string | null;
  onUnlock: () => void;
  unlockLabel: string;
  terms: string;
}) {
  const { t } = useI18n();
  const c = t.chartReady;
  const r = t.report;
  const marks = teaser.marks.filter((mark) => Number.isFinite(mark.y) && mark.y >= 0 && mark.y <= 1);
  const percent = Math.min(100, Math.max(1, teaser.shownPercent));

  return (
    <div className="space-y-5">
      {/* The market and the chart, side by side on wide screens. */}
      <div className="grid gap-3 sm:grid-cols-[1fr_1.4fr]">
        <div className="rounded-2xl border border-border bg-card p-4">
          <p className="display text-2xl">{teaser.asset}</p>
          <p className="mt-1 text-sm text-muted">{teaser.timeframe}</p>
          <dl className="mt-4 space-y-1.5 text-sm">
            <div className="flex items-center justify-between gap-2">
              <dt className="text-muted">{r.trend}</dt>
              <dd className="flex items-center gap-1.5 text-muted">
                <LockIcon className="size-3.5" />
              </dd>
            </div>
            <div className="flex items-center justify-between gap-2">
              <dt className="text-muted">{c.statLevels}</dt>
              <dd className="font-semibold">{teaser.locked.levels}</dd>
            </div>
            <div className="flex items-center justify-between gap-2">
              <dt className="text-muted">{c.statSignals}</dt>
              <dd className="font-semibold">{teaser.locked.patterns}</dd>
            </div>
          </dl>
        </div>
        {imageUrl && (
          <figure className="overflow-hidden rounded-2xl border border-border bg-background/60 p-2">
            <div className="relative mx-auto w-fit">
              {/* eslint-disable-next-line @next/next/no-img-element -- a local data URL, nothing to optimise */}
              <img src={imageUrl} alt={r.chartAlt} className="block max-h-44 w-auto max-w-full" />
              {marks.map((mark, index) => (
                <span
                  key={index}
                  className="pointer-events-none absolute inset-x-0 h-0 border-t border-dashed"
                  style={{ top: `${mark.y * 100}%`, borderColor: mark.kind === "support" ? "var(--bull)" : "var(--bear)" }}
                />
              ))}
            </div>
          </figure>
        )}
      </div>

      <section>
        <Heading>{c.summaryTitle}</Heading>
        <p className="mt-2 leading-relaxed text-foreground/90">{teaser.summary}</p>
        <p className="mt-1.5 text-xs text-accent">{c.summaryNote}</p>
      </section>

      <section>
        <Heading>{c.stakesTitle}</Heading>
        <p className="mt-2 rounded-2xl border border-border bg-card p-4 text-sm leading-relaxed text-foreground/90">{teaser.stakes}</p>
      </section>

      <section>
        <Heading>{c.confidenceTitle}</Heading>
        <div className="mt-2 rounded-2xl border border-border bg-card p-4">
          <div className="flex items-center gap-4">
            <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-border">
              <span className="block h-full rounded-full bg-accent" style={{ width: confidenceWidth[teaser.confidence] }} />
            </div>
            <span className="text-sm font-semibold">{t.enums.confidence[teaser.confidence]}</span>
          </div>
          <p className="mt-2 text-xs text-muted">{c.confidenceNote}</p>
        </div>
      </section>

      <section aria-label={c.lockedAria}>
        <Heading>{c.lockedHeading}</Heading>
        {/* Empty shapes only, blurred: the plan, the levels' prices and the probabilities are not in the page. */}
        <div aria-hidden className="relative mt-2 select-none overflow-hidden rounded-2xl border border-border bg-card p-4">
          <div className="space-y-3 blur-[6px]">
            {[78, 64, 88, 52, 70].map((width, index) => (
              <div key={index} className="flex items-center gap-3">
                <span className="h-4 w-20 rounded bg-foreground/15" />
                <span className="h-4 rounded bg-accent/40" style={{ width: `${width}%` }} />
              </div>
            ))}
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-card/0 to-card/80" />
        </div>

        <div className="mt-6 text-center">
          <p className="display text-2xl">{c.shown(percent)}</p>
          <div
            className="mx-auto mt-3 h-2 max-w-sm overflow-hidden rounded-full bg-border"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={percent}
            aria-label={c.shown(percent)}
          >
            <span className="block h-full rounded-full bg-accent" style={{ width: `${percent}%` }} />
          </div>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted">{c.lockedSummary}</p>
          <ul className="mx-auto mt-4 max-w-md space-y-1.5 text-left text-sm">
            {c.lockedItems(teaser.locked).map((item) => (
              <li key={item} className="flex gap-2.5">
                <LockIcon className="mt-0.5 size-3.5 shrink-0 text-muted" />
                {item}
              </li>
            ))}
          </ul>
          <button type="button" onClick={onUnlock} className="btn-primary mt-6 w-full py-3.5 text-base">
            {unlockLabel}
          </button>
          <p className="mt-3 text-xs leading-relaxed text-muted">{terms}</p>
        </div>
      </section>

      <p className="text-xs text-muted">{r.footer}</p>
    </div>
  );
}
