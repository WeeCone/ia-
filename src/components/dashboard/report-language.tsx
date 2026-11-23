"use client";

import { useEffect, useRef, useState } from "react";
import { hasLocale, LANGUAGE_NAMES, LOCALES, type Locale } from "@/i18n/config";
import { useI18n } from "@/i18n/client";
import { auth } from "@/lib/firebase";

/** The browser's own language, when the site offers it (a reader in Italy on the French site gets Italian). */
function browserLocale(): Locale | null {
  for (const tag of navigator.languages ?? [navigator.language]) {
    const base = tag.slice(0, 2).toLowerCase();
    if (hasLocale(base)) return base;
  }
  return null;
}

/**
 * Picks the language the reports are written in. Until the account chooses, it follows the browser's language (else the
 * page's) and that is saved, so the next report comes out in it whichever version of the site is open.
 */
export function ReportLanguage({ saved }: { saved: Locale | undefined }) {
  const { locale: page } = useI18n();
  // What the account chose; until then what the browser (else the page) suggests, which is also saved once below.
  const [chosen, setChosen] = useState<Locale | null>(null);
  const [suggested] = useState<Locale>(() => (typeof navigator === "undefined" ? page : (browserLocale() ?? page)));
  const value = chosen ?? saved ?? suggested;
  const persisted = useRef(false);

  const save = (next: Locale) =>
    auth.currentUser
      ?.getIdToken()
      .then((token) =>
        fetch("/api/account/language", { method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }, body: JSON.stringify({ locale: next }) }),
      )
      .catch(() => {});

  // Nothing chosen yet: the suggestion is saved once, so the next report is written in it.
  useEffect(() => {
    if (saved || persisted.current) return;
    persisted.current = true;
    save(suggested);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- once, when the profile has loaded
  }, [saved, suggested]);

  return (
    <label className="flex items-center gap-2 text-sm text-muted" title="Report language">
      <svg viewBox="0 0 20 20" className="size-4" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden>
        <circle cx="10" cy="10" r="7.5" />
        <path d="M2.5 10h15M10 2.5c2.2 2 3.3 4.5 3.3 7.5S12.200 15.500 10 17.500M10 2.500C7.800 4.500 6.700 7 6.700 10s1.100 5.500 3.300 7.500" />
      </svg>
      <span className="sr-only">Report language</span>
      <select
        value={value}
        onChange={(event) => {
          const next = event.target.value as Locale;
          setChosen(next);
          save(next);
        }}
        className="rounded-lg border border-border bg-background px-2 py-1 text-foreground"
      >
        {LOCALES.map((code) => (
          <option key={code} value={code}>
            {LANGUAGE_NAMES[code]}
          </option>
        ))}
      </select>
    </label>
  );
}
