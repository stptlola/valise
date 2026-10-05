import type { StickerId } from "@/components/stickers/artwork";

// Destinations et escales voisines, avec leur identité (DEST-05 dans le cahier des charges).

export type TypeEscale = "complete" | "fiche" | "voisine";

export type Ville = {
  id: string;
  nom: string;
  pays: string;
  code: string;
  couleur: string;
  type: TypeEscale;
  /** Pour une escale voisine : l'escale complète à laquelle elle est rattachée. */
  principale?: string;
  /** Absent tant que l'autocollant n'est pas dessiné. */
  autocollant?: StickerId;
};

export const villes: Ville[] = [
  {
    id: "rome",
    nom: "Rome",
    pays: "Italie",
    code: "ROM",
    couleur: "#C47A2C",
    type: "complete",
    autocollant: "rome",
  },
  {
    id: "paris",
    nom: "Paris",
    pays: "France",
    code: "PAR",
    couleur: "#7A5C45",
    type: "complete",
    autocollant: "paris",
  },
  {
    id: "lisbonne",
    nom: "Lisbonne",
    pays: "Portugal",
    code: "LIS",
    couleur: "#F2C230",
    type: "fiche",
    autocollant: "lisbonne",
  },
  {
    id: "barcelone",
    nom: "Barcelone",
    pays: "Espagne",
    code: "BCN",
    couleur: "#2D7AB9",
    type: "fiche",
    autocollant: "barcelone",
  },
  {
    id: "londres",
    nom: "Londres",
    pays: "Royaume-Uni",
    code: "LON",
    couleur: "#D9312B",
    type: "fiche",
    autocollant: "londres",
  },
  {
    id: "amsterdam",
    nom: "Amsterdam",
    pays: "Pays-Bas",
    code: "AMS",
    couleur: "#F07A1A",
    type: "fiche",
    autocollant: "amsterdam",
  },
  {
    id: "berlin",
    nom: "Berlin",
    pays: "Allemagne",
    code: "BER",
    couleur: "#5BAF3F",
    type: "fiche",
    autocollant: "berlin",
  },
  {
    id: "bruxelles",
    nom: "Bruxelles",
    pays: "Belgique",
    code: "BRU",
    couleur: "#8D99A6",
    type: "fiche",
    autocollant: "bruxelles",
  },
  {
    id: "dublin",
    nom: "Dublin",
    pays: "Irlande",
    code: "DUB",
    couleur: "#1E7B45",
    type: "fiche",
    autocollant: "dublin",
  },
  {
    id: "edimbourg",
    nom: "Édimbourg",
    pays: "Écosse",
    code: "EDI",
    couleur: "#7B4F9E",
    type: "fiche",
    autocollant: "edimbourg",
  },
  {
    id: "marrakech",
    nom: "Marrakech",
    pays: "Maroc",
    code: "RAK",
    couleur: "#3D4FD1",
    type: "fiche",
    autocollant: "marrakech",
  },
  {
    id: "louxor",
    nom: "Louxor",
    pays: "Égypte",
    code: "LXR",
    couleur: "#2A9D8F",
    type: "fiche",
    autocollant: "louxor",
  },
  {
    id: "new-york",
    nom: "New York",
    pays: "États-Unis",
    code: "NYC",
    couleur: "#F6B10A",
    type: "fiche",
    autocollant: "new-york",
  },
  {
    id: "montreal",
    nom: "Montréal",
    pays: "Canada",
    code: "YUL",
    couleur: "#7FB2D6",
    type: "fiche",
    autocollant: "montreal",
  },
  {
    id: "tokyo",
    nom: "Tokyo",
    pays: "Japon",
    code: "TYO",
    couleur: "#E58FB0",
    type: "fiche",
    autocollant: "tokyo",
  },
  {
    id: "florence",
    nom: "Florence",
    pays: "Italie",
    code: "FLR",
    couleur: "#A85F24",
    type: "voisine",
    principale: "rome",
  },
  {
    id: "pise",
    nom: "Pise",
    pays: "Italie",
    code: "PSA",
    couleur: "#D9994A",
    type: "voisine",
    principale: "rome",
  },
  {
    id: "lille",
    nom: "Lille",
    pays: "France",
    code: "LIL",
    couleur: "#8C4F3A",
    type: "voisine",
    principale: "paris",
    autocollant: "lille",
  },
  {
    id: "lyon",
    nom: "Lyon",
    pays: "France",
    code: "LYS",
    couleur: "#956E50",
    type: "voisine",
    principale: "paris",
  },
  {
    id: "strasbourg",
    nom: "Strasbourg",
    pays: "France",
    code: "SXB",
    couleur: "#96625F",
    type: "voisine",
    principale: "paris",
  },
];

export const destinations = villes.filter((v) => v.type !== "voisine");
export const escalesVoisines = villes.filter((v) => v.type === "voisine");
