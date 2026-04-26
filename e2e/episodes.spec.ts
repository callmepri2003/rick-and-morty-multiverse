import { test, expect } from "@playwright/test";

test.describe("Episodes page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/episodes");
    await page.waitForSelector("text=S01E01", { timeout: 25000 });
  });

  test("shows episode cards", async ({ page }) => {
    await expect(page.getByText("S01E01").first()).toBeVisible();
  });

  test("can filter by season", async ({ page }) => {
    await page.selectOption("select", "S02");
    await page.waitForTimeout(1000);
    await expect(page.getByText(/S02E/).first()).toBeVisible({ timeout: 10000 });
  });

  test("search filters episodes by name", async ({ page }) => {
    await page.getByPlaceholder("Search episodes...").fill("Pilot");
    await page.waitForTimeout(800);
    await expect(page.getByText("Pilot").first()).toBeVisible({ timeout: 10000 });
  });
});
