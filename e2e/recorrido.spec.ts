import { expect, test } from '@playwright/test';
import { withSpanishLocale } from './locale';

test('recorrido principal de la guía', async ({ page }) => {
  await withSpanishLocale(page);
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText(/bitácora abierta/i);

  await page.goto('/ruta');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

  await page.goto('/desafios');
  await expect(page.getByRole('heading', { level: 1 })).toContainText(/Desafíos/i);

  await page.goto('/sensores');
  await expect(page.getByRole('heading', { level: 1 })).toContainText(/Sensores|observar/i);

  await page.goto('/laboratorio');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

  await page.goto('/bitacora');
  await expect(page.getByRole('heading', { level: 1 })).toContainText(/Bitácora/i);

  await page.goto('/equipo');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

  await page.goto('/entrega');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

  await page.goto('/reglas');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

  await page.goto('/charla');
  await expect(page.getByRole('heading', { level: 1 })).toContainText(/Explora la Tierra/i);
  await expect(page.getByRole('button', { name: 'Modo presentación' })).toBeVisible();

  await page.goto('/glosario');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

  await page.goto('/no-existe-fase-7');
  await expect(page.getByRole('heading', { level: 1 })).toContainText(/órbita no existe/i);
});
