/**
 * TLE de respaldo para el hero 3D y el laboratorio cuando CelesTrak no responde.
 * No inventar líneas: solo copias obtenidas de CelesTrak GP (FORMAT=tle).
 *
 * fuente: CelesTrak NORAD GP, https://celestrak.org/NORAD/elements/
 * época en las líneas (YYDDD): 26284 ≈ 2026-10-11 UTC
 * TODO: refrescar esta copia tras el hackatón si CelesTrak vuelve a ser alcanzable
 * desde la red de desarrollo habitual.
 */
export type TleFallback = {
  name: string;
  line1: string;
  line2: string;
  fuente: string;
};

export const TLE_FALLBACK_FUENTE =
  'CelesTrak NORAD GP (FORMAT=tle), copia local; época 26284 (2026-10-11 UTC). https://celestrak.org/NORAD/elements/';

export const TLE_FALLBACKS: Record<string, TleFallback> = {
  '25544': {
    name: 'ISS (ZARYA)',
    line1: '1 25544U 98067A   26284.17638745  .00009430  00000+0  18014-3 0  9995',
    line2: '2 25544  51.6312  86.0933 0006713 248.1316 111.8959 15.48821882589734',
    fuente: TLE_FALLBACK_FUENTE,
  },
  '49260': {
    name: 'LANDSAT 9',
    line1: '1 49260U 21088A   26284.17989403  .00000319  00000+0  80781-4 0  9993',
    line2: '2 49260  98.2169 352.8812 0001339  87.4652 272.6700 14.57110633267892',
    fuente: TLE_FALLBACK_FUENTE,
  },
  '40697': {
    name: 'SENTINEL-2A',
    line1: '1 40697U 15028A   26284.29856125  .00000007  00000+0  19239-4 0  9996',
    line2: '2 40697  98.5653 357.4564 0001071  92.2726 267.8579 14.30820814590330',
    fuente: TLE_FALLBACK_FUENTE,
  },
  '43641': {
    name: 'SAOCOM 1A',
    line1: '1 43641U 18076A   26284.25421904 -.00000308  00000+0 -32161-4 0  9998',
    line2: '2 43641  97.8877 109.3393 0001477  83.0634 277.0747 14.82156777433290',
    fuente: TLE_FALLBACK_FUENTE,
  },
  '25994': {
    name: 'TERRA',
    line1: '1 25994U 99068A   26284.30493164  .00000365  00000+0  83038-4 0  9992',
    line2: '2 25994  97.9323 329.1724 0001719 186.2654 273.4106 14.61174091426562',
    fuente: TLE_FALLBACK_FUENTE,
  },
  '37849': {
    name: 'SUOMI NPP',
    line1: '1 37849U 11061A   26284.21880353  .00000069  00000+0  53592-4 0  9994',
    line2: '2 37849  98.8050 224.3413 0002036  25.4861 334.6415 14.19537933774907',
    fuente: TLE_FALLBACK_FUENTE,
  },
};
