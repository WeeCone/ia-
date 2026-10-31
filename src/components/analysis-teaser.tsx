"use client";

import { useI18n } from "@/i18n/client";
import type { PreviewTeaser } from "@/lib/preview-types";

const confidenceStyle = {
  faible: "border-bear/40 bg-bear/10 text-bear",
  moyenne: "border-brand/40 bg-brand/10 text-brand",
  élevée: "border-bull/40 bg-bull/10 text-bull",
} as const;

function LockIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={className} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="4" y="9" width="12" height="8" rx="2" />
      <path d="M7 9V6.5a3 3 0 0 1 6 0V9" />
    </svg>
  );
}

/** A section of the report still to come: its real title, then empty lines under a blur. */
function LockedSection({ title, rows }: { title: string; rows: number }) {
  return (
    <section className="border-t border-border px-5 py-4">
      <h3 className="label flex items-center gap-2 text-muted">
        <LockIcon className="size-3.5" />
        {title}
      </h3>
      <div aria-hidden className="mt-3 select-none space-y-2 blur-[5px]">
        {Array.from({ length: rows }, (_, index) => (
          <span key={index} className="block h-4 rounded bg-foreground/20" style={{ width: `${92 - ((index * 17) % 40)}%` }} />
        ))}
      </div>
    </section>
  );
}

/**
 * The beginning of a previewed report, laid out like the report itself: the market, the AI's confidence and what it
 * spotted on the chart, never the result. The trend, the plan and the levels' prices come with a pack; the sections
 * below are empty shapes under a blur, as none of it exists before payment.
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
    <div>
      <article className="overflow-hidden rounded-2xl border border-border bg-card">
        <header className="flex flex-wrap items-center justify-between gap-2 border-b border-border bg-surface/60 px-5 py-3">
          <span className="label">
            {r.title} · {teaser.asset} · {teaser.timeframe}
          </span>
          <span className="flex flex-wrap gap-2">
            {/* The trend is the result: it stays locked like the rest. */}
            <span className="chip flex items-center gap-1.5 border-border text-muted">
              {r.trend} <LockIcon className="size-3" />
            </span>
            <span className={`chip ${confidenceStyle[teaser.confidence]}`}>
              {r.confidence} {t.enums.confidence[teaser.confidence]}
            </span>
          </span>
        </header>

        {imageUrl && (
          <figure className="border-b border-border bg-background/60 p-2">
            <div className="relative mx-auto w-fit">
              {/* eslint-disable-next-line @next/next/no-img-element -- a local data URL, nothing to optimise */}
              <img src={imageUrl} alt={r.chartAlt} className="block max-h-[30dvh] w-auto max-w-full" />
              {marks.map((mark, index) => (
                <span
                  key={index}
                  className="pointer-events-none absolute inset-x-0 h-0 border-t border-dashed"
                  style={{ top: `${mark.y * 100}%`, borderColor: mark.kind === "support" ? "var(--bull)" : "var(--bear)" }}
                >
                  <span
                    className="absolute left-0 top-0 flex -translate-y-1/2 items-center rounded px-1.5 py-0.5 text-background"
                    style={{ background: mark.kind === "support" ? "var(--bull)" : "var(--bear)" }}
                  >
                    <LockIcon className="size-3" />
                  </span>
                </span>
              ))}
            </div>
            {marks.length > 0 && <figcaption className="px-2 pb-1 pt-2 text-xs text-muted">{c.levelsHidden(marks.length)}</figcaption>}
          </figure>
        )}

        <section className="px-5 py-4">
          <h2 className="display text-3xl">{teaser.asset}</h2>
          <h3 className="label mt-4 text-muted">{c.seen}</h3>
          <p className="mt-2 text-lg leading-relaxed">{teaser.hook}</p>
          {/* What the full report holds for this chart, counted, never shown. */}
          <dl className="mt-4 grid grid-cols-3 gap-2 text-center">
            {[
              [teaser.locked.levels, c.statLevels],
              [teaser.locked.patterns, c.statSignals],
              [1, c.statScenario],
            ].map(([count, label]) => (
              <div key={String(label)} className="flex flex-col-reverse rounded-xl border border-border bg-background/60 px-2 py-3">
                <dt className="mt-1 text-xs leading-tight text-muted">{label}</dt>
                <dd className="display flex items-center justify-center gap-1.5 text-2xl">
                  {count}
                  <LockIcon className="size-3.5 text-muted" />
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Where the free part ends: how much of the report it was, measured. */}
        <div className="border-t border-accent/30 bg-accent/5 px-5 py-3">
          <div className="flex items-center justify-between gap-3 text-sm">
            <span className="font-semibold">{c.shown(percent)}</span>
            <span className="label text-accent">{c.freeLabel}</span>
          </div>
          <div
            className="mt-2 h-1.5 overflow-hidden rounded-full bg-border"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={percent}
            aria-label={c.shown(percent)}
          >
            <span className="block h-full rounded-full bg-accent" style={{ width: `${percent}%` }} />
          </div>
        </div>

        <div aria-label={c.lockedAria} className="relative">
          <LockedSection title={r.plan} rows={3} />
          <LockedSection title={`${r.resistances} · ${r.supports}`} rows={2} />
          <LockedSection title={r.alternative} rows={2} />
          <LockedSection title={r.macro.title} rows={2} />
          <LockedSection title={r.risk} rows={2} />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-card/0 via-card/40 to-card" aria-hidden />
        </div>

        <div className="relative border-t border-border p-5">
          <p className="flex items-center gap-2 font-semibold">
            <span className="grid size-8 place-items-center rounded-full bg-accent/15 text-accent">
              <LockIcon />
            </span>
            {c.lockedTitle}
          </p>
          <p className="mt-1 text-sm text-muted">{c.shownHint}</p>
          <ul className="mt-4 space-y-2 text-sm">
            {c.lockedItems(teaser.locked).map((item) => (
              <li key={item} className="flex gap-2.5">
                <LockIcon className="mt-0.5 size-3.5 shrink-0 text-muted" />
                {item}
              </li>
            ))}
          </ul>
          <button type="button" onClick={onUnlock} className="btn-primary mt-5 w-full py-3.5 text-base">
            {unlockLabel}
          </button>
          <p className="mt-3 text-center text-xs leading-relaxed text-muted">{terms}</p>
        </div>
      </article>

      <p className="mt-4 text-xs text-muted">{r.footer}</p>
    </div>
  );
}
