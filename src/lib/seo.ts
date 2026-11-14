/** A page title with the brand when it fits: search engines cut titles at about 60 characters. */
export function pageTitle(title: string, brand = "Scanzivo") {
  const full = `${title} — ${brand}`;
  return full.length <= 62 ? full : title;
}

/** A meta description cut at a word boundary under about 155 characters (search results cut it there). */
export function metaDescription(text: string, max = 155) {
  if (text.length <= max) return text;
  // Languages written without spaces (Japanese, Chinese) have nothing to cut at: cut at the length.
  const cut = text.slice(0, max - 1);
  const space = cut.lastIndexOf(" ");
  return `${(space > max * 0.6 ? cut.slice(0, space) : cut).replace(/[\s,;:.\-–—]+$/, "")}…`;
}

/** An anchor id for a heading: lower case, accents removed, dashes; empty when nothing Latin remains. */
export function headingId(text: string) {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}
