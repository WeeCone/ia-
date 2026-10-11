// Static candlestick chart drawn to match DEMO_ANALYSIS (prices in thousands of USDT).
type Candle = [open: number, high: number, low: number, close: number];

const CANDLES: Candle[] = [
  [62.6, 62.9, 61.9, 62.1], [62.1, 62.4, 61.8, 62.3], [62.3, 62.9, 62.1, 62.8], [62.8, 63.1, 62.4, 62.6],
  [62.6, 63.2, 62.5, 63.0], [63.0, 63.2, 62.6, 62.8], [62.8, 63.0, 62.2, 62.4], [62.4, 62.8, 62.1, 62.7],
  [62.7, 63.6, 62.6, 63.5], [63.5, 64.1, 63.3, 63.9], [63.9, 64.3, 63.5, 63.6], [63.6, 63.8, 63.2, 63.4],
  [63.4, 63.9, 63.2, 63.8], [63.8, 64.6, 63.7, 64.4], [64.4, 65.2, 64.2, 65.0], [65.0, 65.4, 64.5, 64.7],
  [64.7, 65.0, 64.1, 64.3], [64.3, 64.9, 64.0, 64.8], [64.8, 65.3, 64.6, 65.1], [65.1, 65.4, 64.7, 64.9],
  [64.9, 65.2, 64.4, 64.6], [64.6, 65.1, 64.5, 65.0],
];

const LEVELS = [
  { price: 67.0, tone: "bear" }, { price: 65.4, tone: "bear" },
  { price: 63.2, tone: "bull" }, { price: 61.8, tone: "bull" },
] as const;

const W = 520, H = 320, PAD_L = 4, PAD_R = 64, PAD_Y = 16, MIN = 61.4, MAX = 67.4;
const y = (price: number) => PAD_Y + ((MAX - price) / (MAX - MIN)) * (H - 2 * PAD_Y);
const step = (W - PAD_L - PAD_R) / CANDLES.length;

export function DemoChart() {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label="Graphique BTC/USDT 4H annoté avec supports et résistances">
      {LEVELS.map(({ price, tone }) => (
        <g key={price} className={tone === "bull" ? "text-bull" : "text-bear"}>
          <line x1={PAD_L} x2={W - PAD_R} y1={y(price)} y2={y(price)} stroke="currentColor" strokeDasharray="4 4" strokeOpacity={0.6} />
          <text x={W - PAD_R + 6} y={y(price) + 4} fill="currentColor" fontSize={14} fontFamily="var(--font-geist-mono)">
            {(price * 1000).toLocaleString("fr-FR")}
          </text>
        </g>
      ))}
      {CANDLES.map(([open, high, low, close], index) => {
        const x = PAD_L + index * step + step / 2;
        const up = close >= open;
        return (
          <g key={index} className={up ? "text-bull" : "text-bear"}>
            <line x1={x} x2={x} y1={y(high)} y2={y(low)} stroke="currentColor" strokeWidth={1.5} />
            <rect
              x={x - step * 0.3}
              width={step * 0.6}
              y={y(Math.max(open, close))}
              height={Math.max(1.5, Math.abs(y(open) - y(close)))}
                            fill="currentColor"
            />
          </g>
        );
      })}
    </svg>
  );
}
