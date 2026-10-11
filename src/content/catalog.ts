import challengesRaw from './challenges.json';
import toolsRaw from './tools.json';
import { parseCatalog } from './validate';

export const catalogo = parseCatalog(toolsRaw, challengesRaw);

export const herramientas = catalogo.tools.herramientas;
export const desafios = catalogo.challenges.desafios;
export const metodoGeneral = catalogo.challenges.metodo_general;
