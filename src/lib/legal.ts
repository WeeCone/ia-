// Company details for the legal pages. The publisher's identity, address and contact are not published yet: the pages
// show only the brand until they are filled in.
export const COMPANY = {
  brand: "Scanzivo",
};

/** Date of the current legal texts (all languages). */
export const LAST_UPDATED = new Date("2026-10-15T12:00:00Z");

export const LEGAL_LINKS = [
  { href: "/legal/mentions", key: "mentions" },
  { href: "/legal/cgv", key: "terms" },
  { href: "/legal/confidentialite", key: "privacy" },
] as const;
