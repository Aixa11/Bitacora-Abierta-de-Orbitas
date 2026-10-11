import type {
  Acceso,
  Categoria,
  Legal,
  Nivel,
  Origen,
  TipoHerramienta,
} from '../../content/schema';

export const CATEGORIA_LABELS: Record<Categoria, string> = {
  explorar: 'Explorar sin código',
  datos: 'Consumir datos',
  tematicos: 'Datos temáticos',
  procesar: 'Procesar y analizar',
  mapas: 'Mapas y visualización',
  ia: 'IA, modelos y agentes',
  orbitas: 'Órbitas y espacio',
  aprender: 'Aprender',
};

export const ORIGEN_LABELS: Record<Origen, string> = {
  nasa: 'NASA',
  socia: 'Agencias socias',
  abierto: 'Abierto y comunidad',
};

export const TIPO_LABELS: Record<TipoHerramienta, string> = {
  web: 'Web',
  api: 'API',
  python: 'Python',
  js: 'JavaScript',
  escritorio: 'Escritorio',
  modelo: 'Modelo IA',
  agente: 'Agente / MCP',
  servidor: 'Servidor',
};

export const ACCESO_LABELS: Record<Acceso, string> = {
  libre: 'Sin registro',
  registro: 'Cuenta gratuita',
  key: 'Clave API gratuita',
};

export const NIVEL_LABELS: Record<Nivel, string> = {
  ini: 'Inicial',
  int: 'Intermedio',
  ava: 'Avanzado',
};

export const LEGAL_LABELS: Record<Legal, string> = {
  verde: 'Verde',
  amarillo: 'Amarillo',
};

export const NIVEL_ORDER: Record<Nivel, number> = {
  ini: 0,
  int: 1,
  ava: 2,
};

export type SortMode = 'relevancia' | 'nombre' | 'nivel';
export type ViewMode = 'tarjetas' | 'tabla';

export const PAGE_SIZE = 18;
