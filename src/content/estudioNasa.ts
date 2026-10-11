/**
 * Material de estudio complementario.
 * Cada entrada cita una herramienta del catálogo (URL verificada en tools.json)
 * y ofrece una explicación en español para leer en la Bitácora.
 * No resuelve desafíos: enseña a orientarse en los datos NASA.
 */

export type EstudioNasaDoc = {
  id: string;
  titulo: string;
  /** Resumen en español de qué vas a encontrar. */
  queEs: string;
  /** Cómo usarlo durante el hackatón (método, no solución). */
  comoUsarlo: string;
  /** Conceptos que conviene anotar. */
  conceptos: string[];
  /** id de tools.json */
  toolId: string;
  nivel: 'ini' | 'int' | 'ava';
  temas: string[];
};

export const ESTUDIO_NASA: EstudioNasaDoc[] = [
  {
    id: 'earthdata-portal',
    titulo: 'Portal NASA Earthdata',
    queEs:
      'La puerta principal a los datos terrestres de la NASA: guías por tema (agua, atmósfera, desastres), herramientas y tutoriales. No es un dataset único: es el mapa de cómo llegar a ellos.',
    comoUsarlo:
      'Entra por tema (por ejemplo desastres o vegetación), anota 2–3 productos que midan lo que te importa y copia el nombre exacto del producto. Luego búscalos en Earthdata Search o en la Bitácora.',
    conceptos: ['EOSDIS', 'producto vs misión', 'nivel de procesamiento (L1, L2, L3)'],
    toolId: 'nasa-earthdata',
    nivel: 'ini',
    temas: ['Ciencias de la Tierra', 'datos'],
  },
  {
    id: 'earthdata-login',
    titulo: 'Earthdata Login (cuenta gratuita)',
    queEs:
      'La cuenta que habilita descargas en Earthdata, ASF, LP DAAC, AppEEARS y earthaccess. Sin ella, muchas puertas se quedan en “mirar” y no en “bajar”.',
    comoUsarlo:
      'Créala antes del hackatón. Prueba un login y una descarga pequeña. Si falla el sábado a las 3 a. m., pierdes horas.',
    conceptos: ['autenticación EOSDIS', 'tokens de descarga', 'cuentas compartidas del equipo'],
    toolId: 'earthdata-login',
    nivel: 'ini',
    temas: ['datos', 'arranque'],
  },
  {
    id: 'entry-points',
    titulo: 'Entry Points to NASA Science Data',
    queEs:
      'Mapa oficial de puertas de entrada a archivos científicos de la NASA por disciplina (Tierra, planetas, heliofísica, astrofísica…). Útil cuando tu desafío no es solo “Earth observation”.',
    comoUsarlo:
      'Elige la disciplina del enunciado, abre 1–2 archivos sugeridos y anota qué tipo de datos ofrecen. No intentes bajar todo: busca el mínimo que responda tu pregunta.',
    conceptos: ['archivo científico', 'disciplina vs portal', 'datos planetarios vs terrestres'],
    toolId: 'entry-points-to-nasa-science-data',
    nivel: 'ini',
    temas: ['Exploración espacial', 'aprender'],
  },
  {
    id: 'worldview',
    titulo: 'NASA Worldview',
    queEs:
      'Visor web con más de mil capas casi en tiempo real. Sirve para ver un evento día a día, comparar fechas y exportar capturas o animaciones sin programar.',
    comoUsarlo:
      'Busca tu zona, activa una capa (color verdadero, NDVI, focos…), compara dos fechas y guarda una captura citada. Pregúntate: ¿qué cambia y qué no puedo ver por las nubes?',
    conceptos: ['capa raster', 'composición temporal', 'limitación por nubes'],
    toolId: 'nasa-worldview',
    nivel: 'ini',
    temas: ['Ciencias de la Tierra', 'mapas'],
  },
  {
    id: 'earth-observatory',
    titulo: 'NASA Earth Observatory',
    queEs:
      'Historias e imágenes explicadas sobre incendios, inundaciones, hielo, volcanes y más. Es una fuente de casos reales del mundo para inspirar preguntas — no recetas de producto.',
    comoUsarlo:
      'Lee un artículo cercano a tu tema. Anota: fenómeno, lugar, sensor mencionado y qué pregunta deja abierta. Úsalo como “caso del mundo real”, no como solución del desafío.',
    conceptos: ['caso de uso', 'narrativa basada en evidencia', 'crédito de imagen'],
    toolId: 'nasa-earth-observatory',
    nivel: 'ini',
    temas: ['aprender', 'Ciencias de la Tierra'],
  },
  {
    id: 'gibs-docs',
    titulo: 'Documentación NASA GIBS',
    queEs:
      'Explica cómo pedir mosaicos diarios (WMTS/WMS) para Leaflet, Cesium o QGIS. Es la misma familia de capas que usa el laboratorio de esta Bitácora.',
    comoUsarlo:
      'Identifica el id de capa (por ejemplo color verdadero MODIS), la plantilla de URL y el nivel máximo. Luego pruébala en /laboratorio sin reinventar el mosaico.',
    conceptos: ['WMTS', 'EPSG:3857', 'fecha del mosaico', 'nivel de zoom'],
    toolId: 'nasa-gibs-wmts-wms',
    nivel: 'int',
    temas: ['mapas', 'Software'],
  },
  {
    id: 'cloud-cookbook',
    titulo: 'Earthdata Cloud Cookbook',
    queEs:
      'Recetario Openscapes con notebooks para buscar, abrir y analizar datos NASA en la nube con Python. Ideal si tu equipo ya programa.',
    comoUsarlo:
      'Sigue una receta mínima (buscar → abrir → recortar). Documenta versiones de librerías. No copies un notebook entero como “la solución”: adáptalo a tu pregunta.',
    conceptos: ['earthaccess', 'nube vs descarga local', 'reproducibilidad'],
    toolId: 'earthdata-cloud-cookbook',
    nivel: 'int',
    temas: ['Software', 'procesar'],
  },
  {
    id: 'firms',
    titulo: 'NASA FIRMS (incendios activos)',
    queEs:
      'Focos de calor de MODIS, VIIRS y Landsat casi en tiempo real. Tiene mapa web, descargas y API con MAP_KEY gratuita.',
    comoUsarlo:
      'Explora el mapa en tu región de interés. Pregunta: ¿qué sensor ves?, ¿cada cuánto actualiza?, ¿qué NO es un incendio confirmado? Anota la clave API si vas a consultar datos.',
    conceptos: ['foco activo vs incendio confirmado', 'resolución 1 km vs 375 m', 'NRT'],
    toolId: 'nasa-firms-incendios-activos',
    nivel: 'ini',
    temas: ['Ciencias de la Tierra', 'desastres'],
  },
  {
    id: 'power',
    titulo: 'NASA POWER (clima y energía)',
    queEs:
      'Radiación solar, temperatura, viento y lluvia para cualquier punto desde 1981. Muy usada en energía y agro.',
    comoUsarlo:
      'Elige un punto, un parámetro y un rango de fechas. Compara con lo que un productor o un técnico diría “a ojo”. Documenta unidades y fuente en Mi kit.',
    conceptos: ['serie puntual', 'reanálisis / modelos', 'unidades físicas'],
    toolId: 'nasa-power',
    nivel: 'ini',
    temas: ['Ciencias de la Tierra', 'energía'],
  },
  {
    id: 'giovanni',
    titulo: 'Giovanni',
    queEs:
      'Interfaz web de NASA GES DISC para promediar y graficar variables atmosféricas y terrestres sin bajar archivos enormes a mano.',
    comoUsarlo:
      'Arma un mapa o una serie temporal de una variable (por ejemplo aerosoles). Exporta la figura y la cita. Pregunta qué resolución temporal estás mezclando.',
    conceptos: ['agregación espacial', 'climatología', 'GES DISC'],
    toolId: 'giovanni',
    nivel: 'int',
    temas: ['atmósfera', 'Ciencias de la Tierra'],
  },
];
