import Link from "next/link";
import { formatEur } from "@/i18n/format";
import { getI18n } from "@/i18n/server";
import { OFFER_PRICE_EUR } from "@/lib/plans";
import { HeaderAccountLink } from "./header-account-link";
import { LanguageMenu } from "./language-menu";
import { LanguageSwitcher } from "./language-switcher";
import { Logo } from "./logo";
import { ScanCta } from "./scan-cta";

export async function SiteHeader() {
  const { t, locale, href } = await getI18n();
  // The entry price, picked out in the brand green.
  const from = (
    <>
      {t.header.from} <strong className="font-bold text-accent">{formatEur(locale, OFFER_PRICE_EUR.starter)}</strong>
    </>
  );
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
          <LanguageMenu className="hidden xl:block" />
          <HeaderAccountLink className="btn-ghost hidden sm:inline-flex" />
          {/* The packs, next to the main button: the entry price and a way to the comparison. */}
          <Link href={href("/#tarifs")} className="btn-secondary ml-1 hidden whitespace-nowrap rounded-full px-4 py-2.5 lg:inline-flex">
            {from}
          </Link>
          <ScanCta className="btn-primary ml-1 whitespace-nowrap rounded-full px-4 py-2.5 sm:px-5">
            <span>
              {t.header.scan}
              {/* The full label only where the bar has room for it. */}
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
              <HeaderAccountLink className="block px-4 py-3 font-medium text-foreground hover:text-brand" />
              <LanguageSwitcher className="border-t border-border px-3 pb-1 pt-3" />
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
