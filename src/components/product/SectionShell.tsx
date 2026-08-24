import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface SectionShellProps {
  eyebrow: string;
  headline: string;
  support: string;
  id: string;
  tone?: 'surface' | 'surface2';
  children: ReactNode;
}

const EASE = [0.22, 1, 0.36, 1] as const;

export const SectionShell = ({ eyebrow, headline, support, id, tone = 'surface', children }: SectionShellProps) => {
  const shouldReduceMotion = useReducedMotion();
  const headingId = `${id}-heading`;

  return (
    <section id={id} aria-labelledby={headingId} className={`${tone === 'surface2' ? 'bg-surface2' : 'bg-surface'} scroll-mt-[var(--section-scroll-offset)] border-t border-line py-20 md:py-28`}>
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.4, ease: EASE }}
        className="mx-auto max-w-7xl px-5 sm:px-8 md:px-12"
      >
        <div className="mb-12 max-w-3xl md:mb-16">
          <p className="mb-4 font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-accent">{eyebrow}</p>
          <h2 id={headingId} className="text-4xl font-black uppercase leading-[0.95] tracking-[-0.045em] text-primary md:text-6xl">
            {headline}
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg">{support}</p>
        </div>
        {children}
      </motion.div>
    </section>
  );
};
