// tests/login-email-error.spec.ts
import { test, expect } from "@playwright/test";

test("email/password ログイン失敗時に alert が表示される", async ({ page }) => {
  await page.route("**/auth/v1/token?grant_type=password", async route => {
    await route.fulfill({
      status: 400,
      contentType: "application/json",
      body: JSON.stringify({
        error: "invalid_credentials",
        error_description: "Invalid login credentials",
      }),
    });
  });

  await page.goto("/auth/login");

  await page.getByPlaceholder("メールアドレス").fill("wrong@example.com");
  await page.getByPlaceholder("パスワード").fill("wrongpassword");
  //role + testid
  const loginButton = page.getByTestId("login");

  // ボタンが表示されるまで待つ
  await loginButton.waitFor({ state: 'visible' });

  await loginButton.click();

  // alert が表示される
  const alert = page.getByTestId("login-error");
  await expect(alert).toBeVisible();

  //alert が複数表示されない
  await expect(page.getByRole("alert")).toHaveCount(2);

  // メッセージ内容
  await expect(alert).toHaveText(
    "ログインに失敗しました"
  );

  // 遷移しない
  await expect(page).toHaveURL("/auth/login");
});

