/** Idiomas soportados (códigos BCP 47 base). */
export const LOCALES = ['es', 'en', 'zh', 'pt', 'fr', 'de', 'ja', 'hi', 'ar', 'ru'] as const;

export type Locale = (typeof LOCALES)[number];

export type LocaleMeta = {
  code: Locale;
  /** Nombre del idioma en ese idioma. */
  nativeLabel: string;
  /** true = escritura de derecha a izquierda. */
  rtl: boolean;
};

export const LOCALE_META: Record<Locale, LocaleMeta> = {
  es: { code: 'es', nativeLabel: 'Español', rtl: false },
  en: { code: 'en', nativeLabel: 'English', rtl: false },
  zh: { code: 'zh', nativeLabel: '中文', rtl: false },
  pt: { code: 'pt', nativeLabel: 'Português', rtl: false },
  fr: { code: 'fr', nativeLabel: 'Français', rtl: false },
  de: { code: 'de', nativeLabel: 'Deutsch', rtl: false },
  ja: { code: 'ja', nativeLabel: '日本語', rtl: false },
  hi: { code: 'hi', nativeLabel: 'हिन्दी', rtl: false },
  ar: { code: 'ar', nativeLabel: 'العربية', rtl: true },
  ru: { code: 'ru', nativeLabel: 'Русский', rtl: false },
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/** Mapea etiquetas del navegador (zh-CN, pt-BR, en-US…) al código base soportado. */
export function normalizeBrowserLanguage(tag: string): Locale | null {
  const lower = tag.trim().toLowerCase().replace('_', '-');
  if (!lower) return null;
  if (isLocale(lower)) return lower;
  const base = lower.split('-')[0] ?? '';
  if (isLocale(base)) return base;
  if (base === 'nb' || base === 'nn') return null;
  return null;
}
