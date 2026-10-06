import { geoNaturalEarth1 } from "d3-geo";
import { describe, expect, it } from "vitest";
import { projectionCarte } from "@/content/carte-du-monde";
import { villes } from "@/content/villes";
import { projeter } from "@/design/projection";

// La projection du site doit placer les repères exactement comme la carte a été dessinée.
const reference = geoNaturalEarth1()
  .scale(projectionCarte.echelle)
  .translate([projectionCarte.x, projectionCarte.y]);

describe("projection de la carte du monde", () => {
  for (const v of villes) {
    it(`place ${v.nom} au même endroit que la carte`, () => {
      const [x, y] = reference([v.longitude, v.latitude])!;
      const position = projeter(v.latitude, v.longitude);
      expect(position.x).toBeCloseTo(x, 3);
      expect(position.y).toBeCloseTo(y, 3);
    });
  }

  it("garde chaque repère dans le cadre de la carte", () => {
    for (const v of villes) {
      const { x, y } = projeter(v.latitude, v.longitude);
      expect(x).toBeGreaterThan(0);
      expect(x).toBeLessThan(1000);
      expect(y).toBeGreaterThan(0);
      expect(y).toBeLessThan(500);
    }
  });
});
