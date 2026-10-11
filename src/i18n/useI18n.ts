import { usePreferences } from '../store/preferences';
import { DEFAULT_LOCALE } from './detect';
import { LOCALE_META, type Locale } from './locales';
import { MESSAGES } from './messages';
import { es } from './messages/es';
import { translate, type MessageKey } from './translate';

type Primitive = string | number | boolean;

export function useI18n() {
  const locale = usePreferences((state) => state.locale);
  const setLocale = usePreferences((state) => state.setLocale);
  const messages = MESSAGES[locale] ?? MESSAGES[DEFAULT_LOCALE];
  const meta = LOCALE_META[locale];

  function t(key: MessageKey, params?: Record<string, Primitive>) {
    return translate(messages, es, key, params);
  }

  return {
    locale,
    setLocale,
    t,
    dir: meta.rtl ? ('rtl' as const) : ('ltr' as const),
    messages,
  };
}

export type { Locale, MessageKey };
