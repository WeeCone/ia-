// "What makes a good capture": a good/bad pair of mini charts, a checklist and how-tos per platform.

const RISING = [62, 58, 60, 54, 50, 52, 46, 42, 44, 38, 34, 36, 30, 26, 28, 24];

function GoodCapture() {
  return (
    <svg viewBox="0 0 220 120" className="h-auto w-full" aria-hidden>
      <rect width="220" height="120" rx="8" fill="#0b0e14" />
      <text x="8" y="14" fontSize="8" fill="#e6edf3" fontFamily="var(--font-jetbrains-mono)">BTC/USDT · 4H</text>
      {[30, 55, 80, 105].map((y, i) => (
        <g key={y}>
          <line x1="8" x2="180" y1={y} y2={y} stroke="#30363d" strokeWidth="0.6" />
          <text x="186" y={y + 3} fontSize="7" fill="#8b949e" fontFamily="var(--font-jetbrains-mono)">
            {(68 - i * 2).toString()} 000
          </text>
        </g>
      ))}
      {RISING.map((y, i) => {
        const up = i % 3 !== 1;
        const x = 14 + i * 10.5;
        const top = y + 20;
        return (
          <g key={i}>
            <line x1={x} x2={x} y1={top - 6} y2={top + 16} stroke={up ? "#00f5a0" : "#ff4d6d"} strokeWidth="1" />
            <rect x={x - 3} y={top} width="6" height="10" fill={up ? "#00f5a0" : "#ff4d6d"} />
          </g>
        );
      })}
      <line x1="178" x2="178" y1="20" y2="112" stroke="#30363d" strokeWidth="0.8" />
    </svg>
  );
}

function BadCapture() {
  return (
    <svg viewBox="0 0 220 120" className="h-auto w-full" aria-hidden>
      <defs>
        <filter id="capture-guide-blur">
          <feGaussianBlur stdDeviation="2.2" />
        </filter>
      </defs>
      <rect width="220" height="120" rx="8" fill="#0b0e14" />
      <polyline
        filter="url(#capture-guide-blur)"
        fill="none"
        stroke="#00d2ff"
        strokeWidth="3"
        points="30,95 55,80 70,88 95,60 110,70 130,48 150,55 175,35"
      />
    </svg>
  );
}

const CHECKS = [
  "Des bougies, pas une simple courbe",
  "L'axe des prix lisible, à droite",
  "Le nom de l'actif et l'unité de temps visibles en haut",
  "50 à 150 bougies : ni trop zoomé, ni trop dézoomé",
  "Vos indicateurs utiles (RSI, volume, moyennes mobiles) si vous en avez",
];

export function CaptureGuide({ defaultOpen = false }: { defaultOpen?: boolean }) {
  return (
    <details className="panel group mt-4" open={defaultOpen}>
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-3.5 text-sm font-medium [&::-webkit-details-marker]:hidden">
        <span>
          Comment faire une bonne capture ? <span className="text-muted">La qualité de l&apos;analyse en dépend.</span>
        </span>
        <span className="shrink-0 font-display text-xl leading-none text-brand transition-transform group-open:rotate-45" aria-hidden>
          +
        </span>
      </summary>
      <div className="grid gap-6 border-t border-border px-5 py-5 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        <div className="grid grid-cols-2 gap-3">
          <figure>
            <div className="overflow-hidden rounded-lg ring-2 ring-bull/60">
              <GoodCapture />
            </div>
            <figcaption className="mt-2 text-xs">
              <span className="font-semibold text-bull">✓ Bonne capture</span>
              <span className="block text-muted">Bougies, axe des prix, actif et unité de temps.</span>
            </figcaption>
          </figure>
          <figure>
            <div className="overflow-hidden rounded-lg ring-2 ring-bear/60">
              <BadCapture />
            </div>
            <figcaption className="mt-2 text-xs">
              <span className="font-semibold text-bear">✗ À éviter</span>
              <span className="block text-muted">Simple courbe floue, sans prix ni actif.</span>
            </figcaption>
          </figure>
        </div>
        <div className="space-y-4 text-sm">
          <ul className="space-y-1.5">
            {CHECKS.map((check) => (
              <li key={check} className="flex gap-2">
                <span className="text-bull" aria-hidden>
                  ✓
                </span>
                {check}
              </li>
            ))}
          </ul>
          <div className="space-y-2 rounded-xl border border-border bg-background/50 p-3 text-xs leading-relaxed text-muted">
            <p>
              <span className="font-semibold text-foreground">TradingView (ordinateur)</span> : icône appareil photo en haut du graphique →
              « Copier l&apos;image », puis Ctrl+V ici.
            </p>
            <p>
              <span className="font-semibold text-foreground">Windows / Mac</span> : Win+Maj+S ou Cmd+Maj+4 pour capturer une zone, puis Ctrl+V
              (Cmd+V) ici.
            </p>
            <p>
              <span className="font-semibold text-foreground">Téléphone</span> : graphique en paysage, en bougies, puis capture d&apos;écran. Évitez
              de photographier un écran.
            </p>
          </div>
        </div>
      </div>
    </details>
  );
}
