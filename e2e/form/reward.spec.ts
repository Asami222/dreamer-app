import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/reward/new');
});

test('reward と star を入力すると送信され「追加しました！」が表示される', async ({ page }) => {
  await page.fill('input[placeholder="テディベア"]', 'ご褒美テスト');
  await page.fill('input[placeholder="100"]', '50');

  const loading = page.getByText('作成中...');

  await page.getByTestId('add-reward').click();

  // 一瞬でも表示されることを保証
  await loading.waitFor({ state: 'visible', timeout: 3000 });
  await loading.waitFor({ state: 'hidden', timeout: 3000 });

  // toast の成功表示を検証
  await expect(page.getByText('追加しました！')).toBeVisible();
});

test('titleのみ入力すると star のエラーが表示される', async ({ page }) => {
  await page.fill('input[placeholder="テディベア"]', 'ご褒美だけ');

  await page.getByTestId('add-reward').click();

  await expect(page.getByTestId('reward-star')).toHaveText('1以上の数を入力してください');
});

test('未入力で送信すると title のエラーが表示される', async ({ page }) => {
  await page.getByTestId('add-reward').click();

  await expect(page.getByTestId('reward-title')).toHaveText('ご褒美を入力してください');
});

test('submitError がある場合 サーバーエラーが赤字で表示される', async ({ page }) => {
  await page.goto('/reward/new');

  await page.fill('input[placeholder="テディベア"]', '失敗テスト');
  await page.fill('input[placeholder="100"]', '1');

  await page.getByTestId('add-reward').click();

  await expect(page.getByTestId('rewardform-server-error')).toBeVisible();
});