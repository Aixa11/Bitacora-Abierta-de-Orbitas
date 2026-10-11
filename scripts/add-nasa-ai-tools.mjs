/**
 * Inserta fichas IA NASA verificadas en seed/tools.json y sincroniza src/content/tools.json.
 * Fuentes: science.nasa.gov, Hugging Face nasa-ibm-ai4science / ibm-nasa-geospatial / nasa-impact, GitHub NASA-IMPACT.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const seedPath = path.join(root, 'seed', 'tools.json');
const contentPath = path.join(root, 'src', 'content', 'tools.json');

const nuevas = [
  {
    id: 'nasa-ai-for-science-hub',
    nombre: 'NASA Artificial Intelligence for Science',
    organizacion: 'NASA Science',
    origen: 'nasa',
    categoria: 'ia',
    tipo: 'web',
    acceso: 'libre',
    nivel: 'ini',
    legal: 'verde',
    descripcion:
      'Hub oficial de IA para ciencia de la NASA: estrategia, modelos abiertos y enlaces a la colaboración con IBM (Prithvi, Surya, Lunar Foundation Model y más). Empieza aquí para no perderte el mapa.',
    url: 'https://science.nasa.gov/artificial-intelligence-science',
    snippet: null,
  },
  {
    id: 'nasa-ibm-lunar-foundation-model',
    nombre: 'NASA-IBM Lunar Foundation Model',
    organizacion: 'NASA · IBM',
    origen: 'nasa',
    categoria: 'ia',
    tipo: 'modelo',
    acceso: 'libre',
    nivel: 'ava',
    legal: 'verde',
    descripcion:
      'Modelo fundacional multimodal de código abierto para ciencia lunar (LRO y datos alineados de otras misiones). Sirve para adaptar tareas como mapeo de cráteres, hielo o formaciones; pesos en Hugging Face (Apache-2.0). Anuncio NASA Science, sept. 2026.',
    url: 'https://huggingface.co/nasa-ibm-ai4science/NASA-IBM-Lunar-Foundation-Model',
    snippet: null,
  },
  {
    id: 'nasa-ibm-lunar-foundation-model-code',
    nombre: 'NASA-IBM Lunar FM · código (TerraTorch)',
    organizacion: 'NASA IMPACT · IBM',
    origen: 'nasa',
    categoria: 'ia',
    tipo: 'python',
    acceso: 'libre',
    nivel: 'ava',
    legal: 'verde',
    descripcion:
      'Repositorio con fine-tuning e inferencia del Lunar Foundation Model integrado a TerraTorch (detección de cráteres, segmentación, prospectividad de hielo, etc.). Complementa los pesos de Hugging Face.',
    url: 'https://github.com/NASA-IMPACT/NASA-IBM-Lunar-Foundation-Model',
    snippet: null,
  },
  {
    id: 'nasa-ibm-lunar-fm-anuncio',
    nombre: 'Anuncio NASA · Lunar Foundation Model',
    organizacion: 'NASA Science',
    origen: 'nasa',
    categoria: 'aprender',
    tipo: 'web',
    acceso: 'libre',
    nivel: 'ini',
    legal: 'verde',
    descripcion:
      'Nota oficial de NASA Science sobre el lanzamiento del NASA-IBM Lunar Foundation Model: contexto, misiones de entrenamiento y enlace a la familia de modelos abiertos NASA–IBM.',
    url: 'https://science.nasa.gov/science-research/artificial-intelligence-lunar-foundation-model/',
    snippet: null,
  },
  {
    id: 'surya-heliophysics-nasa-ibm',
    nombre: 'Surya (heliofísica NASA–IBM)',
    organizacion: 'NASA · IBM',
    origen: 'nasa',
    categoria: 'ia',
    tipo: 'modelo',
    acceso: 'libre',
    nivel: 'ava',
    legal: 'verde',
    descripcion:
      'Modelo fundacional abierto de heliofísica entrenado con datos multi-instrumento del Solar Dynamics Observatory (SDO). Orientado a dinámica solar y clima espacial; pesos en Hugging Face.',
    url: 'https://huggingface.co/nasa-ibm-ai4science/Surya-1.0',
    snippet: null,
  },
  {
    id: 'prithvi-eo-ibm-nasa',
    nombre: 'Prithvi-EO (observación de la Tierra)',
    organizacion: 'NASA · IBM',
    origen: 'nasa',
    categoria: 'ia',
    tipo: 'modelo',
    acceso: 'libre',
    nivel: 'ava',
    legal: 'verde',
    descripcion:
      'Familia Prithvi para Earth Observation entrenada con HLS (Harmonized Landsat y Sentinel-2). Base para fine-tuning en inundaciones, cicatrices de incendio, cultivos y más. Colección en Hugging Face ibm-nasa-geospatial.',
    url: 'https://huggingface.co/collections/ibm-nasa-geospatial/prithvi-for-earth-observation',
    snippet: null,
  },
  {
    id: 'prithvi-wxc-ibm-nasa',
    nombre: 'Prithvi-WxC (clima y tiempo)',
    organizacion: 'NASA · IBM',
    origen: 'nasa',
    categoria: 'ia',
    tipo: 'modelo',
    acceso: 'libre',
    nivel: 'ava',
    legal: 'verde',
    descripcion:
      'Modelo fundacional de clima y tiempo (~2.3B parámetros) entrenado con variables MERRA-2. Útil como punto de partida para downscaling o tareas atmosféricas con fine-tuning (p. ej. vía TerraTorch).',
    url: 'https://huggingface.co/ibm-nasa-geospatial/Prithvi-WxC-1.0-2300M',
    snippet: null,
  },
  {
    id: 'indus-nasa-ibm',
    nombre: 'INDUS / INDUS-SDE (lenguaje científico NASA–IBM)',
    organizacion: 'NASA IMPACT · IBM',
    origen: 'nasa',
    categoria: 'ia',
    tipo: 'modelo',
    acceso: 'libre',
    nivel: 'ava',
    legal: 'verde',
    descripcion:
      'Modelos de lenguaje científico de NASA IMPACT (familia INDUS / INDUS-SDE) para curación y descubrimiento de contenido en el Science Discovery Engine. Incluye variantes sentence-transformer para búsqueda semántica.',
    url: 'https://huggingface.co/nasa-impact/indus-sde-v0.2',
    snippet: null,
  },
  {
    id: 'nasa-impact-huggingface',
    nombre: 'NASA IMPACT en Hugging Face',
    organizacion: 'NASA IMPACT (ODSI)',
    origen: 'nasa',
    categoria: 'ia',
    tipo: 'web',
    acceso: 'libre',
    nivel: 'int',
    legal: 'verde',
    descripcion:
      'Organización Hugging Face del equipo IMPACT / ODSI (Marshall): modelos INDUS, benchmarks, datasets y colecciones de IA para ciencia NASA. Revisa la licencia de cada modelo antes de usarlo.',
    url: 'https://huggingface.co/nasa-impact',
    snippet: null,
  },
  {
    id: 'nasa-ibm-ai4science-huggingface',
    nombre: 'nasa-ibm-ai4science (Hugging Face)',
    organizacion: 'NASA · IBM',
    origen: 'nasa',
    categoria: 'ia',
    tipo: 'web',
    acceso: 'libre',
    nivel: 'int',
    legal: 'verde',
    descripcion:
      'Organización Hugging Face de la colaboración NASA–IBM AI for Science: Surya, Lunar Foundation Model y otros lanzamientos abiertos. Complementa ibm-nasa-geospatial (Prithvi EO/WxC).',
    url: 'https://huggingface.co/nasa-ibm-ai4science',
    snippet: null,
  },
  {
    id: 'earthdata-mcp-endpoint',
    nombre: 'Earthdata MCP (endpoint CMR)',
    organizacion: 'NASA Earthdata',
    origen: 'nasa',
    categoria: 'ia',
    tipo: 'agente',
    acceso: 'libre',
    nivel: 'ava',
    legal: 'verde',
    descripcion:
      'Endpoint HTTP Streamable del servidor MCP oficial de Earthdata/CMR para agentes: descubrir colecciones y gránulos (flujo Discover → Verify → Access). URL pública documentada en el repo nasa/earthdata-mcp.',
    url: 'https://cmr.earthdata.nasa.gov/mcp/v1',
    snippet: null,
  },
];

const catalog = JSON.parse(fs.readFileSync(seedPath, 'utf8'));
const existing = new Set(catalog.herramientas.map((h) => h.id));
const added = [];
for (const tool of nuevas) {
  if (existing.has(tool.id)) {
    console.log('skip existing', tool.id);
    continue;
  }
  catalog.herramientas.push(tool);
  added.push(tool.id);
}

// Actualizar ficha genérica Prithvi para no solapar con fichas nuevas
const prithvi = catalog.herramientas.find((h) => h.id === 'prithvi-modelos-fundacionales-ibm-nasa');
if (prithvi) {
  prithvi.descripcion =
    'Puerta de entrada a la familia Prithvi NASA–IBM en Hugging Face (EO, clima/WxC y fine-tunes). Para el modelo lunar usa la ficha NASA-IBM Lunar Foundation Model; para heliofísica, Surya.';
  prithvi.nombre = 'Prithvi · familia IBM-NASA Geospatial';
}

const earthMcp = catalog.herramientas.find((h) => h.id === 'earthdata-mcp');
if (earthMcp) {
  earthMcp.descripcion =
    'Servidor MCP oficial (repo nasa/earthdata-mcp) para que un agente busque en el catálogo CMR de la NASA. Flujo Discover → Verify → Access; hay endpoint alojado en CMR (ver ficha Earthdata MCP endpoint).';
}

catalog.version = '2026-10-11';
catalog.total = catalog.herramientas.length;

const json = `${JSON.stringify(catalog, null, 2)}\n`;
fs.writeFileSync(seedPath, json, 'utf8');
fs.writeFileSync(contentPath, json, 'utf8');
console.log('added', added.length, added);
console.log('total', catalog.total);
