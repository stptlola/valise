// Analyse d'un fichier de contenu d'escale (ticket T-034).
// Le fichier est écrit en Markdown simple : « ## 1. Titre » ouvre une partie, et des repères
// en commentaire marquent le graphique du climat et le début de la partie réservée.
// Ce module est utilisé par prisma/seed.ts : il ne doit pas importer d'alias « @/ ».

export type Bloc =
  | { type: "titre"; niveau: 3 | 4; texte: string }
  | { type: "paragraphe"; texte: string }
  | { type: "liste"; ordonnee: boolean; elements: string[] }
  | { type: "cases"; elements: string[] }
  | { type: "tableau"; entetes: string[]; lignes: string[][] }
  | { type: "sources"; texte: string }
  | { type: "pluie"; texte: string }
  | { type: "graphique"; nom: "climat" }
  | { type: "verrou" };

export type PartieAnalysee = { numero: number; titre: string; blocs: Bloc[] };
export type NouveauteAnalysee = { texte: string; dateLe: Date | null };
export type EscaleAnalysee = {
  destination: string;
  misAJourLe: Date;
  parties: PartieAnalysee[];
  nouveautes: NouveauteAnalysee[];
};

const REPERE_PAYANT = "<!-- payant -->";
const REPERE_CLIMAT = "<!-- graphique : climat -->";

const MOIS = [
  "janvier",
  "février",
  "mars",
  "avril",
  "mai",
  "juin",
  "juillet",
  "août",
  "septembre",
  "octobre",
  "novembre",
  "décembre",
];

/** Sépare l'en-tête (« clé: valeur » entre deux lignes « --- ») du reste du fichier. */
function lireEntete(source: string) {
  const resultat = /^---\n([\s\S]*?)\n---\n/.exec(source);
  if (!resultat) throw new Error("Le fichier d'escale doit commencer par un en-tête « --- ».");
  const entete: Record<string, string> = {};
  for (const ligne of resultat[1].split("\n")) {
    const separateur = ligne.indexOf(":");
    if (separateur > 0) {
      entete[ligne.slice(0, separateur).trim()] = ligne.slice(separateur + 1).trim();
    }
  }
  return { entete, corps: source.slice(resultat[0].length) };
}

/** Retire les commentaires, sauf les deux repères connus, gardés sur leur propre ligne. */
function nettoyerCommentaires(corps: string) {
  return corps.replace(/<!--[\s\S]*?-->/g, (commentaire) => {
    const compact = commentaire.replace(/\s+/g, " ").trim();
    if (compact === REPERE_PAYANT || compact === REPERE_CLIMAT) return `\n\n${compact}\n\n`;
    return "\n";
  });
}

function cellules(ligne: string) {
  return ligne
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cellule) => cellule.trim());
}

