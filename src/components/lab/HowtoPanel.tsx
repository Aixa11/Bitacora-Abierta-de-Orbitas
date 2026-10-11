import { useState } from 'react';
import { EONET_URL } from '../../lib/api/eonet';
import { celestrakTleUrl } from '../../lib/api/celestrak';

type HowtoPanelProps = {
  gibsExampleUrl: string;
};

export function HowtoPanel({ gibsExampleUrl }: HowtoPanelProps) {
  const [copied, setCopied] = useState<string | null>(null);

  async function copy(label: string, text: string) {
    await navigator.clipboard.writeText(text);
    setCopied(label);
    window.setTimeout(() => setCopied(null), 1600);
  }

  const fetchSnippet = `// Navegador
const r = await fetch("${EONET_URL}");
const data = await r.json();
console.log(data.events.length);`;

  const pythonSnippet = `import requests
url = "${EONET_URL}"
data = requests.get(url, timeout=8).json()
print(len(data["events"]))`;

  const tleUrl = celestrakTleUrl('25544');

  return (
    <details className="card-orbit p-5">
      <summary className="cursor-pointer font-display text-xl font-bold">
        ¿Cómo se hizo? Las llamadas reales
      </summary>
      <div className="mt-4 space-y-5 text-sm text-[color:var(--orbit-muted)]">
        <div>
          <p className="font-semibold text-[color:var(--orbit-text)]">1. Mosaico GIBS (WMTS)</p>
          <pre className="mt-2 overflow-x-auto rounded-2xl bg-[color:var(--orbit-surface-strong)] p-3 font-mono text-xs text-orbit-aqua">
            <code>{gibsExampleUrl}</code>
          </pre>
          <button
            type="button"
            className="mt-2 text-xs font-semibold"
            onClick={() => void copy('gibs', gibsExampleUrl)}
          >
            {copied === 'gibs' ? 'Copiado' : 'Copiar URL'}
          </button>
        </div>
        <div>
          <p className="font-semibold text-[color:var(--orbit-text)]">2. Eventos EONET</p>
          <pre className="mt-2 overflow-x-auto rounded-2xl bg-[color:var(--orbit-surface-strong)] p-3 font-mono text-xs text-orbit-aqua">
            <code>{EONET_URL}</code>
          </pre>
          <div className="mt-2 flex flex-wrap gap-3">
            <button
              type="button"
              className="text-xs font-semibold"
              onClick={() => void copy('fetch', fetchSnippet)}
            >
              {copied === 'fetch' ? 'Copiado' : 'Copiar fetch'}
            </button>
            <button
              type="button"
              className="text-xs font-semibold"
              onClick={() => void copy('py', pythonSnippet)}
            >
              {copied === 'py' ? 'Copiado' : 'Copiar Python'}
            </button>
          </div>
        </div>
        <div>
          <p className="font-semibold text-[color:var(--orbit-text)]">
            3. Órbita CelesTrak + satellite.js (SGP4)
          </p>
          <pre className="mt-2 overflow-x-auto rounded-2xl bg-[color:var(--orbit-surface-strong)] p-3 font-mono text-xs text-orbit-aqua">
            <code>{tleUrl}</code>
          </pre>
          <button
            type="button"
            className="mt-2 text-xs font-semibold"
            onClick={() => void copy('tle', tleUrl)}
          >
            {copied === 'tle' ? 'Copiado' : 'Copiar URL TLE'}
          </button>
        </div>
        <p>
          Timeouts de 8 s, reintento manual y caché en memoria de 10 min. Si una API falla, el resto
          del laboratorio sigue disponible. El basemap usa Esri World Gray Canvas (sin clave); CARTO
          ya no se usa porque exige API key.
        </p>
      </div>
    </details>
  );
}
