"use client";

import { collection, getDocs, limit, orderBy, query, type Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import type { ChartAnalysis } from "@/lib/analysis";
import { db } from "@/lib/firebase";

export type StoredAnalysis = ChartAnalysis & { id: string; createdAt?: Timestamp };

/** The user's latest analyses, refetched whenever refreshKey changes. */
export function useAnalysisHistory(uid: string | null, refreshKey: number) {
  const [items, setItems] = useState<StoredAnalysis[] | null>(null);
  useEffect(() => {
    if (!uid) return;
    let stale = false;
    const q = query(collection(db, "users", uid, "analyses"), orderBy("createdAt", "desc"), limit(30));
    getDocs(q)
      .then((snap) => !stale && setItems(snap.docs.map((d) => ({ id: d.id, ...(d.data() as ChartAnalysis) }))))
      .catch(() => !stale && setItems([]));
    return () => {
      stale = true;
    };
  }, [uid, refreshKey]);
  return items;
}

const trendDot = { haussière: "bg-bull", baissière: "bg-bear", neutre: "bg-muted" } as const;

/** Compact history list for the dashboard sidebar. */
export function HistoryList({
  items,
  activeId,
  onSelect,
}: {
  items: StoredAnalysis[] | null;
  activeId: string | null;
  onSelect: (item: StoredAnalysis) => void;
}) {
  if (items === null) return <p className="px-2 py-3 text-sm text-muted">Chargement…</p>;
  if (!items.length) return <p className="px-2 py-3 text-sm text-muted">Aucune analyse pour l&apos;instant.</p>;

  return (
    <ul className="space-y-0.5">
      {items.map((item) => (
        <li key={item.id}>
          <button
            type="button"
            onClick={() => onSelect(item)}
            className={`flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left transition-colors hover:bg-card ${
              activeId === item.id ? "bg-card text-foreground" : "text-foreground/85"
            }`}
          >
            <span className={`size-2 shrink-0 rounded-full ${item.is_chart ? trendDot[item.trend] : "bg-border"}`} aria-hidden />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-medium">
                {item.is_chart ? item.asset : "Image non reconnue"}
                {item.is_chart && <span className="ml-1.5 font-mono text-xs text-muted">{item.timeframe}</span>}
              </span>
              <span className="block font-mono text-[11px] text-muted">
                {item.createdAt?.toDate().toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" })}
                {" · "}
                {item.createdAt?.toDate().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
              </span>
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}
