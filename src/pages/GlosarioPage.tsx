import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ContentLocaleNotice } from '../components/layout/ContentLocaleNotice';
import { herramientas } from '../content/catalog';
import { useI18n } from '../i18n/useI18n';
import { GLOSSARY } from '../content/glossary';
import { stripAccents } from '../lib/text';

const toolsById = new Map(herramientas.map((tool) => [tool.id, tool]));

export function GlosarioPage() {
  const { t } = useI18n();
  const [q, setQ] = useState('');

  const terms = useMemo(() => {
    const needle = stripAccents(q.trim());
    const sorted = [...GLOSSARY].sort((a, b) => a.termino.localeCompare(b.termino, 'es'));
    if (!needle) return sorted;
    return sorted.filter((term) =>
      stripAccents([term.termino, term.simple, term.tecnica, term.ejemplo].join(' ')).includes(
        needle,
      ),
    );
  }, [q]);

  return (
    <div>
      <header className="mb-8 max-w-3xl space-y-4">
        <div>
          <p className="label-mono">/ Glosario /</p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight">
            {t('pages.glosario.title')}
          </h1>
          <p className="mt-3 text-[color:var(--orbit-muted)]">{t('pages.glosario.lead')}</p>
        </div>
        <ContentLocaleNotice />
        <label className="field-orbit">
          <span className="sr-only">Buscar en el glosario</span>
          <input
            type="search"
            value={q}
            onChange={(event) => setQ(event.target.value)}
            placeholder="Buscar: SAR, NDVI, STAC, TLE…"
            className="w-full bg-transparent text-sm outline-none"
            aria-label="Buscar en el glosario"
          />
        </label>
        <p className="mt-2 text-sm text-[color:var(--orbit-muted)]" aria-live="polite">
          {terms.length} resultado{terms.length === 1 ? '' : 's'}
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {terms.map((term) => {
          const tool = term.herramientaId ? toolsById.get(term.herramientaId) : undefined;
          return (
            <article key={term.id} className="card-orbit p-5" id={term.id}>
              <h2 className="font-display text-2xl font-bold">{term.termino}</h2>
              <p className="mt-2 text-sm">{term.simple}</p>
              <p className="mt-3 text-sm text-[color:var(--orbit-muted)]">
                <span className="label-mono">Técnica</span>
                <br />
                {term.tecnica}
              </p>
              <p className="mt-3 text-sm text-[color:var(--orbit-muted)]">
                <span className="label-mono">Ejemplo</span>
                <br />
                {term.ejemplo}
              </p>
              {tool ? (
                <Link
                  to={`/bitacora?q=${encodeURIComponent(tool.nombre)}`}
                  className="mt-4 inline-flex text-sm font-semibold underline-offset-2 hover:underline"
                >
                  Ver en la bitácora: {tool.nombre}
                </Link>
              ) : null}
            </article>
          );
        })}
      </div>
    </div>
  );
}
