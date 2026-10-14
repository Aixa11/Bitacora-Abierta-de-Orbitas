import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../i18n/useI18n';
import { usePreferences } from '../store/preferences';

/**
 * Placeholder hasta el 16 de octubre de 2026: el webinar y el modo presentación
 * se publican ese día. No mostrar agenda ni slides incompletos.
 */
export function CharlaPage() {
  const { t } = useI18n();
  const setPresentationMode = usePreferences((state) => state.setPresentationMode);

  useEffect(() => {
    setPresentationMode(false);
  }, [setPresentationMode]);

  return (
    <section className="card-orbit mx-auto max-w-2xl p-8 sm:p-10" aria-labelledby="charla-titulo">
      <p className="label-mono text-[color:var(--orbit-aqua)]">/ {t('pages.charla.comingSoon')} /</p>
      <h1 id="charla-titulo" className="mt-4 font-display text-4xl font-bold tracking-tight">
        {t('pages.charla.title')}
      </h1>
      <p className="mt-4 text-lg text-[color:var(--orbit-muted)]">{t('pages.charla.lead')}</p>
      <p className="mt-6 rounded-2xl border border-[color:var(--orbit-line)] bg-[color:var(--orbit-chip)] px-4 py-3 text-sm">
        {t('pages.charla.dateNote')}
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          to="/ayuda"
          className="btn-orbit-xl btn-orbit-primary"
        >
          {t('nav.ayuda')}
        </Link>
        <Link
          to="/"
          className="btn-orbit-xl btn-orbit-outline"
        >
          {t('nav.home')}
        </Link>
      </div>
    </section>
  );
}
