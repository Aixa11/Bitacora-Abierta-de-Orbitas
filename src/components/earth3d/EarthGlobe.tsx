import { useLayoutEffect, useMemo, useRef, type MutableRefObject } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { WGS84_A_KM, WGS84_B_KM } from '../../lib/physics/constants';
import { sunDirectionEcef } from '../../lib/physics/subsolar';
import { applyTextureQuality } from './limitTextureSize';
import type { TextureQuality } from './texturePaths';

type TexturedProps = {
  /** Reloj de simulación (ms); se lee cada frame para el terminador. */
  simTimeMsRef: MutableRefObject<number>;
  dayUrl: string;
  nightUrl: string;
  cloudsUrl: string | null;
  quality: TextureQuality;
  segments?: number;
};

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vNormalW;
  void main() {
    vUv = uv;
    vNormalW = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform sampler2D uDay;
  uniform sampler2D uNight;
  uniform vec3 uSunDir;
  uniform float uHasTextures;
  varying vec2 vUv;
  varying vec3 vNormalW;
  void main() {
    float ndotl = dot(normalize(vNormalW), normalize(uSunDir));
    float f = smoothstep(-0.08, 0.12, ndotl);
    vec3 dayCol;
    vec3 nightCol;
    if (uHasTextures > 0.5) {
      dayCol = texture2D(uDay, vUv).rgb;
      nightCol = texture2D(uNight, vUv).rgb * 1.4;
    } else {
      dayCol = mix(vec3(0.05, 0.18, 0.45), vec3(0.15, 0.45, 0.22), smoothstep(0.35, 0.55, vUv.y));
      nightCol = vec3(0.02, 0.03, 0.08) + vec3(0.35, 0.28, 0.1) * step(0.93, fract(vUv.x * 48.0 + vUv.y * 18.0));
    }
    vec3 color = mix(nightCol, dayCol, f);
    gl_FragColor = vec4(color, 1.0);
  }
`;

export function EarthGlobeTextured({
  simTimeMsRef,
  dayUrl,
  nightUrl,
  cloudsUrl,
  quality,
  segments = 48,
}: TexturedProps) {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const cloudsMatRef = useRef<THREE.MeshBasicMaterial>(null);
  const raw = useTexture({
    day: dayUrl,
    night: nightUrl,
    clouds: cloudsUrl ?? dayUrl,
  });

  const day = useMemo(() => applyTextureQuality(raw.day, quality), [raw.day, quality]);
  const night = useMemo(() => applyTextureQuality(raw.night, quality), [raw.night, quality]);
  const clouds = useMemo(
    () => (cloudsUrl ? applyTextureQuality(raw.clouds, quality) : null),
    [raw.clouds, cloudsUrl, quality],
  );

  const uniforms = useMemo(
    () => ({
      uDay: { value: day },
      uNight: { value: night },
      uSunDir: { value: new THREE.Vector3(1, 0, 0) },
      uHasTextures: { value: 1 },
    }),
    [day, night],
  );

  useLayoutEffect(() => {
    if (!matRef.current) return;
    matRef.current.uniforms.uDay.value = day;
    matRef.current.uniforms.uNight.value = night;
  }, [day, night]);

  useLayoutEffect(() => {
    if (cloudsMatRef.current && clouds) {
      cloudsMatRef.current.map = clouds;
      cloudsMatRef.current.needsUpdate = true;
    }
  }, [clouds]);

  useFrame(() => {
    if (!matRef.current) return;
    const [x, y, z] = sunDirectionEcef(new Date(simTimeMsRef.current));
    matRef.current.uniforms.uSunDir.value.set(x, y, z);
  });

  const scaleY = WGS84_B_KM / WGS84_A_KM;

  return (
    <group scale={[1, scaleY, 1]}>
      <mesh>
        <sphereGeometry args={[WGS84_A_KM, segments, segments]} />
        <shaderMaterial
          ref={matRef}
          uniforms={uniforms}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
        />
      </mesh>
      {cloudsUrl && clouds ? (
        <mesh>
          <sphereGeometry
            args={[WGS84_A_KM * 1.005, Math.min(segments, 40), Math.min(segments, 40)]}
          />
          <meshBasicMaterial
            ref={cloudsMatRef}
            map={clouds}
            transparent
            opacity={0.32}
            depthWrite={false}
          />
        </mesh>
      ) : null}
    </group>
  );
}

export function EarthGlobeProcedural({
  simTimeMsRef,
  segments = 48,
}: {
  simTimeMsRef: MutableRefObject<number>;
  segments?: number;
}) {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({
      uDay: { value: null },
      uNight: { value: null },
      uSunDir: { value: new THREE.Vector3(1, 0, 0) },
      uHasTextures: { value: 0 },
    }),
    [],
  );

  useFrame(() => {
    if (!matRef.current) return;
    const [x, y, z] = sunDirectionEcef(new Date(simTimeMsRef.current));
    matRef.current.uniforms.uSunDir.value.set(x, y, z);
  });

  const scaleY = WGS84_B_KM / WGS84_A_KM;

  return (
    <group scale={[1, scaleY, 1]}>
      <mesh>
        <sphereGeometry args={[WGS84_A_KM, segments, segments]} />
        <shaderMaterial
          ref={matRef}
          uniforms={uniforms}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
        />
      </mesh>
    </group>
  );
}
