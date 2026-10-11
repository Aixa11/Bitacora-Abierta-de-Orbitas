import type { Legal } from '../../content/schema';
import { LEGAL_LABELS } from '../../lib/bitacora/labels';

type LegalDotProps = {
  legal: Legal;
};

export function LegalDot({ legal }: LegalDotProps) {
  const color = legal === 'verde' ? 'bg-orbit-lime' : 'bg-orbit-coral';
  return (
    <span
      className={`inline-block h-2.5 w-2.5 shrink-0 rounded-full ${color}`}
      title={`Semáforo legal: ${LEGAL_LABELS[legal]}`}
      aria-label={`Semáforo legal ${LEGAL_LABELS[legal]}`}
    />
  );
}
