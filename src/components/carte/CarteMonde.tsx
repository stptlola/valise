import type { KeyboardEvent } from "react";
import { carteViewBox, paysCarte } from "@/content/carte-du-monde";
import { projeter } from "@/design/projection";
import { cn } from "@/lib/cn";

export type Repere = {
  id: string;
  nom: string;
  latitude: number;
  longitude: number;
  couleur: string;
};

type CarteMondeProps = {
  /** Description lue par les lecteurs d'écran. */
  titre: string;
  /** Codes ISO des pays mis en valeur. */
  paysActifs?: string[];
  reperes?: Repere[];
  /** Rend les pays cliquables ; à fournir depuis un composant client (Mes escales). */
  onBasculerPays?: (code: string) => void;
  className?: string;
};

/** Carte du monde légère, dessinée à partir de Natural Earth (ticket T-023). */
export function CarteMonde({
  titre,
  paysActifs = [],
  reperes = [],
  onBasculerPays,
  className,
}: CarteMondeProps) {
  const actifs = new Set(paysActifs);
  const interactive = Boolean(onBasculerPays);

  const auClavier = (code: string) => (e: KeyboardEvent<SVGPathElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onBasculerPays?.(code);
    }
  };

  return (
    <svg
      viewBox={carteViewBox}
      role="img"
      aria-label={titre}
      className={cn("block h-auto w-full", className)}
    >
      <g strokeWidth={0.6} className="stroke-fond">
        {paysCarte.map((p, i) => {
          const actif = actifs.has(p.code);
          return (
            <path
              key={`${p.code}-${i}`}
              d={p.d}
              data-pays={p.code}
              className={cn(
                "transition-colors duration-300",
                actif ? "fill-encre" : "fill-trait",
                interactive &&
                  "hover:fill-discret focus-visible:fill-discret cursor-pointer outline-none",
              )}
              {...(interactive
                ? {
                    role: "button",
                    tabIndex: 0,
                    "aria-label": p.nom,
                    "aria-pressed": actif,
                    onClick: () => onBasculerPays?.(p.code),
                    onKeyDown: auClavier(p.code),
                  }
                : {})}
            >
              <title>{p.nom}</title>
            </path>
          );
        })}
      </g>
      <g>
        {reperes.map((r) => {
          const { x, y } = projeter(r.latitude, r.longitude);
          return (
            <g
              key={r.id}
              transform={`translate(${x.toFixed(1)} ${y.toFixed(1)})`}
              data-repere={r.id}
            >
              <circle
                r={6.5}
                fill={r.couleur}
                stroke="#ffffff"
                strokeWidth={2.5}
              />
              <title>{r.nom}</title>
            </g>
          );
        })}
      </g>
    </svg>
  );
}
