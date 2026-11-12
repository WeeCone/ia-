"use client";

import { useI18n } from "@/i18n/client";
import { formatPrice } from "@/i18n/format";

/** The price, stated next to every call to action: the product is paid only. */
export function PriceNote({ className = "" }: { className?: string }) {
  const { t, locale } = useI18n();
  const { before, price, after } = t.pricing.priceNote(formatPrice(locale, "starter"));
  return (
    <p className={`text-sm ${className}`}>
      {before}
      <b className="whitespace-nowrap">{price}</b>
      {after}
    </p>
  );
}
