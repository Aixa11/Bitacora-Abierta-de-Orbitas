import { Link } from 'react-router-dom';
import { useI18n } from '../i18n/useI18n';

const SHORTCUTS = [
  { to: '/', key: 'nav.home' },
  { to: '/ruta', key: 'nav.ruta' },
  { to: '/desafios', key: 'nav.desafios' },
  { to: '/laboratorio', key: 'nav.laboratorio' },
  { to: '/bitacora', key: 'nav.bitacora' },
  { to: '/charla', key: 'nav.charla' },
  { to: '/ayuda', key: 'nav.ayuda' },
] as const;

export function NotFoundPage() {
  const { t } = useI18n();

  return (
    <section className="card-orbit mx-auto max-w-xl p-8" aria-labelledby="titulo-404">
      <p className="label-mono">/ 404 /</p>
      <h1 id="titulo-404" className="mt-4 font-display text-4xl font-bold">
        {t('pages.notFound.title')}
      </h1>
      <p className="mt-4 text-[color:var(--orbit-muted)]">{t('pages.notFound.lead')}</p>
      <Link
        to="/"
        className="btn-orbit-xl btn-orbit-primary mt-6"
      >
        {t('pages.notFound.cta')}
      </Link>
      <nav className="mt-8" aria-label={t('a11y.sections')}>
        <p className="label-mono">/ {t('a11y.sections')} /</p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {SHORTCUTS.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className="btn-orbit-md btn-orbit-outline"
              >
                {t(item.key)}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
