import { useEffect, useId, useRef } from 'react';
import {
  downloadTextFile,
  exportKitBibTeX,
  exportKitJson,
  exportKitMarkdown,
} from '../../lib/kit/export';
import { useKit } from '../../store/kit';
import { LegalDot } from '../bitacora/LegalDot';

export function KitDrawer() {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const drawerOpen = useKit((state) => state.drawerOpen);
  const closeDrawer = useKit((state) => state.closeDrawer);
  const clear = useKit((state) => state.clear);
  const remove = useKit((state) => state.remove);
  const ids = useKit((state) => state.ids);
  const getItems = useKit((state) => state.items);
  const items = getItems();

  useEffect(() => {
    if (!drawerOpen) return;
    closeRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') closeDrawer();
    }

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [drawerOpen, closeDrawer]);

  if (!drawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        type="button"
        className="absolute inset-0 bg-black/55"
        aria-label="Cerrar mi kit"
        onClick={closeDrawer}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative flex h-full w-full max-w-md flex-col border-l border-[color:var(--orbit-line)] bg-[color:var(--orbit-surface-strong)] p-5 shadow-2xl"
      >
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <p className="label-mono">/ Mi kit /</p>
            <h2 id={titleId} className="mt-2 font-display text-2xl font-bold">
              Recursos para citar
            </h2>
            <p className="mt-1 text-sm text-[color:var(--orbit-muted)]">
              {ids.length} herramienta{ids.length === 1 ? '' : 's'} · se guardan en tu navegador
            </p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={closeDrawer}
            className="btn-orbit-md btn-orbit-outline"
          >
            Cerrar
          </button>
        </div>

        <ul className="flex-1 space-y-2 overflow-y-auto">
          {items.length === 0 ? (
            <li className="rounded-2xl border border-dashed border-[color:var(--orbit-line)] p-4 text-sm text-[color:var(--orbit-muted)]">
              Todavía no agregaste herramientas. Usa “+ Mi kit” en la bitácora.
            </li>
          ) : (
            items.map((tool) => (
              <li
                key={tool.id}
                className="panel-inset flex items-center gap-3 px-3 py-3"
              >
                <LegalDot legal={tool.legal} />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold">{tool.nombre}</p>
                  <p className="truncate text-xs text-[color:var(--orbit-muted)]">
                    {tool.organizacion}
                  </p>
                </div>
                <button
                  type="button"
                  aria-label={`Quitar ${tool.nombre}`}
                  onClick={() => remove(tool.id)}
                  className="btn-orbit-sm btn-orbit-outline"
                >
                  Quitar
                </button>
              </li>
            ))
          )}
        </ul>

        <div className="mt-4 grid gap-2 border-t border-[color:var(--orbit-line)] pt-4">
          <p className="text-xs text-[color:var(--orbit-muted)]">
            Recuerda completar misión, producto y versión de cada recurso antes de entregar.
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              disabled={items.length === 0}
              onClick={() =>
                downloadTextFile(
                  'recursos-space-apps.md',
                  exportKitMarkdown(items),
                  'text/markdown;charset=utf-8',
                )
              }
              className="rounded-full bg-gradient-to-r from-orbit-violet to-orbit-blue px-3 py-2 text-sm font-semibold text-white disabled:opacity-40"
            >
              Markdown
            </button>
            <button
              type="button"
              disabled={items.length === 0}
              onClick={() =>
                downloadTextFile(
                  'recursos-space-apps.json',
                  exportKitJson(items),
                  'application/json;charset=utf-8',
                )
              }
              className="btn-orbit-md btn-orbit-outline disabled:opacity-40"
            >
              JSON
            </button>
            <button
              type="button"
              disabled={items.length === 0}
              onClick={() =>
                downloadTextFile(
                  'recursos-space-apps.bib',
                  exportKitBibTeX(items),
                  'application/x-bibtex;charset=utf-8',
                )
              }
              className="btn-orbit-md btn-orbit-outline disabled:opacity-40"
            >
              BibTeX
            </button>
            <button
              type="button"
              disabled={items.length === 0}
              onClick={clear}
              className="btn-orbit-md btn-orbit-outline disabled:opacity-40"
            >
              Vaciar kit
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}
