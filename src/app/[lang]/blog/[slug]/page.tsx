import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/blog/article-body";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ARTICLES, articleText, findArticle, readingMinutes, relatedTo, translationsOf } from "@/content/blog";
import { INTL_LOCALE, localePath } from "@/i18n/config";
import { formatEur } from "@/i18n/format";
import { getI18n } from "@/i18n/server";
import { OFFER_PRICE_EUR } from "@/lib/plans";

const SITE = "https://scanzivo.com";

// Every slug in every language (Cache Components refuses an empty list): an article missing in a language is a 404.
export function generateStaticParams() {
  return ARTICLES.map(({ slug }) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await getI18n();
  const article = findArticle(locale, (await params).slug);
  if (!article) return {};
  const path = localePath(locale, `/blog/${article.slug}`);
  return {
    title: `${article.title} — Scanzivo`,
    description: article.description,
    // The same guide in the other languages, so search engines show each reader their own.
    alternates: {
      canonical: path,
      languages: {
        ...Object.fromEntries(translationsOf(article).map((other) => [other.locale, localePath(other.locale, `/blog/${other.slug}`)])),
        // The French original, for readers in any other language.
        ...(translationsOf(article).some((other) => other.locale === "fr") ? { "x-default": `/blog/${article.key}` } : {}),
      },
    },
    openGraph: {
      type: "article",
      siteName: "Scanzivo",
      title: article.title,
      description: article.description,
      publishedTime: article.date,
      modifiedTime: article.updated ?? article.date,
      url: `${SITE}${path}`,
      images: [{ url: `${path}/og`, width: 1200, height: 630, alt: article.title }],
    },
    twitter: { card: "summary_large_image", title: article.title, description: article.description, images: [`${path}/og`] },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { locale, t, href } = await getI18n();
  const article = findArticle(locale, (await params).slug);
  if (!article) notFound();
  const url = `${SITE}${localePath(locale, `/blog/${article.slug}`)}`;
  const related = relatedTo(article);
  // The article as structured data, with its place in the site, for search engines and AI assistants.
  const structured = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: article.title,
      description: article.description,
      datePublished: article.date,
      dateModified: article.updated ?? article.date,
      inLanguage: locale,
      mainEntityOfPage: url,
      image: `${url}/og`,
      // Words are counted by spaces, which Japanese does not use.
      ...(locale === "ja" ? {} : { wordCount: articleText(article).split(/\s+/).length }),
      author: { "@type": "Organization", name: "Scanzivo", url: SITE },
      publisher: { "@type": "Organization", name: "Scanzivo", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/brand/scanzivo-icon-512.png` } },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Scanzivo", item: `${SITE}${localePath(locale, "/")}` },
        { "@type": "ListItem", position: 2, name: t.footer.blog, item: `${SITE}${localePath(locale, "/blog")}` },
        { "@type": "ListItem", position: 3, name: article.title, item: url },
      ],
    },
  ];

  return (
    <div className="theme-light flex flex-1 flex-col">
      <SiteHeader />
      <main id="contenu" className="mx-auto w-full max-w-3xl flex-1 px-4 pb-24 pt-14 sm:pt-20">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structured).replace(/</g, "\\u003c") }} />
        <Link href={href("/blog")} className="label text-muted hover:text-brand">
          ← {t.blog.back}
        </Link>
        <article className="mt-6">
          <h1 className="display text-4xl leading-[1.08] sm:text-5xl">{article.title}</h1>
          <p className="label mt-5 text-muted">
            {new Date(article.date).toLocaleDateString(INTL_LOCALE[locale], { day: "numeric", month: "long", year: "numeric" })} ·{" "}
            {t.blog.minutes(readingMinutes(article))}
          </p>
          <div className="mt-8">
            <ArticleBody blocks={article.body} localize={href} />
          </div>
          <p className="mt-10 border-t border-border pt-5 text-sm text-muted">{t.blog.disclaimer}</p>
        </article>

        <aside className="theme-dark mt-12 rounded-[1.75rem] bg-background p-7 text-foreground sm:p-9">
          <p className="display text-2xl sm:text-3xl">{t.blog.ctaTitle}</p>
          <p className="mt-3 max-w-xl text-muted">{t.blog.ctaText}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href={href("/")} className="btn-primary">
              {t.blog.ctaButton}
            </Link>
          </div>
        </aside>

        {related.length > 0 && (
          <section className="mt-14">
            <h2 className="label text-muted">{t.blog.related}</h2>
            <ul className="mt-4 divide-y divide-border border-y border-border">
              {related.map((other) => (
                <li key={other.slug}>
                  <Link href={href(`/blog/${other.slug}`)} className="group block py-5">
                    <p className="display text-xl group-hover:text-brand">{other.title}</p>
                    <p className="mt-1 text-sm text-muted">{other.description}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
