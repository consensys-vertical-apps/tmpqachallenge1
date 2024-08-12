import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page).toHaveTitle(/Playwright/);
});

test('Watch account @smoke', async ({ page }) => {
  await page.goto('.');
  await page.getByRole('button', { name: 'Manage in Settings' }).click();
  await page.getByRole('link', { name: 'Overview' }).click();
  await page.getByPlaceholder('Wallet address or ENS name').fill('vitalik.eth');
  await page.getByRole('button', { name: 'Watch address' }).click();
  await page.getByRole('link', { name: 'Overview' }).click();
  await expect(
    page.getByRole('table').filter({ hasText: 'Ether' })
  ).toBeVisible({ timeout: 30000 });
});
