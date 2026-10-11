import { useEffect, useMemo, useState } from 'react';
import { Line } from '@react-three/drei';
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
  simTime: Date;
  selectedId: string | null;
  onSelect: (sat: HeroSatellite) => void;
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

export function SatellitesLayer({ simTime, selectedId, onSelect }: SatellitesLayerProps) {
  const [loaded, setLoaded] = useState<LoadedSat[]>([]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const results: LoadedSat[] = [];
      for (const meta of HERO_SATELLITES) {
        const res = await fetchTle(meta.noradId);
        if (res.status === 'ok') results.push({ meta, tle: res.data });
      }
      if (!cancelled) setLoaded(results);
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <group>
      {loaded.map((item) => (
        <SatelliteMesh
          key={item.meta.noradId}
          item={item}
          simTime={simTime}
          selected={selectedId === item.meta.noradId}
          onSelect={onSelect}
        />
      ))}
    </group>
  );
}

function SatelliteMesh({
  item,
  simTime,
  selected,
  onSelect,
}: {
  item: LoadedSat;
  simTime: Date;
  selected: boolean;
  onSelect: (sat: HeroSatellite) => void;
}) {
  const pos = positionAt(item.tle.satrec, simTime);
  const trackMinute = Math.floor(simTime.getTime() / 60_000);
  const track = useMemo(() => {
    const epoch = new Date(trackMinute * 60_000);
    const pts = groundTrack(item.tle.satrec, epoch, 90);
    return pts.map(([lat, lon]) => latLonAltToVec(lat, lon, 0.2));
  }, [item.tle.satrec, trackMinute]);

  if (!pos) return null;
  const position = latLonAltToVec(pos.lat, pos.lon, pos.altitudeKm);
  const nadir = latLonAltToVec(pos.lat, pos.lon, 0);
  const swath = item.meta.swathKm;

  return (
    <group>
      <Line points={track} color="#FF8F6B" lineWidth={selected ? 2 : 1} transparent opacity={0.7} />
      <Line points={[position, nadir]} color="#5FE0FF" lineWidth={1} transparent opacity={0.5} />
      <mesh
        position={position}
        onClick={(event) => {
          event.stopPropagation();
          onSelect(item.meta);
        }}
      >
        <sphereGeometry args={[selected ? 80 : 50, 12, 12]} />
        <meshBasicMaterial color={selected ? '#5FE0FF' : '#FF8F6B'} />
      </mesh>
      {swath && swath > 0 ? (
        <mesh position={nadir} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[Math.max(swath * 0.35, 20), swath * 0.5, 48]} />
          <meshBasicMaterial color="#5FE0FF" transparent opacity={0.25} side={THREE.DoubleSide} />
        </mesh>
      ) : null}
    </group>
  );
}
