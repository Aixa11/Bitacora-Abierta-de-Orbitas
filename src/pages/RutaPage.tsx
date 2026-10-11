import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { herramientas } from '../content/catalog';
import { RUTA_PASOS } from '../content/ruta';
import { useKit } from '../store/kit';
import { useRuta } from '../store/ruta';

const byId = new Map(herramientas.map((tool) => [tool.id, tool]));

export function RutaPage() {
  const pasoActivo = useRuta((state) => state.pasoActivo);
  const setPasoActivo = useRuta((state) => state.setPasoActivo);
  const toggleCheck = useRuta((state) => state.toggleCheck);
  const checks = useRuta((state) => state.checks);
  const getProgreso = useRuta((state) => state.progreso);
  const progreso = getProgreso();
  const addToKit = useKit((state) => state.add);
  const [copied, setCopied] = useState(false);

  const paso = RUTA_PASOS[pasoActivo];

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        event.preventDefault();
        setPasoActivo(Math.min(pasoActivo + 1, RUTA_PASOS.length - 1));
      }
      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        event.preventDefault();
        setPasoActivo(Math.max(pasoActivo - 1, 0));
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [pasoActivo, setPasoActivo]);

  async function copyCode() {
    if (!paso.codigo) return;
    await navigator.clipboard.writeText(paso.codigo);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
      <aside>
        <p className="label-mono">/ Ruta del dato /</p>
        <h1 className="mt-3 font-display text-3xl font-bold tracking-tight">Ocho pasos</h1>
        <p className="mt-2 text-sm text-[color:var(--orbit-muted)]">
          Del desafío a la demo. Tu progreso se guarda en el navegador.
        </p>
        <div className="mt-4 rounded-2xl border border-[color:var(--orbit-line)] p-3">
          <p className="text-sm text-[color:var(--orbit-muted)]" aria-live="polite">
            Checklist: {progreso.hechos}/{progreso.total} ({progreso.pct}%)
          </p>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-[color:var(--orbit-chip)]">
            <div
              className="h-full bg-gradient-to-r from-[#7C3AED] to-[#3B82F6]"
              style={{ width: `${progreso.pct}%` }}
            />
          </div>
        </div>
        <ol className="mt-4 space-y-1" role="tablist" aria-label="Pasos de la ruta">
          {RUTA_PASOS.map((item, index) => {
            const done = (checks[item.id] ?? []).length;
            const total = item.checklist.length;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={index === pasoActivo}
                  onClick={() => setPasoActivo(index)}
                  className={[
                    'flex w-full items-start gap-3 rounded-2xl border px-3 py-2 text-left text-sm transition-colors duration-orbit',
                    index === pasoActivo
                      ? 'border-transparent bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] text-white'
                      : 'border-[color:var(--orbit-line)] bg-[color:var(--orbit-chip)]',
                  ].join(' ')}
                >
                  <span className="font-mono text-xs opacity-80">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="flex-1">
                    <span className="block font-semibold">{item.titulo}</span>
                    <span className="block text-xs opacity-80">
                      {done}/{total} hechos
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </aside>

      <section
        className="card-orbit p-6 sm:p-8"
        role="tabpanel"
        aria-labelledby={`ruta-paso-${paso.id}`}
      >
        <div className="flex flex-wrap items-center gap-3 text-sm text-[color:var(--orbit-muted)]">
          <span className="label-mono">
            Paso {pasoActivo + 1} de {RUTA_PASOS.length}
          </span>
          <span>{paso.subtitulo}</span>
        </div>
        <h2 id={`ruta-paso-${paso.id}`} className="mt-3 font-display text-3xl font-bold">
          {paso.titulo}
        </h2>
        <div
          className="prose-orbit mt-4 max-w-prose text-[color:var(--orbit-muted)] [&_strong]:text-[color:var(--orbit-text)]"
          dangerouslySetInnerHTML={{ __html: paso.cuerpoHtml }}
        />

        {paso.codigo ? (
          <div className="relative mt-5 rounded-2xl bg-[color:var(--orbit-surface-strong)] p-4">
            <button
              type="button"
              onClick={() => void copyCode()}
              className="absolute right-3 top-3 rounded-full border border-[color:var(--orbit-line)] px-2 py-1 text-xs"
            >
              {copied ? 'Copiado' : 'Copiar'}
            </button>
            <pre className="overflow-x-auto pr-20 font-mono text-xs text-orbit-aqua">
              <code>{paso.codigo}</code>
            </pre>
          </div>
        ) : null}

        <div className="mt-6">
          <p className="label-mono">Herramientas</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {paso.herramientasIds.map((id) => {
              const tool = byId.get(id);
              if (!tool) return null;
              return (
                <div key={id} className="flex items-center gap-2 rounded-full border border-[color:var(--orbit-line)] px-3 py-1.5 text-sm">
                  <Link to={`/bitacora?q=${encodeURIComponent(tool.nombre)}`} className="font-semibold">
                    {tool.nombre}
                  </Link>
                  <button
                    type="button"
                    className="text-xs text-[color:var(--orbit-muted)]"
                    onClick={() => addToKit(id)}
                  >
                    + kit
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <p className="mt-5 rounded-2xl border border-orbit-coral/40 bg-orbit-coral/10 px-4 py-3 text-sm">
          <strong>Error común:</strong> {paso.errorComun}
        </p>

        <fieldset className="mt-6">
          <legend className="label-mono">Checklist del paso</legend>
          <ul className="mt-3 space-y-2">
            {paso.checklist.map((item) => {
              const checked = (checks[paso.id] ?? []).includes(item);
              return (
                <li key={item}>
                  <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-[color:var(--orbit-line)] px-3 py-2 text-sm">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleCheck(paso.id, item)}
                      className="mt-1"
                    />
                    <span>{item}</span>
                  </label>
                </li>
              );
            })}
          </ul>
        </fieldset>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            disabled={pasoActivo === 0}
            onClick={() => setPasoActivo(pasoActivo - 1)}
            className="rounded-full border border-[color:var(--orbit-line)] px-4 py-2 text-sm font-semibold disabled:opacity-40"
          >
            Anterior
          </button>
          <button
            type="button"
            disabled={pasoActivo === RUTA_PASOS.length - 1}
            onClick={() => setPasoActivo(pasoActivo + 1)}
            className="rounded-full bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] px-4 py-2 text-sm font-semibold text-white disabled:opacity-40"
          >
            Siguiente
          </button>
          {paso.enlaceInterno ? (
            <Link
              to={paso.enlaceInterno.to}
              className="rounded-full border border-[color:var(--orbit-line)] px-4 py-2 text-sm font-semibold"
            >
              {paso.enlaceInterno.label}
            </Link>
          ) : null}
        </div>
      </section>
    </div>
  );
}
