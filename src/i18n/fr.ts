// Textes de l'interface, regroupés pour ajouter d'autres langues sans toucher au code (ticket T-015).
export const fr = {
  site: {
    nom: "Valise",
    signature: "Des escales clés en main.",
    titre: "Valise, des escales clés en main",
  },
  navigation: {
    principale: "Navigation principale",
    destinations: "Destinations",
    outils: "Outils gratuits",
    contributions: "Contributions",
    infos: "Informations pratiques",
    mesEscales: "Mes escales",
    voirEscales: "Voir les escales",
    menu: "Menu",
    fermer: "Fermer",
    allerAuContenu: "Aller au contenu",
    accueil: "Valise, accueil",
  },
  pages: {
    enConstruction: "Cette page arrive bientôt.",
    retourAccueil: "Retour à l'accueil",
  },
  erreurs: {
    introuvableTitre: "Cette page n'existe pas",
    introuvableTexte: "L'adresse a peut-être changé, ou la page n'existe plus.",
    erreurTitre: "Un problème est survenu",
    erreurTexte: "La page n'a pas pu s'afficher. Réessaie dans un instant.",
    reessayer: "Réessayer",
    voirDestinations: "Voir les destinations",
  },
  pied: {
    droits: "© 2026 Valise",
  },
} as const;
