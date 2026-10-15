"use client";

import { useEffect, useState } from "react";

/**
 * Cycles through words inside a neon pill. Every word sits in the same grid cell so the pill keeps the width
 * of the longest one (no layout shift); screen readers get the full list once.
 */
export function RotatingWord({ words, interval = 2200 }: { words: string[]; interval?: number }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setIndex((current) => (current + 1) % words.length), interval);
    return () => window.clearInterval(timer);
  }, [words.length, interval]);

  return (
    <span className="relative inline-grid justify-items-center overflow-hidden rounded-2xl bg-accent px-4 pb-1 align-baseline text-background shadow-[0_10px_30px_-12px_rgb(0_245_160/0.6)] sm:rounded-3xl sm:px-6">
      <span className="sr-only">{words.join(", ")}</span>
      {words.map((word, i) => (
        <span
          key={word}
          aria-hidden
          className={`col-start-1 row-start-1 transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            i === index
              ? "translate-y-0 opacity-100"
              : i === (index - 1 + words.length) % words.length
                ? "-translate-y-full opacity-0"
                : "translate-y-full opacity-0"
          }`}
        >
          {word}
        </span>
      ))}
    </span>
  );
}
