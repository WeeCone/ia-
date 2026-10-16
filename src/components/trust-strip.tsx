import { getI18n } from "@/i18n/server";

/** Facts that answer the last objections at the moment of paying. Only true statements: no ratings, counts or logos. */
const ICONS = [
  { path: "M6 10V7a6 6 0 0 1 12 0v3M5 10h14v11H5z M12 14v3" },
  { path: "M4 12a8 8 0 1 0 2.3-5.6M4 4v4h4" },
  { path: "M12 3l8 3v6c0 4.5-3.4 8.4-8 9-4.6-.6-8-4.5-8-9V6z M9 12l2 2 4-4" },
  { path: "M4 5h16v14H4z M8 15l3-4 2 2 3-4" },
];

export async function TrustStrip() {
  const { t } = await getI18n();
  const ITEMS = ICONS.map(({ path }, index) => ({ path, text: t.trust[index] }));
  return (
    <ul className="grid gap-x-6 gap-y-3 text-sm text-muted sm:grid-cols-2 lg:grid-cols-4">
      {ITEMS.map(({ text, path }) => (
        <li key={text} className="flex items-start gap-2.5">
          <svg viewBox="0 0 24 24" className="mt-0.5 size-4 shrink-0 text-accent" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d={path} />
          </svg>
          {text}
        </li>
      ))}
    </ul>
  );
}
