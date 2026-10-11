import { useEffect, useRef, useState } from 'react';
import { ENTREGA_CHECKS, PITCH_SECTIONS, PITCH_TOTAL_SECONDS } from '../content/entrega';
import { downloadTextFile, exportKitMarkdown } from '../lib/kit/export';
import { useEntrega } from '../store/entrega';
import { useKit } from '../store/kit';

function formatTime(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

export function EntregaPage() {
  const checks = useEntrega((state) => state.checks);
  const toggleCheck = useEntrega((state) => state.toggleCheck);
  const notasEquipo = useEntrega((state) => state.notasEquipo);
  const setNotasEquipo = useEntrega((state) => state.setNotasEquipo);
  const kitIds = useKit((state) => state.ids);
  const getKitItems = useKit((state) => state.items);

  const [pitchIndex, setPitchIndex] = useState(0);
  const [remaining, setRemaining] = useState<number>(PITCH_SECTIONS[0].seconds);
  const [running, setRunning] = useState(false);
  const pitchIndexRef = useRef(pitchIndex);
  pitchIndexRef.current = pitchIndex;

  const section = PITCH_SECTIONS[pitchIndex];

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => {
      setRemaining((value) => {
        if (value > 1) return value - 1;
        const current = pitchIndexRef.current;
        if (current < PITCH_SECTIONS.length - 1) {
          const next = current + 1;
          setPitchIndex(next);
          return PITCH_SECTIONS[next].seconds;
        }
        setRunning(false);
        return 0;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [running]);

  void kitIds;
  const kitMd = exportKitMarkdown(getKitItems());
  const recursosMd = notasEquipo.trim()
    ? `${kitMd}${'## Notas del equipo\n\n'}${notasEquipo.trim()}\n`
    : kitMd;

  function restartPitch() {
    setPitchIndex(0);
    setRemaining(PITCH_SECTIONS[0].seconds);
    setRunning(false);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <section>
        <p className="label-mono">/ Entrega /</p>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight">
          Checklist, citas y pitch
        </h1>
        <p className="mt-3 max-w-prose text-[color:var(--orbit-muted)]">
          Cierra el domingo 15 de noviembre a las 23:59 hora local. Marca lo esencial, genera la
          sección de recursos y ensaya el pitch.
        </p>

        <ul className="mt-6 space-y-2">
          {ENTREGA_CHECKS.map((item) => {
            const checked = checks.includes(item.id);
            return (
              <li key={item.id}>
                <label className="card-orbit flex cursor-pointer gap-3 p-4 text-sm">
                  <input
                    type="checkbox"
                    className="mt-1"
                    checked={checked}
                    onChange={() => toggleCheck(item.id)}
                  />
                  <span>
                    <span className="block font-semibold">{item.titulo}</span>
                    <span className="mt-1 block text-[color:var(--orbit-muted)]">{item.detalle}</span>
                  </span>
                </label>
              </li>
            );
          })}
        </ul>

        <div className="card-orbit mt-8 p-5">
          <h2 className="font-display text-2xl font-bold">Recursos utilizados</h2>
          <p className="mt-2 text-sm text-[color:var(--orbit-muted)]">
            Combina Mi kit con notas del equipo. Completa misión, producto y versión antes de pegar
            en la entrega.
          </p>
          <label className="mt-4 grid gap-1 text-sm">
            Notas del equipo
            <textarea
              value={notasEquipo}
              onChange={(event) => setNotasEquipo(event.target.value)}
              rows={4}
              className="rounded-xl border border-[color:var(--orbit-line)] bg-[color:var(--orbit-chip)] px-3 py-2"
              placeholder="Licencia elegida, modelos de IA, observaciones…"
            />
          </label>
          <pre className="mt-4 max-h-64 overflow-auto whitespace-pre-wrap rounded-2xl bg-[color:var(--orbit-surface-strong)] p-4 font-mono text-xs">
            {recursosMd}
          </pre>
          <button
            type="button"
            onClick={() =>
              downloadTextFile(
                'recursos-utilizados.md',
                recursosMd,
                'text/markdown;charset=utf-8',
              )
            }
            className="mt-4 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] px-4 py-2 text-sm font-semibold text-white"
          >
            Descargar Markdown
          </button>
        </div>
      </section>

      <section className="card-orbit h-fit p-6">
        <p className="label-mono">/ Pitch · {formatTime(PITCH_TOTAL_SECONDS)} /</p>
        <h2 className="mt-3 font-display text-2xl font-bold">Ensayo del pitch</h2>
        <p className="mt-2 text-sm text-[color:var(--orbit-muted)]">
          Estructura: problema → usuario → datos → demo → impacto.
        </p>

        <ol className="mt-4 space-y-2">
          {PITCH_SECTIONS.map((item, index) => (
            <li
              key={item.id}
              className={[
                'rounded-2xl border px-3 py-2 text-sm',
                index === pitchIndex
                  ? 'border-transparent bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] text-white'
                  : 'border-[color:var(--orbit-line)]',
              ].join(' ')}
            >
              <strong>{item.titulo}</strong>
              <span className="ml-2 opacity-80">{item.seconds}s</span>
            </li>
          ))}
        </ol>

        <div className="mt-6 text-center">
          <p className="label-mono">{section.titulo}</p>
          <p className="mt-2 font-display text-5xl font-bold tabular-nums" aria-live="polite">
            {formatTime(remaining)}
          </p>
          <p className="mt-3 text-sm text-[color:var(--orbit-muted)]">{section.prompt}</p>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            type="button"
            onClick={() => setRunning((value) => !value)}
            className="rounded-full bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] px-4 py-2 text-sm font-semibold text-white"
          >
            {running ? 'Pausar' : 'Iniciar'}
          </button>
          <button
            type="button"
            onClick={restartPitch}
            className="rounded-full border border-[color:var(--orbit-line)] px-4 py-2 text-sm font-semibold"
          >
            Reiniciar
          </button>
        </div>
      </section>
    </div>
  );
}
