"use client";

import { useI18n } from "@/i18n/client";
import type { PreviewTeaser } from "@/lib/preview-types";

const trendStyle = {
  haussière: "border-bull/40 bg-bull/10 text-bull",
  baissière: "border-bear/40 bg-bear/10 text-bear",
  neutre: "border-border text-muted",
} as const;

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

/**
 * The free part of a previewed analysis: the reading of the market and the levels' positions on the capture.
 * The locked part is drawn as empty shapes under a blur: the plan itself never reached the browser.
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

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="chip border-accent/40 bg-accent/10 text-accent">{c.freeLabel}</span>
        <span className={`chip ${trendStyle[teaser.trend]}`}>
          {r.trend} {t.enums.trend[teaser.trend]}
        </span>
        {teaser.confidence && (
          <span className={`chip ${confidenceStyle[teaser.confidence.level]}`}>
            {r.confidence} {t.enums.confidence[teaser.confidence.level]}
          </span>
        )}
      </div>

      <h2 className="display mt-4 text-3xl">
        {teaser.asset}
        <span className="text-muted"> · {teaser.timeframe}</span>
      </h2>

      {imageUrl && (
        <figure className="mt-4 overflow-hidden rounded-2xl border border-border bg-card p-2">
          <div className="relative mx-auto w-fit">
            {/* eslint-disable-next-line @next/next/no-img-element -- a local data URL, nothing to optimise */}
            <img src={imageUrl} alt={r.chartAlt} className="block max-h-[34dvh] w-auto max-w-full" />
            {marks.map((mark, index) => (
              <span
                key={index}
                className="pointer-events-none absolute inset-x-0 h-0 border-t border-dashed"
                style={{ top: `${mark.y * 100}%`, borderColor: mark.kind === "support" ? "var(--bull)" : "var(--bear)" }}
              >
                <span
                  className="absolute left-0 top-0 flex -translate-y-1/2 items-center gap-1 rounded px-1.5 py-0.5 text-background"
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

      <section className="mt-5">
        <h3 className="label text-muted">{c.seen}</h3>
        <p className="mt-2 text-lg leading-relaxed">{teaser.summary}</p>
        {teaser.patterns.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {teaser.patterns.map((pattern) => (
              <li key={pattern} className="rounded-lg border border-brand/30 bg-brand/10 px-2.5 py-1 text-sm font-medium text-brand">
                {pattern}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section aria-label={c.lockedAria} className="relative mt-6 overflow-hidden rounded-2xl border border-border bg-card">
        {/* Placeholder shapes only, blurred: no part of the plan is in the page. */}
        <div aria-hidden className="pointer-events-none absolute inset-0 select-none space-y-4 p-5 blur-[6px]">
          <div className="flex items-center gap-3">
            <span className="h-6 w-28 rounded-md bg-bull/60" />
            <span className="h-4 w-24 rounded bg-foreground/15" />
          </div>
          <span className="block h-7 w-11/12 rounded bg-foreground/25" />
          <span className="block h-7 w-2/3 rounded bg-foreground/25" />
          <div className="grid grid-cols-[6rem_1fr] gap-2">
            {[0, 1, 2, 3, 4, 5].map((row) => (
              <div key={row} className="contents">
                <span className="h-5 rounded bg-foreground/10" />
                <span className="h-5 w-1/2 rounded bg-foreground/20" />
              </div>
            ))}
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-card/30 via-card/80 to-card" aria-hidden />

        <div className="relative p-5 pt-24">
          <p className="flex items-center gap-2 font-semibold">
            <span className="grid size-8 place-items-center rounded-full bg-accent/15 text-accent">
              <LockIcon />
            </span>
            {c.lockedTitle}
          </p>
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
      </section>

      <p className="mt-4 text-xs text-muted">{r.footer}</p>
    </div>
  );
}
