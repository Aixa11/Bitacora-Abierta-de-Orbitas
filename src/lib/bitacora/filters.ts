import type {
  Acceso,
  Categoria,
  Herramienta,
  Legal,
  Nivel,
  Origen,
  TipoHerramienta,
} from '../../content/schema';
import {
  ACCESO_LABELS,
  CATEGORIA_LABELS,
  LEGAL_LABELS,
  NIVEL_LABELS,
  NIVEL_ORDER,
  ORIGEN_LABELS,
  TIPO_LABELS,
  type SortMode,
} from './labels';
import { searchTools } from './search';

export type BitacoraFilters = {
  q: string;
  categoria: Categoria[];
  origen: Origen[];
  tipo: TipoHerramienta[];
  acceso: Acceso[];
  nivel: Nivel[];
  legal: Legal[];
  orden: SortMode;
};

export const EMPTY_FILTERS: BitacoraFilters = {
  q: '',
  categoria: [],
  origen: [],
  tipo: [],
  acceso: [],
  nivel: [],
  legal: [],
  orden: 'relevancia',
};

type FilterKey = 'categoria' | 'origen' | 'tipo' | 'acceso' | 'nivel' | 'legal';

function matchesSet<T extends string>(selected: T[], value: T): boolean {
  return selected.length === 0 || selected.includes(value);
}

export function filterTools(
  tools: Herramienta[],
  filters: BitacoraFilters,
): Herramienta[] {
  const byFacet = tools.filter(
    (tool) =>
      matchesSet(filters.categoria, tool.categoria) &&
      matchesSet(filters.origen, tool.origen) &&
      matchesSet(filters.tipo, tool.tipo) &&
      matchesSet(filters.acceso, tool.acceso) &&
      matchesSet(filters.nivel, tool.nivel) &&
      matchesSet(filters.legal, tool.legal),
  );

  const searched = searchTools(byFacet, filters.q);

  if (filters.orden === 'nombre') {
    return [...searched].sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'));
  }

  if (filters.orden === 'nivel') {
    return [...searched].sort((a, b) => {
      const diff = NIVEL_ORDER[a.nivel] - NIVEL_ORDER[b.nivel];
      return diff !== 0 ? diff : a.nombre.localeCompare(b.nombre, 'es');
    });
  }

  return searched;
}

export function countByFacet(
  tools: Herramienta[],
  key: FilterKey,
  value: string,
): number {
  return tools.filter((tool) => tool[key] === value).length;
}

export function facetOptions(key: FilterKey): Array<{ value: string; label: string }> {
  const map = {
    categoria: CATEGORIA_LABELS,
    origen: ORIGEN_LABELS,
    tipo: TIPO_LABELS,
    acceso: ACCESO_LABELS,
    nivel: NIVEL_LABELS,
    legal: LEGAL_LABELS,
  }[key];

  return Object.entries(map).map(([value, label]) => ({ value, label }));
}

export function hasActiveFilters(filters: BitacoraFilters): boolean {
  return (
    filters.q.trim().length > 0 ||
    filters.categoria.length > 0 ||
    filters.origen.length > 0 ||
    filters.tipo.length > 0 ||
    filters.acceso.length > 0 ||
    filters.nivel.length > 0 ||
    filters.legal.length > 0
  );
}
