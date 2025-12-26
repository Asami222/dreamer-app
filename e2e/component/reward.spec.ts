import { test, expect } from "@playwright/test";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function goToUserPage(page:any) {
  await page.goto("/user");
  await expect(page.getByText("旅行")).toBeVisible();
}

test.describe("星が足りない場合", () => {
  test.beforeEach(() => {
    process.env.NEXT_PUBLIC_E2E_TEST = "true";
    process.env.NEXT_PUBLIC_E2E_STARS = "5";
  });

  test("交換ボタンは disabled", async ({ page }) => {
    await goToUserPage(page);

    const exchangeButton = page.getByTestId("exchange-button");
    await expect(exchangeButton).toBeDisabled();
  });
});

test.describe("星が足りている場合", () => {
  test.beforeEach(() => {
    process.env.NEXT_PUBLIC_E2E_TEST = "true";
    process.env.NEXT_PUBLIC_E2E_STARS = "10";
  });

  test("交換ボタンは活性", async ({ page }) => {
    await goToUserPage(page);

    const exchangeButton = page.getByTestId("exchange-button");
    await expect(exchangeButton).toBeEnabled();
  });
});

test("交換ボタンを押せない（disabled）", async ({ page }) => {
  await goToUserPage(page);

  const exchangeButton = page.getByTestId("exchange-button");
  await expect(exchangeButton).toBeDisabled();
});
