import Link from "next/link";
import { Logo } from "./logo";

export function SiteHeader() {
  return (
    <header className="border-b-2 border-border bg-card">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-2 px-4 py-4">
        <Logo />
        <nav className="flex items-center gap-1">
          <Link href="/pricing" className="btn-ghost">Tarifs</Link>
          <Link href="/auth/login" className="btn-ghost hidden sm:inline-flex">Connexion</Link>
          <Link href="/auth/signup" className="btn-primary ml-2 hidden px-4 py-2 sm:inline-flex">Commencer</Link>
        </nav>
      </div>
    </header>
  );
}
