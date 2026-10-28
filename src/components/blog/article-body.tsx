import type { Block } from "@/content/blog";

/** `**bold**` inside a sentence, nothing else: the articles are written as plain text. */
function Inline({ text }: { text: string }) {
  return text.split(/(\*\*[^*]+\*\*)/).map((part, i) => (part.startsWith("**") ? <strong key={i}>{part.slice(2, -2)}</strong> : part));
}

export function ArticleBody({ blocks }: { blocks: Block[] }) {
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
                  <Inline text={item} />
                </li>
              ))}
            </ul>
          );
        if ("ol" in block)
          return (
            <ol key={i}>
              {block.ol.map((item) => (
                <li key={item}>
                  <Inline text={item} />
                </li>
              ))}
            </ol>
          );
        if ("tip" in block)
          return (
            <p key={i} className="rounded-2xl border border-brand/25 bg-brand/[0.06] px-5 py-4 text-[0.98rem]">
              <Inline text={block.tip} />
            </p>
          );
        return (
          <p key={i}>
            <Inline text={block.p} />
          </p>
        );
      })}
    </div>
  );
}
