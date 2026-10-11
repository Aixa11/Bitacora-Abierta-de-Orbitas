import type {
  Acceso,
  Categoria,
  Legal,
  Nivel,
  Origen,
  TipoHerramienta,
} from '../../content/schema';
import type { BitacoraFilters } from './filters';
import type { SortMode, ViewMode } from './labels';

const CATEGORIAS = [
  'explorar',
  'datos',
  'tematicos',
  'procesar',
  'mapas',
  'ia',
  'orbitas',
  'aprender',
] as const satisfies readonly Categoria[];

const ORIGENES = ['nasa', 'socia', 'abierto'] as const satisfies readonly Origen[];
const TIPOS = [
  'web',
  'api',
  'python',
  'js',
  'escritorio',
  'modelo',
  'agente',
  'servidor',
] as const satisfies readonly TipoHerramienta[];
const ACCESOS = ['libre', 'registro', 'key'] as const satisfies readonly Acceso[];
const NIVELES = ['ini', 'int', 'ava'] as const satisfies readonly Nivel[];
const LEGALES = ['verde', 'amarillo'] as const satisfies readonly Legal[];
const SORT_VALUES = ['relevancia', 'nombre', 'nivel'] as const satisfies readonly SortMode[];
const VIEW_VALUES = ['tarjetas', 'tabla'] as const satisfies readonly ViewMode[];

function parseList<T extends string>(raw: string | null, allowed: readonly T[]): T[] {
  if (!raw) return [];
  const set = new Set<string>(allowed);
  return raw
    .split(',')
    .map((part) => part.trim())
    .filter((part): part is T => set.has(part));
}

function parseSort(raw: string | null): SortMode {
  return (SORT_VALUES as readonly string[]).includes(raw ?? '')
    ? (raw as SortMode)
    : 'relevancia';
}

export function parseView(raw: string | null): ViewMode {
  return (VIEW_VALUES as readonly string[]).includes(raw ?? '')
    ? (raw as ViewMode)
    : 'tarjetas';
}

export function filtersFromSearchParams(params: URLSearchParams): BitacoraFilters {
  return {
    q: params.get('q')?.trim() ?? '',
    categoria: parseList(params.get('categoria'), CATEGORIAS),
    origen: parseList(params.get('origen'), ORIGENES),
    tipo: parseList(params.get('tipo'), TIPOS),
    acceso: parseList(params.get('acceso'), ACCESOS),
    nivel: parseList(params.get('nivel'), NIVELES),
    legal: parseList(params.get('legal'), LEGALES),
    orden: parseSort(params.get('orden')),
  };
}

export function filtersToSearchParams(
  filters: BitacoraFilters,
  vista: ViewMode,
): URLSearchParams {
  const params = new URLSearchParams();
  if (filters.q.trim()) params.set('q', filters.q.trim());
  if (filters.categoria.length) params.set('categoria', filters.categoria.join(','));
  if (filters.origen.length) params.set('origen', filters.origen.join(','));
  if (filters.tipo.length) params.set('tipo', filters.tipo.join(','));
  if (filters.acceso.length) params.set('acceso', filters.acceso.join(','));
  if (filters.nivel.length) params.set('nivel', filters.nivel.join(','));
  if (filters.legal.length) params.set('legal', filters.legal.join(','));
  if (filters.orden !== 'relevancia') params.set('orden', filters.orden);
  if (vista !== 'tarjetas') params.set('vista', vista);
  return params;
}
