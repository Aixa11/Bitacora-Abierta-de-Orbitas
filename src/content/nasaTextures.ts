/**
 * Texturas NASA con URL directa verificada (eoimages.gsfc.nasa.gov).
 * En el navegador, eoimages no envía CORS → en producción se sirven
 * copias locales generadas con `npm run textures`. En Vite (dev/preview)
 * se usan rutas proxy `/proxy/eoimages/...`.
 */

export type NasaTextureRemote = {
  id: 'earth-day' | 'earth-night' | 'earth-clouds';
  /** Ruta relativa al origen (proxy Vite) o URL absoluta NASA. */
  proxyPath: string;
  absoluteUrl: string;
  fuente: string;
};

export const NASA_TEXTURE_REMOTES: NasaTextureRemote[] = [
  {
    id: 'earth-day',
    proxyPath:
      '/proxy/eoimages/images/imagerecords/73000/73909/world.topo.bathy.200412.3x5400x2700.jpg',
    absoluteUrl:
      'https://eoimages.gsfc.nasa.gov/images/imagerecords/73000/73909/world.topo.bathy.200412.3x5400x2700.jpg',
    fuente:
      'NASA Visible Earth · Blue Marble Next Generation (dic 2004) · https://visibleearth.nasa.gov/images/73909',
  },
  {
    id: 'earth-night',
    proxyPath:
      '/proxy/eoimages/images/imagerecords/79000/79765/dnb_land_ocean_ice.2012.3600x1800.jpg',
    absoluteUrl:
      'https://eoimages.gsfc.nasa.gov/images/imagerecords/79000/79765/dnb_land_ocean_ice.2012.3600x1800.jpg',
    fuente:
      'NASA Earth Observatory / Black Marble · Earth at Night 2012 · https://visibleearth.nasa.gov/images/79765',
  },
  {
    id: 'earth-clouds',
    proxyPath: '/proxy/eoimages/images/imagerecords/57000/57747/cloud_combined_2048.jpg',
    absoluteUrl:
      'https://eoimages.gsfc.nasa.gov/images/imagerecords/57000/57747/cloud_combined_2048.jpg',
    fuente:
      'NASA Visible Earth · Blue Marble clouds · https://visibleearth.nasa.gov/images/57747',
  },
];

export const NASA_TEXTURE_COLECCION =
  'https://visibleearth.nasa.gov/collection/1484/blue-marble';
