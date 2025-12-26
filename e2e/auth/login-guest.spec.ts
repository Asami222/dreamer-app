// tests/login-guest.spec.ts
import { test, expect } from "@playwright/test";

test("ゲストログイン成功時に成功メッセージが表示される", async ({ page }) => {
  await page.route("**/auth/v1/token?grant_type=password", async route => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        access_token: "guest-token",
        refresh_token: "refresh-token",
        token_type: "bearer",
        expires_in: 3600,
        user: { id: "guest-id", email: "guest@gmail.com" },
      }),
    });
  });

  await page.goto("/auth/login");

  await page.getByRole("button", {
    name: "ゲストユーザーでログイン",
  }).click();

  await expect(
    page.getByText("ゲストログインに成功しました")
  ).toBeVisible();
});