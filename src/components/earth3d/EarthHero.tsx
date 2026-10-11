import { lazy, Suspense, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { HeroSatellite } from '../../content/heroSatellites';
import { prefersReducedMotion, supportsWebGL2 } from '../../lib/webgl';
import { EARTH_CREDITS } from './earthCredits';
import { ScaleComparator } from './ScaleComparator';
import { NASA_TEXTURE_COLECCION } from '../../content/nasaTextures';
import {
  earthRemoteProxyUrls,
  earthTextureUrls,
  textureExists,
  type TextureQuality,
} from './texturePaths';

const EarthScene = lazy(async () => {
  const mod = await import('./EarthScene');
  return { default: mod.EarthScene };
});

type Speed = 0 | 1 | 60 | 600;

function StaticFallback({ reason }: { reason: string }) {
  return (
    <div className="flex h-full min-h-[320px] flex-col justify-end bg-[radial-gradient(circle_at_30%_20%,#3B82F6_0%,transparent_35%),radial-gradient(circle_at_70%_60%,#7C3AED_0%,transparent_40%),#05050A] p-6">
      <p className="label-mono">/ Tierra · vista estática /</p>
      <p className="mt-2 max-w-md text-sm text-[color:var(--orbit-muted)]">{reason}</p>
      <p className="mt-4 text-xs text-[color:var(--orbit-muted)]">{EARTH_CREDITS}</p>
    </div>
  );
}

export function EarthHero() {
  /** null = aún no medido (evita cargar Three.js en SSR/tests). */
  const [webgl, setWebgl] = useState<boolean | null>(null);
  const [reduced, setReduced] = useState(false);
  const [speed, setSpeed] = useState<Speed>(1);
  const [simTime, setSimTime] = useState(() => new Date());
  const [selected, setSelected] = useState<HeroSatellite | null>(null);
  const [quality, setQuality] = useState<TextureQuality>('4k');
  const [bloom, setBloom] = useState(true);
  const [dayUrl, setDayUrl] = useState<string | null>(null);
  const [nightUrl, setNightUrl] = useState<string | null>(null);
  const [cloudsUrl, setCloudsUrl] = useState<string | null>(null);
  const [textureNote, setTextureNote] = useState('Buscando texturas NASA…');

  useEffect(() => {
    setWebgl(supportsWebGL2());
    setReduced(prefersReducedMotion());
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function resolveTextures() {
      const local = earthTextureUrls(quality);
      const dayLocal = await textureExists(local.day);
      const nightLocal = await textureExists(local.night);
      const cloudsLocal = await textureExists(local.clouds);
      if (cancelled) return;

      if (dayLocal && nightLocal) {
        setDayUrl(local.day);
        setNightUrl(local.night);
        setCloudsUrl(cloudsLocal ? local.clouds : null);
        setTextureNote(
          `Texturas ${quality} locales (NASA Visible Earth vía npm run textures). ${NASA_TEXTURE_COLECCION}`,
        );
        return;
      }

      // Desarrollo/preview: proxy Vite → eoimages (sin CORS en el host NASA).
      const remote = earthRemoteProxyUrls();
      if (remote.day && remote.night) {
        const dayRemote = await textureExists(remote.day);
        const nightRemote = await textureExists(remote.night);
        const cloudsRemote = remote.clouds ? await textureExists(remote.clouds) : false;
        if (cancelled) return;
        if (dayRemote && nightRemote) {
          setDayUrl(remote.day);
          setNightUrl(remote.night);
          setCloudsUrl(cloudsRemote && remote.clouds ? remote.clouds : null);
          setTextureNote(
            `Texturas NASA en vivo vía proxy (eoimages). En producción corre npm run textures. ${NASA_TEXTURE_COLECCION}`,
          );
          return;
        }
      }

      if (cancelled) return;
      setDayUrl(null);
      setNightUrl(null);
      setCloudsUrl(null);
      setTextureNote(
        'Sin texturas disponibles: Tierra procedural. En local, reinicia Vite o corre npm run textures.',
      );
    }
    void resolveTextures();
    return () => {
      cancelled = true;
    };
  }, [quality]);

  useEffect(() => {
    if (speed === 0 || reduced) return;
    const id = window.setInterval(() => {
      setSimTime((prev) => new Date(prev.getTime() + 1000 * speed));
    }, 1000);
    return () => window.clearInterval(id);
  }, [speed, reduced]);

  const show3d = webgl === true && !reduced;

  return (
    <section className="grid gap-4 lg:grid-cols-[1.4fr_0.8fr]">
      <div className="card-orbit overflow-hidden">
        <div className="relative h-[min(70vh,560px)] min-h-[320px]">
          {webgl === null ? (
            <StaticFallback reason="Preparando vista de la Tierra…" />
          ) : show3d ? (
            <Suspense fallback={<StaticFallback reason="Cargando escena 3D…" />}>
              <EarthScene
                simTime={simTime}
                selectedId={selected?.noradId ?? null}
                onSelect={setSelected}
                bloom={bloom}
                quality={quality}
                dayUrl={dayUrl}
                nightUrl={nightUrl}
                cloudsUrl={cloudsUrl}
                onFpsDrop={() => {
                  setBloom(false);
                  setQuality('2k');
                }}
              />
            </Suspense>
          ) : (
            <StaticFallback
              reason={
                reduced
                  ? 'Preferencia de movimiento reducido activa: mostramos una vista estática equivalente.'
                  : 'Este dispositivo no tiene WebGL2. Puedes usar el laboratorio 2D y el resto de la guía.'
              }
            />
          )}
        </div>
        <div className="flex flex-wrap items-center gap-2 border-t border-[color:var(--orbit-line)] p-3">
          <p className="font-mono text-xs text-[color:var(--orbit-muted)]" aria-live="polite">
            UTC {simTime.toISOString().replace('.000Z', 'Z')}
          </p>
          {([0, 1, 60, 600] as Speed[]).map((value) => (
            <button
              key={value}
              type="button"
              aria-pressed={speed === value}
              onClick={() => setSpeed(value)}
              className={[
                'rounded-full border px-3 py-1 text-xs font-semibold',
                speed === value
                  ? 'border-transparent bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] text-white'
                  : 'border-[color:var(--orbit-line)]',
              ].join(' ')}
            >
              {value === 0 ? 'Pausa' : `×${value}`}
            </button>
          ))}
          <button
            type="button"
            className="rounded-full border border-[color:var(--orbit-line)] px-3 py-1 text-xs"
            onClick={() => setSimTime(new Date())}
          >
            Ahora
          </button>
        </div>
        <p className="px-3 pb-3 text-xs text-[color:var(--orbit-muted)]">
          {textureNote} · {EARTH_CREDITS}
        </p>
      </div>

      <div className="space-y-4">
        <ScaleComparator />
        <div className="card-orbit p-4" aria-live="polite">
          <p className="label-mono">/ Satélite /</p>
          {selected ? (
            <>
              <h3 className="mt-2 font-display text-xl font-bold">{selected.nombre}</h3>
              <p className="mt-1 text-sm text-[color:var(--orbit-muted)]">
                {selected.agencia} · {selected.sensorTipo}
              </p>
              <p className="mt-1 text-sm text-[color:var(--orbit-muted)]">{selected.orbita}</p>
              {selected.swathKm ? (
                <p className="mt-1 text-sm">Barrido ≈ {selected.swathKm} km</p>
              ) : null}
              <div className="mt-3 flex flex-wrap gap-2">
                {selected.bitacoraToolId ? (
                  <Link
                    to={`/bitacora?q=${encodeURIComponent(selected.nombre)}`}
                    className="rounded-full border border-[color:var(--orbit-line)] px-3 py-1.5 text-sm font-semibold"
                  >
                    Ver en la Bitácora
                  </Link>
                ) : null}
                {selected.gibsLayerId ? (
                  <Link
                    to={`/laboratorio`}
                    className="rounded-full bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] px-3 py-1.5 text-sm font-semibold text-white"
                  >
                    Ver qué observa hoy
                  </Link>
                ) : null}
              </div>
            </>
          ) : (
            <p className="mt-2 text-sm text-[color:var(--orbit-muted)]">
              Haz clic en un satélite de la escena para ver misión, agencia y enlaces. Controles
              equivalentes: elige un satélite en el laboratorio 2D.
            </p>
          )}
        </div>
        <p className="text-xs text-[color:var(--orbit-muted)]">
          Unidades: 1 = 1 km. Zoom desde 500 km sobre la superficie hasta la distancia de la Luna
          (384.400 km). NORAD IDs solo los verificados del prototipo.
        </p>
      </div>
    </section>
  );
}
