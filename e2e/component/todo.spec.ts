import { test, expect } from "@playwright/test";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function goToTodoPage(page: any) {
  await page.goto("/todo");
  await expect(page.getByText("テストTodo")).toBeVisible();
}

test("コピーを押すと copyTodo が呼ばれる", async ({ page }) => {
  let calledId: string | null = null;

  await page.route("**/api/todo/**/copy", route => {
    calledId = route.request().url().split("/").slice(-2, -1)[0];
    route.fulfill({ status: 200 });
  });

  await goToTodoPage(page);

  await page.getByText("コピー").click();

  await expect.poll(() => calledId).toBe("todo-1");
});

test("完了を押すと deleteTodo API が呼ばれる", async ({ page }) => {
  let called = false;

  await page.route("**/api/todo/**/delete", route => {
    called = true;
    route.fulfill({ status: 200 });
  });

  await goToTodoPage(page);

  await page.getByTestId("todo-fin").click();

  await expect.poll(() => called).toBe(true);
});

test("詳細ボタンでテキストが開閉される", async ({ page }) => {
  await goToTodoPage(page);

  const detail = page.getByTestId("todo-description");

  await expect(detail).toHaveCSS("height", "0px");

  await page.getByTestId("detail-button").click();

  await expect(detail).not.toHaveCSS("height", "0px");

  await page.getByTestId("detail-button").click();

  await expect(detail).toHaveCSS("height", "0px");
});



