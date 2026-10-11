export type RutaPaso = {
  id: string;
  titulo: string;
  subtitulo: string;
  cuerpoHtml: string;
  herramientasIds: string[];
  errorComun: string;
  checklist: string[];
  codigo: string | null;
  enlaceInterno: { to: string; label: string } | null;
};

/** Ruta del dato en 8 pasos (contenido del reference, con ids de tools.json). */
export const RUTA_PASOS: RutaPaso[] = [
  {
    id: 'elige-desafio',
    titulo: 'Elige el desafío y lee sus recursos',
    subtitulo: 'Antes de abrir un mapa',
    cuerpoHtml:
      'Lee el enunciado completo (se publica el 28 de octubre) y abre la pestaña <strong>Resources</strong>: ahí están los datos de la NASA y de las agencias socias que el equipo pensó para ese problema. Anota qué se pide entregar y quién sería el usuario de tu solución.',
    herramientasIds: ['nasa-earthdata', 'nasa-open-data-portal', 'nasa-earth-observatory'],
    errorComun: 'Elegir primero un dataset “lindo” y después buscarle un problema.',
    checklist: [
      'Leí el enunciado oficial (o el resumen si aún no está completo)',
      'Anoté el tipo de entrega esperada',
      'Identifiqué un usuario potencial',
      'Revisé la pestaña Resources (cuando esté publicada)',
    ],
    codigo: null,
    enlaceInterno: { to: '/desafios', label: 'Ver los desafíos' },
  },
  {
    id: 'pregunta',
    titulo: 'Convierte el desafío en una pregunta',
    subtitulo: 'El ciclo de inteligencia empieza acá',
    cuerpoHtml:
      'Un buen proyecto GEOINT responde una pregunta concreta. Completa cuatro campos: <strong>qué</strong> quieres medir, <strong>dónde</strong> (un área de interés, o AOI), <strong>cuándo</strong> (un rango de fechas) y <strong>para quién</strong> (qué decisión ayuda a tomar).',
    herramientasIds: ['geoboundaries', 'natural-earth', 'openstreetmap-overpass-turbo'],
    errorComun: 'Áreas enormes o rangos de 20 años en un hackatón de 48 horas. Empieza chico.',
    checklist: [
      'Definí el QUÉ (variable o fenómeno)',
      'Delimité el DÓNDE (AOI o bbox)',
      'Fijé el CUÁNDO (rango de fechas realista)',
      'Escribí el PARA QUIÉN (decisión o aprendizaje)',
    ],
    codigo: `# Plantilla de pregunta GEOINT
QUÉ:        superficie inundada
DÓNDE:      bbox = (-79.95, -6.90, -79.70, -6.60)   # Chiclayo, Perú
CUÁNDO:     2026-01-01 / 2026-03-31
PARA QUIÉN: defensa civil local → priorizar barrios`,
    enlaceInterno: null,
  },
  {
    id: 'sensor',
    titulo: 'Elige el sensor adecuado',
    subtitulo: 'La pregunta elige el sensor',
    cuerpoHtml:
      'Los sensores <strong>ópticos</strong> ven como una cámara, pero no atraviesan nubes. El <strong>radar (SAR)</strong> ve de día, de noche y con nubes. Los <strong>térmicos</strong> detectan calor, y los <strong>atmosféricos</strong> miden gases y aerosoles. Mira también la resolución espacial (cuánto detalle) y la temporal (cada cuánto pasa el satélite).',
    herramientasIds: [
      'nasa-eyes-on-the-earth',
      'asf-data-search-vertex',
      'harmonized-landsat-sentinel-2-hls',
    ],
    errorComun: 'Usar óptico para una inundación en temporada de lluvias: vas a ver solo nubes.',
    checklist: [
      'Elegí tipo de sensor (óptico, SAR, térmico u atmosférico)',
      'Revisé resolución espacial y temporal',
      'Comprobé si las nubes o la noche son un problema',
    ],
    codigo: null,
    enlaceInterno: { to: '/sensores', label: 'Abrir el selector de sensores' },
  },
  {
    id: 'explora',
    titulo: 'Explora sin código',
    subtitulo: 'Mira antes de descargar',
    cuerpoHtml:
      'Busca tu evento en un visor web y confirma que se ve. Compara un antes y un después, prueba combinaciones de bandas en falso color y anota la fecha y el satélite exactos. Este paso ahorra horas de descargas inútiles.',
    herramientasIds: ['nasa-worldview', 'copernicus-browser', 'landsatlook', 'isro-bhuvan'],
    errorComun: 'Confundir color verdadero con falso color al explicar la imagen.',
    checklist: [
      'Encontré el evento o la zona en un visor',
      'Comparé al menos dos fechas',
      'Anoté satélite, producto y fecha exactos',
    ],
    codigo: null,
    enlaceInterno: { to: '/laboratorio', label: 'Probar en el laboratorio' },
  },
  {
    id: 'descarga',
    titulo: 'Busca y descarga los datos',
    subtitulo: 'De la escena al archivo',
    cuerpoHtml:
      'Crea tu cuenta gratuita de <strong>Earthdata Login</strong>. Busca por área y fecha en Earthdata Search o desde Python. Si el catálogo habla <strong>STAC</strong>, el mismo código sirve para la NASA, Copernicus, Planetary Computer o Earth Search.',
    herramientasIds: [
      'earthdata-login',
      'nasa-earthdata-search',
      'earthaccess',
      'pystac-client',
      'earth-search-stac',
      'copernicus-data-space-apis',
    ],
    errorComun: 'Descargar escenas completas de 1 GB cuando solo necesitas tu barrio: recorta o usa COG.',
    checklist: [
      'Tengo cuenta Earthdata Login (si hace falta)',
      'Busqué por AOI y fechas',
      'Descargué solo lo necesario (o usé COG / STAC)',
    ],
    codigo: `import earthaccess
earthaccess.login()  # usa tu cuenta Earthdata

res = earthaccess.search_data(
    short_name="HLSL30",                       # Landsat armonizado
    bounding_box=(-79.95, -6.90, -79.70, -6.60),
    temporal=("2026-01-01", "2026-03-31"),
    cloud_cover=(0, 30),
)
files = earthaccess.download(res[:2], "./datos")

# Alternativa STAC (sin cuenta): Sentinel-2 en AWS
from pystac_client import Client
cat = Client.open("https://earth-search.aws.element84.com/v1")
items = cat.search(collections=["sentinel-2-l2a"],
                   bbox=[-79.95, -6.90, -79.70, -6.60],
                   datetime="2026-01-01/2026-03-31").item_collection()`,
    enlaceInterno: null,
  },
  {
    id: 'procesa',
    titulo: 'Procesa y analiza',
    subtitulo: 'Del píxel al indicador',
    cuerpoHtml:
      'Calcula un índice (NDVI para vegetación, NDWI para agua, NBR para incendios), compara fechas o cuenta píxeles por zona. Si recién empiezas, usa QGIS o AppEEARS. Si programas, usa rasterio, xarray o openEO. Para el radar, SNAP o HyP3.',
    herramientasIds: [
      'qgis',
      'appeears',
      'rasterio',
      'xarray-rioxarray',
      'openeo',
      'esa-snap',
      'hyp3',
    ],
    errorComun: 'Mezclar proyecciones o fechas sin darte cuenta. Revisa siempre el CRS.',
    checklist: [
      'Elegí un indicador o método de análisis',
      'Verifiqué CRS y fechas de las capas',
      'Obtuve un resultado reproducible',
    ],
    codigo: `import rasterio, numpy as np
with rasterio.open("B04.tif") as r, rasterio.open("B08.tif") as n:
    red, nir = r.read(1).astype(float), n.read(1).astype(float)
ndvi = (nir - red) / (nir + red + 1e-6)
print("NDVI medio:", np.nanmean(ndvi).round(3))`,
    enlaceInterno: null,
  },
  {
    id: 'demo',
    titulo: 'Visualiza y construye la demo',
    subtitulo: 'Que se entienda en 30 segundos',
    cuerpoHtml:
      'Muestra el resultado en un mapa web o en una app simple. Las capas GIBS se cargan sin descargar nada; Leaflet u OpenLayers alcanzan para un prototipo; Streamlit convierte tu notebook en una app. ¿Quieres sumar IA? Prueba Prithvi o SAM para segmentar, o un agente MCP para buscar datos.',
    herramientasIds: [
      'nasa-gibs-wmts-wms',
      'leaflet',
      'openlayers',
      'streamlit',
      'prithvi-modelos-fundacionales-ibm-nasa',
      'earthdata-mcp',
    ],
    errorComun: 'Una demo con 15 capas y ninguna conclusión. Una pregunta, una respuesta, un mapa.',
    checklist: [
      'Hay una conclusión clara en la demo',
      'Probé la demo de punta a punta',
      'Alguien ajeno al equipo la entiende en 30 s',
    ],
    codigo: `// Capa diaria de la NASA en Leaflet
L.tileLayer(
  "https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/" +
  "MODIS_Terra_CorrectedReflectance_TrueColor/default/2026-10-01/" +
  "GoogleMapsCompatible_Level9/{z}/{y}/{x}.jpg",
  { maxNativeZoom: 9, attribution: "NASA GIBS" }
).addTo(map);`,
    enlaceInterno: { to: '/laboratorio', label: 'Ver capas GIBS en el laboratorio' },
  },
  {
    id: 'entrega',
    titulo: 'Cita, documenta y entrega',
    subtitulo: 'Lo que más se olvida',
    cuerpoHtml:
      'Lista <strong>todas</strong> las fuentes, aunque sean abiertas, con su licencia. Elige una licencia OSI para tu código (si no, la NASA aplica Apache 2.0), declara las herramientas de IA que usaste y verifica que todo sea público. La entrega cierra el domingo 15 de noviembre a las 23:59, hora local.',
    herramientasIds: ['jupyter'],
    errorComun: 'No citar los datasets: los términos permiten quitar premios por eso.',
    checklist: [
      'Todas las fuentes están citadas',
      'Elegí licencia OSI (o acepto Apache 2.0 por defecto)',
      'Declaré el uso de IA',
      'Revisé el checklist de entrega',
    ],
    codigo: null,
    enlaceInterno: { to: '/entrega', label: 'Abrir checklist de entrega' },
  },
];
