import { Suspense, useCallback, useRef, useState, type MutableRefObject } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerformanceMonitor, Stars } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import {
  CAMERA_MAX_DISTANCE_KM,
  CAMERA_MIN_ALTITUDE_KM,
  WGS84_A_KM,
} from '../../lib/physics/constants';
import type { HeroSatellite } from '../../content/heroSatellites';
import { Atmosphere } from './Atmosphere';
import { EarthGlobeProcedural, EarthGlobeTextured } from './EarthGlobe';
import { SatellitesLayer } from './SatellitesLayer';
import { EARTH_CREDITS } from './earthCredits';
import type { TextureQuality } from './texturePaths';

export { EARTH_CREDITS };

type EarthSceneProps = {
  simTimeMsRef: MutableRefObject<number>;
  selectedId: string | null;
  onSelect: (sat: HeroSatellite) => void;
  bloom: boolean;
  quality: TextureQuality;
  dayUrl: string | null;
  nightUrl: string | null;
  cloudsUrl: string | null;
  /** Solo baja DPR/Bloom; no toca la calidad elegida por el usuario. */
  onFpsDrop: () => void;
  onSatStatus?: (message: string) => void;
};

function SceneBody({
  simTimeMsRef,
  selectedId,
  onSelect,
  bloom,
  quality,
  dayUrl,
  nightUrl,
  cloudsUrl,
  onSatStatus,
}: Omit<EarthSceneProps, 'onFpsDrop'>) {
  const segments = quality === '4k' ? 64 : 48;

  return (
    <>
      <color attach="background" args={['#05050A']} />
      <ambientLight intensity={0.18} />
      <Stars
        radius={CAMERA_MAX_DISTANCE_KM * 1.1}
        depth={6000}
        count={1600}
        factor={36}
        fade
        speed={0.2}
      />
      {dayUrl && nightUrl ? (
        <Suspense fallback={<EarthGlobeProcedural simTimeMsRef={simTimeMsRef} segments={segments} />}>
          <EarthGlobeTextured
            key={`globe-${quality}-${dayUrl}-${nightUrl}-${cloudsUrl ?? 'noclouds'}`}
            simTimeMsRef={simTimeMsRef}
            dayUrl={dayUrl}
            nightUrl={nightUrl}
            cloudsUrl={cloudsUrl}
            quality={quality}
            segments={segments}
          />
        </Suspense>
      ) : (
        <EarthGlobeProcedural simTimeMsRef={simTimeMsRef} segments={segments} />
      )}
      <Atmosphere />
      <SatellitesLayer
        simTimeMsRef={simTimeMsRef}
        selectedId={selectedId}
        onSelect={onSelect}
        onStatus={onSatStatus}
      />
      <OrbitControls
        makeDefault
        enableDamping
        dampingFactor={0.1}
        minDistance={WGS84_A_KM + CAMERA_MIN_ALTITUDE_KM}
        maxDistance={CAMERA_MAX_DISTANCE_KM}
        rotateSpeed={0.5}
        zoomSpeed={0.85}
      />
      {bloom ? (
        <EffectComposer multisampling={0}>
          <Bloom intensity={0.2} luminanceThreshold={0.9} mipmapBlur />
        </EffectComposer>
      ) : null}
    </>
  );
}

export function EarthScene(props: EarthSceneProps) {
  const [dpr, setDpr] = useState(1.25);
  /** Evita cascadas de onDecline al cargar texturas pesadas. */
  const declineCooldownRef = useRef(0);

  const onDecline = useCallback(() => {
    const now = performance.now();
    if (now < declineCooldownRef.current) return;
    declineCooldownRef.current = now + 4000;
    setDpr(1);
    props.onFpsDrop();
  }, [props]);

  return (
    <Canvas
      className="h-full w-full touch-none"
      dpr={[1, Math.min(dpr, props.quality === '4k' ? 1.75 : 1.5)]}
      camera={{
        position: [0, WGS84_A_KM * 0.35, WGS84_A_KM * 2.4],
        near: 20,
        far: CAMERA_MAX_DISTANCE_KM * 2,
        fov: 42,
      }}
      gl={{
        antialias: props.quality === '4k',
        powerPreference: 'high-performance',
        alpha: false,
      }}
      frameloop="always"
      aria-label="Escena 3D de la Tierra a escala real"
    >
      <PerformanceMonitor
        onDecline={onDecline}
        onIncline={() => setDpr(props.quality === '4k' ? 1.6 : 1.35)}
      />
      <SceneBody {...props} />
    </Canvas>
  );
}
