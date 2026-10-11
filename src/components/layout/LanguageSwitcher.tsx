import { LOCALES, LOCALE_META } from '../../i18n/locales';
import { useI18n } from '../../i18n/useI18n';

type LanguageSwitcherProps = {
  className?: string;
};

export function LanguageSwitcher({ className = '' }: LanguageSwitcherProps) {
  const { locale, setLocale, t } = useI18n();

  return (
    <label className={['inline-flex items-center gap-2', className].filter(Boolean).join(' ')}>
      <span className="sr-only">{t('a11y.language')}</span>
      <select
        value={locale}
        onChange={(event) => setLocale(event.target.value as typeof locale)}
        aria-label={t('a11y.language')}
        className="h-11 max-w-[9.5rem] cursor-pointer rounded-full border border-[color:var(--orbit-line)] bg-[color:var(--orbit-chip)] px-3 text-sm font-semibold text-[color:var(--orbit-text)]"
      >
        {LOCALES.map((code) => (
          <option key={code} value={code}>
            {LOCALE_META[code].nativeLabel}
          </option>
        ))}
      </select>
    </label>
  );
}
