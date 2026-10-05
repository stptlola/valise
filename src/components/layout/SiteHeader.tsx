"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { Container } from "@/components/ui/Container";
import { messages } from "@/i18n";
import { cn } from "@/lib/cn";
import { ScrollProgress } from "./ScrollProgress";

const liens = [
  { href: "/destinations", label: messages.navigation.destinations },
  { href: "/outils-gratuits", label: messages.navigation.outils },
  { href: "/contributions", label: messages.navigation.contributions },
  { href: "/informations-pratiques", label: messages.navigation.infos },
  { href: "/mes-escales", label: messages.navigation.mesEscales },
] as const;

/** En-tête fixe : logo, quatre rubriques et Mes escales, menu replié sur téléphone (ticket T-019). */
export function SiteHeader() {
  const chemin = usePathname();
  // Le menu s'ouvre pour la page courante : il se referme donc de lui-même en changeant de page.
  const [ouvertSur, setOuvertSur] = useState<string | null>(null);
  const ouvert = ouvertSur === chemin;

  // La touche Échap referme le menu.
  useEffect(() => {
    if (!ouvert) return;
    const surTouche = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOuvertSur(null);
    };
    document.addEventListener("keydown", surTouche);
    return () => document.removeEventListener("keydown", surTouche);
  }, [ouvert]);

  return (
    <header className="bg-fond/85 sticky top-0 z-50 backdrop-blur-md">
      <Container className="relative flex min-h-[4.5rem] items-center justify-between gap-6">
        <Logo />
        <button
          type="button"
          className="border-trait inline-flex min-h-11 items-center rounded-full border px-4 font-bold md:hidden"
          aria-expanded={ouvert}
          aria-controls="navigation-principale"
          onClick={() => setOuvertSur(ouvert ? null : chemin)}
        >
          {ouvert ? messages.navigation.fermer : messages.navigation.menu}
        </button>
        <nav
          id="navigation-principale"
          aria-label={messages.navigation.principale}
          className={cn(
            "border-trait bg-fond absolute inset-x-0 top-full border-b px-4 pt-2 pb-5 md:static md:block md:border-0 md:bg-transparent md:p-0",
            ouvert ? "block" : "hidden",
          )}
        >
          <ul className="flex flex-col gap-1 md:flex-row md:items-center">
            {liens.map((lien) => (
              <li key={lien.href}>
                <Link
                  href={lien.href}
                  aria-current={chemin === lien.href ? "page" : undefined}
                  className="hover:bg-surface aria-[current=page]:bg-surface flex min-h-11 items-center rounded-full px-3.5 text-base font-bold transition-colors"
                >
                  {lien.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
      <ScrollProgress />
    </header>
  );
}
