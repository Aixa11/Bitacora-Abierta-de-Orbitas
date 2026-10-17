import { useEffect, useId, useState } from 'react';
import { TALK } from '../../content/talk';
import { useI18n } from '../../i18n/useI18n';

/**
 * Muestra solo el PDF de la pitch.
 * Se carga por fetch → blob URL para que el service worker no inyecte index.html
 * dentro del iframe (eso solo pasa en producción con PWA; en local no hay SW).
 */
export function PitchViewer() {
  const { t } = useI18n();
  const titleId = useId();
  const pdfUrl = TALK.pitchPdf;
  const [blobSrc, setBlobSrc] = useState<string | null>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    let cancelled = false;
    let objectUrl: string | null = null;

    setStatus('loading');
    setBlobSrc(null);

    void (async () => {
      try {
        const res = await fetch(pdfUrl, { cache: 'no-cache' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const buffer = await res.arrayBuffer();
        const magic = new TextDecoder('ascii').decode(buffer.slice(0, 4));
        if (magic !== '%PDF') throw new Error('not a pdf');
        const blob = new Blob([buffer], { type: 'application/pdf' });
        objectUrl = URL.createObjectURL(blob);
        if (cancelled) {
          URL.revokeObjectURL(objectUrl);
          return;
        }
        setBlobSrc(objectUrl);
        setStatus('ready');
      } catch {
        if (!cancelled) setStatus('error');
      }
    })();

    return () => {
      cancelled = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [pdfUrl]);

  return (
    <section className="card-orbit p-5 sm:p-6" aria-labelledby={titleId}>
      <p className="label-mono">/ {t('pages.charla.pitchLabel')} /</p>
      <h2 id={titleId} className="mt-2 font-display text-2xl font-bold tracking-tight">
        {t('pages.charla.pitchTitle')}
      </h2>
      <p className="mt-2 text-sm text-[color:var(--orbit-muted)]">{t('pages.charla.pitchLead')}</p>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <a
          className="btn-orbit-sm btn-orbit-primary"
          href={pdfUrl}
          target="_blank"
          rel="noreferrer"
        >
          {t('pages.charla.pitchOpen')}
        </a>
        <a className="btn-orbit-sm btn-orbit-outline" href={pdfUrl} download>
          {t('pages.charla.pitchDownload')}
        </a>
      </div>

      <div className="mt-6">
        {status === 'loading' ? (
          <p className="rounded-2xl bg-[color:var(--orbit-chip)] px-4 py-3 text-sm" role="status">
            {t('pages.charla.pdfLoading')}
          </p>
        ) : null}

        {status === 'error' ? (
          <p className="rounded-2xl bg-[color:var(--orbit-chip)] px-4 py-3 text-sm" role="alert">
            {t('pages.charla.pdfMissing')}{' '}
            <a
              className="text-[color:var(--orbit-aqua)] underline-offset-2 hover:underline"
              href={pdfUrl}
              target="_blank"
              rel="noreferrer"
            >
              {t('pages.charla.pitchOpen')}
            </a>
          </p>
        ) : null}

        {status === 'ready' && blobSrc ? (
          <iframe
            title={t('pages.charla.pdfEmbedTitle')}
            src={`${blobSrc}#view=FitH`}
            className="h-[min(80vh,720px)] w-full rounded-2xl bg-white"
            // Sandbox sin allow-same-origin evita que un HTML inyectado tome el padre;
            // blob: + application/pdf no necesita scripts.
          />
        ) : null}
      </div>
    </section>
  );
}
