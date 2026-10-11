import { describe, expect, it } from 'vitest';
import { EARTH_RADIUS_EQUATORIAL_KM, MU_EARTH_KM3_S2 } from './constants';
import { computeKepler } from './kepler';

describe('computeKepler', () => {
  it('calcula periodo y velocidad con las fórmulas del prompt', () => {
    const altitudeKm = 400;
    const a = EARTH_RADIUS_EQUATORIAL_KM + altitudeKm;
    const expectedPeriodMin =
      (2 * Math.PI * Math.sqrt((a * a * a) / MU_EARTH_KM3_S2)) / 60;
    const expectedV = Math.sqrt(MU_EARTH_KM3_S2 / a);

    const out = computeKepler({
      altitudeKm,
      inclinationDeg: 51.6,
      eccentricity: 0,
    });

    expect(out.semiMajorAxisKm).toBeCloseTo(a, 6);
    expect(out.periodMin).toBeCloseTo(expectedPeriodMin, 6);
    expect(out.velocityKmS).toBeCloseTo(expectedV, 6);
    expect(out.orbitsPerDay).toBeCloseTo((24 * 60) / expectedPeriodMin, 6);
  });

  it('acota la altitud al rango 200–35786 km', () => {
    expect(computeKepler({ altitudeKm: 50, inclinationDeg: 0, eccentricity: 0 }).semiMajorAxisKm).toBe(
      EARTH_RADIUS_EQUATORIAL_KM + 200,
    );
    expect(
      computeKepler({ altitudeKm: 99_999, inclinationDeg: 0, eccentricity: 0 }).semiMajorAxisKm,
    ).toBe(EARTH_RADIUS_EQUATORIAL_KM + 35_786);
  });
});
