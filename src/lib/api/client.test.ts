import { afterEach, describe, expect, it, vi } from 'vitest';
import { clearApiCache, fetchJson } from './client';

describe('fetchJson', () => {
  afterEach(() => {
    clearApiCache();
    vi.unstubAllGlobals();
  });

  it('guarda en caché y sirve la segunda llamada sin fetch', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue({
        ok: true,
        json: async () => ({ ok: true }),
      });
    vi.stubGlobal('fetch', fetchMock);

    const first = await fetchJson<{ ok: boolean }>('https://example.test/api', {
      cacheKey: 'demo',
    });
    const second = await fetchJson<{ ok: boolean }>('https://example.test/api', {
      cacheKey: 'demo',
    });

    expect(first.status).toBe('ok');
    expect(second.status).toBe('ok');
    if (first.status === 'ok' && second.status === 'ok') {
      expect(first.fromCache).toBe(false);
      expect(second.fromCache).toBe(true);
    }
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('devuelve error claro si el fetch falla', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('network')));
    const result = await fetchJson('https://example.test/down', { cacheKey: 'fail' });
    expect(result.status).toBe('error');
    if (result.status === 'error') {
      expect(result.message).toMatch(/conexión|API/i);
    }
  });
});
