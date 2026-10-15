// Where traders take their screenshots. Names only, set as text: compatibility, not partnership.
const PLATFORMS = [
  "TradingView",
  "Binance",
  "MetaTrader 4",
  "MetaTrader 5",
  "Bybit",
  "Coinbase",
  "Kraken",
  "eToro",
  "cTrader",
  "ProRealTime",
  "Interactive Brokers",
  "Bitget",
];

export function PlatformMarquee() {
  return (
    <div className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
      <ul className="flex w-max animate-[marquee_38s_linear_infinite] group-hover:[animation-play-state:paused]" aria-label="Plateformes compatibles">
        {[...PLATFORMS, ...PLATFORMS].map((name, index) => (
          <li
            key={`${name}-${index}`}
            aria-hidden={index >= PLATFORMS.length || undefined}
            className="whitespace-nowrap pr-14 font-display text-xl font-semibold tracking-tight text-muted/80 sm:text-2xl"
          >
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
}
