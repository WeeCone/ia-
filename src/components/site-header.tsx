import Link from "next/link";
import { Logo } from "./logo";

export function SiteHeader() {
  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-5">
      <Logo />
      <nav className="flex items-center gap-1 sm:gap-2">
        <Link href="/pricing" className="btn-ghost">Tarifs</Link>
        <Link href="/auth/login" className="btn-ghost">Connexion</Link>
        <Link href="/auth/signup" className="btn-primary">Essai gratuit</Link>
      </nav>
    </header>
  );
}
