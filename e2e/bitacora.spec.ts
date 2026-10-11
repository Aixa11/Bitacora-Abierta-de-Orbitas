import { expect, test } from '@playwright/test';
import { withSpanishLocale } from './locale';

test('filtra la bitácora, agrega al kit y exporta Markdown', async ({ page }) => {
  await withSpanishLocale(page);
  await page.goto('/bitacora');
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'Bitácora de datos y herramientas',
  );

  await page.getByLabel('Buscar').fill('worldview');
  await expect(page.getByText(/de 123 herramientas/)).toBeVisible();
  await expect(page.getByRole('heading', { name: 'NASA Worldview' })).toBeVisible();

  await page.getByRole('button', { name: 'Agregar al kit' }).first().click();
  await expect(page.getByRole('button', { name: 'Abrir mi kit' })).toContainText('1');

  await page.getByRole('button', { name: 'Abrir mi kit' }).click();
  const drawer = page.getByRole('dialog', { name: 'Recursos para citar' });
  await expect(drawer).toBeVisible();
  await expect(drawer.getByText('NASA Worldview')).toBeVisible();

  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Markdown' }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe('recursos-space-apps.md');
});

test('los filtros se reflejan en la URL', async ({ page }) => {
  await withSpanishLocale(page);
  await page.goto('/bitacora');
  await page.getByRole('button', { name: /NASA/ }).first().click();
  await expect(page).toHaveURL(/origen=nasa/);
  await page.getByRole('button', { name: 'Tabla' }).click();
  await expect(page).toHaveURL(/vista=tabla/);
  await expect(page.getByRole('table')).toBeVisible();
});
