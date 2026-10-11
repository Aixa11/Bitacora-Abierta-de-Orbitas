import { normalizeBrowserLanguage, type Locale } from './locales';

/** Idioma por defecto del proyecto (contenido seed en español). */
export const DEFAULT_LOCALE: Locale = 'es';

/**
 * Detecta el idioma preferido del navegador entre los soportados.
 * Si ninguno coincide, devuelve español.
 */
export function detectBrowserLocale(
  languages: readonly string[] = typeof navigator !== 'undefined'
    ? (navigator.languages?.length ? navigator.languages : [navigator.language])
    : [],
): Locale {
  for (const tag of languages) {
    const match = normalizeBrowserLanguage(tag);
    if (match) return match;
  }
  return DEFAULT_LOCALE;
}
