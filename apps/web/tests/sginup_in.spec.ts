import { test, expect } from "@playwright/test";
import { v4 as uuid } from "uuid";

const testId = uuid();

test("signup and signin user", async ({ page }) => {
  await test.step("signup user", async () => {
    await page.goto("http://localhost:3000/signup");
    // fill form
    await page
      .getByRole("textbox", { name: "User Name" })
      .fill("Playwright user");
    await page
      .getByRole("textbox", { name: "Email" })
      .fill(`${testId}@example.com`);
    await page.getByLabel("Password").fill("test password");
    // submit
    await page.getByRole("button", { name: "Sign up" }).click();

    await page.waitForURL("http://localhost:3000/user");
    await expect(page.getByText("name: Playwright user")).toBeAttached();
  });

  await test.step("signin user", async () => {
    await page.goto("http://localhost:3000/signin");
    // fill form
    await page
      .getByRole("textbox", { name: "Email" })
      .fill(`${testId}@example.com`);
    await page.getByLabel("Password").fill("test password");
    // submit
    await page.getByRole("button", { name: "Sign in" }).click();

    await page.waitForURL("http://localhost:3000/user");
    await expect(page.getByText("name: Playwright user")).toBeAttached();
  });
});
