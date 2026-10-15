// Static BTC/USDT 4H chart matching DEMO_ANALYSIS (prices in thousands of USDT), raw or annotated.
const CLOSES = [
  62.3, 62.0, 62.4, 62.1, 62.6, 62.9, 62.5, 62.2, 62.7, 63.0, 62.8, 63.1, 63.6, 64.0, 63.9,
  63.6, 63.4, 63.3, 63.7, 64.1, 64.0, 64.5, 64.9, 64.6, 65.0, 65.2, 64.9, 65.1, 64.8, 65.05,
];
const CANDLES = CLOSES.map((close, index) => {
  const open = index ? CLOSES[index - 1] : 62.5;
  return { open, close, high: Math.max(open, close) + 0.16 + (index % 3) * 0.07, low: Math.min(open, close) - 0.14 - (index % 4) * 0.05 };
});

const LEVELS = [
  { price: 67.0, tone: "bear" },
  { price: 65.4, tone: "bear" },
  { price: 63.2, tone: "bull" },
  { price: 61.8, tone: "bull" },
] as const;

const W = 520, H = 320, PAD_L = 8, PAD_R = 62, PAD_Y = 18, MIN = 61.4, MAX = 67.5, SLOTS = 36;
const y = (price: number) => PAD_Y + ((MAX - price) / (MAX - MIN)) * (H - 2 * PAD_Y);
const step = (W - PAD_L - PAD_R) / SLOTS;
const x = (index: number) => PAD_L + index * step + step / 2;
const tone = (t: "bull" | "bear") => (t === "bull" ? "var(--bull)" : "var(--bear)");

export function DemoChart({ annotated = false, labels = false }: { annotated?: boolean; labels?: boolean }) {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label={`Graphique BTC/USDT 4H${annotated ? " annoté par Scanzivo" : ""}`}>
      {[62, 63, 64, 65, 66, 67].map((price) => (
        <g key={price}>
          <line x1={PAD_L} x2={W - PAD_R} y1={y(price)} y2={y(price)} stroke="var(--border)" strokeOpacity={0.5} />
          <text x={W - PAD_R + 8} y={y(price) + 4} fill="var(--muted)" fontSize={11} fontFamily="var(--font-jetbrains-mono)">
            {(price * 1000).toLocaleString("fr-FR")}
          </text>
        </g>
      ))}

      {annotated && (
        <>
          {/* Rising trendline under the higher lows. */}
          <line x1={x(1)} y1={y(61.75)} x2={x(33)} y2={y(64.6)} stroke="var(--brand)" strokeWidth={2.5} strokeLinecap="round" filter="url(#demo-glow)" />
          <rect x={x(24) - 6} y={y(65.4) - 14} width={x(29) - x(24) + 12} height={y(64.5) - y(65.4) + 22} rx={6} fill="var(--brand)" fillOpacity={0.08} stroke="var(--brand)" strokeOpacity={0.5} strokeDasharray="4 3" />
          {LEVELS.map(({ price, tone: t }) => (
            <g key={price}>
              <line x1={PAD_L} x2={W - PAD_R} y1={y(price)} y2={y(price)} stroke={tone(t)} strokeWidth={1.75} strokeDasharray="6 4" />
              <rect x={W - PAD_R + 2} y={y(price) - 9} width={PAD_R - 4} height={18} rx={4} fill={tone(t)} />
              <text x={W - PAD_R + 8} y={y(price) + 4} fill="var(--background)" fontSize={11} fontWeight={700} fontFamily="var(--font-jetbrains-mono)">
                {(price * 1000).toLocaleString("fr-FR")}
              </text>
            </g>
          ))}
          {labels && (
            <g fontSize={12} fontWeight={700} fontFamily="var(--font-jetbrains-mono)">
              <text x={x(14)} y={y(65.4) - 7} fill="var(--bear)">Résistance : 65 400</text>
              <text x={x(18)} y={y(63.2) + 16} fill="var(--bull)">Support : 63 200</text>
            </g>
          )}
          {/* Projected bullish path. */}
          <path d={`M${x(29)} ${y(65.05)} L${x(31)} ${y(65.6)} L${x(32.5)} ${y(65.3)} L${x(35)} ${y(66.9)}`} fill="none" stroke="var(--bull)" strokeWidth={2} strokeDasharray="5 4" />
          <circle cx={x(35)} cy={y(66.9)} r={4} fill="var(--bull)" />
        </>
      )}

      {CANDLES.map(({ open, high, low, close }, index) => {
        const color = annotated ? (close >= open ? "var(--bull)" : "var(--bear)") : "var(--muted)";
        return (
          <g key={index} opacity={annotated ? 1 : 0.85}>
            <line x1={x(index)} x2={x(index)} y1={y(high)} y2={y(low)} stroke={color} strokeWidth={1.25} />
            <rect
              x={x(index) - step * 0.32}
              width={step * 0.64}
              y={y(Math.max(open, close))}
              height={Math.max(1.5, Math.abs(y(open) - y(close)))}
              fill={close >= open && !annotated ? "transparent" : color}
              stroke={color}
              strokeWidth={1}
              rx={0.5}
            />
          </g>
        );
      })}

      <defs>
        <filter id="demo-glow" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
}
