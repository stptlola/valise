import type { ReactNode } from "react";
import type { Bloc } from "@/content/escales/analyse";
import { messages } from "@/i18n";
import { TexteEnLigne } from "./TexteEnLigne";

/** Affiche les blocs d'une partie d'escale, dans l'ordre du fichier de contenu. */
export function Blocs({
  blocs,
  graphiqueClimat,
}: {
  blocs: Bloc[];
  /** Le graphique du climat, quand les normales de la destination sont chargées. */
  graphiqueClimat?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-5">
      {blocs.map((bloc, index) => (
        <UnBloc key={index} bloc={bloc} graphiqueClimat={graphiqueClimat} />
      ))}
    </div>
  );
}

function UnBloc({ bloc, graphiqueClimat }: { bloc: Bloc; graphiqueClimat?: ReactNode }) {
  switch (bloc.type) {
    case "titre":
      return bloc.niveau === 3 ? (
        <h3 className="font-display mt-6 text-2xl font-extrabold">
          <TexteEnLigne texte={bloc.texte} />
        </h3>
      ) : (
        <h4 className="font-display mt-4 text-lg font-extrabold">
          <TexteEnLigne texte={bloc.texte} />
        </h4>
      );
    case "paragraphe":
      return (
        <p className="max-w-prose leading-relaxed">
          <TexteEnLigne texte={bloc.texte} />
        </p>
      );
    case "liste": {
      const Liste = bloc.ordonnee ? "ol" : "ul";
      return (
        <Liste
          className={`marker:text-discret flex max-w-prose flex-col gap-2 pl-6 leading-relaxed ${
            bloc.ordonnee ? "list-decimal" : "list-disc"
          }`}
        >
          {bloc.elements.map((element, index) => (
            <li key={index} className="pl-1">
              <TexteEnLigne texte={element} />
            </li>
          ))}
        </Liste>
      );
    }
    case "cases":
      return (
        <ul className="flex max-w-prose flex-col gap-2 leading-relaxed">
          {bloc.elements.map((element, index) => (
            <li key={index} className="flex gap-3">
              <span
                aria-hidden="true"
                className="border-encre mt-1 size-4 shrink-0 rounded-[4px] border-2"
              />
              <span>
                <TexteEnLigne texte={element} />
              </span>
            </li>
          ))}
        </ul>
      );
    case "tableau":
      return (
        <div
          role="region"
          aria-label={messages.escale.tableau}
          tabIndex={0}
          className="border-trait overflow-x-auto rounded-2xl border"
        >
          <table className="w-full min-w-[32rem] border-collapse text-left text-sm sm:text-base">
            <thead className="bg-surface">
              <tr>
                {bloc.entetes.map((entete, index) => (
                  <th key={index} scope="col" className="px-4 py-3 font-bold">
                    <TexteEnLigne texte={entete} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bloc.lignes.map((ligne, index) => (
                <tr key={index} className="border-trait border-t align-top">
                  {ligne.map((cellule, colonne) => (
                    <td key={colonne} className="px-4 py-3">
                      <TexteEnLigne texte={cellule} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "sources":
      return (
        <p className="text-discret max-w-prose text-sm leading-relaxed">
          <TexteEnLigne texte={bloc.texte} />
        </p>
      );
    case "pluie":
      return (
        <p className="border-ville bg-surface max-w-prose rounded-r-2xl border-l-4 px-5 py-4 leading-relaxed">
          <TexteEnLigne texte={bloc.texte} />
        </p>
      );
    case "graphique":
      return graphiqueClimat ?? null;
    case "verrou":
      return null;
  }
}
