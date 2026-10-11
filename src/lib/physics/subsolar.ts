/**
 * Punto subsolar aproximado (lat/lon) para iluminar el terminador.
 * Modelo simplificado educativo (no efemérides oficiales).
 */

export type SubsolarPoint = {
  latitudeDeg: number;
  longitudeDeg: number;
};

/** Declination aproximada del Sol (grados) para el día del año. */
function solarDeclinationDeg(dayOfYear: number): number {
  return -23.44 * Math.cos(((2 * Math.PI) / 365) * (dayOfYear + 10));
}

function dayOfYearUtc(date: Date): number {
  const start = Date.UTC(date.getUTCFullYear(), 0, 0);
  const now = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
  return (now - start) / 86_400_000;
}

/**
 * Longitud del subsolar ≈ 15° × (12 − hora UTC).
 * Latitud ≈ declinación solar del día.
 */
export function subsolarPoint(date: Date): SubsolarPoint {
  const hours =
    date.getUTCHours() + date.getUTCMinutes() / 60 + date.getUTCSeconds() / 3600;
  const longitudeDeg = ((12 - hours) * 15 + 540) % 360 - 180;
  const latitudeDeg = solarDeclinationDeg(dayOfYearUtc(date));
  return { latitudeDeg, longitudeDeg };
}

/** Dirección del Sol en coordenadas ECEF (Y polar), normalizada. */
export function sunDirectionEcef(date: Date): [number, number, number] {
  const { latitudeDeg, longitudeDeg } = subsolarPoint(date);
  const lat = (latitudeDeg * Math.PI) / 180;
  const lon = (longitudeDeg * Math.PI) / 180;
  const x = Math.cos(lat) * Math.cos(lon);
  const z = Math.cos(lat) * Math.sin(lon);
  const y = Math.sin(lat);
  return [x, y, z];
}
