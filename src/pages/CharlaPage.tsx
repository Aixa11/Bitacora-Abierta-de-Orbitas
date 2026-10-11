import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { TALK } from '../content/talk';
import { usePreferences } from '../store/preferences';

export function CharlaPage() {
  const presentationMode = usePreferences((s) => s.presentationMode);
  const setPresentationMode = usePreferences((s) => s.setPresentationMode);
  const [slide, setSlide] = useState(0);
  const slides = TALK.seccionesPresentacion;
  const totalMin = useMemo(
    () => TALK.agenda.reduce((acc, item) => acc + item.minutos, 0),
    [],
  );

  useEffect(() => {
    if (!presentationMode) return;

    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setPresentationMode(false);
        return;
      }
      if (event.key === 'ArrowRight' || event.key === 'PageDown' || event.key === ' ') {
        event.preventDefault();
        setSlide((i) => Math.min(slides.length - 1, i + 1));
      }
      if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
        event.preventDefault();
        setSlide((i) => Math.max(0, i - 1));
      }
      if (event.key === 'Home') {
        event.preventDefault();
        setSlide(0);
      }
      if (event.key === 'End') {
        event.preventDefault();
        setSlide(slides.length - 1);
      }
    }

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [presentationMode, setPresentationMode, slides.length]);

  useEffect(() => {
    return () => {
      setPresentationMode(false);
    };
  }, [setPresentationMode]);

  const current = slides[slide] ?? slides[0];

  if (presentationMode && current) {
    return (
      <div
        className="fixed inset-0 z-50 flex flex-col bg-[#05050A] text-white"
        role="dialog"
        aria-modal="true"
        aria-label="Modo presentación"
      >
        <div className="flex items-center justify-between gap-4 border-b border-white/10 px-6 py-3 text-sm">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-white/60">
            / Presentación · {slide + 1}/{slides.length} /
          </p>
          <button
            type="button"
            className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold"
            onClick={() => setPresentationMode(false)}
          >
            Salir (Esc)
          </button>
        </div>
        <div className="flex flex-1 flex-col justify-center px-8 py-12 sm:px-16 lg:px-24">
          <p className="font-mono text-sm uppercase tracking-[0.2em] text-[#5FE0FF]">
            {TALK.formato}
          </p>
          <h1 className="mt-4 max-w-5xl font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            {current.titulo}
          </h1>
          <p className="mt-8 max-w-3xl text-xl leading-relaxed text-white/80 sm:text-2xl lg:text-3xl">
            {current.cuerpo}
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-6 py-4 text-sm text-white/70">
          <p>Flechas · espacio · Esc para salir</p>
          <div className="flex gap-2">
            <button
              type="button"
              className="rounded-full border border-white/20 px-4 py-2 disabled:opacity-40"
              disabled={slide === 0}
              onClick={() => setSlide((i) => Math.max(0, i - 1))}
            >
              Anterior
            </button>
            <button
              type="button"
              className="rounded-full bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] px-4 py-2 font-semibold text-white disabled:opacity-40"
              disabled={slide >= slides.length - 1}
              onClick={() => setSlide((i) => Math.min(slides.length - 1, i + 1))}
            >
              Siguiente
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header className="card-orbit space-y-4 p-8">
        <p className="label-mono">/ Webinar · {TALK.evento} /</p>
        <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">{TALK.titulo}</h1>
        <p className="max-w-3xl text-lg text-[color:var(--orbit-muted)]">{TALK.descripcion}</p>
        <p className="text-sm text-[color:var(--orbit-muted)]">
          {TALK.formato} · {TALK.duracionMin} min ({TALK.preguntasMin} de preguntas) ·{' '}
          <strong className="text-[color:var(--orbit-text)]">{TALK.fechaLabel}</strong>
        </p>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => {
              setSlide(0);
              setPresentationMode(true);
            }}
            className="rounded-full bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] px-5 py-3 text-sm font-semibold text-white"
          >
            Modo presentación
          </button>
          <Link
            to="/ruta"
            className="rounded-full border border-[color:var(--orbit-line)] px-5 py-3 text-sm font-semibold"
          >
            Ir a la ruta del dato
          </Link>
        </div>
      </header>

      <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]" aria-labelledby="agenda-titulo">
        <article className="card-orbit p-6">
          <h2 id="agenda-titulo" className="font-display text-2xl font-bold">
            Agenda
          </h2>
          <p className="mt-2 text-sm text-[color:var(--orbit-muted)]">
            Total agenda: {totalMin} minutos (incluye preguntas).
          </p>
          <ol className="mt-4 space-y-3">
            {TALK.agenda.map((item, index) => (
              <li
                key={item.id}
                className="rounded-2xl border border-[color:var(--orbit-line)] px-4 py-3"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-semibold">
                    {index + 1}. {item.titulo}
                  </p>
                  <p className="font-mono text-xs uppercase tracking-[0.14em] text-[color:var(--orbit-muted)]">
                    {item.minutos} min
                  </p>
                </div>
                <p className="mt-1 text-sm text-[color:var(--orbit-muted)]">{item.resumen}</p>
              </li>
            ))}
          </ol>
        </article>

        <aside className="card-orbit p-6">
          <p className="label-mono">/ Oradora /</p>
          <div className="mt-4 flex items-start gap-4">
            <div
              className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#7C3AED] to-[#3B82F6] font-display text-xl font-bold text-white"
              aria-hidden="true"
            >
              AB
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold">{TALK.speaker.nombre}</h2>
              <p className="mt-1 text-sm text-[color:var(--orbit-muted)]">{TALK.speaker.rol}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <a
                  href={TALK.speaker.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-[color:var(--orbit-line)] px-3 py-1.5 text-sm font-semibold"
                >
                  LinkedIn
                </a>
                <a
                  href={TALK.speaker.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-[color:var(--orbit-line)] px-3 py-1.5 text-sm font-semibold"
                >
                  Instagram
                </a>
              </div>
            </div>
          </div>
          <p className="mt-6 text-sm text-[color:var(--orbit-muted)]">
            Para presentar en vivo: activa el modo presentación, usa las flechas del teclado y Esc
            para volver. La navegación y el pie se ocultan para que la Bitácora se vea a pantalla
            completa.
          </p>
        </aside>
      </section>
    </div>
  );
}
