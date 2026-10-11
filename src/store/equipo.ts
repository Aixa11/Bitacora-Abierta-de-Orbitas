import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { HITOS_DEFAULT, type HitoCronograma, type TaskItem, type TaskStatus } from '../content/equipo';

export const EQUIPO_STORAGE_KEY = 'orbitas-bitacora-equipo';

type EquipoState = {
  hitos: HitoCronograma[];
  tareas: TaskItem[];
  updateHito: (id: string, patch: Partial<Pick<HitoCronograma, 'horaSugerida' | 'detalle' | 'titulo'>>) => void;
  addTarea: (titulo: string, rolId?: string | null) => void;
  moveTarea: (id: string, estado: TaskStatus) => void;
  removeTarea: (id: string) => void;
  reset: () => void;
};

function createId(): string {
  return `t-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

export const useEquipo = create<EquipoState>()(
  persist(
    (set) => ({
      hitos: HITOS_DEFAULT,
      tareas: [
        {
          id: 'seed-idea',
          titulo: 'Cerrar pregunta GEOINT del equipo',
          estado: 'por-hacer',
          rolId: 'coordinacion',
        },
        {
          id: 'seed-datos',
          titulo: 'Localizar al menos un recurso NASA',
          estado: 'por-hacer',
          rolId: 'datos',
        },
      ],
      updateHito: (id, patch) =>
        set((state) => ({
          hitos: state.hitos.map((hito) => (hito.id === id ? { ...hito, ...patch } : hito)),
        })),
      addTarea: (titulo, rolId = null) => {
        const clean = titulo.trim();
        if (!clean) return;
        set((state) => ({
          tareas: [
            ...state.tareas,
            { id: createId(), titulo: clean, estado: 'por-hacer', rolId },
          ],
        }));
      },
      moveTarea: (id, estado) =>
        set((state) => ({
          tareas: state.tareas.map((tarea) => (tarea.id === id ? { ...tarea, estado } : tarea)),
        })),
      removeTarea: (id) =>
        set((state) => ({ tareas: state.tareas.filter((tarea) => tarea.id !== id) })),
      reset: () =>
        set({
          hitos: HITOS_DEFAULT,
          tareas: [],
        }),
    }),
    {
      name: EQUIPO_STORAGE_KEY,
      partialize: (state) => ({ hitos: state.hitos, tareas: state.tareas }),
    },
  ),
);
