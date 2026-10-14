import { useEffect, useId, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useI18n } from '../../i18n/useI18n';
import { useKit } from '../../store/kit';
import { usePreferences } from '../../store/preferences';
import { OrbitasLogo } from '../brand/OrbitasLogo';
import { LanguageSwitcher } from './LanguageSwitcher';

const NAV_ITEMS = [
  { to: '/', key: 'nav.home' },
  { to: '/ruta', key: 'nav.ruta' },
  { to: '/desafios', key: 'nav.desafios' },
  { to: '/sensores', key: 'nav.sensores' },
  { to: '/laboratorio', key: 'nav.laboratorio' },
  { to: '/bitacora', key: 'nav.bitacora' },
  { to: '/ia', key: 'nav.ia' },
  { to: '/equipo', key: 'nav.equipo' },
  { to: '/entrega', key: 'nav.entrega' },
  { to: '/reglas', key: 'nav.reglas' },
  { to: '/charla', key: 'nav.charla' },
  { to: '/glosario', key: 'nav.glosario' },
  { to: '/ayuda', key: 'nav.ayuda' },
] as const;

function navClassName({ isActive }: { isActive: boolean }) {
  return [
    'rounded-2xl px-4 py-3 text-base transition-colors duration-orbit',
    isActive
      ? 'bg-[color:var(--orbit-chip)] font-semibold text-[color:var(--orbit-text)]'
      : 'text-[color:var(--orbit-muted)] hover:bg-[color:var(--orbit-chip)] hover:text-[color:var(--orbit-text)]',
  ].join(' ');
}

const BAR_CONTROL = 'h-11';

export function Header() {
  const menuId = useId();
  const [menuOpen, setMenuOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const theme = usePreferences((state) => state.theme);
  const toggleTheme = usePreferences((state) => state.toggleTheme);
  const kitCount = useKit((state) => state.ids.length);
  const openDrawer = useKit((state) => state.openDrawer);
  const { t } = useI18n();
  const nextThemeLabel = theme === 'dark' ? t('header.themeToLight') : t('header.themeToDark');

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
          aria-label={t('a11y.homeLogo')}
          onClick={() => setMenuOpen(false)}
        >
          <OrbitasLogo className={`${BAR_CONTROL} w-auto max-w-[min(46vw,220px)]`} />
        </NavLink>

        <div className="flex shrink-0 items-center gap-2" role="toolbar" aria-label={t('a11y.actions')}>
          <LanguageSwitcher />
          <button
            type="button"
            onClick={openDrawer}
            className="btn-orbit-bar btn-orbit-outline"
            aria-label={t('header.openKit')}
          >
            {t('header.myKit')}
            <span className="inline-grid h-5 min-w-5 place-items-center rounded-full bg-gradient-to-r from-orbit-violet to-orbit-blue px-1 text-xs font-bold text-white">
              {kitCount}
            </span>
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            className="btn-orbit-bar btn-orbit-outline"
            aria-label={nextThemeLabel}
          >
            {theme === 'dark' ? t('header.light') : t('header.dark')}
          </button>
          <button
            type="button"
            data-menu-toggle
            className="btn-orbit-bar btn-orbit-primary"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? t('header.closeMenu') : t('header.openMenu')}
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
            aria-label={t('a11y.sections')}
          >
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={navClassName}
                onClick={() => setMenuOpen(false)}
              >
                {t(item.key)}
              </NavLink>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
