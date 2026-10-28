import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { articlesFor, readingMinutes } from "@/content/blog";
import { INTL_LOCALE, localePath } from "@/i18n/config";
import { getI18n } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, t } = await getI18n();
  return { title: `${t.blog.title}`, description: t.blog.subtitle, alternates: { canonical: localePath(locale, "/blog") } };
}

/** The blog index: reached from the footer only, written for readers who search how to read a chart. */
export default async function BlogIndex() {
  const { locale, t, href } = await getI18n();
  const articles = articlesFor(locale);
  if (!articles.length) notFound();
  return (
    <div className="theme-light flex flex-1 flex-col">
      <SiteHeader />
      <main id="contenu" className="mx-auto w-full max-w-3xl flex-1 px-4 pb-24 pt-16 sm:pt-20">
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
