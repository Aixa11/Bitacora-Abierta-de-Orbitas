import { EARTH_RADIUS_EQUATORIAL_KM, MU_EARTH_KM3_S2 } from './constants';

export type KeplerInputs = {
  altitudeKm: number;
  inclinationDeg: number;
  eccentricity: number;
};

export type KeplerOutputs = {
  semiMajorAxisKm: number;
  periodMin: number;
  velocityKmS: number;
  orbitsPerDay: number;
};

/**
 * Modelo educativo circular: a = R⊕ + h.
 * T = 2π√(a³/μ), v = √(μ/a).
 * La excentricidad se expone en la UI (p. ej. Molniya) pero no altera estas fórmulas.
 */
export function computeKepler(input: KeplerInputs): KeplerOutputs {
  const altitudeKm = clamp(input.altitudeKm, 200, 35_786);
  const semiMajorAxisKm = EARTH_RADIUS_EQUATORIAL_KM + altitudeKm;
  const periodSec = 2 * Math.PI * Math.sqrt((semiMajorAxisKm ** 3) / MU_EARTH_KM3_S2);
  const periodMin = periodSec / 60;
  const velocityKmS = Math.sqrt(MU_EARTH_KM3_S2 / semiMajorAxisKm);
  const orbitsPerDay = (24 * 60) / periodMin;

  return {
    semiMajorAxisKm,
    periodMin,
    velocityKmS,
    orbitsPerDay,
  };
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export type KeplerPresetId = 'leo' | 'sso' | 'meo' | 'geo' | 'molniya' | 'iss';

export type KeplerPreset = {
  id: KeplerPresetId;
  label: string;
  altitudeKm: number;
  inclinationDeg: number;
  eccentricity: number;
  nota: string;
};

/** Preajustes educativos (órdenes de magnitud). No sustituyen efemérides. */
export const KEPLER_PRESETS: KeplerPreset[] = [
  {
    id: 'leo',
    label: 'LEO',
    altitudeKm: 550,
    inclinationDeg: 53,
    eccentricity: 0,
    nota: 'Órbita baja típica de observación y constelaciones.',
  },
  {
    id: 'sso',
    label: 'SSO',
    altitudeKm: 705,
    inclinationDeg: 98.2,
    eccentricity: 0,
    nota: 'Inclinación heliosíncrona aproximada (educativa).',
  },
  {
    id: 'meo',
    label: 'MEO',
    altitudeKm: 20_200,
    inclinationDeg: 55,
    eccentricity: 0,
    nota: 'Altitud típica de GNSS (orden de magnitud).',
  },
  {
    id: 'geo',
    label: 'GEO',
    altitudeKm: 35_786,
    inclinationDeg: 0,
    eccentricity: 0,
    nota: 'Altitud geoestacionaria de referencia.',
  },
  {
    id: 'molniya',
    label: 'Molniya',
    altitudeKm: 20_000,
    inclinationDeg: 63.4,
    eccentricity: 0.74,
    nota: 'Excentricidad e inclinación críticas aproximadas; el período mostrado usa a = R+h.',
  },
  {
    id: 'iss',
    label: 'ISS',
    altitudeKm: 420,
    inclinationDeg: 51.6,
    eccentricity: 0,
    nota: 'Valores aproximados de la ISS (varían con el tiempo).',
  },
];
