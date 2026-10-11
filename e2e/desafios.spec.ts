import { expect, test } from '@playwright/test';

test('lista desafíos, abre una guía y guarda una nota del método', async ({ page }) => {
  await page.goto('/desafios');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Catorce desafíos');
  await expect(page.getByText('Esta guía no resuelve el desafío')).toBeVisible();

  await page.getByLabel('Buscar desafíos').fill('jukebox');
  await page.getByRole('link', { name: 'Abrir guía' }).click();

  await expect(page.getByRole('heading', { level: 1 })).toContainText('rocola');
  await expect(
    page.getByText('Esta guía no resuelve el desafío. El trabajo y las ideas son de tu equipo.'),
  ).toBeVisible();
  await expect(page.getByText('Se publican el 28 de octubre de 2026')).toBeVisible();

  await page.getByLabel('Nota del paso Entender').fill('Leímos el enunciado juntos.');
  await expect(page.getByLabel('Nota del paso Entender')).toHaveValue(
    'Leímos el enunciado juntos.',
  );

  await page.getByRole('button', { name: 'Agregar recursos de esta guía a Mi kit' }).click();
  await expect(page.getByRole('dialog', { name: 'Recursos para citar' })).toBeVisible();
});
