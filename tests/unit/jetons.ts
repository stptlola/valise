import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

// Lit les jetons de couleur directement dans globals.css, pour tester les vraies valeurs du site.
const css = readFileSync(
  fileURLToPath(new URL("../../src/app/globals.css", import.meta.url)),
  "utf8",
);

function lireBloc(bloc: string): Record<string, string> {
  const jetons: Record<string, string> = {};
  for (const [, nom, valeur] of bloc.matchAll(
    /--([a-z0-9-]+):\s*(#[0-9a-f]{6})\s*;/gi,
  )) {
    jetons[nom] = valeur.toUpperCase();
  }
  return jetons;
}

const [avantSombre, apresSombre] = css.split(
  "@media (prefers-color-scheme: dark)",
);
const blocSombre = apresSombre.slice(0, apresSombre.indexOf("}\n}") + 1);

export const jetonsClairs = lireBloc(avantSombre);
export const jetonsSombres = { ...jetonsClairs, ...lireBloc(blocSombre) };
