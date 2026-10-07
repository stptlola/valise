import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

// Ferme l'aperçu et revient à la fiche de la destination.
export async function GET(request: Request) {
  (await draftMode()).disable();
  const destination = new URL(request.url).searchParams.get("destination") ?? "";
  redirect(/^[a-z-]{2,40}$/.test(destination) ? `/destinations/${destination}` : "/destinations");
}
