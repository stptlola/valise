// Données de départ (ticket T-008) : les vingt destinations, et la structure des escales de Rome,
// de Paris et de leurs escales voisines. Les contenus des escales (ticket T-034) sont importés
// à chaque démarrage depuis src/content/escales.
import { readdir, readFile } from "node:fs/promises";
import { PrismaPg } from "@prisma/adapter-pg";
import { Acces, PrismaClient, TypeDestination } from "../src/generated/prisma/client";
import { accesPartie, analyserEscale } from "../src/content/escales/analyse";
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
  // Les données de départ ne s'ajoutent que dans une base vide ; --force les remet à jour.
  if (!process.argv.includes("--force") && (await db.destination.count()) > 0) {
    console.log("Données de départ déjà présentes.");
  } else {
    await chargerDepart();
  }
  await importerContenus();
}

async function chargerDepart() {
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

/**
 * Importe le contenu de chaque escale depuis son fichier : parties, nouveautés et date de mise
 * à jour. Le fichier fait foi : la base est remise à son image à chaque démarrage, en attendant
 * le back-office (ticket T-081).
 */
async function importerContenus() {
  const dossier = new URL("../src/content/escales/", import.meta.url);
  const fichiers = (await readdir(dossier)).filter((nom) => nom.endsWith(".md"));

  for (const nom of fichiers) {
    const contenu = analyserEscale(await readFile(new URL(nom, dossier), "utf8"));
    const escale = await db.escale.findUnique({
      where: { destinationId: contenu.destination },
    });
    if (!escale) {
      console.log(`Contenu ${nom} ignoré : aucune escale pour ${contenu.destination}.`);
      continue;
    }

    const numeros = contenu.parties.map((partie) => partie.numero);
    await db.$transaction([
      ...contenu.parties.map((partie) => {
        const donnees = {
          titre: partie.titre,
          contenu: partie.blocs,
          acces: Acces[accesPartie(partie.blocs)],
        };
        return db.partieEscale.upsert({
          where: { escaleId_numero: { escaleId: escale.id, numero: partie.numero } },
          update: donnees,
          create: { escaleId: escale.id, numero: partie.numero, ...donnees },
        });
      }),
      db.partieEscale.deleteMany({
        where: { escaleId: escale.id, numero: { notIn: numeros } },
      }),
      db.nouveaute.deleteMany({ where: { escaleId: escale.id } }),
      db.nouveaute.createMany({
        data: contenu.nouveautes.map((nouveaute) => ({
          escaleId: escale.id,
          texte: nouveaute.texte,
          dateLe: nouveaute.dateLe ?? contenu.misAJourLe,
        })),
      }),
      db.escale.update({
        where: { id: escale.id },
        data: { misAJourLe: contenu.misAJourLe },
      }),
    ]);
    console.log(
      `Escale ${contenu.destination} : ${contenu.parties.length} parties et ${contenu.nouveautes.length} nouveautés importées.`,
    );
  }
}

main()
  .catch((erreur) => {
    console.error(erreur);
    process.exitCode = 1;
  })
  .finally(() => db.$disconnect());
