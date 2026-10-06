import { stickerIds, type StickerId } from "./artwork";

/** Vérifie qu'un identifiant venu de la base correspond à un autocollant dessiné. */
export function estStickerId(id: string | null | undefined): id is StickerId {
  return !!id && (stickerIds as readonly string[]).includes(id);
}
