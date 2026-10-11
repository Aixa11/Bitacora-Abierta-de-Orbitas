import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HackathonCountdown } from '../components/ayuda/HackathonCountdown';
import { RecursosOficialesBanner } from '../components/ayuda/RecursosOficialesBanner';
import { ACCESO_GUIA, ARRANQUE_30, TRABADO_NODOS } from '../content/ayuda';
import { desafios, herramientas } from '../content/catalog';
import { ESTUDIO_NASA } from '../content/estudioNasa';
import { EXPLORADOR_MUNDOS } from '../content/exploradorMundos';
import { GIBS_LAYERS } from '../content/gibsLayers';
import { downloadMarkdown, PLANTILLAS } from '../content/plantillas';
import { SENSOR_TOPICS } from '../content/sensorTopics';
import { NIVEL_LABELS } from '../lib/bitacora/labels';

const SECTIONS = [
  { id: 'arranque', label: 'Arranque 30 min' },
  { id: 'reloj', label: 'Reloj 48 h' },
  { id: 'trabado', label: '¿Estás trabado?' },
  { id: 'acceso', label: 'Acceso a datos' },
  { id: 'estudio', label: 'Estudio NASA' },
  { id: 'mundo', label: 'Explorar el mundo' },
  { id: 'plantillas', label: 'Plantillas' },
] as const;

type SectionId = (typeof SECTIONS)[number]['id'];

function toolById(id: string) {
  return herramientas.find((h) => h.id === id) ?? null;
}

