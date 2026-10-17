import { expect, test } from '@playwright/test';
import { withSpanishLocale } from './locale';

test('charla muestra webinar, pitch y modo presentación', async ({ page }) => {
  await withSpanishLocale(page);
  await page.goto('/charla');
  await expect(page.getByRole('heading', { level: 1 })).toContainText(/Explora la Tierra/i);
  await expect(page.getByRole('button', { name: 'Modo presentación' })).toBeVisible();
  await expect(page.getByRole('heading', { name: /Grabación de la charla/i })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Español', exact: true }).first()).toBeVisible();
  await expect(page.getByRole('button', { name: 'English', exact: true }).first()).toBeVisible();
  await expect(page.locator('video')).toBeVisible();
  await expect(page.getByRole('heading', { name: /Láminas de la presentación/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /Descargar PDF/i })).toBeVisible();

  await page.getByRole('button', { name: 'Modo presentación' }).click();
  await expect(page.getByRole('button', { name: 'Salir del modo presentación' })).toBeVisible();
  await page.keyboard.press('ArrowRight');
  await page.getByRole('button', { name: 'Salir del modo presentación' }).click();
  await expect(page.getByRole('button', { name: 'Modo presentación' })).toBeVisible();
});
