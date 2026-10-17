/**
 * Charla / webinar Space Apps Chiclayo 2026.
 * Pitch y notas: material de Aixa Benitez (español). Subtítulos EN en captions.
 */

export type TalkAgendaItem = {
  id: string;
  titulo: string;
  minutos: number;
  resumen: string;
};

export type TalkSlide = {
  id: string;
  tituloEs: string;
  tituloEn: string;
  cuerpoEs: string;
  cuerpoEn: string;
};

export const TALK = {
  titulo: 'Explora la Tierra desde el espacio',
  subtitulo: 'Datos abiertos de NASA y ESA',
  /** Fecha del webinar grabado (GMT20261016). */
  fechaLabel: '16 de octubre de 2026',
  duracionMin: 60,
  preguntasMin: 15,
  formato: 'Virtual · en español (subtítulos ES/EN)',
  evento: 'NASA Space Apps Chiclayo · abierto a participantes de todo el mundo',
  descripcion:
    'De la imagen satelital a tu proyecto, aunque nunca hayas usado una. GEOINT, casos reales y datos abiertos de la NASA y la ESA, con la Bitácora como material de apoyo.',
  speaker: {
    nombre: 'Aixa Benitez',
    rol: 'Directora GEOINT · Mentora NASA Space Apps · Órbitas',
    linkedin: 'https://www.linkedin.com/in/aixabenitez98/',
    instagram: 'https://www.instagram.com/benitezaixa/',
  },
  /** Ruta same-origin; el MP4 grande no va al git (ver .gitignore). */
  videoSrc: '/media/charla/webinar-2026-10-16.mp4',
  /** TODO: cuando subas a YouTube/Vimeo, pega aquí la URL de embed y se usará de respaldo. */
  videoEmbedUrl: null as string | null,
  captions: {
    es: '/media/charla/captions-es.vtt',
    en: '/media/charla/captions-en.vtt',
  },
  pitchPdf: '/media/charla/pitch-explora-la-tierra.pdf',
  agenda: [
    {
      id: 'parada-1',
      titulo: 'De la imagen a la decisión',
      minutos: 19,
      resumen: 'Qué es GEOINT, óptico vs radar, sensores y el paso de la foto al NDVI.',
    },
    {
      id: 'parada-2',
      titulo: 'El planeta desde el espacio',
      minutos: 21,
      resumen: 'Incendios, inundaciones, bosque, glaciares, Aral, El Niño y huracanes.',
    },
    {
      id: 'parada-3',
      titulo: 'Datos abiertos para tu proyecto',
      minutos: 15,
      resumen: 'Earthdata, Landsat, Sentinel, Worldview, demo y la Bitácora.',
    },
    {
      id: 'preguntas',
      titulo: 'Preguntas',
      minutos: 15,
      resumen: 'Espacio para dudas del equipo y del público.',
    },
  ] satisfies TalkAgendaItem[],
  /** Láminas clave de la pitch (texto bilingüe para traducción en pantalla). */
  slides: [
    {
      id: 'portada',
      tituloEs: 'Explora la Tierra desde el espacio',
      tituloEn: 'Explore Earth from space',
      cuerpoEs:
        'Datos abiertos de NASA y ESA. De la imagen satelital a tu proyecto, aunque nunca hayas usado una. Imagen: NASA EPIC / DSCOVR · 7 oct 2026.',
      cuerpoEn:
        'Open data from NASA and ESA. From a satellite image to your project — even if you have never used one. Image: NASA EPIC / DSCOVR · 7 Oct 2026.',
    },
    {
      id: 'viaje',
      tituloEs: 'Nuestro viaje · tres paradas',
      tituloEn: 'Our journey · three stops',
      cuerpoEs:
        '01 De la imagen a la decisión · 02 El planeta desde el espacio · 03 Datos abiertos para tu proyecto.',
      cuerpoEn:
        '01 From image to decision · 02 The planet from space · 03 Open data for your project.',
    },
    {
      id: 'geoint',
      tituloEs: '¿Qué es GEOINT?',
      tituloEn: 'What is GEOINT?',
      cuerpoEs:
        'Imagen (lo que se ve) + ubicación (dónde ocurre) + análisis (qué significa) = decisión (qué hacemos). Ejemplo: ¿dónde hay cultivos que necesitan agua esta semana?',
      cuerpoEn:
        'Image (what you see) + location (where it happens) + analysis (what it means) = decision (what we do). Example: where do crops need water this week?',
    },
    {
      id: 'optico-radar',
      tituloEs: 'Óptico vs radar',
      tituloEn: 'Optical vs radar',
      cuerpoEs:
        'Óptico: como una cámara (Luz del Sol; nubes y noche lo bloquean). Radar: como un eco (señal propia; ve de noche y con nubes). Landsat · Sentinel-2 · MODIS · Sentinel-1 · NISAR.',
      cuerpoEn:
        'Optical: like a camera (needs sunlight; clouds and night block it). Radar: like an echo (own signal; works at night and through clouds). Landsat · Sentinel-2 · MODIS · Sentinel-1 · NISAR.',
    },
    {
      id: 'sensores',
      tituloEs: 'Tipos de sensores',
      tituloEn: 'Sensor types',
      cuerpoEs:
        'Óptico (cámara), térmico (termómetro), radar (eco), lidar (regla láser). Cada uno responde una pregunta distinta.',
      cuerpoEn:
        'Optical (camera), thermal (thermometer), radar (echo), lidar (laser ruler). Each answers a different question.',
    },
    {
      id: 'invisible',
      tituloEs: 'Ver lo invisible',
      tituloEn: 'Seeing the invisible',
      cuerpoEs:
        'Las plantas sanas brillan en infrarrojo cercano. Mismo lugar, mismo día: color real vs falso color. Delta del Nilo · MODIS Terra · NASA GIBS / Worldview.',
      cuerpoEn:
        'Healthy plants shine in near-infrared. Same place, same day: true color vs false color. Nile Delta · MODIS Terra · NASA GIBS / Worldview.',
    },
    {
      id: 'ndvi',
      tituloEs: 'Del dato a la decisión (NDVI)',
      tituloEn: 'From data to decision (NDVI)',
      cuerpoEs:
        '1 Captar · 2 Procesar bandas · 3 Analizar (NDVI) · 4 Decidir. Verde intenso ≈ plantas vigorosas. Cita siempre fecha y fuente.',
      cuerpoEn:
        '1 Capture · 2 Process bands · 3 Analyze (NDVI) · 4 Decide. Intense green ≈ vigorous plants. Always cite date and source.',
    },
    {
      id: 'casos',
      tituloEs: 'Casos reales',
      tituloEn: 'Real-world cases',
      cuerpoEs:
        'Incendios (FIRMS), inundaciones (Indo), deforestación (Rondônia), glaciares (Cordillera Blanca), Mar de Aral, El Niño, huracanes. Primero la imagen; después la conclusión.',
      cuerpoEn:
        'Fires (FIRMS), floods (Indus), deforestation (Rondônia), glaciers (Cordillera Blanca), Aral Sea, El Niño, hurricanes. Read the image first; then conclude.',
    },
    {
      id: 'fuentes',
      tituloEs: 'Tres puertas de entrada',
      tituloEn: 'Three entry doors',
      cuerpoEs:
        'Earthdata (NASA), Landsat / EarthExplorer (NASA·USGS), Sentinel / Copernicus Data Space (ESA). Gratis; piden cuenta.',
      cuerpoEn:
        'Earthdata (NASA), Landsat / EarthExplorer (NASA·USGS), Sentinel / Copernicus Data Space (ESA). Free; accounts required.',
    },
    {
      id: 'escalon',
      tituloEs: 'Empieza por el primer escalón',
      tituloEn: 'Start on the first step',
      cuerpoEs:
        'Mirar (Worldview) → Explorar (Copernicus Browser) → Descargar (Earthdata Search) → Analizar (QGIS). No hace falta llegar arriba para un buen proyecto.',
      cuerpoEn:
        'Look (Worldview) → Explore (Copernicus Browser) → Download (Earthdata Search) → Analyze (QGIS). You do not need the top step for a solid project.',
    },
    {
      id: 'bitacora',
      tituloEs: 'Bitácora Abierta de Órbitas',
      tituloEn: 'Órbitas open logbook',
      cuerpoEs:
        'bitacora-abierta-de-orbitas.vercel.app — ruta, laboratorio, 134 herramientas, entrega y citas. Material de apoyo del webinar.',
      cuerpoEn:
        'bitacora-abierta-de-orbitas.vercel.app — pathway, lab, 134 tools, delivery and citations. Companion material for the webinar.',
    },
    {
      id: 'cierre',
      tituloEs: 'La Tierra ya está fotografiada',
      tituloEn: 'Earth is already photographed',
      cuerpoEs: 'La pregunta la pones tú. ¡Gracias! ¿Preguntas?',
      cuerpoEn: 'You choose the question. Thank you! Questions?',
    },
  ] satisfies TalkSlide[],
} as const;
