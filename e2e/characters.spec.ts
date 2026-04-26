import { test, expect } from "@playwright/test";

test.describe("Characters page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/characters");
    await page.waitForSelector('[data-testid="character-card"]', { timeout: 25000 });
  });

  test("displays character cards", async ({ page }) => {
    const cards = await page.locator('[data-testid="character-card"]').count();
    expect(cards).toBeGreaterThan(0);
  });

  test("shows character count", async ({ page }) => {
    await expect(page.getByText(/results/i).first()).toBeVisible();
  });

  test("filters by name via search", async ({ page }) => {
    await page.getByPlaceholder("Search characters...").fill("Rick");
    await page.waitForTimeout(800);
    await page.waitForSelector('[data-testid="character-card"]', { timeout: 10000 });
    const cards = await page.locator('[data-testid="character-card"]').all();
    expect(cards.length).toBeGreaterThan(0);
    for (const card of cards) {
      const text = await card.textContent();
      expect(text?.toLowerCase()).toContain("rick");
    }
  });

  test("clicking a card goes to detail page", async ({ page }) => {
    await page.locator('[data-testid="character-card"]').first().click();
    await expect(page).toHaveURL(/\/characters\/\d+/);
    await expect(page.getByText("Back to Characters")).toBeVisible();
  });

  test("pagination changes page content", async ({ page }) => {
    const firstCardText = await page
      .locator('[data-testid="character-card"]')
      .first()
      .textContent();
    await page.getByLabel("Next page").click();
    await page.waitForTimeout(1500);
    await page.waitForSelector('[data-testid="character-card"]', { timeout: 15000 });
    const newFirstCardText = await page
      .locator('[data-testid="character-card"]')
      .first()
      .textContent();
    expect(firstCardText).not.toBe(newFirstCardText);
  });
});
