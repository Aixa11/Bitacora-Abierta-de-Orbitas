import { describe, expect, it } from 'vitest';
import { herramientas } from './catalog';
import { IA_NASA_DOCS } from './iaNasa';

describe('iaNasa', () => {
  it('cada guía apunta a una herramienta existente en el catálogo', () => {
    const ids = new Set(herramientas.map((tool) => tool.id));
    for (const doc of IA_NASA_DOCS) {
      expect(ids.has(doc.toolId), doc.toolId).toBe(true);
    }
  });

  it('incluye el Lunar Foundation Model', () => {
    expect(IA_NASA_DOCS.some((doc) => doc.toolId === 'nasa-ibm-lunar-foundation-model')).toBe(
      true,
    );
    expect(herramientas.some((tool) => tool.id === 'nasa-ibm-lunar-foundation-model')).toBe(true);
  });
});
