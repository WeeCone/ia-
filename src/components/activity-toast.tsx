"use client";

import { useEffect, useState } from "react";
import type { Activity } from "@/lib/activity";

const FIRST_DELAY = 6000;
const SHOWN_FOR = 6500;
const GAP = 16000;

function ago(at: number) {
  const minutes = Math.round((Date.now() - at) / 60000);
  if (minutes < 1) return "à l'instant";
  if (minutes < 60) return `il y a ${minutes} min`;
  const hours = Math.round(minutes / 60);
  return `il y a ${hours} h`;
}

/**
 * Real recent analyses (market and timeframe only; never who, never a reading or result), shown one at a time bottom left.
 * Each appears once per visit; nothing shows when no one analysed in the last 24 hours.
 */
export function ActivityToast() {
  const [items, setItems] = useState<Activity[]>([]);
  const [index, setIndex] = useState(-1);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem("scanzivo:activity-dismissed")) return;
    } catch {}
    const controller = new AbortController();
    const timer = setTimeout(() => {
      fetch("/api/activity", { signal: controller.signal })
        .then((response) => response.json())
        .then((data: { items?: Activity[] }) => {
          if (data.items?.length) {
            setItems(data.items);
            setIndex(0);
          }
        })
        .catch(() => {});
    }, FIRST_DELAY);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, []);

  // Show the current item, hide it, then move on to the next after a pause.
  useEffect(() => {
    if (index < 0 || index >= items.length || dismissed) return;
    const show = setTimeout(() => setVisible(true), 50);
    const hide = setTimeout(() => setVisible(false), SHOWN_FOR);
    const next = setTimeout(() => setIndex((current) => current + 1), SHOWN_FOR + GAP);
    return () => [show, hide, next].forEach(clearTimeout);
  }, [index, items.length, dismissed]);

  const item = items[index];
  if (!item || dismissed) return null;

  return (
    <aside
      aria-live="polite"
      className={`fixed bottom-5 left-3 z-40 w-[min(20rem,calc(100%-6.5rem))] rounded-2xl border border-border bg-card/95 p-3.5 pr-9 shadow-[0_18px_40px_-16px_rgb(15_23_42/0.35)] backdrop-blur transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:bottom-6 sm:left-6 sm:p-4 sm:pr-10 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <p className="flex items-center gap-2 text-xs text-muted">
        <span className="relative flex size-2">
          <span className="absolute inset-0 animate-ping rounded-full bg-accent/60" />
          <span className="relative size-2 rounded-full bg-accent" />
        </span>
        Analyse en direct · {ago(item.at)}
      </p>
      <p className="mt-1.5 text-sm leading-snug">
        Un trader vient d&apos;analyser{" "}
        <span className="whitespace-nowrap font-semibold">
          {item.asset}
          {item.timeframe ? ` · ${item.timeframe}` : ""}
        </span>
      </p>
      <button
        type="button"
        onClick={() => {
          setDismissed(true);
          try {
            sessionStorage.setItem("scanzivo:activity-dismissed", "1");
          } catch {}
        }}
        aria-label="Masquer l'activité"
        className="absolute right-1.5 top-1.5 rounded-lg px-2 py-1 text-lg leading-none text-muted hover:text-foreground"
      >
        ×
      </button>
    </aside>
  );
}
