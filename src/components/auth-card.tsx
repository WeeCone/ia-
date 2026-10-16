"use client";

import { useI18n } from "@/i18n/client";
import { Logo } from "./logo";

export function AuthCard({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  const { t, href } = useI18n();
  return (
    <main id="contenu" className="theme-light grid flex-1 lg:grid-cols-2">
      {/* Glowing side panel, desktop only. */}
      <aside className="theme-dark relative isolate hidden flex-col justify-between overflow-hidden border-r border-border bg-surface p-12 lg:flex">
        <div className="grid-bg absolute inset-0 -z-10" aria-hidden />
        <div className="absolute -left-20 top-1/3 -z-10 h-96 w-96 rounded-full bg-brand/20 blur-[120px]" aria-hidden />
        <div className="absolute -right-10 bottom-0 -z-10 h-72 w-72 rounded-full bg-accent/15 blur-[110px]" aria-hidden />
        <Logo href={href("/")} />
        <p className="display text-6xl">
          {t.auth.asideTitleA} <span className="mark">{t.auth.asideTitleB}</span>
        </p>
        <p className="label text-muted">{t.auth.asideMarkets}</p>
      </aside>
      <div className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">
          <div className="mb-10 lg:hidden">
            <Logo href={href("/")} />
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
    <p role="alert" className="rounded-xl border border-bear/40 bg-bear/10 px-3 py-2 text-sm font-medium text-bear">
      {message}
    </p>
  );
}

export function Divider() {
  const { t } = useI18n();
  return (
    <div className="label my-6 flex items-center gap-3 text-muted">
      <span className="h-px flex-1 bg-border" />
      {t.auth.or}
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}
