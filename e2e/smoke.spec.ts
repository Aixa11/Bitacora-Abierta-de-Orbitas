import { expect, test } from '@playwright/test';

test('la base carga el inicio y la bitácora', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('bitácora abierta');
  await expect(page.getByText('Guía comunitaria e independiente')).toBeVisible();

  await page.getByRole('button', { name: 'Abrir menú' }).click();
  await page.getByRole('navigation', { name: 'Secciones' }).getByRole('link', { name: 'Bitácora' }).click();

  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'Bitácora de datos y herramientas',
  );

  await page.goto('/no-existe');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Esta órbita no existe');
});
