import { expect, test } from '@playwright/test';
import { withSpanishLocale } from './locale';

test('recorre la ruta y marca un ítem del checklist', async ({ page }) => {
  await withSpanishLocale(page);
  await page.goto('/ruta');
  await expect(page.getByRole('heading', { level: 1 })).toContainText(/Ruta del dato|Ocho pasos/i);
  await page.getByRole('tab', { name: /Convierte el desafío/i }).click();
  await expect(page.getByRole('heading', { level: 2 })).toContainText('Convierte el desafío');
  await page.getByLabel(/Definí el QUÉ/i).check();
  await expect(page.getByText(/Checklist: 1\//)).toBeVisible();
});

test('glosario, reglas, equipo y entrega cargan', async ({ page }) => {
  await withSpanishLocale(page);
  await page.goto('/glosario');
  await expect(page.getByRole('heading', { level: 1 })).toContainText(/Glosario|GEOINT/i);
  await page.getByLabel('Buscar en el glosario').fill('STAC');
  await expect(page.getByRole('heading', { name: 'STAC' })).toBeVisible();

  await page.goto('/reglas');
  await expect(page.getByText('Guía orientativa, no asesoramiento legal')).toBeVisible();

  await page.goto('/equipo');
  await expect(page.getByRole('heading', { level: 1 })).toContainText(/Equipo|Roles/i);
  await page.getByLabel('Nueva tarea').fill('Probar demo juntos');
  await page.getByRole('button', { name: 'Agregar' }).click();
  await expect(page.getByText('Probar demo juntos')).toBeVisible();

  await page.goto('/entrega');
  await expect(page.getByRole('heading', { level: 1 })).toContainText(/Entrega|Checklist/i);
  await page.getByText('Al menos un recurso de la NASA').click();
  await expect(page.getByRole('button', { name: 'Iniciar', exact: true })).toBeVisible();
});
