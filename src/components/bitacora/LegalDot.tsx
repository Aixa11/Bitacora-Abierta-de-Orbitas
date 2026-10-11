import type { Legal } from '../../content/schema';
import { useBitacoraLabels } from '../../lib/bitacora/useLabels';

type LegalDotProps = {
  legal: Legal;
};

export function LegalDot({ legal }: LegalDotProps) {
  const labels = useBitacoraLabels();
  const color = legal === 'verde' ? 'bg-orbit-lime' : 'bg-orbit-coral';
  const name = labels.legal[legal];
  return (
    <span
      className={`inline-block h-2.5 w-2.5 shrink-0 rounded-full ${color}`}
      title={name}
      aria-label={name}
    />
  );
}
