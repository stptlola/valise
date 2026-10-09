import { cookieApercu, enHttps, redirection } from "@/lib/apercu-jeton";

// Ferme l'aperçu et revient à la fiche de la destination.
export async function GET(request: Request) {
  const destination = new URL(request.url).searchParams.get("destination") ?? "";
  const chemin = /^[a-z-]{2,40}$/.test(destination)
    ? `/destinations/${destination}`
    : "/destinations";
  return redirection(chemin, cookieApercu(null, enHttps(request)));
}
