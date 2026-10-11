import { Outlet } from 'react-router-dom';
import { usePreferences } from '../../store/preferences';
import { KitDrawer } from '../kit/KitDrawer';
import { Footer } from './Footer';
import { Header } from './Header';
import { ThemeSync } from './ThemeSync';

export function AppLayout() {
  const presentationMode = usePreferences((state) => state.presentationMode);

  return (
    <div className="flex min-h-screen flex-col">
      <ThemeSync />
      {!presentationMode ? (
        <a className="skip-link" href="#contenido">
          Saltar al contenido
        </a>
      ) : null}
      {!presentationMode ? <Header /> : null}
      <main
        id="contenido"
        className={
          presentationMode
            ? 'w-full flex-1'
            : 'mx-auto w-full max-w-[1220px] flex-1 px-4 py-10'
        }
      >
        <Outlet />
      </main>
      {!presentationMode ? <Footer /> : null}
      {!presentationMode ? <KitDrawer /> : null}
    </div>
  );
}
