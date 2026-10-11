import { Link, useParams } from 'react-router-dom';
import { RecursosOficialesBanner } from '../components/ayuda/RecursosOficialesBanner';
import { catalogo, desafios, herramientas, metodoGeneral } from '../content/catalog';
import { EXPLORADOR_MUNDOS } from '../content/exploradorMundos';
import { matchGlossaryTerm } from '../lib/desafios/glossaryLinks';
import { exportDesafioMarkdown } from '../lib/desafios/exportNotes';
import { downloadTextFile } from '../lib/kit/export';
import { useDesafioNotes } from '../store/desafios';
import { useKit } from '../store/kit';

const toolsById = new Map(herramientas.map((tool) => [tool.id, tool]));

export function DesafioDetailPage() {
  const { id = '' } = useParams();
  const desafio = desafios.find((item) => item.id === id);
  const notasMap = useDesafioNotes((state) => state.notas);
  const setNota = useDesafioNotes((state) => state.setNota);
  const add = useKit((state) => state.add);
  const openDrawer = useKit((state) => state.openDrawer);

  if (!desafio) {
    return (
      <section className="card-orbit max-w-xl p-8">
        <p className="label-mono">/ Desafío /</p>
        <h1 className="mt-3 font-display text-3xl font-bold">No encontramos esa guía</h1>
        <p className="mt-3 text-[color:var(--orbit-muted)]">
          El id no coincide con ningún desafío del seed. Vuelve al listado.
        </p>
        <Link
          to="/desafios"
          className="mt-6 inline-flex rounded-full bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] px-5 py-3 text-sm font-semibold text-white"
        >
          Ver desafíos
        </Link>
      </section>
    );
  }

  const notas = notasMap[desafio.id] ?? {};
  const recursosOficiales = desafio.recursos_oficiales ?? [];
  const mundosRel = EXPLORADOR_MUNDOS.filter((m) => m.desafioIds.includes(desafio.id));

  function addGuideToolsToKit() {
    for (const toolId of desafio!.donde_explorar) {
      add(toolId);
    }
    openDrawer();
  }

  function exportNotes() {
    downloadTextFile(
      `notas-${desafio!.id}.md`,
      exportDesafioMarkdown(desafio!, notas),
      'text/markdown;charset=utf-8',
    );
  }

  return (
    <article className="mx-auto max-w-4xl">
      <p className="label-mono">/ Guía para pensar /</p>
      <h1 className="mt-3 font-display text-4xl font-bold tracking-tight">{desafio.titulo_es}</h1>
      <p className="mt-2 text-sm text-[color:var(--orbit-muted)]">{desafio.titulo}</p>

      <div
        className="mt-4 rounded-2xl border border-orbit-coral/50 bg-orbit-coral/15 px-4 py-3 text-sm"
        role="note"
      >
        <strong>Aviso:</strong> Esta guía no resuelve el desafío. El trabajo y las ideas son de tu
        equipo.
      </div>

      <div className="mt-4">
        <RecursosOficialesBanner />
      </div>

      {mundosRel.length > 0 ? (
        <div className="card-orbit mt-4 p-4 text-sm">
          <p className="label-mono">/ Explorar el mundo (complementario) /</p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {mundosRel.map((m) => (
              <li key={m.id}>
                <Link
                  to="/ayuda#mundo"
                  className="rounded-full border border-[color:var(--orbit-line)] px-3 py-1 font-semibold"
                >
                  {m.titulo}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-xs text-[color:var(--orbit-muted)]">
            Capas, sensores e índices NASA asociados a fenómenos reales — para pensar, no para
            cerrar la solución.
          </p>
        </div>
      ) : null}

      <div className="mt-4 flex flex-wrap gap-2 text-sm">
        <span className="rounded-full border border-[color:var(--orbit-line)] px-3 py-1">
          {desafio.tipo}
        </span>
        {desafio.dificultad.map((item) => (
          <span
            key={item}
            className="rounded-full border border-[color:var(--orbit-line)] px-3 py-1 font-mono text-xs uppercase tracking-[0.14em]"
          >
            {item}
          </span>
        ))}
        {desafio.temas.map((tema) => (
          <span
            key={tema}
            className="rounded-full bg-[color:var(--orbit-chip)] px-3 py-1 text-[color:var(--orbit-muted)]"
          >
            {tema}
          </span>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <a
          href={desafio.url}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] px-4 py-2 text-sm font-semibold text-white"
        >
          Enunciado oficial (inglés)
        </a>
        <button
          type="button"
          onClick={addGuideToolsToKit}
          className="rounded-full border border-[color:var(--orbit-line)] px-4 py-2 text-sm font-semibold"
        >
          Agregar recursos de esta guía a Mi kit
        </button>
        <button
          type="button"
          onClick={exportNotes}
          className="rounded-full border border-[color:var(--orbit-line)] px-4 py-2 text-sm font-semibold"
        >
          Exportar notas a Markdown
        </button>
        <Link
          to="/desafios"
          className="rounded-full border border-[color:var(--orbit-line)] px-4 py-2 text-sm font-semibold"
        >
          Volver al listado
        </Link>
      </div>

      <section className="card-orbit mt-8 p-6">
        <h2 className="font-display text-2xl font-bold">Resumen</h2>
        <p className="mt-3 text-[color:var(--orbit-muted)]">{desafio.resumen_es}</p>
        <p className="mt-3 text-xs text-[color:var(--orbit-muted)]">
          Fuente del listado: {catalogo.challenges.fuente}
        </p>
      </section>

      <section className="card-orbit mt-6 p-6">
        <h2 className="font-display text-2xl font-bold">Cómo pensarlo</h2>
        <p className="mt-2 text-sm text-[color:var(--orbit-muted)]">
          Completa el método general de 7 pasos con las ideas de tu equipo. Se guardan en tu
          navegador.
        </p>
        <div className="mt-5 space-y-4">
          {metodoGeneral.map((paso, index) => (
            <label key={paso.paso} className="grid gap-2">
              <span className="font-semibold">
                <span className="label-mono mr-2">{String(index + 1).padStart(2, '0')}</span>
                {paso.paso}
              </span>
              <span className="text-sm text-[color:var(--orbit-muted)]">{paso.pregunta}</span>
              <textarea
                value={notas[paso.paso] ?? ''}
                onChange={(event) => setNota(desafio.id, paso.paso, event.target.value)}
                rows={3}
                className="rounded-xl border border-[color:var(--orbit-line)] bg-[color:var(--orbit-chip)] px-3 py-2 text-sm"
                placeholder="Escribe la respuesta de tu equipo…"
                aria-label={`Nota del paso ${paso.paso}`}
              />
            </label>
          ))}
        </div>
      </section>

      <section className="card-orbit mt-6 p-6">
        <h2 className="font-display text-2xl font-bold">Preguntas guía</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-[color:var(--orbit-muted)]">
          {desafio.preguntas_guia.map((pregunta) => (
            <li key={pregunta}>{pregunta}</li>
          ))}
        </ul>
      </section>

      <section className="card-orbit mt-6 p-6">
        <h2 className="font-display text-2xl font-bold">Conceptos que conviene aprender</h2>
        <ul className="mt-3 space-y-2">
          {desafio.conceptos_para_aprender.map((concepto) => {
            const term = matchGlossaryTerm(concepto);
            return (
              <li key={concepto} className="text-sm">
                {term ? (
                  <Link
                    to={`/glosario#${term.id}`}
                    className="font-semibold underline-offset-2 hover:underline"
                  >
                    {concepto}
                  </Link>
                ) : (
                  <span>{concepto}</span>
                )}
              </li>
            );
          })}
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="font-display text-2xl font-bold">Dónde explorar</h2>
        <p className="mt-2 text-sm text-[color:var(--orbit-muted)]">
          Puntos de partida en la Bitácora, no la receta del desafío.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {desafio.donde_explorar.map((toolId) => {
            const tool = toolsById.get(toolId);
            if (!tool) {
              return (
                <div key={toolId} className="card-orbit p-4 text-sm text-orbit-coral">
                  TODO: revisar id de herramienta “{toolId}”
                </div>
              );
            }
            return (
              <article key={toolId} className="card-orbit flex flex-col gap-2 p-4">
                <h3 className="font-display text-lg font-bold">{tool.nombre}</h3>
                <p className="text-sm text-[color:var(--orbit-muted)] line-clamp-3">
                  {tool.descripcion}
                </p>
                <div className="mt-auto flex flex-wrap gap-2 pt-2">
                  <Link
                    to={`/bitacora?q=${encodeURIComponent(tool.nombre)}`}
                    className="text-sm font-semibold underline-offset-2 hover:underline"
                  >
                    Ver en bitácora
                  </Link>
                  <button
                    type="button"
                    onClick={() => add(tool.id)}
                    className="text-sm font-semibold"
                  >
                    + Mi kit
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="card-orbit mt-6 p-6">
        <h2 className="font-display text-2xl font-bold">Perfiles útiles en el equipo</h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {desafio.perfiles_utiles.map((perfil) => (
            <li
              key={perfil}
              className="rounded-full border border-[color:var(--orbit-line)] px-3 py-1 text-sm"
            >
              {perfil}
            </li>
          ))}
        </ul>
      </section>

      <section className="card-orbit mt-6 p-6">
        <h2 className="font-display text-2xl font-bold">Trampas comunes</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-[color:var(--orbit-muted)]">
          {desafio.trampas.map((trampa) => (
            <li key={trampa}>{trampa}</li>
          ))}
        </ul>
      </section>

      <section className="card-orbit mt-6 p-6">
        <h2 className="font-display text-2xl font-bold">Autoevaluación antes de entregar</h2>
        <ul className="mt-3 space-y-2">
          {desafio.autoevaluacion.map((item) => (
            <li key={item} className="rounded-2xl border border-[color:var(--orbit-line)] px-3 py-2 text-sm">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="card-orbit mt-6 p-6">
        <h2 className="font-display text-2xl font-bold">Recursos oficiales</h2>
        {recursosOficiales.length === 0 ? (
          <p className="mt-3 rounded-2xl border border-dashed border-[color:var(--orbit-line)] px-4 py-3 text-sm text-[color:var(--orbit-muted)]">
            Se publican el 28 de octubre de 2026. Completa el campo{' '}
            <code className="font-mono text-xs">recursos_oficiales</code> en{' '}
            <code className="font-mono text-xs">src/content/challenges.json</code> ese día.
          </p>
        ) : (
          <ul className="mt-3 list-disc space-y-2 pl-5">
            {recursosOficiales.map((recurso) => (
              <li key={recurso}>
                <a href={recurso} target="_blank" rel="noopener noreferrer" className="underline">
                  {recurso}
                </a>
              </li>
            ))}
          </ul>
        )}
      </section>

      <p className="mt-8 text-sm text-[color:var(--orbit-muted)]">{catalogo.challenges.regla_editorial}</p>
    </article>
  );
}
