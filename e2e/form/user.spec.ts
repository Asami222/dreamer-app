import { test, expect } from "@playwright/test";

test("UserForm 正常送信", async ({ page }) => {
  await page.goto("/user/setting");

  await page.getByPlaceholder("表示名").fill("あさみ");
  await page.getByPlaceholder("夢や目標を記入してください").fill("素敵なアプリを作る");
  await page.getByPlaceholder("いつまでに叶えたいですか").fill("2025年中");

  await page.getByRole("button", { name: "変更する" }).click();

  await expect(page.getByText("変更しました！")).toBeVisible();
});
/*
test("未入力で送信するとエラー表示", async ({ page }) => {
  await page.goto("/user/setting");

  await page.getByRole("button", { name: "変更する" }).click();

  await expect(page.getByText("表示名は必須です")).toBeVisible();
});
*/