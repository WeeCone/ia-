import Link from "next/link";
import { Logo } from "./logo";

const MARKETS = ["BTC/USDT", "ETH/USDT", "SOL/USDT", "EUR/USD", "GBP/JPY", "XAU/USD", "WTI", "NASDAQ 100", "S&P 500", "CAC 40", "AAPL", "TSLA"];

export function SiteHeader() {
  return (
    <>
      <header className="border-b-[3px] border-foreground bg-white">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-2 px-4 py-4">
          <Logo />
          <nav className="flex items-center gap-1">
            <Link href="/pricing" className="btn-ghost">Tarifs</Link>
            <Link href="/auth/login" className="btn-ghost hidden sm:inline-flex">Connexion</Link>
            <Link href="/auth/signup" className="btn-primary ml-2 hidden px-4 py-2 sm:inline-flex">Commencer</Link>
          </nav>
        </div>
      </header>
      {/* Markets we read — names only, no live prices. */}
      <div className="overflow-hidden border-b-[3px] border-foreground bg-foreground py-2.5" aria-hidden>
        <div className="flex w-max animate-[ticker_35s_linear_infinite] gap-8 font-display text-sm uppercase text-brand">
          {[...MARKETS, ...MARKETS].map((market, index) => (
            <span key={index} className="flex items-center gap-8">
              {market}
              <span className="text-white">✱</span>
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
