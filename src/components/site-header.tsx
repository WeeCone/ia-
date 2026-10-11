import Link from "next/link";
import { Logo } from "./logo";

const MARKETS = ["BTC/USDT", "ETH/USDT", "SOL/USDT", "EUR/USD", "GBP/JPY", "XAU/USD", "WTI", "NASDAQ 100", "S&P 500", "CAC 40", "AAPL", "TSLA"];

export function SiteHeader() {
  return (
    <>
      <header className="border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
          <Logo />
          <nav className="flex items-center gap-1">
            <Link href="/pricing" className="btn-ghost">Tarifs</Link>
            <Link href="/auth/login" className="btn-ghost hidden sm:inline-flex">Connexion</Link>
            <Link href="/auth/signup" className="btn-primary ml-2 py-2.5">Commencer</Link>
          </nav>
        </div>
      </header>
      {/* Markets we read — names only, no live prices. */}
      <div className="overflow-hidden border-b border-border bg-surface py-2" aria-hidden>
        <div className="flex w-max animate-[ticker_40s_linear_infinite] gap-10 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
          {[...MARKETS, ...MARKETS].map((market, index) => (
            <span key={index} className="flex items-center gap-10">
              {market}
              <span className="text-brand">◆</span>
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
