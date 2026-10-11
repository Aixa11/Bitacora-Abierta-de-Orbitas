import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  OrbitControls,
  PerformanceMonitor,
  Stars,
} from '@react-three/drei';
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
  simTime: Date;
  selectedId: string | null;
  onSelect: (sat: HeroSatellite) => void;
  bloom: boolean;
  quality: TextureQuality;
  dayUrl: string | null;
  nightUrl: string | null;
  cloudsUrl: string | null;
  onFpsDrop: () => void;
};

function SceneBody({
  simTime,
  selectedId,
  onSelect,
  bloom,
  dayUrl,
  nightUrl,
  cloudsUrl,
}: Omit<EarthSceneProps, 'quality' | 'onFpsDrop'>) {
  return (
    <>
      <color attach="background" args={['#05050A']} />
      <ambientLight intensity={0.15} />
      <Stars radius={CAMERA_MAX_DISTANCE_KM * 1.2} depth={8000} count={4000} factor={40} fade speed={0.4} />
      {dayUrl && nightUrl ? (
        <Suspense fallback={<EarthGlobeProcedural simTime={simTime} />}>
          <EarthGlobeTextured
            simTime={simTime}
            dayUrl={dayUrl}
            nightUrl={nightUrl}
            cloudsUrl={cloudsUrl}
          />
        </Suspense>
      ) : (
        <EarthGlobeProcedural simTime={simTime} />
      )}
      <Atmosphere />
      <SatellitesLayer simTime={simTime} selectedId={selectedId} onSelect={onSelect} />
      <OrbitControls
        enableDamping
        dampingFactor={0.08}
        minDistance={WGS84_A_KM + CAMERA_MIN_ALTITUDE_KM}
        maxDistance={CAMERA_MAX_DISTANCE_KM}
        rotateSpeed={0.45}
      />
      {bloom ? (
        <EffectComposer>
          <Bloom intensity={0.25} luminanceThreshold={0.85} mipmapBlur />
        </EffectComposer>
      ) : null}
    </>
  );
}

export function EarthScene(props: EarthSceneProps) {
  const [dpr, setDpr] = useState(1.5);

  return (
    <Canvas
      dpr={[1, Math.min(dpr, 2)]}
      camera={{
        position: [0, WGS84_A_KM * 0.4, WGS84_A_KM * 2.6],
        near: 10,
        far: CAMERA_MAX_DISTANCE_KM * 2,
        fov: 42,
      }}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      aria-label="Escena 3D de la Tierra a escala real"
    >
      <PerformanceMonitor
        onDecline={() => {
          setDpr(1);
          props.onFpsDrop();
        }}
        onIncline={() => setDpr(1.75)}
      />
      <SceneBody {...props} />
    </Canvas>
  );
}
