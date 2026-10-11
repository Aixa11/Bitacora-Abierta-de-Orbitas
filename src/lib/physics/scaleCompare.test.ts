import { describe, expect, it } from 'vitest';
import { MOON_DISTANCE_KM } from './constants';
import {
  SCALE_BALL_DIAMETER_CM,
  SCALE_GEO_ALTITUDE_KM,
  SCALE_ISS_ALTITUDE_KM,
  SCALE_MOON_ALTITUDE_KM,
  scaleOrbitalHeight,
} from './scaleCompare';

describe('scaleOrbitalHeight', () => {
  it('coloca la ISS a ~1 cm sobre una pelota de 30 cm', () => {
    const result = scaleOrbitalHeight({
      earthBallDiameterCm: SCALE_BALL_DIAMETER_CM,
      altitudeKm: SCALE_ISS_ALTITUDE_KM,
    });
    expect(result.heightAboveSurfaceCm).toBeGreaterThan(0.8);
    expect(result.heightAboveSurfaceCm).toBeLessThan(1.2);
  });

  it('coloca GEO del orden de ~85 cm sobre la misma pelota', () => {
    const result = scaleOrbitalHeight({
      earthBallDiameterCm: SCALE_BALL_DIAMETER_CM,
      altitudeKm: SCALE_GEO_ALTITUDE_KM,
    });
    expect(result.heightAboveSurfaceCm).toBeGreaterThan(80);
    expect(result.heightAboveSurfaceCm).toBeLessThan(90);
  });

  it('deriva la Luna desde la distancia media menos radio WGS84', () => {
    expect(SCALE_MOON_ALTITUDE_KM).toBe(MOON_DISTANCE_KM - 6378.137);
    const result = scaleOrbitalHeight({
      earthBallDiameterCm: SCALE_BALL_DIAMETER_CM,
      altitudeKm: SCALE_MOON_ALTITUDE_KM,
    });
    // ~9 m sobre la pelota de 30 cm
    expect(result.heightAboveSurfaceCm).toBeGreaterThan(800);
    expect(result.heightAboveSurfaceCm).toBeLessThan(1000);
  });
});

