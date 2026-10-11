import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { WGS84_A_KM, WGS84_B_KM } from '../../lib/physics/constants';
import { sunDirectionEcef } from '../../lib/physics/subsolar';

type TexturedProps = {
  simTime: Date;
  dayUrl: string;
  nightUrl: string;
  cloudsUrl: string | null;
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

export function EarthGlobeTextured({ simTime, dayUrl, nightUrl, cloudsUrl }: TexturedProps) {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const textures = useTexture({
    day: dayUrl,
    night: nightUrl,
    clouds: cloudsUrl ?? dayUrl,
  });

  const uniforms = useMemo(
    () => ({
      uDay: { value: textures.day },
      uNight: { value: textures.night },
      uSunDir: { value: new THREE.Vector3(1, 0, 0) },
      uHasTextures: { value: 1 },
    }),
    [textures],
  );

  useFrame(() => {
    if (!matRef.current) return;
    const [x, y, z] = sunDirectionEcef(simTime);
    matRef.current.uniforms.uSunDir.value.set(x, y, z);
  });

  const scaleY = WGS84_B_KM / WGS84_A_KM;

  return (
    <group scale={[1, scaleY, 1]}>
      <mesh>
        <sphereGeometry args={[WGS84_A_KM, 64, 64]} />
        <shaderMaterial
          ref={matRef}
          uniforms={uniforms}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
        />
      </mesh>
      {cloudsUrl ? (
        <mesh>
          <sphereGeometry args={[WGS84_A_KM * 1.005, 48, 48]} />
          <meshStandardMaterial
            map={textures.clouds}
            transparent
            opacity={0.35}
            depthWrite={false}
          />
        </mesh>
      ) : null}
    </group>
  );
}

export function EarthGlobeProcedural({ simTime }: { simTime: Date }) {
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
    const [x, y, z] = sunDirectionEcef(simTime);
    matRef.current.uniforms.uSunDir.value.set(x, y, z);
  });

  const scaleY = WGS84_B_KM / WGS84_A_KM;

  return (
    <group scale={[1, scaleY, 1]}>
      <mesh>
        <sphereGeometry args={[WGS84_A_KM, 64, 64]} />
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
