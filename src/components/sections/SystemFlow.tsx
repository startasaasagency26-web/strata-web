import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const flowSteps = [
  'Growth Media System',
  'Traffic',
  'Landing Page',
  'CRM',
  'Automation',
  'Sales Pipeline',
  'Optimization',
];

export const SystemFlow = () => {
  return (
    <section id="system-flow" className="relative border-y border-border/50 bg-surface py-24 md:py-32 scroll-mt-[120px]">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-14 flex flex-col gap-6 md:mb-18 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="mb-4 text-[10px] font-mono uppercase tracking-[0.3em] text-muted">SYSTEM FLOW</p>
            <h2 className="text-4xl md:text-6xl font-black leading-none tracking-[-0.04em] text-primary">
              How the full system works
            </h2>
          </div>
          <p className="max-w-md font-sans text-sm leading-relaxed text-muted md:text-base">
            Media without infrastructure leaks money. Infrastructure without media has nothing to capture. Strata builds both layers so attention becomes pipeline.
          </p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-border/70" aria-hidden="true" />
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-7 lg:gap-4">
            {flowSteps.map((step, idx) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="relative"
              >
                <div className="relative z-10 flex min-h-[84px] items-center justify-between rounded-[20px] border border-border/60 bg-white px-5 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.04)] lg:min-h-[112px] lg:flex-col lg:items-start lg:justify-between">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-muted">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className="max-w-[12rem] text-right font-mono text-xs font-bold uppercase tracking-widest text-primary lg:text-left">
                    {step}
                  </span>
                </div>
                {idx < flowSteps.length - 1 && (
                  <div className="flex justify-center py-2 text-primary/35 lg:absolute lg:right-[-1.35rem] lg:top-1/2 lg:z-20 lg:-translate-y-1/2 lg:bg-surface lg:px-2 lg:py-0">
                    <ArrowRight size={16} />
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
