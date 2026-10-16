"use client";

import { useEffect, useRef, useState } from "react";
import { DEMO_ANALYSIS } from "@/lib/demo";

// What the AI reads, each one annotated on the capture under the same number.
const READINGS = [
  {
    title: "Figures chartistes",
    text: "Triangles, doubles creux, têtes-épaules, cassures et retests : les figures visibles sont repérées et nommées.",
  },
  {
    title: "Supports & résistances",
    text: "Les niveaux clés sont tracés sur votre capture, à leur vraie hauteur, avec leur prix.",
  },
  {
    title: "Indicateurs visibles",
    text: "RSI, MACD, moyennes mobiles, volumes : s'ils figurent sur la capture, ils comptent dans la lecture.",
  },
  {
    title: "Un verdict, pas un « peut-être »",
    text: "Le scénario le plus probable, formulé en action : acheter, vendre, attendre ou s'abstenir.",
  },
  {
    title: "Un plan chiffré",
    text: "Entrée, stop, objectifs et ratio gain / risque, calculés à partir des prix du graphique.",
  },
];

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

const RSI = [44, 41, 37, 35, 40, 47, 55, 51, 46, 49, 54, 56, 51, 47, 51, 54, 60, 65, 69, 64, 57, 52, 50, 55, 61, 66, 69, 72, 74, 68, 63, 66, 67, 64];
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
      <text x={x} y={cy + 4} textAnchor="middle" fontSize="12" fontWeight="700" fontFamily="var(--font-jetbrains-mono)" fill="var(--background)">
        {n}
      </text>
    </g>
  );
}

