import Link from "next/link";

/** Scanzivo mark: a scan viewfinder framing rising candles. Source files live in public/brand/. */
export function LogoMark({ className = "size-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <rect width="64" height="64" fill="var(--brand)" />
      <g fill="none" stroke="var(--background)" strokeWidth="5" strokeLinecap="square">
        <path d="M8 22V8h14M42 8h14v14M56 42v14H42M22 56H8V42" />
      </g>
      <g fill="var(--background)">
        <rect x="19" y="31" width="2" height="19" />
        <rect x="16" y="35" width="8" height="11" />
        <rect x="31" y="21" width="2" height="22" />
        <rect x="28" y="26" width="8" height="13" />
        <rect x="43" y="12" width="2" height="22" />
        <rect x="40" y="17" width="8" height="12" />
      </g>
    </svg>
  );
}

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label="Scanzivo, accueil">
      <LogoMark />
      <span className="font-display text-xl uppercase tracking-tight">Scanzivo</span>
    </Link>
  );
}
