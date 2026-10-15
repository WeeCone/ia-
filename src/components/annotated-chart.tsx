"use client";

import { useEffect, useRef, useState } from "react";
import type { LevelMark } from "@/lib/analysis";

const LABEL_GAP = 20; // px between label centres

/** Label positions: at their level when there is room, pushed apart (then back inside the image) when levels are close. */
function spreadLabels(marks: LevelMark[], height: number) {
  const sorted = [...marks].sort((a, b) => a.y - b.y);
  if (!height) return sorted.map((mark) => ({ mark, top: `${mark.y * 100}%` }));
  const tops: number[] = [];
  sorted.forEach((mark, i) => tops.push(Math.max(mark.y * height, i ? tops[i - 1] + LABEL_GAP : 0)));
  const overflow = tops.length ? tops[tops.length - 1] - (height - LABEL_GAP / 2) : 0;
  if (overflow > 0) for (let i = tops.length - 1; i >= 0; i--) tops[i] = Math.min(tops[i] - overflow, i < tops.length - 1 ? tops[i + 1] - LABEL_GAP : Infinity);
  return sorted.map((mark, i) => ({ mark, top: `${tops[i]}px` }));
}

/** The user's own screenshot with the detected supports / resistances drawn over it. */
export function AnnotatedChart({ imageUrl, marks }: { imageUrl: string; marks: LevelMark[] | undefined }) {
  const [showLevels, setShowLevels] = useState(true);
  const imageRef = useRef<HTMLImageElement>(null);
  const [height, setHeight] = useState(0);

  // Rendered image height, to keep level labels a readable distance apart.
  useEffect(() => {
    const image = imageRef.current;
    if (!image) return;
    const observer = new ResizeObserver(() => setHeight(image.clientHeight));
    observer.observe(image);
    return () => observer.disconnect();
  }, []);
  // Positions come from the model reading the price axis: drop anything outside the image.
  const visible = (marks ?? []).filter((mark) => Number.isFinite(mark.y) && mark.y >= 0 && mark.y <= 1);

  return (
    <figure className="panel">
      <figcaption className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-3">
        <span className="label">Votre graphique</span>
        {visible.length > 0 && (
          <label className="label flex cursor-pointer items-center gap-2 text-muted">
            <input
              id="toggle-levels"
              type="checkbox"
              checked={showLevels}
              onChange={(event) => setShowLevels(event.target.checked)}
              className="size-4 accent-brand"
            />
            Niveaux tracés
          </label>
        )}
      </figcaption>
      <div className="rounded-b-2xl bg-background/60 p-3">
        <div className="relative mx-auto w-fit">
          {/* eslint-disable-next-line @next/next/no-img-element -- local object URL */}
          <img ref={imageRef} src={imageUrl} alt="Graphique analysé" className="block max-h-[560px] w-auto max-w-full" />
          {showLevels &&
            visible.map((mark, index) => (
              <span
                key={`line-${mark.price}-${index}`}
                className="pointer-events-none absolute inset-x-0 h-0 border-t border-dashed"
                style={{ top: `${mark.y * 100}%`, borderColor: mark.kind === "support" ? "var(--bull)" : "var(--bear)" }}
              />
            ))}
          {/* Labels on the left (chart platforms keep their own price axis on the right), spread so close levels don't overlap. */}
          {showLevels &&
            spreadLabels(visible, height).map(({ mark, top }, index) => (
              <span
                key={`label-${mark.price}-${index}`}
                className="label pointer-events-none absolute left-0 rounded px-1.5 py-0.5 text-background"
                style={{ top, transform: "translateY(-50%)", background: mark.kind === "support" ? "var(--bull)" : "var(--bear)" }}
              >
                {mark.price}
              </span>
            ))}
        </div>
      </div>
      {showLevels && visible.length > 0 && (
        <p className="border-t border-border px-5 py-2 text-xs text-muted">
          Tracé indicatif : la position des niveaux est estimée par l&apos;IA à partir de l&apos;axe des prix.
        </p>
      )}
    </figure>
  );
}
