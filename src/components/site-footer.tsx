import Link from "next/link";
import { LEGAL_LINKS } from "@/lib/legal";

export function SiteFooter() {
  return (
    <footer className="border-t-2 border-border bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between">
        <span className="label">© NeuralTrade</span>
        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          {LEGAL_LINKS.map(({ href, label }) => (
            <Link key={href} href={href} className="label text-muted hover:text-brand">
              {label}
            </Link>
          ))}
        </nav>
      </div>
      <p className="mx-auto max-w-6xl px-4 pb-8 text-xs text-muted">
        Les analyses sont fournies à titre informatif et pédagogique et ne constituent pas un conseil en investissement. Le
        trading comporte un risque de perte en capital.
      </p>
    </footer>
  );
}
