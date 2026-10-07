import { timingSafeEqual } from "node:crypto";
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

// Ouvre l'aperçu d'une escale, même non publiée et en entier (ticket T-034).
// Lien : /api/apercu?secret=…&destination=rome ; le secret est APERCU_SECRET, dans Coolify.

function secretValide(recu: string | null) {
  const attendu = process.env.APERCU_SECRET;
  if (!attendu || !recu) return false;
  const a = Buffer.from(recu);
  const b = Buffer.from(attendu);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  if (!secretValide(url.searchParams.get("secret"))) {
    return new Response("Ce lien d'aperçu n'est pas valide.", { status: 401 });
  }
  const destination = url.searchParams.get("destination") ?? "";
  if (!/^[a-z-]{2,40}$/.test(destination)) {
    return new Response("Destination inconnue.", { status: 400 });
  }
  (await draftMode()).enable();
  redirect(`/destinations/${destination}/escale`);
}
