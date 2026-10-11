export type ApiResult<T> =
  | { status: 'ok'; data: T; fromCache: boolean }
  | { status: 'error'; message: string; fromCache: boolean };

type CacheEntry = {
  expiresAt: number;
  payload: unknown;
};

const memoryCache = new Map<string, CacheEntry>();
export const API_TIMEOUT_MS = 8_000;
export const API_CACHE_MS = 10 * 60 * 1000;

export function clearApiCache(): void {
  memoryCache.clear();
}

export async function fetchJson<T>(
  url: string,
  options?: { cacheKey?: string; timeoutMs?: number },
): Promise<ApiResult<T>> {
  const cacheKey = options?.cacheKey ?? url;
  const cached = memoryCache.get(cacheKey);
  if (cached && cached.expiresAt > Date.now()) {
    return { status: 'ok', data: cached.payload as T, fromCache: true };
  }

  const controller = new AbortController();
  const timeoutMs = options?.timeoutMs ?? API_TIMEOUT_MS;
  const timer = window.setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) {
      return {
        status: 'error',
        message: `La API respondió con estado ${response.status}.`,
        fromCache: false,
      };
    }
    const data = (await response.json()) as T;
    memoryCache.set(cacheKey, { payload: data, expiresAt: Date.now() + API_CACHE_MS });
    return { status: 'ok', data, fromCache: false };
  } catch (error) {
    const message =
      error instanceof DOMException && error.name === 'AbortError'
        ? `Tiempo de espera agotado (${timeoutMs / 1000} s).`
        : 'No se pudo contactar la API. Revisa tu conexión e intenta de nuevo.';
    return { status: 'error', message, fromCache: false };
  } finally {
    window.clearTimeout(timer);
  }
}

export async function fetchText(
  url: string,
  options?: { cacheKey?: string; timeoutMs?: number },
): Promise<ApiResult<string>> {
  const cacheKey = options?.cacheKey ?? url;
  const cached = memoryCache.get(cacheKey);
  if (cached && cached.expiresAt > Date.now()) {
    return { status: 'ok', data: cached.payload as string, fromCache: true };
  }

  const controller = new AbortController();
  const timeoutMs = options?.timeoutMs ?? API_TIMEOUT_MS;
  const timer = window.setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) {
      return {
        status: 'error',
        message: `La API respondió con estado ${response.status}.`,
        fromCache: false,
      };
    }
    const data = await response.text();
    memoryCache.set(cacheKey, { payload: data, expiresAt: Date.now() + API_CACHE_MS });
    return { status: 'ok', data, fromCache: false };
  } catch (error) {
    const message =
      error instanceof DOMException && error.name === 'AbortError'
        ? `Tiempo de espera agotado (${timeoutMs / 1000} s).`
        : 'No se pudo contactar la API. Revisa tu conexión e intenta de nuevo.';
    return { status: 'error', message, fromCache: false };
  } finally {
    window.clearTimeout(timer);
  }
}
