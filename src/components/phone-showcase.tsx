"use client";

import { useState } from "react";

type Tone = "bull" | "bear" | "wait" | "none";

// Illustrative readings, one per market, covering all four verdicts. Fictitious figures: labelled as such on screen.
const MARKETS: {
  tab: string;
  asset: string;
  timeframe: string;
  trend: string;
  probability: number;
  scenario: string;
  action: string;
  tone: Tone;
  headline: string;
  plan: [string, string][];
  points: number[];
  support: number;
  resistance: number;
}[] = [
  {
    tab: "Crypto",
    asset: "BTC/USDT",
    timeframe: "4H",
    trend: "Haussière",
    probability: 62,
    scenario: "Scénario haussier",
    action: "Acheter sur confirmation",
    tone: "bull",
    headline: "Clôture 4H au-dessus de 65 400, stop 64 300.",
    plan: [
      ["Entrée", "65 400"],
      ["Stop", "64 300"],
      ["Objectifs", "66 600 / 67 000"],
      ["Gain / risque", "1 : 1,1"],
    ],
    points: [62, 58, 61, 55, 52, 54, 47, 44, 46, 39, 36, 38, 31, 28, 30, 24],
    support: 47,
    resistance: 26,
  },
  {
    tab: "Forex",
    asset: "EUR/USD",
    timeframe: "1H",
    trend: "Baissière",
    probability: 57,
    scenario: "Scénario baissier",
    action: "Vendre sur confirmation",
    tone: "bear",
    headline: "Clôture 1H sous 1,0820, stop 1,0865.",
    plan: [
      ["Entrée", "1,0820"],
      ["Stop", "1,0865"],
      ["Objectifs", "1,0770 / 1,0740"],
      ["Gain / risque", "1 : 1,1"],
    ],
    points: [22, 26, 24, 30, 34, 31, 37, 41, 39, 45, 48, 46, 52, 55, 53, 58],
    support: 54,
    resistance: 28,
  },
  {
    tab: "Or",
    asset: "XAU/USD",
    timeframe: "4H",
    trend: "Neutre",
    probability: 51,
    scenario: "Scénario haussier",
    action: "Attendre",
    tone: "wait",
    headline: "Signal pas encore là : attendre une clôture 4H au-dessus de 2 450.",
    plan: [
      ["Déclencheur", "> 2 450"],
      ["Stop", "2 418"],
      ["Objectifs", "2 480 / 2 505"],
      ["Gain / risque", "1 : 0,9"],
    ],
    points: [40, 36, 42, 38, 33, 37, 41, 35, 39, 34, 38, 42, 37, 33, 36, 34],
    support: 44,
    resistance: 30,
  },
  {
    tab: "Indices",
    asset: "CAC 40",
    timeframe: "1D",
    trend: "Range",
    probability: 52,
    scenario: "Scénario baissier",
    action: "Ne pas trader",
    tone: "none",
    headline: "Range sans direction : le gain espéré ne couvre pas le risque.",
    plan: [
      ["Entrée", "—"],
      ["Stop", "—"],
      ["Objectifs", "—"],
      ["Gain / risque", "< 1"],
    ],
    points: [38, 33, 40, 35, 31, 38, 42, 36, 32, 39, 34, 30, 37, 41, 35, 37],
    support: 43,
    resistance: 29,
  },
];

const TONE = {
  bull: "bg-bull/15 text-bull border-bull/40",
  bear: "bg-bear/15 text-bear border-bear/40",
  wait: "bg-amber-400/15 text-amber-300 border-amber-400/40",
  none: "bg-muted/15 text-muted border-border",
} as const;

// Asset badges orbiting the phone; depth drives the pointer parallax.
const BADGES = [
  { label: "BTC", className: "left-[4%] top-[12%]", depth: 1.4, delay: "0s" },
  { label: "EUR/USD", className: "right-[2%] top-[18%]", depth: 1, delay: "1.2s" },
  { label: "XAU", className: "left-[0%] top-[58%] hidden sm:flex", depth: 0.8, delay: "0.6s" },
  { label: "CAC 40", className: "right-[6%] top-[66%]", depth: 1.2, delay: "1.8s" },
  { label: "ETH", className: "left-[16%] top-[84%] hidden md:flex", depth: 0.6, delay: "2.4s" },
  { label: "NASDAQ", className: "right-[18%] top-[2%] hidden md:flex", depth: 0.7, delay: "0.9s" },
];

function Sparkline({ points, support, resistance, tone }: { points: number[]; support: number; resistance: number; tone: Tone }) {
  const step = 200 / (points.length - 1);
  const path = points.map((y, i) => `${i ? "L" : "M"}${(i * step).toFixed(1)} ${y}`).join(" ");
  const stroke = tone === "bear" ? "var(--bear)" : tone === "bull" ? "var(--bull)" : "var(--brand)";
  return (
    <svg viewBox="0 0 200 70" className="h-auto w-full" aria-hidden>
      <line x1="0" x2="200" y1={resistance} y2={resistance} stroke="var(--bear)" strokeDasharray="4 3" strokeOpacity="0.7" />
      <line x1="0" x2="200" y1={support} y2={support} stroke="var(--bull)" strokeDasharray="4 3" strokeOpacity="0.7" />
      <path d={`${path} L200 70 L0 70 Z`} fill={stroke} fillOpacity="0.08" />
      <path d={path} fill="none" stroke={stroke} strokeWidth="2" strokeLinejoin="round" className="reveal-x" />
    </svg>
  );
}

