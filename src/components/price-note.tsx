import { OFFERS } from "@/lib/plans";

/** The price, stated next to every call to action: the product is paid only. */
export function PriceNote({ className = "" }: { className?: string }) {
  return (
    <p className={`text-sm ${className}`}>
      Dès <b className="whitespace-nowrap">{OFFERS.monthly.price.replace(" ", "\u00a0")}/mois</b> · sans engagement
    </p>
  );
}
