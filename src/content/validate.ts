import {
  challengesCatalogSchema,
  toolsCatalogSchema,
  type CatalogoValidado,
} from './schema';

function idsDuplicados(ids: string[]): string[] {
  const vistos = new Set<string>();
  const duplicados = new Set<string>();
  for (const id of ids) {
    if (vistos.has(id)) duplicados.add(id);
    vistos.add(id);
  }
  return [...duplicados];
}

export function parseCatalog(toolsRaw: unknown, challengesRaw: unknown): CatalogoValidado {
  const tools = toolsCatalogSchema.parse(toolsRaw);
  const challenges = challengesCatalogSchema.parse(challengesRaw);

  if (tools.total !== tools.herramientas.length) {
    throw new Error(
      `El campo total (${tools.total}) no coincide con ${tools.herramientas.length} herramientas.`,
    );
  }

  const toolIds = tools.herramientas.map((item) => item.id);
  const challengeIds = challenges.desafios.map((item) => item.id);

  const toolsDup = idsDuplicados(toolIds);
  if (toolsDup.length > 0) {
    throw new Error(`Ids de herramientas repetidos: ${toolsDup.join(', ')}`);
  }

  const challengesDup = idsDuplicados(challengeIds);
  if (challengesDup.length > 0) {
    throw new Error(`Ids de desafíos repetidos: ${challengesDup.join(', ')}`);
  }

  const toolIdSet = new Set(toolIds);
  const refsRotas: string[] = [];
  for (const desafio of challenges.desafios) {
    for (const ref of desafio.donde_explorar) {
      if (!toolIdSet.has(ref)) {
        refsRotas.push(`${desafio.id} → ${ref}`);
      }
    }
  }

  if (refsRotas.length > 0) {
    throw new Error(
      `Referencias rotas entre challenges.json y tools.json: ${refsRotas.join('; ')}`,
    );
  }

  return { tools, challenges };
}
