import { GOLD } from "@/content/gold";
import { hasLocale } from "@/i18n/config";
import { ogCard } from "@/lib/og-card";

/** The gold page's share card. */
export async function GET(_request: Request, { params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const page = GOLD[hasLocale(lang) ? lang : "fr"] ?? GOLD.en!;
  return ogCard({ kicker: page.kicker, title: page.title, subtitle: page.titleB });
}
