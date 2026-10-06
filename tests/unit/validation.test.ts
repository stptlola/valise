import { describe, expect, it } from "vitest";
import { emailValide } from "@/lib/validation";

describe("adresse e-mail", () => {
  it("accepte une adresse courante", () => {
    expect(emailValide("lola@exemple.fr")).toBe(true);
  });

  it("refuse une adresse incomplète", () => {
    for (const email of [
      "",
      "lola",
      "lola@",
      "lola@exemple",
      "lola @exemple.fr",
    ]) {
      expect(emailValide(email)).toBe(false);
    }
  });
});
