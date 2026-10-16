"use client";

import { useEffect, useId, useRef, useState } from "react";
import { DEMO_ANALYSIS } from "@/lib/demo";

// What the AI reads, in the order the scan line reaches it on the capture; each is annotated under the same number.
const READINGS = [
  {
    title: "Supports & résistances",
    text: "Les niveaux clés sont tracés sur votre capture, à leur vraie hauteur, avec leur prix.",
  },
  {
    title: "Figures chartistes",
    text: "Triangles, doubles creux, têtes-épaules, cassures et retests : les figures visibles sont repérées et nommées.",
  },
  {
    title: "Indicateurs visibles",
    text: "RSI, MACD, moyennes mobiles, volumes : s'ils figurent sur la capture, ils comptent dans la lecture.",
  },
  {
    title: "Un plan chiffré",
    text: "Entrée, stop, objectifs et ratio gain / risque, calculés à partir des prix du graphique.",
  },
  {
    title: "Un verdict, pas un « peut-être »",
    text: "Le scénario le plus probable, formulé en action : acheter, vendre, attendre ou s'abstenir.",
  },
];

// Scan position (in chart units, 0–600) at which each reading counts as read; the verdict lands once the scan is done.
const READ_AT = [24, 300, 440, 530, 600];
const SCAN_END = 640;

// Price pane: 61 000 → y 250, 67 500 → y 20.
const y = (price: number) => 250 - ((price - 61000) * 230) / 6500;

// Illustrative BTC 4H path matching DEMO_ANALYSIS: base at 61 800, breakout of 63 200, retest, pressure under 65 400.
const CLOSES = [
  62600, 62300, 62000, 61950, 62200, 62700, 63050, 62800, 62500, 62650, 63000, 63150, 62900, 62700, 62950, 63100, 63500, 63900, 64200,
  64000, 63700, 63450, 63350, 63600, 64000, 64400, 64700, 65000, 65300, 65100, 64900, 65150, 65250, 65100,
];
const LOWS: Record<number, number> = { 3: 61800, 22: 63200 };
const CANDLES = CLOSES.map((close, i) => {
  const open = i ? CLOSES[i - 1] : 62800;
  const wick = ((i * 37) % 5) * 45 + 60;
  return {
    x: 18 + i * 12.6,
    open,
    close,
    high: Math.max(open, close) + wick,
    low: LOWS[i] ?? Math.min(open, close) - wick * 0.8,
  };
});

const RSI = [
  44, 41, 37, 35, 40, 47, 55, 51, 46, 49, 54, 56, 51, 47, 51, 54, 60, 65, 69, 64, 57, 52, 50, 55, 61, 66, 69, 72, 74, 68, 63, 66, 67, 64,
];
const rsiY = (value: number) => 350 - (value / 100) * 70;
const RSI_PATH = RSI.map((v, i) => `${i ? "L" : "M"}${(18 + i * 12.6).toFixed(1)} ${rsiY(v).toFixed(1)}`).join(" ");

const LEVELS = [
  { price: 65400, label: "65 400", tone: "bear" },
  { price: 63200, label: "63 200", tone: "bull" },
  { price: 61800, label: "61 800", tone: "bull" },
] as const;

function Marker({ n, x, y: cy }: { n: number; x: number; y: number }) {
  return (
    <g>
      <circle cx={x} cy={cy} r="11" fill="var(--brand)" />
      <text
        x={x}
        y={cy + 4}
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fontFamily="var(--font-jetbrains-mono)"
        fill="var(--background)"
      >
        {n}
      </text>
    </g>
  );
}

const clamp = (value: number) => Math.min(1, Math.max(0, value));

/**
 * Feature section body. Scrolling drives a scan line across an example capture: each annotation is drawn as the line
 * passes it, the matching reading lights up in the list, and the verdict lands once the capture is read.
 * Hovering or focusing a reading shows the finished capture with that annotation picked out.
 */
