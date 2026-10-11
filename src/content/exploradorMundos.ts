/**
 * Puente entre fenómenos del mundo real, capas/sensores NASA y desafíos 2026.
 * Solo orienta la exploración. PROHIBIDO proponer soluciones de producto.
 */

export type ExploradorMundo = {
  id: string;
  titulo: string;
  fenomeno: string;
  /** Pregunta para pensar (no una idea de producto). */
  pregunta: string;
  /** ids de challenges.json relacionados por tema. */
  desafioIds: string[];
  gibsLayerId: string | null;
  sensorTopicId: string | null;
  estudioIds: string[];
  /** Índice o producto conceptual (explicación, no algoritmo). */
  indiceOProducto: string;
};

export const EXPLORADOR_MUNDOS: ExploradorMundo[] = [
  {
    id: 'incendios',
    titulo: 'Incendios y cicatrices',
    fenomeno:
      'En muchas regiones del mundo, focos de calor y quemas cambian de un día para otro. Los sensores térmicos y el falso color ayudan a ver actividad y cicatriz; el óptico falla con humo denso.',
    pregunta:
      'Si tuvieras que explicar a un gestor qué cambió en 48 horas, ¿qué sensor mirarías primero y qué incertidumbre mencionarías?',
    desafioIds: ['harmonization-modis-viirs', 'dancing-with-the-sars'],
    gibsLayerId: 'MODIS_Terra_CorrectedReflectance_Bands721',
    sensorTopicId: 'incendios',
    estudioIds: ['firms', 'worldview', 'earth-observatory'],
    indiceOProducto: 'Focos activos (FIRMS) · falso color 7-2-1 · NDVI post-evento (con cautela)',
  },
  {
    id: 'inundaciones',
    titulo: 'Agua e inundaciones',
    fenomeno:
      'Tras una tormenta, el agua en superficie se ve distinto en óptico y en radar. Las nubes bloquean el óptico; el SAR atraviesa y ve agua calma como espejo oscuro.',
    pregunta:
      '¿Qué te aporta una imagen óptica nublada frente a una pasada SAR? ¿Qué pregunta del enunciado responde cada una?',
    desafioIds: ['dancing-with-the-sars', 'be-an-earth-system-trend-detective'],
    gibsLayerId: 'IMERG_Precipitation_Rate',
    sensorTopicId: 'inundaciones',
    estudioIds: ['worldview', 'gibs-docs', 'earthdata-portal'],
    indiceOProducto: 'Precipitación IMERG · agua superficial (productos SAR / OPERA cuando aplique)',
  },
  {
    id: 'vegetacion',
    titulo: 'Vegetación y agro',
    fenomeno:
      'La vegetación sana refleja mucho infrarrojo cercano. Índices como el NDVI resumen vigor, pero dependen de estación, nubes y escala del píxel frente al lote.',
    pregunta:
      'Si el píxel es más grande que el campo del productor, ¿qué decisión ya no puedes tomar con honestidad?',
    desafioIds: ['field-shift', 'be-an-earth-system-trend-detective'],
    gibsLayerId: 'MODIS_Terra_NDVI_8Day',
    sensorTopicId: 'vegetacion',
    estudioIds: ['power', 'worldview', 'cloud-cookbook'],
    indiceOProducto: 'NDVI / EVI · POWER (clima puntual) · HLS (cuando necesites más detalle)',
  },
  {
    id: 'aire',
    titulo: 'Aire y aerosoles',
    fenomeno:
      'Humos, polvo y contaminación cambian la composición de la atmósfera. Capas de aerosoles y relatos del Earth Observatory ayudan a enmarcar el fenómeno.',
    pregunta:
      '¿Cómo separas un evento puntual (incendio) de una climatología de aerosoles al contar la historia?',
    desafioIds: ['be-an-earth-system-trend-detective', 'harmonization-modis-viirs'],
    gibsLayerId: 'MODIS_Terra_Aerosol',
    sensorTopicId: 'aire',
    estudioIds: ['giovanni', 'earth-observatory', 'earthdata-portal'],
    indiceOProducto: 'Aerosol Optical Depth · series en Giovanni',
  },
  {
    id: 'ciudades',
    titulo: 'Ciudades y luces',
    fenomeno:
      'Las luces nocturnas revelan urbanización, cortes de energía y actividad. Combinadas con población, sugieren exposición — sin inventar causalidad.',
    pregunta:
      '¿Qué puedes afirmar con luces nocturnas y qué necesitarías validar en tierra?',
    desafioIds: ['be-an-earth-system-trend-detective'],
    gibsLayerId: 'VIIRS_Black_Marble',
    sensorTopicId: 'ciudades',
    estudioIds: ['worldview', 'earthdata-portal'],
    indiceOProducto: 'VIIRS Day/Night Band · Black Marble (fecha fija en GIBS)',
  },
  {
    id: 'oceanos',
    titulo: 'Océanos y temperatura del mar',
    fenomeno:
      'La temperatura superficial del mar y el color del océano cuentan historias de corrientes, floraciones y pesca. Son productos distintos: no los mezcles sin leer la ficha.',
    pregunta:
      '¿Tu pregunta es de temperatura, de color/clorofila o de actividad humana? ¿Qué producto responde cada una?',
    desafioIds: ['be-an-earth-system-trend-detective'],
    gibsLayerId: 'GHRSST_L4_MUR_Sea_Surface_Temperature',
    sensorTopicId: 'oceanos',
    estudioIds: ['earthdata-portal', 'giovanni', 'earth-observatory'],
    indiceOProducto: 'SST (GHRSST) · color del océano (otros portales EOSDIS)',
  },
  {
    id: 'luna-marte',
    titulo: 'Luna, Marte y exploración',
    fenomeno:
      'No todo el Space Apps es Tierra: hay hardware en la Luna/Marte, sitios polares, salud en misión y narrativa espacial. Los datos viven en otros archivos (Trek, PDS, HRP).',
    pregunta:
      '¿Tu usuario necesita un mapa, una historia o una decisión de ingeniería? ¿Qué archivo NASA responde sin inventar números?',
    desafioIds: [
      'abandoned-but-not-forgotten',
      'clps-lunar-mission-browser',
      'build-a-junior-astronaut-mission-trainer',
      'astronaut-health-monitoring',
    ],
    gibsLayerId: null,
    sensorTopicId: 'orbitas',
    estudioIds: ['entry-points', 'earthdata-login'],
    indiceOProducto: 'Moon/Mars Trek · PDS · Human Research Program (según desafío)',
  },
];
