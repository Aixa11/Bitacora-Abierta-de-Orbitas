export type SensorKind = 'optico' | 'sar' | 'termico' | 'atmosferico';

export type SensorRef = {
  id: string;
  nombre: string;
  kind: SensorKind;
  mision: string;
  swathKm: number;
  resolucionM: number | null;
  funcionaDeNoche: boolean;
  atraviesaNubes: boolean;
  geometria: 'nadir' | 'lateral';
  /** URL oficial que respalda el valor de swath / ficha de misión. */
  fuente: string;
  bitacoraToolId: string | null;
  gibsLayerId: string | null;
};

/**
 * Valores de barrido del prompt, con URL de ficha para revisión humana.
 * Si una ficha cambia, actualiza swathKm y fuente.
 */
export const SENSORS: SensorRef[] = [
  {
    id: 'landsat-oli',
    nombre: 'Landsat 8/9 OLI',
    kind: 'optico',
    mision: 'Landsat 8/9',
    swathKm: 185,
    resolucionM: 30,
    funcionaDeNoche: false,
    atraviesaNubes: false,
    geometria: 'nadir',
    fuente: 'https://www.usgs.gov/landsat-missions/landsat-8',
    bitacoraToolId: 'harmonized-landsat-sentinel-2-hls',
    gibsLayerId: 'MODIS_Terra_CorrectedReflectance_TrueColor',
  },
  {
    id: 'sentinel-2-msi',
    nombre: 'Sentinel-2 MSI',
    kind: 'optico',
    mision: 'Sentinel-2',
    swathKm: 290,
    resolucionM: 10,
    funcionaDeNoche: false,
    atraviesaNubes: false,
    geometria: 'nadir',
    fuente: 'https://sentinels.copernicus.eu/web/sentinel/missions/sentinel-2',
    bitacoraToolId: 'copernicus-browser',
    gibsLayerId: 'MODIS_Terra_NDVI_8Day',
  },
  {
    id: 'sentinel-1-iw',
    nombre: 'Sentinel-1 IW',
    kind: 'sar',
    mision: 'Sentinel-1',
    swathKm: 250,
    resolucionM: 10,
    funcionaDeNoche: true,
    atraviesaNubes: true,
    geometria: 'lateral',
    fuente: 'https://sentinels.copernicus.eu/web/sentinel/user-guides/sentinel-1-sar/acquisition-modes/interferometric-wide-swath',
    bitacoraToolId: 'asf-data-search-vertex',
    gibsLayerId: 'IMERG_Precipitation_Rate',
  },
  {
    id: 'modis',
    nombre: 'MODIS (Terra/Aqua)',
    kind: 'optico',
    mision: 'Terra / Aqua',
    swathKm: 2330,
    resolucionM: 250,
    funcionaDeNoche: false,
    atraviesaNubes: false,
    geometria: 'nadir',
    fuente: 'https://modis.gsfc.nasa.gov/about/specifications.php',
    bitacoraToolId: 'nasa-worldview',
    gibsLayerId: 'MODIS_Terra_CorrectedReflectance_TrueColor',
  },
  {
    id: 'viirs',
    nombre: 'VIIRS',
    kind: 'termico',
    mision: 'Suomi NPP / NOAA-20',
    swathKm: 3000,
    resolucionM: 375,
    funcionaDeNoche: true,
    atraviesaNubes: false,
    geometria: 'nadir',
    fuente: 'https://www.earthdata.nasa.gov/sensors/viirs',
    bitacoraToolId: 'nasa-firms-incendios-activos',
    gibsLayerId: 'MODIS_Terra_CorrectedReflectance_Bands721',
  },
  {
    id: 'nisar',
    nombre: 'NISAR',
    kind: 'sar',
    mision: 'NISAR',
    swathKm: 240,
    resolucionM: null,
    funcionaDeNoche: true,
    atraviesaNubes: true,
    geometria: 'lateral',
    fuente: 'https://nisar.jpl.nasa.gov/',
    bitacoraToolId: 'nisar-radar-banda-l-y-s',
    gibsLayerId: 'MODIS_Terra_CorrectedReflectance_TrueColor',
  },
  {
    id: 'modis-aerosol',
    nombre: 'MODIS Aerosol',
    kind: 'atmosferico',
    mision: 'Terra / Aqua',
    swathKm: 2330,
    resolucionM: 10000,
    funcionaDeNoche: false,
    atraviesaNubes: false,
    geometria: 'nadir',
    fuente: 'https://modis.gsfc.nasa.gov/data/dataprod/mod04.php',
    bitacoraToolId: 'giovanni',
    gibsLayerId: 'MODIS_Terra_Aerosol',
  },
];
