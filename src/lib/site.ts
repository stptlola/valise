// Adresse publique du site et référencement (ticket T-014).

/** Adresse publique du site, définie dans Coolify par SITE_URL. */
export const urlDuSite = (
  process.env.SITE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

/** Le site n'est référencé par les moteurs de recherche qu'avec SITE_INDEXABLE=1, une fois le domaine en place. */
export const siteIndexable = process.env.SITE_INDEXABLE === "1";
