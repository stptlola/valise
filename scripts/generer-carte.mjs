// Génère src/content/carte-du-monde.ts à partir des pays de Natural Earth (domaine public), au 1/110 000 000.
// Usage : node scripts/generer-carte.mjs chemin/vers/ne_110m_admin_0_countries.geojson
// Source : https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_110m_admin_0_countries.geojson
import { readFileSync, writeFileSync } from "node:fs";
import { geoNaturalEarth1, geoPath } from "d3-geo";

const LARGEUR = 1000;
const HAUTEUR = 500;

const source = JSON.parse(readFileSync(process.argv[2], "utf8"));
// L'Antarctique est retirée : la carte sert aux voyages.
const pays = source.features.filter((f) => f.properties.ISO_A2_EH !== "AQ");
const collection = { type: "FeatureCollection", features: pays };

const projection = geoNaturalEarth1().fitExtent(
  [
    [4, 4],
    [LARGEUR - 4, HAUTEUR - 4],
  ],
  collection,
);
const chemin = geoPath(projection).digits(1);

const lignes = pays
  .map((f) => ({
    code: f.properties.ISO_A2_EH,
    nom: f.properties.NAME_FR,
    continent: f.properties.CONTINENT,
    d: chemin(f),
  }))
  .filter((p) => p.d)
  .sort((a, b) => a.nom.localeCompare(b.nom, "fr"));

const [tx, ty] = projection.translate();
const contenu = `// Fichier généré par scripts/generer-carte.mjs à partir de Natural Earth (domaine public). Ne pas modifier à la main.

export const carteViewBox = "0 0 ${LARGEUR} ${HAUTEUR}";

/** Réglages de la projection Natural Earth utilisée pour dessiner la carte. */
export const projectionCarte = { echelle: ${projection.scale().toFixed(4)}, x: ${tx.toFixed(4)}, y: ${ty.toFixed(4)} };

export type PaysCarte = { code: string; nom: string; continent: string; d: string };

export const paysCarte: PaysCarte[] = ${JSON.stringify(lignes, null, 0).replace(/\},\{/g, "},\n  {")};
`;
writeFileSync("src/content/carte-du-monde.ts", contenu);
console.log(`${lignes.length} pays, ${Math.round(contenu.length / 1024)} Ko`);
