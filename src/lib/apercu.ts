import { cookies } from "next/headers";
import { COOKIE_APERCU, jetonValide } from "@/lib/apercu-jeton";

/** Vrai si le visiteur a ouvert l'aperçu avec le lien secret. */
export async function apercuActif() {
  return jetonValide((await cookies()).get(COOKIE_APERCU)?.value);
}
