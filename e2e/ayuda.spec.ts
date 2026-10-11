import { expect, test } from '@playwright/test';

test('ayuda muestra estudio NASA y explorador', async ({ page }) => {
  await page.goto('/ayuda');
  await expect(page.getByRole('heading', { level: 1 })).toContainText(/48 horas|hackatón/i);
  await page.getByRole('navigation', { name: 'Secciones de ayuda' }).getByRole('link', { name: 'Estudio NASA' }).click();
  await expect(page.getByRole('heading', { name: 'Estudio NASA en español' })).toBeVisible();
  await page.getByRole('button', { name: 'NASA Worldview' }).click();
  await expect(page.getByRole('link', { name: /Abrir documento/i })).toBeVisible();
  await page.getByRole('navigation', { name: 'Secciones de ayuda' }).getByRole('link', { name: 'Explorar el mundo' }).click();
  await expect(page.getByRole('heading', { name: /Explorar el mundo/i })).toBeVisible();
});
