type PlaceholderPageProps = {
  kicker: string;
  title: string;
  description: string;
};

export function PlaceholderPage({ kicker, title, description }: PlaceholderPageProps) {
  return (
    <section className="card-orbit max-w-3xl p-8">
      <p className="label-mono">/ {kicker} /</p>
      <h1 className="mt-4 font-display text-4xl font-bold tracking-tight">{title}</h1>
      <p className="mt-4 max-w-prose text-[color:var(--orbit-muted)]">{description}</p>
      <p className="mt-6 text-sm text-[color:var(--orbit-muted)]">
        Esta sección se completa en una fase posterior. Puedes seguir explorando el resto de rutas
        desde la barra superior.
      </p>
    </section>
  );
}
