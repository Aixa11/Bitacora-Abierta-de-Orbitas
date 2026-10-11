import { expect, test } from '@playwright/test';
import { withSpanishLocale } from './locale';

test('página de sensores muestra temas y simulador', async ({ page }) => {
  await withSpanishLocale(page);
  await page.goto('/sensores');
  await expect(page.getByRole('heading', { level: 1 })).toContainText(/observar/i);
  await page.getByRole('button', { name: 'Incendios' }).click();
  await expect(page.getByRole('heading', { level: 2, name: 'Incendios' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Simulador de sensores' })).toBeVisible();
  await expect(page.getByLabel(/elige un sensor/i)).toBeVisible();
});
