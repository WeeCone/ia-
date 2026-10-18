"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/i18n/client";
import { LOCALES, localePath, unlocalizedPath } from "@/i18n/config";
import { rememberLocale } from "./language-switcher";

const NAMES = { fr: "Français", en: "English", es: "Español" } as const;

/** The language choice folded into one small menu, for the header bar. */
export function LanguageMenu({ className = "" }: { className?: string }) {
  const { locale, t } = useI18n();
  const path = unlocalizedPath(usePathname());
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (event: MouseEvent | KeyboardEvent) => {
      if (event instanceof KeyboardEvent ? event.key === "Escape" : !ref.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", close);
    };
  }, [open]);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label={t.lang.label}
        className="btn-ghost gap-1.5 px-2.5 font-mono text-xs uppercase text-foreground"
      >
        <svg viewBox="0 0 24 24" className="size-4 text-muted" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" aria-hidden>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z" />
        </svg>
        {locale}
        <svg viewBox="0 0 16 16" className={`size-3 text-muted transition-transform ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M4 6l4 4 4-4" />
        </svg>
      </button>
      {open && (
        <ul className="panel absolute right-0 top-full z-50 mt-3 w-40 py-1.5">
          {LOCALES.map((option) => (
            <li key={option}>
              <Link
                href={localePath(option, path)}
                hrefLang={option}
                lang={option}
                aria-current={option === locale ? "true" : undefined}
                onClick={() => {
                  rememberLocale(option);
                  setOpen(false);
                }}
                className={`flex items-center justify-between px-4 py-2 text-sm transition-colors hover:text-brand ${option === locale ? "font-semibold text-foreground" : "text-muted"}`}
              >
                {NAMES[option]}
                <span className="font-mono text-xs uppercase text-muted">{option}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
