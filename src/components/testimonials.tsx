import { getI18n } from "@/i18n/server";
import { getPublishedReviews } from "@/lib/testimonials";

function Stars({ rating, label }: { rating: number; label: string }) {
  return (
    <span className="flex gap-0.5 text-accent" aria-label={label}>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg key={star} viewBox="0 0 20 20" className={`size-4 ${star <= rating ? "" : "opacity-25"}`} fill="currentColor" aria-hidden>
          <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9z" />
        </svg>
      ))}
    </span>
  );
}

/** Genuine customer reviews, approved in the admin. Hidden until there is at least one. */
export async function Testimonials() {
  const reviews = await getPublishedReviews();
  if (!reviews.length) return null;
  const { t } = await getI18n();

  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 py-20">
        <div data-reveal="fade" className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <h2 className="display text-4xl sm:text-5xl">
            {t.testimonials.titleA} <span className="mark">{t.testimonials.titleB}</span>
          </h2>
          <p className="max-w-xs text-sm text-muted">{t.testimonials.subtitle}</p>
        </div>
        <ul data-reveal-stagger className={`mt-12 grid gap-8 ${reviews.length > 1 ? "md:grid-cols-2 lg:grid-cols-3" : "max-w-xl"}`}>
          {reviews.map((review, index) => (
            <li key={index} className="panel flex flex-col p-6">
              <Stars rating={review.rating} label={t.testimonials.stars(review.rating)} />
              <blockquote className="mt-4 flex-1 leading-relaxed">« {review.quote} »</blockquote>
              <footer className="mt-6 flex items-center justify-between gap-4 border-t border-border pt-4">
                <p className="font-semibold">{review.name}</p>
                <span className="chip shrink-0 border-bull/40 text-bull">{t.testimonials.badge}</span>
              </footer>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
