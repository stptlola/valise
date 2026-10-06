import { projectionCarte } from "@/content/carte-du-monde";

// Projection Natural Earth, identique à celle qui a servi à dessiner la carte (scripts/generer-carte.mjs).
const RADIANS = Math.PI / 180;

/** Position d'un lieu sur la carte du monde, dans le repère de son viewBox. */
export function projeter(
  latitude: number,
  longitude: number,
): { x: number; y: number } {
  const lambda = longitude * RADIANS;
  const phi = latitude * RADIANS;
  const phi2 = phi * phi;
  const phi4 = phi2 * phi2;
  const brutX =
    lambda *
    (0.8707 -
      0.131979 * phi2 +
      phi4 * (-0.013791 + phi4 * (0.003971 * phi2 - 0.001529 * phi4)));
  const brutY =
    phi *
    (1.007226 +
      phi2 *
        (0.015085 + phi4 * (-0.044475 + 0.028874 * phi2 - 0.005916 * phi4)));
  return {
    x: projectionCarte.x + projectionCarte.echelle * brutX,
    y: projectionCarte.y - projectionCarte.echelle * brutY,
  };
}
