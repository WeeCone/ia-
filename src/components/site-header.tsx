import Link from "next/link";
import { Logo } from "./logo";
import { ScanCta } from "./scan-cta";

const NAV = [
  { href: "/#fonctionnalites", label: "Fonctionnalités" },
  { href: "/#video", label: "Démo" },
  { href: "/#methode", label: "Comment ça marche" },
  { href: "/#tarifs", label: "Tarifs" },
  { href: "/#faq", label: "FAQ" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-3 z-40 px-3 sm:top-4">
      {/* Floating pill: the page shows around it as it scrolls. */}
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-2 rounded-full border border-border/80 bg-card/70 py-2 pl-5 pr-2 shadow-[0_18px_40px_-20px_rgb(0_0_0/0.9)] backdrop-blur-xl">
        <Logo />
        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map(({ href, label }) => (
            <Link key={href} href={href} className="btn-ghost">
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <Link href="/auth/login" className="btn-ghost hidden sm:inline-flex">
            Connexion
          </Link>
          <ScanCta className="btn-primary ml-1 rounded-full px-4 py-2.5 sm:px-5">
            <span>
              Scanner<span className="hidden sm:inline"> un graphique</span>
            </span>
          </ScanCta>
          {/* Phones and tablets: the navigation folds into a menu. */}
          <details className="group relative md:hidden">
            <summary className="btn-ghost cursor-pointer list-none px-2.5 text-foreground [&::-webkit-details-marker]:hidden" aria-label="Menu">
              <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden>
                <path d="M4 7h16M4 12h16M4 17h16" className="group-open:hidden" />
                <path d="M6 6l12 12M18 6L6 18" className="hidden group-open:block" />
              </svg>
            </summary>
            <nav className="panel absolute right-0 top-full mt-4 w-60 py-2" aria-label="Menu">
              {[...NAV, { href: "/auth/login", label: "Connexion" }].map(({ href, label }) => (
                <Link key={href} href={href} className="block px-4 py-3 font-medium text-foreground hover:text-brand">
                  {label}
                </Link>
              ))}
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
