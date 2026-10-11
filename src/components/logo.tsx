import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="group flex items-center gap-2.5">
      {/* A single candlestick as the mark. */}
      <svg viewBox="0 0 12 24" className="h-6 w-3 text-brand" aria-hidden>
        <line x1="6" x2="6" y1="0" y2="24" stroke="currentColor" strokeWidth="1.5" />
        <rect x="1" y="6" width="10" height="11" fill="currentColor" />
      </svg>
      <span className="font-display text-2xl leading-none tracking-tight">
        Neural<em className="text-brand">Trade</em>
      </span>
    </Link>
  );
}
