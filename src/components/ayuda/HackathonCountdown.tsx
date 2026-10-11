import { useEffect, useState } from 'react';

/** Inicio del hackatón Space Apps 2026 (hora local del usuario el 14 nov). */
function hackathonStartLocal(): Date {
  return new Date(2026, 10, 14, 0, 0, 0);
}

/** Fin sugerido: domingo 15 nov 23:59 local. */
function hackathonEndLocal(): Date {
  return new Date(2026, 10, 15, 23, 59, 0);
}

function formatRemaining(ms: number): string {
  if (ms <= 0) return '0 h 0 min';
  const totalMin = Math.floor(ms / 60000);
  const days = Math.floor(totalMin / (60 * 24));
  const hours = Math.floor((totalMin % (60 * 24)) / 60);
  const mins = totalMin % 60;
  if (days > 0) return `${days} d ${hours} h ${mins} min`;
  return `${hours} h ${mins} min`;
}

export function HackathonCountdown() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 30000);
    return () => window.clearInterval(id);
  }, []);

  const start = hackathonStartLocal();
  const end = hackathonEndLocal();
  const before = now.getTime() < start.getTime();
  const during = now.getTime() >= start.getTime() && now.getTime() <= end.getTime();
  const after = now.getTime() > end.getTime();

  let label = '';
  let value = '';
  if (before) {
    label = 'Faltan para el inicio (14 nov 2026, hora local)';
    value = formatRemaining(start.getTime() - now.getTime());
  } else if (during) {
    label = 'Tiempo restante hasta el cierre sugerido (15 nov 23:59 local)';
    value = formatRemaining(end.getTime() - now.getTime());
  } else {
    label = 'Ventana del hackatón 2026 cerrada en este reloj local';
    value = 'Revisa la hora oficial de tu evento';
  }

  return (
    <div className="card-orbit p-5" aria-live="polite">
      <p className="label-mono">/ Reloj 48 h · 14–15 nov 2026 /</p>
      <p className="mt-2 text-sm text-[color:var(--orbit-muted)]">{label}</p>
      <p className="mt-2 font-display text-3xl font-bold tracking-tight">{value}</p>
      <p className="mt-3 text-xs text-[color:var(--orbit-muted)]">
        Orientativo. Prevalece la hora local oficial de tu sede Space Apps.
        {after ? '' : during ? ' Prioriza demo, video y entrega.' : ' Usa el tiempo para cuentas, kit y alcance.'}
      </p>
    </div>
  );
}
