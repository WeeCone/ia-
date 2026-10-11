import { LAST_UPDATED } from "@/lib/legal";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

export function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 pb-24 pt-16">
        <h1 className="display text-5xl sm:text-6xl">{title}</h1>
        <p className="label mt-4 text-muted">Dernière mise à jour : {LAST_UPDATED}</p>
        <div className="legal mt-12">{children}</div>
      </main>
      <SiteFooter />
    </div>
  );
}
