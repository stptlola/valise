import { Sticker } from "@/components/stickers/Sticker";
import { Container } from "@/components/ui/Container";
import { messages } from "@/i18n";

// Accueil provisoire : la page d'accueil définitive attend le design final (NAV-01, ticket T-026).
export default function Accueil() {
  return (
    <Container className="flex flex-1 flex-col items-center justify-center gap-8 py-20 text-center">
      <div className="flex items-end gap-4">
        <Sticker id="rome" className="w-24 -rotate-6 sm:w-32" />
        <Sticker id="paris" className="w-24 rotate-6 sm:w-32" />
      </div>
      <h1 className="font-display text-5xl font-extrabold tracking-tight sm:text-7xl">
        {messages.site.signature}
      </h1>
      <p className="text-discret">Site en construction.</p>
    </Container>
  );
}
