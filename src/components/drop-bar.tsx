"use client";

import { useChartIntake } from "@/hooks/use-chart-intake";

/** The hero's main action, shaped like a search bar: drop, paste or pick a chart screenshot, then "Analyser". */
export function DropBar() {
  const { dragging, busy, error, dropProps, pick, input } = useChartIntake({ listenPaste: true });

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div
        {...dropProps}
        className={`flex items-center gap-3 rounded-full border bg-card/80 p-2 pl-5 shadow-[0_20px_50px_-20px_rgb(0_0_0/0.9)] backdrop-blur-xl transition-[border-color,box-shadow] duration-200 ${
          dragging ? "border-accent shadow-[0_0_0_4px_rgb(0_245_160/0.18)]" : "border-border hover:border-brand/60"
        }`}
      >
        <svg
          viewBox="0 0 24 24"
          className="size-5 shrink-0 text-brand"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M4 15v4h16v-4M12 3v12M7 8l5-5 5 5" />
        </svg>
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
