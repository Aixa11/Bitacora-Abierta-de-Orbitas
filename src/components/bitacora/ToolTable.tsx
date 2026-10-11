import type { Herramienta } from '../../content/schema';
import { useI18n } from '../../i18n/useI18n';
import { useBitacoraLabels } from '../../lib/bitacora/useLabels';
import { useKit } from '../../store/kit';
import { LegalDot } from './LegalDot';

type ToolTableProps = {
  tools: Herramienta[];
};

export function ToolTable({ tools }: ToolTableProps) {
  const ids = useKit((state) => state.ids);
  const toggle = useKit((state) => state.toggle);
  const { t } = useI18n();
  const labels = useBitacoraLabels();

  return (
    <div className="card-orbit overflow-x-auto">
      <table className="min-w-full border-collapse text-left text-sm">
        <caption className="sr-only">{t('labels.view.tabla')}</caption>
        <thead>
          <tr className="border-b border-[color:var(--orbit-line)] font-mono text-[0.65rem] uppercase tracking-[0.16em] text-[color:var(--orbit-muted)]">
            <th className="px-4 py-3 font-medium">{labels.sort.nombre}</th>
            <th className="px-4 py-3 font-medium">Origen</th>
            <th className="px-4 py-3 font-medium">Para qué</th>
            <th className="px-4 py-3 font-medium">Tipo</th>
            <th className="px-4 py-3 font-medium">Acceso</th>
            <th className="px-4 py-3 font-medium">{labels.sort.nivel}</th>
            <th className="px-4 py-3 font-medium">Legal</th>
            <th className="px-4 py-3 font-medium">{t('a11y.actions')}</th>
          </tr>
        </thead>
        <tbody>
          {tools.map((tool) => {
            const inKit = ids.includes(tool.id);
            return (
              <tr key={tool.id} className="border-b border-[color:var(--orbit-line)] align-top">
                <td className="px-4 py-3">
                  <div className="font-semibold">{tool.nombre}</div>
                  <div className="text-xs text-[color:var(--orbit-muted)]">{tool.organizacion}</div>
                </td>
                <td className="px-4 py-3">{labels.origen[tool.origen]}</td>
                <td className="px-4 py-3">{labels.categoria[tool.categoria]}</td>
                <td className="px-4 py-3">{labels.tipo[tool.tipo]}</td>
                <td className="px-4 py-3">{labels.acceso[tool.acceso]}</td>
                <td className="px-4 py-3">{labels.nivel[tool.nivel]}</td>
                <td className="px-4 py-3">
                  <LegalDot legal={tool.legal} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-2">
                    <a
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline-offset-2 hover:underline"
                    >
                      {t('common.openOfficial')}
                    </a>
                    <button
                      type="button"
                      aria-pressed={inKit}
                      onClick={() => toggle(tool.id)}
                      className="font-semibold"
                    >
                      {inKit ? t('common.removeFromKit') : t('common.addToKit')}
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
