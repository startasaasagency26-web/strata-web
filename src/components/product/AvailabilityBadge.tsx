import type { Availability } from '../../content/operating-layer';

interface AvailabilityBadgeProps {
  status: Availability;
  label?: string;
}

const styles: Record<Availability, string> = {
  live: 'border-positive/20 bg-positive/10 text-positive',
  beta: 'border-caution/20 bg-caution/10 text-caution',
  planned: 'border-primary/10 bg-primary/[0.04] text-muted',
};

export const AvailabilityBadge = ({ status, label }: AvailabilityBadgeProps) => (
  <span className={`inline-flex min-h-6 items-center rounded-full border px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.12em] ${styles[status]}`}>
    {label ?? status}
  </span>
);