/** Transforme un groupe de lignes non vides en bloc. */
function bloc(lignes: string[]): Bloc {
  const texte = lignes.join(" ").trim();
  const toutes = (motif: RegExp) => lignes.every((ligne) => motif.test(ligne));

  if (texte === REPERE_PAYANT) return { type: "verrou" };
  if (texte === REPERE_CLIMAT) return { type: "graphique", nom: "climat" };
  if (lignes.length === 1 && /^#{3,4} /.test(texte)) {
    return {
      type: "titre",
      niveau: texte.startsWith("####") ? 4 : 3,
      texte: texte.replace(/^#{3,4} /, ""),
    };
  }
  if (toutes(/^- \[[ x]\] /)) {
    return { type: "cases", elements: lignes.map((l) => l.replace(/^- \[[ x]\] /, "")) };
  }
  if (toutes(/^- /)) {
    return { type: "liste", ordonnee: false, elements: lignes.map((l) => l.slice(2)) };
  }
  if (toutes(/^\d+\. /)) {
    return {
      type: "liste",
      ordonnee: true,
      elements: lignes.map((l) => l.replace(/^\d+\. /, "")),
    };
  }
  if (toutes(/^\|/) && lignes.length >= 2) {
    const [entete, , ...corps] = lignes;
    return { type: "tableau", entetes: cellules(entete), lignes: corps.map(cellules) };
  }
  if (/^(Sources?|Autres sources)\b/.test(texte)) return { type: "sources", texte };
  if (texte.startsWith("**Plan B pluie**")) return { type: "pluie", texte };
  return { type: "paragraphe", texte };
}

/** Date française trouvée dans un texte, comme « 2 février 2026 » ou « 1er juillet 2026 ». */
export function dateFrancaise(texte: string): Date | null {
  const resultat = new RegExp(`(\\d{1,2})(?:er)? (${MOIS.join("|")}) (\\d{4})`).exec(texte);
  if (!resultat) return null;
  const [, jour, mois, annee] = resultat;
  return new Date(Date.UTC(Number(annee), MOIS.indexOf(mois), Number(jour)));
}

export function analyserEscale(source: string): EscaleAnalysee {
  const { entete, corps } = lireEntete(source.replace(/\r\n/g, "\n"));
  if (!entete.destination) throw new Error("L'en-tête doit indiquer la destination.");
  const misAJourLe = new Date(`${entete.misAJourLe}T00:00:00Z`);
  if (Number.isNaN(misAJourLe.getTime())) {
    throw new Error("L'en-tête doit indiquer misAJourLe au format AAAA-MM-JJ.");
  }

  const parties: PartieAnalysee[] = [];
  let groupe: string[] = [];

  const fermerGroupe = () => {
    if (groupe.length > 0 && parties.length > 0) {
      parties[parties.length - 1].blocs.push(bloc(groupe));
    }
    groupe = [];
  };

  for (const brute of nettoyerCommentaires(corps).split("\n")) {
    const ligne = brute.trimEnd();
    const titrePartie = /^## (\d+)\. (.+)$/.exec(ligne);
    if (titrePartie) {
      fermerGroupe();
      parties.push({ numero: Number(titrePartie[1]), titre: titrePartie[2].trim(), blocs: [] });
    } else if (ligne.trim() === "") {
      fermerGroupe();
    } else {
      groupe.push(ligne.trim());
    }
  }
  fermerGroupe();

  // Les nouveautés sont les éléments de la première liste de la partie 2, « Ce qui a changé ».
  const changements = parties.find((partie) => partie.numero === 2);
  const liste = changements?.blocs.find(
    (b): b is Extract<Bloc, { type: "liste" }> => b.type === "liste",
  );
  const nouveautes = (liste?.elements ?? []).map((texte) => ({
    texte,
    dateLe: dateFrancaise(/^\*\*(.+?)\*\*/.exec(texte)?.[1] ?? texte),
  }));

  return { destination: entete.destination, misAJourLe, parties, nouveautes };
}

/** Accès d'une partie : gratuite, en aperçu (le début est gratuit) ou réservée. */
export function accesPartie(blocs: Bloc[]): "GRATUIT" | "APERCU" | "PAYANT" {
  const verrou = blocs.findIndex((b) => b.type === "verrou");
  if (verrou < 0) return "GRATUIT";
  return verrou === 0 ? "PAYANT" : "APERCU";
}

export type SegmentEnLigne =
  | { type: "texte"; valeur: string }
  | { type: "gras"; valeur: string }
  | { type: "lien"; texte: string; url: string };

/** Découpe le texte d'un bloc en segments : texte, **gras** et [liens](https://…). */
export function analyserEnLigne(texte: string): SegmentEnLigne[] {
  const segments: SegmentEnLigne[] = [];
  const motif = /\*\*(.+?)\*\*|\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g;
  let position = 0;
  for (const resultat of texte.matchAll(motif)) {
    const debut = resultat.index ?? 0;
    if (debut > position) segments.push({ type: "texte", valeur: texte.slice(position, debut) });
    if (resultat[1] !== undefined) segments.push({ type: "gras", valeur: resultat[1] });
    else segments.push({ type: "lien", texte: resultat[2], url: resultat[3] });
    position = debut + resultat[0].length;
  }
  if (position < texte.length) segments.push({ type: "texte", valeur: texte.slice(position) });
  return segments;
}
