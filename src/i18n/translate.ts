import type { MessageTree } from './messages/es';

type Primitive = string | number | boolean;

/** Rutas de clave tipo "home.titleHighlight" o "nav.ayuda". */
export type MessageKey = Leaves<MessageTree>;

type Leaves<T, Prefix extends string = ''> = T extends string
  ? Prefix extends ''
    ? never
    : Prefix
  : {
      [K in keyof T & string]: Leaves<T[K], Prefix extends '' ? K : `${Prefix}.${K}`>;
    }[keyof T & string];

function getByPath(tree: MessageTree, path: string): string | undefined {
  const parts = path.split('.');
  let current: unknown = tree;
  for (const part of parts) {
    if (current === null || typeof current !== 'object') return undefined;
    current = (current as Record<string, unknown>)[part];
  }
  return typeof current === 'string' ? current : undefined;
}

/** Interpola `{nombre}` en la plantilla. */
export function interpolate(
  template: string,
  params?: Record<string, Primitive>,
): string {
  if (!params) return template;
  return template.replace(/\{(\w+)\}/g, (_, key: string) => {
    const value = params[key];
    return value === undefined || value === null ? `{${key}}` : String(value);
  });
}

export function translate(
  messages: MessageTree,
  fallback: MessageTree,
  key: MessageKey,
  params?: Record<string, Primitive>,
): string {
  const raw = getByPath(messages, key) ?? getByPath(fallback, key) ?? key;
  return interpolate(raw, params);
}
