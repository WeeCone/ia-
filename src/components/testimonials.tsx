import { TESTIMONIALS } from "@/lib/testimonials";

export function Testimonials() {
  if (!TESTIMONIALS.length) return null;
  const hasExamples = TESTIMONIALS.some((testimonial) => testimonial.example);

  return (
    <section className="border-y border-border/70 bg-surface/60">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <h2 className="display text-4xl sm:text-5xl">
            Ils lisent <span className="mark">leurs graphiques.</span>
          </h2>
          {hasExamples && (
            <p className="max-w-xs border-l border-bear pl-3 text-sm text-muted">
              Témoignages fictifs, affichés en exemple. Ils seront remplacés par de vrais avis clients.
            </p>
          )}
        </div>
        <ul className="mt-12 grid gap-8 md:grid-cols-3">
          {TESTIMONIALS.map((testimonial, index) => (
            <li key={index} className="panel relative flex flex-col p-6">
              {testimonial.example && (
                <span className="chip absolute -top-3 right-4 border-bear/40 bg-background text-bear">
                  Exemple
                </span>
              )}
              <span className="display mark text-6xl leading-none" aria-hidden>
                “
              </span>
              <blockquote className="mt-2 flex-1 leading-relaxed">{testimonial.quote}</blockquote>
              <footer className="mt-6 flex items-end justify-between gap-4 border-t border-border pt-4">
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted">{testimonial.role}</p>
                </div>
                <span className="chip shrink-0 border-border text-muted">{testimonial.market}</span>
              </footer>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
