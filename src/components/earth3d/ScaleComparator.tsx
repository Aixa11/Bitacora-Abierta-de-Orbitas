import { useId, useMemo, useState } from 'react';
import {
  SCALE_BALL_DIAMETER_CM,
  SCALE_COMPARE_FUENTE,
  SCALE_TARGETS,
  scaleOrbitalHeight,
  type ScaleTargetId,
} from '../../lib/physics/scaleCompare';

/** Radio visual de la pelota-Tierra en el SVG (unidades de vista). */
const BALL_R = 48;
/** Margen del lienzo. */
const PAD = 16;

function formatCm(cm: number): string {
  if (cm >= 100) {
    const m = cm / 100;
    return m >= 10 ? `${m.toFixed(0)} m` : `${m.toFixed(1)} m`;
  }
  return cm < 10 ? `${cm.toFixed(1)} cm` : `${cm.toFixed(0)} cm`;
}

type ScaleComparatorProps = {
  /** Sin tarjeta propia: va dentro del panel Tierra. */
  embedded?: boolean;
};

export function ScaleComparator({ embedded = false }: ScaleComparatorProps) {
  const [active, setActive] = useState<ScaleTargetId>('iss');
  const titleId = useId();

  const scaled = useMemo(() => {
    const map = {} as Record<
      ScaleTargetId,
      { heightCm: number; fromCenterCm: number }
    >;
    for (const t of SCALE_TARGETS) {
      const r = scaleOrbitalHeight({
        earthBallDiameterCm: SCALE_BALL_DIAMETER_CM,
        altitudeKm: t.altitudeKm,
      });
      map[t.id] = {
        heightCm: r.heightAboveSurfaceCm,
        fromCenterCm: r.distanceFromCenterCm,
      };
    }
    return map;
  }, []);

  const activeTarget = SCALE_TARGETS.find((t) => t.id === active) ?? SCALE_TARGETS[0];
  const activeScale = scaled[active];
  const ballRadiusCm = SCALE_BALL_DIAMETER_CM / 2;

  /**
   * Vista “cerca”: cabe ISS y un poco más.
   * Vista “lejos”: cabe GEO; la Luna se indica fuera de cuadro.
   */
  const viewMode = active === 'iss' ? 'near' : 'far';
  const maxCenterCm =
    viewMode === 'near'
      ? Math.max(scaled.iss.fromCenterCm * 1.8, ballRadiusCm * 1.35)
      : scaled.geo.fromCenterCm * 1.12;

  const pxPerCm = BALL_R / ballRadiusCm;
  const viewW = 220;
  /** Centro de la pelota: órbitas hacia arriba, pelota entera visible. */
  const cy = PAD + maxCenterCm * pxPerCm;
  const viewH = cy + BALL_R + PAD;
  const cx = 72;

  function yForCenterCm(fromCenterCm: number): number {
    return cy - fromCenterCm * pxPerCm;
  }

  const issY = yForCenterCm(scaled.iss.fromCenterCm);
  const geoY = yForCenterCm(scaled.geo.fromCenterCm);
  const lunaOffChart = scaled.luna.fromCenterCm > maxCenterCm;

  return (
    <div className={embedded ? 'px-4 py-3' : 'card-orbit p-4'}>
      <p className="label-mono" id={titleId}>
        / ¿Qué tan lejos está el espacio? /
      </p>
      <p className="mt-1.5 text-sm leading-snug text-[color:var(--orbit-muted)]">
        <strong className="font-semibold text-[color:var(--orbit-text)]">Lo que demuestra:</strong>{' '}
        a escala de pelota ({SCALE_BALL_DIAMETER_CM} cm), la ISS queda a ~1 cm de la Tierra —casi
        pegada— y GEO a casi un metro. Los km engañan; la proporción no.
      </p>
      <p className="mt-1 text-xs text-[color:var(--orbit-muted)]">
        Toca ISS, GEO o Luna.
      </p>

      <div
        className="mt-3 flex flex-wrap gap-2"
        role="radiogroup"
        aria-labelledby={titleId}
      >
        {SCALE_TARGETS.map((t) => {
          const selected = active === t.id;
          return (
            <button
              key={t.id}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => setActive(t.id)}
              className={[
                'btn-orbit-sm font-semibold transition-colors',
                selected ? 'text-[#05050A]' : 'btn-orbit-outline',
              ].join(' ')}
              style={selected ? { background: t.color, boxShadow: 'none' } : undefined}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <div className="mt-3 grid gap-2 sm:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] sm:items-center">
        <div className="relative overflow-hidden rounded-lg border border-[color:var(--orbit-line)] bg-[#080814]">
          <svg
            viewBox={`0 0 ${viewW} ${viewH}`}
            className="mx-auto h-[160px] w-full max-w-[220px] sm:h-[180px]"
            role="img"
            aria-label={`Pelota-Tierra y posición a escala de ${activeTarget.label}`}
          >
            {/* guía vertical */}
            <line
              x1={cx}
              y1={PAD}
              x2={cx}
              y2={cy}
              stroke="rgba(164,160,189,0.25)"
              strokeWidth={1}
              strokeDasharray="3 4"
            />

            {/* órbita GEO (solo vista lejos) */}
            {viewMode === 'far' ? (
              <circle
                cx={cx}
                cy={cy}
                r={scaled.geo.fromCenterCm * pxPerCm}
                fill="none"
                stroke={active === 'geo' ? '#FF8F6B' : 'rgba(255,143,107,0.35)'}
                strokeWidth={active === 'geo' ? 2 : 1}
                strokeDasharray={active === 'geo' ? undefined : '4 5'}
              />
            ) : null}

            {/* órbita ISS */}
            <circle
              cx={cx}
              cy={cy}
              r={scaled.iss.fromCenterCm * pxPerCm}
              fill="none"
              stroke={active === 'iss' ? '#5FE0FF' : 'rgba(95,224,255,0.35)'}
              strokeWidth={active === 'iss' ? 2.5 : 1}
            />

            {/* pelota Tierra */}
            <circle
              cx={cx}
              cy={cy}
              r={BALL_R}
              fill="url(#earthBall)"
              stroke="rgba(95,224,255,0.5)"
              strokeWidth={1.5}
            />
            <text
              x={cx}
              y={cy + 4}
              textAnchor="middle"
              fill="#eceaf6"
              fontSize={9}
              fontFamily="Space Grotesk, sans-serif"
              fontWeight={700}
            >
              Tierra
            </text>
            <text
              x={cx}
              y={cy + 16}
              textAnchor="middle"
              fill="#a4a0bd"
              fontSize={7}
              fontFamily="JetBrains Mono, monospace"
            >
              Ø {SCALE_BALL_DIAMETER_CM} cm
            </text>

            {/* marcador ISS */}
            <OrbitDot
              cx={cx}
              cy={issY}
              color="#5FE0FF"
              active={active === 'iss'}
              label="ISS"
              onSelect={() => setActive('iss')}
            />

            {/* marcador GEO */}
            {viewMode === 'far' ? (
              <OrbitDot
                cx={cx}
                cy={geoY}
                color="#FF8F6B"
                active={active === 'geo'}
                label="GEO"
                onSelect={() => setActive('geo')}
              />
            ) : null}

            {/* Luna fuera de cuadro */}
            {active === 'luna' && lunaOffChart ? (
              <g>
                <path
                  d={`M ${cx} ${PAD + 28} L ${cx} ${PAD + 8}`}
                  stroke="#BAF57D"
                  strokeWidth={2}
                  markerEnd="url(#arrowLuna)"
                />
                <text
                  x={cx + 10}
                  y={PAD + 18}
                  fill="#BAF57D"
                  fontSize={9}
                  fontFamily="Space Grotesk, sans-serif"
                  fontWeight={700}
                >
                  Luna → {formatCm(scaled.luna.heightCm)}
                </text>
              </g>
            ) : null}

            {/* cota de altura activa */}
            {active !== 'luna' || !lunaOffChart ? (
              <g>
                <line
                  x1={cx + BALL_R + 8}
                  y1={cy - BALL_R}
                  x2={cx + BALL_R + 8}
                  y2={yForCenterCm(activeScale.fromCenterCm)}
                  stroke={activeTarget.color}
                  strokeWidth={1.5}
                />
                <text
                  x={cx + BALL_R + 12}
                  y={(cy - BALL_R + yForCenterCm(activeScale.fromCenterCm)) / 2 + 3}
                  fill={activeTarget.color}
                  fontSize={9}
                  fontFamily="JetBrains Mono, monospace"
                >
                  {formatCm(activeScale.heightCm)}
                </text>
              </g>
            ) : null}

            <defs>
              <radialGradient id="earthBall" cx="35%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="55%" stopColor="#1d4ed8" />
                <stop offset="100%" stopColor="#0f172a" />
              </radialGradient>
              <marker
                id="arrowLuna"
                markerWidth="6"
                markerHeight="6"
                refX="3"
                refY="3"
                orient="auto"
              >
                <path d="M0,0 L6,3 L0,6 Z" fill="#BAF57D" />
              </marker>
            </defs>
          </svg>

          {/* zonas táctiles invisibles sobre el SVG (accesibles vía botones de arriba) */}
          <div className="pointer-events-none absolute inset-x-0 bottom-2 text-center font-mono text-[0.65rem] uppercase tracking-[0.18em] text-[color:var(--orbit-muted)]">
            {viewMode === 'near' ? 'Vista cercana' : 'Vista alejada'}
          </div>
        </div>

        <div className="space-y-3" aria-live="polite">
          <p className="font-display text-lg font-bold leading-snug">
            {activeTarget.label}
            <span className="mt-1 block font-sans text-sm font-normal text-[color:var(--orbit-muted)]">
              Altitud real ≈ {activeTarget.altitudeKm.toLocaleString('es')} km
            </span>
          </p>
          <p className="text-sm">
            Sobre la pelota de {SCALE_BALL_DIAMETER_CM} cm queda a{' '}
            <strong style={{ color: activeTarget.color }}>
              {formatCm(activeScale.heightCm)}
            </strong>{' '}
            de la superficie.
          </p>
          <p className="text-sm text-[color:var(--orbit-muted)]">{activeTarget.intuicion}</p>

          {active === 'iss' ? (
            <p className="rounded-lg border border-[color:var(--orbit-line)] bg-[color:var(--orbit-chip)] px-3 py-2 text-xs leading-relaxed">
              Por eso en el globo 3D los satélites LEO parecen pegados al planeta: a escala real
              también lo están. No es un error de dibujo.
            </p>
          ) : null}
          {active === 'geo' ? (
            <p className="rounded-lg border border-[color:var(--orbit-line)] bg-[color:var(--orbit-chip)] px-3 py-2 text-xs leading-relaxed">
              En la maqueta, GEO está unas{' '}
              {Math.round(scaled.geo.heightCm / scaled.iss.heightCm)} veces más alto que la ISS.
              Misma Tierra, otra “altura de trabajo”.
            </p>
          ) : null}
          {active === 'luna' ? (
            <p className="rounded-lg border border-[color:var(--orbit-line)] bg-[color:var(--orbit-chip)] px-3 py-2 text-xs leading-relaxed">
              Si la Tierra es la pelota, la Luna estaría a unos {formatCm(scaled.luna.heightCm)} —
              fuera del recuadro a propósito, para sentir el salto de escala.
            </p>
          ) : null}
        </div>
      </div>

      <p className="mt-2 text-[0.65rem] leading-snug text-[color:var(--orbit-muted)] sm:text-xs">
        Escala lineal · WGS84. {SCALE_COMPARE_FUENTE}
      </p>
    </div>
  );
}

function OrbitDot({
  cx,
  cy,
  color,
  active,
  label,
  onSelect,
}: {
  cx: number;
  cy: number;
  color: string;
  active: boolean;
  label: string;
  onSelect: () => void;
}) {
  const r = active ? 5.5 : 3.5;
  return (
    <g
      role="button"
      tabIndex={0}
      aria-label={`Mostrar escala de ${label}`}
      onClick={onSelect}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onSelect();
        }
      }}
      style={{ cursor: 'pointer' }}
    >
      {/* hit area */}
      <circle cx={cx} cy={cy} r={14} fill="transparent" />
      {active ? (
        <circle cx={cx} cy={cy} r={r + 6} fill={color} opacity={0.22} />
      ) : null}
      <circle cx={cx} cy={cy} r={r} fill={color} stroke="#05050A" strokeWidth={1} />
      <text
        x={cx - 14}
        y={cy + 3}
        textAnchor="end"
        fill={color}
        fontSize={8}
        fontFamily="JetBrains Mono, monospace"
        fontWeight={active ? 700 : 500}
      >
        {label}
      </text>
    </g>
  );
}
