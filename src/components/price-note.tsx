"use client";

import { useI18n } from "@/i18n/client";
import { formatEur } from "@/i18n/format";
import { OFFER_PRICE_EUR } from "@/lib/plans";

/** The price, stated next to every call to action: the product is paid only. */
export function PriceNote({ className = "" }: { className?: string }) {
  const { t, locale } = useI18n();
  const { before, price, after } = t.pricing.priceNote(formatEur(locale, OFFER_PRICE_EUR.monthly));
  return (
    <p className={`text-sm ${className}`}>
      {before}
      <b className="whitespace-nowrap">{price}</b>
      {after}
    </p>
  );
}
