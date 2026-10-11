import { describe, expect, it } from 'vitest';
import challengesRaw from './challenges.json';
import toolsRaw from './tools.json';
import { catalogo } from './catalog';
import { parseCatalog } from './validate';

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

describe('validación del catálogo', () => {
  it('acepta seed/tools.json y seed/challenges.json copiados a src/content', () => {
    const parsed = parseCatalog(toolsRaw, challengesRaw);
    expect(parsed.tools.herramientas).toHaveLength(123);
    expect(parsed.challenges.desafios).toHaveLength(14);
    expect(catalogo.tools.total).toBe(123);
  });

  it('falla si hay ids de herramientas repetidos', () => {
    const tools = clone(toolsRaw);
    tools.herramientas[1].id = tools.herramientas[0].id;
    expect(() => parseCatalog(tools, challengesRaw)).toThrow(/Ids de herramientas repetidos/);
  });

  it('falla si hay ids de desafíos repetidos', () => {
    const challenges = clone(challengesRaw);
    challenges.desafios[1].id = challenges.desafios[0].id;
    expect(() => parseCatalog(toolsRaw, challenges)).toThrow(/Ids de desafíos repetidos/);
  });

  it('falla si un desafío apunta a una herramienta inexistente', () => {
    const challenges = clone(challengesRaw);
    challenges.desafios[0].donde_explorar = ['herramienta-que-no-existe'];
    expect(() => parseCatalog(toolsRaw, challenges)).toThrow(/Referencias rotas/);
  });
});
