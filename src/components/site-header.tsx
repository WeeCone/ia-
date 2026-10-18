import Link from "next/link";
import { getI18n } from "@/i18n/server";
import { HeaderAccountLink } from "./header-account-link";
import { LanguageSwitcher } from "./language-switcher";
import { Logo } from "./logo";
import { ScanCta } from "./scan-cta";

export async function SiteHeader() {
  const { t, href } = await getI18n();
  const NAV = [
    { href: href("/#fonctionnalites"), label: t.header.nav.features },
    { href: href("/#video"), label: t.header.nav.demo },
    { href: href("/#methode"), label: t.header.nav.method },
    { href: href("/#tarifs"), label: t.header.nav.pricing },
    { href: href("/#faq"), label: t.header.nav.faq },
  ];
  return (
    <header className="sticky top-3 z-40 px-3 sm:top-4">
      {/* Floating pill: the page shows around it as it scrolls. */}
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-2 rounded-full border border-border/80 bg-card/70 py-2 pl-5 pr-2 shadow-[0_18px_40px_-20px_rgb(0_0_0/0.9)] backdrop-blur-xl">
        <Logo href={href("/")} />
        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map(({ href, label }) => (
            <Link key={href} href={href} className="btn-ghost whitespace-nowrap">
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <LanguageSwitcher className="mr-1 hidden lg:flex" />
          <HeaderAccountLink className="btn-ghost hidden sm:inline-flex" />
          {/* The paid trial, one click from anywhere: it opens the pricing section, where its terms are spelled out. */}
          <Link
            href={href("/#tarifs")}
            className="hidden items-center gap-2 whitespace-nowrap rounded-full border border-accent/50 bg-accent/10 px-3.5 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-accent/20 xl:inline-flex"
          >
            <span className="size-1.5 rounded-full bg-accent" aria-hidden />
            {t.header.trial}
          </Link>
          <ScanCta className="btn-primary ml-1 whitespace-nowrap rounded-full px-4 py-2.5 sm:px-5">
            <span>
              {t.header.scan}
              {/* The full label only where the bar has room for it next to the trial pill. */}
              <span className="hidden 2xl:inline">{t.header.scanSuffix}</span>
            </span>
          </ScanCta>
          {/* Phones and tablets: the navigation folds into a menu. */}
          <details className="group relative md:hidden">
            <summary className="btn-ghost cursor-pointer list-none px-2.5 text-foreground [&::-webkit-details-marker]:hidden" aria-label={t.header.menu}>
              <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden>
                <path d="M4 7h16M4 12h16M4 17h16" className="group-open:hidden" />
                <path d="M6 6l12 12M18 6L6 18" className="hidden group-open:block" />
              </svg>
            </summary>
            <nav className="panel absolute right-0 top-full mt-4 w-60 py-2" aria-label={t.header.menu}>
              {NAV.map(({ href, label }) => (
                <Link key={href} href={href} className="block px-4 py-3 font-medium text-foreground hover:text-brand">
                  {label}
                </Link>
              ))}
              <Link href={href("/#tarifs")} className="flex items-center gap-2 px-4 py-3 font-semibold text-foreground hover:text-brand">
                <span className="size-1.5 rounded-full bg-accent" aria-hidden />
                {t.header.trial}
              </Link>
              <HeaderAccountLink className="block px-4 py-3 font-medium text-foreground hover:text-brand" />
              <LanguageSwitcher className="border-t border-border px-3 pb-1 pt-3" />
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
