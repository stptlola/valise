import { expect, test } from "@playwright/test";

test("l'accueil affiche la signature et le logo", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Des escales clés en main.",
  );
  await expect(
    page.getByRole("link", { name: "Valise, accueil" }),
  ).toBeVisible();
});

test("le contrôle de santé répond", async ({ request }) => {
  const reponse = await request.get("/api/health");
  expect(reponse.ok()).toBe(true);
  expect(await reponse.json()).toEqual({ status: "ok" });
});

test("le système de design montre les seize autocollants", async ({ page }) => {
  await page.goto("/design-system");
  await expect(page.locator("[data-autocollant]")).toHaveCount(16);
});

test("le lien d'évitement mène au contenu", async ({ page, isMobile }) => {
  test.skip(isMobile, "navigation au clavier testée sur ordinateur");
  await page.goto("/");
  await page.keyboard.press("Tab");
  const lien = page.getByRole("link", { name: "Aller au contenu" });
  await expect(lien).toBeFocused();
  await lien.press("Enter");
  await expect(page).toHaveURL(/#contenu$/);
});

test("le menu du téléphone s'ouvre et se referme avec Échap", async ({
  page,
  isMobile,
}) => {
  test.skip(!isMobile, "menu replié seulement sur téléphone");
  await page.goto("/");
  const bouton = page.getByRole("button", { name: "Menu" });
  await bouton.click();
  const menu = page.getByRole("navigation", { name: "Navigation principale" });
  await expect(menu.getByRole("link", { name: "Destinations" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(menu.getByRole("link", { name: "Destinations" })).toBeHidden();
});

test("une rubrique du menu mène à sa page", async ({ page, isMobile }) => {
  await page.goto("/");
  if (isMobile) await page.getByRole("button", { name: "Menu" }).click();
  await page.getByRole("link", { name: "Outils gratuits" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Outils gratuits",
  );
});

test("la page d'état indique l'image et l'accès à la base", async ({
  request,
}) => {
  const reponse = await request.get("/api/etat");
  expect(reponse.ok()).toBe(true);
  const etat = await reponse.json();
  expect(etat).toHaveProperty("image");
  expect(["ok", "erreur"]).toContain(etat.base);
});

test("une adresse inconnue affiche la page introuvable", async ({ page }) => {
  const reponse = await page.goto("/cette-page-n-existe-pas");
  expect(reponse?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Cette page n'existe pas",
  );
});

test("le site n'est pas référencé tant que le domaine n'est pas en place", async ({
  request,
}) => {
  const robots = await (await request.get("/robots.txt")).text();
  expect(robots).toContain("Disallow: /");
});

test("le système de design montre la carte et la ligne de métro", async ({
  page,
}) => {
  await page.goto("/design-system");
  await expect(page.locator("[data-repere]")).toHaveCount(20);
  const ligne = page.getByRole("list", { name: "Jour 1 à Rome, exemple" });
  await expect(ligne.getByRole("listitem")).toHaveCount(5);
});
