import { useState } from 'react';
import type { Herramienta } from '../../content/schema';
import {
  ACCESO_LABELS,
  CATEGORIA_LABELS,
  NIVEL_LABELS,
  ORIGEN_LABELS,
  TIPO_LABELS,
} from '../../lib/bitacora/labels';
import { useKit } from '../../store/kit';
import { LegalDot } from './LegalDot';

type ToolCardProps = {
  tool: Herramienta;
};

export function ToolCard({ tool }: ToolCardProps) {
  const inKit = useKit((state) => state.ids.includes(tool.id));
  const toggle = useKit((state) => state.toggle);
  const [copied, setCopied] = useState(false);

  async function copySnippet() {
    if (!tool.snippet) return;
    try {
      await navigator.clipboard.writeText(tool.snippet);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <article className="card-orbit flex flex-col gap-3 p-5">
      <div className="flex items-start justify-between gap-3">
        <span className="rounded-full border border-[color:var(--orbit-line)] bg-[color:var(--orbit-chip)] px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-[0.14em]">
          {ORIGEN_LABELS[tool.origen]}
        </span>
        <LegalDot legal={tool.legal} />
      </div>
      <div>
        <h3 className="font-display text-xl font-bold tracking-tight">{tool.nombre}</h3>
        <p className="mt-1 text-sm text-[color:var(--orbit-muted)]">{tool.organizacion}</p>
      </div>
      <p className="text-sm leading-relaxed text-[color:var(--orbit-muted)]">{tool.descripcion}</p>
      {tool.snippet ? (
        <div className="relative rounded-2xl bg-[color:var(--orbit-surface-strong)] p-3">
          <button
            type="button"
            onClick={() => void copySnippet()}
            className="absolute right-2 top-2 rounded-full border border-[color:var(--orbit-line)] px-2 py-1 text-xs"
          >
            {copied ? 'Copiado' : 'Copiar'}
          </button>
          <pre className="overflow-x-auto pr-16 font-mono text-xs text-orbit-aqua">
            <code>{tool.snippet}</code>
          </pre>
        </div>
      ) : null}
      <div className="flex flex-wrap gap-2">
        {[
          CATEGORIA_LABELS[tool.categoria],
          TIPO_LABELS[tool.tipo],
          ACCESO_LABELS[tool.acceso],
          NIVEL_LABELS[tool.nivel],
        ].map((label) => (
          <span
            key={label}
            className="rounded-full border border-[color:var(--orbit-line)] px-2 py-0.5 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-[color:var(--orbit-muted)]"
          >
            {label}
          </span>
        ))}
      </div>
      <div className="mt-auto flex flex-wrap gap-2 pt-1">
        <a
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-[color:var(--orbit-line)] px-3 py-2 text-sm font-semibold"
        >
          Abrir sitio
        </a>
        <button
          type="button"
          aria-pressed={inKit}
          onClick={() => toggle(tool.id)}
          className={[
            'rounded-full px-3 py-2 text-sm font-semibold transition-colors duration-orbit',
            inKit
              ? 'bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] text-white'
              : 'border border-[color:var(--orbit-line)] bg-[color:var(--orbit-chip)]',
          ].join(' ')}
        >
          {inKit ? 'En mi kit' : '+ Mi kit'}
        </button>
      </div>
    </article>
  );
}
