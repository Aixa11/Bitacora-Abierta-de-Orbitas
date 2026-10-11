import type { Page } from '@playwright/test';

/** Fija español antes de cargar la app (tests asertan copy del seed ES). */
export async function withSpanishLocale(page: Page) {
  await page.addInitScript(() => {
    localStorage.setItem(
      'orbitas-bitacora',
      JSON.stringify({ state: { theme: 'dark', locale: 'es' }, version: 0 }),
    );
  });
}
