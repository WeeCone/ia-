export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  market: string;
  /** Placeholder copy. Shown with a visible "Exemple" tag; replace with real, verifiable customer reviews. */
  example?: boolean;
};

// Replace these with genuine reviews (with the customer's consent) before launch.
// Publishing invented reviews as real ones is a misleading commercial practice under French law.
export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Je colle ma capture TradingView avant chaque entrée. Les deux scénarios m'obligent à penser à l'invalidation avant de cliquer.",
    name: "Prénom N.",
    role: "Trader crypto, swing",
    market: "BTC/USDT · 4H",
    example: true,
  },
  {
    quote:
      "Ce que j'apprécie, ce sont les niveaux chiffrés : entrée, stop, objectifs. Je compare avec mon propre plan et je vois vite ce que j'ai raté.",
    name: "Prénom N.",
    role: "Trader forex, intraday",
    market: "EUR/USD · 1H",
    example: true,
  },
  {
    quote:
      "Je débute en analyse technique. Lire pourquoi un support compte, sur mon propre graphique, m'apprend plus qu'un cours théorique.",
    name: "Prénom N.",
    role: "Investisseur débutant",
    market: "XAU/USD · Daily",
    example: true,
  },
];
