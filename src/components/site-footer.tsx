import Link from "next/link";
import { LEGAL_LINKS } from "@/lib/legal";
import { Logo } from "./logo";

const COLUMNS = [
  {
    title: "Produit",
    links: [
      { href: "/#fonctionnalites", label: "Fonctionnalités" },
      { href: "/#methode", label: "Comment ça marche" },
      { href: "/#tarifs", label: "Tarifs" },
      { href: "/#faq", label: "FAQ" },
    ],
  },
  {
    title: "Compte",
    links: [
      { href: "/auth/signup", label: "Créer un compte" },
      { href: "/auth/login", label: "Connexion" },
      { href: "/dashboard", label: "Tableau de bord" },
    ],
  },
  { title: "Légal", links: [...LEGAL_LINKS] },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border/70 bg-surface/60">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            L&apos;analyse technique par IA, à partir d&apos;une simple capture de graphique.
          </p>
        </div>
        {COLUMNS.map((column) => (
          <nav key={column.title} className="md:col-span-2" aria-label={column.title}>
            <p className="label text-foreground">{column.title}</p>
            <ul className="mt-4 space-y-3 text-sm">
              {column.links.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-muted hover:text-brand">
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
          <span>© 2026 Scanzivo. Tous droits réservés.</span>
          <span>Ceci n&apos;est pas un conseil en investissement. Le trading comporte un risque de perte en capital.</span>
        </div>
      </div>
    </footer>
  );
}
