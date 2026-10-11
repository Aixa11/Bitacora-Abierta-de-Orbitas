import { Link } from 'react-router-dom';

const SHORTCUTS = [
  { to: '/', label: 'Inicio' },
  { to: '/ruta', label: 'Ruta' },
  { to: '/desafios', label: 'Desafíos' },
  { to: '/laboratorio', label: 'Laboratorio' },
  { to: '/bitacora', label: 'Bitácora' },
  { to: '/charla', label: 'Charla' },
  { to: '/ayuda', label: 'Ayuda' },
] as const;

export function NotFoundPage() {
  return (
    <section className="card-orbit mx-auto max-w-xl p-8" aria-labelledby="titulo-404">
      <p className="label-mono">/ 404 · órbita perdida /</p>
      <h1 id="titulo-404" className="mt-4 font-display text-4xl font-bold">
        Esta órbita no existe
      </h1>
      <p className="mt-4 text-[color:var(--orbit-muted)]">
        La página que buscas no está en el mapa. Revisa la dirección o elige otra ruta abajo.
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex rounded-full bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] px-5 py-3 text-sm font-semibold text-white"
      >
        Volver al inicio
      </Link>
      <nav className="mt-8" aria-label="Atajos útiles">
        <p className="label-mono">/ Atajos /</p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {SHORTCUTS.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className="inline-flex rounded-full border border-[color:var(--orbit-line)] px-3 py-1.5 text-sm font-semibold"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
