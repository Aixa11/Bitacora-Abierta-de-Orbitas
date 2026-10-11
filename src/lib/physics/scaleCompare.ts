import { EARTH_RADIUS_EQUATORIAL_KM } from './constants';

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
