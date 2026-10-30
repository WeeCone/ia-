"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuth } from "@/components/auth-provider";
import { FormError } from "@/components/auth-card";
import { Logo } from "@/components/logo";
import { AnalysesTab } from "@/components/admin-analyses";
import { LiveBadge, useLiveVisitors, VisitsTab } from "@/components/admin-visits";
import type { AdminOverview, AdminReview, AdminUser, ReviewStatus } from "@/lib/admin";
import { adminFetch } from "@/lib/admin-client";
import { optOutOfTracking } from "@/lib/track";
import { auth } from "@/lib/firebase";
import { MONTHLY_BUDGET_EUR, OFFER_PRICE_EUR as PRICE, PLAN_LABELS, type Plan } from "@/lib/plans";

const euros = (value: number) => value.toLocaleString("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
const date = (ms: number | null) =>
  ms ? new Date(ms).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" }) : "—";

const planChip: Record<Plan, string> = {
  none: "border-border text-muted",
  starter: "border-amber-400/40 bg-amber-400/10 text-warn",
  monthly: "border-brand/40 bg-brand/10 text-brand",
  lifetime: "border-accent/40 bg-accent/10 text-accent",
};

function Stat({ label, value, hint }: { label: string; value: React.ReactNode; hint?: string }) {
  return (
    <div className="panel p-4">
      <p className="label text-muted">{label}</p>
      <p className="display mt-2 text-3xl tabular-nums">{value}</p>
      {hint && <p className="mt-1 text-xs text-muted">{hint}</p>}
    </div>
  );
}

function UserRow({ user, onSaved, onShowAnalyses }: { user: AdminUser; onSaved: () => void; onShowAnalyses: () => void }) {
  const [editing, setEditing] = useState(false);
  const [plan, setPlan] = useState<Plan>(user.plan);
  const [credits, setCredits] = useState(String(user.credits));
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function save() {
    setPending(true);
    setError(null);
    try {
      await adminFetch(`/api/admin/users/${user.uid}`, { method: "PATCH", body: JSON.stringify({ plan, credits: Number(credits) }) });
      setEditing(false);
      onSaved();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Enregistrement impossible.");
    } finally {
      setPending(false);
    }
  }

  return (
    <>
      <tr className="border-t border-border/70 align-middle">
        <td className="px-4 py-3">
          <p className="font-medium">{user.displayName || "—"}</p>
          <p className="text-xs text-muted">{user.email}</p>
        </td>
        <td className="px-4 py-3">
          <span className={`chip ${planChip[user.plan]}`}>{PLAN_LABELS[user.plan]}</span>
          {user.trial && <span className="ml-1.5 chip border-accent/40 text-accent">Essai</span>}
        </td>
        <td className="px-4 py-3 text-right font-mono tabular-nums">{user.credits}</td>
        <td className="px-4 py-3 text-right font-mono tabular-nums">
          {user.analyses ? (
            <button
              type="button"
              onClick={onShowAnalyses}
              className="underline decoration-border underline-offset-4 hover:text-accent"
              title="Voir ses analyses"
            >
              {user.analyses}
            </button>
          ) : (
            0
          )}
        </td>
        <td className={`px-4 py-3 text-right font-mono tabular-nums ${user.spendEur >= MONTHLY_BUDGET_EUR * 0.8 ? "text-bear" : ""}`}>
          {user.spendEur.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
        </td>
        <td className="px-4 py-3 text-xs text-muted">{date(user.createdAt)}</td>
        <td className="px-4 py-3 text-xs text-muted">{user.hasStripe ? "Oui" : "—"}</td>
        <td className="px-4 py-3 text-right">
          <button type="button" onClick={() => setEditing((value) => !value)} className="btn-ghost px-2 py-1 text-xs">
            {editing ? "Fermer" : "Modifier"}
          </button>
        </td>
      </tr>
      {editing && (
        <tr className="bg-background/40">
          <td colSpan={7} className="px-4 py-4">
            <div className="flex flex-wrap items-end gap-4">
              <label className="field">
                <span>Offre</span>
                <select
                  value={plan}
                  onChange={(event) => setPlan(event.target.value as Plan)}
                  className="rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground"
                >
                  {(["none", "monthly", "lifetime"] as Plan[]).map((value) => (
                    <option key={value} value={value}>
                      {PLAN_LABELS[value]}
                    </option>
                  ))}
                </select>
              </label>
              <label className="field w-32">
                <span>Crédits</span>
                <input type="number" min={0} max={10000} value={credits} onChange={(event) => setCredits(event.target.value)} />
              </label>
              <button type="button" onClick={save} disabled={pending} className="btn-primary px-4 py-2.5">
                {pending ? "Enregistrement…" : "Enregistrer"}
              </button>
              <p className="max-w-sm text-xs text-muted">
                Modifie seulement l&apos;accès sur Scanzivo. Pour annuler ou rembourser un paiement, passez par Stripe.
              </p>
            </div>
            <div className="mt-3">
              <FormError message={error} />
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

function ReviewCard({ review, onChanged }: { review: AdminReview; onChanged: () => void }) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function setStatus(status: ReviewStatus) {
    setPending(true);
    setError(null);
    try {
      await adminFetch(`/api/admin/reviews/${review.uid}`, { method: "PATCH", body: JSON.stringify({ status }) });
      onChanged();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Action impossible.");
    } finally {
      setPending(false);
    }
  }

  const statusChip = {
    pending: "border-amber-400/40 bg-amber-400/10 text-amber-200",
    approved: "border-bull/40 bg-bull/10 text-bull",
    hidden: "border-border text-muted",
  }[review.status];
  const statusLabel = { pending: "En attente", approved: "Approuvé", hidden: "Masqué" }[review.status];

  return (
    <li className="panel p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-accent" aria-label={`${review.rating} sur 5`}>
          {"★".repeat(review.rating)}
          <span className="text-border">{"★".repeat(5 - review.rating)}</span>
        </p>
        <div className="flex flex-wrap gap-2">
          <span className={`chip ${review.publishConsent ? "border-brand/40 bg-brand/10 text-brand" : "border-border text-muted"}`}>
            {review.publishConsent ? "Publication autorisée" : "Pas de publication"}
          </span>
          <span className={`chip ${statusChip}`}>{statusLabel}</span>
        </div>
      </div>
      <blockquote className="mt-3 leading-relaxed">{review.text}</blockquote>
      <p className="mt-2 text-xs text-muted">
        {review.displayName || "Anonyme"} · {date(review.createdAt)}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {review.status !== "approved" && (
          <button
            type="button"
            onClick={() => setStatus("approved")}
            disabled={pending || !review.publishConsent}
            className="btn-primary px-3 py-1.5 text-xs"
          >
            Approuver
          </button>
        )}
        {review.status !== "hidden" && (
          <button type="button" onClick={() => setStatus("hidden")} disabled={pending} className="btn-secondary px-3 py-1.5 text-xs">
            Masquer
          </button>
        )}
      </div>
      {!review.publishConsent && review.status !== "approved" && (
        <p className="mt-2 text-xs text-muted">Le client n&apos;a pas autorisé la publication : l&apos;avis reste privé.</p>
      )}
      <div className="mt-2">
        <FormError message={error} />
      </div>
    </li>
  );
}

function ImportAnalysis() {
  const [image, setImage] = useState<File | null>(null);
  const [json, setJson] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<string | null>(null);

  async function submit() {
    setPending(true);
    setError(null);
    setDone(null);
    try {
      const token = await auth.currentUser?.getIdToken();
      const body = new FormData();
      body.set("analysis", json);
      if (image) body.set("image", image);
      const response = await fetch("/api/admin/import", { method: "POST", headers: { Authorization: `Bearer ${token}` }, body });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error ?? "Import impossible.");
      setDone(
        data.imageSaved || !image
          ? "Analyse ajoutée à votre historique. Ouvrez le tableau de bord pour la voir."
          : "Analyse ajoutée, mais la capture n'a pas pu être enregistrée (stockage Firebase à activer).",
      );
      setJson("");
      setImage(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Import impossible.");
    } finally {
      setPending(false);
    }
  }

  return (
    <section className="panel mt-6 max-w-3xl space-y-5 p-6">
      <div>
        <h2 className="display text-xl">Importer une analyse dans mon historique</h2>
        <p className="mt-1 text-sm text-muted">
          Pour une démonstration ou une analyse préparée à l&apos;avance : collez son JSON et, si possible, la capture d&apos;origine. Aucun
          crédit n&apos;est utilisé.
        </p>
      </div>
      <label className="field">
        <span>Capture du graphique (optionnelle)</span>
        <input
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif"
          onChange={(event) => setImage(event.target.files?.[0] ?? null)}
        />
      </label>
      <label className="field">
        <span>Analyse (JSON)</span>
        <textarea
          value={json}
          onChange={(event) => setJson(event.target.value)}
          rows={10}
          placeholder='{ "is_chart": true, "asset": "…", … }'
          className="rounded-xl border border-border bg-background/80 px-3.5 py-3 font-mono text-xs text-foreground outline-none focus:border-brand"
        />
      </label>
      <FormError message={error} />
      {done && <p className="rounded-xl border border-bull/40 bg-bull/10 px-3 py-2 text-sm text-bull">{done}</p>}
      <div className="flex flex-wrap gap-3">
        <button type="button" onClick={submit} disabled={pending || !json.trim()} className="btn-primary">
          {pending ? "Import…" : "Ajouter à mon historique"}
        </button>
        <Link href="/dashboard" className="btn-secondary">
          Voir mon historique
        </Link>
      </div>
    </section>
  );
}

export default function AdminPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [data, setData] = useState<AdminOverview | null>(null);
  const [error, setError] = useState<{ message: string; status?: number } | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [tab, setTab] = useState<"visits" | "users" | "analyses" | "reviews" | "import">("visits");
  const [analysisQuery, setAnalysisQuery] = useState("");
  const [query, setQuery] = useState("");
  const [planFilter, setPlanFilter] = useState<Plan | "all">("all");

  // The admin's own browsing never counts in the visit stats, on any page.
  useEffect(() => optOutOfTracking(), []);

  useEffect(() => {
    if (!loading && !user) router.replace("/auth/login");
  }, [loading, user, router]);

  const live = useLiveVisitors(Boolean(data));

  const [reloadKey, setReloadKey] = useState(0);
  const load = useCallback(() => {
    setRefreshing(true);
    setReloadKey((key) => key + 1);
  }, []);

  useEffect(() => {
    if (!user) return;
    let stale = false;
    adminFetch("/api/admin/overview")
      .then((overview: AdminOverview) => {
        if (stale) return;
        setData(overview);
        setError(null);
      })
      .catch((err) => {
        if (!stale) setError({ message: err instanceof Error ? err.message : "Chargement impossible.", status: err?.status });
      })
      .finally(() => !stale && setRefreshing(false));
    return () => {
      stale = true;
    };
  }, [user, reloadKey]);

  const users = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return (data?.users ?? []).filter(
      (item) =>
        (planFilter === "all" || item.plan === planFilter) &&
        (!needle || item.email?.toLowerCase().includes(needle) || item.displayName?.toLowerCase().includes(needle)),
    );
  }, [data, query, planFilter]);

  if (loading || !user) return <div className="label flex flex-1 items-center justify-center text-muted">Chargement…</div>;

  if (error?.status === 403) {
    return (
      <main className="mx-auto flex max-w-md flex-1 flex-col items-center justify-center gap-4 px-4 text-center">
        <Logo />
        <h1 className="display text-3xl">Accès réservé</h1>
        <p className="text-muted">
          Cet espace est réservé à l&apos;administrateur. Si c&apos;est vous, confirmez l&apos;adresse e-mail de votre compte, ou ajoutez
          son identifiant (UID) dans la configuration NEXT_PUBLIC_ADMIN_UIDS.
        </p>
        <Link href="/dashboard" className="btn-secondary">
          Retour au tableau de bord
        </Link>
      </main>
    );
  }

  const totals = data?.totals;
  const pendingReviews = data?.reviews.filter((review) => review.status === "pending").length ?? 0;

  return (
    <div className="flex flex-1 flex-col">
      <header className="sticky top-0 z-30 border-b border-border/70 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-center gap-3">
            <Logo />
            <span className="chip border-bear/40 bg-bear/10 text-bear">Admin</span>
          </div>
          <div className="flex items-center gap-2">
            <button type="button" onClick={load} disabled={refreshing} className="btn-ghost">
              {refreshing ? "Actualisation…" : "Actualiser"}
            </button>
            <Link href="/dashboard" className="btn-secondary px-4 py-2">
              Tableau de bord
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="display text-3xl sm:text-4xl">Administration</h1>
          {data && (
            <LiveBadge
              live={live}
              onClick={() => {
                setTab("visits");
                requestAnimationFrame(() => document.getElementById("en-direct")?.scrollIntoView({ behavior: "smooth" }));
              }}
            />
          )}
        </div>
        {error && (
          <div className="mt-4">
            <FormError message={error.message} />
          </div>
        )}

        {!data && !error && <p className="mt-8 text-muted">Chargement des données…</p>}

        {totals && (
          <>
            <section className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-7" aria-label="Chiffres clés">
              <Stat label="Utilisateurs" value={totals.users} hint={`+${totals.newUsers7d} ces 7 derniers jours`} />
              <Stat label="Sans offre" value={totals.none} />
              <Stat label={PLAN_LABELS.starter} value={totals.starter} hint={`${euros(totals.starter * PRICE.starter)} / mois`} />
              <Stat label={PLAN_LABELS.monthly} value={totals.monthly} hint={`${euros(totals.monthly * PRICE.monthly)} / mois (19 à 19,99 €)`} />
              <Stat label={PLAN_LABELS.lifetime} value={totals.lifetime} hint="99 € (ou 180 € avant le 17/10) chacun" />
              <Stat label="Analyses" value={totals.analyses} hint="depuis le lancement" />
              <Stat
                label="Conversion"
                value={totals.users ? `${Math.round(((totals.starter + totals.monthly + totals.lifetime) / totals.users) * 100)} %` : "—"}
                hint="comptes avec une offre"
              />
            </section>
            <p className="mt-2 text-xs text-muted">
              Revenus estimés d&apos;après les offres actives (hors remboursements et frais Stripe). Les chiffres exacts sont dans Stripe.
            </p>

            <div className="mt-10 flex gap-1 border-b border-border" role="tablist">
              {(
                [
                  ["visits", "Visites"],
                  ["users", `Utilisateurs (${data.users.length})`],
                  ["analyses", `Analyses (${totals.analyses})`],
                  ["reviews", `Avis${pendingReviews ? ` (${pendingReviews} en attente)` : ` (${data.reviews.length})`}`],
                  ["import", "Importer une analyse"],
                ] as const
              ).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={tab === key}
                  onClick={() => setTab(key)}
                  className={`-mb-px border-b-2 px-4 py-2.5 text-sm font-medium transition-colors ${
                    tab === key ? "border-accent text-foreground" : "border-transparent text-muted hover:text-foreground"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {tab === "visits" ? (
              <VisitsTab reloadKey={reloadKey} live={live} />
            ) : tab === "users" ? (
              <section className="mt-6">
                <div className="flex flex-wrap gap-3">
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Rechercher un nom ou un e-mail…"
                    className="min-w-60 flex-1 rounded-xl border border-border bg-background/80 px-3.5 py-2.5 text-sm outline-none focus:border-brand"
                  />
                  <select
                    value={planFilter}
                    onChange={(event) => setPlanFilter(event.target.value as Plan | "all")}
                    className="rounded-xl border border-border bg-background px-3 py-2.5 text-sm"
                  >
                    <option value="all">Toutes les offres</option>
                    <option value="none">Sans offre</option>
                    <option value="monthly">Mensuel</option>
                    <option value="lifetime">À vie</option>
                  </select>
                </div>
                <div className="panel mt-4 overflow-x-auto">
                  <table className="w-full min-w-[760px] text-sm">
                    <thead>
                      <tr className="label text-left text-muted">
                        <th className="px-4 py-3 font-medium">Utilisateur</th>
                        <th className="px-4 py-3 font-medium">Offre</th>
                        <th className="px-4 py-3 text-right font-medium">Crédits</th>
                        <th className="px-4 py-3 text-right font-medium">Analyses</th>
                        <th
                          className="px-4 py-3 text-right font-medium"
                          title={`Coût IA du mois, plafonné à ${MONTHLY_BUDGET_EUR} € par client`}
                        >
                          Coût IA (mois)
                        </th>
                        <th className="px-4 py-3 font-medium">Inscrit le</th>
                        <th className="px-4 py-3 font-medium">Client Stripe</th>
                        <th className="px-4 py-3" />
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((item) => (
                        <UserRow
                          key={item.uid}
                          user={item}
                          onSaved={load}
                          onShowAnalyses={() => {
                            setAnalysisQuery(item.email ?? item.uid);
                            setTab("analyses");
                          }}
                        />
                      ))}
                    </tbody>
                  </table>
                  {!users.length && <p className="px-4 py-6 text-center text-sm text-muted">Aucun utilisateur ne correspond.</p>}
                </div>
              </section>
            ) : tab === "analyses" ? (
              <AnalysesTab query={analysisQuery} onQuery={setAnalysisQuery} reloadKey={reloadKey} />
            ) : tab === "reviews" ? (
              <section className="mt-6">
                {data.reviews.length ? (
                  <ul className="grid gap-4 md:grid-cols-2">
                    {data.reviews.map((review) => (
                      <ReviewCard key={review.uid} review={review} onChanged={load} />
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted">Aucun avis pour l&apos;instant. Ils arrivent après la 3ᵉ analyse d&apos;un client.</p>
                )}
              </section>
            ) : (
              <ImportAnalysis />
            )}
          </>
        )}
      </main>
    </div>
  );
}
