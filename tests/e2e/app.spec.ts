import { expect, test, type Page } from "@playwright/test";

const mockApi = async (page: Page) => {
  await page.route("http://127.0.0.1:5000/**", async (route) => {
    const request = route.request();
    const url = new URL(request.url());

    if (url.pathname === "/inputs") {
      await route.fulfill({
        contentType: "application/json",
        json: {
          items: [
            {
              date: "2026-06-19T00:00:00.000Z",
              input: "Sketch a first map idea",
            },
          ],
        },
      });
      return;
    }

    if (url.pathname === "/auth/me") {
      await route.fulfill({
        contentType: "application/json",
        json: { user: null },
        status: 401,
      });
      return;
    }

    await route.fulfill({
      contentType: "application/json",
      json: {},
    });
  });
};

test.beforeEach(async ({ page }) => {
  await mockApi(page);
});

test("renders the home page with saved ideas", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "Welcome to My Mapper!" })).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Primary navigation" })).toBeVisible();
  await expect(page.getByRole("list", { name: "Saved ideas" })).toContainText(
    "Sketch a first map idea",
  );
});

test("navigates to tools from the primary nav", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Tools" }).click();

  await expect(page).toHaveURL("/further");
  await expect(page.getByRole("heading", { name: "Further Components" })).toBeVisible();
});

test("shows the login form", async ({ page }) => {
  await page.goto("/login");

  await expect(page.getByRole("heading", { name: "Welcome back" })).toBeVisible();
  await expect(page.getByLabel("Admin username")).toBeVisible();
  await expect(page.getByLabel("Password")).toBeVisible();
  await expect(page.getByRole("button", { name: "Log in" })).toBeVisible();
});
