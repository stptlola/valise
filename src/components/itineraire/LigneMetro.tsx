"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { cn } from "@/lib/cn";

export type Station = { titre: string; detail?: string; moment?: string };

type LigneMetroProps = {
  /** Nom de la ligne, lu par les lecteurs d'écran (par exemple « Jour 1 »). */
  titre: string;
  /** Couleur de la ville. */
  couleur: string;
  stations: Station[];
};

/**
 * Itinéraire dessiné comme une ligne de métro (ticket T-022).
 * C'est une liste ordonnée : un lecteur d'écran l'annonce étape par étape.
 */
export function LigneMetro({ titre, couleur, stations }: LigneMetroProps) {
  const liste = useRef<HTMLOListElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = liste.current;
    if (!element) return;
    const observateur = new IntersectionObserver(
      ([entree]) => {
        if (entree.isIntersecting) {
          setVisible(true);
          observateur.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observateur.observe(element);
    return () => observateur.disconnect();
  }, []);

  return (
    <ol
      ref={liste}
      aria-label={titre}
      className="relative flex flex-col gap-7 pl-14"
      style={{ "--ligne": couleur } as CSSProperties}
    >
      <span
        aria-hidden="true"
        className={cn(
          "ease-valise absolute top-4 bottom-4 left-[1.0625rem] w-1.5 origin-top rounded-full bg-[var(--ligne)] transition-transform duration-[1200ms]",
          visible ? "scale-y-100" : "scale-y-0",
        )}
      />
      {stations.map((station, i) => (
        <li
          key={`${i}-${station.titre}`}
          className={cn(
            "ease-valise relative transition-[opacity,transform] duration-500",
            visible ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0",
          )}
          style={{ transitionDelay: `${300 + i * 120}ms` }}
        >
          <span
            aria-hidden="true"
            className="bg-fond font-display absolute top-0 -left-14 grid size-9 place-items-center rounded-full border-[5px] border-[var(--ligne)] text-sm font-extrabold"
          >
            {i + 1}
          </span>
          {station.moment && (
            <span className="text-discret block text-sm font-bold tracking-wider uppercase">
              {station.moment}
            </span>
          )}
          <span className="font-display block text-xl leading-tight font-extrabold">
            {station.titre}
          </span>
          {station.detail && (
            <span className="text-discret mt-1 block">{station.detail}</span>
          )}
        </li>
      ))}
    </ol>
  );
}
