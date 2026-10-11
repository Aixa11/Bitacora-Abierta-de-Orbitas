/**
 * Contenido del webinar. Edita `fechaLabel` cuando se confirme la fecha.
 * Fuentes de enlaces: PROMPT.md / reference/index.html.
 */

export type TalkAgendaItem = {
  id: string;
  titulo: string;
  minutos: number;
  resumen: string;
};

export type TalkSection = {
  id: string;
  titulo: string;
  cuerpo: string;
};

export const TALK = {
  titulo: 'Del satélite a tu proyecto: GEOINT, datos abiertos y una sorpresa en órbita',
  /** TODO humano: confirmar fecha del webinar. */
  fechaLabel: 'Fecha a confirmar',
  duracionMin: 60,
  preguntasMin: 15,
  formato: 'Virtual · en español',
  evento: 'NASA Space Apps Chiclayo · abierto a participantes de todo el mundo',
  descripcion:
    'Una charla de 60 minutos que recorre qué es la inteligencia geoespacial, casos reales de todo el mundo y una demostración práctica de cómo buscar, descargar y usar datos abiertos para los desafíos del hackatón. Esta bitácora es el material de apoyo.',
  speaker: {
    nombre: 'Aixa Benitez',
    rol: 'Directora GEOINT · Mentora NASA Space Apps · Órbitas',
    linkedin: 'https://www.linkedin.com/in/aixabenitez98/',
    instagram: 'https://www.instagram.com/benitezaixa/',
  },
  agenda: [
    {
      id: 'geoint',
      titulo: 'Qué es GEOINT',
      minutos: 10,
      resumen: 'Inteligencia geoespacial: contexto, preguntas y el papel de los satélites.',
    },
    {
      id: 'casos',
      titulo: 'Casos globales',
      minutos: 7,
      resumen: 'Ejemplos reales donde los datos espaciales cambian decisiones en tierra.',
    },
    {
      id: 'datos',
      titulo: 'Datos abiertos en la práctica',
      minutos: 23,
      resumen: 'Cómo explorar, elegir y citar fuentes abiertas sin inventar la rueda.',
    },
    {
      id: 'sorpresa',
      titulo: 'Sorpresa en órbita',
      minutos: 5,
      resumen: 'Un cierre vivo: algo en órbita que conecta con tu proyecto.',
    },
    {
      id: 'preguntas',
      titulo: 'Preguntas',
      minutos: 15,
      resumen: 'Espacio para dudas del equipo y del público.',
    },
  ] satisfies TalkAgendaItem[],
  seccionesPresentacion: [
    {
      id: 'portada',
      titulo: 'Portada',
      cuerpo:
        'Del satélite a tu proyecto. GEOINT, datos abiertos y una sorpresa en órbita. Material de apoyo: esta Bitácora.',
    },
    {
      id: 'geoint',
      titulo: 'GEOINT en 10 minutos',
      cuerpo:
        'La inteligencia geoespacial une ubicación, sensores y contexto. No es solo un mapa: es una pregunta con coordenadas, una fuente y una decisión.',
    },
    {
      id: 'casos',
      titulo: 'Casos globales',
      cuerpo:
        'Incendios, inundaciones, océanos, aire y ciudades. Cada tema pide un sensor distinto. El selector de sensores y el laboratorio te ayudan a explorar sin cerrar la idea.',
    },
    {
      id: 'datos',
      titulo: 'Datos abiertos',
      cuerpo:
        'NASA GIBS, EONET, CelesTrak, catálogos STAC y más. Cita la fuente, respeta el semáforo legal y arma tu kit. Las ideas del desafío son de tu equipo.',
    },
    {
      id: 'sorpresa',
      titulo: 'Sorpresa en órbita',
      cuerpo:
        'Cierre en vivo. Mientras tanto, prueba el hero 3D y el laboratorio: escala real, órbitas y capas del día.',
    },
    {
      id: 'cierre',
      titulo: 'Preguntas y siguiente paso',
      cuerpo:
        'Elige un desafío, arma el equipo, guarda tu kit y ensaya el pitch. Esta guía no resuelve el hackatón: te acompaña a pensarlo.',
    },
  ] satisfies TalkSection[],
} as const;
