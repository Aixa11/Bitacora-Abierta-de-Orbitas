import { useCallback, useState } from 'react';
import { ContentLocaleNotice } from '../components/layout/ContentLocaleNotice';
import { HowtoPanel } from '../components/lab/HowtoPanel';
import { useI18n } from '../i18n/useI18n';
import { KeplerSimulator } from '../components/lab/KeplerSimulator';
import { LabMap } from '../components/lab/LabMap';
import { defaultGibsDate, gibsTileUrl, GIBS_LAYERS } from '../content/gibsLayers';

export function LaboratorioPage() {
  const { t } = useI18n();
  const [gibsExampleUrl, setGibsExampleUrl] = useState(() =>
    gibsTileUrl(GIBS_LAYERS[1], defaultGibsDate()).replace('{z}/{y}/{x}', '4/5/6'),
  );

  const onGibsExampleUrlChange = useCallback((url: string) => {
    setGibsExampleUrl(url);
  }, []);

  return (
    <div className="space-y-8">
      <header className="max-w-3xl space-y-4">
        <div>
          <p className="label-mono">/ 03 · Laboratorio en vivo /</p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight">
            {t('pages.laboratorio.title')}
          </h1>
          <p className="mt-3 text-[color:var(--orbit-muted)]">{t('pages.laboratorio.lead')}</p>
        </div>
        <ContentLocaleNotice />
      </header>

      <LabMap onGibsExampleUrlChange={onGibsExampleUrlChange} />
      <KeplerSimulator />
      <HowtoPanel gibsExampleUrl={gibsExampleUrl} />
    </div>
  );
}
