import { DoubleSide } from 'three';
import { WGS84_A_KM } from '../../lib/physics/constants';

export function Atmosphere({ intensity = 1 }: { intensity?: number }) {
  return (
    <mesh scale={1.045}>
      <sphereGeometry args={[WGS84_A_KM, 48, 48]} />
      <meshBasicMaterial
        color="#3B82F6"
        transparent
        opacity={0.08 * intensity}
        side={DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}
