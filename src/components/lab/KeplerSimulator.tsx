import { useMemo, useState } from 'react';
import {
  EARTH_RADIUS_EQUATORIAL_KM,
  EARTH_RADIUS_FUENTE,
  MU_EARTH_FUENTE,
  MU_EARTH_KM3_S2,
} from '../../lib/physics/constants';
import { computeKepler, KEPLER_PRESETS, type KeplerPresetId } from '../../lib/physics/kepler';

export function KeplerSimulator() {
  const [altitudeKm, setAltitudeKm] = useState(420);
  const [inclinationDeg, setInclinationDeg] = useState(51.6);
  const [eccentricity, setEccentricity] = useState(0);

  const out = useMemo(
    () => computeKepler({ altitudeKm, inclinationDeg, eccentricity }),
    [altitudeKm, inclinationDeg, eccentricity],
  );

  function applyPreset(id: KeplerPresetId) {
    const preset = KEPLER_PRESETS.find((item) => item.id === id);
    if (!preset) return;
    setAltitudeKm(preset.altitudeKm);
    setInclinationDeg(preset.inclinationDeg);
    setEccentricity(preset.eccentricity);
  }

  return (
    <section className="card-orbit p-5">
      <p className="label-mono">/ Simulador Kepler /</p>
      <h2 className="mt-2 font-display text-2xl font-bold">Órbita a mano</h2>
      <p className="mt-2 text-sm text-[color:var(--orbit-muted)]">
        Modelo circular educativo: T = 2π√(a³/μ) y v = √(μ/a), con a = R⊕ + h.
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {KEPLER_PRESETS.map((preset) => (
          <button
            key={preset.id}
            type="button"
            onClick={() => applyPreset(preset.id)}
            className="rounded-full border border-[color:var(--orbit-line)] px-3 py-1.5 text-sm"
          >
            {preset.label}
          </button>
        ))}
      </div>

      <div className="mt-5 grid gap-4">
        <label className="grid gap-1 text-sm">
          Altitud ({altitudeKm.toLocaleString('es')} km)
          <input
            type="range"
            min={200}
            max={35786}
            step={10}
            value={altitudeKm}
            onChange={(event) => setAltitudeKm(Number(event.target.value))}
          />
        </label>
        <label className="grid gap-1 text-sm">
          Inclinación ({inclinationDeg.toFixed(1)}°)
          <input
            type="range"
            min={0}
            max={120}
            step={0.1}
            value={inclinationDeg}
            onChange={(event) => setInclinationDeg(Number(event.target.value))}
          />
        </label>
        <label className="grid gap-1 text-sm">
          Excentricidad ({eccentricity.toFixed(2)})
          <input
            type="range"
            min={0}
            max={0.8}
            step={0.01}
            value={eccentricity}
            onChange={(event) => setEccentricity(Number(event.target.value))}
          />
        </label>
      </div>

      <dl className="mt-5 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
        <div className="rounded-2xl border border-[color:var(--orbit-line)] p-3">
          <dt className="label-mono">a</dt>
          <dd className="mt-1 font-display text-xl">{out.semiMajorAxisKm.toFixed(0)} km</dd>
        </div>
        <div className="rounded-2xl border border-[color:var(--orbit-line)] p-3">
          <dt className="label-mono">Periodo</dt>
          <dd className="mt-1 font-display text-xl">{out.periodMin.toFixed(1)} min</dd>
        </div>
        <div className="rounded-2xl border border-[color:var(--orbit-line)] p-3">
          <dt className="label-mono">Velocidad</dt>
          <dd className="mt-1 font-display text-xl">{out.velocityKmS.toFixed(2)} km/s</dd>
        </div>
        <div className="rounded-2xl border border-[color:var(--orbit-line)] p-3">
          <dt className="label-mono">Vueltas/día</dt>
          <dd className="mt-1 font-display text-xl">{out.orbitsPerDay.toFixed(2)}</dd>
        </div>
      </dl>

      <p className="mt-4 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-[color:var(--orbit-muted)]">
        μ = {MU_EARTH_KM3_S2} km³/s² · R⊕ = {EARTH_RADIUS_EQUATORIAL_KM} km
      </p>
      <p className="mt-1 text-xs text-[color:var(--orbit-muted)]">
        Fuentes: {MU_EARTH_FUENTE} · {EARTH_RADIUS_FUENTE}
      </p>
    </section>
  );
}
