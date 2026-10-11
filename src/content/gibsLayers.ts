export type GibsLayer = {
  id: string;
  name: string;
  ext: 'jpg' | 'png';
  level: number;
  /** Si es true, suele usarse como imagen base (opacidad alta). */
  isImagery: boolean;
  fixedDate?: string;
  legend: string;
  geoint: string;
};

/**
 * Capas GIBS verificadas en el prompt (WMTS EPSG:3857).
 * Plantilla:
 * https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/{LAYER}/default/{YYYY-MM-DD}/GoogleMapsCompatible_Level{N}/{z}/{y}/{x}.{ext}
 */
export const GIBS_LAYERS: GibsLayer[] = [
  {
    id: 'MODIS_Terra_CorrectedReflectance_TrueColor',
    name: 'Color verdadero · MODIS Terra',
    ext: 'jpg',
    level: 9,
    isImagery: true,
    legend: 'RGB natural (bandas visibles).',
    geoint:
      'Sirve para reconocer nubes, costa, nieve y plumas de humo a ojo. No cuantifica vegetación ni temperatura.',
  },
  {
    id: 'VIIRS_SNPP_CorrectedReflectance_TrueColor',
    name: 'Color verdadero · VIIRS Suomi NPP',
    ext: 'jpg',
    level: 9,
    isImagery: true,
    legend: 'RGB natural de VIIRS.',
    geoint:
      'Resolución temporal diaria con swath amplio. Ideal para un “antes/después” rápido de un evento.',
  },
  {
    id: 'MODIS_Terra_CorrectedReflectance_Bands721',
    name: 'Falso color 7-2-1 · fuego y agua',
    ext: 'jpg',
    level: 9,
    isImagery: true,
    legend: 'SWIR–NIR–Rojo en RGB.',
    geoint:
      'Resalta quemas activas y distingue agua de tierra mejor que el color verdadero. Útil en incendios.',
  },
  {
    id: 'MODIS_Terra_NDVI_8Day',
    name: 'Vegetación NDVI · 8 días',
    ext: 'png',
    level: 9,
    isImagery: false,
    legend: 'NDVI: valores altos ≈ vegetación vigorosa.',
    geoint:
      'Compuestos de 8 días. Compara salud de la vegetación; ojo con nubes residuales y estación del año.',
  },
  {
    id: 'MODIS_Terra_Land_Surface_Temp_Day',
    name: 'Temperatura de superficie · día',
    ext: 'png',
    level: 7,
    isImagery: false,
    legend: 'Temperatura de la superficie terrestre (día).',
    geoint:
      'Útil para islas de calor o anomalías térmicas. No es temperatura del aire a 2 m.',
  },
  {
    id: 'GHRSST_L4_MUR_Sea_Surface_Temperature',
    name: 'Temperatura del mar · GHRSST',
    ext: 'png',
    level: 7,
    isImagery: false,
    legend: 'SST fusionada (producto L4).',
    geoint:
      'Temperatura de la superficie del mar. Buena para oceanografía operativa y olas de calor marinas.',
  },
  {
    id: 'IMERG_Precipitation_Rate',
    name: 'Lluvia · GPM IMERG',
    ext: 'png',
    level: 6,
    isImagery: false,
    legend: 'Tasa de precipitación.',
    geoint:
      'Muestra intensidad de lluvia. Combínala con eventos EONET de tormentas o inundaciones.',
  },
  {
    id: 'MODIS_Terra_Aerosol',
    name: 'Aerosoles · MODIS',
    ext: 'png',
    level: 6,
    isImagery: false,
    legend: 'Carga de aerosoles / profundidad óptica aproximada.',
    geoint:
      'Polvo, humo y bruma. Interpreta con cuidado cerca de nubes y superficies brillantes.',
  },
  {
    id: 'VIIRS_SNPP_DayNightBand_At_Sensor_Radiance',
    name: 'Banda día/noche · VIIRS',
    ext: 'png',
    level: 8,
    isImagery: false,
    legend: 'Radiancia en la banda día/noche.',
    geoint:
      'Luces, fuegos y nubes iluminadas por la Luna. Complementa Black Marble (que es un compuesto fijo).',
  },
  {
    id: 'VIIRS_Black_Marble',
    name: 'Luces nocturnas · Black Marble',
    ext: 'png',
    level: 8,
    isImagery: false,
    fixedDate: '2016-01-01',
    legend: 'Compuesto de luces nocturnas (fecha fija 2016-01-01).',
    geoint:
      'No es “hoy”: es un producto de referencia. Sirve para contraste urbano, no para eventos recientes.',
  },
];

export function gibsTileUrl(layer: GibsLayer, dateIso: string): string {
  const date = layer.fixedDate ?? dateIso;
  return `https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/${layer.id}/default/${date}/GoogleMapsCompatible_Level${layer.level}/{z}/{y}/{x}.${layer.ext}`;
}

export function defaultGibsDate(now = new Date()): string {
  const d = new Date(now.getTime() - 2 * 86_400_000);
  return d.toISOString().slice(0, 10);
}

export function maxGibsDate(now = new Date()): string {
  return new Date(now.getTime() - 86_400_000).toISOString().slice(0, 10);
}
