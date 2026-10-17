import { useEffect, useState } from 'react';
import { PitchViewer } from '../components/charla/PitchViewer';
import { PresentationDeck } from '../components/charla/PresentationDeck';
import { TalkVideo } from '../components/charla/TalkVideo';
import { ContentLocaleNotice } from '../components/layout/ContentLocaleNotice';
import { TALK } from '../content/talk';
import { useI18n } from '../i18n/useI18n';
import { usePreferences } from '../store/preferences';

export function CharlaPage() {
  const { t } = useI18n();
  const setPresentationMode = usePreferences((state) => state.setPresentationMode);
  const [presenting, setPresenting] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    if (!presenting) setPresentationMode(false);
  }, [presenting, setPresentationMode]);

  if (presenting) {
    return (
      <PresentationDeck
        slideIndex={slideIndex}
        onSlideIndexChange={setSlideIndex}
        onExit={() => setPresenting(false)}
      />
    );
  }

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8">
      <ContentLocaleNotice />
      <header className="card-orbit p-6 sm:p-8">
        <p className="label-mono text-[color:var(--orbit-aqua)]">/ {t('nav.charla')} /</p>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
          {TALK.titulo}
        </h1>
        <p className="mt-2 text-lg text-[color:var(--orbit-muted)]">{TALK.subtitulo}</p>
        <p className="mt-4 max-w-3xl text-base leading-relaxed">{TALK.descripcion}</p>
        <dl className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
          <div className="panel-inset p-3">
            <dt className="label-mono text-[color:var(--orbit-muted)]">
              {t('pages.charla.metaDate')}
            </dt>
            <dd className="mt-1">{TALK.fechaLabel}</dd>
          </div>
          <div className="panel-inset p-3">
            <dt className="label-mono text-[color:var(--orbit-muted)]">
              {t('pages.charla.metaFormat')}
            </dt>
            <dd className="mt-1">{TALK.formato}</dd>
          </div>
          <div className="panel-inset p-3">
            <dt className="label-mono text-[color:var(--orbit-muted)]">
              {t('pages.charla.metaDuration')}
            </dt>
            <dd className="mt-1">
              {TALK.duracionMin} min + {TALK.preguntasMin} min {t('pages.charla.metaQuestions')}
            </dd>
          </div>
          <div className="panel-inset p-3">
            <dt className="label-mono text-[color:var(--orbit-muted)]">
              {t('pages.charla.metaEvent')}
            </dt>
            <dd className="mt-1">{TALK.evento}</dd>
          </div>
        </dl>
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            className="btn-orbit-xl btn-orbit-primary"
            onClick={() => {
              setSlideIndex(0);
              setPresenting(true);
            }}
          >
            {t('pages.charla.presentationMode')}
          </button>
          <a className="btn-orbit-xl btn-orbit-outline" href="#charla-video">
            {t('pages.charla.jumpVideo')}
          </a>
          <a className="btn-orbit-xl btn-orbit-outline" href="#charla-pitch">
            {t('pages.charla.jumpPitch')}
          </a>
        </div>
      </header>

      <section className="card-orbit p-6" aria-labelledby="charla-speaker">
        <p className="label-mono">/ {t('pages.charla.speakerLabel')} /</p>
        <h2 id="charla-speaker" className="mt-2 font-display text-2xl font-bold">
          {TALK.speaker.nombre}
        </h2>
        <p className="mt-1 text-[color:var(--orbit-muted)]">{TALK.speaker.rol}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <a
            className="btn-orbit-sm btn-orbit-outline"
            href={TALK.speaker.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
          <a
            className="btn-orbit-sm btn-orbit-outline"
            href={TALK.speaker.instagram}
            target="_blank"
            rel="noreferrer"
          >
            Instagram
          </a>
        </div>
      </section>

      <section className="card-orbit p-6" aria-labelledby="charla-agenda">
        <p className="label-mono">/ {t('pages.charla.agendaLabel')} /</p>
        <h2 id="charla-agenda" className="mt-2 font-display text-2xl font-bold">
          {t('pages.charla.agendaTitle')}
        </h2>
        <ol className="mt-4 grid gap-3">
          {TALK.agenda.map((item) => (
            <li key={item.id} className="panel-inset flex flex-col gap-1 p-4 sm:flex-row sm:gap-6">
              <span className="label-mono shrink-0 text-[color:var(--orbit-aqua)]">
                {item.minutos} min
              </span>
              <div>
                <p className="font-semibold">{item.titulo}</p>
                <p className="mt-1 text-sm text-[color:var(--orbit-muted)]">{item.resumen}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <div id="charla-video">
        <TalkVideo />
      </div>

      <div id="charla-pitch">
        <PitchViewer />
      </div>
    </div>
  );
}
