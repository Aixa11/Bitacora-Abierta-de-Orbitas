import { describe, expect, it } from 'vitest';
import { desafios } from '../../content/catalog';
import { EMPTY_DESAFIO_FILTERS, filterDesafios } from './filters';
import { exportDesafioMarkdown } from './exportNotes';

const FORBIDDEN = [
  /nuestra solución/i,
  /arquitectura final/i,
  /te proponemos construir/i,
  /implementa este código para resolver/i,
];

describe('filtros de desafíos', () => {
  it('filtra por dificultad y búsqueda sin acentos', () => {
    const byDiff = filterDesafios(desafios, {
      ...EMPTY_DESAFIO_FILTERS,
      dificultad: ['Avanzado'],
    });
    expect(byDiff.length).toBeGreaterThan(0);
    expect(byDiff.every((d) => d.dificultad.includes('Avanzado'))).toBe(true);

    const byQuery = filterDesafios(desafios, {
      ...EMPTY_DESAFIO_FILTERS,
      q: 'jukebox',
    });
    expect(byQuery.some((d) => d.id === 'earth-information-jukebox')).toBe(true);
  });
});

describe('contenido editorial de desafíos', () => {
  it('no incluye frases que propongan una solución cerrada', () => {
    for (const desafio of desafios) {
      const blob = [
        desafio.resumen_es,
        ...desafio.preguntas_guia,
        ...desafio.trampas,
        ...desafio.autoevaluacion,
        ...desafio.conceptos_para_aprender,
      ].join('\n');
      for (const pattern of FORBIDDEN) {
        expect(blob).not.toMatch(pattern);
      }
    }
  });

  it('exporta notas del método a Markdown con el aviso editorial', () => {
    const desafio = desafios[0];
    const md = exportDesafioMarkdown(desafio, { Entender: 'Leímos el enunciado' }, '2026-10-08');
    expect(md).toContain(desafio.titulo_es);
    expect(md).toContain('Esta guía no resuelve el desafío');
    expect(md).toContain('Leímos el enunciado');
    expect(md).toContain('### Entender');
  });
});
