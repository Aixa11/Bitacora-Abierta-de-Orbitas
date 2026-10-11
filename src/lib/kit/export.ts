import type { Herramienta } from '../../content/schema';
import { LEGAL_LABELS, ORIGEN_LABELS } from '../bitacora/labels';

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

function escapeBibTeX(value: string): string {
  return value.replace(/[{}]/g, '');
}

export function exportKitMarkdown(tools: Herramienta[], accessDate = todayIso()): string {
  const rows = tools.map(
    (t) =>
      `| ${t.nombre} | ${t.organizacion} | ${ORIGEN_LABELS[t.origen]} | ${LEGAL_LABELS[t.legal]} | ${t.url} | ${accessDate} |`,
  );

  return [
    '# Recursos utilizados — NASA Space Apps 2026',
    '',
    `Generado con Órbitas · Bitácora Space Apps (${accessDate}).`,
    'Revisa y completa la misión, el producto y la versión de cada recurso antes de entregar.',
    '',
    '| Recurso | Organización | Origen | Semáforo legal | Enlace | Fecha de acceso |',
    '|---|---|---|---|---|---|',
    ...rows,
    '',
    '## Notas',
    '- Datos de NASA y agencias socias: citar misión, producto y fecha de acceso.',
    '- Datos de terceros: deben ser públicos y libres, o tener una licencia abierta (OSI).',
    '- Declara las herramientas de IA que usaste y su rol en el proyecto.',
    '',
  ].join('\n');
}

export function exportKitJson(tools: Herramienta[], accessDate = todayIso()): string {
  const payload = {
    generado: accessDate,
    fuente: 'Órbitas · Bitácora Space Apps',
    recordatorio:
      'Completa misión, producto y versión de cada recurso antes de pegar en la entrega.',
    recursos: tools.map((t) => ({
      id: t.id,
      nombre: t.nombre,
      organizacion: t.organizacion,
      origen: t.origen,
      legal: t.legal,
      url: t.url,
      fecha_acceso: accessDate,
      mision: '',
      producto: '',
      version: '',
    })),
  };
  return `${JSON.stringify(payload, null, 2)}\n`;
}

export function exportKitBibTeX(tools: Herramienta[], accessDate = todayIso()): string {
  return (
    tools
      .map((t, index) => {
        const key = `${t.id.replace(/[^a-zA-Z0-9_-]/g, '_')}_${index + 1}`;
        return [
          `@misc{${key},`,
          `  title = {${escapeBibTeX(t.nombre)}},`,
          `  author = {${escapeBibTeX(t.organizacion)}},`,
          `  howpublished = {\\url{${t.url}}},`,
          `  note = {Acceso ${accessDate}. Completar misión, producto y versión.},`,
          `  year = {${accessDate.slice(0, 4)}}`,
          '}',
        ].join('\n');
      })
      .join('\n\n') + (tools.length ? '\n' : '')
  );
}

export function downloadTextFile(filename: string, content: string, mime: string): void {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}
