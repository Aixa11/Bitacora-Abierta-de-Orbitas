import { useEffect, useMemo, useRef, useState, type MutableRefObject } from 'react';
import { Line } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { HERO_SATELLITES, type HeroSatellite } from '../../content/heroSatellites';
import {
  fetchTle,
  groundTrack,
  positionAt,
  type ParsedTle,
} from '../../lib/api/celestrak';
import { WGS84_A_KM } from '../../lib/physics/constants';

type SatellitesLayerProps = {
  /** Reloj de simulación en ms (epoch); se lee cada frame sin re-render. */
  simTimeMsRef: MutableRefObject<number>;
  selectedId: string | null;
  onSelect: (sat: HeroSatellite) => void;
  onStatus?: (message: string) => void;
};

type LoadedSat = {
  meta: HeroSatellite;
  tle: ParsedTle;
};

function latLonAltToVec(lat: number, lon: number, altKm: number): THREE.Vector3 {
  const latR = (lat * Math.PI) / 180;
  const lonR = (lon * Math.PI) / 180;
  const r = WGS84_A_KM + altKm;
  return new THREE.Vector3(
    r * Math.cos(latR) * Math.cos(lonR),
    r * Math.sin(latR),
    r * Math.cos(latR) * Math.sin(lonR),
  );
}

export function SatellitesLayer({
  simTimeMsRef,
  selectedId,
  onSelect,
  onStatus,
}: SatellitesLayerProps) {
  const [loaded, setLoaded] = useState<LoadedSat[]>([]);

  useEffect(() => {
    let cancelled = false;
    onStatus?.('Cargando TLE desde CelesTrak…');

    async function load() {
      const results = await Promise.all(
        HERO_SATELLITES.map(async (meta) => {
          const res = await fetchTle(meta.noradId);
          return res.status === 'ok' ? ({ meta, tle: res.data } satisfies LoadedSat) : null;
        }),
      );
      if (cancelled) return;
      const ok = results.filter((item): item is LoadedSat => item !== null);
      setLoaded(ok);
      if (ok.length === 0) {
        onStatus?.(
          'No se pudieron cargar satélites. Revisa red, /proxy/celestrak o la copia local de TLE.',
        );
        return;
      }
      const live = ok.filter((s) => s.tle.source === 'celestrak' || s.tle.source === 'ariss').length;
      const fallback = ok.length - live;
      if (fallback > 0 && live === 0) {
        onStatus?.(
          `${ok.length} satélites con TLE de respaldo (CelesTrak no alcanzable; SGP4 local).`,
        );
      } else if (fallback > 0) {
        onStatus?.(`${live} en vivo + ${fallback} respaldo · SGP4.`);
      } else if (ok.length < HERO_SATELLITES.length) {
        onStatus?.(`${ok.length}/${HERO_SATELLITES.length} satélites con TLE activo.`);
      } else {
        onStatus?.(`${ok.length} satélites en órbita (SGP4 · CelesTrak).`);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [onStatus]);

  return (
    <group>
      {loaded.map((item) => (
        <SatelliteMesh
          key={item.meta.noradId}
          item={item}
          simTimeMsRef={simTimeMsRef}
          selected={selectedId === item.meta.noradId}
          showTrack={selectedId === item.meta.noradId}
          onSelect={onSelect}
        />
      ))}
    </group>
  );
}

function SatelliteMesh({
  item,
  simTimeMsRef,
  selected,
  showTrack,
  onSelect,
}: {
  item: LoadedSat;
  simTimeMsRef: MutableRefObject<number>;
  selected: boolean;
  showTrack: boolean;
  onSelect: (sat: HeroSatellite) => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const nadirRef = useRef<THREE.Mesh>(null);
  const lastTrackBucket = useRef(-1);
  const [trackBucket, setTrackBucket] = useState(0);

  const track = useMemo(() => {
    if (!showTrack) return [] as THREE.Vector3[];
    const epoch = new Date(simTimeMsRef.current);
    return groundTrack(item.tle.satrec, epoch, 40).map(([lat, lon]) =>
      latLonAltToVec(lat, lon, 0.2),
    );
  }, [item.tle.satrec, showTrack, trackBucket, simTimeMsRef]);

  useFrame(({ camera }) => {
    const date = new Date(simTimeMsRef.current);
    const pos = positionAt(item.tle.satrec, date);
    if (!pos || !meshRef.current) return;

    const position = latLonAltToVec(pos.lat, pos.lon, pos.altitudeKm);
    meshRef.current.position.copy(position);

    if (nadirRef.current) {
      nadirRef.current.position.copy(latLonAltToVec(pos.lat, pos.lon, 0));
    }

    const dist = camera.position.distanceTo(position);
    const radius = Math.max(90, Math.min(dist * 0.014, 560));
    meshRef.current.scale.setScalar(radius / 80);

    if (showTrack) {
      const bucket = Math.floor(simTimeMsRef.current / (5 * 60_000));
      if (bucket !== lastTrackBucket.current) {
        lastTrackBucket.current = bucket;
        setTrackBucket(bucket);
      }
    }
  });

  return (
    <group>
      {showTrack && track.length > 1 ? (
        <Line points={track} color="#FF8F6B" lineWidth={2} transparent opacity={0.75} />
      ) : null}
      <mesh
        ref={meshRef}
        onClick={(event) => {
          event.stopPropagation();
          onSelect(item.meta);
        }}
      >
        <sphereGeometry args={[80, 10, 10]} />
        <meshBasicMaterial color={selected ? '#5FE0FF' : '#FF8F6B'} />
      </mesh>
      {item.meta.swathKm && item.meta.swathKm > 0 ? (
        <mesh ref={nadirRef} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry
            args={[Math.max(item.meta.swathKm * 0.35, 20), item.meta.swathKm * 0.5, 32]}
          />
          <meshBasicMaterial color="#5FE0FF" transparent opacity={0.2} side={THREE.DoubleSide} />
        </mesh>
      ) : null}
    </group>
  );
}
