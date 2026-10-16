import { getI18n } from "@/i18n/server";
import { DemoVideo } from "./demo-video";
import { PriceNote } from "./price-note";
import { ScanCta } from "./scan-cta";

/** The scan, shown rather than told: three points and the call to action beside the BTC demo video. */
export async function ScanDemo() {
  const { t } = await getI18n();
  return (
    <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
      <div>
        <h2 className="display text-4xl leading-[1.02] tracking-[-0.03em] sm:text-5xl">
          {t.demo.titleA} <span className="mark">{t.demo.titleB}</span>
        </h2>
        <ul className="mt-8 space-y-4">
          {t.demo.points.map((point) => (
            <li key={point} className="flex gap-3 text-lg leading-relaxed text-muted">
              <svg viewBox="0 0 20 20" className="mt-1.5 size-4 shrink-0 text-accent" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M4 10.5l4 4 8-9" />
              </svg>
              {point}
            </li>
          ))}
        </ul>
        <ScanCta className="btn-primary mt-9 rounded-full px-7 py-3.5 text-base">{t.demo.cta}</ScanCta>
        <PriceNote className="mt-3 text-muted" />
      </div>

      <figure>
        <div className="overflow-hidden rounded-3xl border border-border bg-[#0b0e14] shadow-[0_30px_70px_-30px_rgb(0_0_0/0.9)]">
          <DemoVideo />
        </div>
        <figcaption className="mt-3 text-center text-sm text-muted">
          {t.demo.caption}
        </figcaption>
      </figure>
    </div>
  );
}
