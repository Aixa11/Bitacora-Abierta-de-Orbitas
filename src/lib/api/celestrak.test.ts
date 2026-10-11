import { afterEach, describe, expect, it, vi } from 'vitest';
import { TLE_FALLBACKS } from '../../content/tleFallbacks';
import {
  arissIssTleUrl,
  celestrakTleUrl,
  fetchTle,
  resetCelestrakCircuit,
} from './celestrak';
import { clearApiCache } from './client';

describe('celestrakTleUrl', () => {
  it('usa proxy same-origin en el navegador (CORS)', () => {
    const url = celestrakTleUrl('25544');
    expect(url.startsWith('/proxy/celestrak/')).toBe(true);
    expect(url).toContain('CATNR=25544');
    expect(url).toContain('FORMAT=tle');
  });

  it('expone proxy ARISS para la ISS', () => {
    expect(arissIssTleUrl()).toBe('/proxy/ariss/iss.txt');
  });
});

describe('fetchTle', () => {
  afterEach(() => {
    clearApiCache();
    resetCelestrakCircuit();
    vi.unstubAllGlobals();
  });

  it('usa copia local si CelesTrak falla', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => {
        throw new TypeError('fetch failed');
      }),
    );

    const result = await fetchTle('25544');
    expect(result.status).toBe('ok');
    if (result.status !== 'ok') return;
    expect(result.data.source).toBe('fallback');
    expect(result.data.line1).toBe(TLE_FALLBACKS['25544'].line1);
    expect(result.data.satrec.error).toBe(0);
  });

  it('no reintenta CelesTrak tras el primer fallo (cortocircuito)', async () => {
    const fetchMock = vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input);
      if (url.includes('/proxy/ariss/')) {
        return new Response('nope', { status: 500 });
      }
      throw new TypeError('fetch failed');
    });
    vi.stubGlobal('fetch', fetchMock);

    await fetchTle('49260');
    await fetchTle('40697');
    await fetchTle('25994');

    const celestrakCalls = fetchMock.mock.calls.filter(([input]) =>
      String(input).includes('/proxy/celestrak/'),
    );
    // Solo el sondeo inicial (ISS), no uno por satélite.
    expect(celestrakCalls.length).toBe(1);
  });
});
