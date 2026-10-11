import { Link } from 'react-router-dom';
import { RecursosOficialesBanner } from '../components/ayuda/RecursosOficialesBanner';
import { EarthHero } from '../components/earth3d/EarthHero';
import { ContentLocaleNotice } from '../components/layout/ContentLocaleNotice';
import { catalogo, desafios, herramientas } from '../content/catalog';
import { useI18n } from '../i18n/useI18n';

export function HomePage() {
  const { t } = useI18n();

  return (
    <div className="space-y-10">
      <RecursosOficialesBanner />
      <ContentLocaleNotice />
      <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="card-orbit flex flex-col gap-6 p-8">
          <p className="label-mono">{t('home.eyebrow')}</p>
          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
            {t('home.titleBefore')}{' '}
            <span className="bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] bg-clip-text text-transparent">
              {t('home.titleHighlight')}
            </span>
          </h1>
          <p className="max-w-prose text-lg text-[color:var(--orbit-muted)]">{t('home.lead')}</p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/ruta"
              className="rounded-full bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] px-5 py-3 text-sm font-semibold text-white"
            >
              {t('home.ctaRuta')}
            </Link>
            <Link
              to="/ayuda"
              className="rounded-full border border-[color:var(--orbit-line)] px-5 py-3 text-sm font-semibold"
            >
              {t('home.ctaAyuda')}
            </Link>
            <Link
              to="/desafios"
              className="rounded-full border border-[color:var(--orbit-line)] px-5 py-3 text-sm font-semibold"
            >
              {t('home.ctaDesafios')}
            </Link>
            <Link
              to="/sensores"
              className="rounded-full border border-[color:var(--orbit-line)] px-5 py-3 text-sm font-semibold"
            >
              {t('home.ctaSensores')}
            </Link>
            <Link
              to="/ia"
              className="rounded-full border border-[color:var(--orbit-line)] px-5 py-3 text-sm font-semibold"
            >
              {t('nav.ia')}
            </Link>
          </div>
        </div>
        <aside className="card-orbit grid grid-cols-2 gap-4 p-8">
          <div>
            <p className="label-mono">{t('home.toolsLabel')}</p>
            <p className="mt-2 font-display text-3xl">{herramientas.length}</p>
          </div>
          <div>
            <p className="label-mono">{t('home.challengesLabel')}</p>
            <p className="mt-2 font-display text-3xl">{desafios.length}</p>
          </div>
          <div className="col-span-2 text-sm text-[color:var(--orbit-muted)]">
            {t('home.seedNote', { version: catalogo.tools.version })}
          </div>
        </aside>
      </section>

      <section aria-labelledby="hero-tierra-titulo">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="label-mono">{t('home.earthEyebrow')}</p>
            <h2 id="hero-tierra-titulo" className="mt-1 font-display text-2xl font-bold">
              {t('home.earthTitle')}
            </h2>
          </div>
          <Link to="/laboratorio" className="text-sm font-semibold underline underline-offset-2">
            {t('home.earthLabLink')}
          </Link>
        </div>
        <EarthHero />
      </section>
    </div>
  );
}
