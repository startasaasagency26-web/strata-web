import { motion, useReducedMotion } from 'framer-motion';
import { deploymentSteps } from '../../content/deployment';
import { ArrowRight } from 'lucide-react';
import { WhatsAppChoice } from '../WhatsAppChoice';
import { Button } from '../ui/liquid-glass-button';
import { SectionShell } from './SectionShell';

const EASE = [0.22, 1, 0.36, 1] as const;
const STRIP = 38; // visible header strip of each sheet behind the front one
const CASCADE = 8; // horizontal offset per sheet (px)
const FRONT_HEIGHT = 148;

/**
 * The Audit deliverables as a stack of paper — the one place the cream "paper"
 * tokens are used. Text is the deliverable list already on this page
 * (content/deployment.ts); nothing here is sample content. Decorative
 * duplicate of the list beside it, so hidden from assistive tech.
 */
const DeliverableSheets = () => {
  const shouldReduceMotion = useReducedMotion();
  const last = deploymentSteps.length - 1;

  return (
    <div aria-hidden="true" className="relative" style={{ paddingTop: last * STRIP }}>
      {deploymentSteps.map((step, i) => {
        const isFront = i === last;
        return (
          <motion.div
            key={step.number}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: shouldReduceMotion ? 0 : i * 0.09, ease: EASE }}
            className={`${isFront ? 'relative' : 'absolute'} rounded-[10px] border border-ink/10 bg-paper px-5 py-3 text-ink shadow-[0_1px_0_rgb(var(--ink)/0.08),0_14px_28px_rgb(var(--scrim)/0.42)]`}
            style={
              isFront
                ? { marginLeft: last * CASCADE, minHeight: FRONT_HEIGHT, zIndex: i }
                : { top: i * STRIP, left: i * CASCADE, right: (last - i) * CASCADE, height: STRIP + 24, zIndex: i }
            }
          >
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-[11px] font-bold tracking-[0.18em] text-ink/60">{step.number}</span>
              <span className="text-sm font-bold leading-tight">{step.name}</span>
            </div>
            {isFront && (
              <>
                <p className="mt-3 max-w-xs text-[13px] leading-snug text-ink/75">{step.description}</p>
                <div className="mt-3 space-y-2">
                  <span className="block h-px w-full bg-ink/10" />
                  <span className="block h-px w-4/5 bg-ink/10" />
                  <span className="block h-px w-3/5 bg-ink/10" />
                </div>
              </>
            )}
          </motion.div>
        );
      })}
    </div>
  );
};

export const DeploymentPath = () => (
  <SectionShell
    id="audit-outcome"
    eyebrow="03 · BUSINESS OPERATIONS AUDIT"
    headline="Leave with a decision, not a generic AI pitch."
    support="The Audit maps one critical workflow, identifies the most important operating gap and defines a practical next step. It creates value even when the right decision is not to build."
    tone="surface2"
  >
    <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
      <div className="flex flex-col rounded-[28px] border border-gold/25 bg-surface p-7 md:p-9">
        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-accent">WHAT YOU LEAVE WITH</p>
        <p className="mt-5 text-3xl font-bold leading-tight text-text">A shared operating picture and one prioritised decision.</p>
        <p className="mt-5 text-sm leading-relaxed text-muted md:text-base">No invented ROI, generic automation list or pressure to expand the scope before the first workflow is understood.</p>
        <Button asChild variant="glassStrong" size="lg" className="mt-8 h-12 self-start rounded-full px-7 font-mono text-[11px] font-bold uppercase tracking-[0.14em]">
          <WhatsAppChoice message="Hi Strata — I'd like to book a Business Operations Audit." source="home / audit-outcome" className="flex items-center gap-2">
            Book the audit <ArrowRight size={14} />
          </WhatsAppChoice>
        </Button>
        <div className="mt-10 lg:mt-auto lg:pt-10">
          <DeliverableSheets />
        </div>
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
