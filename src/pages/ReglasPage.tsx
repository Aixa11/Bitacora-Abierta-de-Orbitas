import { LegalDot } from '../components/bitacora/LegalDot';
import { ContentLocaleNotice } from '../components/layout/ContentLocaleNotice';
import { REGLAS, REGLAS_INTRO, SEMAFORO } from '../content/reglas';
import { useI18n } from '../i18n/useI18n';

export function ReglasPage() {
  const { t } = useI18n();

  return (
    <div className="mx-auto max-w-4xl">
      <header className="space-y-4">
        <div>
          <p className="label-mono">/ {REGLAS_INTRO.kicker} /</p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight">
            {t('pages.reglas.title')}
          </h1>
          <p className="mt-3 max-w-prose text-[color:var(--orbit-muted)]">{t('pages.reglas.lead')}</p>
        </div>
        <ContentLocaleNotice />
      </header>
      <p className="callout-coral mt-3">
        {REGLAS_INTRO.aviso}
      </p>

      <ul className="mt-4 flex flex-wrap gap-3 text-sm">
        {REGLAS_INTRO.enlaces.map((enlace) => (
          <li key={enlace.url}>
            <a
              href={enlace.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold underline-offset-2 hover:underline"
            >
              {enlace.label}
            </a>
          </li>
        ))}
      </ul>

      <div className="mt-8 grid gap-4">
        {REGLAS.map((regla) => (
          <article key={regla.letra} className="card-orbit p-5">
            <span className="inline-grid h-8 w-8 place-items-center rounded-full bg-gradient-to-r from-orbit-violet to-orbit-blue font-mono text-sm font-bold text-white">
              {regla.letra}
            </span>
            <h2 className="mt-3 font-display text-2xl font-bold">{regla.titulo}</h2>
            <div
              className="mt-2 text-[color:var(--orbit-muted)] [&_a]:font-semibold [&_a]:underline-offset-2 hover:[&_a]:underline [&_q]:italic [&_strong]:text-[color:var(--orbit-text)]"
              dangerouslySetInnerHTML={{ __html: regla.cuerpoHtml }}
            />
          </article>
        ))}
      </div>

      <section className="card-orbit mt-8 grid gap-4 p-5 sm:grid-cols-2">
        {SEMAFORO.map((item) => (
          <div key={item.legal} className="flex gap-3">
            <LegalDot legal={item.legal} />
            <div>
              <h3 className="font-display text-lg font-bold">{item.titulo}</h3>
              <p className="mt-1 text-sm text-[color:var(--orbit-muted)]">{item.texto}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
