/** Normaliza texto para búsqueda: minúsculas y sin diacríticos. */
export function stripAccents(value: string): string {
  return value
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase();
}
