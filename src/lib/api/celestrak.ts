import * as satellite from 'satellite.js';
import { fetchText, type ApiResult } from './client';

export function celestrakTleUrl(noradId: string): string {
  return `https://celestrak.org/NORAD/elements/gp.php?CATNR=${noradId}&FORMAT=tle`;
}

export type ParsedTle = {
  name: string;
  line1: string;
  line2: string;
  satrec: satellite.SatRec;
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

export async function fetchTle(noradId: string): Promise<ApiResult<ParsedTle>> {
  const url = celestrakTleUrl(noradId);
  const result = await fetchText(url, { cacheKey: `celestrak:${noradId}` });
  if (result.status === 'error') return result;

  const lines = result.data
    .trim()
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length < 3) {
    return {
      status: 'error',
      message: 'CelesTrak devolvió un TLE incompleto.',
      fromCache: result.fromCache,
    };
  }

  const satrec = satellite.twoline2satrec(lines[1], lines[2]);
  return {
    status: 'ok',
    fromCache: result.fromCache,
    data: { name: lines[0], line1: lines[1], line2: lines[2], satrec },
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
