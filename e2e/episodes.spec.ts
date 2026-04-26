import { test, expect } from "@playwright/test";

test.describe("Episodes page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/episodes");
  });

  test("shows episode cards", async ({ page }) => {
    await expect(page.getByText("S01E01")).toBeVisible({ timeout: 15000 });
  });

  test("can filter by season", async ({ page }) => {
    await page.waitForSelector("text=S01E01", { timeout: 15000 });
    await page.selectOption("select", "S02");
    await page.waitForTimeout(500);
    await expect(page.getByText(/S02E/)).toBeVisible();
  });

  test("search filters episodes by name", async ({ page }) => {
    await page.waitForSelector("text=S01E01", { timeout: 15000 });
    await page.getByPlaceholder("Search episodes...").fill("Pilot");
    await page.waitForTimeout(600);
    await expect(page.getByText("Pilot")).toBeVisible();
  });
});
