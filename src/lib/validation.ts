/** Vérification simple d'une adresse e-mail ; la vraie preuve reste l'e-mail reçu. */
export function emailValide(email: string): boolean {
  return email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}
