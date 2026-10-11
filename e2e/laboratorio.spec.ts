import { expect, test } from '@playwright/test';
import { withSpanishLocale } from './locale';

test('el laboratorio muestra mapa, Kepler y panel cómo se hizo', async ({ page }) => {
  await withSpanishLocale(page);
  await page.goto('/laboratorio');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('APIs abiertas');
  await expect(page.getByRole('region', { name: 'Mapa interactivo del laboratorio' })).toBeVisible();
  await expect(page.getByText('Capa satelital (GIBS)')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Órbita a mano' })).toBeVisible();

  await page.getByRole('button', { name: 'GEO' }).click();
  await expect(page.getByText(/35\.?786|35786/)).toBeVisible();

  await page.getByText('¿Cómo se hizo? Las llamadas reales').click();
  await expect(page.getByText('https://eonet.gsfc.nasa.gov/api/v3/events')).toBeVisible();
  await expect(page.getByText('celestrak.org/NORAD/elements')).toBeVisible();
});
