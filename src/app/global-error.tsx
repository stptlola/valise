"use client";

import { messages } from "@/i18n";
import "./globals.css";

/** Dernier recours si la mise en page elle-même échoue (ticket T-030). */
export default function ErreurGlobale({
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <html lang="fr">
      <body className="flex min-h-screen flex-col items-start justify-center gap-5 px-6">
        <h1 className="text-4xl font-bold">{messages.erreurs.erreurTitre}</h1>
        <p>{messages.erreurs.erreurTexte}</p>
        <button
          type="button"
          onClick={() => retry()}
          className="bg-nuit text-blanc rounded-full px-7 py-3 font-bold"
        >
          {messages.erreurs.reessayer}
        </button>
      </body>
    </html>
  );
}
