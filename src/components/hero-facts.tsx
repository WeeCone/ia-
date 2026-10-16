import { MONTHLY_CREDITS, OFFERS } from "@/lib/plans";

const nbsp = (text: string) => text.replace(" ", " ");

/** The hero's price line, set as three plain facts under the drop bar: the product is paid only. */
export function HeroFacts() {
  const facts = [
    [nbsp(OFFERS.monthly.price), "par mois, sans engagement"],
    [String(MONTHLY_CREDITS), "analyses incluses par mois"],
    [nbsp(OFFERS.lifetime.price), "une fois, accès à vie"],
  ];
  return (
    <dl className="mx-auto mt-6 grid max-w-2xl grid-cols-3 divide-x divide-border">
      {facts.map(([value, label]) => (
        <div key={label} className="flex flex-col-reverse items-center justify-end gap-0.5 px-2 text-center">
          <dt className="text-xs leading-snug text-muted sm:text-sm">{label}</dt>
          <dd className="font-display text-xl font-bold tracking-tight sm:text-2xl">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
