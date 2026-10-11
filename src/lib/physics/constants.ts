/**
 * Constantes físicas con fuente explícita.
 * Convención de escena 3D: 1 unidad = 1 km.
 */

/** Parámetro gravitacional estándar de la Tierra (μ). */
export const MU_EARTH_KM3_S2 = 398_600.4418;
export const MU_EARTH_FUENTE =
  'IERS Conventions / valor de referencia del prompt (μ = 398600,4418 km³/s²).';

/** Semieje ecuatorial WGS84. */
export const WGS84_A_KM = 6378.137;
/** Semieje polar WGS84. */
export const WGS84_B_KM = 6356.752;
export const WGS84_FUENTE =
  'WGS84: a = 6378.137 km, b = 6356.752 km (NIMA TR8350.2 / estándar geodésico).';

/** Alias educativo del radio ecuatorial. */
export const EARTH_RADIUS_EQUATORIAL_KM = WGS84_A_KM;
export const EARTH_RADIUS_FUENTE = WGS84_FUENTE;

/** Distancia media Tierra–Luna. */
export const MOON_DISTANCE_KM = 384_400;
export const MOON_DISTANCE_FUENTE =
  'Distancia media Tierra–Luna ≈ 384.400 km (valor de referencia astronómico habitual / prompt).';

/** Zoom mínimo: 500 km sobre la superficie (desde el centro ≈ a + 500). */
export const CAMERA_MIN_ALTITUDE_KM = 500;
/** Zoom máximo: distancia de la Luna. */
export const CAMERA_MAX_DISTANCE_KM = MOON_DISTANCE_KM;
