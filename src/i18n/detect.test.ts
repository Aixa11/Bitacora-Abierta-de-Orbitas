import { describe, expect, it } from 'vitest';
import { DEFAULT_LOCALE, detectBrowserLocale } from './detect';
import { normalizeBrowserLanguage } from './locales';

describe('normalizeBrowserLanguage', () => {
  it('resuelve etiquetas regionales', () => {
    expect(normalizeBrowserLanguage('es-AR')).toBe('es');
    expect(normalizeBrowserLanguage('en-US')).toBe('en');
    expect(normalizeBrowserLanguage('zh-CN')).toBe('zh');
    expect(normalizeBrowserLanguage('pt-BR')).toBe('pt');
  });

  it('rechaza idiomas no soportados', () => {
    expect(normalizeBrowserLanguage('ko-KR')).toBeNull();
    expect(normalizeBrowserLanguage('')).toBeNull();
  });
});

describe('detectBrowserLocale', () => {
  it('elige el primer idioma soportado de la lista', () => {
    expect(detectBrowserLocale(['ko-KR', 'fr-FR', 'en'])).toBe('fr');
  });

  it('cae a español si no hay coincidencia', () => {
    expect(detectBrowserLocale(['ko', 'sv'])).toBe(DEFAULT_LOCALE);
  });
});
