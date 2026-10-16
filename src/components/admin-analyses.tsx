"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useI18n } from "@/i18n/client";
import type { AdminAnalysis } from "@/lib/admin";
import { adminFetch } from "@/lib/admin-client";
import type { ChartAnalysis } from "@/lib/analysis";
import { auth } from "@/lib/firebase";
import { AnalysisResult } from "./analysis-result";
import { AnnotatedChart } from "./annotated-chart";
import { FormError } from "./auth-card";

const dateTime = (ms: number | null) =>
  ms ? new Date(ms).toLocaleString("fr-FR", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" }) : "—";

const actionChip: Record<string, string> = {
  "acheter sur confirmation": "border-bull/40 bg-bull/10 text-bull",
  "vendre sur confirmation": "border-bear/40 bg-bear/10 text-bear",
};

/** The full report of one analysis, as the client saw it, with its screenshot when stored. */
function AnalysisDetail({ row, onClose }: { row: AdminAnalysis; onClose: () => void }) {
  const [analysis, setAnalysis] = useState<ChartAnalysis | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let stale = false;
    let objectUrl: string | null = null;
    const path = `/api/admin/analyses/${row.uid}/${row.id}`;
    adminFetch(path)
      .then((data: { analysis: ChartAnalysis }) => !stale && setAnalysis(data.analysis))
      .catch((err) => !stale && setError(err instanceof Error ? err.message : "Chargement impossible."));
    if (row.hasImage) {
      // The screenshot needs the admin token, so it comes as a blob rather than a plain <img src>.
      auth.currentUser
        ?.getIdToken()
        .then((token) => fetch(`${path}?image=1`, { headers: { Authorization: `Bearer ${token}` } }))
        .then((response) => (response.ok ? response.blob() : null))
        .then((blob) => {
          if (stale || !blob) return;
          objectUrl = URL.createObjectURL(blob);
          setImageUrl(objectUrl);
        })
        .catch(() => {});
    }
    return () => {
      stale = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [row]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 p-4 backdrop-blur-sm sm:p-8"
      role="dialog"
      aria-modal
      aria-label="Analyse"
      onClick={onClose}
    >
      <div
        className="theme-light mx-auto max-w-4xl rounded-3xl bg-background p-5 text-foreground shadow-2xl sm:p-8"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="display text-2xl">
              {row.asset} <span className="text-muted">· {row.timeframe}</span>
            </p>
            <p className="mt-1 text-sm text-muted">
              {row.displayName || "—"} · {row.email} · {dateTime(row.createdAt)}
            </p>
            {row.note && <p className="mt-2 text-sm">Contexte saisi : « {row.note} »</p>}
          </div>
          <button type="button" onClick={onClose} className="btn-secondary px-4 py-2">
            Fermer
          </button>
        </div>
        <div className="mt-6 space-y-6">
          {error && <FormError message={error} />}
          {!analysis && !error && <p className="text-sm text-muted">Chargement du rapport…</p>}
          {imageUrl && analysis?.is_chart && <AnnotatedChart imageUrl={imageUrl} marks={analysis.level_marks ?? []} />}
          {analysis && <AnalysisResult analysis={analysis} />}
        </div>
      </div>
    </div>
  );
}

/** Every search the clients ran, newest first: who, which market, which timeframe, and the verdict they got. */
export function AnalysesTab({ query, onQuery, reloadKey }: { query: string; onQuery: (value: string) => void; reloadKey: number }) {
  const { t } = useI18n();
  const [rows, setRows] = useState<AdminAnalysis[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [kind, setKind] = useState<"all" | "charts" | "refused">("all");
  const [open, setOpen] = useState<AdminAnalysis | null>(null);

  useEffect(() => {
    let stale = false;
    adminFetch("/api/admin/analyses")
      .then((data: { analyses: AdminAnalysis[] }) => {
        if (stale) return;
        setRows(data.analyses);
        setError(null);
      })
      .catch((err) => !stale && setError(err instanceof Error ? err.message : "Chargement impossible."));
    return () => {
      stale = true;
    };
  }, [reloadKey]);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return (rows ?? []).filter(
      (row) =>
        (kind === "all" || (kind === "charts") === row.isChart) &&
        (!needle ||
          [row.email, row.displayName, row.uid, row.asset, row.timeframe, row.note].some((value) => value?.toLowerCase().includes(needle))),
    );
  }, [rows, query, kind]);

  const topAssets = useMemo(() => {
    const counts = new Map<string, number>();
    for (const row of rows ?? []) if (row.isChart) counts.set(row.asset, (counts.get(row.asset) ?? 0) + 1);
    return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6);
  }, [rows]);

  const onClose = useCallback(() => setOpen(null), []);

  return (
    <section className="mt-6">
      {topAssets.length > 0 && (
        <div className="mb-4 flex flex-wrap items-center gap-2 text-sm">
          <span className="label text-muted">Les plus analysés</span>
          {topAssets.map(([asset, count]) => (
            <button key={asset} type="button" onClick={() => onQuery(asset)} className="chip border-border hover:border-accent">
              {asset} <span className="text-muted">{count}</span>
            </button>
          ))}
        </div>
      )}
      <div className="flex flex-wrap gap-3">
        <input
          value={query}
          onChange={(event) => onQuery(event.target.value)}
          placeholder="Rechercher un client, un actif, une unité de temps…"
          className="min-w-60 flex-1 rounded-xl border border-border bg-background/80 px-3.5 py-2.5 text-sm outline-none focus:border-brand"
        />
        <select
          value={kind}
          onChange={(event) => setKind(event.target.value as typeof kind)}
          className="rounded-xl border border-border bg-background px-3 py-2.5 text-sm"
        >
          <option value="all">Toutes</option>
          <option value="charts">Graphiques analysés</option>
          <option value="refused">Images refusées (non débitées)</option>
        </select>
        {query && (
          <button type="button" onClick={() => onQuery("")} className="btn-ghost">
            Effacer
          </button>
        )}
      </div>
      {error && (
        <div className="mt-4">
          <FormError message={error} />
        </div>
      )}
      <div className="panel mt-4 overflow-x-auto">
        <table className="w-full min-w-[820px] text-sm">
          <thead>
            <tr className="label text-left text-muted">
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Client</th>
              <th className="px-4 py-3 font-medium">Actif</th>
              <th className="px-4 py-3 font-medium">UT</th>
              <th className="px-4 py-3 font-medium">Verdict</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {filtered.map((row) => (
              <tr
                key={`${row.uid}/${row.id}`}
                className="cursor-pointer border-t border-border/70 align-middle hover:bg-foreground/[0.03]"
                onClick={() => setOpen(row)}
              >
                <td className="whitespace-nowrap px-4 py-3 text-xs text-muted">{dateTime(row.createdAt)}</td>
                <td className="px-4 py-3">
                  <p className="font-medium">{row.displayName || "—"}</p>
                  <p className="text-xs text-muted">{row.email}</p>
                </td>
                <td className="px-4 py-3 font-medium">
                  {row.asset}
                  {row.note && (
                    <p className="max-w-56 truncate text-xs font-normal text-muted" title={row.note}>
                      « {row.note} »
                    </p>
                  )}
                </td>
                <td className="px-4 py-3 font-mono text-xs">{row.timeframe}</td>
                <td className="px-4 py-3">
                  {!row.isChart ? (
                    <span className="chip border-border text-muted">Pas un graphique</span>
                  ) : row.action ? (
                    <span className={`chip ${actionChip[row.action] ?? "border-border text-muted"}`}>
                      {t.enums.action[row.action as keyof typeof t.enums.action] ?? row.action}
                    </span>
                  ) : (
                    <span className="text-xs text-muted">—</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  <span className="btn-ghost px-2 py-1 text-xs">Voir</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows && !filtered.length && <p className="px-4 py-6 text-center text-sm text-muted">Aucune analyse ne correspond.</p>}
        {!rows && !error && <p className="px-4 py-6 text-center text-sm text-muted">Chargement des analyses…</p>}
      </div>
      <p className="mt-2 text-xs text-muted">
        Les 30 dernières analyses de chaque client, 500 au plus. Cliquez une ligne pour ouvrir le rapport complet.
      </p>
      {open && <AnalysisDetail row={open} onClose={onClose} />}
    </section>
  );
}
