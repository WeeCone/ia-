import type { MetadataRoute } from "next";

const SITE = "https://scanzivo.com";
// The private and transactional pages: nothing for a search engine or an assistant to quote.
const PRIVATE = ["/api/", "/dashboard", "/admin", "/welcome", "/en/dashboard", "/en/admin", "/en/welcome", "/es/dashboard", "/es/admin", "/es/welcome"];

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
