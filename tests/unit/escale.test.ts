import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  accesPartie,
  analyserEnLigne,
  analyserEscale,
  dateFrancaise,
} from "@/content/escales/analyse";
import { partiesPourLecteur, titreNouveaute } from "@/lib/escale-lecture";

const exemple = `---
destination: rome
misAJourLe: 2026-10-06
---

Texte d'introduction ignoré.

## 1. L'essentiel

Un paragraphe
sur deux lignes.

- **Durée** : 4 jours.
- Deuxième élément.

### Les incontournables

1. Le Colisée.
2. Le Panthéon.

| Mois | Affluence |
| --- | --- |
| Janvier | Faible |

Sources, vérifiées le 6 octobre 2026 : [NPR](https://www.npr.org/a).

## 2. Ce qui a changé

- **Panthéon, depuis le 1er juillet 2026** : 7 €.
- **Sans date** : rien.

## 4. Itinéraires

#### 8 h · Colisée

**Plan B pluie** : les musées du Capitole.

<!-- payant -->

Contenu réservé.

## 8. Ma valise

<!-- payant -->

- [ ] Pièce d'identité.
`;

describe("analyse d'un fichier d'escale", () => {
  const escale = analyserEscale(exemple);

  it("lit l'en-tête et les parties, sans l'introduction", () => {
    expect(escale.destination).toBe("rome");
    expect(escale.misAJourLe.toISOString()).toBe("2026-10-06T00:00:00.000Z");
    expect(escale.parties.map((p) => [p.numero, p.titre])).toEqual([
      [1, "L'essentiel"],
      [2, "Ce qui a changé"],
      [4, "Itinéraires"],
      [8, "Ma valise"],
    ]);
  });

  it("reconnaît chaque sorte de bloc", () => {
    expect(escale.parties[0].blocs).toEqual([
      { type: "paragraphe", texte: "Un paragraphe sur deux lignes." },
      { type: "liste", ordonnee: false, elements: ["**Durée** : 4 jours.", "Deuxième élément."] },
      { type: "titre", niveau: 3, texte: "Les incontournables" },
      { type: "liste", ordonnee: true, elements: ["Le Colisée.", "Le Panthéon."] },
      { type: "tableau", entetes: ["Mois", "Affluence"], lignes: [["Janvier", "Faible"]] },
      {
        type: "sources",
        texte: "Sources, vérifiées le 6 octobre 2026 : [NPR](https://www.npr.org/a).",
      },
    ]);
    expect(escale.parties[2].blocs.map((b) => b.type)).toEqual([
      "titre",
      "pluie",
      "verrou",
      "paragraphe",
    ]);
    expect(escale.parties[3].blocs[1]).toEqual({
      type: "cases",
      elements: ["Pièce d'identité."],
    });
  });

  it("tire les nouveautés de la partie 2, avec leur date", () => {
    expect(escale.nouveautes.map((n) => n.dateLe?.toISOString().slice(0, 10) ?? null)).toEqual([
      "2026-07-01",
      null,
    ]);
    expect(titreNouveaute(escale.nouveautes[0].texte)).toBe("Panthéon, depuis le 1er juillet 2026");
  });

  it("déduit l'accès de chaque partie du repère « payant »", () => {
    expect(escale.parties.map((p) => accesPartie(p.blocs))).toEqual([
      "GRATUIT",
      "GRATUIT",
      "APERCU",
      "PAYANT",
    ]);
  });

  it("lit les dates françaises", () => {
    expect(dateFrancaise("Métro C, depuis le 16 décembre 2025")?.toISOString()).toBe(
      "2025-12-16T00:00:00.000Z",
    );
    expect(dateFrancaise("chaque été")).toBeNull();
  });

  it("refuse un fichier sans en-tête", () => {
    expect(() => analyserEscale("## 1. Titre")).toThrow();
  });
});

describe("texte en ligne", () => {
  it("découpe le gras et les liens", () => {
    expect(analyserEnLigne("**Billet** : voir [le site](https://exemple.it/a) ici.")).toEqual([
      { type: "gras", valeur: "Billet" },
      { type: "texte", valeur: " : voir " },
      { type: "lien", texte: "le site", url: "https://exemple.it/a" },
      { type: "texte", valeur: " ici." },
    ]);
  });

  it("ne fait pas un lien d'une adresse qui n'est pas en http", () => {
    expect(analyserEnLigne("[piège](javascript:alert(1))")).toEqual([
      { type: "texte", valeur: "[piège](javascript:alert(1))" },
    ]);
  });
});

describe("ce que voit le lecteur", () => {
  const parties = analyserEscale(exemple).parties.map((p) => ({
    numero: p.numero,
    titre: p.titre,
    contenu: p.blocs,
  }));

  it("retire la partie réservée pour qui n'a pas l'escale", () => {
    const vues = partiesPourLecteur(parties, false);
    const itineraires = vues.find((p) => p.numero === 4)!;
    expect(itineraires.verrouillee).toBe(true);
    expect(itineraires.blocs.map((b) => b.type)).toEqual(["titre", "pluie"]);
    expect(JSON.stringify(vues)).not.toContain("Contenu réservé");
    expect(vues.find((p) => p.numero === 8)!.blocs).toEqual([]);
  });

  it("montre tout, sans repère, à qui a l'escale", () => {
    const vues = partiesPourLecteur(parties, true);
    expect(vues.every((p) => !p.verrouillee)).toBe(true);
    expect(JSON.stringify(vues)).toContain("Contenu réservé");
    expect(vues.flatMap((p) => p.blocs).some((b) => b.type === "verrou")).toBe(false);
  });
});

describe("le fichier de Rome", () => {
  const rome = analyserEscale(readFileSync("src/content/escales/rome.md", "utf8"));

  it("a dix parties : trois gratuites, les itinéraires en aperçu, le reste réservé", () => {
    expect(rome.parties.map((p) => p.numero)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    expect(rome.parties.map((p) => accesPartie(p.blocs))).toEqual([
      "GRATUIT",
      "GRATUIT",
      "GRATUIT",
      "APERCU",
      "PAYANT",
      "PAYANT",
      "PAYANT",
      "PAYANT",
      "PAYANT",
      "PAYANT",
    ]);
  });

  it("a quatre nouveautés datées", () => {
    expect(rome.nouveautes).toHaveLength(4);
    expect(rome.nouveautes.every((n) => n.dateLe !== null)).toBe(true);
  });

  it("donne le jour 1 en entier dans l'aperçu des itinéraires", () => {
    const itineraires = partiesPourLecteur(
      rome.parties.map((p) => ({ numero: p.numero, titre: p.titre, contenu: p.blocs })),
      false,
    ).find((p) => p.numero === 4)!;
    const titres = itineraires.blocs.filter((b) => b.type === "titre").map((b) => b.texte);
    expect(titres[0]).toBe("Jour 1 · La Rome antique");
    expect(titres.some((t) => t.startsWith("Jour 2"))).toBe(false);
  });
});
