import { useEffect, useId, useState } from 'react';
import { TALK, type TalkSlide } from '../../content/talk';
import { useI18n } from '../../i18n/useI18n';

type PitchLang = 'es' | 'en';

function slideText(slide: TalkSlide, lang: PitchLang): { title: string; body: string } {
  return lang === 'en'
    ? { title: slide.tituloEn, body: slide.cuerpoEn }
    : { title: slide.tituloEs, body: slide.cuerpoEs };
}

/**
 * Pitch bilingüe (láminas clave) + PDF original.
 * El embed usa <object>; si el navegador no lo muestra, queda el enlace directo.
 */
export function PitchViewer() {
  const { t, locale } = useI18n();
  const titleId = useId();
  const [lang, setLang] = useState<PitchLang>(locale === 'es' ? 'es' : 'en');
  const [index, setIndex] = useState(0);
  const [pdfOk, setPdfOk] = useState<boolean | null>(null);
  const slides = TALK.slides;
  const current = slides[index] ?? slides[0];
  const text = current ? slideText(current, lang) : { title: '', body: '' };
  const pdfUrl = TALK.pitchPdf;

  useEffect(() => {
    let cancelled = false;
    fetch(pdfUrl, { method: 'HEAD' })
      .then(async (res) => {
        if (cancelled) return;
        const type = res.headers.get('content-type') ?? '';
        setPdfOk(res.ok && type.includes('pdf'));
      })
      .catch(() => {
        if (!cancelled) setPdfOk(false);
      });
    return () => {
      cancelled = true;
    };
  }, [pdfUrl]);

  if (!current) return null;

  return (
    <section className="card-orbit p-5 sm:p-6" aria-labelledby={titleId}>
      <p className="label-mono">/ {t('pages.charla.pitchLabel')} /</p>
      <h2 id={titleId} className="mt-2 font-display text-2xl font-bold tracking-tight">
        {t('pages.charla.pitchTitle')}
      </h2>
      <p className="mt-2 text-sm text-[color:var(--orbit-muted)]">{t('pages.charla.pitchLead')}</p>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <div className="flex flex-wrap gap-2" role="group" aria-label={t('pages.charla.pitchLangLabel')}>
          <button
            type="button"
            className={`btn-orbit-sm ${lang === 'es' ? 'btn-orbit-primary' : 'btn-orbit-outline'}`}
            aria-pressed={lang === 'es'}
            onClick={() => setLang('es')}
          >
            {t('pages.charla.pitchLangEs')}
          </button>
          <button
            type="button"
            className={`btn-orbit-sm ${lang === 'en' ? 'btn-orbit-primary' : 'btn-orbit-outline'}`}
            aria-pressed={lang === 'en'}
            onClick={() => setLang('en')}
          >
            {t('pages.charla.pitchLangEn')}
          </button>
        </div>
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

      <article
        className="panel-inset mt-4 min-h-[220px] p-6 sm:p-8"
        aria-live="polite"
        aria-atomic="true"
      >
        <p className="label-mono text-[color:var(--orbit-aqua)]">
          {index + 1} / {slides.length}
        </p>
        <h3 className="mt-3 font-display text-2xl font-bold tracking-tight sm:text-3xl">
          {text.title}
        </h3>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-[color:var(--orbit-muted)] sm:text-lg">
          {text.body}
        </p>
      </article>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          className="btn-orbit-md btn-orbit-outline"
          disabled={index === 0}
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
        >
          {t('pages.charla.prevSlide')}
        </button>
        <button
          type="button"
          className="btn-orbit-md btn-orbit-outline"
          disabled={index >= slides.length - 1}
          onClick={() => setIndex((i) => Math.min(slides.length - 1, i + 1))}
        >
          {t('pages.charla.nextSlide')}
        </button>
      </div>

      <div className="mt-6">
        <p className="label-mono mb-2">/ {t('pages.charla.pdfEmbedLabel')} /</p>
        {pdfOk === false ? (
          <p className="rounded-2xl bg-[color:var(--orbit-chip)] px-4 py-3 text-sm" role="status">
            {t('pages.charla.pdfMissing')}
          </p>
        ) : (
          <object
            data={`${pdfUrl}#view=FitH`}
            type="application/pdf"
            className="h-[min(70vh,640px)] w-full overflow-hidden rounded-2xl bg-[color:var(--orbit-chip)]"
            aria-label={t('pages.charla.pdfEmbedTitle')}
          >
            <p className="p-4 text-sm text-[color:var(--orbit-muted)]">
              {t('pages.charla.pdfFallback')}{' '}
              <a
                className="text-[color:var(--orbit-aqua)] underline-offset-2 hover:underline"
                href={pdfUrl}
                target="_blank"
                rel="noreferrer"
              >
                {t('pages.charla.pitchOpen')}
              </a>
            </p>
          </object>
        )}
      </div>
    </section>
  );
}
