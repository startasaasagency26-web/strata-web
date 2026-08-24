import { deploymentSteps } from '../../content/deployment';
import { AvailabilityBadge } from './AvailabilityBadge';
import { SectionShell } from './SectionShell';

export const DeploymentPath = () => (
  <SectionShell
    id="deployment-path"
    eyebrow="07 · DEPLOYMENT PATH"
    headline="Start with the workflow that matters most."
    support="The planned deployment path begins with one bounded operating loop. Context, rules and human controls come before wider rollout."
    tone="surface2"
  >
    <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {deploymentSteps.map((step) => (
        <li key={step.number} className="relative rounded-[22px] border border-line bg-surface p-5">
          <div className="flex items-center justify-between gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold font-mono text-[11px] font-bold text-void">{step.number}</span>
            {step.availability !== 'live' && <AvailabilityBadge status={step.availability} />}
          </div>
          <h3 className="mt-6 text-xl font-bold text-text">{step.name}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted">{step.description}</p>
        </li>
      ))}
    </ol>
  </SectionShell>
);
