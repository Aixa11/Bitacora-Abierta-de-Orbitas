import { GLOSSARY, type GlossaryTerm } from '../../content/glossary';
import { stripAccents } from '../text';

/** Enlaza un concepto libre a un término del glosario si hay coincidencia clara. */
export function matchGlossaryTerm(concepto: string): GlossaryTerm | null {
  const needle = stripAccents(concepto);
  if (!needle) return null;

  const exact = GLOSSARY.find((term) => {
    const termNorm = stripAccents(term.termino);
    return (
      needle === termNorm ||
      needle.includes(termNorm) ||
      termNorm.includes(needle)
    );
  });
  if (exact) return exact;

  // Coincidencias por palabra clave frecuente en los desafíos
  const aliases: Array<{ pattern: RegExp; id: string }> = [
    { pattern: /\bstac\b/, id: 'stac' },
    { pattern: /\bcog\b|geotiff/, id: 'cog' },
    { pattern: /\bndvi\b/, id: 'ndvi' },
    { pattern: /\bsar\b|radar/, id: 'sar' },
    { pattern: /\btle\b/, id: 'tle' },
    { pattern: /\bnetcdf\b|\bhdf\b|\bzarr\b/, id: 'netcdf' },
    { pattern: /series temporales/, id: 'resolucion-temporal' },
    { pattern: /efemerides|efemérides/, id: 'periodo-orbital' },
    { pattern: /sonificacion|sonificación/, id: 'bandas' },
  ];

  for (const alias of aliases) {
    if (alias.pattern.test(needle)) {
      return GLOSSARY.find((term) => term.id === alias.id) ?? null;
    }
  }

  return null;
}
