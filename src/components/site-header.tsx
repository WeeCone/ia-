import Link from "next/link";
import { Logo } from "./logo";
import { ScanCta } from "./scan-cta";

const NAV = [
  { href: "/#demo", label: "Démo" },
  { href: "/#verdicts", label: "Les verdicts" },
  { href: "/#lecture", label: "Ce qui est lu" },
  { href: "/#tarifs", label: "Tarifs" },
  { href: "/#faq", label: "FAQ" },
];

/** Green band across the top of every public page, like a book's cover strip. */
export function SiteHeader() {
  return (
    <header className="board sticky top-0 z-40 border-b border-border">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Logo />
        <nav className="hidden items-center lg:flex" aria-label="Navigation principale">
          {NAV.map(({ href, label }) => (
            <Link key={href} href={href} className="btn-ghost text-muted hover:text-foreground">
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <Link href="/auth/login" className="btn-ghost hidden text-muted hover:text-foreground sm:inline-flex">
            Connexion
          </Link>
          <ScanCta className="btn-primary px-3.5 py-2 sm:px-4">
            <span>
              Analyser<span className="hidden sm:inline"> un graphique</span>
            </span>
          </ScanCta>
          <details className="group relative lg:hidden">
            <summary className="btn-ghost cursor-pointer list-none px-2.5 text-foreground [&::-webkit-details-marker]:hidden" aria-label="Menu">
              <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="square" aria-hidden>
                <path d="M4 7h16M4 12h16M4 17h16" className="group-open:hidden" />
                <path d="M6 6l12 12M18 6L6 18" className="hidden group-open:block" />
              </svg>
            </summary>
            <nav className="paper absolute right-0 top-full mt-3 w-60 border border-border py-2 shadow-[0_18px_30px_-20px_rgb(20_22_19/0.6)]" aria-label="Menu">
              {[...NAV, { href: "/auth/login", label: "Connexion" }].map(({ href, label }) => (
                <Link key={href} href={href} className="block px-4 py-3 font-medium hover:bg-surface">
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
