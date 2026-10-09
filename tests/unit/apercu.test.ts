import { describe, expect, it } from "vitest";
import {
  cookieApercu,
  enHttps,
  jetonApercu,
  jetonValide,
  redirection,
  secretValide,
} from "@/lib/apercu-jeton";

describe("lien d'aperçu", () => {
  it("n'accepte que le bon secret", () => {
    expect(secretValide("phrase-secrete", "phrase-secrete")).toBe(true);
    expect(secretValide("phrase-secret", "phrase-secrete")).toBe(false);
    expect(secretValide(null, "phrase-secrete")).toBe(false);
    expect(secretValide("phrase-secrete", undefined)).toBe(false);
  });

  it("dérive du secret un jeton qui change avec lui", () => {
    const jeton = jetonApercu("un")!;
    expect(jeton).toMatch(/^[0-9a-f]{64}$/);
    expect(jetonApercu("un")).toBe(jeton);
    expect(jetonApercu("deux")).not.toBe(jeton);
    expect(jetonApercu(undefined)).toBeNull();
    expect(jetonValide(jeton, "un")).toBe(true);
    expect(jetonValide(jeton, "deux")).toBe(false);
    expect(jetonValide(undefined, "un")).toBe(false);
  });
});

describe("cookie d'aperçu", () => {
  it("n'est pas « Secure » en HTTP, sinon le navigateur le refuserait", () => {
    const cookie = cookieApercu("abc", false);
    expect(cookie).toContain("valise_apercu=abc");
    expect(cookie).toContain("HttpOnly");
    expect(cookie).toContain("SameSite=Lax");
    expect(cookie).not.toContain("Secure");
  });

  it("est « Secure » en HTTPS, et s'efface sans jeton", () => {
    expect(cookieApercu("abc", true)).toContain("Secure");
    expect(cookieApercu(null, true)).toContain("Max-Age=0");
  });

  it("reconnaît le HTTPS derrière le proxy de Coolify", () => {
    const derriereProxy = new Request("http://0.0.0.0:3000/api/apercu", {
      headers: { "x-forwarded-proto": "https" },
    });
    expect(enHttps(derriereProxy)).toBe(true);
    expect(enHttps(new Request("http://exemple.sslip.io/api/apercu"))).toBe(false);
  });

  it("redirige vers une adresse relative au site", () => {
    const reponse = redirection("/destinations/rome/escale", cookieApercu("abc", false));
    expect(reponse.status).toBe(303);
    expect(reponse.headers.get("location")).toBe("/destinations/rome/escale");
    expect(reponse.headers.get("set-cookie")).toContain("valise_apercu=abc");
  });
});
