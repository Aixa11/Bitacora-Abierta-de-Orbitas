import type { SensorKind } from './sensors';

export type SensorTopic = {
  id: string;
  titulo: string;
  sensorLabel: string;
  kind: SensorKind;
  why: string;
  toolNames: string[];
  gibsLayerId: string | null;
  noradId: string | null;
};

/** Temas del selector del reference (sin inventar capas ni NORAD). */
export const SENSOR_TOPICS: SensorTopic[] = [
  {
    id: 'incendios',
    titulo: 'Incendios',
    sensorLabel: 'Térmico + óptico (SWIR)',
    kind: 'termico',
    why: 'Los sensores térmicos de MODIS y VIIRS detectan focos de calor varias veces al día. Las bandas SWIR de Landsat y Sentinel-2 muestran la cicatriz quemada después.',
    toolNames: ['NASA FIRMS (incendios activos)', 'NASA Worldview', 'Harmonized Landsat Sentinel-2 (HLS)'],
    gibsLayerId: 'MODIS_Terra_CorrectedReflectance_Bands721',
    noradId: null,
  },
  {
    id: 'inundaciones',
    titulo: 'Inundaciones',
    sensorLabel: 'Radar SAR',
    kind: 'sar',
    why: 'El agua calma refleja el radar como un espejo y se ve oscura en la imagen. El SAR atraviesa las nubes de la tormenta, algo que el óptico no puede.',
    toolNames: [
      'ASF Data Search (Vertex)',
      'OPERA (agua, cambios y deformación)',
      'NISAR (radar banda L y S)',
      'Copernicus Browser',
    ],
    gibsLayerId: 'IMERG_Precipitation_Rate',
    noradId: null,
  },
  {
    id: 'vegetacion',
    titulo: 'Vegetación y agro',
    sensorLabel: 'Óptico multiespectral',
    kind: 'optico',
    why: 'Las plantas sanas reflejan mucho infrarrojo cercano. Índices como el NDVI resumen su vigor y su evolución en el tiempo.',
    toolNames: [
      'Harmonized Landsat Sentinel-2 (HLS)',
      'AppEEARS',
      'ESA WorldCover',
      'SAOCOM Catalog',
    ],
    gibsLayerId: 'MODIS_Terra_NDVI_8Day',
    noradId: null,
  },
  {
    id: 'oceanos',
    titulo: 'Océanos y pesca',
    sensorLabel: 'Térmico, color del océano y SAR',
    kind: 'termico',
    why: 'La temperatura del mar y la clorofila muestran dónde hay vida. El SAR detecta buques, incluso los que apagan su AIS (“barcos oscuros”).',
    toolNames: ['Copernicus Marine', 'Global Fishing Watch API', 'ASF Data Search (Vertex)'],
    gibsLayerId: 'GHRSST_L4_MUR_Sea_Surface_Temperature',
    noradId: null,
  },
  {
    id: 'aire',
    titulo: 'Calidad del aire',
    sensorLabel: 'Atmosférico',
    kind: 'atmosferico',
    why: 'Sensores como MODIS (aerosoles) y Sentinel-5P (gases) miden lo que respiramos. Las estaciones en tierra sirven para validar.',
    toolNames: ['Giovanni', 'Copernicus Browser', 'OpenAQ'],
    gibsLayerId: 'MODIS_Terra_Aerosol',
    noradId: null,
  },
  {
    id: 'ciudades',
    titulo: 'Ciudades y luces',
    sensorLabel: 'Óptico nocturno (VIIRS DNB)',
    kind: 'optico',
    why: 'Las luces nocturnas revelan urbanización, cortes de energía y actividad económica. Combinadas con población, muestran quién está expuesto.',
    toolNames: ['NASA Worldview', 'WorldPop', 'OpenStreetMap · Overpass Turbo'],
    gibsLayerId: 'VIIRS_Black_Marble',
    noradId: null,
  },
  {
    id: 'terremotos',
    titulo: 'Terremotos y deformación',
    sensorLabel: 'Radar InSAR',
    kind: 'sar',
    why: 'Comparando la fase de dos pasadas de radar se miden movimientos del terreno de pocos centímetros, o incluso milímetros.',
    toolNames: [
      'HyP3',
      'MintPy',
      'OPERA (agua, cambios y deformación)',
      'NISAR (radar banda L y S)',
    ],
    gibsLayerId: 'MODIS_Terra_CorrectedReflectance_TrueColor',
    noradId: null,
  },
  {
    id: 'clima',
    titulo: 'Clima y energía',
    sensorLabel: 'Modelos + satélites',
    kind: 'atmosferico',
    why: 'Radiación solar, viento y temperatura históricos para dimensionar paneles, cultivos o riesgos climáticos.',
    toolNames: ['NASA POWER', 'Copernicus Climate Data Store (ERA5)', 'Open-Meteo'],
    gibsLayerId: 'MODIS_Terra_Land_Surface_Temp_Day',
    noradId: null,
  },
  {
    id: 'orbitas',
    titulo: 'Órbitas y espacio',
    sensorLabel: 'Elementos orbitales y efemérides',
    kind: 'optico',
    why: 'Para saber dónde está un satélite, cuándo pasa sobre tu ciudad o cómo se mueve un asteroide.',
    toolNames: [
      'CelesTrak',
      'Skyfield',
      'JPL Horizons API',
      'api.nasa.gov (APOD, EPIC, DONKI, NeoWs)',
    ],
    gibsLayerId: null,
    noradId: '25544',
  },
];
