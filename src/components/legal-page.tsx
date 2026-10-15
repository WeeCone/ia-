import { LAST_UPDATED } from "@/lib/legal";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

export function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="paper flex flex-1 flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 pb-24 pt-16">
        <h1 className="display border-b-2 border-foreground pb-6 text-5xl sm:text-6xl">{title}</h1>
        <p className="mt-4 text-sm text-muted">Dernière mise à jour : {LAST_UPDATED}</p>
        <div className="legal mt-10 max-w-[68ch]">{children}</div>
      </main>
      <SiteFooter />
    </div>
  );
}
