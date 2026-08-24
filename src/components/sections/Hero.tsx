import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CONTACT } from '../../config/contact';
import { ProductFrame } from '../product/ProductFrame';
import { Button } from '../ui/liquid-glass-button';

const EASE = [0.22, 1, 0.36, 1] as const;

export const Hero = () => {
  const shouldReduceMotion = useReducedMotion();
  const fadeUp = (delay = 0) => ({
    initial: shouldReduceMotion ? false : { opacity: 0, y: 12 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: shouldReduceMotion ? 0 : 0.4, delay, ease: EASE },
  });

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden px-5 pb-20 pt-32 sm:px-8 md:px-12 md:pb-28 md:pt-40"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgb(var(--gold)/0.12),transparent_40%)]" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl">
        <div className="mx-auto max-w-4xl text-center">
          <motion.p {...fadeUp()} className="mb-5 font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-accent">
            STRATA CORE · AI OPERATING LAYER
          </motion.p>
          <motion.h1
            {...fadeUp(0.05)}
            id="hero-heading"
            className="text-[clamp(3rem,8vw,7.5rem)] font-black uppercase leading-[0.88] tracking-[-0.055em] text-primary"
          >
            Run the business from one shared operating layer.
          </motion.h1>
          <motion.p {...fadeUp(0.1)} className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-muted md:text-xl">
            Strata Core connects customer signals, operating rules, team actions and governed AI in one system—so work moves with context, control and a visible record.
          </motion.p>
          <motion.div {...fadeUp(0.15)} className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild variant="glassStrong" size="lg" className="h-12 rounded-full px-8 font-mono text-[11px] font-bold uppercase tracking-[0.16em]">
              <Link to={CONTACT.requestDemoPath} className="flex items-center gap-2">
                Book a demo <ArrowRight size={14} />
              </Link>
            </Button>
            <Button asChild variant="glass" size="lg" className="h-12 rounded-full px-8 font-mono text-[11px] font-bold uppercase tracking-[0.16em]">
              <Link to="/#operating-layer">Explore the platform</Link>
            </Button>
          </motion.div>
        </div>

        <motion.div {...fadeUp(0.2)} className="mx-auto mt-14 max-w-5xl">
          <ProductFrame
            src="/strata-core-operating-layer.webp"
            alt="Abstract layered system graphic representing Strata Core's shared operating layer"
            urlLabel="core.strataagency.tech / operating-layer"
          />
        </motion.div>
      </div>
    </section>
  );
};
