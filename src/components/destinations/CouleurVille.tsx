"use client";

import { useEffect } from "react";

/** Donne la couleur de la ville à la barre de progression de l'en-tête, le temps de la page. */
export function CouleurVille({ couleur }: { couleur: string }) {
  useEffect(() => {
    const racine = document.documentElement;
    racine.style.setProperty("--ville", couleur);
    return () => {
      racine.style.removeProperty("--ville");
    };
  }, [couleur]);
  return null;
}
