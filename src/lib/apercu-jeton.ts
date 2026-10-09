import { createHmac, timingSafeEqual } from "node:crypto";

// Aperçu des escales non publiées (ticket T-034), sans le mode brouillon de Next.js : celui-ci
// pose un cookie « Secure » que le navigateur refuse tant que le site est en HTTP (sslip.io).

export const COOKIE_APERCU = "valise_apercu";
const DUREE_APERCU = 7 * 24 * 60 * 60; // une semaine, en secondes

function egal(a: string, b: string) {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

/** Vrai si le secret reçu dans le lien est APERCU_SECRET. */
export function secretValide(recu: string | null, attendu = process.env.APERCU_SECRET) {
  return !!attendu && !!recu && egal(recu, attendu);
}

/** Valeur du cookie, dérivée du secret : changer APERCU_SECRET ferme tous les aperçus ouverts. */
export function jetonApercu(secret = process.env.APERCU_SECRET) {
  if (!secret) return null;
  return createHmac("sha256", secret).update("apercu-des-escales").digest("hex");
}

export function jetonValide(valeur: string | undefined, secret = process.env.APERCU_SECRET) {
  const attendu = jetonApercu(secret);
  return !!attendu && !!valeur && egal(valeur, attendu);
}

/** Vrai si le visiteur arrive en HTTPS, directement ou derrière le proxy de Coolify. */
export function enHttps(request: Request) {
  const proto = request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim();
  return proto === "https" || new URL(request.url).protocol === "https:";
}

/** L'en-tête Set-Cookie de l'aperçu ; « Secure » seulement en HTTPS. Sans jeton, il l'efface. */
export function cookieApercu(jeton: string | null, https: boolean) {
  const attributs = ["Path=/", "HttpOnly", "SameSite=Lax"];
  attributs.push(jeton ? `Max-Age=${DUREE_APERCU}` : "Max-Age=0");
  if (https) attributs.push("Secure");
  return [`${COOKIE_APERCU}=${jeton ?? ""}`, ...attributs].join("; ");
}

/** Redirection vers un chemin du site, avec un cookie ; l'adresse reste relative au site. */
export function redirection(chemin: string, cookie: string) {
  return new Response(null, {
    status: 303,
    headers: { Location: chemin, "Set-Cookie": cookie, "Cache-Control": "no-store" },
  });
}
