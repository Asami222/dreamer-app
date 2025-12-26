import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/newTodo/day');
});
/*
test('submitError が role=alert として表示される', async ({ page }) => {
  await page.getByTestId("add-todo").click();

  const alert = page.getByTestId("todoform-error");

  await expect(alert).toBeVisible();
  await expect(alert).toHaveAttribute("role", "alert");
  await expect(alert).toHaveText(/todo|入力/);
});
*/
test('todo未入力で client バリデーションエラーが表示される', async ({ page }) => {
  await page.getByTestId("add-todo").click();

  const alert = page.getByTestId("todoform-error");

  await expect(alert).toBeVisible();
  await expect(alert).toHaveText(/todoを入力してください/);
});

test('todo を入力して送信すると server error が表示されない', async ({ page }) => {
  await page.fill('input[placeholder="todoを入力してください"]', 'E2E Todo');
  await page.getByTestId("add-todo").click();

  await expect(page.getByTestId("todoform-server-error")).toHaveCount(0);
});
/* 表示は一瞬のため確認不可能
test('isLoading=true のとき 作成中... が表示される', async ({ page }) => {
  await page.fill('input[placeholder="todoを入力してください"]', 'テストTodo');

  await page.getByTestId("add-todo").click();

  await expect(page.getByText('作成中...')).toBeVisible();
});
*/
test('期限を小数で入力するとエラーになる', async ({ page }) => {
  await page.fill('input[placeholder="todoを入力してください"]', 'テストTodo');
  await page.fill('input[placeholder="1"]', '1.5');

  await page.getByTestId("add-todo").click();

  await expect(page.getByText(/整数/)).toBeVisible();
});

test('todo を入力して送信するとエラーが表示されない', async ({ page }) => {
  await page.fill('input[placeholder="todoを入力してください"]', 'E2E Todo');

  await page.getByTestId("add-todo").click();

  // エラーメッセージが存在しないことを保証
  await expect(page.getByTestId('todoform-error')).toHaveCount(0);
});