/** Feature section body: what the AI reads, listed on one side and annotated under the same numbers on an example capture. */
export function ChartAnatomy() {
  const [active, setActive] = useState<number | null>(null);
  const [seen, setSeen] = useState(false);
  const frame = useRef<HTMLDivElement>(null);
  const { verdict, bullish } = DEMO_ANALYSIS;

  useEffect(() => {
    const node = frame.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Annotation layer n: dimmed while another reading is highlighted; drawn in sequence once the capture is on screen.
  const layer = (n: number) => ({
    className: `transition-opacity duration-300 ${seen ? "pop-in" : "opacity-0"} ${active !== null && active !== n ? "opacity-15" : ""}`,
    style: { "--d": `${0.25 + n * 0.22}s` } as React.CSSProperties,
  });

  return (
    <div className="mt-12 grid items-start gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-14">
      <ol className="order-2 lg:order-1" onMouseLeave={() => setActive(null)}>
        {READINGS.map((item, i) => (
          <li key={item.title} className="border-t border-border last:border-b">
            <button
              type="button"
              aria-pressed={active === i}
              onPointerEnter={(event) => event.pointerType === "mouse" && setActive(i)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
              onClick={() => setActive(i)}
              className={`group grid w-full grid-cols-[2rem_1fr] gap-x-3 py-5 text-left transition-colors duration-200 ${
                active === i ? "text-foreground" : active === null ? "" : "text-muted"
              }`}
            >
              <span
                className={`mt-0.5 grid size-7 place-items-center rounded-full font-mono text-xs font-bold transition-colors duration-200 ${
                  active === i ? "bg-brand text-background" : "border border-border text-brand"
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
        ))}
        <li className="pt-5 text-sm text-muted">
          Fonctionne avec TradingView, Binance, MetaTrader… de la bougie 1 minute à l&apos;hebdomadaire.
        </li>
      </ol>

      <figure className="order-1 lg:sticky lg:top-28 lg:order-2">
        <div ref={frame} className="overflow-hidden rounded-3xl border border-border bg-card shadow-[0_1px_2px_rgb(15_23_42/0.05),0_30px_60px_-30px_rgb(15_23_42/0.3)]">
          <div className="flex items-center justify-between border-b border-border px-4 py-2.5 font-mono text-xs text-muted">
            <span className="flex items-center gap-2">
              <span className="font-semibold text-foreground">BTC/USDT</span> 4H
            </span>
            <span>Lecture Scanzivo</span>
          </div>

          <svg viewBox="0 0 600 360" className="block h-auto w-full" role="img" aria-label="Exemple de capture BTC/USDT 4H annotée par Scanzivo">
            {/* Grid */}
            {[60, 120, 180, 240].map((gy) => (
              <line key={gy} x1="0" x2="600" y1={gy} y2={gy} stroke="var(--border)" strokeOpacity="0.5" />
            ))}

            {/* Candles */}
            <g opacity={active === null ? 1 : 0.55} className="transition-opacity duration-300">
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

            {/* 2. Levels, with their price on the right axis */}
            <g {...layer(1)}>
              {LEVELS.map((level) => (
                <g key={level.label}>
                  <line x1="0" x2="532" y1={y(level.price)} y2={y(level.price)} stroke={`var(--${level.tone})`} strokeWidth="1.4" strokeDasharray="6 4" />
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
              <Marker n={2} x={22} y={y(65400) - 16} />
            </g>

            {/* 1. Pattern: breakout of 63 200 then retest */}
            <g {...layer(0)}>
              <ellipse cx={CANDLES[22].x} cy={y(63300)} rx="22" ry="14" fill="none" stroke="var(--brand)" strokeWidth="1.6" />
              <rect x={CANDLES[22].x - 75} y={y(63200) + 16} width="150" height="22" rx="11" fill="var(--card)" stroke="var(--brand)" strokeOpacity="0.6" />
              <text x={CANDLES[22].x} y={y(63200) + 31} textAnchor="middle" fontSize="11" fontFamily="var(--font-jetbrains-mono)" fill="var(--brand)">
                CASSURE + RETEST
              </text>
              <Marker n={1} x={CANDLES[22].x - 90} y={y(63200) + 27} />
            </g>

            {/* 5. Plan: long position box from entry to targets and stop */}
            <g {...layer(4)}>
              <rect x="456" y={y(67000)} width="72" height={y(65400) - y(67000)} fill="var(--bull)" fillOpacity="0.14" />
              <rect x="456" y={y(65400)} width="72" height={y(64300) - y(65400)} fill="var(--bear)" fillOpacity="0.16" />
              <line x1="456" x2="528" y1={y(66600)} y2={y(66600)} stroke="var(--bull)" strokeWidth="1.2" />
              <line x1="456" x2="528" y1={y(67000)} y2={y(67000)} stroke="var(--bull)" strokeWidth="1.2" />
              <line x1="456" x2="528" y1={y(64300)} y2={y(64300)} stroke="var(--bear)" strokeWidth="1.2" />
              <text x="492" y={y(67000) + 11} textAnchor="middle" fontSize="10" fontFamily="var(--font-jetbrains-mono)" fill="var(--bull)">
                OBJ 67 000
              </text>
              <text x="492" y={y(66600) + 11} textAnchor="middle" fontSize="10" fontFamily="var(--font-jetbrains-mono)" fill="var(--bull)">
                OBJ 66 600
              </text>
              <text x="492" y={y(64300) - 5} textAnchor="middle" fontSize="10" fontFamily="var(--font-jetbrains-mono)" fill="var(--bear)">
                STOP 64 300
              </text>
              <Marker n={5} x={492} y={y(67000) - 16} />
            </g>

            {/* 3. Visible indicator: RSI pane */}
            <line x1="0" x2="600" y1="268" y2="268" stroke="var(--border)" />
            <g {...layer(2)}>
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
          </svg>

          {/* 4. Verdict */}
          <div {...layer(3)}>
            <div className="flex items-start gap-3 border-t border-border bg-bull/5 px-4 py-4 sm:px-5">
              <span className="mt-0.5 grid size-[18px] shrink-0 place-items-center rounded-full bg-brand font-mono text-[10px] font-bold text-background">4</span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="rounded bg-bull px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-background">{verdict.action}</span>
                  <span className="whitespace-nowrap font-mono text-xs text-bull">Scénario haussier · {bullish.probability} %</span>
                </div>
                <p className="mt-2 text-sm font-medium leading-snug">{verdict.headline.replace(/(\d) (\d)/g, "$1 $2")}</p>
              </div>
            </div>
          </div>
        </div>
        <figcaption className="mt-3 text-center text-xs text-muted">Exemple illustratif, chiffres fictifs. Ce n&apos;est pas un conseil en investissement.</figcaption>
      </figure>
    </div>
  );
}
