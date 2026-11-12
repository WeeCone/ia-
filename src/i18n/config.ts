export const LOCALES = ["fr", "en", "es", "ja", "ko", "vi", "id", "it", "de", "pt"] as const;
export type Locale = (typeof LOCALES)[number];
/** French keeps the unprefixed URLs (scanzivo.com/…); the others live under /en, /es, /ja, /ko, /vi, /id, /it, /de and /pt. */
export const DEFAULT_LOCALE: Locale = "fr";

export const hasLocale = (value: string | undefined | null): value is Locale => LOCALES.includes(value as Locale);

/** "/pricing" → "/pricing" (fr), "/en/pricing" (en). Hashes and queries are kept: "/#faq" → "/en#faq". */
export function localePath(locale: Locale, path: string) {
  if (locale === DEFAULT_LOCALE) return path;
  if (path === "/") return `/${locale}`;
  if (path.startsWith("/#") || path.startsWith("/?")) return `/${locale}${path.slice(1)}`;
  return `/${locale}${path}`;
}

/** Strips the locale prefix from a pathname: "/en/pricing" → "/pricing". */
export function unlocalizedPath(pathname: string) {
  const [, first, ...rest] = pathname.split("/");
  if (hasLocale(first) && first !== DEFAULT_LOCALE) return `/${rest.join("/")}`;
  return pathname || "/";
}

/** BCP 47 tags for Intl formatting and <html lang>. */
export const INTL_LOCALE: Record<Locale, string> = { fr: "fr-FR", en: "en-GB", es: "es-ES", ja: "ja-JP", ko: "ko-KR", vi: "vi-VN", id: "id-ID", it: "it-IT", de: "de-DE", pt: "pt-BR" };

export const LANGUAGE_NAMES: Record<Locale, string> = {
  fr: "Français",
  en: "English",
  es: "Español",
  ja: "日本語",
  ko: "한국어",
  vi: "Tiếng Việt",
  id: "Bahasa Indonesia",
  it: "Italiano",
  de: "Deutsch",
  pt: "Português",
};
