import { test, expect } from "@playwright/test";

test.describe("Stats page", () => {
  test("renders KPI cards", async ({ page }) => {
    await page.goto("/stats");
    await expect(page.getByText("Total Characters")).toBeVisible({ timeout: 20000 });
    await expect(page.getByText("Total Episodes")).toBeVisible();
    await expect(page.getByText("Locations")).toBeVisible();
  });

  test("shows survival breakdown", async ({ page }) => {
    await page.goto("/stats");
    await expect(page.getByText("Alive").first()).toBeVisible({ timeout: 20000 });
    await expect(page.getByText("Dead").first()).toBeVisible();
  });

  test("shows chart headings", async ({ page }) => {
    await page.goto("/stats");
    await expect(page.getByText("Character Status Distribution")).toBeVisible({ timeout: 20000 });
    await expect(page.getByText("Episodes per Season")).toBeVisible();
  });
});
