/**
 * Satélites del hero 3D.
 * Solo NORAD IDs verificados en reference/index.html.
 * TODO: añadir Landsat 8, Sentinel-1A/C, Sentinel-2B, Aqua, NOAA-20, SAOCOM 1B, NISAR
 * tras confirmar CATNR en CelesTrak.
 */
export type HeroSatellite = {
  noradId: string;
  nombre: string;
  agencia: string;
  sensorTipo: string;
  orbita: string;
  /** Ancho de barrido en km; null si no hay valor verificado en el seed. */
  swathKm: number | null;
  bitacoraToolId: string | null;
  gibsLayerId: string | null;
};

export const HERO_SATELLITES: HeroSatellite[] = [
  {
    noradId: '25544',
    nombre: 'ISS',
    agencia: 'Multilateral',
    sensorTipo: 'Observatorio / tripulada',
    orbita: 'LEO ~420 km, i ≈ 51,6°',
    swathKm: null,
    bitacoraToolId: 'celestrak',
    gibsLayerId: null,
  },
  {
    noradId: '49260',
    nombre: 'Landsat 9',
    agencia: 'NASA/USGS',
    sensorTipo: 'Óptico (OLI/TIRS)',
    orbita: 'SSO',
    swathKm: 185,
    bitacoraToolId: 'harmonized-landsat-sentinel-2-hls',
    gibsLayerId: 'MODIS_Terra_CorrectedReflectance_TrueColor',
  },
  {
    noradId: '40697',
    nombre: 'Sentinel-2A',
    agencia: 'ESA',
    sensorTipo: 'Óptico (MSI)',
    orbita: 'SSO',
    swathKm: 290,
    bitacoraToolId: 'copernicus-browser',
    gibsLayerId: 'MODIS_Terra_NDVI_8Day',
  },
  {
    noradId: '43641',
    nombre: 'SAOCOM 1A',
    agencia: 'CONAE',
    sensorTipo: 'Radar SAR (L)',
    orbita: 'SSO',
    swathKm: null,
    bitacoraToolId: 'saocom-catalog',
    gibsLayerId: null,
  },
  {
    noradId: '25994',
    nombre: 'Terra',
    agencia: 'NASA',
    sensorTipo: 'Óptico/térmico (MODIS)',
    orbita: 'SSO',
    swathKm: 2330,
    bitacoraToolId: 'nasa-worldview',
    gibsLayerId: 'MODIS_Terra_CorrectedReflectance_TrueColor',
  },
  {
    noradId: '37849',
    nombre: 'Suomi NPP',
    agencia: 'NASA/NOAA',
    sensorTipo: 'Óptico/térmico (VIIRS)',
    orbita: 'SSO',
    swathKm: 3000,
    bitacoraToolId: 'nasa-firms-incendios-activos',
    gibsLayerId: 'VIIRS_SNPP_CorrectedReflectance_TrueColor',
  },
];
