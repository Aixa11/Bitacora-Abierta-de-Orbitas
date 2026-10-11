import { useI18n } from '../../i18n/useI18n';
import { usePreferences } from '../../store/preferences';

export function Footer() {
  const clearAllData = usePreferences((state) => state.clearAllData);
  const { t } = useI18n();

  function handleClear() {
    const confirmed = window.confirm(t('footer.clearConfirm'));
    if (!confirmed) return;
    clearAllData();
    document.documentElement.dataset.theme = 'dark';
  }

  return (
    <footer className="mt-auto border-t border-[color:var(--orbit-line)] px-4 py-8">
      <div className="mx-auto flex w-full max-w-[1220px] flex-col gap-4 text-sm text-[color:var(--orbit-muted)]">
        <p>
          <strong className="font-display text-[color:var(--orbit-text)]">{t('footer.brand')}</strong>
          . {t('footer.disclaimer')}
        </p>
        <p className="font-mono text-xs uppercase tracking-[0.16em]">{t('footer.credits')}</p>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleClear}
            className="rounded-full border border-[color:var(--orbit-line)] px-4 py-2 text-sm text-[color:var(--orbit-text)]"
          >
            {t('footer.clearData')}
          </button>
        </div>
      </div>
    </footer>
  );
}
