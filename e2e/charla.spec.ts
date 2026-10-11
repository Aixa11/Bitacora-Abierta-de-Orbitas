import { expect, test } from '@playwright/test';
import { withSpanishLocale } from './locale';

test('charla muestra próximamente hasta el 16 de octubre', async ({ page }) => {
  await withSpanishLocale(page);
  await page.goto('/charla');
  await expect(page.getByRole('heading', { level: 1 })).toContainText(/Charla/i);
  await expect(page.getByText(/Próximamente/i)).toBeVisible();
  await expect(page.getByText(/16 de octubre de 2026/i)).toBeVisible();
  await expect(page.getByRole('button', { name: 'Modo presentación' })).toHaveCount(0);
});
