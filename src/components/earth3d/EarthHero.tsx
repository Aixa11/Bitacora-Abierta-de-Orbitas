import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import type { HeroSatellite } from '../../content/heroSatellites';
import { useI18n } from '../../i18n/useI18n';
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
    <div className="flex h-full min-h-[240px] flex-col justify-end bg-[radial-gradient(circle_at_30%_20%,#3B82F6_0%,transparent_35%),radial-gradient(circle_at_70%_60%,#7C3AED_0%,transparent_40%),#05050A] p-5">
      <p className="label-mono">/ Tierra · vista estática /</p>
      <p className="mt-2 max-w-md text-sm text-[color:var(--orbit-muted)]">{reason}</p>
      <p className="mt-3 text-xs text-[color:var(--orbit-muted)]">{EARTH_CREDITS}</p>
    </div>
  );
}

export function EarthHero() {
  const { t } = useI18n();
  /** null = aún no medido (evita cargar Three.js en SSR/tests). */
  const [webgl, setWebgl] = useState<boolean | null>(null);
  const [reduced, setReduced] = useState(false);
  const [speed, setSpeed] = useState<Speed>(1);
  const speedRef = useRef<Speed>(1);
  const simTimeMsRef = useRef(Date.now());
  const [displayTime, setDisplayTime] = useState(() => new Date());
  const [selected, setSelected] = useState<HeroSatellite | null>(null);
  const [quality, setQuality] = useState<TextureQuality>('2k');
  const qualityManualRef = useRef(false);
  const [bloom, setBloom] = useState(false);
  const [dayUrl, setDayUrl] = useState<string | null>(null);
  const [nightUrl, setNightUrl] = useState<string | null>(null);
  const [cloudsUrl, setCloudsUrl] = useState<string | null>(null);
  const [textureNote, setTextureNote] = useState('Buscando texturas NASA…');
  const [satStatus, setSatStatus] = useState('Preparando satélites…');

  const onSatStatus = useCallback((message: string) => {
    setSatStatus(message);
  }, []);

  useEffect(() => {
    setWebgl(supportsWebGL2());
    setReduced(prefersReducedMotion());
  }, []);

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    let last = performance.now();
    let lastUi = 0;

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const spd = speedRef.current;
      if (spd > 0) {
        simTimeMsRef.current += dt * 1000 * spd;
      }
      const uiEvery = spd >= 60 ? 100 : 250;
      if (now - lastUi > uiEvery) {
        lastUi = now;
        setDisplayTime(new Date(simTimeMsRef.current));
      }
      raf = window.requestAnimationFrame(tick);
    };

    raf = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(raf);
  }, [reduced]);

  useEffect(() => {
    let cancelled = false;
    async function resolveTextures() {
      const local = earthTextureUrls(quality);
      const [dayLocal, nightLocal, cloudsLocal] = await Promise.all([
        textureExists(local.day),
        textureExists(local.night),
        textureExists(local.clouds),
      ]);
      if (cancelled) return;

      if (dayLocal && nightLocal) {
        setDayUrl(local.day);
        setNightUrl(local.night);
        setCloudsUrl(cloudsLocal ? local.clouds : null);
        setTextureNote(
          `Texturas ${quality} locales · NASA Visible Earth. ${NASA_TEXTURE_COLECCION}`,
        );
        return;
      }

      if (quality === '4k') {
        const local2k = earthTextureUrls('2k');
        const [d2, n2, c2] = await Promise.all([
          textureExists(local2k.day),
          textureExists(local2k.night),
          textureExists(local2k.clouds),
        ]);
        if (cancelled) return;
        if (d2 && n2) {
          setDayUrl(local2k.day);
          setNightUrl(local2k.night);
          setCloudsUrl(c2 ? local2k.clouds : null);
          setTextureNote(`Sin WebP 4k: usando 2k + muestreo 4k. ${NASA_TEXTURE_COLECCION}`);
          return;
        }
      }

      const remote = earthRemoteProxyUrls();
      if (remote.day && remote.night) {
        const [dayRemote, nightRemote, cloudsRemote] = await Promise.all([
          textureExists(remote.day),
          textureExists(remote.night),
          remote.clouds ? textureExists(remote.clouds) : Promise.resolve(false),
        ]);
        if (cancelled) return;
        if (dayRemote && nightRemote) {
          setDayUrl(remote.day);
          setNightUrl(remote.night);
          setCloudsUrl(cloudsRemote && remote.clouds ? remote.clouds : null);
          setTextureNote(
            `NASA vía proxy · calidad ${quality}. Producción: npm run textures. ${NASA_TEXTURE_COLECCION}`,
          );
          return;
        }
      }

      if (cancelled) return;
      setDayUrl(null);
      setNightUrl(null);
      setCloudsUrl(null);
      setTextureNote('Sin texturas: Tierra procedural. Reinicia Vite o corre npm run textures.');
    }
    void resolveTextures();
    return () => {
      cancelled = true;
    };
  }, [quality]);

  const show3d = webgl === true && !reduced;

  function setSpeedNow(value: Speed) {
    speedRef.current = value;
    setSpeed(value);
    setDisplayTime(new Date(simTimeMsRef.current));
  }

  function jumpToNow() {
    const now = Date.now();
    simTimeMsRef.current = now;
    speedRef.current = 1;
    setSpeed(1);
    setDisplayTime(new Date(now));
  }

  function toggleQuality() {
    qualityManualRef.current = true;
    setQuality((q) => (q === '2k' ? '4k' : '2k'));
  }

  return (
    <section
      aria-labelledby="hero-tierra-titulo"
      className="card-orbit overflow-hidden"
    >
      <header className="flex flex-wrap items-end justify-between gap-2 border-b border-[color:var(--orbit-line)] px-4 py-3 sm:px-5">
        <div>
          <p className="label-mono">{t('home.earthEyebrow')}</p>
          <h2 id="hero-tierra-titulo" className="mt-0.5 font-display text-xl font-bold sm:text-2xl">
            {t('home.earthTitle')}
          </h2>
        </div>
        <Link
          to="/laboratorio"
          className="text-sm font-semibold underline underline-offset-2"
        >
          {t('home.earthLabLink')}
        </Link>
      </header>

      <div className="grid lg:grid-cols-[minmax(0,1.45fr)_minmax(16rem,0.9fr)] lg:items-stretch">
        {/* Columna 3D: el canvas crece y evita hueco bajo los créditos */}
        <div className="flex min-h-0 flex-col lg:border-r lg:border-[color:var(--orbit-line)]">
          <div className="relative aspect-[5/4] w-full bg-[#05050A] lg:aspect-auto lg:min-h-[22rem] lg:flex-1">
            <div className="absolute inset-0">
              {webgl === null ? (
                <StaticFallback reason="Preparando vista de la Tierra…" />
              ) : show3d ? (
                <Suspense fallback={<StaticFallback reason="Cargando escena 3D…" />}>
                  <EarthScene
                    simTimeMsRef={simTimeMsRef}
                    selectedId={selected?.noradId ?? null}
                    onSelect={setSelected}
                    bloom={bloom}
                    quality={quality}
                    dayUrl={dayUrl}
                    nightUrl={nightUrl}
                    cloudsUrl={cloudsUrl}
                    onSatStatus={onSatStatus}
                    onFpsDrop={() => {
                      setBloom(false);
                      if (!qualityManualRef.current) {
                        setQuality('2k');
                      }
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
          </div>

          <div className="shrink-0 border-t border-[color:var(--orbit-line)] bg-[color:var(--orbit-surface)]">
            <div className="flex flex-wrap items-center gap-1.5 px-3 py-2.5 sm:gap-2 sm:px-4">
              <p
                className="font-mono text-[0.7rem] text-[color:var(--orbit-muted)] sm:text-xs"
                aria-live="polite"
              >
                UTC {displayTime.toISOString().replace(/\.\d{3}Z$/, 'Z')}
              </p>
              {([0, 1, 60, 600] as Speed[]).map((value) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={speed === value}
                  onClick={() => setSpeedNow(value)}
                  className={[
                    'btn-orbit-sm',
                    speed === value ? 'btn-orbit-primary' : 'btn-orbit-outline',
                  ].join(' ')}
                >
                  {value === 0 ? 'Pausa' : `×${value}`}
                </button>
              ))}
              <button
                type="button"
                className="btn-orbit-sm btn-orbit-outline"
                onClick={jumpToNow}
                title="Saltar al instante actual y volver a ×1"
              >
                Ahora
              </button>
              <button
                type="button"
                className={['btn-orbit-sm', bloom ? 'btn-orbit-primary' : 'btn-orbit-outline'].join(' ')}
                aria-pressed={bloom}
                onClick={() => setBloom((v) => !v)}
              >
                Bloom {bloom ? 'on' : 'off'}
              </button>
              <button
                type="button"
                className={[
                  'btn-orbit-sm',
                  quality === '4k' ? 'btn-orbit-primary' : 'btn-orbit-outline',
                ].join(' ')}
                aria-pressed={quality === '4k'}
                onClick={toggleQuality}
                title="Alterna resolución de textura (2k ↔ 4k)"
              >
                Texturas {quality}
              </button>
            </div>
            <div className="space-y-0.5 border-t border-[color:var(--orbit-line)] px-3 py-2 sm:px-4">
              <p className="text-[0.7rem] text-orbit-aqua sm:text-xs" aria-live="polite">
                {satStatus}
              </p>
              <p className="line-clamp-2 text-[0.65rem] leading-snug text-[color:var(--orbit-muted)] sm:text-xs">
                {textureNote} · {EARTH_CREDITS}
              </p>
            </div>
          </div>
        </div>

        {/* Columna lateral: sin tarjetas anidadas */}
        <aside className="flex min-h-0 flex-col divide-y divide-[color:var(--orbit-line)] bg-[color:var(--orbit-surface)]">
          <ScaleComparator embedded />
          <div className="px-4 py-3" aria-live="polite">
            <p className="label-mono">/ Satélite /</p>
            {selected ? (
              <>
                <h3 className="mt-1.5 font-display text-lg font-bold">{selected.nombre}</h3>
                <p className="mt-1 text-sm text-[color:var(--orbit-muted)]">
                  {selected.agencia} · {selected.sensorTipo}
                </p>
                <p className="mt-0.5 text-sm text-[color:var(--orbit-muted)]">{selected.orbita}</p>
                {selected.swathKm ? (
                  <p className="mt-0.5 text-sm">Barrido ≈ {selected.swathKm} km</p>
                ) : null}
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {selected.bitacoraToolId ? (
                    <Link
                      to={`/bitacora?q=${encodeURIComponent(selected.nombre)}`}
                      className="btn-orbit-md btn-orbit-outline"
                    >
                      Ver en la Bitácora
                    </Link>
                  ) : null}
                  {selected.gibsLayerId ? (
                    <Link
                      to="/laboratorio"
                      className="rounded-full bg-gradient-to-r from-orbit-violet to-orbit-blue px-3 py-1.5 text-sm font-semibold text-white"
                    >
                      Ver qué observa hoy
                    </Link>
                  ) : null}
                </div>
              </>
            ) : (
              <p className="mt-1.5 text-sm text-[color:var(--orbit-muted)]">
                Los puntos coral son satélites. Haz clic en uno para ver misión y enlaces.
              </p>
            )}
          </div>
          <p className="px-4 py-2.5 text-[0.65rem] leading-snug text-[color:var(--orbit-muted)] sm:text-xs">
            Unidades: 1 = 1 km. Si va lento, texturas 2k y Bloom off. NORAD verificados del
            prototipo.
          </p>
        </aside>
      </div>
    </section>
  );
}
