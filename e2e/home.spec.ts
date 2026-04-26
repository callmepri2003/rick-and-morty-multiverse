import { test, expect } from "@playwright/test";

test.describe("Home page", () => {
  test("shows hero section with portal", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: /MultiverseDB/i }).first()).toBeVisible();
    await expect(page.getByText("interdimensional database").first()).toBeVisible();
  });

  test("has navigation links", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("link", { name: /characters/i }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: /episodes/i }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: /locations/i }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: /stats/i }).first()).toBeVisible();
  });

  test("Open Portal button navigates to characters", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /open portal/i }).click();
    await expect(page).toHaveURL("/characters");
  });
});
