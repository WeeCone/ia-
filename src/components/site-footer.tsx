import Link from "next/link";
import { LEGAL_LINKS } from "@/lib/legal";
import { Logo } from "./logo";

const COLUMNS = [
  {
    title: "Produit",
    links: [
      { href: "/#demo", label: "Démo" },
      { href: "/#verdicts", label: "Les verdicts" },
      { href: "/#tarifs", label: "Tarifs" },
      { href: "/#faq", label: "Questions" },
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
    <footer className="board border-t border-border">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo />
          <p className="mt-4 max-w-xs leading-relaxed text-muted">Votre graphique, commenté comme une partie : une lecture, un verdict, un plan.</p>
        </div>
        {COLUMNS.map((column) => (
          <nav key={column.title} className="md:col-span-2" aria-label={column.title}>
            <p className="font-[family-name:var(--font-bodoni)] text-lg font-bold">{column.title}</p>
            <ul className="mt-3 space-y-2.5 text-sm">
              {column.links.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-muted underline-offset-4 hover:text-foreground hover:underline">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-muted sm:flex-row sm:justify-between">
          <span>© 2026 Scanzivo. Tous droits réservés.</span>
          <span>Ceci n&apos;est pas un conseil en investissement. Le trading comporte un risque de perte en capital.</span>
        </div>
      </div>
    </footer>
  );
}
