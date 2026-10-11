import type { Acceso, Categoria, Herramienta, Legal, Nivel, Origen, TipoHerramienta } from '../../content/schema';
import type { BitacoraFilters } from '../../lib/bitacora/filters';
import { countByFacet, facetOptions } from '../../lib/bitacora/filters';
import type { SortMode, ViewMode } from '../../lib/bitacora/labels';

type FilterBarProps = {
  tools: Herramienta[];
  filters: BitacoraFilters;
  vista: ViewMode;
  resultCount: number;
  onChange: (next: BitacoraFilters) => void;
  onVistaChange: (vista: ViewMode) => void;
  onClear: () => void;
};

type FacetKey = 'categoria' | 'origen' | 'tipo' | 'acceso' | 'nivel' | 'legal';

const FACET_ROWS: Array<{ key: FacetKey; label: string }> = [
  { key: 'categoria', label: 'Para qué' },
  { key: 'origen', label: 'Origen' },
  { key: 'tipo', label: 'Tipo' },
  { key: 'acceso', label: 'Acceso' },
  { key: 'nivel', label: 'Nivel' },
  { key: 'legal', label: 'Legal' },
];

function toggleValue<T extends string>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

function withToggledFacet(
  filters: BitacoraFilters,
  key: FacetKey,
  value: string,
): BitacoraFilters {
  switch (key) {
    case 'categoria':
      return {
        ...filters,
        categoria: toggleValue(filters.categoria, value as Categoria),
      };
    case 'origen':
      return { ...filters, origen: toggleValue(filters.origen, value as Origen) };
    case 'tipo':
      return { ...filters, tipo: toggleValue(filters.tipo, value as TipoHerramienta) };
    case 'acceso':
      return { ...filters, acceso: toggleValue(filters.acceso, value as Acceso) };
    case 'nivel':
      return { ...filters, nivel: toggleValue(filters.nivel, value as Nivel) };
    case 'legal':
      return { ...filters, legal: toggleValue(filters.legal, value as Legal) };
  }
}

function isSelected(filters: BitacoraFilters, key: FacetKey, value: string): boolean {
  return (filters[key] as string[]).includes(value);
}

export function FilterBar({
  tools,
  filters,
  vista,
  resultCount,
  onChange,
  onVistaChange,
  onClear,
}: FilterBarProps) {
  return (
    <div className="card-orbit mb-6 grid gap-4 p-5">
      <label className="flex items-center gap-3 rounded-2xl border border-[color:var(--orbit-line)] bg-[color:var(--orbit-chip)] px-4 py-3">
        <span className="sr-only">Buscar herramientas</span>
        <input
          type="search"
          value={filters.q}
          onChange={(event) => onChange({ ...filters, q: event.target.value })}
          placeholder="Buscar: radar, incendios, STAC, Python, órbitas…"
          className="w-full bg-transparent text-sm outline-none placeholder:text-[color:var(--orbit-muted)]"
          aria-label="Buscar herramientas"
        />
      </label>

      {FACET_ROWS.map((row) => (
        <div
          key={row.key}
          className="grid gap-2 md:grid-cols-[90px_1fr] md:items-center"
          data-filter={row.key}
        >
          <span className="label-mono">{row.label}</span>
          <div className="flex flex-wrap gap-2" role="group" aria-label={row.label}>
            {facetOptions(row.key).map((option) => {
              const selected = isSelected(filters, row.key, option.value);
              const count = countByFacet(tools, row.key, option.value);
              return (
                <button
                  key={option.value}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => onChange(withToggledFacet(filters, row.key, option.value))}
                  className={[
                    'inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition-colors duration-orbit',
                    selected
                      ? 'border-transparent bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] text-white'
                      : 'border-[color:var(--orbit-line)] bg-[color:var(--orbit-chip)]',
                  ].join(' ')}
                >
                  {option.label}
                  <span className="font-mono text-[0.65rem] opacity-80">{count}</span>
                </button>
              );
            })}
          </div>
        </div>
      ))}

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[color:var(--orbit-line)] pt-4">
        <p className="text-sm text-[color:var(--orbit-muted)]" aria-live="polite">
          {resultCount} de {tools.length} herramientas
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <label className="flex items-center gap-2 text-sm">
            <span className="text-[color:var(--orbit-muted)]">Orden</span>
            <select
              value={filters.orden}
              onChange={(event) =>
                onChange({ ...filters, orden: event.target.value as SortMode })
              }
              className="rounded-full border border-[color:var(--orbit-line)] bg-[color:var(--orbit-chip)] px-3 py-1.5"
            >
              <option value="relevancia">Relevancia</option>
              <option value="nombre">Nombre</option>
              <option value="nivel">Nivel</option>
            </select>
          </label>
          <div
            className="inline-flex rounded-full border border-[color:var(--orbit-line)] p-1"
            role="group"
            aria-label="Vista"
          >
            <button
              type="button"
              aria-pressed={vista === 'tarjetas'}
              onClick={() => onVistaChange('tarjetas')}
              className={[
                'rounded-full px-3 py-1 text-sm',
                vista === 'tarjetas' ? 'bg-[color:var(--orbit-chip)] font-semibold' : '',
              ].join(' ')}
            >
              Tarjetas
            </button>
            <button
              type="button"
              aria-pressed={vista === 'tabla'}
              onClick={() => onVistaChange('tabla')}
              className={[
                'rounded-full px-3 py-1 text-sm',
                vista === 'tabla' ? 'bg-[color:var(--orbit-chip)] font-semibold' : '',
              ].join(' ')}
            >
              Tabla
            </button>
          </div>
          <button
            type="button"
            onClick={onClear}
            className="text-sm font-semibold text-[color:var(--orbit-muted)] underline-offset-2 hover:underline"
          >
            Limpiar filtros
          </button>
        </div>
      </div>
    </div>
  );
}
