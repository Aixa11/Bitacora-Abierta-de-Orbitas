import { Link } from 'react-router-dom';
import { RecursosOficialesBanner } from '../components/ayuda/RecursosOficialesBanner';
import { EarthHero } from '../components/earth3d/EarthHero';
import { catalogo, desafios, herramientas } from '../content/catalog';

export function HomePage() {
  return (
    <div className="space-y-10">
      <RecursosOficialesBanner />
      <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="card-orbit flex flex-col gap-6 p-8">
          <p className="label-mono">/ Space Apps 2026 · The Next Frontier /</p>
          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Del satélite a tu proyecto, con una{' '}
            <span className="bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] bg-clip-text text-transparent">
              bitácora abierta
            </span>
          </h1>
          <p className="max-w-prose text-lg text-[color:var(--orbit-muted)]">
            Guía comunitaria para recorrer el NASA Space Apps Challenge 2026 (14 y 15 de noviembre)
            desde la elección del desafío hasta la entrega. Elige un camino, explora datos y arma tu
            kit. Las ideas son de tu equipo.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/ruta"
              className="rounded-full bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] px-5 py-3 text-sm font-semibold text-white"
            >
              Empezar la ruta
            </Link>
            <Link
              to="/ayuda"
              className="rounded-full border border-[color:var(--orbit-line)] px-5 py-3 text-sm font-semibold"
            >
              Ayuda del hackatón
            </Link>
            <Link
              to="/desafios"
              className="rounded-full border border-[color:var(--orbit-line)] px-5 py-3 text-sm font-semibold"
            >
              Ver desafíos
            </Link>
            <Link
              to="/sensores"
              className="rounded-full border border-[color:var(--orbit-line)] px-5 py-3 text-sm font-semibold"
            >
              Explorar sensores
            </Link>
          </div>
        </div>
        <aside className="card-orbit grid grid-cols-2 gap-4 p-8">
          <div>
            <p className="label-mono">Herramientas</p>
            <p className="mt-2 font-display text-3xl">{herramientas.length}</p>
          </div>
          <div>
            <p className="label-mono">Desafíos</p>
            <p className="mt-2 font-display text-3xl">{desafios.length}</p>
          </div>
          <div className="col-span-2 text-sm text-[color:var(--orbit-muted)]">
            Contenido verificado en seed (versión {catalogo.tools.version}). Abajo: Tierra a escala
            real con satélites propagados por SGP4 cuando CelesTrak responde.
          </div>
        </aside>
      </section>

      <section aria-labelledby="hero-tierra-titulo">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="label-mono">/ Tierra en tiempo real /</p>
            <h2 id="hero-tierra-titulo" className="mt-1 font-display text-2xl font-bold">
              Escala WGS84, terminador y órbitas
            </h2>
          </div>
          <Link to="/laboratorio" className="text-sm font-semibold underline underline-offset-2">
            Ir al laboratorio 2D
          </Link>
        </div>
        <EarthHero />
      </section>
    </div>
  );
}
