import { useState, type FormEvent } from 'react';
import { buildSuggestToolIssueUrl, GITHUB_NEW_ISSUE_URL } from '../../content/site';

export function SuggestToolForm() {
  const [nombre, setNombre] = useState('');
  const [url, setUrl] = useState('');
  const [organizacion, setOrganizacion] = useState('');
  const [porQue, setPorQue] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const issueUrl = buildSuggestToolIssueUrl({ nombre, url, organizacion, porQue });
    window.open(issueUrl, '_blank', 'noopener,noreferrer');
  }

  return (
    <section className="card-orbit mt-10 p-6">
      <p className="label-mono">/ Sugerir herramienta /</p>
      <h2 className="mt-3 font-display text-2xl font-bold">¿Falta una herramienta?</h2>
      <p className="mt-2 max-w-prose text-sm text-[color:var(--orbit-muted)]">
        Completa el formulario y se abrirá un issue de GitHub prellenado. No hay backend: el envío
        ocurre en tu cuenta de GitHub.
      </p>
      <p className="mt-2 font-mono text-xs text-orbit-coral">
        TODO: confirmar la URL del repositorio ({GITHUB_NEW_ISSUE_URL}).
      </p>
      <form className="mt-5 grid gap-3 md:grid-cols-2" onSubmit={handleSubmit}>
        <label className="grid gap-1 text-sm">
          Nombre
          <input
            required
            value={nombre}
            onChange={(event) => setNombre(event.target.value)}
            className="rounded-xl border border-[color:var(--orbit-line)] bg-[color:var(--orbit-chip)] px-3 py-2"
          />
        </label>
        <label className="grid gap-1 text-sm">
          URL
          <input
            required
            type="url"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            className="rounded-xl border border-[color:var(--orbit-line)] bg-[color:var(--orbit-chip)] px-3 py-2"
          />
        </label>
        <label className="grid gap-1 text-sm md:col-span-2">
          Organización
          <input
            value={organizacion}
            onChange={(event) => setOrganizacion(event.target.value)}
            className="rounded-xl border border-[color:var(--orbit-line)] bg-[color:var(--orbit-chip)] px-3 py-2"
          />
        </label>
        <label className="grid gap-1 text-sm md:col-span-2">
          Por qué conviene incluirla
          <textarea
            value={porQue}
            onChange={(event) => setPorQue(event.target.value)}
            rows={3}
            className="rounded-xl border border-[color:var(--orbit-line)] bg-[color:var(--orbit-chip)] px-3 py-2"
          />
        </label>
        <button
          type="submit"
          className="rounded-full bg-gradient-to-r from-orbit-violet to-orbit-blue px-5 py-2.5 text-sm font-semibold text-white md:col-span-2 md:justify-self-start"
        >
          Abrir issue en GitHub
        </button>
      </form>
    </section>
  );
}
