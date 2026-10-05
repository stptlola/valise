// Calculs de contraste WCAG, utilisés pour choisir la couleur du texte sur chaque couleur de ville.

export const NUIT = "#14213D";
export const BLANC = "#FFFFFF";

function canal(valeur: number): number {
  const c = valeur / 255;
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

/** Luminance relative d'une couleur hexadécimale (#RRGGBB). */
export function luminance(hex: string): number {
  const h = hex.replace("#", "");
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
  return 0.2126 * canal(r) + 0.7152 * canal(g) + 0.0722 * canal(b);
}

/** Rapport de contraste entre deux couleurs, de 1 à 21. */
export function contraste(a: string, b: string): number {
  const [clair, fonce] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (clair + 0.05) / (fonce + 0.05);
}

/** Couleur de texte la plus lisible (nuit ou blanc) sur un fond donné. */
export function texteSur(fond: string): string {
  return contraste(fond, NUIT) >= contraste(fond, BLANC) ? NUIT : BLANC;
}
