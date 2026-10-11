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

type ToolTableProps = {
  tools: Herramienta[];
};

export function ToolTable({ tools }: ToolTableProps) {
  const ids = useKit((state) => state.ids);
  const toggle = useKit((state) => state.toggle);

  return (
    <div className="card-orbit overflow-x-auto">
      <table className="min-w-full border-collapse text-left text-sm">
        <caption className="sr-only">Tabla de herramientas filtradas</caption>
        <thead>
          <tr className="border-b border-[color:var(--orbit-line)] font-mono text-[0.65rem] uppercase tracking-[0.16em] text-[color:var(--orbit-muted)]">
            <th className="px-4 py-3 font-medium">Nombre</th>
            <th className="px-4 py-3 font-medium">Origen</th>
            <th className="px-4 py-3 font-medium">Para qué</th>
            <th className="px-4 py-3 font-medium">Tipo</th>
            <th className="px-4 py-3 font-medium">Acceso</th>
            <th className="px-4 py-3 font-medium">Nivel</th>
            <th className="px-4 py-3 font-medium">Legal</th>
            <th className="px-4 py-3 font-medium">Acciones</th>
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
                <td className="px-4 py-3">{ORIGEN_LABELS[tool.origen]}</td>
                <td className="px-4 py-3">{CATEGORIA_LABELS[tool.categoria]}</td>
                <td className="px-4 py-3">{TIPO_LABELS[tool.tipo]}</td>
                <td className="px-4 py-3">{ACCESO_LABELS[tool.acceso]}</td>
                <td className="px-4 py-3">{NIVEL_LABELS[tool.nivel]}</td>
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
                      Abrir
                    </a>
                    <button
                      type="button"
                      aria-pressed={inKit}
                      onClick={() => toggle(tool.id)}
                      className="font-semibold"
                    >
                      {inKit ? 'En kit' : '+ Kit'}
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
