"use client";

import { useState } from "react";
import { useI18n } from "@/i18n/client";
import { INTL_LOCALE } from "@/i18n/config";
import { keepNumbers } from "@/i18n/format";

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
  { price: 65400, tone: "bear" },
  { price: 63200, tone: "bull" },
  { price: 61800, tone: "bull" },
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

/** Feature section body: what the AI reads, listed on one side and annotated under the same numbers on an example capture. */
export function ChartAnatomy() {
  const [picked, setPicked] = useState<number | null>(null);
  const { t, locale } = useI18n();
  const f = t.features;
  // Prices written the visitor's way: 65 400 / 65,400 / 65.400.
  const price = (value: number) => value.toLocaleString(INTL_LOCALE[locale]);
  // Hovering or focusing a reading picks out its annotation and dims the others.
  const dim = (n: number) => `transition-opacity duration-300 ${picked !== null && picked !== n ? "opacity-15" : ""}`;

  return (
    <div className="mt-12">
      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-14">
        <ol data-reveal-stagger className="order-2 lg:order-1" onMouseLeave={() => setPicked(null)}>
          {f.readings.map((item, i) => {
            const lit = picked === i;
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
                    lit || picked === null ? "text-foreground" : "text-foreground/60"
                  }`}
                >
                  <span
                    className={`mt-0.5 grid size-7 place-items-center rounded-full font-mono text-xs font-bold transition-[background-color,color,box-shadow] duration-300 ${
                      lit ? "bg-brand text-background shadow-[0_0_0_5px_rgb(14_116_144/0.15)]" : "border border-border text-brand"
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
            {f.platforms}
          </li>
        </ol>

        <figure data-reveal="circle" className="order-1 lg:sticky lg:top-28 lg:order-2">
          <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-[0_1px_2px_rgb(15_23_42/0.05),0_30px_60px_-30px_rgb(15_23_42/0.3)]">
            <div className="flex items-center justify-between border-b border-border px-4 py-2.5 font-mono text-xs text-muted">
              <span className="flex items-center gap-2">
                <span className="font-semibold text-foreground">BTC/USDT</span> 4H
              </span>
              <span>{f.reading}</span>
            </div>

            <svg
              viewBox="0 0 600 360"
              className="block h-auto w-full"
              role="img"
              aria-label={f.chartLabel}
            >

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

                            <g>
                {/* 1. Levels, with their price on the right axis */}
                <g className={dim(0)}>
                  {LEVELS.map((level) => (
                    <g key={level.price}>
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
                        {price(level.price)}
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
                    {f.pattern}
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
                    {f.momentum}
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
                    {f.target} {price(67000)}
                  </text>
                  <text
                    x="492"
                    y={y(66600) + 11}
                    textAnchor="middle"
                    fontSize="10"
                    fontFamily="var(--font-jetbrains-mono)"
                    fill="var(--bull)"
                  >
                    {f.target} {price(66600)}
                  </text>
                  <text
                    x="492"
                    y={y(64300) - 5}
                    textAnchor="middle"
                    fontSize="10"
                    fontFamily="var(--font-jetbrains-mono)"
                    fill="var(--bear)"
                  >
                    {f.stop} {price(64300)}
                  </text>
                  <Marker n={4} x={492} y={y(67000) - 16} />
                </g>
              </g>
            </svg>

            {/* 5. Verdict */}
            <div className={`border-t border-border ${dim(4)}`}>
              <div className="flex items-start gap-3 bg-bull/5 px-4 py-4 sm:px-5">
                <span className="mt-0.5 grid size-[18px] shrink-0 place-items-center rounded-full bg-brand font-mono text-[10px] font-bold text-background">
                  5
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="rounded bg-bull px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-background">
                      {f.action}
                    </span>
                    <span className="whitespace-nowrap font-mono text-xs text-bull">{f.scenario} · 62 %</span>
                  </div>
                  <p className="mt-2 text-sm font-medium leading-snug">{keepNumbers(f.headline)}</p>
                </div>
              </div>
            </div>
          </div>
          <figcaption className="mt-3 text-center text-xs text-muted">
            {t.common.illustrative} {t.common.notAdvice}
          </figcaption>
        </figure>
      </div>
    </div>
  );
}
