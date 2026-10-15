import Link from "next/link";

/** Scanzivo mark: a diagram frame on board green, two candles and the level the verdict hangs on. Source files live in public/brand/. */
export function LogoMark({ className = "size-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <rect width="64" height="64" rx="6" fill="#1D5A3D" />
      <rect x="10" y="10" width="44" height="44" fill="none" stroke="#F6F7F2" strokeWidth="3" />
      <path d="M17 37h30" stroke="#F6F7F2" strokeWidth="2.5" strokeDasharray="4 3" />
      <g fill="#F6F7F2">
        <rect x="24" y="22" width="2.5" height="26" />
        <rect x="20.5" y="27" width="9.5" height="14" />
        <rect x="38" y="16" width="2.5" height="22" />
        <rect x="34.5" y="20" width="9.5" height="11" />
      </g>
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2.5 ${className}`} aria-label="Scanzivo, accueil">
      <LogoMark className="size-9" />
      <span className="font-[family-name:var(--font-bodoni)] text-2xl font-bold tracking-tight">Scanzivo</span>
    </Link>
  );
}
