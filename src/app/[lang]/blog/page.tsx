import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { articlesFor, readingMinutes } from "@/content/blog";
import { INTL_LOCALE, localePath, LOCALES } from "@/i18n/config";
import { getI18n } from "@/i18n/server";

const SITE = "https://scanzivo.com";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, t } = await getI18n();
  const languages = Object.fromEntries(LOCALES.filter((other) => articlesFor(other).length).map((other) => [other, localePath(other, "/blog")]));
  return {
    title: t.blog.title,
    description: t.blog.subtitle,
    alternates: { canonical: localePath(locale, "/blog"), languages: { ...languages, "x-default": "/blog" } },
    openGraph: {
      title: t.blog.title,
      description: t.blog.subtitle,
      url: `${SITE}${localePath(locale, "/blog")}`,
      images: [{ url: localePath(locale, "/og"), width: 1200, height: 630 }],
    },
  };
}

/** The blog index: reached from the footer only, written for readers who search how to read a chart. */
export default async function BlogIndex() {
  const { locale, t, href } = await getI18n();
  const articles = articlesFor(locale);
  if (!articles.length) notFound();
  // The blog and its articles as structured data, for search engines and AI assistants.
  const url = `${SITE}${localePath(locale, "/blog")}`;
  const structured = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: t.blog.title,
    description: t.blog.subtitle,
    url,
    inLanguage: locale,
    publisher: { "@type": "Organization", name: "Scanzivo", url: SITE },
    blogPost: articles.map((article) => ({
      "@type": "BlogPosting",
      headline: article.title,
      description: article.description,
      datePublished: article.date,
      url: `${SITE}${localePath(locale, `/blog/${article.slug}`)}`,
    })),
  };
  return (
    <div className="theme-light flex flex-1 flex-col">
      <SiteHeader />
      <main id="contenu" className="mx-auto w-full max-w-3xl flex-1 px-4 pb-24 pt-16 sm:pt-20">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structured).replace(/</g, "\\u003c") }} />
        <h1 className="display text-4xl sm:text-5xl">{t.blog.title}</h1>
        <p className="mt-4 max-w-xl text-lg text-muted">{t.blog.subtitle}</p>
        <ul className="mt-12 divide-y divide-border border-y border-border">
          {articles.map((article) => (
            <li key={article.slug}>
              <Link href={href(`/blog/${article.slug}`)} className="group block py-7">
                <h2 className="display text-2xl group-hover:text-brand">{article.title}</h2>
                <p className="mt-2 text-muted">{article.description}</p>
                <p className="label mt-3 text-muted">
                  {new Date(article.date).toLocaleDateString(INTL_LOCALE[locale], { day: "numeric", month: "long", year: "numeric" })} ·{" "}
                  {t.blog.minutes(readingMinutes(article))}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <SiteFooter />
    </div>
  );
}
