import { offerPrice, type Currency, type Offer } from "@/lib/plans";
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

/** An amount in any currency, written the visitor's way: "¥1,500", "₩14,900", "149.000 ₫", "Rp 99.000". */
export function formatMoney(locale: Locale, amount: number, currency: Currency) {
  const digits = Number.isInteger(amount) ? 0 : 2;
  return new Intl.NumberFormat(INTL_LOCALE[locale], {
    style: "currency",
    currency: currency.toUpperCase(),
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(amount);
}

/** A pack's price on this language's site, in its currency. */
export const formatPrice = (locale: Locale, offer: Offer) => {
  const { amount, currency } = offerPrice(locale, offer);
  return formatMoney(locale, amount, currency);
};

/** Keeps "65 400"-style numbers on one line. */
export const keepNumbers = (text: string) => text.replace(/(\d) (\d)/g, "$1 $2");
