import { Logo } from "./logo";
import { PriceNote } from "./price-note";

export function AuthCard({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <main className="paper grid flex-1 lg:grid-cols-2">
      {/* Board-green side panel, desktop only. */}
      <aside className="board hidden flex-col justify-between border-r border-border p-12 lg:flex">
        <Logo />
        <p className="display text-6xl">
          Le graphique dit tout. <em className="font-normal">Encore faut-il le lire.</em>
        </p>
        <PriceNote className="text-muted" />
      </aside>
      <div className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">
          <div className="mb-10 lg:hidden">
            <Logo />
          </div>
          <h1 className="display text-4xl">{title}</h1>
          <p className="mt-3 text-muted">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </main>
  );
}

export function FormError({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <p role="alert" className="rounded-[3px] border border-bear/40 bg-bear/10 px-3 py-2 text-sm font-medium text-bear">
      {message}
    </p>
  );
}

export function Divider() {
  return (
    <div className="my-6 flex items-center gap-3 text-sm text-muted">
      <span className="h-px flex-1 bg-border" />
      ou
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}
