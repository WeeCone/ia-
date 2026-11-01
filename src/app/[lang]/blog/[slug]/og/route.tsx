import { findArticle } from "@/content/blog";
import { hasLocale } from "@/i18n/config";
import { DICTIONARIES } from "@/i18n/dictionaries";
import { ogCard } from "@/lib/og-card";


/** Each article's share card: its title on the brand's chart picture. */
export async function GET(_request: Request, { params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const locale = hasLocale(lang) ? lang : "fr";
  const article = findArticle(locale, slug);
  const t = DICTIONARIES[locale];
  return ogCard({ kicker: t.footer.blog, title: article?.title ?? t.blog.title, subtitle: article ? article.description : t.blog.subtitle });
}
