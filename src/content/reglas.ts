export type ReglaItem = {
  letra: string;
  titulo: string;
  cuerpoHtml: string;
};

export const REGLAS_INTRO = {
  titulo: 'Reglas del juego para tus datos',
  kicker: '05 · Uso legal',
  resumen:
    'Resumen de los Términos y Condiciones 2026. Es una guía para orientarte, no asesoramiento legal: ante la duda, prevalece el texto oficial.',
  aviso:
    'Guía orientativa, no asesoramiento legal. Prevalece el texto oficial.',
  enlaces: [
    {
      label: 'Términos y Condiciones 2026',
      url: 'https://www.spaceappschallenge.org/legal/',
    },
    {
      label: 'FAQ de participantes',
      url: 'https://www.spaceappschallenge.org/resources/participant-faqs/',
    },
    {
      label: 'Discusión oficial sobre recursos NASA',
      url: 'https://github.com/nasa/spaceapps/discussions/1550',
    },
  ],
} as const;

export const REGLAS: ReglaItem[] = [
  {
    letra: 'A',
    titulo: 'Usa al menos un recurso de la NASA',
    cuerpoHtml:
      'Cada desafío trae una pestaña de <strong>Resources</strong> con datos de la NASA y de las agencias socias. Según las <a href="https://github.com/nasa/spaceapps/discussions/1550" target="_blank" rel="noopener noreferrer">recomendaciones del equipo de Space Apps</a>, para competir en el juzgamiento global el equipo debe usar al menos un recurso de la NASA.',
  },
  {
    letra: 'B',
    titulo: 'Datos de terceros: libres o con licencia abierta',
    cuerpoHtml:
      'Si usas datos o código que no vienen de la NASA ni de una agencia socia, deben estar <q>disponibles de forma libre y pública sin restricción</q> o tener una licencia de código abierto reconocida por la OSI. Verificarlo es responsabilidad del equipo.',
  },
  {
    letra: 'C',
    titulo: 'Cita todo, incluso lo gratuito',
    cuerpoHtml:
      'Los términos exigen citar <q>cada fuente</q> usada en el proyecto, aunque sea abierta. Si no lo haces, pueden quitarte nominaciones o premios. Por eso <strong>Mi kit</strong> te genera la lista de referencias.',
  },
  {
    letra: 'D',
    titulo: 'Tu código queda abierto',
    cuerpoHtml:
      'Lo que crees debe ser de uso libre o tener una licencia OSI. Si no eliges ninguna, la NASA lo distribuye bajo Apache 2.0. No subas información propietaria ni material del que no tengas los derechos.',
  },
  {
    letra: 'E',
    titulo: 'Nada de información controlada',
    cuerpoHtml:
      'El proyecto no puede contener información sujeta a control de exportaciones (ITAR/EAR). Trabaja solo con datos públicos.',
  },
  {
    letra: 'F',
    titulo: 'IA: transparencia por defecto',
    cuerpoHtml:
      'Los términos y las FAQ 2026 no fijan reglas específicas sobre IA. Como buena práctica, declara qué modelos y asistentes usaste, cítalos como recursos y revisa la licencia de cada modelo antes de usarlo.',
  },
];

export const SEMAFORO = [
  {
    legal: 'verde' as const,
    titulo: 'Verde',
    texto:
      'Datos de la NASA o agencias socias, o recursos con licencia abierta. Úsalos y cítalos.',
  },
  {
    legal: 'amarillo' as const,
    titulo: 'Amarillo',
    texto:
      'Gratis pero con condiciones (uso no comercial, registro o acuerdo). Lee los términos, cítalos y avisa en tu entrega.',
  },
];
