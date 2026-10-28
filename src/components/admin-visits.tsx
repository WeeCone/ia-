"use client";

import { useEffect, useState } from "react";
import type { AdminStats, FunnelCounts, LiveVisitor } from "@/lib/admin";
import { adminFetch } from "@/lib/admin-client";
import { FormError } from "./auth-card";

const PERIODS = [7, 30, 90] as const;
const int = (value: number) => value.toLocaleString("fr-FR");
const euros = (value: number) => value.toLocaleString("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
const rate = (part: number, whole: number) =>
  whole ? `${((part / whole) * 100).toLocaleString("fr-FR", { maximumFractionDigits: 1 })} %` : "—";
const shortDay = (day: string) => new Date(`${day}T12:00:00`).toLocaleDateString("fr-FR", { day: "numeric", month: "short" });

const SOURCE_LABELS: Record<string, string> = {
  direct: "Accès direct",
  instagram: "Instagram",
  facebook: "Facebook",
  tiktok: "TikTok",
  youtube: "YouTube",
  google: "Google (recherche)",
  "google-ads": "Google Ads",
  snapchat: "Snapchat",
  x: "X (Twitter)",
  linkedin: "LinkedIn",
  whatsapp: "WhatsApp",
  "chatgpt-com": "ChatGPT",
  perplexity: "Perplexity",
  "perplexity-ai": "Perplexity",
  claude: "Claude",
  "claude-ai": "Claude",
  gemini: "Gemini",
  copilot: "Copilot",
  mistral: "Le Chat (Mistral)",
  ig: "Instagram (pub)",
  fb: "Facebook (pub)",
};
const sourceLabel = (source: string) => SOURCE_LABELS[source] ?? source;

const PAGE_LABELS: Record<string, string> = {
  accueil: "Accueil",
  pricing: "Tarifs",
  dashboard: "Espace client",
  "auth-signup": "Inscription",
  "auth-login": "Connexion",
  welcome: "Retour de paiement",
};

function Tile({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="panel p-4">
      <p className="label text-muted">{label}</p>
      <p className="display mt-2 text-3xl tabular-nums">{value}</p>
      {hint && <p className="mt-1 text-xs text-muted">{hint}</p>}
    </div>
  );
}

/** Visits per day: one series, so the title names it and no legend is needed. Hover a bar for its numbers. */
function DailyChart({ days }: { days: AdminStats["days"] }) {
  const max = Math.max(1, ...days.map((day) => day.visits));
  const ticks = days.length > 1 ? [days[0], days[Math.floor(days.length / 2)], days[days.length - 1]] : days;
  return (
    <figure className="panel p-5">
      <figcaption className="flex items-baseline justify-between gap-3">
        <span className="font-medium">Visites par jour</span>
        <span className="text-xs text-muted">max {int(max)}</span>
      </figcaption>
      <div className="mt-4 flex h-40 items-end gap-[2px] border-b border-border" role="img" aria-label="Visites par jour">
        {days.map((day) => (
          <div key={day.day} className="group relative flex h-full flex-1 items-end">
            <div
              className="w-full rounded-t-[4px] bg-accent/80 transition-colors group-hover:bg-accent"
              style={{ height: `${(day.visits / max) * 100}%`, minHeight: day.visits ? 2 : 0 }}
            />
            <div className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded-lg border border-border bg-background px-3 py-2 text-xs shadow-xl group-hover:block">
              <p className="font-medium">{shortDay(day.day)}</p>
              <p className="text-muted">
                {int(day.visits)} visites · {int(day.views)} pages vues
              </p>
              <p className="text-muted">
                {int(day.signup)} inscriptions · {int(day.purchase)} achats
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2 flex justify-between text-xs text-muted">
        {ticks.map((day) => (
          <span key={day.day}>{shortDay(day.day)}</span>
        ))}
      </div>
    </figure>
  );
}

function FunnelTable({
  title,
  column,
  rows,
  empty,
}: {
  title: string;
  column: string;
  rows: (FunnelCounts & { key: string; label: React.ReactNode })[];
  empty: string;
}) {
  return (
    <section className="mt-6">
      <h3 className="display text-lg">{title}</h3>
      <div className="panel mt-3 overflow-x-auto">
        <table className="w-full min-w-[760px] text-sm">
          <thead>
            <tr className="label text-left text-muted">
              <th className="px-4 py-3 font-medium">{column}</th>
              <th className="px-4 py-3 text-right font-medium">Visites</th>
              <th className="px-4 py-3 text-right font-medium">Inscriptions</th>
              <th className="px-4 py-3 text-right font-medium">Analyses</th>
              <th className="px-4 py-3 text-right font-medium" title="Fenêtre de paiement ouverte">
                Paiements lancés
              </th>
              <th className="px-4 py-3 text-right font-medium">Achats</th>
              <th className="px-4 py-3 text-right font-medium">CA</th>
              <th className="px-4 py-3 text-right font-medium" title="Inscriptions / visites">
                Visite → inscription
              </th>
            </tr>
          </thead>
          <tbody className="font-mono tabular-nums">
            {rows.map((row) => (
              <tr key={row.key} className="border-t border-border/70">
                <td className="whitespace-nowrap px-4 py-3 font-sans font-medium">{row.label}</td>
                <td className="px-4 py-3 text-right">{int(row.visits)}</td>
                <td className="px-4 py-3 text-right">{int(row.signup)}</td>
                <td className="px-4 py-3 text-right">{int(row.analysis)}</td>
                <td className="px-4 py-3 text-right">{int(row.checkout)}</td>
                <td className="px-4 py-3 text-right">{int(row.purchase)}</td>
                <td className="px-4 py-3 text-right">{row.revenue ? euros(row.revenue) : "—"}</td>
                <td className="px-4 py-3 text-right">{rate(row.signup, row.visits)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {!rows.length && <p className="px-4 py-6 text-center text-sm text-muted">{empty}</p>}
      </div>
    </section>
  );
}

const LINK_SOURCES = ["instagram", "tiktok", "facebook", "youtube", "snapchat", "google-ads", "x", "influenceur", "autre"];

/** Builds the tagged link to put in an ad, so its visits and sales show up under its own name. */
function LinkBuilder() {
  const [source, setSource] = useState("instagram");
  const [campaign, setCampaign] = useState("");
  const [page, setPage] = useState("");
  const [lang, setLang] = useState("");
  const [copied, setCopied] = useState(false);
  const slug = (value: string) =>
    value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  const params = new URLSearchParams({ utm_source: source, utm_medium: "pub" });
  if (slug(campaign)) params.set("utm_campaign", slug(campaign));
  const url = `https://scanzivo.com${lang}${page}?${params}`;

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }

  const select = "rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground";
  return (
    <section className="panel mt-6 p-6">
      <h3 className="display text-lg">Créer le lien d&apos;une pub</h3>
      <p className="mt-1 text-sm text-muted">
        Mettez ce lien dans l&apos;annonce : ses visites, inscriptions et achats apparaîtront sous son nom dans le tableau « Campagnes ».
      </p>
      <div className="mt-4 flex flex-wrap items-end gap-3">
        <label className="field">
          <span>Plateforme</span>
          <select value={source} onChange={(event) => setSource(event.target.value)} className={select}>
            {LINK_SOURCES.map((value) => (
              <option key={value} value={value}>
                {SOURCE_LABELS[value] ?? value[0].toUpperCase() + value.slice(1)}
              </option>
            ))}
          </select>
        </label>
        <label className="field min-w-56 flex-1">
          <span>Nom de la campagne</span>
          <input value={campaign} onChange={(event) => setCampaign(event.target.value)} placeholder="ex. video-pertes-octobre" />
        </label>
        <label className="field">
          <span>Page</span>
          <select value={page} onChange={(event) => setPage(event.target.value)} className={select}>
            <option value="">Accueil</option>
            <option value="/pricing">Tarifs</option>
          </select>
        </label>
        <label className="field">
          <span>Langue</span>
          <select value={lang} onChange={(event) => setLang(event.target.value)} className={select}>
            <option value="">Français</option>
            <option value="/en">Anglais</option>
            <option value="/es">Espagnol</option>
          </select>
        </label>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <code className="min-w-0 flex-1 break-all rounded-xl border border-border bg-background/60 px-3 py-2.5 font-mono text-xs">
          {url}
        </code>
        <button type="button" onClick={copy} className="btn-primary px-4 py-2">
          {copied ? "Copié" : "Copier le lien"}
        </button>
      </div>
    </section>
  );
}

function Breakdown({ title, counts, labels = {} }: { title: string; counts: Record<string, number>; labels?: Record<string, string> }) {
  const total = Object.values(counts).reduce((sum, value) => sum + value, 0);
  const rows = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  return (
    <div className="panel p-5">
      <p className="font-medium">{title}</p>
      <ul className="mt-3 space-y-2 text-sm">
        {rows.map(([key, value]) => (
          <li key={key}>
            <div className="flex justify-between gap-3">
              <span>{labels[key] ?? key}</span>
              <span className="font-mono tabular-nums text-muted">
                {int(value)} · {rate(value, total)}
              </span>
            </div>
            <div className="mt-1 h-1.5 rounded-full bg-border/60">
              <div className="h-full rounded-full bg-accent/80" style={{ width: `${total ? (value / total) * 100 : 0}%` }} />
            </div>
          </li>
        ))}
        {!rows.length && <li className="text-muted">Pas encore de données.</li>}
      </ul>
    </div>
  );
}

const LIVE_REFRESH_MS = 10_000;
const LIVE_ROWS = 15;

const pageLabel = (page: string) => PAGE_LABELS[page] ?? page;

function onSite(seconds: number) {
  if (seconds < 60) return "à l'instant";
  const minutes = Math.floor(seconds / 60);
  return minutes < 60 ? `depuis ${minutes} min` : `depuis ${Math.floor(minutes / 60)} h ${String(minutes % 60).padStart(2, "0")}`;
}

/** Who is on the site right now, refreshed every 10 s while the admin page is in front. Null until the first answer. */
export function useLiveVisitors(enabled: boolean) {
  const [visitors, setVisitors] = useState<LiveVisitor[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Only once the admin is confirmed: no polling for a page still loading or refused.
    if (!enabled) return;
    let stale = false;
    const load = () => {
      if (document.hidden) return;
      adminFetch("/api/admin/live")
        .then((data: { visitors: LiveVisitor[] }) => {
          if (stale) return;
          setVisitors(data.visitors);
          setError(false);
        })
        .catch(() => !stale && setError(true));
    };
    load();
    const timer = setInterval(load, LIVE_REFRESH_MS);
    document.addEventListener("visibilitychange", load);
    return () => {
      stale = true;
      clearInterval(timer);
      document.removeEventListener("visibilitychange", load);
    };
  }, [enabled]);

  return { visitors, error };
}

export type LiveState = ReturnType<typeof useLiveVisitors>;

function LiveDot({ on }: { on: boolean }) {
  return (
    <span className="relative flex size-3" aria-hidden>
      {on && <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />}
      <span className={`relative inline-flex size-3 rounded-full ${on ? "bg-accent" : "bg-border"}`} />
    </span>
  );
}

/** The live count beside the admin title, on every tab. */
export function LiveBadge({ live, onClick }: { live: LiveState; onClick: () => void }) {
  const count = live.visitors?.length ?? 0;
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2.5 rounded-full border border-border px-4 py-2 text-sm hover:border-accent/60"
      aria-live="polite"
    >
      <LiveDot on={count > 0} />
      <span>
        <strong className="font-semibold tabular-nums">{live.visitors ? int(count) : "–"}</strong>{" "}
        <span className="text-muted">{count > 1 ? "personnes sur le site" : "personne sur le site"}</span>
      </span>
    </button>
  );
}

/** The pages open on the site right now, with where each visitor came from. */
function LiveNow({ live: { visitors, error } }: { live: LiveState }) {
  const count = visitors?.length ?? 0;
  const byPage = Object.entries(
    (visitors ?? []).reduce<Record<string, number>>((acc, visitor) => ({ ...acc, [visitor.page]: (acc[visitor.page] ?? 0) + 1 }), {}),
  ).sort((a, b) => b[1] - a[1]);

  return (
    <section id="en-direct" className="panel scroll-mt-6 p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <LiveDot on={count > 0} />
          <p className="label text-muted">En ce moment</p>
        </div>
        <p className="text-xs text-muted">{error ? "Mise à jour impossible, nouvel essai dans 10 s." : "Mis à jour toutes les 10 secondes"}</p>
      </div>
      <p className="mt-3 flex items-baseline gap-2">
        <span className="display text-5xl tabular-nums">{visitors ? int(count) : "–"}</span>
        <span className="text-muted">{count > 1 ? "visiteurs sur le site" : "visiteur sur le site"}</span>
      </p>
      {byPage.length > 0 && (
        <p className="mt-2 text-sm text-muted">
          {byPage.map(([page, value]) => `${pageLabel(page)} ${int(value)}`).join(" · ")}
        </p>
      )}

      {count > 0 && (
        <ul className="mt-4 divide-y divide-border/70 border-t border-border/70 text-sm">
          {visitors!.slice(0, LIVE_ROWS).map((visitor) => (
            <li key={visitor.id} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-2.5">
              <span className="font-medium">{pageLabel(visitor.page)}</span>
              <span className="flex flex-wrap gap-x-3 text-muted">
                <span>
                  {sourceLabel(visitor.source)}
                  {visitor.campaign && <span className="text-xs"> · {visitor.campaign}</span>}
                </span>
                <span>{visitor.device === "mobile" ? "Mobile" : "Ordinateur"}</span>
                <span className="uppercase">{visitor.locale}</span>
                <span className="tabular-nums">{onSite(visitor.onSiteSeconds)}</span>
              </span>
            </li>
          ))}
          {count > LIVE_ROWS && <li className="py-2.5 text-muted">et {int(count - LIVE_ROWS)} autres</li>}
        </ul>
      )}
      {visitors && count === 0 && <p className="mt-2 text-sm text-muted">Personne sur le site pour l&apos;instant.</p>}
    </section>
  );
}

/** Anonymous audience stats and the sign-up / purchase funnel by source and by ad campaign. */
export function VisitsTab({ reloadKey, live }: { reloadKey: number; live: LiveState }) {
  const [period, setPeriod] = useState<(typeof PERIODS)[number]>(30);
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let stale = false;
    adminFetch(`/api/admin/stats?days=${period}`)
      .then((data: AdminStats) => {
        if (stale) return;
        setStats(data);
        setError(null);
      })
      .catch((err) => !stale && setError(err instanceof Error ? err.message : "Chargement impossible."));
    return () => {
      stale = true;
    };
  }, [period, reloadKey]);

  const totals = stats?.totals;
  return (
    <section className="mt-6">
      <LiveNow live={live} />

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-1 rounded-xl border border-border p-1" role="group" aria-label="Période">
          {PERIODS.map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setPeriod(value)}
              aria-pressed={period === value}
              className={`rounded-lg px-3 py-1.5 text-sm ${period === value ? "bg-foreground/10 font-medium" : "text-muted hover:text-foreground"}`}
            >
              {value} jours
            </button>
          ))}
        </div>
        <p className="text-xs text-muted">Mesure anonyme, sans cookie. Vos propres visites ne sont pas comptées.</p>
      </div>

      {error && (
        <div className="mt-4">
          <FormError message={error} />
        </div>
      )}
      {!stats && !error && <p className="mt-6 text-sm text-muted">Chargement des statistiques…</p>}

      {stats && totals && (
        <>
          <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
            <Tile label="Visites" value={int(totals.visits)} hint={`${int(totals.views)} pages vues`} />
            <Tile label="Inscriptions" value={int(totals.signup)} hint={`${rate(totals.signup, totals.visits)} des visites`} />
            <Tile label="Analyses" value={int(totals.analysis)} />
            <Tile
              label="Achats"
              value={int(totals.purchase)}
              hint={`${rate(totals.purchase, totals.signup)} des inscrits · ${int(totals.checkout)} paiements lancés`}
            />
            <Tile label="CA suivi" value={euros(totals.revenue)} hint="achats attribués à une source" />
          </div>

          <div className="mt-6">
            <DailyChart days={stats.days} />
          </div>

          <FunnelTable
            title="Sources"
            column="Source"
            rows={stats.sources.map((row) => ({ ...row, key: row.source, label: sourceLabel(row.source) }))}
            empty="Pas encore de visite enregistrée sur cette période."
          />
          <FunnelTable
            title="Campagnes"
            column="Campagne"
            rows={stats.campaigns.map((row) => ({
              ...row,
              key: `${row.source}/${row.campaign}`,
              label: (
                <>
                  {row.campaign ?? "Sans nom"} <span className="text-xs font-normal text-muted">· {sourceLabel(row.source)}</span>
                </>
              ),
            }))}
            empty="Aucune visite venue d'un lien de pub. Créez-en un ci-dessous."
          />

          <LinkBuilder />

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <Breakdown
              title="Pages les plus vues"
              counts={Object.fromEntries(stats.pages.map((row) => [row.page, row.views]))}
              labels={PAGE_LABELS}
            />
            <Breakdown title="Appareils" counts={stats.devices} labels={{ mobile: "Mobile", desktop: "Ordinateur" }} />
            <Breakdown title="Langue du site" counts={stats.locales} labels={{ fr: "Français", en: "Anglais", es: "Espagnol" }} />
          </div>
        </>
      )}
    </section>
  );
}
