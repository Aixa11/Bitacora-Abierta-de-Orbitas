import { useCallback, useState } from 'react';
import { HowtoPanel } from '../components/lab/HowtoPanel';
import { KeplerSimulator } from '../components/lab/KeplerSimulator';
import { LabMap } from '../components/lab/LabMap';
import { defaultGibsDate, gibsTileUrl, GIBS_LAYERS } from '../content/gibsLayers';

export function LaboratorioPage() {
  const [gibsExampleUrl, setGibsExampleUrl] = useState(() =>
    gibsTileUrl(GIBS_LAYERS[1], defaultGibsDate()).replace('{z}/{y}/{x}', '4/5/6'),
  );

  const onGibsExampleUrlChange = useCallback((url: string) => {
    setGibsExampleUrl(url);
  }, []);

  return (
    <div className="space-y-8">
      <header className="max-w-3xl">
        <p className="label-mono">/ 03 · Laboratorio en vivo /</p>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight">
          Mira el planeta con APIs abiertas
        </h1>
        <p className="mt-3 text-[color:var(--orbit-muted)]">
          Mosaicos diarios de NASA GIBS, eventos naturales de NASA EONET y órbitas de CelesTrak
          propagadas en tu navegador. Todo es gratis y no necesita clave de API.
        </p>
      </header>

      <LabMap onGibsExampleUrlChange={onGibsExampleUrlChange} />
      <KeplerSimulator />
      <HowtoPanel gibsExampleUrl={gibsExampleUrl} />
    </div>
  );
}
