import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ContentLocaleNotice } from '../components/layout/ContentLocaleNotice';
import { catalogo, desafios } from '../content/catalog';
import { useI18n } from '../i18n/useI18n';
import {
  countDesafioFacet,
  EMPTY_DESAFIO_FILTERS,
  filterDesafios,
  uniqueFacetValues,
  type DesafioFilters,
} from '../lib/desafios/filters';

type FacetKey = 'dificultad' | 'temas' | 'tipo';

const FACETS: Array<{ key: FacetKey; label: string }> = [
  { key: 'dificultad', label: 'Dificultad' },
  { key: 'temas', label: 'Temas' },
  { key: 'tipo', label: 'Tipo' },
];

function toggleValue(list: string[], value: string): string[] {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

export function DesafiosPage() {
  const { t } = useI18n();
  const [filters, setFilters] = useState<DesafioFilters>(EMPTY_DESAFIO_FILTERS);
  const filtered = useMemo(() => filterDesafios(desafios, filters), [filters]);

  return (
    <div>
      <header className="mb-8 max-w-3xl space-y-4">
        <div>
          <p className="label-mono">/ Desafíos 2026 /</p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight">
            {t('pages.desafios.title')}
          </h1>
          <p className="mt-3 text-[color:var(--orbit-muted)]">
            {t('pages.desafios.lead')} Fuente:{' '}
            <a
              href={catalogo.challenges.fuente}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold underline-offset-2 hover:underline"
            >
              spaceappschallenge.org/2026/challenges
            </a>
            .
          </p>
          <p className="callout-coral mt-3">
            Esta guía no resuelve el desafío. El trabajo y las ideas son de tu equipo.
          </p>
        </div>
        <ContentLocaleNotice />
      </header>

      <div className="card-orbit mb-6 grid gap-4 p-5">
        <label className="field-orbit">
          <span className="sr-only">Buscar desafíos</span>
          <input
            type="search"
            value={filters.q}
            onChange={(event) => setFilters({ ...filters, q: event.target.value })}
            placeholder="Buscar por título, tema o tipo…"
            className="w-full bg-transparent text-sm outline-none"
            aria-label="Buscar desafíos"
          />
        </label>

        {FACETS.map((facet) => (
          <div key={facet.key} className="grid gap-2 md:grid-cols-[90px_1fr] md:items-start">
            <span className="label-mono pt-2">{facet.label}</span>
            <div className="flex flex-wrap gap-2" role="group" aria-label={facet.label}>
              {uniqueFacetValues(desafios, facet.key).map((value) => {
                const selected = filters[facet.key].includes(value);
                const count = countDesafioFacet(desafios, facet.key, value);
                return (
                  <button
                    key={value}
                    type="button"
                    aria-pressed={selected}
                    onClick={() =>
                      setFilters({
                        ...filters,
                        [facet.key]: toggleValue(filters[facet.key], value),
                      })
                    }
                    className="btn-orbit-toggle"
                  >
                    {value}
                    <span className="font-mono text-[0.65rem] opacity-80">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[color:var(--orbit-line)] pt-4">
          <p className="text-sm text-[color:var(--orbit-muted)]" aria-live="polite">
            {filtered.length} de {desafios.length} desafíos
          </p>
          <button
            type="button"
            onClick={() => setFilters(EMPTY_DESAFIO_FILTERS)}
            className="text-sm font-semibold underline-offset-2 hover:underline"
          >
            Limpiar filtros
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="card-orbit p-8 text-center text-[color:var(--orbit-muted)]">
          No hay desafíos con esa combinación. Prueba quitando algún filtro.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filtered.map((desafio) => (
            <article key={desafio.id} className="card-orbit flex flex-col gap-3 p-5">
              <p className="label-mono">{desafio.tipo}</p>
              <h2 className="font-display text-2xl font-bold tracking-tight">
                <Link to={`/desafios/${desafio.id}`} className="hover:underline">
                  {desafio.titulo_es}
                </Link>
              </h2>
              <p className="text-sm text-[color:var(--orbit-muted)] line-clamp-4">
                {desafio.resumen_es}
              </p>
              <div className="flex flex-wrap gap-2">
                {desafio.dificultad.map((item) => (
                  <span
                    key={item}
                    className="chip-orbit"
                  >
                    {item}
                  </span>
                ))}
                {desafio.temas.slice(0, 3).map((tema) => (
                  <span
                    key={tema}
                    className="chip-orbit"
                  >
                    {tema}
                  </span>
                ))}
              </div>
              <div className="mt-auto flex flex-wrap gap-2 pt-2">
                <Link
                  to={`/desafios/${desafio.id}`}
                  className="btn-orbit-lg btn-orbit-primary"
                >
                  Abrir guía
                </Link>
                <a
                  href={desafio.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-orbit-lg btn-orbit-outline"
                >
                  Enunciado oficial
                </a>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
