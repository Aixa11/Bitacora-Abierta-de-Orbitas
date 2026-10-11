import { useMemo, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { HackathonCountdown } from '../components/ayuda/HackathonCountdown';
import { ContentLocaleNotice } from '../components/layout/ContentLocaleNotice';
import { useI18n } from '../i18n/useI18n';
import { ROLES_EQUIPO, type TaskStatus } from '../content/equipo';
import { useEquipo } from '../store/equipo';

const COLUMNAS: Array<{ id: TaskStatus; label: string }> = [
  { id: 'por-hacer', label: 'Por hacer' },
  { id: 'en-curso', label: 'En curso' },
  { id: 'hecho', label: 'Hecho' },
];

export function EquipoPage() {
  const { t } = useI18n();
  const hitos = useEquipo((state) => state.hitos);
  const tareas = useEquipo((state) => state.tareas);
  const updateHito = useEquipo((state) => state.updateHito);
  const addTarea = useEquipo((state) => state.addTarea);
  const moveTarea = useEquipo((state) => state.moveTarea);
  const removeTarea = useEquipo((state) => state.removeTarea);
  const [nueva, setNueva] = useState('');
  const [rolId, setRolId] = useState('');

  const exportText = useMemo(() => {
    const hitoLines = hitos.map(
      (hito) =>
        `- [${hito.dia === 'sabado' ? 'sáb' : 'dom'} ${hito.horaSugerida}] ${hito.titulo}: ${hito.detalle}`,
    );
    const taskLines = COLUMNAS.flatMap((col) => {
      const items = tareas.filter((tarea) => tarea.estado === col.id);
      return [`## ${col.label}`, ...items.map((tarea) => `- ${tarea.titulo}`), ''];
    });
    return [
      '# Plan del equipo — Space Apps 2026',
      '',
      '## Cronograma 14–15 noviembre',
      ...hitoLines,
      '',
      ...taskLines,
    ].join('\n');
  }, [hitos, tareas]);

  function onAdd(event: FormEvent) {
    event.preventDefault();
    addTarea(nueva, rolId || null);
    setNueva('');
  }

  function downloadBoard() {
    const blob = new Blob([exportText], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'equipo-space-apps.md';
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return (
    <div className="space-y-10">
      <header className="max-w-3xl space-y-4">
        <div>
          <p className="label-mono">/ Equipo /</p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight">
            {t('pages.equipo.title')}
          </h1>
          <p className="mt-3 text-[color:var(--orbit-muted)]">{t('pages.equipo.lead')}</p>
        </div>
        <ContentLocaleNotice />
      </header>

      <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <HackathonCountdown />
        <div className="card-orbit p-5 text-sm text-[color:var(--orbit-muted)]">
          <p className="label-mono">/ Complementos /</p>
          <p className="mt-2">
            Arranque 30 min, estudio NASA y plantillas de pitch están en Ayuda.
          </p>
          <Link to="/ayuda" className="mt-3 inline-flex font-semibold underline underline-offset-2">
            Abrir ayuda del hackatón
          </Link>
        </div>
      </div>

      <section>
        <h2 className="font-display text-2xl font-bold">Roles sugeridos</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {ROLES_EQUIPO.map((rol) => (
            <article key={rol.id} className="card-orbit p-5">
              <h3 className="font-display text-xl font-bold">{rol.nombre}</h3>
              <p className="mt-2 text-sm text-[color:var(--orbit-muted)]">{rol.descripcion}</p>
              <ul className="mt-3 space-y-1 text-sm">
                {rol.checklist.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-orbit-lime">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="font-display text-2xl font-bold">Cronograma de 48 h</h2>
            <p className="mt-1 text-sm text-[color:var(--orbit-muted)]">
              Editable. Ajusta horas a tu zona y ritmo de equipo.
            </p>
          </div>
        </div>
        <div className="mt-4 grid gap-3">
          {hitos.map((hito) => (
            <article key={hito.id} className="card-orbit grid gap-3 p-4 md:grid-cols-[140px_1fr]">
              <div>
                <p className="label-mono">{hito.dia === 'sabado' ? 'Sábado 14' : 'Domingo 15'}</p>
                <label className="mt-2 block text-sm">
                  Hora
                  <input
                    type="time"
                    value={hito.horaSugerida}
                    onChange={(event) => updateHito(hito.id, { horaSugerida: event.target.value })}
                    className="mt-1 w-full rounded-xl border border-[color:var(--orbit-line)] bg-[color:var(--orbit-chip)] px-3 py-2"
                  />
                </label>
              </div>
              <div className="grid gap-2">
                <label className="text-sm">
                  Hito
                  <input
                    value={hito.titulo}
                    onChange={(event) => updateHito(hito.id, { titulo: event.target.value })}
                    className="mt-1 w-full rounded-xl border border-[color:var(--orbit-line)] bg-[color:var(--orbit-chip)] px-3 py-2"
                  />
                </label>
                <label className="text-sm">
                  Detalle
                  <textarea
                    value={hito.detalle}
                    onChange={(event) => updateHito(hito.id, { detalle: event.target.value })}
                    rows={2}
                    className="mt-1 w-full rounded-xl border border-[color:var(--orbit-line)] bg-[color:var(--orbit-chip)] px-3 py-2"
                  />
                </label>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="font-display text-2xl font-bold">Tablero de tareas</h2>
            <p className="mt-1 text-sm text-[color:var(--orbit-muted)]">
              Por hacer / en curso / hecho, con exportación a Markdown.
            </p>
          </div>
          <button
            type="button"
            onClick={downloadBoard}
            className="rounded-full border border-[color:var(--orbit-line)] px-4 py-2 text-sm font-semibold"
          >
            Exportar tablero
          </button>
        </div>

        <form onSubmit={onAdd} className="mt-4 flex flex-wrap gap-2">
          <input
            value={nueva}
            onChange={(event) => setNueva(event.target.value)}
            placeholder="Nueva tarea"
            className="min-w-[220px] flex-1 rounded-full border border-[color:var(--orbit-line)] bg-[color:var(--orbit-chip)] px-4 py-2 text-sm"
            aria-label="Nueva tarea"
          />
          <select
            value={rolId}
            onChange={(event) => setRolId(event.target.value)}
            className="rounded-full border border-[color:var(--orbit-line)] bg-[color:var(--orbit-chip)] px-3 py-2 text-sm"
            aria-label="Rol sugerido"
          >
            <option value="">Sin rol</option>
            {ROLES_EQUIPO.map((rol) => (
              <option key={rol.id} value={rol.id}>
                {rol.nombre}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="rounded-full bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] px-4 py-2 text-sm font-semibold text-white"
          >
            Agregar
          </button>
        </form>

        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          {COLUMNAS.map((col) => (
            <div key={col.id} className="card-orbit p-4">
              <h3 className="label-mono">{col.label}</h3>
              <ul className="mt-3 space-y-2">
                {tareas
                  .filter((tarea) => tarea.estado === col.id)
                  .map((tarea) => (
                    <li
                      key={tarea.id}
                      className="rounded-2xl border border-[color:var(--orbit-line)] p-3 text-sm"
                    >
                      <p className="font-semibold">{tarea.titulo}</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {COLUMNAS.filter((other) => other.id !== col.id).map((other) => (
                          <button
                            key={other.id}
                            type="button"
                            onClick={() => moveTarea(tarea.id, other.id)}
                            className="text-xs font-semibold underline-offset-2 hover:underline"
                          >
                            → {other.label}
                          </button>
                        ))}
                        <button
                          type="button"
                          onClick={() => removeTarea(tarea.id)}
                          className="text-xs text-[color:var(--orbit-muted)]"
                        >
                          Eliminar
                        </button>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
