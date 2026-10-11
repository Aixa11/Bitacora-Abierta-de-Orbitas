import type { ThemeMode } from '../../store/preferences';

/**
 * Basemap raster sin API key.
 * CARTO (basemaps.cartocdn.com) exige clave desde sept. 2026 y muestra
 * "API KEY REQUIRED"; por eso usamos Esri World Gray Canvas (público).
 */
export function basemapTileUrl(theme: ThemeMode): string {
  if (theme === 'dark') {
    return 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}';
  }
  return 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}';
}

export const BASEMAP_ATTRIBUTION =
  'Basemap © Esri · Datos © OpenStreetMap contributors · Mosaicos NASA GIBS';
