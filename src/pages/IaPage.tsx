import { Link } from 'react-router-dom';
import { ContentLocaleNotice } from '../components/layout/ContentLocaleNotice';
import { herramientas } from '../content/catalog';
import { IA_NASA_DOCS, IA_NASA_FUENTE_HUB, IA_NASA_NOTA } from '../content/iaNasa';
import { useI18n } from '../i18n/useI18n';

const FAMILIA_LABEL: Record<(typeof IA_NASA_DOCS)[number]['familia'], string> = {
  hub: 'Hub',
  modelo: 'Modelo',
  agente: 'Agente / MCP',
  codigo: 'Código',
  lenguaje: 'Lenguaje',
};

const byId = new Map(herramientas.map((tool) => [tool.id, tool]));

export function IaPage() {
  const { t } = useI18n();
  const iaTools = herramientas.filter(
    (tool) => tool.categoria === 'ia' && (tool.origen === 'nasa' || /NASA|IBM/i.test(tool.organizacion)),
  );

  return (
    <div className="space-y-10">
      <header className="max-w-3xl space-y-4">
        <div>
          <p className="label-mono">/ IA NASA · modelos y agentes /</p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight">
            {t('pages.ia.title')}
          </h1>
          <p className="mt-3 text-lg text-[color:var(--orbit-muted)]">{t('pages.ia.lead')}</p>
        </div>
        <ContentLocaleNotice />
        <p className="rounded-2xl border border-orbit-coral/40 bg-orbit-coral/10 px-4 py-3 text-sm">
          Esta sección orienta: qué hace cada recurso y cómo empezar. No entrega arquitecturas ni
          soluciones de desafío. Cita siempre la licencia y la fuente.
        </p>
        <div className="flex flex-wrap gap-3 text-sm">
          <a
            href={IA_NASA_FUENTE_HUB}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline-offset-2 hover:underline"
          >
            Hub NASA AI for Science
          </a>
          <Link
            to="/bitacora?categoria=ia&origen=nasa"
            className="font-semibold underline-offset-2 hover:underline"
          >
            Ver en la Bitácora (filtro IA · NASA)
          </Link>
        </div>
      </header>

      <section aria-labelledby="ia-guias-titulo" className="space-y-4">
        <h2 id="ia-guias-titulo" className="font-display text-2xl font-bold">
          Qué hace cada una y cómo interactuar
        </h2>
        <div className="grid gap-4">
          {IA_NASA_DOCS.map((doc) => {
            const tool = byId.get(doc.toolId);
            return (
              <article key={doc.id} className="card-orbit p-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-[color:var(--orbit-line)] bg-[color:var(--orbit-chip)] px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-[0.14em]">
                    {FAMILIA_LABEL[doc.familia]}
                  </span>
                  {tool ? (
                    <span className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-[color:var(--orbit-muted)]">
                      {tool.tipo} · {tool.nivel}
                    </span>
                  ) : null}
                </div>
                <h3 className="mt-3 font-display text-xl font-bold">{doc.titulo}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[color:var(--orbit-muted)]">
                  <strong className="text-[color:var(--orbit-text)]">Qué hace: </strong>
                  {doc.queHace}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[color:var(--orbit-muted)]">
                  <strong className="text-[color:var(--orbit-text)]">Cómo usarlo: </strong>
                  {doc.comoUsarlo}
                </p>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-[color:var(--orbit-muted)]">
                  {doc.preguntas.map((pregunta) => (
                    <li key={pregunta}>{pregunta}</li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold">
                  {tool ? (
                    <a
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline-offset-2 hover:underline"
                    >
                      Abrir recurso oficial
                    </a>
                  ) : null}
                  <a
                    href={doc.fuente}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[color:var(--orbit-muted)] underline-offset-2 hover:underline"
                  >
                    Fuente
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section aria-labelledby="ia-catalogo-titulo" className="space-y-4">
        <h2 id="ia-catalogo-titulo" className="font-display text-2xl font-bold">
          En el catálogo ({iaTools.length} fichas IA con sello NASA/IBM)
        </h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {iaTools.map((tool) => (
            <li key={tool.id} className="card-orbit p-4 text-sm">
              <p className="font-display font-bold">{tool.nombre}</p>
              <p className="mt-1 text-[color:var(--orbit-muted)]">{tool.organizacion}</p>
              <p className="mt-2 text-[color:var(--orbit-muted)]">{tool.descripcion}</p>
              <a
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block font-semibold underline-offset-2 hover:underline"
              >
                {tool.url.replace(/^https?:\/\//, '').slice(0, 48)}…
              </a>
            </li>
          ))}
        </ul>
        <p className="text-sm text-[color:var(--orbit-muted)]">{IA_NASA_NOTA}</p>
      </section>
    </div>
  );
}
