/**
 * Guía de IAs y agentes NASA / NASA–IBM presentes en el catálogo.
 * Cada entrada apunta a un id de tools.json (URL verificada).
 * Enseña a orientarse e interactuar; no resuelve desafíos del Space Apps.
 */

export type IaNasaDoc = {
  id: string;
  /** id en tools.json */
  toolId: string;
  titulo: string;
  familia: 'hub' | 'modelo' | 'agente' | 'codigo' | 'lenguaje';
  /** Qué hace, en español neutro. */
  queHace: string;
  /** Cómo empezar a usarlo / interactuar (método, no solución de producto). */
  comoUsarlo: string;
  /** Preguntas útiles antes de elegir este recurso. */
  preguntas: string[];
  fuente: string;
};

export const IA_NASA_DOCS: IaNasaDoc[] = [
  {
    id: 'hub-ai-science',
    toolId: 'nasa-ai-for-science-hub',
    titulo: 'Hub NASA AI for Science',
    familia: 'hub',
    queHace:
      'Es el mapa oficial de IA para ciencia en NASA Science: contexto de la estrategia y enlaces a modelos abiertos de la colaboración con IBM y otros esfuerzos.',
    comoUsarlo:
      'Léelo primero. Anota qué familia te interesa (Tierra, clima, Sol, Luna, lenguaje) y abre la ficha concreta en la Bitácora o en Hugging Face. No hace falta instalar nada aquí.',
    preguntas: [
      '¿Mi pregunta es de Tierra, atmósfera, Sol o Luna?',
      '¿Necesito un modelo para fine-tuning o un agente que busque datos?',
    ],
    fuente: 'https://science.nasa.gov/artificial-intelligence-science',
  },
  {
    id: 'lunar-fm',
    toolId: 'nasa-ibm-lunar-foundation-model',
    titulo: 'NASA-IBM Lunar Foundation Model',
    familia: 'modelo',
    queHace:
      'Modelo fundacional multimodal abierto para analizar la superficie lunar a partir de datos de misiones (principalmente LRO y capas alineadas). Se adapta a tareas como patrones de cráteres, hielo o morfología; no es un “chat” listo: son pesos para ciencia.',
    comoUsarlo:
      '1) Lee el anuncio NASA Science. 2) Descarga o inspecciona el model card en Hugging Face. 3) Para fine-tuning, usa el repo de código con TerraTorch. Cita siempre la licencia Apache-2.0 y la fuente de los datos lunares.',
    preguntas: [
      '¿Qué variable lunar quiero estimar o segmentar?',
      '¿Tengo GPU/tiempo para fine-tuning o solo exploraré el paper y el card?',
    ],
    fuente: 'https://science.nasa.gov/science-research/artificial-intelligence-lunar-foundation-model/',
  },
  {
    id: 'lunar-fm-code',
    toolId: 'nasa-ibm-lunar-foundation-model-code',
    titulo: 'Código Lunar FM + TerraTorch',
    familia: 'codigo',
    queHace:
      'Paquete de fine-tuning e inferencia del Lunar Foundation Model, con configs TerraTorch para tareas de ejemplo (cráteres, segmentación, prospectividad de hielo, etc.).',
    comoUsarlo:
      'Clona el repo NASA-IMPACT, sigue el README (pesos desde Hugging Face + datos de benchmark). Empieza con una config de ejemplo antes de inventar la tuya. Documenta hiperparámetros y versión del backbone.',
    preguntas: [
      '¿Qué tarea del README se parece más a mi pregunta científica?',
      '¿Puedo reproducir un baseline antes de cambiar datos?',
    ],
    fuente: 'https://github.com/NASA-IMPACT/NASA-IBM-Lunar-Foundation-Model',
  },
  {
    id: 'prithvi-eo',
    toolId: 'prithvi-eo-ibm-nasa',
    titulo: 'Prithvi-EO',
    familia: 'modelo',
    queHace:
      'Familia de modelos fundacionales de observación de la Tierra entrenados con HLS (Landsat + Sentinel-2 armonizados). Sirven de base para segmentar o clasificar fenómenos terrestres tras fine-tuning.',
    comoUsarlo:
      'Elige un checkpoint EO en la colección Hugging Face, revisa el model card y el dataset de fine-tune que sugieren. Ajusta con TerraTorch u otro pipeline; no uses el modelo “a ciegas” sin validar en tu AOI.',
    preguntas: [
      '¿Mi fenómeno se ve bien en óptico HLS o necesito radar/otro sensor?',
      '¿Qué métrica usaré para saber si el fine-tune sirve?',
    ],
    fuente: 'https://huggingface.co/collections/ibm-nasa-geospatial/prithvi-for-earth-observation',
  },
  {
    id: 'prithvi-wxc',
    toolId: 'prithvi-wxc-ibm-nasa',
    titulo: 'Prithvi-WxC',
    familia: 'modelo',
    queHace:
      'Modelo fundacional de clima y tiempo entrenado con muchas variables MERRA-2. Orientado a reconstrucción y pronóstico atmosférico como punto de partida, no como producto operativo final.',
    comoUsarlo:
      'Lee el model card (tamaño, variables, objetivos de preentrenamiento). Si vas a experimentar, planifica almacenamiento y cómputo: los pesos son grandes. Combina con datos MERRA-2 vía Earthdata cuando corresponda.',
    preguntas: [
      '¿Mi pregunta es de clima/tiempo o de superficie óptica?',
      '¿Tengo capacidad para bajar y correr un modelo de miles de millones de parámetros?',
    ],
    fuente: 'https://huggingface.co/ibm-nasa-geospatial/Prithvi-WxC-1.0-2300M',
  },
  {
    id: 'surya',
    toolId: 'surya-heliophysics-nasa-ibm',
    titulo: 'Surya',
    familia: 'modelo',
    queHace:
      'Modelo fundacional abierto de heliofísica entrenado con años de datos SDO (AIA/HMI). Apoya el estudio de dinámica solar y clima espacial.',
    comoUsarlo:
      'Abre el card en Hugging Face, entiende las bandas/productos de entrada y el horizonte de predicción del preentrenamiento. Úsalo solo si tu pregunta es solar/clima espacial; no lo fuerces a problemas terrestres.',
    preguntas: [
      '¿Mi desafío habla de Sol, CME, flares o clima espacial?',
      '¿Qué producto SDO necesito citar?',
    ],
    fuente: 'https://huggingface.co/nasa-ibm-ai4science/Surya-1.0',
  },
  {
    id: 'indus',
    toolId: 'indus-nasa-ibm',
    titulo: 'INDUS / INDUS-SDE',
    familia: 'lenguaje',
    queHace:
      'Modelos de lenguaje científico de NASA IMPACT para curar y recuperar contenido del Science Discovery Engine. Hay variantes sentence-transformer para búsqueda semántica de documentos.',
    comoUsarlo:
      'Útil cuando tu cuello de botella es encontrar papers, páginas o metadatos narrativos — no para segmentar imágenes. Prueba embeddings o fill-mask según el card; valida con un set pequeño de consultas de tu tema.',
    preguntas: [
      '¿Estoy buscando documentos o analizando rasters?',
      '¿Qué corpus o benchmark cita el model card?',
    ],
    fuente: 'https://huggingface.co/nasa-impact/indus-sde-v0.2',
  },
  {
    id: 'earthdata-mcp',
    toolId: 'earthdata-mcp',
    titulo: 'earthdata-mcp (agente CMR)',
    familia: 'agente',
    queHace:
      'Servidor MCP oficial que expone herramientas para que un LLM descubra colecciones y gránulos en el CMR de Earthdata (y servicios asociados).',
    comoUsarlo:
      'Conecta un cliente MCP compatible al repo o al endpoint CMR documentado. Sigue el flujo Discover → Verify → Access: primero colecciones, luego gránulos que existan en tu tiempo/área, y recién ahí earthaccess para bajar. No inventes concept-ids.',
    preguntas: [
      '¿Mi cliente MCP soporta Streamable HTTP?',
      '¿Ya tengo Earthdata Login para el paso de acceso?',
    ],
    fuente: 'https://github.com/nasa/earthdata-mcp',
  },
  {
    id: 'earthdata-mcp-http',
    toolId: 'earthdata-mcp-endpoint',
    titulo: 'Endpoint Earthdata MCP',
    familia: 'agente',
    queHace:
      'URL pública del servidor MCP de Earthdata/CMR para clientes que hablan Streamable HTTP, sin montar el servidor en local.',
    comoUsarlo:
      'Configura tu cliente MCP con la URL del endpoint (timeout generoso). Prueba una búsqueda simple de colecciones. Si falla la red o el auth, cae al repo local o a Earthdata Search manual.',
    preguntas: [
      '¿El cliente muestra las tools get_collections / get_granules?',
      '¿Qué hago si el endpoint no responde: ¿tengo plan B en la Bitácora?',
    ],
    fuente: 'https://cmr.earthdata.nasa.gov/mcp/v1',
  },
];

export const IA_NASA_FUENTE_HUB =
  'https://science.nasa.gov/artificial-intelligence-science';

export const IA_NASA_NOTA =
  'Listado basado en lanzamientos públicos verificados (NASA Science, Hugging Face nasa-ibm-ai4science / ibm-nasa-geospatial / nasa-impact, GitHub NASA-IMPACT y nasa/earthdata-mcp). No es un inventario exhaustivo de toda la IA interna de la NASA: si aparece un modelo nuevo, ábrelo en el hub oficial y sugiere su ficha en Issues.';
