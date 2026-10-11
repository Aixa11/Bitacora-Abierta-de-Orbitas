import { useEffect } from 'react';
import { LOCALE_META } from '../../i18n/locales';
import { usePreferences } from '../../store/preferences';

/** Sincroniza `lang` y `dir` del documento con el idioma activo. */
export function LocaleSync() {
  const locale = usePreferences((state) => state.locale);

  useEffect(() => {
    const meta = LOCALE_META[locale];
    document.documentElement.lang = locale;
    document.documentElement.dir = meta.rtl ? 'rtl' : 'ltr';
  }, [locale]);

  return null;
}
