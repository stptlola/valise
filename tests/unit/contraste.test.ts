import { describe, expect, it } from "vitest";
import { villes } from "@/content/villes";
import { contraste, texteSur } from "@/design/contraste";
import { jetonsClairs, jetonsSombres } from "./jetons";

// Paires texte / fond de l'interface qui doivent atteindre le niveau AA (4,5:1).
const paires: Array<[string, string]> = [
  ["encre", "fond"],
  ["encre", "surface"],
  ["discret", "fond"],
  ["discret", "surface"],
  ["sur-panneau", "panneau"],
  ["sur-panneau-discret", "panneau"],
  ["sur-bouton", "bouton"],
];

describe("contraste de l'interface", () => {
  for (const [mode, jetons] of [
    ["clair", jetonsClairs],
    ["sombre", jetonsSombres],
  ] as const) {
    for (const [texte, fond] of paires) {
      it(`${texte} sur ${fond} en mode ${mode} atteint 4,5:1`, () => {
        expect(contraste(jetons[texte], jetons[fond])).toBeGreaterThanOrEqual(
          4.5,
        );
      });
    }
  }
});

describe("couleurs des villes", () => {
  for (const ville of villes) {
    it(`${ville.nom} reste lisible en grand texte (3:1)`, () => {
      expect(
        contraste(ville.couleur, texteSur(ville.couleur)),
      ).toBeGreaterThanOrEqual(3);
    });
  }
});
