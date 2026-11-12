import { notFound } from "next/navigation";
import { lang } from "next/root-params";
import { DEFAULT_LOCALE, hasLocale, localePath, LOCALES, type Locale } from "./config";
import { DICTIONARIES } from "./dictionaries";

/** For Server Components: the current locale (from the [lang] root segment), its dictionary and a link helper. */
export async function getI18n() {
  const value = await lang();
  if (!hasLocale(value)) notFound();
  const locale: Locale = value;
  return { locale, t: DICTIONARIES[locale], href: (path: string) => localePath(locale, path) };
}

/** Metadata alternates for one page in every language (path without locale, e.g. "/pricing"). */
export function languageAlternates(locale: Locale, path: string) {
  return {
    canonical: localePath(locale, path),
    languages: { ...Object.fromEntries(LOCALES.map((other) => [other, localePath(other, path)])), "x-default": path },
  };
}

/** Language of an API call: the X-Locale header the client sends, French otherwise. */
export function requestLocale(request: Request): Locale {
  const value = request.headers.get("x-locale");
  return hasLocale(value) ? value : DEFAULT_LOCALE;
}
