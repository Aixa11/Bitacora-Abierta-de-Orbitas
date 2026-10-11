import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { RUTA_PASOS } from '../content/ruta';

export const RUTA_STORAGE_KEY = 'orbitas-bitacora-ruta';

type RutaState = {
  pasoActivo: number;
  checks: Record<string, string[]>;
  setPasoActivo: (index: number) => void;
  toggleCheck: (pasoId: string, item: string) => void;
  isChecked: (pasoId: string, item: string) => boolean;
  progreso: () => { hechos: number; total: number; pct: number };
  reset: () => void;
};

function emptyChecks(): Record<string, string[]> {
  return Object.fromEntries(RUTA_PASOS.map((paso) => [paso.id, []]));
}

export const useRuta = create<RutaState>()(
  persist(
    (set, get) => ({
      pasoActivo: 0,
      checks: emptyChecks(),
      setPasoActivo: (index) => {
        if (index < 0 || index >= RUTA_PASOS.length) return;
        set({ pasoActivo: index });
      },
      toggleCheck: (pasoId, item) => {
        set((state) => {
          const current = state.checks[pasoId] ?? [];
          const next = current.includes(item)
            ? current.filter((value) => value !== item)
            : [...current, item];
          return { checks: { ...state.checks, [pasoId]: next } };
        });
      },
      isChecked: (pasoId, item) => (get().checks[pasoId] ?? []).includes(item),
      progreso: () => {
        const total = RUTA_PASOS.reduce((sum, paso) => sum + paso.checklist.length, 0);
        const hechos = RUTA_PASOS.reduce(
          (sum, paso) => sum + (get().checks[paso.id]?.length ?? 0),
          0,
        );
        return { hechos, total, pct: total === 0 ? 0 : Math.round((hechos / total) * 100) };
      },
      reset: () => set({ pasoActivo: 0, checks: emptyChecks() }),
    }),
    {
      name: RUTA_STORAGE_KEY,
      partialize: (state) => ({ pasoActivo: state.pasoActivo, checks: state.checks }),
    },
  ),
);
