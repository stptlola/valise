import { expect, test } from "@playwright/test";

// Ces parcours lisent la base : ils demandent DATABASE_URL, avec les données de départ chargées.
test.skip(!process.env.DATABASE_URL, "base de données requise");

test("la liste montre les quinze destinations, Rome et Paris en premier", async ({
  page,
}) => {
  await page.goto("/destinations");
  const cartes = page.getByRole("main").getByRole("listitem");
  await expect(cartes).toHaveCount(15);
  await expect(cartes.nth(0)).toContainText("Paris");
  await expect(cartes.nth(1)).toContainText("Rome");
  await expect(page.getByText("Escale complète", { exact: true })).toHaveCount(
    2,
  );
});

test("une fiche s'ouvre depuis la liste", async ({ page }) => {
  await page.goto("/destinations");
  await page.getByRole("link", { name: /Lisbonne/ }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Lisbonne");
});

test("« Préviens-moi » demande le consentement, puis confirme l'inscription", async ({
  page,
}) => {
  await page.goto("/destinations/tokyo");
  await page.getByLabel("Ton e-mail").fill(`test-${Date.now()}@exemple.fr`);
  await page.getByRole("button", { name: "Préviens-moi" }).click();
  await expect(
    page.getByText("Coche la case pour accepter de recevoir cet e-mail."),
  ).toBeVisible();
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Préviens-moi" }).click();
  await expect(
    page.getByText(
      "C'est noté : on te prévient dès que l'escale de Tokyo sort.",
    ),
  ).toBeVisible();
});

test("une escale voisine ou une destination inconnue n'a pas encore de page", async ({
  page,
}) => {
  expect((await page.goto("/destinations/florence"))?.status()).toBe(404);
  expect((await page.goto("/destinations/atlantide"))?.status()).toBe(404);
});
