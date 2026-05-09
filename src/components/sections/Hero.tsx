import { useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../ui/liquid-glass-button';
import { CONTACT } from '../../config/contact';
import { ArrowRight } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1] as const;

const proofChips = [
  'PREMIUM INTERFACE',
  'FAST ARCHITECTURE',
  'AUTOMATED FUNNELS',
];

export const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const fadeUp = (delay = 0) =>
    shouldReduceMotion
      ? {}
      : { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay, ease: EASE } };

  return (
    <section
      ref={heroRef}
      id="hero"
      aria-labelledby="hero-headline"
      className="relative min-h-[90svh] flex flex-col items-center justify-center overflow-hidden px-5 md:px-12 pt-28 md:pt-32 pb-16"
    >
      {/* Subtle grid background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(29,29,31,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(29,29,31,0.035) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(ellipse at 50% 30%, black 20%, transparent 78%)',
        }}
      />

      {/* ── Centered copy ── */}
      <div className="relative z-10 mx-auto w-full max-w-5xl text-center">

        {/* Eyebrow */}
        <motion.p
          {...fadeUp(0)}
          className="mb-6 text-[10px] font-mono tracking-[0.3em] text-muted uppercase"
        >
          STRATA ARCHITECTURE STUDIO
        </motion.p>

        {/* Main headline */}
        <motion.div {...fadeUp(0.1)}>
          <h1
            id="hero-headline"
            className="uppercase font-black leading-[0.86] tracking-[-0.055em] text-primary mb-4"
            style={{ fontSize: 'clamp(3rem, 10.5vw, 9.5rem)' }}
          >
            AI-POWERED<br />GROWTH AGENCY
          </h1>
        </motion.div>

        {/* Sub-headline */}
        <motion.p
          {...fadeUp(0.18)}
          className="mb-5 text-[clamp(1rem,2.4vw,1.35rem)] font-black uppercase tracking-[-0.03em] text-primary/30 leading-tight"
        >
          WE BUILD SYSTEMS THAT SELL
        </motion.p>

        {/* Supporting paragraph */}
        <motion.p
          {...fadeUp(0.26)}
          className="mx-auto mb-10 max-w-2xl font-sans text-sm md:text-base leading-relaxed text-muted"
        >
          Premium websites, funnels, AI automation, and growth infrastructure for
          brands that need conversion, speed, and operational leverage.
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...fadeUp(0.34)}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10"
        >
          <Button
            asChild
            variant="liquidDark"
            size="lg"
            className="rounded-full font-mono font-bold tracking-[0.16em] text-[10px] uppercase px-8 h-12"
          >
            <Link to={CONTACT.requestDemoPath} className="flex items-center gap-2">
              Build my system
              <ArrowRight size={13} />
            </Link>
          </Button>

          <Button
            asChild
            variant="liquidLight"
            size="lg"
            className="rounded-full font-mono font-bold tracking-[0.16em] text-[10px] uppercase px-8 h-12"
          >
            <Link to="/#selected-work">
              See the system
            </Link>
          </Button>
        </motion.div>

        {/* Proof chips */}
        <motion.div
          {...fadeUp(0.42)}
          className="flex flex-wrap items-center justify-center gap-2"
        >
          {proofChips.map((chip) => (
            <span
              key={chip}
              className="inline-flex items-center gap-1.5 bg-white/60 backdrop-blur-md border border-primary/[0.08] rounded-full px-3.5 py-1.5 text-[9px] font-mono font-bold tracking-widest text-primary uppercase"
            >
              {chip}
            </span>
          ))}
        </motion.div>
      </div>

      {/* ── Browser video below copy ── */}
      <motion.div
        {...(shouldReduceMotion
          ? {}
          : { initial: { opacity: 0, y: 32, scale: 0.97 }, animate: { opacity: 1, y: 0, scale: 1 }, transition: { duration: 1.0, delay: 0.52, ease: EASE } }
        )}
        className="relative z-10 mt-14 w-full max-w-[1080px] mx-auto"
      >
        {/* Browser card */}
        <div
          aria-hidden="true"
          className="w-full rounded-[28px] bg-white border border-border/60 shadow-[0_30px_90px_rgba(0,0,0,0.10)] overflow-hidden"
        >
          {/* Chrome top bar */}
          <div className="flex items-center gap-3 px-5 py-3 bg-[#F5F5F7] border-b border-border/50">
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
              <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
              <span className="w-3 h-3 rounded-full bg-[#28C840]" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="bg-white/70 border border-border/60 rounded-md px-3 py-1 max-w-[280px] w-full flex items-center justify-center">
                <span className="text-[10px] font-mono text-muted truncate">
                  strata.ai/growth-command-center
                </span>
              </div>
            </div>
            <div className="w-[54px] flex-shrink-0" />
          </div>

          {/* Video */}
          <div className="relative w-full aspect-[16/9] bg-[#eef0f2]">
            <video
              src="/videos/strata-ai-dashboard-browser.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="w-full h-full object-contain object-top"
            />
          </div>
        </div>
      </motion.div>

      {/* Founder card */}
      <motion.div
        {...(shouldReduceMotion ? {} : { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay: 0.9, ease: EASE } })}
        className="relative z-10 mt-10"
      >
        <Link
          to="/about"
          className="inline-flex items-center gap-3 bg-primary text-white pl-3 pr-5 py-2.5 rounded-full shadow-lg border border-white/5 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          <div className="w-8 h-8 rounded-full bg-white/10 flex-shrink-0 border border-white/10 overflow-hidden">
            <img src="/founder.jpg" alt="Amirul Afiz" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-[8px] font-mono font-bold tracking-widest text-white/40 uppercase">Founder-led Studio</p>
            <p className="text-[10px] font-mono text-white/80 leading-tight">Build with Amirul Afiz & Strata.</p>
          </div>
        </Link>
      </motion.div>
    </section>
  );
};
