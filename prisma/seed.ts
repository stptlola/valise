// Données de départ (ticket T-008) : les vingt destinations et escales, et la structure des escales
// de Rome, de Paris et de leurs escales voisines. Les textes arrivent avec les tickets de contenu.
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, TypeDestination } from "../src/generated/prisma/client";
import { villes } from "../src/content/villes";

const db = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

const types = {
  complete: TypeDestination.COMPLETE,
  fiche: TypeDestination.FICHE,
  voisine: TypeDestination.VOISINE,
} as const;

// Prix validés : environ 19,99 € pour une escale complète, 4,99 € pour une escale voisine.
const PRIX_ESCALE_COMPLETE = 1999;
const PRIX_ESCALE_VOISINE = 499;

async function main() {
  for (const v of villes) {
    const donnees = {
      nom: v.nom,
      pays: v.pays,
      code: v.code,
      couleur: v.couleur,
      type: types[v.type],
      autocollant: v.autocollant ?? null,
    };
    await db.destination.upsert({
      where: { id: v.id },
      update: donnees,
      create: { id: v.id, ...donnees },
    });
  }

  for (const v of villes.filter((ville) => ville.type === "complete")) {
    await db.escale.upsert({
      where: { destinationId: v.id },
      update: {},
      create: { destinationId: v.id, prixCentimes: PRIX_ESCALE_COMPLETE },
    });
  }

  for (const v of villes.filter((ville) => ville.type === "voisine")) {
    const principale = await db.escale.findUniqueOrThrow({
      where: { destinationId: v.principale },
    });
    await db.escale.upsert({
      where: { destinationId: v.id },
      update: { principaleId: principale.id },
      create: {
        destinationId: v.id,
        prixCentimes: PRIX_ESCALE_VOISINE,
        principaleId: principale.id,
      },
    });
  }

  console.log(`${villes.length} destinations et leurs escales sont en place.`);
}

main()
  .catch((erreur) => {
    console.error(erreur);
    process.exitCode = 1;
  })
  .finally(() => db.$disconnect());
