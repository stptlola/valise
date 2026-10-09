import {
  cookieApercu,
  enHttps,
  jetonApercu,
  redirection,
  secretValide,
} from "@/lib/apercu-jeton";

// Ouvre l'aperçu d'une escale, même non publiée et en entier (ticket T-034).
// Lien : /api/apercu?secret=…&destination=rome ; le secret est APERCU_SECRET, dans Coolify.
export async function GET(request: Request) {
  const url = new URL(request.url);
  if (!secretValide(url.searchParams.get("secret"))) {
    return new Response("Ce lien d'aperçu n'est pas valide.", { status: 401 });
  }
  const destination = url.searchParams.get("destination") ?? "";
  if (!/^[a-z-]{2,40}$/.test(destination)) {
    return new Response("Destination inconnue.", { status: 400 });
  }
  return redirection(
    `/destinations/${destination}/escale`,
    cookieApercu(jetonApercu(), enHttps(request)),
  );
}
