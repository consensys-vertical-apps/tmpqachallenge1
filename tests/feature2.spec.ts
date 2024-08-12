import { test, expect, request } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page).toHaveTitle(/Playwright/);
});

const statuses = ['available', 'reserved', 'sold'];

for (const status of statuses) {
  test(`check API is working for status: ${status} @feature2`, async () => {
    const apiContext = await request.newContext();
    const response = await apiContext.get(
      `https://petstore.swagger.io/v2/pet/findByStatus?status=${status}`,
      {
        headers: {
          accept: 'application/json',
        },
      }
    );

    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toBe('application/json');
    const responseBody = await response.json();
    expect(responseBody).toBeInstanceOf(Array);
    expect(responseBody.length).toBeGreaterThan(0);
  });
}
