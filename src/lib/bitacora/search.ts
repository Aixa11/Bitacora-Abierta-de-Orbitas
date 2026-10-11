import Fuse from 'fuse.js';
import type { Herramienta } from '../../content/schema';
import {
  ACCESO_LABELS,
  CATEGORIA_LABELS,
  LEGAL_LABELS,
  NIVEL_LABELS,
  ORIGEN_LABELS,
  TIPO_LABELS,
} from './labels';
import { stripAccents } from '../text';

type SearchableTool = Herramienta & { _search: string };

function toSearchable(tool: Herramienta): SearchableTool {
  const blob = [
    tool.nombre,
    tool.organizacion,
    tool.descripcion,
    tool.snippet ?? '',
    tool.id,
    CATEGORIA_LABELS[tool.categoria],
    ORIGEN_LABELS[tool.origen],
    TIPO_LABELS[tool.tipo],
    ACCESO_LABELS[tool.acceso],
    NIVEL_LABELS[tool.nivel],
    LEGAL_LABELS[tool.legal],
  ].join(' ');

  return { ...tool, _search: stripAccents(blob) };
}

/** Búsqueda difusa sin acentos. Sin consulta, devuelve la lista intacta. */
export function searchTools(tools: Herramienta[], query: string): Herramienta[] {
  const q = query.trim();
  if (!q) return tools;

  const searchable = tools.map(toSearchable);
  const fuse = new Fuse(searchable, {
    keys: ['_search'],
    threshold: 0.35,
    ignoreLocation: true,
    includeScore: true,
  });

  return fuse.search(stripAccents(q)).map((result) => {
    const { _search: _ignored, ...tool } = result.item;
    void _ignored;
    return tool;
  });
}
