import Link from "next/link";
import type { Block } from "@/content/blog";
import { headingId } from "@/lib/seo";

type Localize = (path: string) => string;

/**
 * `**bold**` and `[text](/path)` inside a sentence, nothing else: the articles are written as plain text. A link's path
 * is written without the language (/blog/..., /) and points to the reader's own language.
 */
function Inline({ text, localize }: { text: string; localize: Localize }) {
  return text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/).map((part, i) => {
    if (part.startsWith("**")) return <strong key={i}>{part.slice(2, -2)}</strong>;
    const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
    if (link) {
      return (
        <Link key={i} href={localize(link[2])}>
          {link[1]}
        </Link>
      );
    }
    return part;
  });
}

/** The anchor of the section heading at `index`: its text, or its number where the text has no Latin letters. */
export function sectionId(blocks: Block[], index: number) {
  const heading = blocks[index];
  if (!("h2" in heading)) return undefined;
  const position = blocks.slice(0, index).filter((block) => "h2" in block).length + 1;
  return headingId(heading.h2) || `section-${position}`;
}

export function ArticleBody({ blocks, localize }: { blocks: Block[]; localize: Localize }) {
  return (
    <div className="article">
      {blocks.map((block, i) => {
        if ("h2" in block) return <h2 key={i} id={sectionId(blocks, i)}>{block.h2}</h2>;
        if ("h3" in block) return <h3 key={i}>{block.h3}</h3>;
        if ("ul" in block)
          return (
            <ul key={i}>
              {block.ul.map((item) => (
                <li key={item}>
                  <Inline text={item} localize={localize} />
                </li>
              ))}
            </ul>
          );
        if ("ol" in block)
          return (
            <ol key={i}>
              {block.ol.map((item) => (
                <li key={item}>
                  <Inline text={item} localize={localize} />
                </li>
              ))}
            </ol>
          );
        if ("tip" in block)
          return (
            <p key={i} className="rounded-2xl border border-brand/25 bg-brand/[0.06] px-5 py-4 text-[0.98rem]">
              <Inline text={block.tip} localize={localize} />
            </p>
          );
        return (
          <p key={i}>
            <Inline text={block.p} localize={localize} />
          </p>
        );
      })}
    </div>
  );
}

/** The sections of an article as jump links, for guides long enough to need one. */
export function ArticleToc({ blocks, title }: { blocks: Block[]; title: string }) {
  const sections = blocks.map((block, index) => ({ block, index })).filter(({ block }) => "h2" in block);
  if (sections.length < 4) return null;
  return (
    <nav aria-label={title} className="mt-8 rounded-2xl border border-border bg-card px-5 py-4">
      <p className="label text-muted">{title}</p>
      <ol className="mt-3 space-y-1.5 text-[0.95rem]">
        {sections.map(({ block, index }) => (
          <li key={index}>
            <a href={`#${sectionId(blocks, index)}`} className="text-muted hover:text-brand">
              {"h2" in block ? block.h2 : ""}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
