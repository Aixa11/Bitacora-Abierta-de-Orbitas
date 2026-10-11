import { useEffect } from 'react';
import { usePreferences } from '../../store/preferences';

export function ThemeSync() {
  const theme = usePreferences((state) => state.theme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return null;
}
