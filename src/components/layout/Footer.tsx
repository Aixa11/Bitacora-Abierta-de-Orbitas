import { usePreferences } from '../../store/preferences';

export function Footer() {
  const clearAllData = usePreferences((state) => state.clearAllData);

  function handleClear() {
    const confirmed = window.confirm(
      '¿Quieres borrar tus datos locales (tema, kit, progreso y notas)? Esta acción no se puede deshacer.',
    );
    if (!confirmed) return;
    clearAllData();
    document.documentElement.dataset.theme = 'dark';
  }

  return (
    <footer className="mt-auto border-t border-[color:var(--orbit-line)] px-4 py-8">
      <div className="mx-auto flex w-full max-w-[1220px] flex-col gap-4 text-sm text-[color:var(--orbit-muted)]">
        <p>
          <strong className="font-display text-[color:var(--orbit-text)]">
            Órbitas · Bitácora Space Apps
          </strong>
          . Guía comunitaria e independiente, sin afiliación oficial con la NASA ni con el NASA
          Space Apps Challenge.
        </p>
        <p className="font-mono text-xs uppercase tracking-[0.16em]">
          Créditos: NASA GIBS · NASA EONET · CelesTrak · Esri World Gray Canvas · OpenStreetMap ·
          NASA Visible Earth / Earth Observatory (texturas 3D)
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleClear}
            className="rounded-full border border-[color:var(--orbit-line)] px-4 py-2 text-sm text-[color:var(--orbit-text)]"
          >
            Borrar mis datos
          </button>
        </div>
      </div>
    </footer>
  );
}
