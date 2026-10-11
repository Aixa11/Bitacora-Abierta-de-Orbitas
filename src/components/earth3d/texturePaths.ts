import { NASA_TEXTURE_REMOTES } from '../../content/nasaTextures';

export type TextureQuality = '2k' | '4k';

const BASE = '/textures';

export function earthTextureUrls(quality: TextureQuality) {
  const q = quality;
  return {
    day: `${BASE}/earth-day-${q}.webp`,
    night: `${BASE}/earth-night-${q}.webp`,
    clouds: `${BASE}/earth-clouds-${q}.webp`,
    stars: `${BASE}/stars-${q}.webp`,
  };
}

/** Rutas proxy (Vite) hacia eoimages; útiles cuando aún no hay WebP locales. */
export function earthRemoteProxyUrls() {
  const byId = Object.fromEntries(NASA_TEXTURE_REMOTES.map((t) => [t.id, t.proxyPath]));
  return {
    day: byId['earth-day'] ?? null,
    night: byId['earth-night'] ?? null,
    clouds: byId['earth-clouds'] ?? null,
  };
}

export async function textureExists(url: string): Promise<boolean> {
  try {
    const res = await fetch(url, { method: 'HEAD' });
    if (res.ok) return true;
    // Algunos hosts/proxies no permiten HEAD; probar GET parcial.
    const get = await fetch(url, { method: 'GET', headers: { Range: 'bytes=0-0' } });
    return get.ok || get.status === 206;
  } catch {
    return false;
  }
}
