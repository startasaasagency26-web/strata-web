import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const flowSteps = [
  'Demand / Traffic',
  'Lead Capture',
  'CRM',
  'AI Qualification',
  'Automated Follow-Up',
  'Sales Pipeline',
  'Reporting & Optimization',
];

export const SystemFlow = () => {
  return (
    <section id="system-flow" className="relative border-y border-border/50 bg-surface py-24 md:py-32 scroll-mt-[120px]">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-14 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="mb-4 text-[10px] font-mono uppercase tracking-[0.3em] text-muted">SYSTEM ARCHITECTURE</p>
            <h2 className="text-4xl md:text-6xl font-black leading-none tracking-[-0.04em] text-text uppercase">
              The Connected Revenue Operating System
            </h2>
          </div>
          <p className="max-w-md font-sans text-sm leading-relaxed text-muted md:text-base">
            Strata connects traffic, capture, CRM, AI qualification, follow-up, pipeline, and reporting into one operating system. Every step passes data cleanly to the next.
          </p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-border/70" aria-hidden="true" />
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-7 lg:gap-3">
            {flowSteps.map((step, idx) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="relative"
              >
                <div className="relative z-10 flex min-h-[84px] items-center justify-between rounded-[20px] border border-border/60 bg-surface px-4 py-4 shadow-[0_10px_30px_rgb(var(--scrim)/0.04)] lg:min-h-[112px] lg:flex-col lg:items-start lg:justify-between">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-muted">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className="max-w-[12rem] text-right font-mono text-xs font-bold uppercase tracking-wider text-text lg:text-left leading-snug">
                    {step}
                  </span>
                </div>
                {idx < flowSteps.length - 1 && (
                  <div className="flex justify-center py-2 text-text/35 lg:absolute lg:right-[-1.15rem] lg:top-1/2 lg:z-20 lg:-translate-y-1/2 lg:bg-surface lg:px-1.5 lg:py-0">
                    <ArrowRight size={15} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
