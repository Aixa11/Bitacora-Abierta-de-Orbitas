import { useState } from 'react';
import type { Herramienta } from '../../content/schema';
import { useI18n } from '../../i18n/useI18n';
import { useBitacoraLabels } from '../../lib/bitacora/useLabels';
import { useKit } from '../../store/kit';
import { LegalDot } from './LegalDot';

type ToolCardProps = {
  tool: Herramienta;
};

export function ToolCard({ tool }: ToolCardProps) {
  const inKit = useKit((state) => state.ids.includes(tool.id));
  const toggle = useKit((state) => state.toggle);
  const [copied, setCopied] = useState(false);
  const { t } = useI18n();
  const labels = useBitacoraLabels();

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
        <span className="chip-orbit">
          {labels.origen[tool.origen]}
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
            className="btn-orbit-sm btn-orbit-outline absolute right-2 top-2"
          >
            {copied ? t('common.copied') : t('common.copy')}
          </button>
          <pre className="overflow-x-auto pr-16 font-mono text-xs text-orbit-aqua">
            <code>{tool.snippet}</code>
          </pre>
        </div>
      ) : null}
      <div className="flex flex-wrap gap-2">
        {[
          labels.categoria[tool.categoria],
          labels.tipo[tool.tipo],
          labels.acceso[tool.acceso],
          labels.nivel[tool.nivel],
        ].map((label) => (
          <span
            key={label}
            className="chip-orbit"
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
          className="btn-orbit-md btn-orbit-outline"
        >
          {t('common.openOfficial')}
        </a>
        <button
          type="button"
          aria-pressed={inKit}
          onClick={() => toggle(tool.id)}
          className="btn-orbit-toggle"
        >
          {inKit ? t('common.removeFromKit') : t('common.addToKit')}
        </button>
      </div>
    </article>
  );
}
