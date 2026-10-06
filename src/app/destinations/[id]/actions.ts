"use server";

import { messages } from "@/i18n";
import { db } from "@/lib/db";
import { emailValide } from "@/lib/validation";

export type EtatInscription = {
  statut: "vide" | "ok" | "erreur";
  message: string;
  /** Valeurs saisies, renvoyées pour ne pas les faire retaper après une erreur. */
  email?: string;
  consentement?: boolean;
};

/** Inscription « Préviens-moi » pour une destination (ticket T-033). */
export async function inscrirePrevenir(
  _precedent: EtatInscription,
  formulaire: FormData,
): Promise<EtatInscription> {
  // Champ piège invisible : seuls les robots le remplissent.
  if (String(formulaire.get("site") ?? "") !== "") {
    return { statut: "ok", message: messages.prevenir.okNeutre };
  }

  const email = String(formulaire.get("email") ?? "")
    .trim()
    .toLowerCase();
  const destinationId = String(formulaire.get("destinationId") ?? "");
  const consentement = formulaire.get("consentement") === "on";
  const erreur = (message: string): EtatInscription => ({
    statut: "erreur",
    message,
    email,
    consentement,
  });

  if (!emailValide(email)) return erreur(messages.prevenir.emailInvalide);
  if (!consentement) return erreur(messages.prevenir.consentementManquant);

  const destination = await db.destination.findUnique({
    where: { id: destinationId },
    select: { nom: true },
  });
  if (!destination) return erreur(messages.prevenir.destinationInconnue);

  await db.inscriptionPrevenir.upsert({
    where: { email_destinationId: { email, destinationId } },
    update: { desinscritLe: null, consentementLe: new Date() },
    create: { email, destinationId },
  });

  return { statut: "ok", message: messages.prevenir.ok(destination.nom) };
}
