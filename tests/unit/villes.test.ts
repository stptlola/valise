import { describe, expect, it } from "vitest";
import { stickerIds } from "@/components/stickers/artwork";
import { destinations, escalesVoisines, villes } from "@/content/villes";
import { jetonsClairs } from "./jetons";

describe("destinations", () => {
  it("compte 15 destinations, dont Rome et Paris en escales complètes", () => {
    expect(destinations).toHaveLength(15);
    expect(
      destinations.filter((v) => v.type === "complete").map((v) => v.id),
    ).toEqual(["rome", "paris"]);
  });

  it("rattache chaque escale voisine à une escale complète", () => {
    expect(escalesVoisines.map((v) => v.id)).toEqual([
      "florence",
      "pise",
      "lille",
      "lyon",
      "strasbourg",
    ]);
    for (const voisine of escalesVoisines) {
      const principale = villes.find((v) => v.id === voisine.principale);
      expect(principale?.type).toBe("complete");
    }
  });

  it("donne à chaque ville un identifiant et un code uniques", () => {
    expect(new Set(villes.map((v) => v.id)).size).toBe(villes.length);
    expect(new Set(villes.map((v) => v.code)).size).toBe(villes.length);
    for (const v of villes) expect(v.code).toMatch(/^[A-Z]{3}$/);
  });

  it("utilise les mêmes couleurs que les jetons de design", () => {
    for (const v of villes)
      expect(jetonsClairs[`color-${v.id}`]).toBe(v.couleur);
  });

  it("ne pointe que vers des autocollants dessinés", () => {
    for (const v of villes)
      if (v.autocollant) expect(stickerIds).toContain(v.autocollant);
  });
});
