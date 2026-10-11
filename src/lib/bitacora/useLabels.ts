import type {
  Acceso,
  Categoria,
  Legal,
  Nivel,
  Origen,
  TipoHerramienta,
} from '../../content/schema';
import { useI18n } from '../../i18n/useI18n';

/** Etiquetas de facetas de la bitácora según el idioma activo. */
export function useBitacoraLabels() {
  const { t } = useI18n();

  return {
    categoria: {
      explorar: t('labels.categoria.explorar'),
      datos: t('labels.categoria.datos'),
      tematicos: t('labels.categoria.tematicos'),
      procesar: t('labels.categoria.procesar'),
      mapas: t('labels.categoria.mapas'),
      ia: t('labels.categoria.ia'),
      orbitas: t('labels.categoria.orbitas'),
      aprender: t('labels.categoria.aprender'),
    } satisfies Record<Categoria, string>,
    origen: {
      nasa: t('labels.origen.nasa'),
      socia: t('labels.origen.socia'),
      abierto: t('labels.origen.abierto'),
    } satisfies Record<Origen, string>,
    tipo: {
      web: t('labels.tipo.web'),
      api: t('labels.tipo.api'),
      python: t('labels.tipo.python'),
      js: t('labels.tipo.js'),
      escritorio: t('labels.tipo.escritorio'),
      modelo: t('labels.tipo.modelo'),
      agente: t('labels.tipo.agente'),
      servidor: t('labels.tipo.servidor'),
    } satisfies Record<TipoHerramienta, string>,
    acceso: {
      libre: t('labels.acceso.libre'),
      registro: t('labels.acceso.registro'),
      key: t('labels.acceso.key'),
    } satisfies Record<Acceso, string>,
    nivel: {
      ini: t('labels.nivel.ini'),
      int: t('labels.nivel.int'),
      ava: t('labels.nivel.ava'),
    } satisfies Record<Nivel, string>,
    legal: {
      verde: t('labels.legal.verde'),
      amarillo: t('labels.legal.amarillo'),
    } satisfies Record<Legal, string>,
    sort: {
      relevancia: t('labels.sort.relevancia'),
      nombre: t('labels.sort.nombre'),
      nivel: t('labels.sort.nivel'),
    },
    view: {
      tarjetas: t('labels.view.tarjetas'),
      tabla: t('labels.view.tabla'),
    },
  };
}
