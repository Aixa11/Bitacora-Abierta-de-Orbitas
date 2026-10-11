import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid } from '@react-three/drei';
import type { SensorRef } from '../../content/sensors';

type SensorSceneProps = {
  sensor: SensorRef;
  clouds: boolean;
  night: boolean;
};

export function SensorScene({ sensor, clouds, night }: SensorSceneProps) {
  const swath = Math.min(sensor.swathKm, 800) / 40;
  const blocked = clouds && !sensor.atraviesaNubes;
  const darkOk = !night || sensor.funcionaDeNoche;
  const lateral = sensor.geometria === 'lateral';
  const pixel = sensor.resolucionM ? Math.max(sensor.resolucionM / 40, 0.15) : 0.4;

  return (
    <Canvas camera={{ position: [8, 6, 10], fov: 42 }} dpr={[1, 1.75]}>
      <color attach="background" args={[night ? '#05050A' : '#0b1220']} />
      <ambientLight intensity={night ? 0.15 : 0.55} />
      <directionalLight position={night ? [-6, 2, -4] : [6, 8, 4]} intensity={night ? 0.2 : 1.1} />
      <Grid
        args={[40, 40]}
        cellSize={1}
        cellColor="#334155"
        sectionColor="#64748b"
        fadeDistance={40}
        position={[0, 0, 0]}
      />
      {/* Terreno */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[24, 24]} />
        <meshStandardMaterial color={night ? '#111827' : '#1f4d3a'} />
      </mesh>
      {/* Nubes */}
      {clouds ? (
        <mesh position={[0, 2.2, 0]}>
          <boxGeometry args={[14, 0.4, 10]} />
          <meshStandardMaterial color="#cbd5e1" transparent opacity={0.55} />
        </mesh>
      ) : null}
      {/* Satélite */}
      <mesh position={lateral ? [4, 5.5, 0] : [0, 6, 0]}>
        <boxGeometry args={[0.8, 0.35, 0.8]} />
        <meshStandardMaterial color="#FF8F6B" />
      </mesh>
      {/* Cono / barrido */}
      <mesh
        position={lateral ? [2, 2.8, 0] : [0, 3, 0]}
        rotation={lateral ? [0, 0, -0.5] : [0, 0, 0]}
      >
        <coneGeometry args={[swath * 0.35, 5.5, 24, 1, true]} />
        <meshStandardMaterial
          color={blocked || !darkOk ? '#ef4444' : '#5FE0FF'}
          transparent
          opacity={0.28}
          wireframe
        />
      </mesh>
      {/* Huella en suelo */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[lateral ? -1 : 0, 0.03, 0]}>
        <circleGeometry args={[swath * 0.35, 48]} />
        <meshBasicMaterial
          color={blocked || !darkOk ? '#ef4444' : '#BAF57D'}
          transparent
          opacity={0.35}
        />
      </mesh>
      {/* Píxel de resolución */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[3, 0.05, 3]}>
        <planeGeometry args={[pixel, pixel]} />
        <meshBasicMaterial color="#f8fafc" />
      </mesh>
      <OrbitControls enableDamping />
    </Canvas>
  );
}
