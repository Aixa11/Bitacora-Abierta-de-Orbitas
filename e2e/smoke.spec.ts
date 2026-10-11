import { expect, test } from '@playwright/test';
import { withSpanishLocale } from './locale';

test('la base carga el inicio y la bitácora', async ({ page }) => {
  await withSpanishLocale(page);
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('bitácora abierta');
  await expect(page.getByText(/Guía comunitaria e independiente/i)).toBeVisible();

  await page.getByRole('button', { name: 'Abrir menú' }).click();
  await page.getByRole('navigation', { name: 'Secciones' }).getByRole('link', { name: 'Bitácora' }).click();

  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'Bitácora de datos y herramientas',
  );

  await page.goto('/no-existe');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Esta órbita no existe');
});
