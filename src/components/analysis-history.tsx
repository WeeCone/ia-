"use client";

import { collection, getDocs, limit, orderBy, query, type Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import type { ChartAnalysis } from "@/lib/analysis";
import { db } from "@/lib/firebase";

type StoredAnalysis = ChartAnalysis & { id: string; createdAt?: Timestamp };

type Props = { uid: string; refreshKey: number; onSelect: (analysis: ChartAnalysis) => void };

export function AnalysisHistory({ uid, refreshKey, onSelect }: Props) {
  const [items, setItems] = useState<StoredAnalysis[]>([]);

  useEffect(() => {
    const q = query(collection(db, "users", uid, "analyses"), orderBy("createdAt", "desc"), limit(20));
    getDocs(q).then((snap) => setItems(snap.docs.map((d) => ({ id: d.id, ...(d.data() as ChartAnalysis) }))));
  }, [uid, refreshKey]);

  if (!items.length) return null;

  return (
    <section className="mt-16">
      <p className="label">§ Historique</p>
      <ul className="mt-4 divide-y divide-border border-y border-border">
        {items.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => onSelect(item)}
              className="group flex w-full items-center justify-between gap-4 py-4 text-left text-sm transition-colors hover:bg-surface"
            >
              <span className="font-display text-2xl group-hover:text-brand">
                {item.is_chart ? item.asset : "Image non reconnue"}{" "}
                {item.is_chart && <span className="font-mono text-xs text-muted">{item.timeframe}</span>}
              </span>
              <span className="flex items-center gap-4 font-mono text-xs uppercase tracking-[0.12em] text-muted">
                {item.is_chart && (
                  <span className={item.trend === "haussière" ? "text-bull" : item.trend === "baissière" ? "text-bear" : ""}>
                    {item.trend}
                  </span>
                )}
                {item.createdAt?.toDate().toLocaleDateString("fr-FR", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
