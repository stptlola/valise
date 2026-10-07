import type { Bloc } from "@/content/escales/analyse";

// Ce que le lecteur voit d'une escale (tickets T-034 et T-035). Le filtrage se fait sur le
// serveur : les blocs réservés ne quittent jamais le serveur pour qui n'y a pas accès.

export type PartieAffichee = {
  numero: number;
  titre: string;
  blocs: Bloc[];
  /** Vrai quand une partie réservée a été retirée pour ce lecteur. */
  verrouillee: boolean;
};

type PartieStockee = { numero: number; titre: string; contenu: unknown };

function blocsDe(contenu: unknown): Bloc[] {
  return Array.isArray(contenu) ? (contenu as Bloc[]) : [];
}

/** Garde les blocs avant le repère « verrou », ou tout si le lecteur a accès à l'escale complète. */
export function partiesPourLecteur(
  parties: PartieStockee[],
  complet: boolean,
): PartieAffichee[] {
  return [...parties]
    .sort((a, b) => a.numero - b.numero)
    .map((partie) => {
      const blocs = blocsDe(partie.contenu);
      const verrou = blocs.findIndex((b) => b.type === "verrou");
      if (complet) {
        return {
          numero: partie.numero,
          titre: partie.titre,
          blocs: blocs.filter((b) => b.type !== "verrou"),
          verrouillee: false,
        };
      }
      return {
        numero: partie.numero,
        titre: partie.titre,
        blocs: verrou < 0 ? blocs : blocs.slice(0, verrou),
        verrouillee: verrou >= 0,
      };
    });
}

/** Le titre en gras d'une nouveauté, comme « Métro C, depuis le 16 décembre 2025 ». */
export function titreNouveaute(texte: string) {
  return /^\*\*(.+?)\*\*/.exec(texte)?.[1] ?? texte;
}

/** « 6 octobre 2026 ». */
export function dateLongue(date: Date) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

/** « 19,99 € ». */
export function prix(centimes: number) {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(
    centimes / 100,
  );
}
