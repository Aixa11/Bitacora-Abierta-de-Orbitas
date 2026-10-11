import { describe, expect, it } from 'vitest';
import { subsolarPoint, sunDirectionEcef } from './subsolar';

describe('subsolarPoint', () => {
  it('al mediodía UTC el subsolar está cerca del meridiano de Greenwich', () => {
    const point = subsolarPoint(new Date(Date.UTC(2026, 2, 20, 12, 0, 0)));
    expect(point.longitudeDeg).toBeGreaterThan(-5);
    expect(point.longitudeDeg).toBeLessThan(5);
  });

  it('a las 18:00 UTC el subsolar se acerca a −90°', () => {
    const point = subsolarPoint(new Date(Date.UTC(2026, 5, 21, 18, 0, 0)));
    expect(point.longitudeDeg).toBeGreaterThan(-100);
    expect(point.longitudeDeg).toBeLessThan(-80);
  });

  it('devuelve un vector solar unitario', () => {
    const [x, y, z] = sunDirectionEcef(new Date(Date.UTC(2026, 0, 1, 0, 0, 0)));
    const len = Math.hypot(x, y, z);
    expect(len).toBeCloseTo(1, 5);
  });
});
