import { hasLocale } from "@/i18n/config";
import { ogCard } from "@/lib/og-card";


const CARD = {
  fr: { kicker: "Analyse par IA", title: "L'IA qui analyse vos graphiques de trading", subtitle: "Une capture suffit : tendance, niveaux et plan chiffré. Première lecture gratuite." },
  en: { kicker: "AI chart analysis", title: "The AI that reads your trading charts", subtitle: "One screenshot: trend, levels and a plan with numbers. First reading free." },
  es: { kicker: "Análisis con IA", title: "La IA que analiza tus gráficos de trading", subtitle: "Basta una captura: tendencia, niveles y un plan con cifras. Primera lectura gratis." },
} as const;

/** The site's share card, in the page's language. */
export async function GET(_request: Request, { params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = hasLocale(lang) ? lang : "fr";
  return ogCard(CARD[locale]);
}
