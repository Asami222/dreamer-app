// tests/login-guest-error.spec.ts
import { test, expect } from "@playwright/test";

test("ゲストログイン失敗時に alert が表示される", async ({ page }) => {
  await page.route("**/auth/v1/token?grant_type=password", async route => {
    await route.fulfill({
      status: 400,
      contentType: "application/json",
      body: JSON.stringify({
        error: "invalid_credentials",
      }),
    });
  });

  await page.goto("/auth/login");

  await page.getByRole("button", {
    name: "ゲストユーザーでログイン",
  }).click();

  const alert = page.getByTestId("login-error");
  await expect(alert).toBeVisible();
  //alert が複数表示されない
  await expect(page.getByRole("alert")).toHaveCount(2);
  await expect(alert).toHaveText("ゲストログインに失敗しました");

  await expect(page).toHaveURL("/auth/login");
});