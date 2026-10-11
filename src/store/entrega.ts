import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const ENTREGA_STORAGE_KEY = 'orbitas-bitacora-entrega';

type EntregaState = {
  checks: string[];
  notasEquipo: string;
  toggleCheck: (id: string) => void;
  setNotasEquipo: (value: string) => void;
  reset: () => void;
};

export const useEntrega = create<EntregaState>()(
  persist(
    (set, get) => ({
      checks: [],
      notasEquipo: '',
      toggleCheck: (id) => {
        const { checks } = get();
        set({
          checks: checks.includes(id) ? checks.filter((item) => item !== id) : [...checks, id],
        });
      },
      setNotasEquipo: (value) => set({ notasEquipo: value }),
      reset: () => set({ checks: [], notasEquipo: '' }),
    }),
    {
      name: ENTREGA_STORAGE_KEY,
      partialize: (state) => ({ checks: state.checks, notasEquipo: state.notasEquipo }),
    },
  ),
);
