import { TypeDestination } from "@/generated/prisma/client";
import { db } from "@/lib/db";

// Accès aux destinations dans la base (tickets T-031 et T-032).
// Les statuts « brouillon » et « publié » seront pris en compte avec le back-office (T-082).

const parNom = (a: { nom: string }, b: { nom: string }) =>
  a.nom.localeCompare(b.nom, "fr");

/** Les quinze destinations : d'abord les escales complètes, puis les fiches, par ordre alphabétique. */
export async function listerDestinations() {
  const destinations = await db.destination.findMany({
    where: { type: { not: TypeDestination.VOISINE } },
    select: {
      id: true,
      nom: true,
      pays: true,
      code: true,
      couleur: true,
      type: true,
      autocollant: true,
    },
  });
  const completes = destinations
    .filter((d) => d.type === TypeDestination.COMPLETE)
    .sort(parNom);
  const fiches = destinations
    .filter((d) => d.type === TypeDestination.FICHE)
    .sort(parNom);
  return [...completes, ...fiches];
}

/** Une destination avec son climat et son escale, ou null si elle n'existe pas. */
export async function trouverDestination(id: string) {
  return db.destination.findUnique({
    where: { id },
    include: {
      climat: { orderBy: { mois: "asc" } },
      escale: { select: { prixCentimes: true } },
    },
  });
}
