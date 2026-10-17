import { useEffect, useId, useRef, useState } from 'react';
import { TALK } from '../../content/talk';
import { useI18n } from '../../i18n/useI18n';

type CaptionLang = 'es' | 'en' | 'off';

/**
 * Reproductor del webinar con pistas WebVTT ES/EN.
 * El MP4 vive en public/media/charla (gitignore; ver README).
 */
export function TalkVideo() {
  const { t, locale } = useI18n();
  const videoRef = useRef<HTMLVideoElement>(null);
  const titleId = useId();
  const [captionLang, setCaptionLang] = useState<CaptionLang>(locale === 'es' ? 'es' : 'en');
  const [available, setAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(TALK.videoSrc, { method: 'HEAD' })
      .then((res) => {
        if (!cancelled) setAvailable(res.ok);
      })
      .catch(() => {
        if (!cancelled) setAvailable(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const tracks = video.textTracks;
    for (let i = 0; i < tracks.length; i += 1) {
      const track = tracks[i];
      if (!track) continue;
      const lang = track.language;
      if (captionLang === 'off') {
        track.mode = 'disabled';
      } else if (lang === captionLang) {
        track.mode = 'showing';
      } else {
        track.mode = 'disabled';
      }
    }
  }, [captionLang, available]);

  return (
    <section className="card-orbit p-5 sm:p-6" aria-labelledby={titleId}>
      <p className="label-mono">/ {t('pages.charla.videoLabel')} /</p>
      <h2 id={titleId} className="mt-2 font-display text-2xl font-bold tracking-tight">
        {t('pages.charla.videoTitle')}
      </h2>
      <p className="mt-2 text-sm text-[color:var(--orbit-muted)]">{t('pages.charla.videoLead')}</p>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <label className="label-mono text-[color:var(--orbit-muted)]" htmlFor="charla-captions">
          {t('pages.charla.subtitlesLabel')}
        </label>
        <select
          id="charla-captions"
          className="select-orbit"
          value={captionLang}
          onChange={(e) => setCaptionLang(e.target.value as CaptionLang)}
        >
          <option value="es">{t('pages.charla.subtitlesEs')}</option>
          <option value="en">{t('pages.charla.subtitlesEn')}</option>
          <option value="off">{t('pages.charla.subtitlesOff')}</option>
        </select>
      </div>

      {available === false ? (
        <p className="mt-4 rounded-2xl bg-[color:var(--orbit-chip)] px-4 py-3 text-sm" role="status">
          {t('pages.charla.videoMissing')}
        </p>
      ) : null}

      {available !== false ? (
        <div className="mt-4 overflow-hidden rounded-2xl bg-black">
          <video
            ref={videoRef}
            className="aspect-video w-full"
            controls
            playsInline
            preload="metadata"
            crossOrigin="anonymous"
          >
            <source src={TALK.videoSrc} type="video/mp4" />
            <track
              kind="captions"
              src={TALK.captions.es}
              srcLang="es"
              label={t('pages.charla.subtitlesEs')}
              default={captionLang === 'es'}
            />
            <track
              kind="captions"
              src={TALK.captions.en}
              srcLang="en"
              label={t('pages.charla.subtitlesEn')}
              default={captionLang === 'en'}
            />
          </video>
        </div>
      ) : null}

      {TALK.videoEmbedUrl ? (
        <p className="mt-3 text-sm">
          <a
            className="text-[color:var(--orbit-aqua)] underline-offset-2 hover:underline"
            href={TALK.videoEmbedUrl}
            target="_blank"
            rel="noreferrer"
          >
            {t('pages.charla.videoExternal')}
          </a>
        </p>
      ) : null}
    </section>
  );
}
