import Link from "next/link";
import { articlesFor } from "@/content/blog";
import { LEGAL_LINKS } from "@/lib/legal";
import { getI18n } from "@/i18n/server";
import { CookieSettingsLink } from "./cookie-banner";
import { LanguageSwitcher } from "./language-switcher";
import { Logo } from "./logo";

export async function SiteFooter() {
  const { t, href, locale } = await getI18n();
  const COLUMNS = [
    {
      title: t.footer.product,
      links: [
        { href: href("/#fonctionnalites"), label: t.header.nav.features },
        { href: href("/#methode"), label: t.header.nav.method },
        { href: href("/#tarifs"), label: t.header.nav.pricing },
        { href: href("/#faq"), label: t.header.nav.faq },
        // The blog is linked from here only, in the languages that have articles.
        ...(articlesFor(locale).length ? [{ href: href("/blog"), label: t.footer.blog }] : []),
      ],
    },
    {
      title: t.footer.account,
      links: [
        { href: href("/auth/signup"), label: t.footer.signup },
        { href: href("/auth/login"), label: t.footer.login },
        { href: href("/dashboard"), label: t.footer.dashboard },
      ],
    },
    { title: t.footer.legal, links: LEGAL_LINKS.map(({ href: path, key }) => ({ href: href(path), label: t.legalLinks[key] })) },
  ];
  return (
    <footer className="theme-dark border-t border-border/70">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo href={href("/")} />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">{t.footer.tagline}</p>
          <LanguageSwitcher className="-ml-1.5 mt-5" />
        </div>
        {COLUMNS.map((column) => (
          <nav key={column.title} className="md:col-span-2" aria-label={column.title}>
            <p className="label text-foreground">{column.title}</p>
            <ul className="mt-3 space-y-1 text-sm">
              {column.links.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="inline-block py-1.5 text-muted transition-colors hover:text-brand">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-border/70">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-muted sm:flex-row sm:justify-between">
          <span className="flex flex-wrap gap-x-4">
            {t.footer.rights}
            <CookieSettingsLink />
          </span>
          <span>{t.common.riskWarning}</span>
        </div>
      </div>
    </footer>
  );
}
