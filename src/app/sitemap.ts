import type { MetadataRoute } from "next";
import { ARTICLES, articlesFor, translationsOf } from "@/content/blog";
import { LOCALES, localePath } from "@/i18n/config";
import { LAST_UPDATED, LEGAL_LINKS } from "@/lib/legal";

const SITE = "https://scanzivo.com";
const PAGES = [{ path: "/", priority: 1 }, ...LEGAL_LINKS.map(({ href }) => ({ path: href, priority: 0.3 }))];

/** The public pages in every language, each with its translations, for search engines and AI assistants. */
export default function sitemap(): MetadataRoute.Sitemap {
  const blog: MetadataRoute.Sitemap = [
    ...LOCALES.filter((locale) => articlesFor(locale).length).map((locale) => ({
      url: `${SITE}${localePath(locale, "/blog")}`,
      lastModified: new Date(latest(articlesFor(locale))),
      priority: 0.7,
      alternates: { languages: Object.fromEntries(LOCALES.map((other) => [other, `${SITE}${localePath(other, "/blog")}`])) },
    })),
    ...ARTICLES.map((article) => ({
      url: `${SITE}${localePath(article.locale, `/blog/${article.slug}`)}`,
      lastModified: new Date(article.updated ?? article.date),
      priority: 0.6,
      // Each article with its translations (hreflang), as on the page itself.
      alternates: {
        languages: Object.fromEntries(translationsOf(article).map((other) => [other.locale, `${SITE}${localePath(other.locale, `/blog/${other.slug}`)}`])),
      },
    })),
  ];
  return [...pages(), ...blog];
}

/** The most recent publication or update in a list of articles. */
function latest(articles: { date: string; updated?: string }[]) {
  return articles.map((article) => article.updated ?? article.date).sort().at(-1)!;
}

function pages(): MetadataRoute.Sitemap {
  return PAGES.flatMap(({ path, priority }) =>
    LOCALES.map((locale) => ({
      url: `${SITE}${localePath(locale, path)}`,
      lastModified: path.startsWith("/legal") ? LAST_UPDATED : new Date(),
      priority,
      alternates: { languages: Object.fromEntries(LOCALES.map((other) => [other, `${SITE}${localePath(other, path)}`])) },
    })),
  );
}
