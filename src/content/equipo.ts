export type RolEquipo = {
  id: string;
  nombre: string;
  descripcion: string;
  checklist: string[];
};

export type HitoCronograma = {
  id: string;
  titulo: string;
  dia: 'sabado' | 'domingo';
  horaSugerida: string;
  detalle: string;
};

export const ROLES_EQUIPO: RolEquipo[] = [
  {
    id: 'datos',
    nombre: 'Datos',
    descripcion: 'Encuentra, descarga y valida los datasets. Cuida CRS, fechas y licencias.',
    checklist: [
      'Cuenta Earthdata lista (si aplica)',
      'AOI y fechas documentados',
      'Datos citados en Mi kit',
    ],
  },
  {
    id: 'desarrollo',
    nombre: 'Desarrollo',
    descripcion: 'Convierte el análisis en una demo usable: notebook, mapa o app.',
    checklist: [
      'Repo limpio y reproducible',
      'Demo corre sin magia local',
      'Licencia OSI declarada',
    ],
  },
  {
    id: 'diseno',
    nombre: 'Diseño',
    descripcion: 'Claridad visual: mapa legible, jerarquía y accesibilidad básica.',
    checklist: [
      'Una conclusión visible en 30 s',
      'Contraste y tipografía legibles',
      'Capturas listas para la página',
    ],
  },
  {
    id: 'narrativa',
    nombre: 'Narrativa / pitch',
    descripcion: 'Cuenta la historia: problema → usuario → datos → demo → impacto.',
    checklist: [
      'Guion de 3 minutos',
      'Pitch ensayado con temporizador',
      'Fuentes mencionadas en voz alta',
    ],
  },
  {
    id: 'coordinacion',
    nombre: 'Coordinación',
    descripcion: 'Reloj, alcance y entrega. Recorta lo que no cabe en 48 horas.',
    checklist: [
      'Alcance mínimo acordado',
      'Hitos del domingo visibles',
      'Entrega antes de las 23:59 hora local',
    ],
  },
];

export const HITOS_DEFAULT: HitoCronograma[] = [
  {
    id: 'idea',
    titulo: 'Idea cerrada',
    dia: 'sabado',
    horaSugerida: '11:00',
    detalle: 'Pregunta GEOINT y alcance mínimo acordados.',
  },
  {
    id: 'datos',
    titulo: 'Datos listos',
    dia: 'sabado',
    horaSugerida: '16:00',
    detalle: 'Escenas/productos descargados o accesibles, con citas.',
  },
  {
    id: 'prototipo',
    titulo: 'Prototipo',
    dia: 'domingo',
    horaSugerida: '12:00',
    detalle: 'Demo que responde la pregunta sin explicaciones largas.',
  },
  {
    id: 'video',
    titulo: 'Video / demo',
    dia: 'domingo',
    horaSugerida: '18:00',
    detalle: 'Grabación o ensayo final del pitch.',
  },
  {
    id: 'entrega',
    titulo: 'Entrega',
    dia: 'domingo',
    horaSugerida: '23:59',
    detalle: 'Envío antes de las 23:59 hora local del domingo 15 de noviembre de 2026.',
  },
];

export type TaskStatus = 'por-hacer' | 'en-curso' | 'hecho';

export type TaskItem = {
  id: string;
  titulo: string;
  estado: TaskStatus;
  rolId: string | null;
};
