// tests/signup-failure.spec.ts
import { test, expect } from "@playwright/test";

test("既存メールの場合エラーメッセージが表示される", async ({ page }) => {
  await page.goto("/auth/signup");

  await page.getByPlaceholder("ユーザー名").fill("testuser");
  await page.getByPlaceholder("パスワード").fill("Password123!");
  await page.getByPlaceholder("メールアドレス").fill("already@example.com");

  await page.getByTestId("signup").click();

  await expect(
    page.getByTestId("signup-error")
  ).toHaveText("すでに登録されているメールアドレスです");
});