export type ArranquePaso = {
  id: string;
  minutos: number;
  titulo: string;
  detalle: string;
  enlace?: { to: string; label: string };
};

export type TrabadoNodo = {
  id: string;
  pregunta: string;
  pistas: string[];
  enlaces: Array<{ to: string; label: string }>;
};

export const ARRANQUE_30: ArranquePaso[] = [
  {
    id: 'cuentas',
    minutos: 8,
    titulo: 'Cuentas y accesos',
    detalle:
      'Crea Earthdata Login si vas a bajar datos EOSDIS/ASF. Confirma GitHub del equipo y un canal de chat. Anota quién guarda las claves (nunca en el repo público).',
    enlace: { to: '/ayuda#estudio', label: 'Ver Earthdata Login' },
  },
  {
    id: 'desafio',
    minutos: 7,
    titulo: 'Elegir y leer el desafío',
    detalle:
      'Lee el resumen en español y el enunciado oficial. Marca tipo, dificultad y entrega esperada. No diseñes la app todavía: formula la pregunta GEOINT.',
    enlace: { to: '/desafios', label: 'Ir a desafíos' },
  },
  {
    id: 'roles',
    minutos: 5,
    titulo: 'Roles y alcance mínimo',
    detalle:
      'Asigna datos, desarrollo, diseño, narrativa y coordinación. Acordad qué es el demo mínimo del domingo.',
    enlace: { to: '/equipo', label: 'Plan del equipo' },
  },
  {
    id: 'kit',
    minutos: 5,
    titulo: 'Kit inicial de fuentes',
    detalle:
      'Agrega 3–5 herramientas a Mi kit (una de la NASA al menos). Exporta un borrador de referencias aunque aún esté incompleto.',
    enlace: { to: '/bitacora?origen=nasa', label: 'Bitácora · origen NASA' },
  },
  {
    id: 'mundo',
    minutos: 5,
    titulo: 'Un caso del mundo real',
    detalle:
      'Abre el explorador de fenómenos, elige uno cercano a tu tema y míralo en el laboratorio o sensores. Anota qué ves y qué no puedes afirmar.',
    enlace: { to: '/ayuda#mundo', label: 'Explorar el mundo' },
  },
];

export const TRABADO_NODOS: TrabadoNodo[] = [
  {
    id: 'no-se-sensor',
    pregunta: 'No sé qué sensor o dato mirar',
    pistas: [
      'Parte del fenómeno (fuego, agua, vegetación, aire, ciudad, órbita), no de la app.',
      'Pregunta si necesitas atravesar nubes o trabajar de noche.',
      'Usa el selector de sensores y el explorador del mundo.',
    ],
    enlaces: [
      { to: '/sensores', label: 'Sensores' },
      { to: '/ayuda#mundo', label: 'Explorar el mundo' },
    ],
  },
  {
    id: 'no-encuentro-datos',
    pregunta: 'No encuentro los datos',
    pistas: [
      'Revisa si hace falta cuenta (Earthdata) o clave API.',
      'Busca en la Bitácora por acceso: libre / registro / key.',
      'Lee Entry Points si tu tema no es solo Tierra.',
    ],
    enlaces: [
      { to: '/bitacora?acceso=libre', label: 'Bitácora · sin registro' },
      { to: '/ayuda#estudio', label: 'Estudio NASA' },
    ],
  },
  {
    id: 'mapa-vacio',
    pregunta: 'El mapa o la capa no se ve',
    pistas: [
      'Prueba otra fecha (hoy menos 2 días en GIBS).',
      'Baja la opacidad o cambia a color verdadero.',
      'Si no hay WebGL, usa el laboratorio 2D.',
    ],
    enlaces: [
      { to: '/laboratorio', label: 'Laboratorio' },
      { to: '/ayuda#estudio', label: 'Docs GIBS' },
    ],
  },
  {
    id: 'pitch-flojo',
    pregunta: 'No sé cómo contar la idea',
    pistas: [
      'Estructura: problema → usuario → datos → demo → impacto.',
      'Usa la plantilla de pitch y el temporizador de entrega.',
      'Cita en voz alta al menos una fuente NASA.',
    ],
    enlaces: [
      { to: '/entrega', label: 'Entrega y pitch' },
      { to: '/ayuda#plantillas', label: 'Plantillas' },
    ],
  },
  {
    id: 'alcance',
    pregunta: 'Se nos fue el alcance',
    pistas: [
      'Recorten a una pregunta, un lugar y un demo de 3 minutos.',
      'Miren el cronómetro de 48 h y muevan tareas a “después del domingo”.',
      'La coordinación manda sobre features nuevas.',
    ],
    enlaces: [
      { to: '/equipo', label: 'Equipo y reloj' },
      { to: '/ruta', label: 'Ruta del dato' },
    ],
  },
];

export const ACCESO_GUIA = [
  {
    id: 'libre',
    titulo: 'Sin registro',
    texto: 'Puedes explorar ya (Worldview, GIBS, muchos portales). Ideal para las primeras horas.',
    bitacora: '/bitacora?acceso=libre',
  },
  {
    id: 'registro',
    titulo: 'Cuenta gratuita',
    texto: 'Earthdata Login, Copernicus Browser, etc. Créala antes del evento.',
    bitacora: '/bitacora?acceso=registro',
  },
  {
    id: 'key',
    titulo: 'Clave API',
    texto: 'FIRMS y otras APIs piden una key gratuita. Guárdala fuera del repo público.',
    bitacora: '/bitacora?acceso=key',
  },
] as const;
