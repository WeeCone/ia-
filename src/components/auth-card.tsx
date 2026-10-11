import { Logo } from "./logo";

export function AuthCard({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <main className="grid flex-1 lg:grid-cols-2">
      {/* Editorial side panel, desktop only. */}
      <aside className="hidden flex-col justify-between border-r border-border bg-surface p-12 lg:flex">
        <Logo />
        <blockquote className="font-display text-5xl leading-[1.05]">
          « Le graphique dit déjà tout. Encore faut-il <em className="text-brand">savoir le lire.</em> »
        </blockquote>
        <p className="label">Analyse technique par IA · Crypto · Forex · Actions</p>
      </aside>
      <div className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">
          <div className="mb-10 lg:hidden">
            <Logo />
          </div>
          <h1 className="font-display text-5xl leading-none">{title}</h1>
          <p className="mt-3 text-sm text-muted">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </main>
  );
}

export function FormError({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <p role="alert" className="border-l-2 border-bear bg-bear/10 px-3 py-2 text-sm text-bear">
      {message}
    </p>
  );
}

export function Divider() {
  return (
    <div className="label my-6 flex items-center gap-3">
      <span className="h-px flex-1 bg-border" />
      ou
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}
