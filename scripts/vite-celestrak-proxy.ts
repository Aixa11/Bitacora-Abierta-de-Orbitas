/**
 * Proxy CelesTrak con cortocircuito: si el host no responde, no reintenta
 * (evita spam ETIMEDOUT en la consola de Vite al remount/HMR).
 */
import type { Connect, Plugin, PreviewServer, ViteDevServer } from 'vite';

const PREFIX = '/proxy/celestrak';
const UPSTREAM = 'https://celestrak.org';
const PROBE_MS = 2_500;
const COOLDOWN_MS = 15 * 60 * 1000;

type AttachServer = ViteDevServer | PreviewServer;

export function celestrakProxyPlugin(): Plugin {
  let downUntil = 0;
  let probe: Promise<boolean> | null = null;

  async function upstreamOk(): Promise<boolean> {
    if (Date.now() < downUntil) return false;
    if (probe) return probe;
    probe = (async () => {
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), PROBE_MS);
      try {
        const res = await fetch(
          `${UPSTREAM}/NORAD/elements/gp.php?CATNR=25544&FORMAT=tle`,
          {
            signal: ctrl.signal,
            headers: { 'User-Agent': 'Bitacora-Orbitas-dev-proxy/0.1' },
          },
        );
        if (!res.ok) {
          downUntil = Date.now() + COOLDOWN_MS;
          return false;
        }
        await res.arrayBuffer();
        return true;
      } catch {
        downUntil = Date.now() + COOLDOWN_MS;
        return false;
      } finally {
        clearTimeout(timer);
        probe = null;
      }
    })();
    return probe;
  }

  function attach(server: AttachServer): void {
    server.middlewares.use((async (req, res, next) => {
      const url = req.url ?? '';
      if (!url.startsWith(PREFIX)) {
        next();
        return;
      }

      const reachable = await upstreamOk();
      if (!reachable) {
        res.statusCode = 504;
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.end('CelesTrak no alcanzable (cortocircuito local; usando TLE de respaldo).');
        return;
      }

      const path = url.slice(PREFIX.length) || '/';
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), PROBE_MS);
      try {
        const upstream = await fetch(`${UPSTREAM}${path}`, {
          signal: ctrl.signal,
          headers: { 'User-Agent': 'Bitacora-Orbitas-dev-proxy/0.1' },
        });
        res.statusCode = upstream.status;
        const type = upstream.headers.get('content-type');
        if (type) res.setHeader('Content-Type', type);
        const buf = Buffer.from(await upstream.arrayBuffer());
        res.end(buf);
      } catch {
        downUntil = Date.now() + COOLDOWN_MS;
        res.statusCode = 504;
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.end('CelesTrak timeout.');
      } finally {
        clearTimeout(timer);
      }
    }) as Connect.NextHandleFunction);
  }

  return {
    name: 'orbitas-celestrak-proxy',
    configureServer: attach,
    configurePreviewServer: attach,
  };
}
