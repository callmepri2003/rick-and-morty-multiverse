import { test, expect } from "@playwright/test";

test.describe("Stats page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/stats");
  });

  test("renders KPI cards", async ({ page }) => {
    await expect(page.getByText("Total Characters").first()).toBeVisible({ timeout: 25000 });
    await expect(page.getByText("Total Episodes").first()).toBeVisible();
    await expect(page.getByText("Dimensions & places").first()).toBeVisible();
  });

  test("shows survival breakdown", async ({ page }) => {
    await expect(page.getByText("Total Characters").first()).toBeVisible({ timeout: 25000 });
    await expect(page.getByText("Alive").first()).toBeVisible();
    await expect(page.getByText("Dead").first()).toBeVisible();
  });

  test("shows chart headings", async ({ page }) => {
    await expect(page.getByText("Character Status Distribution")).toBeVisible({ timeout: 25000 });
    await expect(page.getByText("Episodes per Season")).toBeVisible();
  });
});
