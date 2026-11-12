import type { MetadataRoute } from "next";
import { LOCALES } from "@/i18n/config";

const SITE = "https://scanzivo.com";
// The private and transactional pages: nothing for a search engine or an assistant to quote.
const PRIVATE = ["/api/", "/dashboard", "/admin", "/welcome", ...LOCALES.filter((locale) => locale !== "fr").flatMap((locale) => [`/${locale}/dashboard`, `/${locale}/admin`, `/${locale}/welcome`])];

/**
 * Open to search engines and, named explicitly, to the AI assistants' crawlers (ChatGPT, Perplexity, Claude, Gemini),
 * which already send visitors who ask them for a chart-analysis tool.
 */
export default function robots(): MetadataRoute.Robots {
  const agents = ["*", "GPTBot", "OAI-SearchBot", "ChatGPT-User", "PerplexityBot", "Perplexity-User", "ClaudeBot", "Claude-User", "Claude-SearchBot", "Google-Extended", "Applebot-Extended"];
  return {
    rules: agents.map((userAgent) => ({ userAgent, allow: "/", disallow: PRIVATE })),
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
