"use client";

import { useState } from "react";
import type { LevelMark } from "@/lib/analysis";

/** The user's own screenshot with the detected supports / resistances drawn over it. */
export function AnnotatedChart({ imageUrl, marks }: { imageUrl: string; marks: LevelMark[] | undefined }) {
  const [showLevels, setShowLevels] = useState(true);
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
          <img src={imageUrl} alt="Graphique analysé" className="block max-h-[560px] w-auto max-w-full" />
          {showLevels &&
            visible.map((mark, index) => {
              const tone = mark.kind === "support" ? "var(--bull)" : "var(--bear)";
              return (
                <div
                  key={`${mark.price}-${index}`}
                  className="pointer-events-none absolute inset-x-0 flex items-center"
                  style={{ top: `${mark.y * 100}%`, transform: "translateY(-50%)" }}
                >
                  {/* Label on the left: chart platforms put their own price axis on the right. */}
                  <span
                    className="label rounded px-1.5 py-0.5 text-background"
                    style={{ background: tone }}
                  >
                    {mark.price}
                  </span>
                  <span className="h-0 flex-1 border-t border-dashed" style={{ borderColor: tone }} />
                </div>
              );
            })}
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
