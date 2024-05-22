import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page).toHaveTitle(/Playwright/);
});

test('Watch account @smoke', async ({ page }) => {
  await page.goto('.');
  await page.getByPlaceholder('Wallet address or ENS name').fill('vitalik.eth');
  await page.getByRole('button', { name: 'Watch address' }).click();
  await page.locator('#sidebar-item-Dashboard').click();
  await page.locator('tr').filter({ hasText: 'Ethereum' }).first().click()
});
