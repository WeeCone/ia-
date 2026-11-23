import { DEFAULT_LOCALE, hasLocale, type Locale } from "@/i18n/config";

/**
 * The language a customer's reports are written in: the one set on the account (see the dashboard's language picker),
 * else the language of the page the request came from. A customer who reads Italian but opens the French site still
 * gets Italian reports.
 */
export function reportLocale(userData: { reportLocale?: unknown } | undefined, requested: Locale = DEFAULT_LOCALE): Locale {
  const saved = userData?.reportLocale;
  return typeof saved === "string" && hasLocale(saved) ? saved : requested;
}
