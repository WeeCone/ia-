import { INTL_LOCALE, type Locale } from "./config";

/** 40 → "40 €" (fr, es) / "€40" (en); 0.99 → "0,99 €" / "€0.99". Cents only when there are some. */
export function formatEur(locale: Locale, amount: number) {
  const digits = Number.isInteger(amount) ? 0 : 2;
  return new Intl.NumberFormat(INTL_LOCALE[locale], {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(amount);
}

/** Keeps "65 400"-style numbers on one line. */
export const keepNumbers = (text: string) => text.replace(/(\d) (\d)/g, "$1 $2");
