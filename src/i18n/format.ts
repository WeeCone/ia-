import { INTL_LOCALE, type Locale } from "./config";

/** 40 → "40 €" (fr, es) / "€40" (en), with a non-breaking space where the language uses one. */
export function formatEur(locale: Locale, amount: number) {
  return new Intl.NumberFormat(INTL_LOCALE[locale], { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(amount);
}

/** Keeps "65 400"-style numbers on one line. */
export const keepNumbers = (text: string) => text.replace(/(\d) (\d)/g, "$1 $2");
