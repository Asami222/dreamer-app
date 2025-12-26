import { test, expect } from "@playwright/test";

test("サインアップ成功後に /dream に遷移する", async ({ page }) => {
  await page.goto("/auth/signup");

  await page.getByPlaceholder("ユーザー名").fill("testuser");
  await page.getByPlaceholder("パスワード").fill("Password123!");
  await page.getByPlaceholder("メールアドレス").fill("test@example.com");

  await page.getByTestId("signup").click();

  await page.waitForURL("**/dream", { timeout: 10000 });
  await expect(page).toHaveURL(/\/dream$/);
});