import type { VerdictMark } from "@/lib/verdicts";

const PATHS: Record<VerdictMark, string> = {
  "plus-minus": "M9 19h30M24 6v26M9 41h30",
  "minus-plus": "M9 7h30M9 29h30M24 16v26",
  equal: "M9 18h30M9 30h30",
  unclear: "M24 24c-4-6-7-9-11-9a9 9 0 0 0 0 18c4 0 7-3 11-9s7-9 11-9a9 9 0 0 1 0 18c-4 0-7-3-11-9z",
};

/** An evaluation mark (± ∓ = ∞), drawn rather than typeset so it keeps one stroke weight in every face. */
export function VerdictSymbol({ mark, className = "size-10", title }: { mark: VerdictMark; className?: string; title?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} role={title ? "img" : undefined} aria-hidden={title ? undefined : true} aria-label={title}>
      <path d={PATHS[mark]} fill="none" stroke="currentColor" strokeWidth={4.5} strokeLinecap="square" strokeLinejoin="round" />
    </svg>
  );
}
