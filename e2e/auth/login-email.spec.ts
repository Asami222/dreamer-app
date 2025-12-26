// tests/login-email.spec.ts
import { test, expect } from "@playwright/test";

test("route mock syntax check", async ({ page }) => {
  await page.route("**/auth/v1/token?grant_type=password", async route => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        access_token: "fake-token",
        token_type: "bearer",
        expires_in: 3600,
        refresh_token: "fake-refresh-token",
        user: {
          id: "user-id",
          email: "aki@gmail.com",
        },
      }),
    });
  });

  await page.goto("/auth/login");

  await page.getByPlaceholder("メールアドレス").fill("aki@gmail.com");
  await page.getByPlaceholder("パスワード").fill("password123");

  await page.getByTestId("login").click();

  await expect(
    page.getByText("ログインに成功しました")
  ).toBeVisible();
});