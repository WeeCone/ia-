import type { MetadataRoute } from "next";
import { LOCALES, localePath } from "@/i18n/config";
import { LAST_UPDATED, LEGAL_LINKS } from "@/lib/legal";

const SITE = "https://scanzivo.com";
const PAGES = [{ path: "/", priority: 1 }, { path: "/pricing", priority: 0.8 }, ...LEGAL_LINKS.map(({ href }) => ({ path: href, priority: 0.3 }))];

/** The public pages in every language, each with its translations, for search engines and AI assistants. */
export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.flatMap(({ path, priority }) =>
    LOCALES.map((locale) => ({
      url: `${SITE}${localePath(locale, path)}`,
      lastModified: path.startsWith("/legal") ? LAST_UPDATED : new Date(),
      priority,
      alternates: { languages: Object.fromEntries(LOCALES.map((other) => [other, `${SITE}${localePath(other, path)}`])) },
    })),
  );
}
