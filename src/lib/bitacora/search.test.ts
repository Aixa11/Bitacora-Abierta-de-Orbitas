import { describe, expect, it } from 'vitest';
import { herramientas } from '../../content/catalog';
import { EMPTY_FILTERS, filterTools } from './filters';
import { searchTools } from './search';

describe('searchTools', () => {
  it('encuentra resultados aunque falten acentos en la consulta', () => {
    const results = searchTools(herramientas, 'orbitas');
    expect(results.some((tool) => tool.categoria === 'orbitas' || /órbit/i.test(tool.descripcion))).toBe(
      true,
    );
  });

  it('encuentra NASA Worldview por fragmento', () => {
    const results = searchTools(herramientas, 'worldview');
    expect(results.some((tool) => tool.id === 'nasa-worldview')).toBe(true);
  });

  it('sin consulta devuelve la lista intacta', () => {
    expect(searchTools(herramientas, '  ')).toHaveLength(herramientas.length);
  });
});

describe('filterTools', () => {
  it('combina filtros de origen y nivel', () => {
    const filtered = filterTools(herramientas, {
      ...EMPTY_FILTERS,
      origen: ['nasa'],
      nivel: ['ini'],
    });
    expect(filtered.length).toBeGreaterThan(0);
    expect(filtered.every((tool) => tool.origen === 'nasa' && tool.nivel === 'ini')).toBe(true);
  });

  it('ordena por nombre', () => {
    const filtered = filterTools(herramientas, {
      ...EMPTY_FILTERS,
      orden: 'nombre',
    });
    const names = filtered.map((tool) => tool.nombre);
    const sorted = [...names].sort((a, b) => a.localeCompare(b, 'es'));
    expect(names).toEqual(sorted);
  });
});
