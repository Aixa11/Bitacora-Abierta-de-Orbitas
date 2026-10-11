import { expect, test } from '@playwright/test';

test('charla muestra agenda y modo presentación', async ({ page }) => {
  await page.goto('/charla');
  await expect(page.getByRole('heading', { level: 1 })).toContainText(/satélite a tu proyecto/i);
  await expect(page.getByRole('heading', { name: 'Agenda' })).toBeVisible();
  await page.getByRole('button', { name: 'Modo presentación' }).click();
  await expect(page.getByRole('dialog', { name: 'Modo presentación' })).toBeVisible();
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('heading', { level: 1 })).toContainText(/GEOINT/i);
  await page.keyboard.press('Escape');
  await expect(page.getByRole('button', { name: 'Modo presentación' })).toBeVisible();
});
