import { usePreferences } from '../../store/preferences';

type OrbitasLogoProps = {
  className?: string;
  markOnly?: boolean;
};

/**
 * Logo oficial Órbitas (assets extraídos de las imágenes de marca).
 * Blanco en modo oscuro · negro en modo claro.
 */
export function OrbitasLogo({ className = 'h-11 w-auto', markOnly = false }: OrbitasLogoProps) {
  const theme = usePreferences((state) => state.theme);
  const src =
    theme === 'light'
      ? '/brand/orbitas-wordmark-dark.png?v=3'
      : '/brand/orbitas-wordmark.png?v=3';

  if (markOnly) {
    return (
      <img
        src="/brand/orbitas-mark.png"
        alt=""
        width={44}
        height={44}
        className={['h-11 w-11 select-none object-contain', className].filter(Boolean).join(' ')}
        draggable={false}
      />
    );
  }

  return (
    <img
      src={src}
      alt=""
      width={220}
      height={44}
      className={['h-11 w-auto select-none object-contain object-left', className]
        .filter(Boolean)
        .join(' ')}
      draggable={false}
    />
  );
}
