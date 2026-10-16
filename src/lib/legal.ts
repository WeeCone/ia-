// Company details shown on the legal pages. Fill in every "[À COMPLÉTER]" before going live.
export const COMPANY = {
  brand: "Scanzivo",
  name: "[À COMPLÉTER : raison sociale]",
  legalForm: "[À COMPLÉTER : forme juridique et capital, ex. SAS au capital de 1 000 €]",
  address: "[À COMPLÉTER : adresse du siège]",
  registration: "[À COMPLÉTER : RCS / SIREN]",
  vat: "[À COMPLÉTER : n° de TVA intracommunautaire]",
  director: "[À COMPLÉTER : directeur de la publication]",
  email: "[À COMPLÉTER : email de contact]",
};

/** Date of the current legal texts (all languages). */
export const LAST_UPDATED = new Date("2026-10-15T12:00:00Z");

export const LEGAL_LINKS = [
  { href: "/legal/mentions", key: "mentions" },
  { href: "/legal/cgv", key: "terms" },
  { href: "/legal/confidentialite", key: "privacy" },
] as const;
