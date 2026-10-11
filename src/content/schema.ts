import { z } from 'zod';

export const origenSchema = z.enum(['nasa', 'socia', 'abierto']);
export const categoriaSchema = z.enum([
  'explorar',
  'datos',
  'tematicos',
  'procesar',
  'mapas',
  'ia',
  'orbitas',
  'aprender',
]);
export const tipoHerramientaSchema = z.enum([
  'web',
  'api',
  'python',
  'js',
  'escritorio',
  'modelo',
  'agente',
  'servidor',
]);
export const accesoSchema = z.enum(['libre', 'registro', 'key']);
export const nivelSchema = z.enum(['ini', 'int', 'ava']);
export const legalSchema = z.enum(['verde', 'amarillo']);

export const herramientaSchema = z.object({
  id: z.string().min(1),
  nombre: z.string().min(1),
  organizacion: z.string().min(1),
  origen: origenSchema,
  categoria: categoriaSchema,
  tipo: tipoHerramientaSchema,
  acceso: accesoSchema,
  nivel: nivelSchema,
  legal: legalSchema,
  descripcion: z.string().min(1),
  url: z.string().url(),
  snippet: z.string().nullable(),
});

export const toolsCatalogSchema = z.object({
  version: z.string().min(1),
  total: z.number().int().positive(),
  leyenda: z.object({
    origen: z.array(origenSchema),
    categoria: z.array(categoriaSchema),
    tipo: z.array(tipoHerramientaSchema),
    acceso: z.array(accesoSchema),
    nivel: z.array(nivelSchema),
    legal: z.array(legalSchema),
  }),
  herramientas: z.array(herramientaSchema).min(1),
});

export const metodoPasoSchema = z.object({
  paso: z.string().min(1),
  pregunta: z.string().min(1),
});

export const desafioSchema = z.object({
  id: z.string().min(1),
  titulo: z.string().min(1),
  titulo_es: z.string().min(1),
  url: z.string().url(),
  dificultad: z.array(z.string().min(1)).min(1),
  temas: z.array(z.string().min(1)).min(1),
  tipo: z.string().min(1),
  resumen_es: z.string().min(1),
  preguntas_guia: z.array(z.string().min(1)).min(1),
  conceptos_para_aprender: z.array(z.string().min(1)).min(1),
  donde_explorar: z.array(z.string().min(1)).min(1),
  perfiles_utiles: z.array(z.string().min(1)).min(1),
  trampas: z.array(z.string().min(1)).min(1),
  autoevaluacion: z.array(z.string().min(1)).min(1),
  recursos_oficiales: z.array(z.string()).optional().default([]),
});

export const challengesCatalogSchema = z.object({
  version: z.string().min(1),
  fuente: z.string().url(),
  estado: z.string().min(1),
  regla_editorial: z.string().min(1),
  metodo_general: z.array(metodoPasoSchema).length(7),
  desafios: z.array(desafioSchema).min(1),
});

export type Origen = z.infer<typeof origenSchema>;
export type Categoria = z.infer<typeof categoriaSchema>;
export type TipoHerramienta = z.infer<typeof tipoHerramientaSchema>;
export type Acceso = z.infer<typeof accesoSchema>;
export type Nivel = z.infer<typeof nivelSchema>;
export type Legal = z.infer<typeof legalSchema>;
export type Herramienta = z.infer<typeof herramientaSchema>;
export type ToolsCatalog = z.infer<typeof toolsCatalogSchema>;
export type Desafio = z.infer<typeof desafioSchema>;
export type ChallengesCatalog = z.infer<typeof challengesCatalogSchema>;

export type CatalogoValidado = {
  tools: ToolsCatalog;
  challenges: ChallengesCatalog;
};