export function ChartAnatomy() {
  const [picked, setPicked] = useState<number | null>(null);
  // 0 → 1 across the section. Starts finished so the server render and reduced motion show the whole reading.
  const [progress, setProgress] = useState(1);
  const scanId = useId();
  const container = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLElement>(null);
  const { verdict, bullish } = DEMO_ANALYSIS;

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Must match the .pin-track media query in globals.css.
    const pinned = matchMedia("(min-width: 1024px) and (min-height: 820px)");
    let frameRequest = 0;
    const measure = () => {
      frameRequest = 0;
      const vh = window.innerHeight;
      let next: number;
      if (pinned.matches) {
        // Large screens: the list and capture are pinned; the scan spans most of the pinned scroll, the rest lets it rest.
        const box = container.current!.getBoundingClientRect();
        next = (96 - box.top) / Math.max(1, (box.height - vh) * 0.8);
      } else {
        // Phones: the capture sits above the list; it is read while it crosses the screen.
        const box = frame.current!.getBoundingClientRect();
        next = (0.92 * vh - box.top) / (0.62 * vh);
      }
      setProgress((current) => (Math.abs(current - clamp(next)) > 0.002 ? clamp(next) : current));
    };
    const schedule = () => {
      if (!frameRequest) frameRequest = requestAnimationFrame(measure);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frameRequest);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  const scanX = picked === null ? progress * SCAN_END : SCAN_END;
  const scanning = scanX > 0 && scanX < 600;
  const reached = READ_AT.filter((at) => scanX >= at).length - 1;
  const current = picked ?? reached;
  const done = scanX >= SCAN_END - 1;
  // A picked reading dims the others; while scanning, everything already drawn stays at full strength.
  const dim = (n: number) => `transition-opacity duration-300 ${picked !== null && picked !== n ? "opacity-15" : ""}`;
  const clipId = `scan${scanId.replace(/[^a-zA-Z0-9]/g, "")}`;

  return (
    <div ref={container} className="pin-track mt-12">
      <div className="pin-inner grid items-start gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-14">
        <ol className="order-2 lg:order-1" onMouseLeave={() => setPicked(null)}>
          {READINGS.map((item, i) => {
            const lit = current === i;
            const read = i <= reached || picked !== null;
            return (
              <li key={item.title} className="border-t border-border last:border-b">
                <button
                  type="button"
                  aria-pressed={picked === i}
                  onPointerEnter={(event) => event.pointerType === "mouse" && setPicked(i)}
                  onFocus={() => setPicked(i)}
                  onBlur={() => setPicked(null)}
                  onClick={() => setPicked(i)}
                  className={`grid w-full grid-cols-[2rem_1fr] gap-x-3 py-5 text-left transition-[color,opacity] duration-300 ${
                    lit ? "text-foreground" : read ? "text-foreground/70" : "text-foreground/45"
                  }`}
                >
                  <span
                    className={`mt-0.5 grid size-7 place-items-center rounded-full font-mono text-xs font-bold transition-[background-color,color,box-shadow] duration-300 ${
                      lit
                        ? "bg-brand text-background shadow-[0_0_0_5px_rgb(14_116_144/0.15)]"
                        : read
                          ? "bg-brand/15 text-brand"
                          : "border border-border text-muted"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <span>
                    <span className="display block text-lg sm:text-xl">{item.title}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-muted">{item.text}</span>
                  </span>
                </button>
              </li>
            );
          })}
          <li className="pt-5 text-sm text-muted">
            Fonctionne avec TradingView, Binance, MetaTrader… de la bougie 1 minute à l&apos;hebdomadaire.
          </li>
        </ol>

        <figure ref={frame} className="order-1 lg:order-2">
          <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-[0_1px_2px_rgb(15_23_42/0.05),0_30px_60px_-30px_rgb(15_23_42/0.3)]">
            <div className="flex items-center justify-between border-b border-border px-4 py-2.5 font-mono text-xs text-muted">
              <span className="flex items-center gap-2">
                <span className="font-semibold text-foreground">BTC/USDT</span> 4H
              </span>
              <span className="flex items-center gap-2 tabular-nums" aria-hidden>
                <span className={`size-1.5 rounded-full ${done ? "bg-accent" : "animate-pulse bg-brand"}`} />
                {done ? "Lecture terminée" : `Lecture… ${Math.round(Math.min(1, scanX / 600) * 100)} %`}
              </span>
            </div>

            <svg
              viewBox="0 0 600 360"
              className="block h-auto w-full"
              role="img"
              aria-label="Exemple de capture BTC/USDT 4H annotée par Scanzivo"
            >
              <defs>
                <clipPath id={clipId}>
                  <rect x="0" y="0" width={Math.max(0, scanX)} height="360" />
                </clipPath>
                <linearGradient id={`${clipId}-beam`} x1="0" x2="1">
                  <stop offset="0" stopColor="var(--brand)" stopOpacity="0" />
                  <stop offset="1" stopColor="var(--brand)" stopOpacity="0.22" />
                </linearGradient>
              </defs>

              {/* Grid */}
              {[60, 120, 180, 240].map((gy) => (
                <line key={gy} x1="0" x2="600" y1={gy} y2={gy} stroke="var(--border)" strokeOpacity="0.5" />
              ))}

              {/* The trader's capture: candles are there before the reading starts. */}
              <g opacity={picked === null ? 1 : 0.55} className="transition-opacity duration-300">
                {CANDLES.map((c) => {
                  const up = c.close >= c.open;
                  const color = up ? "var(--bull)" : "var(--bear)";
                  return (
                    <g key={c.x}>
                      <line x1={c.x} x2={c.x} y1={y(c.high)} y2={y(c.low)} stroke={color} strokeWidth="1.2" />
                      <rect
                        x={c.x - 4}
                        width="8"
                        y={y(Math.max(c.open, c.close))}
                        height={Math.max(1.5, Math.abs(y(c.open) - y(c.close)))}
                        rx="1"
                        fill={color}
                      />
                    </g>
                  );
                })}
              </g>
              <line x1="0" x2="600" y1="268" y2="268" stroke="var(--border)" />

              {/* Everything the reading adds is drawn only where the scan line has passed. */}
              <g clipPath={`url(#${clipId})`}>
                {/* 1. Levels, with their price on the right axis */}
                <g className={dim(0)}>
                  {LEVELS.map((level) => (
                    <g key={level.label}>
                      <line
                        x1="0"
                        x2="532"
                        y1={y(level.price)}
                        y2={y(level.price)}
                        stroke={`var(--${level.tone})`}
                        strokeWidth="1.4"
                        strokeDasharray="6 4"
                      />
                      <rect x="536" y={y(level.price) - 10} width="60" height="20" rx="4" fill={`var(--${level.tone})`} />
                      <text
                        x="566"
                        y={y(level.price) + 4}
                        textAnchor="middle"
                        fontSize="12"
                        fontWeight="700"
                        fontFamily="var(--font-jetbrains-mono)"
                        fill="var(--background)"
                      >
                        {level.label}
                      </text>
                    </g>
                  ))}
                  <Marker n={1} x={22} y={y(65400) - 16} />
                </g>

                {/* 2. Pattern: breakout of 63 200 then retest */}
                <g className={dim(1)}>
                  <ellipse cx={CANDLES[22].x} cy={y(63300)} rx="22" ry="14" fill="none" stroke="var(--brand)" strokeWidth="1.6" />
                  <rect
                    x={CANDLES[22].x - 75}
                    y={y(63200) + 16}
                    width="150"
                    height="22"
                    rx="11"
                    fill="var(--card)"
                    stroke="var(--brand)"
                    strokeOpacity="0.6"
                  />
                  <text
                    x={CANDLES[22].x}
                    y={y(63200) + 31}
                    textAnchor="middle"
                    fontSize="11"
                    fontFamily="var(--font-jetbrains-mono)"
                    fill="var(--brand)"
                  >
                    CASSURE + RETEST
                  </text>
                  <Marker n={2} x={CANDLES[22].x - 90} y={y(63200) + 27} />
                </g>

                {/* 3. Visible indicator: RSI pane */}
                <g className={dim(2)}>
                  <line x1="0" x2="440" y1={rsiY(70)} y2={rsiY(70)} stroke="var(--bear)" strokeOpacity="0.5" strokeDasharray="3 3" />
                  <line x1="0" x2="440" y1={rsiY(30)} y2={rsiY(30)} stroke="var(--bull)" strokeOpacity="0.5" strokeDasharray="3 3" />
                  <path d={RSI_PATH} fill="none" stroke="var(--brand)" strokeWidth="1.8" strokeLinejoin="round" />
                  <text x="456" y="300" fontSize="11" fontFamily="var(--font-jetbrains-mono)" fill="var(--muted)">
                    RSI 14 · 64
                  </text>
                  <text x="456" y="316" fontSize="11" fontFamily="var(--font-jetbrains-mono)" fill="var(--muted)">
                    momentum acheteur
                  </text>
                  <Marker n={3} x={440} y={278} />
                </g>

                {/* 4. Plan: long position box from entry to targets and stop */}
                <g className={dim(3)}>
                  <rect x="456" y={y(67000)} width="72" height={y(65400) - y(67000)} fill="var(--bull)" fillOpacity="0.14" />
                  <rect x="456" y={y(65400)} width="72" height={y(64300) - y(65400)} fill="var(--bear)" fillOpacity="0.16" />
                  <line x1="456" x2="528" y1={y(66600)} y2={y(66600)} stroke="var(--bull)" strokeWidth="1.2" />
                  <line x1="456" x2="528" y1={y(67000)} y2={y(67000)} stroke="var(--bull)" strokeWidth="1.2" />
                  <line x1="456" x2="528" y1={y(64300)} y2={y(64300)} stroke="var(--bear)" strokeWidth="1.2" />
                  <text
                    x="492"
                    y={y(67000) + 11}
                    textAnchor="middle"
                    fontSize="10"
                    fontFamily="var(--font-jetbrains-mono)"
                    fill="var(--bull)"
                  >
                    OBJ 67 000
                  </text>
                  <text
                    x="492"
                    y={y(66600) + 11}
                    textAnchor="middle"
                    fontSize="10"
                    fontFamily="var(--font-jetbrains-mono)"
                    fill="var(--bull)"
                  >
                    OBJ 66 600
                  </text>
                  <text
                    x="492"
                    y={y(64300) - 5}
                    textAnchor="middle"
                    fontSize="10"
                    fontFamily="var(--font-jetbrains-mono)"
                    fill="var(--bear)"
                  >
                    STOP 64 300
                  </text>
                  <Marker n={4} x={492} y={y(67000) - 16} />
                </g>
              </g>

              {/* The scan line, with a soft trail behind it. */}
              {scanning && (
                <g aria-hidden>
                  <rect x={scanX - 70} y="0" width="70" height="360" fill={`url(#${clipId}-beam)`} />
                  <line x1={scanX} x2={scanX} y1="0" y2="360" stroke="var(--brand)" strokeWidth="1.5" />
                </g>
              )}
            </svg>

            {/* 5. Verdict: lands once the whole capture is read. Its space is kept so nothing below jumps. */}
            <div className="grid border-t border-border">
              <p
                aria-hidden
                className={`flex items-center px-4 py-4 font-mono text-xs text-muted transition-opacity duration-300 [grid-area:1/1] sm:px-5 ${done ? "opacity-0" : "opacity-100"}`}
              >
                Verdict à la fin de la lecture…
              </p>
              <div
                className={`flex items-start gap-3 bg-bull/5 px-4 py-4 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] [grid-area:1/1] sm:px-5 ${
                  done ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
                } ${picked !== null && picked !== 4 ? "!opacity-15" : ""}`}
              >
                <span className="mt-0.5 grid size-[18px] shrink-0 place-items-center rounded-full bg-brand font-mono text-[10px] font-bold text-background">
                  5
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="rounded bg-bull px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-background">
                      {verdict.action}
                    </span>
                    <span className="whitespace-nowrap font-mono text-xs text-bull">Scénario haussier · {bullish.probability} %</span>
                  </div>
                  <p className="mt-2 text-sm font-medium leading-snug">{verdict.headline.replace(/(\d) (\d)/g, "$1\u00a0$2")}</p>
                </div>
              </div>
            </div>
          </div>
          <figcaption className="mt-3 text-center text-xs text-muted">
            Exemple illustratif, chiffres fictifs. Ce n&apos;est pas un conseil en investissement.
          </figcaption>
        </figure>
      </div>
    </div>
  );
}
