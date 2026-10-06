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
  destinations: {
    titre: "Destinations",
    intro:
      "Rome et Paris ont leur escale complète. Pour les autres destinations, une fiche gratuite t'aide à préparer le voyage, en attendant leur escale.",
    escaleComplete: "Escale complète",
    ficheGratuite: "Fiche gratuite",
    ficheEnPreparation:
      "La fiche de cette destination est en cours de rédaction.",
    escaleBientot: "La page de l'escale arrive bientôt.",
    prevenirTitre: "Préviens-moi quand l'escale sort",
    prevenirTexte:
      "Laisse ton e-mail : tu seras parmi les premiers à le savoir.",
  },
  prevenir: {
    email: "Ton e-mail",
    consentement: (nom: string) =>
      `J'accepte de recevoir un e-mail quand l'escale de ${nom} sort. Je pourrai me désinscrire à tout moment.`,
    bouton: "Préviens-moi",
    envoi: "Envoi…",
    okNeutre: "C'est noté.",
    ok: (nom: string) =>
      `C'est noté : on te prévient dès que l'escale de ${nom} sort.`,
    emailInvalide: "Cette adresse e-mail ne semble pas valide.",
    consentementManquant: "Coche la case pour accepter de recevoir cet e-mail.",
    destinationInconnue: "Cette destination n'existe pas.",
    pieges: "Ne pas remplir",
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
