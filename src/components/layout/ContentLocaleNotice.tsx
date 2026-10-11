import { useI18n } from '../../i18n/useI18n';

/**
 * Aviso cuando la UI está traducida pero el contenido seed largo sigue en español.
 */
export function ContentLocaleNotice() {
  const { locale, t } = useI18n();
  if (locale === 'es') return null;

  return (
    <aside
      className="card-orbit border-[color:color-mix(in_srgb,var(--orbit-aqua)_35%,var(--orbit-line))] p-4 text-sm"
      role="note"
    >
      <p className="label-mono text-[color:var(--orbit-aqua)]">{t('contentNotice.title')}</p>
      <p className="mt-2 text-[color:var(--orbit-muted)]">{t('contentNotice.body')}</p>
    </aside>
  );
}
