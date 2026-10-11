import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const DESAFIOS_STORAGE_KEY = 'orbitas-bitacora-desafios';

type DesafiosNotesState = {
  /** desafioId → { pasoNombre → nota } */
  notas: Record<string, Record<string, string>>;
  setNota: (desafioId: string, paso: string, value: string) => void;
  getNotas: (desafioId: string) => Record<string, string>;
  reset: () => void;
};

export const useDesafioNotes = create<DesafiosNotesState>()(
  persist(
    (set, get) => ({
      notas: {},
      setNota: (desafioId, paso, value) => {
        set((state) => ({
          notas: {
            ...state.notas,
            [desafioId]: {
              ...(state.notas[desafioId] ?? {}),
              [paso]: value,
            },
          },
        }));
      },
      getNotas: (desafioId) => get().notas[desafioId] ?? {},
      reset: () => set({ notas: {} }),
    }),
    {
      name: DESAFIOS_STORAGE_KEY,
      partialize: (state) => ({ notas: state.notas }),
    },
  ),
);