/** "Choose a market": tabs switch the analysis shown on a floating 3D phone, with asset badges drifting around it. */
export function PhoneShowcase() {
  const [active, setActive] = useState(0);
  const market = MARKETS[active];

  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--px", String((event.clientX - rect.left) / rect.width - 0.5));
    event.currentTarget.style.setProperty("--py", String((event.clientY - rect.top) / rect.height - 0.5));
  }

  return (
    <div>
      <div role="tablist" aria-label="Marché" className="mx-auto flex w-fit gap-1 rounded-full border border-border bg-card/70 p-1.5 backdrop-blur">
        {MARKETS.map((item, index) => (
          <button
            key={item.tab}
            role="tab"
            aria-selected={index === active}
            onClick={() => setActive(index)}
            className={`rounded-full px-4 py-2 font-display text-sm font-semibold transition-colors duration-200 sm:px-6 sm:text-base ${
              index === active ? "bg-foreground text-background" : "text-muted hover:text-foreground"
            }`}
          >
            {item.tab}
          </button>
        ))}
      </div>

      <div onPointerMove={onPointerMove} className="relative mx-auto mt-12 h-[600px] max-w-4xl [perspective:1400px] sm:h-[640px]">
        {/* Glow under the phone. */}
        <div
          className="absolute left-1/2 top-1/2 -z-10 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/20 blur-[90px]"
          aria-hidden
        />

        {BADGES.map(({ label, className, depth, delay }) => (
          <div
            key={label}
            aria-hidden
            className={`absolute flex ${className}`}
            style={{
              transform: `translate3d(calc(var(--px, 0) * ${depth * -40}px), calc(var(--py, 0) * ${depth * -40}px), 0)`,
              transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <span
              className="flex items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-2 font-mono text-sm font-semibold shadow-[0_18px_40px_-18px_rgb(0_0_0/0.9)] backdrop-blur motion-safe:animate-[float_6s_ease-in-out_infinite]"
              style={{ animationDelay: delay }}
            >
              <span className={`size-2 rounded-full ${market.asset.includes(label) ? "bg-accent" : "bg-brand/60"}`} />
              {label}
            </span>
          </div>
        ))}

        {/* The phone. */}
        <div
          className="absolute left-1/2 top-1/2 w-[290px] sm:w-[310px]"
          style={{
            transform: "translate(-50%, -50%) rotateX(calc(8deg + var(--py, 0) * -10deg)) rotateY(calc(-12deg + var(--px, 0) * 16deg))",
            transformStyle: "preserve-3d",
            transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <div className="motion-safe:animate-[float_7s_ease-in-out_infinite]">
            <div className="rounded-[3rem] border border-white/10 bg-[#05070b] p-3 shadow-[0_60px_120px_-40px_rgb(0_0_0/0.95),0_0_0_1px_rgb(255_255_255/0.04)_inset]">
              <div className="relative overflow-hidden rounded-[2.4rem] bg-background px-5 pb-6 pt-4">
                <div className="mx-auto h-6 w-24 rounded-full bg-black" aria-hidden />
                <div className="mt-2 flex items-center justify-between font-mono text-[11px] text-muted">
                  <span>9:41</span>
                  <span>Scanzivo</span>
                </div>

                <div key={market.tab} className="rise-in">
                  <div className="mt-4 flex items-start justify-between">
                    <div>
                      <p className="font-display text-xl font-bold">{market.asset}</p>
                      <p className="font-mono text-xs text-muted">
                        {market.timeframe} · tendance {market.trend.toLowerCase()}
                      </p>
                    </div>
                    <span className={`rounded-full border px-2 py-0.5 text-[11px] font-semibold ${TONE[market.tone]}`}>{market.probability} %</span>
                  </div>

                  <div className="mt-4 rounded-2xl border border-border bg-card/60 p-2">
                    <Sparkline points={market.points} support={market.support} resistance={market.resistance} tone={market.tone} />
                  </div>

                  <div className="mt-4">
                    <div className="flex justify-between text-[11px] text-muted">
                      <span>{market.scenario}</span>
                      <span className="font-mono">{market.probability} %</span>
                    </div>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-border">
                      <div
                        className={`h-full rounded-full transition-[width] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${market.tone === "bear" ? "bg-bear" : market.tone === "bull" ? "bg-bull" : "bg-brand"}`}
                        style={{ width: `${market.probability}%` }}
                      />
                    </div>
                  </div>

                  <div className={`mt-4 rounded-2xl border p-3 ${TONE[market.tone]}`}>
                    <p className="text-[11px] font-bold uppercase tracking-wider">{market.action}</p>
                    <p className="mt-1 text-[13px] leading-snug text-foreground">{market.headline.replace(/(\d) (\d)/g, "$1\u00a0$2")}</p>
                  </div>

                  <dl className="mt-3 grid grid-cols-2 gap-2">
                    {market.plan.map(([term, value]) => (
                      <div key={term} className="rounded-xl border border-border bg-card/60 px-3 py-2">
                        <dt className="text-[10px] uppercase tracking-wider text-muted">{term}</dt>
                        <dd className="mt-0.5 whitespace-nowrap font-mono text-[12px] font-semibold">{value}</dd>
                      </div>
                    ))}
                  </dl>
                  <p className="mt-3 text-center text-[10px] text-muted">Exemple illustratif, chiffres fictifs</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
