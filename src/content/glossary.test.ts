import { describe, expect, it } from 'vitest';
import { herramientas } from './catalog';
import { GLOSSARY } from './glossary';
import { RUTA_PASOS } from './ruta';

describe('contenido fase 3', () => {
  it('tiene al menos 40 términos en el glosario', () => {
    expect(GLOSSARY.length).toBeGreaterThanOrEqual(40);
  });

  it('las herramientas del glosario existen en tools.json', () => {
    const ids = new Set(herramientas.map((tool) => tool.id));
    const broken = GLOSSARY.filter(
      (term) => term.herramientaId !== null && !ids.has(term.herramientaId),
    ).map((term) => `${term.id}→${term.herramientaId}`);
    expect(broken).toEqual([]);
  });

  it('la ruta tiene 8 pasos y herramientas válidas', () => {
    expect(RUTA_PASOS).toHaveLength(8);
    const ids = new Set(herramientas.map((tool) => tool.id));
    for (const paso of RUTA_PASOS) {
      expect(paso.checklist.length).toBeGreaterThan(0);
      for (const toolId of paso.herramientasIds) {
        expect(ids.has(toolId)).toBe(true);
      }
    }
  });
});
