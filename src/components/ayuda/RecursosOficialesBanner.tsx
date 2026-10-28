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
      className="banner-soft"
      role="status"
    >
      <p>
        <span className="font-semibold">28 de octubre de 2026:</span> los enunciados completos ya
        están en la página oficial de cada desafío ({conRecursos}/{total} con enlace oficial). La
        pestaña Resources de la NASA, con los datos recomendados, se publica el viernes 13 de
        noviembre de 2026.{' '}
        <Link to="/desafios" className="font-semibold underline underline-offset-2">
          {completo ? 'Revisar desafíos' : 'Ver desafíos'}
        </Link>
      </p>
    </aside>
  );
}
