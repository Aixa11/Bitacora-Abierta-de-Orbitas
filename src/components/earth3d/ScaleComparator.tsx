import { useMemo } from 'react';
import {
  SCALE_BALL_DIAMETER_CM,
  SCALE_GEO_ALTITUDE_KM,
  SCALE_ISS_ALTITUDE_KM,
  scaleOrbitalHeight,
} from '../../lib/physics/scaleCompare';

export function ScaleComparator() {
  const iss = useMemo(
    () =>
      scaleOrbitalHeight({
        earthBallDiameterCm: SCALE_BALL_DIAMETER_CM,
        altitudeKm: SCALE_ISS_ALTITUDE_KM,
      }),
    [],
  );
  const geo = useMemo(
    () =>
      scaleOrbitalHeight({
        earthBallDiameterCm: SCALE_BALL_DIAMETER_CM,
        altitudeKm: SCALE_GEO_ALTITUDE_KM,
      }),
    [],
  );

  const maxCm = Math.max(geo.heightAboveSurfaceCm, 90);

  return (
    <div className="card-orbit p-4">
      <p className="label-mono">/ Comparador de escala /</p>
      <p className="mt-2 text-sm text-[color:var(--orbit-muted)]">
        Si la Tierra fuera una pelota de {SCALE_BALL_DIAMETER_CM} cm de diámetro…
      </p>
      <div className="mt-4 space-y-3">
        <ScaleBar
          label={`ISS (~${SCALE_ISS_ALTITUDE_KM} km)`}
          cm={iss.heightAboveSurfaceCm}
          maxCm={maxCm}
          color="#5FE0FF"
        />
        <ScaleBar
          label={`GEO (~${SCALE_GEO_ALTITUDE_KM.toLocaleString('es')} km)`}
          cm={geo.heightAboveSurfaceCm}
          maxCm={maxCm}
          color="#FF8F6B"
        />
      </div>
      <p className="mt-3 text-xs text-[color:var(--orbit-muted)]">
        ISS ≈ {iss.heightAboveSurfaceCm.toFixed(1)} cm sobre la pelota · GEO ≈{' '}
        {geo.heightAboveSurfaceCm.toFixed(0)} cm (cálculo con radio ecuatorial WGS84).
      </p>
    </div>
  );
}

function ScaleBar({
  label,
  cm,
  maxCm,
  color,
}: {
  label: string;
  cm: number;
  maxCm: number;
  color: string;
}) {
  const pct = Math.min(100, (cm / maxCm) * 100);
  return (
    <div>
      <div className="mb-1 flex justify-between text-xs">
        <span>{label}</span>
        <span>{cm.toFixed(1)} cm</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-[color:var(--orbit-chip)]">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
    </div>
  );
}
