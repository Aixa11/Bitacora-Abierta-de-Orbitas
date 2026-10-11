import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Herramienta } from '../content/schema';
import { herramientas } from '../content/catalog';

export const KIT_STORAGE_KEY = 'orbitas-bitacora-kit';

type KitState = {
  ids: string[];
  drawerOpen: boolean;
  add: (id: string) => void;
  remove: (id: string) => void;
  toggle: (id: string) => void;
  clear: () => void;
  has: (id: string) => boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
  items: () => Herramienta[];
};

const byId = new Map(herramientas.map((tool) => [tool.id, tool]));

export const useKit = create<KitState>()(
  persist(
    (set, get) => ({
      ids: [],
      drawerOpen: false,
      add: (id) => {
        if (!byId.has(id)) return;
        set((state) => (state.ids.includes(id) ? state : { ids: [...state.ids, id] }));
      },
      remove: (id) => set((state) => ({ ids: state.ids.filter((item) => item !== id) })),
      toggle: (id) => {
        if (!byId.has(id)) return;
        const { ids } = get();
        if (ids.includes(id)) {
          set({ ids: ids.filter((item) => item !== id) });
        } else {
          set({ ids: [...ids, id] });
        }
      },
      clear: () => set({ ids: [] }),
      has: (id) => get().ids.includes(id),
      openDrawer: () => set({ drawerOpen: true }),
      closeDrawer: () => set({ drawerOpen: false }),
      toggleDrawer: () => set((state) => ({ drawerOpen: !state.drawerOpen })),
      items: () =>
        get()
          .ids.map((id) => byId.get(id))
          .filter((tool): tool is Herramienta => tool !== undefined),
    }),
    {
      name: KIT_STORAGE_KEY,
      partialize: (state) => ({ ids: state.ids }),
    },
  ),
);
