import { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { SENSORS, type SensorKind, type SensorRef } from '../../content/sensors';
import { prefersReducedMotion, supportsWebGL2 } from '../../lib/webgl';

const SensorScene = lazy(async () => {
  const mod = await import('./SensorScene');
  return { default: mod.SensorScene };
});

const KIND_LABEL: Record<SensorKind, string> = {
  optico: 'Óptico',
  sar: 'Radar SAR',
  termico: 'Térmico',
  atmosferico: 'Atmosférico',
};

function pickSensor(kind: SensorKind): SensorRef {
  const match = SENSORS.find((s) => s.kind === kind);
  return match ?? SENSORS[0];
}

type SensorSimulatorProps = {
  preferredKind?: SensorKind;
};

export function SensorSimulator({ preferredKind = 'optico' }: SensorSimulatorProps) {
  const [sensorId, setSensorId] = useState(() => pickSensor(preferredKind).id);
  const [clouds, setClouds] = useState(false);
  const [night, setNight] = useState(false);
  const [webgl, setWebgl] = useState<boolean | null>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setWebgl(supportsWebGL2());
    setReduced(prefersReducedMotion());
  }, []);

  useEffect(() => {
    setSensorId(pickSensor(preferredKind).id);
  }, [preferredKind]);

  const sensor = useMemo(
    () => SENSORS.find((s) => s.id === sensorId) ?? SENSORS[0],
    [sensorId],
  );

  const blocked = clouds && !sensor.atraviesaNubes;
  const darkOk = !night || sensor.funcionaDeNoche;
  const show3d = webgl === true && !reduced;

  return (
    <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="card-orbit overflow-hidden">
        <div className="relative h-[min(55vh,420px)] min-h-[280px]">
          {webgl === null ? (
            <div className="grid h-full place-items-center text-sm text-[color:var(--orbit-muted)]">
              Preparando simulador…
            </div>
          ) : show3d ? (
            <Suspense
              fallback={
                <div className="grid h-full place-items-center text-sm text-[color:var(--orbit-muted)]">
                  Cargando simulador 3D…
                </div>
              }
            >
              <SensorScene sensor={sensor} clouds={clouds} night={night} />
            </Suspense>
          ) : (
            <div className="flex h-full flex-col justify-end bg-[radial-gradient(circle_at_40%_30%,#3B82F6_0%,transparent_40%),#05050A] p-6">
              <p className="label-mono">/ Vista equivalente /</p>
              <p className="mt-2 text-sm text-[color:var(--orbit-muted)]">
                {reduced
                  ? 'Movimiento reducido activo: usamos controles y resumen textual.'
                  : 'Sin WebGL2: el resumen de abajo describe la geometría y las condiciones.'}
              </p>
            </div>
          )}
        </div>
        <p className="border-t border-[color:var(--orbit-line)] px-4 py-2 text-xs text-[color:var(--orbit-muted)]">
          Simulación educativa genérica. No implementa el entregable de un desafío.
        </p>
      </div>

      <div className="space-y-4">
        <div className="card-orbit p-4">
          <p className="label-mono">/ Sensor /</p>
          <label className="mt-3 block text-sm">
            <span className="text-[color:var(--orbit-muted)]">Elige un sensor</span>
            <select
              className="mt-1 w-full rounded-2xl border border-[color:var(--orbit-line)] bg-[color:var(--orbit-bg)] px-3 py-2"
              value={sensor.id}
              onChange={(e) => setSensorId(e.target.value)}
            >
              {SENSORS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.nombre} · {KIND_LABEL[s.kind]}
                </option>
              ))}
            </select>
          </label>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              aria-pressed={clouds}
              onClick={() => setClouds((v) => !v)}
              className={[
                'rounded-full border px-3 py-1.5 text-sm font-semibold',
                clouds
                  ? 'border-transparent bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] text-white'
                  : 'border-[color:var(--orbit-line)]',
              ].join(' ')}
            >
              Nubes {clouds ? 'on' : 'off'}
            </button>
            <button
              type="button"
              aria-pressed={night}
              onClick={() => setNight((v) => !v)}
              className={[
                'rounded-full border px-3 py-1.5 text-sm font-semibold',
                night
                  ? 'border-transparent bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] text-white'
                  : 'border-[color:var(--orbit-line)]',
              ].join(' ')}
            >
              Noche {night ? 'on' : 'off'}
            </button>
          </div>
        </div>

        <div className="card-orbit p-4" aria-live="polite">
          <p className="label-mono">/ Lectura /</p>
          <h3 className="mt-2 font-display text-xl font-bold">{sensor.nombre}</h3>
          <ul className="mt-3 space-y-2 text-sm text-[color:var(--orbit-muted)]">
            <li>
              Geometría: {sensor.geometria === 'lateral' ? 'vista lateral (típica SAR)' : 'nadir'}
            </li>
            <li>Barrido aproximado: {sensor.swathKm.toLocaleString('es')} km</li>
            <li>
              Resolución:{' '}
              {sensor.resolucionM != null
                ? `~${sensor.resolucionM} m (píxel de ejemplo en la escena)`
                : 'TODO: confirmar resolución en ficha oficial'}
            </li>
            <li>
              Nubes:{' '}
              {blocked
                ? 'bloqueo visible (sensor óptico / no atraviesa)'
                : sensor.atraviesaNubes
                  ? 'atraviesa (SAR)'
                  : 'sin nubes en la escena'}
            </li>
            <li>
              Día/noche:{' '}
              {darkOk
                ? night
                  ? 'sigue operando de noche'
                  : 'condiciones diurnas'
                : 'limitado de noche (necesita luz solar)'}
            </li>
          </ul>
          <p className="mt-3 text-xs text-[color:var(--orbit-muted)]">
            Fuente del barrido:{' '}
            <a href={sensor.fuente} className="underline" target="_blank" rel="noreferrer">
              ficha de misión
            </a>
          </p>
          {sensor.gibsLayerId ? (
            <Link
              to="/laboratorio"
              className="mt-4 inline-flex rounded-full bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] px-4 py-2 text-sm font-semibold text-white"
            >
              Ver en el laboratorio
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}
