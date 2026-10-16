export const LOCALES = ["fr", "en", "es"] as const;
export type Locale = (typeof LOCALES)[number];
/** French keeps the unprefixed URLs (scanzivo.com/…); the others live under /en and /es. */
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
export const INTL_LOCALE: Record<Locale, string> = { fr: "fr-FR", en: "en-GB", es: "es-ES" };

export const LANGUAGE_NAMES: Record<Locale, string> = { fr: "Français", en: "English", es: "Español" };
