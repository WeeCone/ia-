import Link from "next/link";
import type { Block } from "@/content/blog";

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

export function ArticleBody({ blocks, localize }: { blocks: Block[]; localize: Localize }) {
  return (
    <div className="article">
      {blocks.map((block, i) => {
        if ("h2" in block) return <h2 key={i}>{block.h2}</h2>;
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
