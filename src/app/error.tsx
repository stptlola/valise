"use client";

import { useEffect } from "react";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { messages } from "@/i18n";

/** Page d'erreur, aux couleurs de Valise (ticket T-030). */
export default function Erreur({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="flex flex-1 flex-col items-start justify-center gap-5 py-20">
      <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
        {messages.erreurs.erreurTitre}
      </h1>
      <p className="text-discret">{messages.erreurs.erreurTexte}</p>
      <div className="flex flex-wrap gap-3">
        <Button onClick={() => retry()}>{messages.erreurs.reessayer}</Button>
        <ButtonLink href="/" variant="contour">
          {messages.pages.retourAccueil}
        </ButtonLink>
      </div>
    </Container>
  );
}
