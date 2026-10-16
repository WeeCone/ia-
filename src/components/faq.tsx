import Link from "next/link";
import { getI18n } from "@/i18n/server";

type Item = { q: string; a: string; terms?: boolean };

/** Folding questions; answers marked `terms` end with a link to the terms of sale. */
export async function FaqList({ items, className = "space-y-4" }: { items: readonly Item[]; className?: string }) {
  const { t, href } = await getI18n();
  return (
    <div data-reveal-stagger className={className}>
      {items.map(({ q, a, terms }) => (
        <details key={q} className="group panel open:border-brand/50">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-medium [&::-webkit-details-marker]:hidden">
            {q}
            <span className="shrink-0 font-display text-2xl leading-none text-brand transition-transform group-open:rotate-45" aria-hidden>
              +
            </span>
          </summary>
          <div className="border-t border-border px-5 py-4 leading-relaxed text-muted">
            {a}
            {terms && (
              <>
                {" "}
                <Link href={href("/legal/cgv")} className="text-brand underline underline-offset-2">
                  {t.faq.termsLink}
                </Link>
                .
              </>
            )}
          </div>
        </details>
      ))}
    </div>
  );
}

export async function Faq() {
  const { t, href } = await getI18n();
  return (
    <section id="faq" className="scroll-mt-20">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 lg:grid-cols-12">
        <div data-reveal="fade" className="lg:col-span-4">
          <h2 className="display text-4xl sm:text-5xl">{t.faq.title}</h2>
          <p className="mt-4 text-muted">{t.faq.subtitle}</p>
          <Link href={href("/auth/signup")} className="btn-primary mt-8">
            {t.faq.cta}
          </Link>
        </div>
        <FaqList items={t.faq.items} className="space-y-4 lg:col-span-8" />
      </div>
    </section>
  );
}
