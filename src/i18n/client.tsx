"use client";

import { createContext, useContext } from "react";
import { DEFAULT_LOCALE, localePath, type Locale } from "./config";
import { DICTIONARIES } from "./dictionaries";

const LocaleContext = createContext<Locale>(DEFAULT_LOCALE);

export function LocaleProvider({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

/** For Client Components: the current locale, its dictionary and a link helper ("/pricing" → "/en/pricing"). */
export function useI18n() {
  const locale = useContext(LocaleContext);
  return { locale, t: DICTIONARIES[locale], href: (path: string) => localePath(locale, path) };
}
