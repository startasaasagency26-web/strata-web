import { deploymentSteps } from '../../content/deployment';
import { ArrowRight } from 'lucide-react';
import { WhatsAppChoice } from '../WhatsAppChoice';
import { Button } from '../ui/liquid-glass-button';
import { SectionShell } from './SectionShell';

export const DeploymentPath = () => (
  <SectionShell
    id="audit-outcome"
    eyebrow="03 · BUSINESS OPERATIONS AUDIT"
    headline="Leave with a decision, not a generic AI pitch."
    support="The Audit maps one critical workflow, identifies the most important operating gap and defines a practical next step. It creates value even when the right decision is not to build."
    tone="surface2"
  >
    <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
      <div className="rounded-[28px] border border-gold/25 bg-surface p-7 md:p-9">
        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-accent">WHAT YOU LEAVE WITH</p>
        <p className="mt-5 text-3xl font-bold leading-tight text-text">A shared operating picture and one prioritised decision.</p>
        <p className="mt-5 text-sm leading-relaxed text-muted md:text-base">No invented ROI, generic automation list or pressure to expand the scope before the first workflow is understood.</p>
        <Button asChild variant="glassStrong" size="lg" className="mt-8 h-12 rounded-full px-7 font-mono text-[11px] font-bold uppercase tracking-[0.14em]">
          <WhatsAppChoice message="Hi Strata — I'd like to book a Business Operations Audit." source="home / audit-outcome" className="flex items-center gap-2">
            Book the audit <ArrowRight size={14} />
          </WhatsAppChoice>
        </Button>
      </div>
      <ol className="border-t border-line">
        {deploymentSteps.map((step) => (
          <li key={step.number} className="grid gap-3 border-b border-line py-5 sm:grid-cols-[4rem_1fr] sm:gap-5 md:py-6">
            <span className="font-mono text-xs font-bold tracking-[0.2em] text-accent">{step.number}</span>
            <div>
              <h3 className="text-lg font-bold text-text md:text-xl">{step.name}</h3>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted md:text-base">{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  </SectionShell>
);
