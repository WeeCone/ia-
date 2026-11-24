"use client";

import { useChartIntake } from "@/hooks/use-chart-intake";
import { useI18n } from "@/i18n/client";

/** The hero's main action, shaped like a search bar: drop, paste or pick a chart screenshot, then "Analyser". */
export function DropBar() {
  const { dragging, busy, error, dropProps, pick, input, takeExample, signedIn } = useChartIntake({ listenPaste: true });
  const { t } = useI18n();

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div
        {...dropProps}
        className={`relative isolate flex flex-wrap items-center gap-x-3 gap-y-2 overflow-hidden rounded-[1.75rem] border bg-card/80 p-2 pl-5 sm:flex-nowrap sm:rounded-full shadow-[0_20px_50px_-20px_rgb(0_0_0/0.9)] backdrop-blur-xl transition-[border-color,box-shadow] duration-200 ${
          dragging ? "border-accent shadow-[0_0_0_4px_rgb(0_245_160/0.18)]" : "border-border hover:border-brand/60"
        }`}
      >
        {/* Scan beam sweeping across the bar: idle every few seconds, continuous while a capture is dragged or prepared. */}
        <span
          aria-hidden
          className={`pointer-events-none absolute inset-y-0 -left-24 -z-10 w-24 bg-[linear-gradient(90deg,transparent,rgb(0_210_255/0.16)_70%,rgb(0_210_255/0.55))] after:absolute after:inset-y-2 after:right-0 after:w-px after:bg-brand after:shadow-[0_0_12px_2px_var(--brand)] motion-reduce:hidden ${
            dragging || busy ? "animate-[scan-bar_1.1s_linear_infinite]" : "animate-[scan-bar_5s_cubic-bezier(0.65,0,0.35,1)_infinite]"
          }`}
        />
        {/* Viewfinder with its own scan line, echoing the logo. */}
        <span aria-hidden className="relative grid size-6 shrink-0 place-items-center text-brand">
          <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 8V5a2 2 0 0 1 2-2h3M16 3h3a2 2 0 0 1 2 2v3M21 16v3a2 2 0 0 1-2 2h-3M8 21H5a2 2 0 0 1-2-2v-3" />
          </svg>
          <span className="absolute inset-x-1.5 h-0.5 rounded-full bg-accent shadow-[0_0_6px_var(--accent)] motion-safe:animate-[scan-y_2.4s_ease-in-out_infinite]" />
        </span>
        <button
          type="button"
          onClick={pick}
          disabled={busy}
          className="min-w-0 flex-1 basis-[calc(100%-3rem)] truncate py-2 text-left text-muted transition-colors hover:text-foreground sm:basis-auto"
        >
          {busy ? (
            t.dropBar.preparing
          ) : (
            <>
              <span className="pointer-coarse:hidden">
                {t.dropBar.desktop} (<kbd className="font-mono text-sm">Ctrl+V</kbd>)
              </span>
              <span className="hidden pointer-coarse:inline">{t.dropBar.mobile}</span>
            </>
          )}
        </button>
        <button type="button" onClick={pick} disabled={busy} className="btn-primary w-full shrink-0 rounded-full px-6 py-3 text-base sm:w-auto">
          {t.dropBar.analyse}
        </button>
        <input {...input} />
      </div>
      {/* A visitor with no chart at hand can still see what the reading looks like, on a made-up example. */}
      {!signedIn && (
        <p className="mt-4 text-center text-sm">
          <button type="button" onClick={takeExample} disabled={busy} className="text-muted underline decoration-border underline-offset-4 transition-colors hover:text-foreground">
            {t.dropBar.example}
          </button>
        </p>
      )}
      {error && (
        <p role="alert" className="mt-3 text-center text-sm text-bear">
          {error} {t.dropBar.errorHint}
        </p>
      )}
    </div>
  );
}
