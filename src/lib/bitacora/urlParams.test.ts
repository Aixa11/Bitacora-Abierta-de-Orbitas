import { describe, expect, it } from 'vitest';
import { EMPTY_FILTERS } from './filters';
import { filtersFromSearchParams, filtersToSearchParams, parseView } from './urlParams';

describe('urlParams de la bitácora', () => {
  it('serializa y parsea filtros combinados', () => {
    const filters = {
      ...EMPTY_FILTERS,
      q: 'radar',
      categoria: ['datos' as const],
      origen: ['nasa' as const],
      orden: 'nombre' as const,
    };
    const params = filtersToSearchParams(filters, 'tabla');
    expect(params.get('q')).toBe('radar');
    expect(params.get('categoria')).toBe('datos');
    expect(params.get('origen')).toBe('nasa');
    expect(params.get('orden')).toBe('nombre');
    expect(params.get('vista')).toBe('tabla');

    const parsed = filtersFromSearchParams(params);
    expect(parsed).toEqual(filters);
    expect(parseView(params.get('vista'))).toBe('tabla');
  });

  it('ignora valores no permitidos', () => {
    const params = new URLSearchParams('origen=inventado&orden=xyz&vista=lista');
    const parsed = filtersFromSearchParams(params);
    expect(parsed.origen).toEqual([]);
    expect(parsed.orden).toBe('relevancia');
    expect(parseView(params.get('vista'))).toBe('tarjetas');
  });
});
