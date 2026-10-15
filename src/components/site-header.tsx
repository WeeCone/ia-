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
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-2 px-4 py-3.5">
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
          <ScanCta className="btn-primary ml-1 px-3.5 py-2 sm:px-4">
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
            <nav className="panel absolute right-0 top-full mt-3 w-60 py-2" aria-label="Menu">
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