export function AyudaPage() {
  const location = useLocation();
  const [section, setSection] = useState<SectionId>('arranque');
  const [estudioId, setEstudioId] = useState(ESTUDIO_NASA[0]?.id ?? '');
  const [mundoId, setMundoId] = useState(EXPLORADOR_MUNDOS[0]?.id ?? '');

  useEffect(() => {
    const hash = location.hash.replace('#', '') as SectionId | '';
    if (hash && SECTIONS.some((s) => s.id === hash)) {
      setSection(hash);
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [location.hash]);

  const estudio = useMemo(
    () => ESTUDIO_NASA.find((e) => e.id === estudioId) ?? ESTUDIO_NASA[0],
    [estudioId],
  );
  const mundo = useMemo(
    () => EXPLORADOR_MUNDOS.find((m) => m.id === mundoId) ?? EXPLORADOR_MUNDOS[0],
    [mundoId],
  );

  const estudioTool = estudio ? toolById(estudio.toolId) : null;
  const gibs = mundo?.gibsLayerId
    ? GIBS_LAYERS.find((l) => l.id === mundo.gibsLayerId) ?? null
    : null;
  const topic = mundo?.sensorTopicId
    ? SENSOR_TOPICS.find((t) => t.id === mundo.sensorTopicId) ?? null
    : null;
  const desafiosRel = (mundo?.desafioIds ?? [])
    .map((id) => desafios.find((d) => d.id === id))
    .filter((d): d is NonNullable<typeof d> => Boolean(d));

  return (
    <div className="space-y-8">
      <header className="max-w-3xl space-y-3">
        <p className="label-mono">/ Ayuda del hackatón /</p>
        <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Complementos para las 48 horas
        </h1>
        <p className="text-[color:var(--orbit-muted)]">
          Arranque, estudio NASA en español, explorador de fenómenos reales y plantillas. Nada aquí
          resuelve un desafío: te ayuda a pensar, citar y no perder tiempo.
        </p>
        <RecursosOficialesBanner />
      </header>

      <nav className="flex flex-wrap gap-2" aria-label="Secciones de ayuda">
        {SECTIONS.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            onClick={() => setSection(s.id)}
            className={[
              'rounded-full border px-3 py-1.5 text-sm font-semibold',
              section === s.id
                ? 'border-transparent bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] text-white'
                : 'border-[color:var(--orbit-line)] text-[color:var(--orbit-muted)]',
            ].join(' ')}
          >
            {s.label}
          </a>
        ))}
      </nav>

      <section id="arranque" className="space-y-4 scroll-mt-24">
        <h2 className="font-display text-2xl font-bold">Arranque en 30 minutos</h2>
        <ol className="grid gap-3 md:grid-cols-2">
          {ARRANQUE_30.map((paso, i) => (
            <li key={paso.id} className="card-orbit p-5">
              <p className="label-mono">
                / {i + 1} · ~{paso.minutos} min /
              </p>
              <h3 className="mt-2 font-display text-xl font-bold">{paso.titulo}</h3>
              <p className="mt-2 text-sm text-[color:var(--orbit-muted)]">{paso.detalle}</p>
              {paso.enlace ? (
                <Link
                  to={paso.enlace.to}
                  className="mt-3 inline-flex text-sm font-semibold underline underline-offset-2"
                >
                  {paso.enlace.label}
                </Link>
              ) : null}
            </li>
          ))}
        </ol>
      </section>

      <section id="reloj" className="scroll-mt-24">
        <h2 className="mb-4 font-display text-2xl font-bold">Reloj de 48 horas</h2>
        <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
          <HackathonCountdown />
          <div className="card-orbit p-5 text-sm text-[color:var(--orbit-muted)]">
            <p className="label-mono">/ Hitos /</p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>Sábado: idea cerrada y datos listos</li>
              <li>Domingo: prototipo, video/demo, entrega antes de 23:59 local</li>
            </ul>
            <Link to="/equipo" className="mt-4 inline-flex font-semibold underline underline-offset-2">
              Abrir planificador del equipo
            </Link>
          </div>
        </div>
      </section>

      <section id="trabado" className="space-y-4 scroll-mt-24">
        <h2 className="font-display text-2xl font-bold">¿Estás trabado?</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {TRABADO_NODOS.map((nodo) => (
            <article key={nodo.id} className="card-orbit p-5">
              <h3 className="font-display text-lg font-bold">{nodo.pregunta}</h3>
              <ul className="mt-3 space-y-1 text-sm text-[color:var(--orbit-muted)]">
                {nodo.pistas.map((p) => (
                  <li key={p}>• {p}</li>
                ))}
              </ul>
              <div className="mt-3 flex flex-wrap gap-2">
                {nodo.enlaces.map((e) => (
                  <Link
                    key={e.to}
                    to={e.to}
                    className="rounded-full border border-[color:var(--orbit-line)] px-3 py-1 text-sm font-semibold"
                  >
                    {e.label}
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="acceso" className="space-y-4 scroll-mt-24">
        <h2 className="font-display text-2xl font-bold">Comparador de acceso a datos</h2>
        <div className="grid gap-3 md:grid-cols-3">
          {ACCESO_GUIA.map((item) => (
            <article key={item.id} className="card-orbit p-5">
              <p className="label-mono">/ {item.titulo} /</p>
              <p className="mt-2 text-sm text-[color:var(--orbit-muted)]">{item.texto}</p>
              <Link
                to={item.bitacora}
                className="mt-3 inline-flex text-sm font-semibold underline underline-offset-2"
              >
                Filtrar en la Bitácora
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section id="estudio" className="space-y-4 scroll-mt-24">
        <h2 className="font-display text-2xl font-bold">Estudio NASA en español</h2>
        <p className="max-w-3xl text-sm text-[color:var(--orbit-muted)]">
          Documentos y portales oficiales con enlace directo. Aquí te explicamos qué son y cómo
          usarlos en el hackatón; el original sigue en inglés en el sitio de la NASA.
        </p>
        <div className="flex flex-wrap gap-2">
          {ESTUDIO_NASA.map((doc) => (
            <button
              key={doc.id}
              type="button"
              aria-pressed={doc.id === estudio?.id}
              onClick={() => setEstudioId(doc.id)}
              className={[
                'rounded-full border px-3 py-1.5 text-sm font-semibold',
                doc.id === estudio?.id
                  ? 'border-transparent bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] text-white'
                  : 'border-[color:var(--orbit-line)]',
              ].join(' ')}
            >
              {doc.titulo}
            </button>
          ))}
        </div>
        {estudio && estudioTool ? (
          <article className="card-orbit p-6" aria-live="polite">
            <p className="label-mono">
              / {NIVEL_LABELS[estudio.nivel]} · {estudioTool.acceso} /
            </p>
            <h3 className="mt-2 font-display text-2xl font-bold">{estudio.titulo}</h3>
            <p className="mt-3 text-[color:var(--orbit-muted)]">
              <strong className="text-[color:var(--orbit-text)]">Qué es: </strong>
              {estudio.queEs}
            </p>
            <p className="mt-3 text-[color:var(--orbit-muted)]">
              <strong className="text-[color:var(--orbit-text)]">Cómo usarlo: </strong>
              {estudio.comoUsarlo}
            </p>
            <p className="mt-3 text-sm">
              Conceptos:{' '}
              <span className="text-[color:var(--orbit-muted)]">{estudio.conceptos.join(' · ')}</span>
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <a
                href={estudioTool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] px-4 py-2 text-sm font-semibold text-white"
              >
                Abrir documento / portal NASA
              </a>
              <Link
                to={`/bitacora?q=${encodeURIComponent(estudioTool.nombre)}`}
                className="rounded-full border border-[color:var(--orbit-line)] px-4 py-2 text-sm font-semibold"
              >
                Ver en la Bitácora
              </Link>
            </div>
            <p className="mt-3 text-xs text-[color:var(--orbit-muted)]">
              Fuente: {estudioTool.organizacion} · {estudioTool.url}
            </p>
          </article>
        ) : null}
      </section>

      <section id="mundo" className="space-y-4 scroll-mt-24">
        <h2 className="font-display text-2xl font-bold">Explorar el mundo (y tus desafíos)</h2>
        <p className="max-w-3xl text-sm text-[color:var(--orbit-muted)]">
          Fenómenos reales conectados a capas GIBS, sensores y desafíos 2026. Sirve para explorar
          texturas, índices y mapas NASA — no para cerrar una solución.
        </p>
        <div className="flex flex-wrap gap-2">
          {EXPLORADOR_MUNDOS.map((m) => (
            <button
              key={m.id}
              type="button"
              aria-pressed={m.id === mundo?.id}
              onClick={() => setMundoId(m.id)}
              className={[
                'rounded-full border px-3 py-1.5 text-sm font-semibold',
                m.id === mundo?.id
                  ? 'border-transparent bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] text-white'
                  : 'border-[color:var(--orbit-line)]',
              ].join(' ')}
            >
              {m.titulo}
            </button>
          ))}
        </div>
        {mundo ? (
          <article className="card-orbit space-y-4 p-6" aria-live="polite">
            <h3 className="font-display text-2xl font-bold">{mundo.titulo}</h3>
            <p className="text-[color:var(--orbit-muted)]">{mundo.fenomeno}</p>
            <p className="rounded-2xl border border-[color:var(--orbit-line)] px-4 py-3 text-sm">
              <strong>Pregunta para pensar: </strong>
              {mundo.pregunta}
            </p>
            <p className="text-sm text-[color:var(--orbit-muted)]">
              Índices / productos a explorar: {mundo.indiceOProducto}
            </p>
            {gibs ? (
              <p className="text-sm">
                Capa GIBS sugerida: <strong>{gibs.name}</strong> — {gibs.geoint}
              </p>
            ) : (
              <p className="text-sm text-[color:var(--orbit-muted)]">
                Este tema no usa GIBS Tierra: mira Entry Points y Trek / PDS en estudio NASA.
              </p>
            )}
            <div className="flex flex-wrap gap-2">
              {gibs ? (
                <Link
                  to="/laboratorio"
                  className="rounded-full bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] px-4 py-2 text-sm font-semibold text-white"
                >
                  Abrir laboratorio (mapas NASA)
                </Link>
              ) : null}
              {topic ? (
                <Link
                  to="/sensores"
                  className="rounded-full border border-[color:var(--orbit-line)] px-4 py-2 text-sm font-semibold"
                >
                  Sensores · {topic.titulo}
                </Link>
              ) : null}
              <Link
                to="/"
                className="rounded-full border border-[color:var(--orbit-line)] px-4 py-2 text-sm font-semibold"
              >
                Hero 3D / texturas
              </Link>
            </div>
            <div>
              <p className="label-mono">/ Desafíos relacionados (para pensarlos) /</p>
              <ul className="mt-2 space-y-2">
                {desafiosRel.map((d) => (
                  <li key={d.id}>
                    <Link
                      to={`/desafios/${d.id}`}
                      className="font-semibold underline underline-offset-2"
                    >
                      {d.titulo_es}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-xs text-[color:var(--orbit-muted)]">
              Aviso: esta guía no resuelve el desafío. El trabajo y las ideas son de tu equipo.
            </p>
          </article>
        ) : null}
      </section>

      <section id="plantillas" className="space-y-4 scroll-mt-24">
        <h2 className="font-display text-2xl font-bold">Plantillas descargables</h2>
        <div className="grid gap-3 md:grid-cols-3">
          {PLANTILLAS.map((p) => (
            <article key={p.id} className="card-orbit flex flex-col p-5">
              <h3 className="font-display text-lg font-bold">{p.titulo}</h3>
              <p className="mt-2 flex-1 text-sm text-[color:var(--orbit-muted)]">{p.descripcion}</p>
              <button
                type="button"
                className="mt-4 rounded-full border border-[color:var(--orbit-line)] px-4 py-2 text-sm font-semibold"
                onClick={() => downloadMarkdown(p.filename, p.markdown)}
              >
                Descargar .md
              </button>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
