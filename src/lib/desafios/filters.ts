import type { Desafio } from '../../content/schema';
import { stripAccents } from '../text';

export type DesafioFilters = {
  q: string;
  dificultad: string[];
  temas: string[];
  tipo: string[];
};

export const EMPTY_DESAFIO_FILTERS: DesafioFilters = {
  q: '',
  dificultad: [],
  temas: [],
  tipo: [],
};

export function uniqueFacetValues(
  desafios: Desafio[],
  key: 'dificultad' | 'temas' | 'tipo',
): string[] {
  const values = new Set<string>();
  for (const desafio of desafios) {
    if (key === 'tipo') {
      values.add(desafio.tipo);
    } else {
      for (const value of desafio[key]) values.add(value);
    }
  }
  return [...values].sort((a, b) => a.localeCompare(b, 'es'));
}

export function filterDesafios(desafios: Desafio[], filters: DesafioFilters): Desafio[] {
  const needle = stripAccents(filters.q.trim());

  return desafios.filter((desafio) => {
    if (filters.dificultad.length > 0) {
      const ok = filters.dificultad.some((value) => desafio.dificultad.includes(value));
      if (!ok) return false;
    }
    if (filters.temas.length > 0) {
      const ok = filters.temas.some((value) => desafio.temas.includes(value));
      if (!ok) return false;
    }
    if (filters.tipo.length > 0 && !filters.tipo.includes(desafio.tipo)) {
      return false;
    }
    if (!needle) return true;

    const haystack = stripAccents(
      [
        desafio.titulo,
        desafio.titulo_es,
        desafio.resumen_es,
        desafio.tipo,
        ...desafio.temas,
        ...desafio.dificultad,
      ].join(' '),
    );
    return haystack.includes(needle);
  });
}

export function countDesafioFacet(
  desafios: Desafio[],
  key: 'dificultad' | 'temas' | 'tipo',
  value: string,
): number {
  return desafios.filter((desafio) => {
    if (key === 'tipo') return desafio.tipo === value;
    return desafio[key].includes(value);
  }).length;
}
