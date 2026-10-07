import { messages } from "@/i18n";
import type { PartieAffichee } from "@/lib/escale-lecture";

/**
 * Le sommaire de l'escale, dessiné comme une ligne de métro à la couleur de la ville :
 * chaque partie est une station. Les parties réservées gardent leur nom, avec la mention.
 */
export function Sommaire({ parties }: { parties: PartieAffichee[] }) {
  return (
    <nav aria-label={messages.escale.sommaireAria}>
      <ol className="before:bg-ville relative flex flex-col before:absolute before:top-3 before:bottom-3 before:left-[7px] before:w-[3px] before:rounded-full">
        {parties.map((partie) => (
          <li key={partie.numero} className="relative">
            <a
              href={`#partie-${partie.numero}`}
              className="hover:bg-surface flex items-baseline gap-3 rounded-xl py-1.5 pr-2 pl-8"
            >
              <span
                aria-hidden="true"
                className={`border-ville absolute top-[0.6rem] left-0 size-[17px] rounded-full border-[3px] ${
                  partie.verrouillee && partie.blocs.length === 0 ? "bg-surface" : "bg-fond"
                }`}
              />
              <span className="font-bold">
                {partie.numero}. {partie.titre}
              </span>
              {partie.verrouillee && partie.blocs.length === 0 && (
                <span className="text-discret text-sm">{messages.escale.reservee}</span>
              )}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
