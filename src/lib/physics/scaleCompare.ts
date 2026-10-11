import {
  EARTH_RADIUS_EQUATORIAL_KM,
  MOON_DISTANCE_FUENTE,
  MOON_DISTANCE_KM,
  WGS84_FUENTE,
} from './constants';

export type ScaleCompareInput = {
  /** Diámetro de la “pelota Tierra” en cm. */
  earthBallDiameterCm: number;
  /** Altitud orbital sobre la superficie (km). */
  altitudeKm: number;
};

export type ScaleCompareResult = {
  /** Distancia desde la superficie de la pelota hasta el objeto (cm). */
  heightAboveSurfaceCm: number;
  /** Distancia desde el centro de la pelota (cm). */
  distanceFromCenterCm: number;
};

/** Escala lineal: diámetro Tierra real → diámetro de la pelota. */
export function scaleOrbitalHeight(input: ScaleCompareInput): ScaleCompareResult {
  const earthDiameterKm = EARTH_RADIUS_EQUATORIAL_KM * 2;
  const ballRadiusCm = input.earthBallDiameterCm / 2;
  const heightAboveSurfaceCm = (input.altitudeKm / EARTH_RADIUS_EQUATORIAL_KM) * ballRadiusCm;
  const distanceFromCenterCm =
    ((EARTH_RADIUS_EQUATORIAL_KM + input.altitudeKm) / earthDiameterKm) *
    input.earthBallDiameterCm;
  return { heightAboveSurfaceCm, distanceFromCenterCm };
}

export const SCALE_BALL_DIAMETER_CM = 30;
export const SCALE_ISS_ALTITUDE_KM = 420;
export const SCALE_GEO_ALTITUDE_KM = 35_786;
/** Distancia media Tierra–Luna menos radio ecuatorial ≈ altitud sobre la superficie. */
export const SCALE_MOON_ALTITUDE_KM = MOON_DISTANCE_KM - EARTH_RADIUS_EQUATORIAL_KM;

export const SCALE_COMPARE_FUENTE = `${WGS84_FUENTE} ${MOON_DISTANCE_FUENTE}`;

export type ScaleTargetId = 'iss' | 'geo' | 'luna';

export type ScaleTarget = {
  id: ScaleTargetId;
  label: string;
  /** Altitud sobre la superficie (km), verificada / derivada de constants. */
  altitudeKm: number;
  color: string;
  /** Frase corta para anclar la intuición (sin cifras inventadas). */
  intuicion: string;
};

export const SCALE_TARGETS: ScaleTarget[] = [
  {
    id: 'iss',
    label: 'ISS',
    altitudeKm: SCALE_ISS_ALTITUDE_KM,
    color: '#5FE0FF',
    intuicion:
      'En kilómetros suena lejísimo; a escala de pelota, casi toca la Tierra. La órbita baja es una capa finísima.',
  },
  {
    id: 'geo',
    label: 'GEO',
    altitudeKm: SCALE_GEO_ALTITUDE_KM,
    color: '#FF8F6B',
    intuicion:
      'Aquí sí hay “aire” entre la pelota y el satélite. Por eso GEO no es lo mismo que la ISS: está mucho más afuera.',
  },
  {
    id: 'luna',
    label: 'Luna',
    altitudeKm: SCALE_MOON_ALTITUDE_KM,
    color: '#BAF57D',
    intuicion:
      'Ni siquiera entra en el dibujo. Sirve para ver que la Luna está en otra categoría de distancia.',
  },
];
