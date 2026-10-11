import { Link } from 'react-router-dom';
import { catalogo } from '../../content/catalog';

/** Aviso visible sobre el estado de recursos oficiales (28 oct 2026). */
export function RecursosOficialesBanner() {
  const conRecursos = catalogo.challenges.desafios.filter(
    (d) => (d.recursos_oficiales?.length ?? 0) > 0,
  ).length;
  const total = catalogo.challenges.desafios.length;
  const completo = conRecursos === total && total > 0;

  return (
    <aside
      className="rounded-3xl border border-[color:var(--orbit-line)] bg-[color:var(--orbit-chip)] px-4 py-3 text-sm"
      role="status"
    >
      {completo ? (
        <p>
          Recursos oficiales cargados en {conRecursos}/{total} desafíos.{' '}
          <Link to="/desafios" className="font-semibold underline underline-offset-2">
            Revisar desafíos
          </Link>
        </p>
      ) : (
        <p>
          <span className="font-semibold">28 de octubre de 2026:</span> los enunciados completos y la
          pestaña Resources se publican ese día. Hoy hay resúmenes y guías para pensar (
          {conRecursos}/{total} con recursos oficiales ya cargados).{' '}
          <Link to="/desafios" className="font-semibold underline underline-offset-2">
            Ver desafíos
          </Link>
        </p>
      )}
    </aside>
  );
}
