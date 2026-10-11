import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FilterBar } from '../components/bitacora/FilterBar';
import { SuggestToolForm } from '../components/bitacora/SuggestToolForm';
import { ToolCard } from '../components/bitacora/ToolCard';
import { ToolTable } from '../components/bitacora/ToolTable';
import { ContentLocaleNotice } from '../components/layout/ContentLocaleNotice';
import { herramientas } from '../content/catalog';
import { useI18n } from '../i18n/useI18n';
import {
  EMPTY_FILTERS,
  filterTools,
  type BitacoraFilters,
} from '../lib/bitacora/filters';
import { PAGE_SIZE, type ViewMode } from '../lib/bitacora/labels';
import {
  filtersFromSearchParams,
  filtersToSearchParams,
  parseView,
} from '../lib/bitacora/urlParams';

export function BitacoraPage() {
  const { t } = useI18n();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<BitacoraFilters>(() =>
    filtersFromSearchParams(searchParams),
  );
  const [vista, setVista] = useState<ViewMode>(() => parseView(searchParams.get('vista')));
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    const next = filtersToSearchParams(filters, vista);
    const current = searchParams.toString();
    const upcoming = next.toString();
    if (current !== upcoming) {
      setSearchParams(next, { replace: true });
    }
  }, [filters, vista, searchParams, setSearchParams]);

  const filtered = useMemo(() => filterTools(herramientas, filters), [filters]);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [filters, vista]);

  const visible = filtered.slice(0, visibleCount);
  const remaining = Math.max(filtered.length - visibleCount, 0);

  return (
    <div>
      <header className="mb-8 max-w-3xl space-y-4">
        <div>
          <p className="label-mono">/ 04 · Bitácora /</p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight">
            {t('pages.bitacora.title')}
          </h1>
          <p className="mt-3 text-[color:var(--orbit-muted)]">{t('pages.bitacora.lead')}</p>
        </div>
        <ContentLocaleNotice />
      </header>

      <FilterBar
        tools={herramientas}
        filters={filters}
        vista={vista}
        resultCount={filtered.length}
        onChange={setFilters}
        onVistaChange={setVista}
        onClear={() => {
          setFilters(EMPTY_FILTERS);
          setVista('tarjetas');
        }}
      />

      {filtered.length === 0 ? (
        <div className="card-orbit p-8 text-center text-[color:var(--orbit-muted)]">
          {t('common.empty')}
        </div>
      ) : vista === 'tabla' ? (
        <ToolTable tools={visible} />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {visible.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      )}

      {remaining > 0 ? (
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
            className="rounded-full border border-[color:var(--orbit-line)] px-5 py-2.5 text-sm font-semibold"
          >
            Ver más ({remaining} restantes)
          </button>
        </div>
      ) : null}

      <SuggestToolForm />
    </div>
  );
}
