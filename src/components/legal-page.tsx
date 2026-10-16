import { INTL_LOCALE } from "@/i18n/config";
import { getI18n } from "@/i18n/server";
import { LAST_UPDATED } from "@/lib/legal";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

export async function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  const { locale, t } = await getI18n();
  return (
    <div className="theme-light flex flex-1 flex-col">
      <SiteHeader />
      <main id="contenu" className="mx-auto w-full max-w-3xl flex-1 px-4 pb-24 pt-16">
        <h1 className="display text-4xl sm:text-5xl">{title}</h1>
        <p className="label mt-4 text-muted">
          {t.legal.updated}
          {LAST_UPDATED.toLocaleDateString(INTL_LOCALE[locale], { day: "numeric", month: "long", year: "numeric" })}
        </p>
        {/* Translations are a courtesy: the French text is the binding one. */}
        {t.legal.notice && <p className="mt-6 rounded-xl border border-border bg-card px-4 py-3 text-sm text-muted">{t.legal.notice}</p>}
        <div className="legal mt-12">{children}</div>
      </main>
      <SiteFooter />
    </div>
  );
}
