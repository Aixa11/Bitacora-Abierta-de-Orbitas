import { fetchJson, type ApiResult } from './client';

export const EONET_URL = 'https://eonet.gsfc.nasa.gov/api/v3/events?status=open&limit=200';

export type EonetCategory = {
  id: string;
  title: string;
};

export type EonetSource = {
  id: string;
  url: string;
};

export type EonetGeometry = {
  type: string;
  date?: string;
  coordinates: number[] | number[][] | number[][][];
};

export type EonetEvent = {
  id: string;
  title: string;
  categories: EonetCategory[];
  sources?: EonetSource[];
  geometry: EonetGeometry[];
};

export type EonetResponse = {
  events: EonetEvent[];
};

export const EONET_CATEGORY_LABELS: Record<string, string> = {
  wildfires: 'Incendios',
  severeStorms: 'Tormentas',
  volcanoes: 'Volcanes',
  seaLakeIce: 'Hielo marino y lagos',
  floods: 'Inundaciones',
  earthquakes: 'Sismos',
  drought: 'Sequía',
  dustHaze: 'Polvo y bruma',
  landslides: 'Deslizamientos',
  snow: 'Nieve',
  tempExtremes: 'Temperaturas extremas',
  waterColor: 'Color del agua',
  manmade: 'Origen humano',
};

export const EONET_CATEGORY_COLORS: Record<string, string> = {
  wildfires: '#ff5b3a',
  severeStorms: '#8f54ff',
  volcanoes: '#e2366b',
  seaLakeIce: '#3fc6ff',
  floods: '#2f6bff',
  earthquakes: '#b07a2a',
  drought: '#d8a200',
  dustHaze: '#a88a6a',
  landslides: '#7a5c3c',
  snow: '#9ad8ff',
  tempExtremes: '#ff8f6b',
  waterColor: '#2bb39a',
  manmade: '#666666',
};

/** Capa GIBS sugerida al centrar un evento (heurística educativa). */
export const EONET_RECOMMENDED_LAYER: Record<string, string> = {
  wildfires: 'MODIS_Terra_CorrectedReflectance_Bands721',
  severeStorms: 'IMERG_Precipitation_Rate',
  volcanoes: 'MODIS_Terra_CorrectedReflectance_Bands721',
  floods: 'MODIS_Terra_CorrectedReflectance_TrueColor',
  seaLakeIce: 'VIIRS_SNPP_CorrectedReflectance_TrueColor',
  drought: 'MODIS_Terra_NDVI_8Day',
  dustHaze: 'MODIS_Terra_Aerosol',
  tempExtremes: 'MODIS_Terra_Land_Surface_Temp_Day',
  snow: 'VIIRS_SNPP_CorrectedReflectance_TrueColor',
  waterColor: 'MODIS_Terra_CorrectedReflectance_TrueColor',
  earthquakes: 'VIIRS_SNPP_CorrectedReflectance_TrueColor',
  landslides: 'MODIS_Terra_CorrectedReflectance_TrueColor',
  manmade: 'VIIRS_Black_Marble',
};

export type MappedEonetEvent = {
  id: string;
  title: string;
  categoryId: string;
  categoryLabel: string;
  lat: number;
  lon: number;
  date: string;
  source: EonetSource | null;
  recommendedLayerId: string;
};

export function mapEonetEvents(data: EonetResponse): MappedEonetEvent[] {
  const mapped: MappedEonetEvent[] = [];
  for (const ev of data.events) {
    const g = ev.geometry[ev.geometry.length - 1];
    if (!g) continue;
    const coords = extractLatLon(g);
    if (!coords) continue;
    const categoryId = ev.categories[0]?.id || 'manmade';
    mapped.push({
      id: ev.id,
      title: ev.title,
      categoryId,
      categoryLabel: EONET_CATEGORY_LABELS[categoryId] || ev.categories[0]?.title || categoryId,
      lat: coords.lat,
      lon: coords.lon,
      date: (g.date || '').slice(0, 10),
      source: ev.sources?.[0] ?? null,
      recommendedLayerId:
        EONET_RECOMMENDED_LAYER[categoryId] ?? 'VIIRS_SNPP_CorrectedReflectance_TrueColor',
    });
  }
  return mapped;
}

function extractLatLon(g: EonetGeometry): { lat: number; lon: number } | null {
  if (g.type === 'Point' && Array.isArray(g.coordinates) && typeof g.coordinates[0] === 'number') {
    const [lon, lat] = g.coordinates as number[];
    return { lat, lon };
  }
  if (g.type === 'Polygon') {
    const ring = (g.coordinates as number[][][])[0];
    if (!ring?.length) return null;
    const lon = ring.reduce((sum, p) => sum + p[0], 0) / ring.length;
    const lat = ring.reduce((sum, p) => sum + p[1], 0) / ring.length;
    return { lat, lon };
  }
  return null;
}

export function fetchEonetEvents(): Promise<ApiResult<EonetResponse>> {
  return fetchJson<EonetResponse>(EONET_URL, { cacheKey: 'eonet:open:200' });
}
