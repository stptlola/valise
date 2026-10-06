"use client";

import { useActionState } from "react";
import {
  inscrirePrevenir,
  type EtatInscription,
} from "@/app/destinations/[id]/actions";
import { Button } from "@/components/ui/Button";
import { CaseACocher } from "@/components/ui/CaseACocher";
import { Champ } from "@/components/ui/Champ";
import { messages } from "@/i18n";
import { cn } from "@/lib/cn";

const etatInitial: EtatInscription = { statut: "vide", message: "" };

/** Formulaire « Préviens-moi quand l'escale sort » (ticket T-033). */
export function FormulairePrevenir({
  destinationId,
  nom,
}: {
  destinationId: string;
  nom: string;
}) {
  const [etat, envoyer, enCours] = useActionState(
    inscrirePrevenir,
    etatInitial,
  );

  if (etat.statut === "ok") {
    return (
      <p role="status" className="bg-surface rounded-2xl p-5 font-bold">
        {etat.message}
      </p>
    );
  }

  return (
    <form action={envoyer} className="flex max-w-md flex-col gap-4" noValidate>
      <input type="hidden" name="destinationId" value={destinationId} />
      <div aria-hidden="true" className="hidden">
        <label>
          {messages.prevenir.pieges}
          <input type="text" name="site" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <Champ
        id="email-prevenir"
        name="email"
        type="email"
        label={messages.prevenir.email}
        autoComplete="email"
        defaultValue={etat.email}
        key={`email-${etat.email ?? ""}`}
        inputMode="email"
        required
      />
      <CaseACocher
        name="consentement"
        required
        defaultChecked={etat.consentement}
        key={`consentement-${String(etat.consentement)}-${etat.message}`}
      >
        {messages.prevenir.consentement(nom)}
      </CaseACocher>
      <p
        role="status"
        aria-live="polite"
        className={cn("text-base", etat.statut === "erreur" && "font-bold")}
      >
        {etat.message}
      </p>
      <Button type="submit" disabled={enCours} className="self-start">
        {enCours ? messages.prevenir.envoi : messages.prevenir.bouton}
      </Button>
    </form>
  );
}
