import { Fragment } from "react";
import { analyserEnLigne } from "@/content/escales/analyse";
import { messages } from "@/i18n";

/** Texte d'un bloc d'escale, avec ses passages en gras et ses liens vers les sources. */
export function TexteEnLigne({ texte }: { texte: string }) {
  return (
    <>
      {analyserEnLigne(texte).map((segment, index) => {
        if (segment.type === "gras") {
          return (
            <strong key={index} className="font-bold">
              {segment.valeur}
            </strong>
          );
        }
        if (segment.type === "lien") {
          return (
            <a
              key={index}
              href={segment.url}
              target="_blank"
              rel="noopener noreferrer"
              className="decoration-ville underline decoration-2 underline-offset-2"
            >
              {segment.texte}
              <span className="sr-only">{messages.escale.nouvelOnglet}</span>
            </a>
          );
        }
        return <Fragment key={index}>{segment.valeur}</Fragment>;
      })}
    </>
  );
}
