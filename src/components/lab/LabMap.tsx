import { useEffect, useMemo, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  defaultGibsDate,
  gibsTileUrl,
  GIBS_LAYERS,
  maxGibsDate,
  type GibsLayer,
} from '../../content/gibsLayers';
import { LAB_SATELLITES } from '../../content/satellites';
import {
  fetchTle,
  groundTrack,
  positionAt,
  predictPasses,
  splitTrackAntDateline,
  type PassPrediction,
  type SatPosition,
} from '../../lib/api/celestrak';
import {
  EONET_CATEGORY_COLORS,
  fetchEonetEvents,
  mapEonetEvents,
  type MappedEonetEvent,
} from '../../lib/api/eonet';
import { BASEMAP_ATTRIBUTION, basemapTileUrl } from '../../lib/maps/basemap';
import { usePreferences } from '../../store/preferences';

function findLayer(id: string): GibsLayer {
  return GIBS_LAYERS.find((layer) => layer.id === id) ?? GIBS_LAYERS[1];
}

type LabMapProps = {
  onGibsExampleUrlChange?: (url: string) => void;
};

export function LabMap({ onGibsExampleUrlChange }: LabMapProps) {
  const theme = usePreferences((state) => state.theme);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapObj = useRef<L.Map | null>(null);
  const baseRef = useRef<L.TileLayer | null>(null);
  const gibsARef = useRef<L.TileLayer | null>(null);
  const gibsBRef = useRef<L.TileLayer | null>(null);
  const eonetGroupRef = useRef<L.LayerGroup | null>(null);
  const satGroupRef = useRef<L.LayerGroup | null>(null);
  const satTimerRef = useRef<number | null>(null);
  const leftPaneRef = useRef<HTMLElement | null>(null);

  const [layerId, setLayerId] = useState('VIIRS_SNPP_CorrectedReflectance_TrueColor');
  const [dateA, setDateA] = useState(defaultGibsDate);
  const [dateB, setDateB] = useState(() => {
    const d = new Date(Date.now() - 10 * 86_400_000);
    return d.toISOString().slice(0, 10);
  });
  const [compare, setCompare] = useState(false);
  const [curtain, setCurtain] = useState(50);
  const [opacity, setOpacity] = useState(0.9);
  const [eonetOn, setEonetOn] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [events, setEvents] = useState<MappedEonetEvent[]>([]);
  const [eonetStatus, setEonetStatus] = useState('Cargando EONET…');
  const [eonetError, setEonetError] = useState<string | null>(null);
  const [noradId, setNoradId] = useState('');
  const [satStatus, setSatStatus] = useState<string | null>(null);
  const [satPos, setSatPos] = useState<SatPosition | null>(null);
  const [satName, setSatName] = useState<string | null>(null);
  const [passes, setPasses] = useState<PassPrediction[]>([]);
  const [observer, setObserver] = useState<{ lat: number; lon: number } | null>(null);
  const [geoStatus, setGeoStatus] = useState<string | null>(null);

  const layer = findLayer(layerId);
  const maxDate = maxGibsDate();

  const gibsExampleUrl = useMemo(
    () => gibsTileUrl(layer, layer.fixedDate ?? dateA).replace('{z}/{y}/{x}', '4/5/6'),
    [layer, dateA],
  );

  useEffect(() => {
    onGibsExampleUrlChange?.(gibsExampleUrl);
  }, [gibsExampleUrl, onGibsExampleUrlChange]);

  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    for (const ev of events) {
      counts.set(ev.categoryId, (counts.get(ev.categoryId) ?? 0) + 1);
    }
    return [...counts.entries()].sort((a, b) => b[1] - a[1]);
  }, [events]);

  const visibleEvents = useMemo(
    () => (categoryFilter === 'all' ? events : events.filter((ev) => ev.categoryId === categoryFilter)),
    [events, categoryFilter],
  );

  // Init map once
  useEffect(() => {
    if (!mapRef.current || mapObj.current) return;
    const map = L.map(mapRef.current, {
      worldCopyJump: true,
      minZoom: 2,
      zoomControl: true,
    }).setView([-8, -70], 3);

    const leftPane = map.createPane('gibsLeft');
    leftPane.style.zIndex = '350';
    leftPaneRef.current = leftPane;

    eonetGroupRef.current = L.layerGroup().addTo(map);
    satGroupRef.current = L.layerGroup().addTo(map);
    mapObj.current = map;

    return () => {
      if (satTimerRef.current) window.clearInterval(satTimerRef.current);
      map.remove();
      mapObj.current = null;
    };
  }, []);

  // Base map theme (sin API key: Esri World Gray Canvas)
  useEffect(() => {
    const map = mapObj.current;
    if (!map) return;
    if (baseRef.current) map.removeLayer(baseRef.current);
    baseRef.current = L.tileLayer(basemapTileUrl(theme), {
      maxZoom: 16,
      attribution: BASEMAP_ATTRIBUTION,
    }).addTo(map);
    baseRef.current.bringToBack();
  }, [theme]);

  // GIBS layers + curtain
  useEffect(() => {
    const map = mapObj.current;
    if (!map) return;
    if (gibsARef.current) map.removeLayer(gibsARef.current);
    if (gibsBRef.current) map.removeLayer(gibsBRef.current);

    const opacityA = layer.isImagery ? opacity : Math.min(opacity, 0.85);
    gibsARef.current = L.tileLayer(gibsTileUrl(layer, dateA), {
      maxNativeZoom: layer.level,
      maxZoom: 12,
      opacity: opacityA,
      attribution: 'NASA GIBS / EOSDIS',
      bounds: [
        [-85.0511, -180],
        [85.0511, 180],
      ],
      pane: compare ? 'gibsLeft' : 'tilePane',
    }).addTo(map);

    if (compare && !layer.fixedDate) {
      gibsBRef.current = L.tileLayer(gibsTileUrl(layer, dateB), {
        maxNativeZoom: layer.level,
        maxZoom: 12,
        opacity: opacityA,
        attribution: 'NASA GIBS / EOSDIS',
        bounds: [
          [-85.0511, -180],
          [85.0511, 180],
        ],
      }).addTo(map);
    }

    updateCurtainClip(map, leftPaneRef.current, compare ? curtain : 100);
  }, [layer, dateA, dateB, compare, curtain, opacity]);

  useEffect(() => {
    const map = mapObj.current;
    if (!map) return;
    const onResize = () => updateCurtainClip(map, leftPaneRef.current, compare ? curtain : 100);
    map.on('resize move zoom', onResize);
    return () => {
      map.off('resize move zoom', onResize);
    };
  }, [compare, curtain]);

  // EONET markers
  useEffect(() => {
    const group = eonetGroupRef.current;
    const map = mapObj.current;
    if (!group || !map) return;
    group.clearLayers();
    if (!eonetOn) return;

    for (const ev of visibleEvents) {
      const color = EONET_CATEGORY_COLORS[ev.categoryId] || '#444';
      const marker = L.circleMarker([ev.lat, ev.lon], {
        radius: 6,
        color: '#fff',
        weight: 1.5,
        fillColor: color,
        fillOpacity: 0.9,
      });
      const sourceHtml = ev.source
        ? `<br/><a href="${ev.source.url}" target="_blank" rel="noopener noreferrer">Fuente: ${ev.source.id}</a>`
        : '';
      marker.bindPopup(
        `<strong>${escapeHtml(ev.title)}</strong><br/>${escapeHtml(ev.categoryLabel)} · ${escapeHtml(ev.date)}${sourceHtml}<br/><em>Usa el botón de la lista para centrar y cambiar la capa.</em>`,
      );
      marker.addTo(group);
    }
  }, [visibleEvents, eonetOn]);

  async function loadEonet() {
    setEonetError(null);
    setEonetStatus('Cargando EONET…');
    const result = await fetchEonetEvents();
    if (result.status === 'error') {
      setEonetError(result.message);
      setEonetStatus('EONET no disponible. El mapa GIBS sigue activo.');
      return;
    }
    const mapped = mapEonetEvents(result.data);
    setEvents(mapped);
    setEonetStatus(
      `${mapped.length} eventos activos${result.fromCache ? ' (caché)' : ''}. Toca un punto o usa la lista.`,
    );
  }

  useEffect(() => {
    void loadEonet();
  }, []);

  async function loadSatellite(id: string) {
    if (satTimerRef.current) window.clearInterval(satTimerRef.current);
    satGroupRef.current?.clearLayers();
    setSatPos(null);
    setSatName(null);
    setPasses([]);
    if (!id) {
      setSatStatus(null);
      return;
    }
    setSatStatus('Descargando TLE desde CelesTrak…');
    const result = await fetchTle(id);
    if (result.status === 'error') {
      setSatStatus(result.message);
      return;
    }
    const { satrec, name } = result.data;
    setSatName(name);
    setSatStatus(result.fromCache ? 'TLE desde caché.' : 'TLE actualizado.');

    const draw = () => {
      const now = new Date();
      const p = positionAt(satrec, now);
      if (!p || !satGroupRef.current) return;
      setSatPos(p);
      satGroupRef.current.clearLayers();
      for (const seg of splitTrackAntDateline(groundTrack(satrec, now))) {
        L.polyline(seg, {
          color: '#FF8F6B',
          weight: 2,
          opacity: 0.85,
          dashArray: '4 6',
        }).addTo(satGroupRef.current);
      }
      L.circleMarker([p.lat, p.lon], {
        radius: 7,
        color: '#fff',
        weight: 2,
        fillColor: '#FF8F6B',
        fillOpacity: 1,
      }).addTo(satGroupRef.current);
    };

    draw();
    satTimerRef.current = window.setInterval(draw, 1000);
    const p = positionAt(satrec, new Date());
    if (p && mapObj.current) mapObj.current.flyTo([p.lat, p.lon], 3, { duration: 1 });

    if (observer) {
      setPasses(predictPasses(satrec, observer, { hours: 24, minElevDeg: 10 }));
    }
  }

  useEffect(() => {
    void loadSatellite(noradId);
    return () => {
      if (satTimerRef.current) window.clearInterval(satTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- reload only when NORAD or observer changes
  }, [noradId, observer]);

  function centerEvent(ev: MappedEonetEvent) {
    mapObj.current?.flyTo([ev.lat, ev.lon], 6, { duration: 1 });
    setLayerId(ev.recommendedLayerId);
  }

  function requestGeo() {
    if (!navigator.geolocation) {
      setGeoStatus('Tu navegador no ofrece geolocalización.');
      return;
    }
    setGeoStatus('Pidiendo permiso de ubicación…');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const next = { lat: pos.coords.latitude, lon: pos.coords.longitude };
        setObserver(next);
        setGeoStatus(`Observador: ${next.lat.toFixed(2)}°, ${next.lon.toFixed(2)}°`);
        mapObj.current?.flyTo([next.lat, next.lon], 5);
      },
      () => setGeoStatus('No se pudo obtener la ubicación (permiso denegado o error).'),
      { enableHighAccuracy: false, timeout: 8000 },
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[340px_1fr]">
      <aside className="card-orbit flex flex-col gap-4 p-4">
        <label className="grid gap-1 text-sm">
          Capa satelital (GIBS)
          <select
            value={layerId}
            onChange={(event) => setLayerId(event.target.value)}
            className="rounded-xl border border-[color:var(--orbit-line)] bg-[color:var(--orbit-chip)] px-3 py-2"
          >
            {GIBS_LAYERS.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-1 text-sm">
          Fecha de la imagen
          <input
            type="date"
            value={dateA}
            min="2002-01-01"
            max={maxDate}
            disabled={!!layer.fixedDate}
            onChange={(event) => setDateA(event.target.value)}
            className="rounded-xl border border-[color:var(--orbit-line)] bg-[color:var(--orbit-chip)] px-3 py-2"
          />
        </label>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={compare}
            disabled={!!layer.fixedDate}
            onChange={(event) => setCompare(event.target.checked)}
          />
          Modo antes / después
        </label>

        {compare && !layer.fixedDate ? (
          <>
            <label className="grid gap-1 text-sm">
              Fecha “antes”
              <input
                type="date"
                value={dateB}
                min="2002-01-01"
                max={maxDate}
                onChange={(event) => setDateB(event.target.value)}
                className="rounded-xl border border-[color:var(--orbit-line)] bg-[color:var(--orbit-chip)] px-3 py-2"
              />
            </label>
            <label className="grid gap-1 text-sm">
              Cortina ({curtain}%)
              <input
                type="range"
                min={5}
                max={95}
                value={curtain}
                onChange={(event) => setCurtain(Number(event.target.value))}
              />
            </label>
          </>
        ) : null}

        <label className="grid gap-1 text-sm">
          Opacidad ({Math.round(opacity * 100)}%)
          <input
            type="range"
            min={0.2}
            max={1}
            step={0.05}
            value={opacity}
            onChange={(event) => setOpacity(Number(event.target.value))}
          />
        </label>

        <div className="panel-inset p-3 text-sm">
          <p className="label-mono">Leyenda</p>
          <p className="mt-1">{layer.legend}</p>
          <p className="mt-2 text-[color:var(--orbit-muted)]">{layer.geoint}</p>
        </div>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={eonetOn}
            onChange={(event) => setEonetOn(event.target.checked)}
          />
          Eventos naturales (EONET)
        </label>

        <label className="grid gap-1 text-sm">
          Filtrar categoría
          <select
            value={categoryFilter}
            onChange={(event) => setCategoryFilter(event.target.value)}
            className="rounded-xl border border-[color:var(--orbit-line)] bg-[color:var(--orbit-chip)] px-3 py-2"
          >
            <option value="all">Todas</option>
            {categories.map(([id, count]) => (
              <option key={id} value={id}>
                {id} · {count}
              </option>
            ))}
          </select>
        </label>

        {eonetError ? (
          <div className="callout-coral p-3">
            <p>{eonetError}</p>
            <button
              type="button"
              className="mt-2 font-semibold underline-offset-2 hover:underline"
              onClick={() => void loadEonet()}
            >
              Reintentar EONET
            </button>
          </div>
        ) : null}

        <p className="text-xs text-[color:var(--orbit-muted)]" aria-live="polite">
          {eonetStatus}
        </p>

        <label className="grid gap-1 text-sm">
          Seguir un satélite (CelesTrak)
          <select
            value={noradId}
            onChange={(event) => setNoradId(event.target.value)}
            className="rounded-xl border border-[color:var(--orbit-line)] bg-[color:var(--orbit-chip)] px-3 py-2"
          >
            <option value="">Ninguno</option>
            {LAB_SATELLITES.map((sat) => (
              <option key={sat.noradId} value={sat.noradId}>
                {sat.label} · {sat.agency}
              </option>
            ))}
          </select>
        </label>

        {satStatus ? <p className="text-xs text-[color:var(--orbit-muted)]">{satStatus}</p> : null}
        {satPos && satName ? (
          <div className="panel-inset p-3 text-sm">
            <p className="font-semibold">{satName}</p>
            <p className="text-[color:var(--orbit-muted)]">
              Lat {satPos.lat.toFixed(2)}° · Lon {satPos.lon.toFixed(2)}°
            </p>
            <p className="text-[color:var(--orbit-muted)]">
              Altitud {Math.round(satPos.altitudeKm)} km ·{' '}
              {(satPos.speedKmS * 3600).toLocaleString('es', { maximumFractionDigits: 0 })} km/h
            </p>
          </div>
        ) : null}

        <div className="grid gap-2">
          <button
            type="button"
            onClick={requestGeo}
            className="btn-orbit-md btn-orbit-outline"
          >
            Usar mi ubicación (pasadas)
          </button>
          {geoStatus ? <p className="text-xs text-[color:var(--orbit-muted)]">{geoStatus}</p> : null}
        </div>

        {passes.length > 0 ? (
          <div className="panel-inset max-h-40 overflow-auto p-3 text-xs">
            <p className="label-mono mb-2">Próximas pasadas (elev. ≥ 10°)</p>
            <table className="w-full text-left">
              <thead>
                <tr className="text-[color:var(--orbit-muted)]">
                  <th className="pr-2">AOS UTC</th>
                  <th className="pr-2">Máx</th>
                  <th>El.°</th>
                </tr>
              </thead>
              <tbody>
                {passes.map((pass) => (
                  <tr key={`${pass.aosUtc}-${pass.maxElevationDeg}`}>
                    <td className="pr-2">{pass.aosUtc.slice(11, 16)}</td>
                    <td className="pr-2">{pass.maxUtc.slice(11, 16)}</td>
                    <td>{pass.maxElevationDeg.toFixed(0)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}

        <p className="text-xs text-[color:var(--orbit-muted)]">
          ¿Ves franjas negras? Son zonas por donde el satélite no pasó ese día: resolución temporal
          en acción.
        </p>
      </aside>

      <div className="grid gap-4">
        <div
          ref={mapRef}
          className="card-orbit h-[min(70vh,640px)] min-h-[360px] overflow-hidden"
          role="region"
          aria-label="Mapa interactivo del laboratorio"
        />

        {eonetOn && visibleEvents.length > 0 ? (
          <div className="card-orbit max-h-56 overflow-auto p-4">
            <p className="label-mono">Eventos visibles</p>
            <ul className="mt-2 space-y-2 text-sm">
              {visibleEvents.slice(0, 40).map((ev) => (
                <li
                  key={ev.id}
                  className="flex flex-wrap items-center justify-between gap-2 border-b border-[color:var(--orbit-line)] py-2"
                >
                  <span>
                    <span
                      className="mr-2 inline-block h-2.5 w-2.5 rounded-full"
                      style={{ background: EONET_CATEGORY_COLORS[ev.categoryId] || '#444' }}
                    />
                    {ev.title}
                  </span>
                  <button
                    type="button"
                    className="text-xs font-semibold underline-offset-2 hover:underline"
                    onClick={() => centerEvent(ev)}
                  >
                    Centrar y ver capa recomendada
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

      </div>
    </div>
  );
}

function updateCurtainClip(map: L.Map, pane: HTMLElement | null, percent: number) {
  if (!pane) return;
  const size = map.getSize();
  const x = (size.x * percent) / 100;
  pane.style.clip = `rect(0px, ${x}px, ${size.y}px, 0px)`;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}
