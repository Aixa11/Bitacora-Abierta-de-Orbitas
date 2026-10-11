import * as satellite from 'satellite.js';
import { TLE_FALLBACKS } from '../../content/tleFallbacks';
import { fetchText, type ApiResult } from './client';

/** Timeout corto: si CelesTrak no responde, pasamos a espejo o copia local. */
const CELESTRAK_TIMEOUT_MS = 2_500;
const ARISS_TIMEOUT_MS = 4_000;
/** Tras un fallo, no volver a llamar al proxy unos minutos (evita ETIMEDOUT en consola). */
const CELESTRAK_COOLDOWN_MS = 15 * 60 * 1000;

/** null = desconocido; true/false = resultado del sondeo de sesión. */
let celestrakReachable: boolean | null = null;
let celestrakProbe: Promise<boolean> | null = null;
let celestrakCooldownUntil = 0;

/** Solo tests. */
export function resetCelestrakCircuit(): void {
  celestrakReachable = null;
  celestrakProbe = null;
  celestrakCooldownUntil = 0;
}

async function probeCelestrak(): Promise<boolean> {
  if (celestrakReachable !== null && Date.now() < celestrakCooldownUntil) {
    return celestrakReachable;
  }
  if (celestrakReachable === true) return true;
  if (celestrakProbe) return celestrakProbe;

  celestrakProbe = (async () => {
    const result = await fetchText(celestrakTleUrl('25544'), {
      cacheKey: 'celestrak:probe',
      timeoutMs: CELESTRAK_TIMEOUT_MS,
    });
    const ok = result.status === 'ok' && Boolean(parseTleText(result.data, 'celestrak'));
    celestrakReachable = ok;
    celestrakCooldownUntil = Date.now() + CELESTRAK_COOLDOWN_MS;
    celestrakProbe = null;
    return ok;
  })();

  return celestrakProbe;
}

/**
 * URL del TLE. En el navegador usa proxy same-origin (Vite/Vercel) porque
 * celestrak.org no expone CORS para fetch desde la Bitácora.
 */
export function celestrakTleUrl(noradId: string): string {
  const path = `/NORAD/elements/gp.php?CATNR=${encodeURIComponent(noradId)}&FORMAT=tle`;
  if (typeof window !== 'undefined') {
    return `/proxy/celestrak${path}`;
  }
  return `https://celestrak.org${path}`;
}

/** Espejo vivo de la ISS (ARISS); útil cuando CelesTrak está bloqueado. */
export function arissIssTleUrl(): string {
  if (typeof window !== 'undefined') {
    return '/proxy/ariss/iss.txt';
  }
  return 'https://live.ariss.org/iss.txt';
}

export type TleSource = 'celestrak' | 'ariss' | 'fallback';

export type ParsedTle = {
  name: string;
  line1: string;
  line2: string;
  satrec: satellite.SatRec;
  source: TleSource;
};

export type SatPosition = {
  lat: number;
  lon: number;
  altitudeKm: number;
  speedKmS: number;
};

export type PassPrediction = {
  aosUtc: string;
  maxUtc: string;
  losUtc: string;
  maxElevationDeg: number;
};

type EciVec = { x: number; y: number; z: number };

function asEciVec(value: EciVec | boolean | undefined | null): EciVec | null {
  if (!value || value === true) return null;
  return value;
}

function parseTleText(
  text: string,
  source: TleSource,
): ParsedTle | null {
  const lines = text
    .trim()
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length < 3) return null;
  if (!lines[1].startsWith('1 ') || !lines[2].startsWith('2 ')) return null;

  const satrec = satellite.twoline2satrec(lines[1], lines[2]);
  if (satrec.error !== 0) return null;

  return { name: lines[0], line1: lines[1], line2: lines[2], satrec, source };
}

function fromFallback(noradId: string): ApiResult<ParsedTle> | null {
  const fb = TLE_FALLBACKS[noradId];
  if (!fb) return null;
  const satrec = satellite.twoline2satrec(fb.line1, fb.line2);
  if (satrec.error !== 0) return null;
  return {
    status: 'ok',
    fromCache: true,
    data: {
      name: fb.name,
      line1: fb.line1,
      line2: fb.line2,
      satrec,
      source: 'fallback',
    },
  };
}

