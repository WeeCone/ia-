import { Logo } from "./logo";

export function AuthCard({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <main className="grid flex-1 lg:grid-cols-2">
      {/* Loud side panel, desktop only. */}
      <aside className="hidden flex-col justify-between border-r-2 border-border bg-brand p-12 lg:flex text-background">
        <Logo />
        <p className="display text-7xl">
          Le graphique dit tout. <span className="bg-surface px-2 text-brand [box-decoration-break:clone]">Encore faut-il le lire.</span>
        </p>
        <p className="label">Analyse technique par IA · Crypto · Forex · Actions</p>
      </aside>
      <div className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">
          <div className="mb-10 lg:hidden">
            <Logo />
          </div>
          <h1 className="display text-5xl">{title}</h1>
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
    <p role="alert" className="border-2 border-border bg-bear px-3 py-2 text-sm font-semibold text-background">
      {message}
    </p>
  );
}

export function Divider() {
  return (
    <div className="label my-6 flex items-center gap-3">
      <span className="h-0.5 flex-1 bg-border" />
      ou
      <span className="h-0.5 flex-1 bg-border" />
    </div>
  );
}
