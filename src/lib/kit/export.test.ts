import { describe, expect, it } from 'vitest';
import type { Herramienta } from '../../content/schema';
import { exportKitBibTeX, exportKitJson, exportKitMarkdown } from './export';

const sample: Herramienta[] = [
  {
    id: 'nasa-worldview',
    nombre: 'NASA Worldview',
    organizacion: 'NASA EOSDIS',
    origen: 'nasa',
    categoria: 'explorar',
    tipo: 'web',
    acceso: 'libre',
    nivel: 'ini',
    legal: 'verde',
    descripcion: 'Más de 1.200 capas satelitales.',
    url: 'https://worldview.earthdata.nasa.gov/',
    snippet: null,
  },
];

describe('exportación de Mi kit', () => {
  it('genera Markdown con tabla y fecha de acceso', () => {
    const md = exportKitMarkdown(sample, '2026-10-08');
    expect(md).toContain('| NASA Worldview | NASA EOSDIS | NASA | Verde |');
    expect(md).toContain('2026-10-08');
    expect(md).toContain('misión, el producto y la versión');
  });

  it('genera JSON con campos vacíos para misión/producto/versión', () => {
    const json = JSON.parse(exportKitJson(sample, '2026-10-08')) as {
      recursos: Array<{ id: string; mision: string; producto: string; version: string }>;
    };
    expect(json.recursos).toHaveLength(1);
    expect(json.recursos[0].id).toBe('nasa-worldview');
    expect(json.recursos[0].mision).toBe('');
    expect(json.recursos[0].producto).toBe('');
    expect(json.recursos[0].version).toBe('');
  });

  it('genera BibTeX con url y nota de acceso', () => {
    const bib = exportKitBibTeX(sample, '2026-10-08');
    expect(bib).toContain('@misc{nasa-worldview_1,');
    expect(bib).toContain('title = {NASA Worldview}');
    expect(bib).toContain('Acceso 2026-10-08');
  });
});