export async function fetchTle(noradId: string): Promise<ApiResult<ParsedTle>> {
  const live = await probeCelestrak();

  if (live) {
    // El sondeo ya cacheó el TLE de la ISS.
    if (noradId === '25544') {
      const cached = await fetchText(celestrakTleUrl('25544'), {
        cacheKey: 'celestrak:probe',
        timeoutMs: CELESTRAK_TIMEOUT_MS,
      });
      if (cached.status === 'ok') {
        const parsed = parseTleText(cached.data, 'celestrak');
        if (parsed) {
          return { status: 'ok', fromCache: cached.fromCache, data: parsed };
        }
      }
    } else {
      const result = await fetchText(celestrakTleUrl(noradId), {
        cacheKey: `celestrak:${noradId}`,
        timeoutMs: CELESTRAK_TIMEOUT_MS,
      });
      if (result.status === 'ok') {
        const parsed = parseTleText(result.data, 'celestrak');
        if (parsed) {
          return { status: 'ok', fromCache: result.fromCache, data: parsed };
        }
      }
      // Un fallo puntual no tumba el circuito; caemos a respaldo de ese NORAD.
    }
  }

  // ISS: espejo ARISS cuando CelesTrak no responde (común en redes restringidas).
  if (noradId === '25544') {
    const ariss = await fetchText(arissIssTleUrl(), {
      cacheKey: 'ariss:iss',
      timeoutMs: ARISS_TIMEOUT_MS,
    });
    if (ariss.status === 'ok') {
      const parsed = parseTleText(ariss.data, 'ariss');
      if (parsed) {
        return { status: 'ok', fromCache: ariss.fromCache, data: parsed };
      }
    }
  }

  const fallback = fromFallback(noradId);
  if (fallback) return fallback;

  return {
    status: 'error',
    message: 'CelesTrak no alcanzable y no hay copia local de TLE.',
    fromCache: false,
  };
}

export function positionAt(satrec: satellite.SatRec, date: Date): SatPosition | null {
  const pv = satellite.propagate(satrec, date);
  const position = asEciVec(pv.position);
  const velocity = asEciVec(pv.velocity);
  if (!position || !velocity) return null;
  const gd = satellite.eciToGeodetic(position, satellite.gstime(date));
  const speedKmS = Math.sqrt(
    velocity.x * velocity.x + velocity.y * velocity.y + velocity.z * velocity.z,
  );
  return {
    lat: satellite.degreesLat(gd.latitude),
    lon: satellite.degreesLong(gd.longitude),
    altitudeKm: gd.height,
    speedKmS,
  };
}

export function groundTrack(
  satrec: satellite.SatRec,
  now = new Date(),
  samplesPerOrbit = 180,
): Array<[number, number]> {
  const periodMin = (2 * Math.PI) / satrec.no;
  const pts: Array<[number, number]> = [];
  for (let m = -periodMin * 0.5; m <= periodMin * 1.5; m += periodMin / samplesPerOrbit) {
    const p = positionAt(satrec, new Date(now.getTime() + m * 60_000));
    if (p) pts.push([p.lat, p.lon]);
  }
  return pts;
}

export function splitTrackAntDateline(
  pts: Array<[number, number]>,
): Array<Array<[number, number]>> {
  const segs: Array<Array<[number, number]>> = [[]];
  pts.forEach((p, i) => {
    if (i && Math.abs(p[1] - pts[i - 1][1]) > 180) segs.push([]);
    segs[segs.length - 1].push(p);
  });
  return segs.filter((seg) => seg.length > 1);
}

/** Próximas pasadas sobre un observador (elevación > minElevDeg) en las siguientes horas. */
export function predictPasses(
  satrec: satellite.SatRec,
  observer: { lat: number; lon: number; altitudeKm?: number },
  options?: { hours?: number; minElevDeg?: number; stepSec?: number },
): PassPrediction[] {
  const hours = options?.hours ?? 24;
  const minElevDeg = options?.minElevDeg ?? 10;
  const stepSec = options?.stepSec ?? 30;
  const gmstNow = new Date();
  const end = gmstNow.getTime() + hours * 3600_000;
  const observerGd = {
    latitude: satellite.degreesToRadians(observer.lat),
    longitude: satellite.degreesToRadians(observer.lon),
    height: observer.altitudeKm ?? 0,
  };

  const passes: PassPrediction[] = [];
  let inPass = false;
  let aos: Date | null = null;
  let maxEl = -Infinity;
  let maxDate: Date | null = null;

  for (let t = gmstNow.getTime(); t <= end; t += stepSec * 1000) {
    const date = new Date(t);
    const pv = satellite.propagate(satrec, date);
    const position = asEciVec(pv.position);
    if (!position) {
      if (inPass && aos && maxDate) {
        passes.push({
          aosUtc: aos.toISOString(),
          maxUtc: maxDate.toISOString(),
          losUtc: date.toISOString(),
          maxElevationDeg: maxEl,
        });
      }
      inPass = false;
      aos = null;
      maxEl = -Infinity;
      maxDate = null;
      continue;
    }

    const gmst = satellite.gstime(date);
    const ecf = satellite.eciToEcf(position, gmst);
    const look = satellite.ecfToLookAngles(observerGd, ecf);
    const elevDeg = (look.elevation * 180) / Math.PI;

    if (elevDeg >= minElevDeg) {
      if (!inPass) {
        inPass = true;
        aos = date;
        maxEl = elevDeg;
        maxDate = date;
      } else if (elevDeg > maxEl) {
        maxEl = elevDeg;
        maxDate = date;
      }
    } else if (inPass && aos && maxDate) {
      passes.push({
        aosUtc: aos.toISOString(),
        maxUtc: maxDate.toISOString(),
        losUtc: date.toISOString(),
        maxElevationDeg: maxEl,
      });
      inPass = false;
      aos = null;
      maxEl = -Infinity;
      maxDate = null;
      if (passes.length >= 8) break;
    }
  }

  return passes;
}
