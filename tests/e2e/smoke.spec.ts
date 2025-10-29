import { test, expect } from "@playwright/test";

test.describe("Smoke", () => {
  test("home page has title", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Baap Connect/);
  });
});
