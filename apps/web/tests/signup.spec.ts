import { test, expect } from "@playwright/test";

test("signup user", async ({ page }) => {
  await page.goto("http://localhost:3000/signup");
  await expect(
    page.getByRole("heading", {
      level: 1,
    }),
  ).toHaveText("Sign up");

  // fill form
  await page
    .getByRole("textbox", { name: "User Name" })
    .fill("Playwright user");
  await page.getByRole("textbox", { name: "Email" }).fill("akfm@example.com");
  await page.getByTestId("signup-password").fill("test password");
  // submit
  await page.getByRole("button", { name: "Sign up" }).click();

  // todo: 「登録済みユーザーです」と表出させる
  // todo: 新規登録シナリオ用に、APIから特定のデータをクリーンするエンドポイントを作成する
  await page.waitForURL("http://localhost:3000/signup/completed");
});