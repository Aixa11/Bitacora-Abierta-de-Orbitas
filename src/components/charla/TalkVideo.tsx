import { useEffect, useId, useRef, useState } from 'react';
import { TALK } from '../../content/talk';
import { useI18n } from '../../i18n/useI18n';

type CaptionLang = 'es' | 'en' | 'off';

/**
 * Reproductor del webinar con subtítulos ES (audio) y EN (traducción).
 * Las pistas VTT se cargan como blob para evitar fallos del service worker.
 */
export function TalkVideo() {
  const { t, locale } = useI18n();
  const videoRef = useRef<HTMLVideoElement>(null);
  const titleId = useId();
  const [captionLang, setCaptionLang] = useState<CaptionLang>(locale === 'es' ? 'es' : 'en');
  const [available, setAvailable] = useState<boolean | null>(null);
  const [captionBlobs, setCaptionBlobs] = useState<{ es: string; en: string } | null>(null);

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();

    void (async () => {
      try {
        const res = await fetch(TALK.videoSrc, {
          method: 'HEAD',
          signal: controller.signal,
          cache: 'no-cache',
        });
        if (!cancelled) setAvailable(res.ok);
      } catch {
        // Algunos hosts no responden HEAD; el <video> decide al cargar.
        if (!cancelled) setAvailable(null);
      }
    })();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    const urls: string[] = [];

    void (async () => {
      try {
        const [esRes, enRes] = await Promise.all([
          fetch(TALK.captions.es, { cache: 'force-cache' }),
          fetch(TALK.captions.en, { cache: 'force-cache' }),
        ]);
        if (!esRes.ok || !enRes.ok) throw new Error('captions missing');
        const [esText, enText] = await Promise.all([esRes.text(), enRes.text()]);
        if (cancelled) return;
        if (!esText.startsWith('WEBVTT') || !enText.startsWith('WEBVTT')) {
          throw new Error('invalid vtt');
        }
        const esUrl = URL.createObjectURL(new Blob([esText], { type: 'text/vtt' }));
        const enUrl = URL.createObjectURL(new Blob([enText], { type: 'text/vtt' }));
        urls.push(esUrl, enUrl);
        setCaptionBlobs({ es: esUrl, en: enUrl });
      } catch {
        if (!cancelled) setCaptionBlobs(null);
      }
    })();

    return () => {
      cancelled = true;
      for (const url of urls) URL.revokeObjectURL(url);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const tracks = video.textTracks;
    for (let i = 0; i < tracks.length; i += 1) {
      const track = tracks[i];
      if (!track) continue;
      if (captionLang === 'off') {
        track.mode = 'hidden';
      } else if (track.language === captionLang) {
        track.mode = 'showing';
      } else {
        track.mode = 'hidden';
      }
    }
  }, [captionLang, captionBlobs, available]);

  const trackEs = captionBlobs?.es ?? TALK.captions.es;
  const trackEn = captionBlobs?.en ?? TALK.captions.en;

  return (
    <section className="card-orbit p-5 sm:p-6" aria-labelledby={titleId}>
      <p className="label-mono">/ {t('pages.charla.videoLabel')} /</p>
      <h2 id={titleId} className="mt-2 font-display text-2xl font-bold tracking-tight">
        {t('pages.charla.videoTitle')}
      </h2>
      <p className="mt-2 text-sm text-[color:var(--orbit-muted)]">{t('pages.charla.videoLead')}</p>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="label-mono text-[color:var(--orbit-muted)]" id="charla-captions-label">
          {t('pages.charla.subtitlesLabel')}
        </span>
        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-labelledby="charla-captions-label"
        >
          <button
            type="button"
            className={`btn-orbit-sm ${captionLang === 'es' ? 'btn-orbit-primary' : 'btn-orbit-outline'}`}
            aria-pressed={captionLang === 'es'}
            onClick={() => setCaptionLang('es')}
          >
            {t('pages.charla.subtitlesEs')}
          </button>
          <button
            type="button"
            className={`btn-orbit-sm ${captionLang === 'en' ? 'btn-orbit-primary' : 'btn-orbit-outline'}`}
            aria-pressed={captionLang === 'en'}
            onClick={() => setCaptionLang('en')}
          >
            {t('pages.charla.subtitlesEn')}
          </button>
          <button
            type="button"
            className={`btn-orbit-sm ${captionLang === 'off' ? 'btn-orbit-primary' : 'btn-orbit-outline'}`}
            aria-pressed={captionLang === 'off'}
            onClick={() => setCaptionLang('off')}
          >
            {t('pages.charla.subtitlesOff')}
          </button>
        </div>
      </div>

      {available === false ? (
        <p className="mt-4 rounded-2xl bg-[color:var(--orbit-chip)] px-4 py-3 text-sm" role="status">
          {t('pages.charla.videoMissing')}
        </p>
      ) : (
        <div className="mt-4 overflow-hidden rounded-2xl bg-black">
          <video
            key={`${trackEs}|${trackEn}`}
            ref={videoRef}
            className="aspect-video w-full"
            controls
            playsInline
            preload="metadata"
            controlsList="nodownload"
            onError={() => setAvailable(false)}
            onLoadedMetadata={() => setAvailable(true)}
          >
            <source src={TALK.videoSrc} type="video/mp4" />
            <track
              kind="captions"
              src={trackEs}
              srcLang="es"
              label={t('pages.charla.subtitlesEs')}
              default={captionLang === 'es'}
            />
            <track
              kind="captions"
              src={trackEn}
              srcLang="en"
              label={t('pages.charla.subtitlesEn')}
              default={captionLang === 'en'}
            />
          </video>
        </div>
      )}
    </section>
  );
}
