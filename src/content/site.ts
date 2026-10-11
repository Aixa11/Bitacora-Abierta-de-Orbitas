/** Issues del repo público de la Bitácora. */
export const GITHUB_NEW_ISSUE_URL =
  'https://github.com/Aixa11/Bitacora-Abierta-de-Orbitas/issues/new';

export function buildSuggestToolIssueUrl(input: {
  nombre: string;
  url: string;
  organizacion: string;
  porQue: string;
}): string {
  const title = encodeURIComponent(`[sugerencia] ${input.nombre.trim() || 'Nueva herramienta'}`);
  const body = encodeURIComponent(
    [
      '## Sugerencia de herramienta',
      '',
      `**Nombre:** ${input.nombre.trim()}`,
      `**URL:** ${input.url.trim()}`,
      `**Organización:** ${input.organizacion.trim() || '(sin indicar)'}`,
      '',
      '**Por qué conviene incluirla:**',
      input.porQue.trim() || '(sin indicar)',
      '',
      '---',
      'Enviado desde Órbitas · Bitácora Space Apps',
    ].join('\n'),
  );
  return `${GITHUB_NEW_ISSUE_URL}?title=${title}&body=${body}`;
}
