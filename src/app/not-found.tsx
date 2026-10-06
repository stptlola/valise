import { Sticker } from "@/components/stickers/Sticker";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { messages } from "@/i18n";

/** Page « introuvable », aux couleurs de Valise (ticket T-030). */
export default function Introuvable() {
  return (
    <Container className="flex flex-1 flex-col items-start justify-center gap-5 py-20">
      <Sticker id="paris" className="w-24 -rotate-6" />
      <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
        {messages.erreurs.introuvableTitre}
      </h1>
      <p className="text-discret">{messages.erreurs.introuvableTexte}</p>
      <div className="flex flex-wrap gap-3">
        <ButtonLink href="/">{messages.pages.retourAccueil}</ButtonLink>
        <ButtonLink href="/destinations" variant="contour">
          {messages.erreurs.voirDestinations}
        </ButtonLink>
      </div>
    </Container>
  );
}
