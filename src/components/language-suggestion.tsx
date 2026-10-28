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
 * Stays silent whenever the current language is among the browser's languages at all, inside the Instagram and
 * Facebook in-app browsers (they often report English whatever the phone's language), and for visitors arriving from
 * an ad (the campaigns target this page's language): a French reader switched to English by mistake gets every
 * analysis in English.
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
    const languages = (navigator.languages ?? [navigator.language]).map((tag) => tag.slice(0, 2).toLowerCase());
    if (languages.includes(locale)) return;
    if (/Instagram|FBAN|FBAV|FB_IAB/.test(navigator.userAgent)) return;
    const params = new URLSearchParams(window.location.search);
    if (params.has("utm_source") || params.has("fbclid") || params.has("gclid")) return;
    const preferred = languages.find(hasLocale);
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
        className="shrink-0 px-1 text-xs font-semibold text-[#047857] underline underline-offset-2 hover:text-[#065f46]"
      >
        {t.switchTo}
      </Link>
      <button type="button" onClick={dismiss} aria-label={t.dismiss} title={t.dismiss} className="shrink-0 px-1 text-lg leading-none text-[#57606a] hover:text-[#0b0e14]">
        ×
      </button>
    </div>
  );
}
