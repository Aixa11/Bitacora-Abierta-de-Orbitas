/**
 * NORAD IDs tomados del prototipo reference/index.html (no inventar IDs).
 * TODO: ampliar con Landsat 8, Sentinel-1/2B, Aqua, NOAA-20, SAOCOM 1B, NISAR
 * solo tras verificar el CATNR en CelesTrak.
 */
export type LabSatellite = {
  noradId: string;
  label: string;
  agency: string;
};

export const LAB_SATELLITES: LabSatellite[] = [
  { noradId: '25544', label: 'ISS (Estación Espacial)', agency: 'Multilateral' },
  { noradId: '49260', label: 'Landsat 9', agency: 'NASA/USGS' },
  { noradId: '40697', label: 'Sentinel-2A', agency: 'ESA' },
  { noradId: '43641', label: 'SAOCOM 1A', agency: 'CONAE' },
  { noradId: '25994', label: 'Terra', agency: 'NASA' },
  { noradId: '37849', label: 'Suomi NPP', agency: 'NASA/NOAA' },
];
