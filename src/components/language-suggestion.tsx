"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useI18n } from "@/i18n/client";
import { hasLocale, localePath, unlocalizedPath, type Locale } from "@/i18n/config";
import { DICTIONARIES } from "@/i18n/dictionaries";
import { LOCALE_CHOICE_KEY, rememberLocale } from "./language-switcher";

/**
 * When the browser's language is another supported one, offers that version once, in that language.
 * Never redirects on its own; an explicit choice (switcher or dismiss) silences it for good.
 */
export function LanguageSuggestion() {
  const { locale } = useI18n();
  const pathname = usePathname();
  const [target, setTarget] = useState<Locale | null>(null);

  useEffect(() => {
    if (pathname.includes("/admin")) return;
    let chosen: string | null = null;
    try {
      chosen = localStorage.getItem(LOCALE_CHOICE_KEY);
    } catch {}
    if (chosen) return;
    const preferred = navigator.languages?.map((tag) => tag.slice(0, 2).toLowerCase()).find(hasLocale);
    if (!preferred || preferred === locale) return;
    const timer = setTimeout(() => setTarget(preferred), 800);
    return () => clearTimeout(timer);
  }, [locale, pathname]);

  if (!target) return null;
  const t = DICTIONARIES[target].lang;
  const dismiss = () => {
    rememberLocale(locale);
    setTarget(null);
  };

  return (
    <div lang={target} role="region" aria-label={t.label} className="fixed inset-x-3 top-20 z-50 mx-auto flex max-w-md items-center gap-3 rounded-2xl border border-[#d0d7de] bg-white p-3 pl-4 text-sm text-[#0b0e14] shadow-[0_18px_40px_-16px_rgb(15_23_42/0.35)] sm:top-24">
      <p className="flex-1">{t.suggest}</p>
      <Link
        href={localePath(target, unlocalizedPath(pathname))}
        onClick={() => rememberLocale(target)}
        className="shrink-0 rounded-full bg-[#047857] px-3.5 py-2 text-xs font-semibold text-white hover:bg-[#065f46]"
      >
        {t.switchTo}
      </Link>
      <button type="button" onClick={dismiss} aria-label={t.dismiss} title={t.dismiss} className="shrink-0 px-1 text-lg leading-none text-[#57606a] hover:text-[#0b0e14]">
        ×
      </button>
    </div>
  );
}
