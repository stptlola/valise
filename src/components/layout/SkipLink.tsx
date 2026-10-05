import { messages } from "@/i18n";

/** Lien d'évitement, visible au clavier, qui mène directement au contenu (ticket T-024). */
export function SkipLink() {
  return (
    <a
      href="#contenu"
      className="bg-encre text-fond absolute -top-24 left-4 z-[100] rounded-xl px-4 py-2.5 focus:top-3"
    >
      {messages.navigation.allerAuContenu}
    </a>
  );
}
