"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/i18n/client";
import { LOCALES, localePath, unlocalizedPath, type Locale } from "@/i18n/config";

export const LOCALE_CHOICE_KEY = "scanzivo:locale-choice";

/** Remembers an explicit choice so the browser-language suggestion stops appearing. */
export function rememberLocale(locale: Locale) {
  try {
    localStorage.setItem(LOCALE_CHOICE_KEY, locale);
  } catch {}
}

/** FR · EN · ES links to the same page in each language. */
export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { locale, t } = useI18n();
  const path = unlocalizedPath(usePathname());
  return (
    <nav aria-label={t.lang.label} className={`flex items-center gap-1 font-mono text-xs ${className}`}>
      {LOCALES.map((option) => (
        <Link
          key={option}
          href={localePath(option, path)}
          hrefLang={option}
          lang={option}
          aria-current={option === locale ? "true" : undefined}
          onClick={() => rememberLocale(option)}
          className={`rounded-md px-1.5 py-1 uppercase transition-colors ${option === locale ? "font-bold text-foreground" : "text-muted hover:text-foreground"}`}
        >
          {option}
        </Link>
      ))}
    </nav>
  );
}
