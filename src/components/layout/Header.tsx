import { useEffect, useId, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { OrbitasLogo } from '../brand/OrbitasLogo';
import { useKit } from '../../store/kit';
import { usePreferences } from '../../store/preferences';

const NAV_ITEMS = [
  { to: '/', label: 'Inicio' },
  { to: '/ruta', label: 'Ruta' },
  { to: '/desafios', label: 'Desafíos' },
  { to: '/sensores', label: 'Sensores' },
  { to: '/laboratorio', label: 'Laboratorio' },
  { to: '/bitacora', label: 'Bitácora' },
  { to: '/equipo', label: 'Equipo' },
  { to: '/entrega', label: 'Entrega' },
  { to: '/reglas', label: 'Reglas' },
  { to: '/charla', label: 'Charla' },
  { to: '/glosario', label: 'Glosario' },
  { to: '/ayuda', label: 'Ayuda' },
] as const;

function navClassName({ isActive }: { isActive: boolean }) {
  return [
    'rounded-2xl px-4 py-3 text-base transition-colors duration-orbit',
    isActive
      ? 'bg-[color:var(--orbit-chip)] font-semibold text-[color:var(--orbit-text)]'
      : 'text-[color:var(--orbit-muted)] hover:bg-[color:var(--orbit-chip)] hover:text-[color:var(--orbit-text)]',
  ].join(' ');
}

/** Altura única de logo y botones en toda la barra (todas las rutas). */
const BAR_CONTROL = 'h-11';

const toolBtn = [
  'inline-flex items-center justify-center gap-2 rounded-full border border-[color:var(--orbit-line)] bg-[color:var(--orbit-chip)] px-4 text-sm font-semibold text-[color:var(--orbit-text)] transition-colors hover:border-[color:color-mix(in_srgb,var(--orbit-line)_80%,#7C3AED)]',
  BAR_CONTROL,
].join(' ');

export function Header() {
  const menuId = useId();
  const [menuOpen, setMenuOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const theme = usePreferences((state) => state.theme);
  const toggleTheme = usePreferences((state) => state.toggleTheme);
  const kitCount = useKit((state) => state.ids.length);
  const openDrawer = useKit((state) => state.openDrawer);
  const nextThemeLabel = theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro';

  useEffect(() => {
    if (!menuOpen) return;

    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setMenuOpen(false);
    }

    function onPointer(event: MouseEvent) {
      if (!panelRef.current) return;
      if (panelRef.current.contains(event.target as Node)) return;
      const target = event.target as HTMLElement | null;
      if (target?.closest('[data-menu-toggle]')) return;
      setMenuOpen(false);
    }

    window.addEventListener('keydown', onKey);
    window.addEventListener('mousedown', onPointer);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('mousedown', onPointer);
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-30 border-b border-[color:var(--orbit-line)] bg-[color:color-mix(in_srgb,var(--orbit-bg)_88%,transparent)] backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-[1220px] items-center justify-between gap-3 px-4 py-3 sm:gap-4 sm:px-6">
        <NavLink
          to="/"
          className={`inline-flex min-w-0 shrink items-center text-[color:var(--orbit-text)] ${BAR_CONTROL}`}
          aria-label="orbitas, ir al inicio"
          onClick={() => setMenuOpen(false)}
        >
          <OrbitasLogo className={`${BAR_CONTROL} w-auto max-w-[min(46vw,220px)]`} />
        </NavLink>

        <div className="flex shrink-0 items-center gap-2" role="toolbar" aria-label="Acciones">
          <button type="button" onClick={openDrawer} className={toolBtn} aria-label="Abrir mi kit">
            Mi kit
            <span className="inline-grid h-5 min-w-5 place-items-center rounded-full bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] px-1 text-xs font-bold text-white">
              {kitCount}
            </span>
          </button>
          <button type="button" onClick={toggleTheme} className={toolBtn} aria-label={nextThemeLabel}>
            {theme === 'dark' ? 'Claro' : 'Oscuro'}
          </button>
          <button
            type="button"
            data-menu-toggle
            className={`${toolBtn} border-transparent bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] text-white hover:border-transparent`}
            aria-expanded={menuOpen}
            aria-controls={menuId}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div
          ref={panelRef}
          id={menuId}
          className="border-t border-[color:var(--orbit-line)] bg-[color:color-mix(in_srgb,var(--orbit-bg)_96%,transparent)]"
        >
          <nav
            className="mx-auto grid w-full max-w-[1220px] gap-1 px-4 py-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3"
            aria-label="Secciones"
          >
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={navClassName}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
