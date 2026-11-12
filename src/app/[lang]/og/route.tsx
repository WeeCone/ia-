import { hasLocale } from "@/i18n/config";
import { ogCard } from "@/lib/og-card";


const CARD = {
  fr: { kicker: "Analyse par IA", title: "L'IA qui analyse vos graphiques de trading", subtitle: "Une capture suffit : tendance, niveaux et plan chiffré. Première lecture gratuite." },
  en: { kicker: "AI chart analysis", title: "The AI that reads your trading charts", subtitle: "One screenshot: trend, levels and a plan with numbers. First reading free." },
  es: { kicker: "Análisis con IA", title: "La IA que analiza tus gráficos de trading", subtitle: "Basta una captura: tendencia, niveles y un plan con cifras. Primera lectura gratis." },
  ja: { kicker: "AIチャート分析", title: "トレードチャートを読み解くAI", subtitle: "スクリーンショット1枚で、トレンド・水準・数値付きプランを。初回の読み取りは無料。" },
  ko: { kicker: "AI 차트 분석", title: "트레이딩 차트를 읽어 주는 AI", subtitle: "스크린샷 한 장으로 추세, 레벨, 수치가 담긴 플랜까지. 첫 분석은 무료." },
  vi: { kicker: "Phân tích bằng AI", title: "AI đọc biểu đồ giao dịch của bạn", subtitle: "Chỉ cần một ảnh chụp: xu hướng, các mức giá và kế hoạch có số liệu. Lần đọc đầu tiên miễn phí." },
  id: { kicker: "Analisis dengan AI", title: "AI yang membaca grafik trading Anda", subtitle: "Cukup satu tangkapan layar: tren, level harga, dan rencana dengan angka. Bacaan pertama gratis." },
  it: { kicker: "Analisi con IA", title: "L'IA che legge i Suoi grafici di trading", subtitle: "Basta uno screenshot: trend, livelli e un piano con i numeri. La prima lettura è gratuita." },
  de: { kicker: "KI-Chartanalyse", title: "Die KI, die Ihre Trading-Charts liest", subtitle: "Ein Screenshot genügt: Trend, Marken und ein Plan mit Zahlen. Die erste Analyse ist kostenlos." },
  pt: { kicker: "Análise com IA", title: "A IA que lê seus gráficos de trading", subtitle: "Basta um print: tendência, níveis e um plano com números. A primeira leitura é grátis." },
} as const;

/** The site's share card, in the page's language. */
export async function GET(_request: Request, { params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = hasLocale(lang) ? lang : "fr";
  return ogCard(CARD[locale]);
}
