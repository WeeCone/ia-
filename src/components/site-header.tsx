import Link from "next/link";
import { Logo } from "./logo";
import { ScanCta } from "./scan-cta";

const NAV = [
  { href: "/#fonctionnalites", label: "Fonctionnalités" },
  { href: "/#video", label: "Démo" },
  { href: "/#methode", label: "Comment ça marche" },
  { href: "/pricing", label: "Tarifs" },
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
          <Link href="/auth/login" className="btn-ghost">Connexion</Link>
          <ScanCta className="btn-primary ml-1 hidden px-4 py-2 sm:inline-flex" />
        </div>
      </div>
    </header>
  );
}
