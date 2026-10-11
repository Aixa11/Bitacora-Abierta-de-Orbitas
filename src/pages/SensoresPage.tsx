import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { SensorSimulator } from '../components/sensors3d/SensorSimulator';
import { SENSOR_TOPICS } from '../content/sensorTopics';
import { SENSORS, type SensorKind } from '../content/sensors';

function kindToSensorId(kind: SensorKind): string {
  const found = SENSORS.find((s) => s.kind === kind);
  return found?.id ?? SENSORS[0].id;
}

export function SensoresPage() {
  const [topicId, setTopicId] = useState(SENSOR_TOPICS[0]?.id ?? 'incendios');
  const topic = useMemo(
    () => SENSOR_TOPICS.find((t) => t.id === topicId) ?? SENSOR_TOPICS[0],
    [topicId],
  );

  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <p className="label-mono">/ Sensores /</p>
        <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
          ¿Qué quieres observar?
        </h1>
        <p className="max-w-2xl text-[color:var(--orbit-muted)]">
          Elige un tema: te sugerimos un tipo de sensor y puedes explorar la geometría, el barrido,
          las nubes y el día/noche en una escena 3D educativa. No resuelve un desafío: te ayuda a
          pensar qué dato conviene.
        </p>
      </header>

      <section aria-label="Temas de observación">
        <div className="flex flex-wrap gap-2">
          {SENSOR_TOPICS.map((t) => (
            <button
              key={t.id}
              type="button"
              aria-pressed={t.id === topicId}
              onClick={() => setTopicId(t.id)}
              className={[
                'rounded-full border px-4 py-2 text-sm font-semibold transition-colors',
                t.id === topicId
                  ? 'border-transparent bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] text-white'
                  : 'border-[color:var(--orbit-line)] text-[color:var(--orbit-muted)] hover:text-[color:var(--orbit-text)]',
              ].join(' ')}
            >
              {t.titulo}
            </button>
          ))}
        </div>

        {topic ? (
          <article className="card-orbit mt-4 p-5" aria-live="polite">
            <p className="label-mono">/ {topic.sensorLabel} /</p>
            <h2 className="mt-2 font-display text-2xl font-bold">{topic.titulo}</h2>
            <p className="mt-2 max-w-prose text-[color:var(--orbit-muted)]">{topic.why}</p>
            <p className="mt-3 text-sm text-[color:var(--orbit-muted)]">
              Herramientas de partida:{' '}
              {topic.toolNames.map((name, i) => (
                <span key={name}>
                  {i > 0 ? ' · ' : null}
                  <Link
                    to={`/bitacora?q=${encodeURIComponent(name)}`}
                    className="underline decoration-[color:var(--orbit-line)] underline-offset-2"
                  >
                    {name}
                  </Link>
                </span>
              ))}
            </p>
            {topic.gibsLayerId ? (
              <Link
                to="/laboratorio"
                className="mt-4 inline-flex rounded-full border border-[color:var(--orbit-line)] px-4 py-2 text-sm font-semibold"
              >
                Ver capa relacionada en el laboratorio
              </Link>
            ) : null}
          </article>
        ) : null}
      </section>

      <section aria-label="Simulador 3D de sensores">
        <h2 className="mb-4 font-display text-2xl font-bold">Simulador de sensores</h2>
        <SensorSimulator preferredKind={topic?.kind ?? 'optico'} key={kindToSensorId(topic?.kind ?? 'optico')} />
      </section>
    </div>
  );
}
