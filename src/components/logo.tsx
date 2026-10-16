"use client";

import Link from "next/link";
import { useId } from "react";

/** Scanzivo mark: a scan viewfinder framing rising candles, on a cyan-to-green gradient. Source files live in public/brand/. */
export function LogoMark({ className = "size-9" }: { className?: string }) {
  // Unique per instance: a hidden copy (e.g. the desktop sidebar on mobile) would otherwise own the gradient.
  const gradient = `logo-${useId().replace(/[^\w-]/g, "")}`;
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <defs>
        <linearGradient id={gradient} x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#00D2FF" />
          <stop offset="1" stopColor="#00F5A0" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="14" fill={`url(#${gradient})`} />
      <g fill="none" stroke="#0B0E14" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 22V9h13M42 9h13v13M55 42v13H42M22 55H9V42" />
      </g>
      <g fill="#0B0E14">
        <rect x="19" y="31" width="2" height="19" />
        <rect x="16" y="35" width="8" height="11" rx="1" />
        <rect x="31" y="21" width="2" height="22" />
        <rect x="28" y="26" width="8" height="13" rx="1" />
        <rect x="43" y="12" width="2" height="22" />
        <rect x="40" y="17" width="8" height="12" rx="1" />
      </g>
    </svg>
  );
}

/** Wordmark linking home; pass the localized home path ("/en"…). */
export function Logo({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className="flex items-center gap-2.5" aria-label="Scanzivo">
      <LogoMark className="size-9 drop-shadow-[0_0_12px_rgb(0_210_255/0.45)]" />
      <span className="font-logo text-xl uppercase tracking-tight">Scanzivo</span>
    </Link>
  );
}
