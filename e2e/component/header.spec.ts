// tests/header.spec.ts
import { test, expect } from "@playwright/test";

/**
 * 共通ヘルパー
 * Home → はじめる → Header がある画面へ
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function goToPageWithHeader(page: any) {
  await page.goto("/");

  await page.getByTestId("start-button").click();

  // Header が表示されるページに遷移したことを保証
  await expect(page).toHaveURL(/\/auth\/login/);
}

test.describe("Header", () => {

  test("未ログイン時：ログインアイコンが表示される", async ({ page }) => {
    // profile API を未ログインとして返す
    await page.route("**/api/profile", route =>
      route.fulfill({ status: 401 })
    );

    await goToPageWithHeader(page);

    // ✅ Header が描画されるのを待つ
  await expect(
    page.getByRole("navigation")
  ).toBeVisible();

    await expect(
      page.getByTestId("profile-noimage")
    ).toBeVisible();
  });

  test("ログイン済み & 画像あり：プロフィール画像が表示される", async ({ page }) => {
    await page.route("**/api/profile", route =>
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          profile: { id: "test", displayName: "テスト" },
          profileImageUrl: "/images/macaron1.webp",
        }),
      })
    );

    await goToPageWithHeader(page);

    await expect(
      page.getByRole("img", { name: "ユーザーイメージ" })
    ).toBeVisible();
  });

  test("ログイン済み & 画像なし：AccountCircleIcon が表示される", async ({ page }) => {
    await page.route("**/api/profile", route =>
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          profile: { id: "test", displayName: "テスト" },
          profileImageUrl: null,
        }),
      })
    );

    await goToPageWithHeader(page);

    await expect(
      page.getByTestId("profile-image")
    ).toBeVisible();
  });

  test("設定メニュー → ユーザー設定に遷移できる", async ({ page }) => {
    await page.route("**/api/profile", route =>
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          profile: { id: "test", displayName: "テスト" },
          profileImageUrl: null,
        }),
      })
    );

    await goToPageWithHeader(page);

    // 設定アイコンをクリック
    await page.getByTestId("settings-menu").click();

    // メニュー項目をクリック
    await page.getByText("ユーザー設定").click();

    await expect(page).toHaveURL("/user/setting");
  });

  test("ログアウトでトップに戻る", async ({ page }) => {
    await page.route("**/api/profile", route =>
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          profile: { id: "test", displayName: "テスト" },
          profileImageUrl: null,
        }),
      })
    );

    await goToPageWithHeader(page);

    await page.getByTestId("settings-menu").click();
    await page.getByText("ログアウト").click();

    await expect(page).toHaveURL("/");
  });

});