"use client";

import { createContext, useContext } from "react";
import type { Locale } from "@/i18n/config";

/**
 * Where each language's version of the current page lives, when it is not at the same path: an article has another
 * slug in every language, and some guides exist in a few languages only. The language links read it; without it they
 * keep the same path.
 */
const AlternatesContext = createContext<Partial<Record<Locale, string>> | null>(null);

export function LanguageAlternates({ paths, children }: { paths: Partial<Record<Locale, string>>; children: React.ReactNode }) {
  return <AlternatesContext.Provider value={paths}>{children}</AlternatesContext.Provider>;
}

export const useLanguageAlternates = () => useContext(AlternatesContext);
