import { expect, test } from "@playwright/test";

// Page d'escale (ticket T-034) et partie réservée (ticket T-035).

test("un lien d'aperçu avec un mauvais secret est refusé", async ({ request }) => {
  const reponse = await request.get("/api/apercu?secret=faux&destination=rome", {
    maxRedirects: 0,
  });
  expect(reponse.status()).toBe(401);
});

test("le cookie d'aperçu est accepté en HTTP, comme sur sslip.io", async ({ request }) => {
  test.skip(!process.env.APERCU_SECRET, "APERCU_SECRET requis");
  const reponse = await request.get(
    `/api/apercu?secret=${encodeURIComponent(process.env.APERCU_SECRET!)}&destination=rome`,
    { maxRedirects: 0 },
  );
  expect(reponse.status()).toBe(303);
  expect(reponse.headers()["location"]).toBe("/destinations/rome/escale");
  const cookie = reponse.headers()["set-cookie"];
  expect(cookie).toContain("valise_apercu=");
  expect(cookie).not.toContain("Secure");
});

test.describe("avec la base de données", () => {
  // Ces parcours lisent la base : ils demandent DATABASE_URL, avec les contenus importés.
  test.skip(!process.env.DATABASE_URL, "base de données requise");

  test("une escale non publiée n'est pas visible sans aperçu", async ({ page }) => {
    expect((await page.goto("/destinations/rome/escale"))?.status()).toBe(404);
    await page.goto("/destinations/rome");
    await expect(page.getByRole("link", { name: "Lire l'escale" })).toHaveCount(0);
  });

  test("l'aperçu montre l'escale entière, puis se referme", async ({ page }) => {
    test.skip(!process.env.APERCU_SECRET, "APERCU_SECRET requis");
    await page.goto(
      `/api/apercu?secret=${encodeURIComponent(process.env.APERCU_SECRET!)}&destination=rome`,
    );
    await expect(page).toHaveURL(/\/destinations\/rome\/escale$/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Escale à Rome");
    await expect(page.getByText(/Mise à jour le \d+ \w+ \d{4}/)).toBeVisible();
    await expect(page.getByRole("heading", { name: "Les nouveautés" })).toBeVisible();
    await expect(page.getByRole("heading", { level: 2, name: /L'essentiel$/ })).toBeVisible();
    await expect(page.locator("section[id^='partie-']")).toHaveCount(10);
    await expect(page.getByRole("heading", { name: "Jour 1 · La Rome antique" })).toBeVisible();

    await page.getByRole("link", { name: "Quitter l'aperçu" }).click();
    await expect(page).toHaveURL(/\/destinations\/rome$/);
    expect((await page.goto("/destinations/rome/escale"))?.status()).toBe(404);
  });

  test("le sommaire mène à chaque partie", async ({ page, isMobile }) => {
    test.skip(!process.env.APERCU_SECRET, "APERCU_SECRET requis");
    await page.goto(
      `/api/apercu?secret=${encodeURIComponent(process.env.APERCU_SECRET!)}&destination=rome`,
    );
    if (isMobile) await page.getByText("Sommaire", { exact: true }).click();
    const sommaire = page.getByRole("navigation", { name: "Sommaire de l'escale" }).filter({
      visible: true,
    });
    await sommaire.getByRole("link", { name: "6. Budget" }).click();
    await expect(page).toHaveURL(/#partie-6$/);
    await expect(page.getByRole("heading", { level: 2, name: /Budget$/ })).toBeInViewport();
  });
});
