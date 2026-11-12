"use client";

import { createContext, useContext, useEffect, useSyncExternalStore } from "react";
import { getCurrencyOverride, getServerCurrencyOverride, prefersEuros, setCurrencyOverride, subscribeCurrency } from "@/lib/currency-choice";
import { DEFAULT_LOCALE, localePath, type Locale } from "./config";
import { DICTIONARIES } from "./dictionaries";

const LocaleContext = createContext<Locale>(DEFAULT_LOCALE);

export function LocaleProvider({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  // Portuguese readers living in Europe pay in euros: decided once the browser is known (see currency-choice.ts).
  useEffect(() => {
    if (locale === "pt" && prefersEuros()) setCurrencyOverride("eur");
  }, [locale]);
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

/** For Client Components: the current locale, its dictionary and a link helper ("/pricing" → "/en/pricing"). */
export function useI18n() {
  const locale = useContext(LocaleContext);
  // Re-renders the prices when the currency choice lands (formatPrice reads it).
  useSyncExternalStore(subscribeCurrency, getCurrencyOverride, getServerCurrencyOverride);
  return { locale, t: DICTIONARIES[locale], href: (path: string) => localePath(locale, path) };
}
