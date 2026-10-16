"use client";

import { useChartIntake } from "@/hooks/use-chart-intake";

/** The hero's main action, shaped like a search bar: drop, paste or pick a chart screenshot, then "Analyser". */
export function DropBar() {
  const { dragging, busy, error, dropProps, pick, input } = useChartIntake({ listenPaste: true });

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div
        {...dropProps}
        className={`relative isolate flex items-center gap-3 overflow-hidden rounded-full border bg-card/80 p-2 pl-5 shadow-[0_20px_50px_-20px_rgb(0_0_0/0.9)] backdrop-blur-xl transition-[border-color,box-shadow] duration-200 ${
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
          className="min-w-0 flex-1 truncate py-2 text-left text-muted transition-colors hover:text-foreground"
        >
          {busy ? (
            "Préparation de votre capture…"
          ) : (
            <>
              <span className="pointer-coarse:hidden">
                Glissez votre capture ou collez-la (<kbd className="font-mono text-sm">Ctrl+V</kbd>)
              </span>
              <span className="hidden pointer-coarse:inline">Choisissez une capture de graphique</span>
            </>
          )}
        </button>
        <button type="button" onClick={pick} disabled={busy} className="btn-primary shrink-0 rounded-full px-6 py-3 text-base">
          Analyser
        </button>
        <input {...input} />
      </div>
      {error && (
        <p role="alert" className="mt-3 text-center text-sm text-bear">
          {error} Essayez une capture PNG ou JPG avec l&apos;axe des prix visible.
        </p>
      )}
    </div>
  );
}
