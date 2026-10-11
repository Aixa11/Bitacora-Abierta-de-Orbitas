import type { Desafio } from '../../content/schema';
import { metodoGeneral } from '../../content/catalog';

export function exportDesafioMarkdown(
  desafio: Desafio,
  notas: Record<string, string>,
  accessDate = new Date().toISOString().slice(0, 10),
): string {
  const metodoLines = metodoGeneral.map((paso) => {
    const nota = (notas[paso.paso] ?? '').trim() || '_(sin completar)_';
    return [`### ${paso.paso}`, '', paso.pregunta, '', nota, ''].join('\n');
  });

  return [
    `# ${desafio.titulo_es}`,
    '',
    `Enunciado oficial: ${desafio.url}`,
    `Notas del equipo · ${accessDate}`,
    '',
    '> Esta guía no resuelve el desafío. El trabajo y las ideas son de tu equipo.',
    '',
    '## Resumen',
    '',
    desafio.resumen_es,
    '',
    `**Tipo:** ${desafio.tipo}`,
    `**Dificultad:** ${desafio.dificultad.join(', ')}`,
    `**Temas:** ${desafio.temas.join(', ')}`,
    '',
    '## Cómo pensarlo (método de 7 pasos)',
    '',
    ...metodoLines,
    '## Preguntas guía',
    '',
    ...desafio.preguntas_guia.map((q) => `- ${q}`),
    '',
    '## Autoevaluación',
    '',
    ...desafio.autoevaluacion.map((q) => `- [ ] ${q}`),
    '',
  ].join('\n');
}
