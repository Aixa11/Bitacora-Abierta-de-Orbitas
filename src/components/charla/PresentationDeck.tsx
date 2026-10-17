import { useEffect, useId } from 'react';
import { TALK } from '../../content/talk';
import { useI18n } from '../../i18n/useI18n';
import { usePreferences } from '../../store/preferences';

type Props = {
  slideIndex: number;
  onSlideIndexChange: (index: number) => void;
  onExit: () => void;
};

/**
 * Modo presentación a pantalla completa (oculta nav vía presentationMode).
 * Flechas / PageUp-PageDown / Escape.
 */
export function PresentationDeck({ slideIndex, onSlideIndexChange, onExit }: Props) {
  const { t, locale } = useI18n();
  const setPresentationMode = usePreferences((s) => s.setPresentationMode);
  const titleId = useId();
  const slides = TALK.slides;
  const slide = slides[slideIndex] ?? slides[0];
  const langEn = locale !== 'es';

  useEffect(() => {
    setPresentationMode(true);
    return () => setPresentationMode(false);
  }, [setPresentationMode]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onExit();
        return;
      }
      if (event.key === 'ArrowRight' || event.key === 'PageDown' || event.key === ' ') {
        event.preventDefault();
        onSlideIndexChange(Math.min(slides.length - 1, slideIndex + 1));
      }
      if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
        event.preventDefault();
        onSlideIndexChange(Math.max(0, slideIndex - 1));
      }
      if (event.key === 'Home') {
        event.preventDefault();
        onSlideIndexChange(0);
      }
      if (event.key === 'End') {
        event.preventDefault();
        onSlideIndexChange(slides.length - 1);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onExit, onSlideIndexChange, slideIndex, slides.length]);

  if (!slide) return null;

  const title = langEn ? slide.tituloEn : slide.tituloEs;
  const body = langEn ? slide.cuerpoEn : slide.cuerpoEs;

  return (
    <div
      className="flex min-h-screen flex-col bg-[#05050A] px-6 py-8 sm:px-12"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center">
        <p className="label-mono text-[color:var(--orbit-aqua)]">
          {TALK.titulo} · {slideIndex + 1}/{slides.length}
        </p>
        <h1 id={titleId} className="mt-6 font-display text-4xl font-bold tracking-tight sm:text-6xl">
          {title}
        </h1>
        <p className="mt-8 max-w-3xl text-xl leading-relaxed text-[color:var(--orbit-muted)] sm:text-2xl">
          {body}
        </p>
      </div>
      <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-3 pt-8">
        <p className="text-sm text-[color:var(--orbit-muted)]">{t('pages.charla.presentationHint')}</p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="btn-orbit-md btn-orbit-outline"
            disabled={slideIndex === 0}
            onClick={() => onSlideIndexChange(Math.max(0, slideIndex - 1))}
          >
            {t('pages.charla.prevSlide')}
          </button>
          <button
            type="button"
            className="btn-orbit-md btn-orbit-outline"
            disabled={slideIndex >= slides.length - 1}
            onClick={() => onSlideIndexChange(Math.min(slides.length - 1, slideIndex + 1))}
          >
            {t('pages.charla.nextSlide')}
          </button>
          <button type="button" className="btn-orbit-md btn-orbit-primary" onClick={onExit}>
            {t('pages.charla.exitPresentation')}
          </button>
        </div>
      </div>
    </div>
  );
}
