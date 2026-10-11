export type EntregaCheckItem = {
  id: string;
  titulo: string;
  detalle: string;
};

export const ENTREGA_CHECKS: EntregaCheckItem[] = [
  {
    id: 'nasa-recurso',
    titulo: 'Al menos un recurso de la NASA',
    detalle: 'Necesario para competir en el juzgamiento global, según la discusión oficial del equipo Space Apps.',
  },
  {
    id: 'fuentes-citadas',
    titulo: 'Todas las fuentes citadas',
    detalle: 'Incluye datasets abiertos, APIs, modelos y cualquier material de terceros.',
  },
  {
    id: 'licencia-osi',
    titulo: 'Licencia OSI elegida',
    detalle: 'Si no eliges ninguna, se aplica Apache 2.0 por defecto.',
  },
  {
    id: 'sin-controlados',
    titulo: 'Sin datos propietarios ni controlados (ITAR/EAR)',
    detalle: 'Trabaja solo con información pública y con derechos claros.',
  },
  {
    id: 'ia-declarada',
    titulo: 'Uso de IA declarado',
    detalle: 'Indica modelos o asistentes usados y su rol en el proyecto.',
  },
  {
    id: 'demo-probado',
    titulo: 'Demo probado',
    detalle: 'Recorre el flujo completo antes de grabar o presentar.',
  },
  {
    id: 'pagina-proyecto',
    titulo: 'Página del proyecto completa',
    detalle: 'Descripción, equipo, enlaces, recursos y demo según el portal oficial.',
  },
  {
    id: 'menores',
    titulo: 'Menores de 18: sin fotos, voces ni imágenes de menores',
    detalle: 'Según las FAQ de participantes: no uses fotos, voces ni imágenes propias o de otros menores.',
  },
];

export const PITCH_SECTIONS = [
  {
    id: 'problema',
    titulo: 'Problema',
    prompt: '¿Qué duele o qué falta entender en el mundo real?',
    seconds: 30,
  },
  {
    id: 'usuario',
    titulo: 'Usuario',
    prompt: '¿Para quién es y qué decisión o aprendizaje le cambia?',
    seconds: 30,
  },
  {
    id: 'datos',
    titulo: 'Datos',
    prompt: '¿Qué datos de la NASA o socias usaste y por qué ese sensor?',
    seconds: 40,
  },
  {
    id: 'demo',
    titulo: 'Demo',
    prompt: 'Muéstralo en vivo: una pregunta, una respuesta, un mapa.',
    seconds: 50,
  },
  {
    id: 'impacto',
    titulo: 'Impacto',
    prompt: '¿Qué cambia después? ¿Cuál es el siguiente paso realista?',
    seconds: 30,
  },
] as const;

export const PITCH_TOTAL_SECONDS = PITCH_SECTIONS.reduce((sum, s) => sum + s.seconds, 0);
