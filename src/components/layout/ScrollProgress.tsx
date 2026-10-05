"use client";

import { useEffect, useRef } from "react";

/** Barre de progression du défilement, à la couleur de la ville affichée. */
export function ScrollProgress() {
  const barre = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let image = 0;
    const mettreAJour = () => {
      image = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progression =
        max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      if (barre.current)
        barre.current.style.transform = `scaleX(${progression})`;
    };
    const auDefilement = () => {
      if (!image) image = requestAnimationFrame(mettreAJour);
    };
    mettreAJour();
    window.addEventListener("scroll", auDefilement, { passive: true });
    window.addEventListener("resize", auDefilement);
    return () => {
      window.removeEventListener("scroll", auDefilement);
      window.removeEventListener("resize", auDefilement);
      cancelAnimationFrame(image);
    };
  }, []);

  return (
    <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-0.5">
      <span
        ref={barre}
        className="bg-ville block h-full origin-left scale-x-0"
      />
    </div>
  );
}
