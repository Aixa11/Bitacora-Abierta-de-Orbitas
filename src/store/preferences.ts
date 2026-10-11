import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { HITOS_DEFAULT } from '../content/equipo';
import { DESAFIOS_STORAGE_KEY, useDesafioNotes } from './desafios';
import { ENTREGA_STORAGE_KEY, useEntrega } from './entrega';
import { EQUIPO_STORAGE_KEY, useEquipo } from './equipo';
import { KIT_STORAGE_KEY, useKit } from './kit';
import { RUTA_STORAGE_KEY, useRuta } from './ruta';

export type ThemeMode = 'dark' | 'light';

type PreferencesState = {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  /** Modo presentación de /charla (no se persiste). */
  presentationMode: boolean;
  setPresentationMode: (value: boolean) => void;
  clearAllData: () => void;
};

export const PREFERENCES_STORAGE_KEY = 'orbitas-bitacora';

export const usePreferences = create<PreferencesState>()(
  persist(
    (set) => ({
      theme: 'dark',
      presentationMode: false,
      setTheme: (theme) => set({ theme }),
      toggleTheme: () =>
        set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
      setPresentationMode: (presentationMode) => set({ presentationMode }),
      clearAllData: () => {
        localStorage.removeItem(PREFERENCES_STORAGE_KEY);
        localStorage.removeItem(KIT_STORAGE_KEY);
        localStorage.removeItem(RUTA_STORAGE_KEY);
        localStorage.removeItem(ENTREGA_STORAGE_KEY);
        localStorage.removeItem(EQUIPO_STORAGE_KEY);
        localStorage.removeItem(DESAFIOS_STORAGE_KEY);
        useKit.setState({ ids: [], drawerOpen: false });
        useRuta.getState().reset();
        useEntrega.getState().reset();
        useDesafioNotes.getState().reset();
        useEquipo.setState({ hitos: HITOS_DEFAULT, tareas: [] });
        set({ theme: 'dark', presentationMode: false });
      },
    }),
    {
      name: PREFERENCES_STORAGE_KEY,
      partialize: (state) => ({ theme: state.theme }),
    },
  ),
);
