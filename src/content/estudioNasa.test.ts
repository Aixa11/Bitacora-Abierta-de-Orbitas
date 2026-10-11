import { describe, expect, it } from 'vitest';
import { herramientas } from './catalog';
import { ESTUDIO_NASA } from './estudioNasa';
import { EXPLORADOR_MUNDOS } from './exploradorMundos';
import { desafios } from './catalog';
import { GIBS_LAYERS } from './gibsLayers';
import { SENSOR_TOPICS } from './sensorTopics';

describe('estudio y explorador', () => {
  it('cada documento de estudio apunta a un toolId existente', () => {
    const ids = new Set(herramientas.map((h) => h.id));
    for (const doc of ESTUDIO_NASA) {
      expect(ids.has(doc.toolId), doc.toolId).toBe(true);
    }
  });

  it('cada mundo referencia desafíos, capas y temas válidos', () => {
    const desafioIds = new Set(desafios.map((d) => d.id));
    const gibsIds = new Set(GIBS_LAYERS.map((l) => l.id));
    const topicIds = new Set(SENSOR_TOPICS.map((t) => t.id));
    const estudioIds = new Set(ESTUDIO_NASA.map((e) => e.id));

    for (const mundo of EXPLORADOR_MUNDOS) {
      for (const id of mundo.desafioIds) {
        expect(desafioIds.has(id), id).toBe(true);
      }
      if (mundo.gibsLayerId) {
        expect(gibsIds.has(mundo.gibsLayerId), mundo.gibsLayerId).toBe(true);
      }
      if (mundo.sensorTopicId) {
        expect(topicIds.has(mundo.sensorTopicId), mundo.sensorTopicId).toBe(true);
      }
      for (const id of mundo.estudioIds) {
        expect(estudioIds.has(id), id).toBe(true);
      }
    }
  });
});
