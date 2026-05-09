import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../ui/liquid-glass-button';
import { CONTACT } from '../../config/contact';
import { ArrowRight, Zap, Globe, GitBranch } from 'lucide-react';

const PREMIUM_EASE = [0.22, 1, 0.36, 1] as const;

const proofChips = [
  { label: 'PREMIUM INTERFACE', icon: Zap },
  { label: 'FAST ARCHITECTURE', icon: Globe },
  { label: 'AUTOMATED FUNNELS', icon: GitBranch },
];

export const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const videoY = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : -60]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, shouldReduceMotion ? 1 : 0.94]);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 0.9, 0.8]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden px-5 md:px-12 pt-28 md:pt-32 pb-16"
    >
      {/* Subtle background grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(29,29,31,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(29,29,31,0.04) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse at 60% 40%, black 20%, transparent 80%)',
        }}
      />

      {/* Two-column layout */}
      <div className="relative z-10 mx-auto w-full max-w-[1400px] grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-center">

        {/* ── Left Column — Copy ── */}
        <div className="flex flex-col justify-center order-1">

          {/* Eyebrow */}
          <motion.p
            initial={shouldReduceMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: PREMIUM_EASE }}
            className="text-[10px] font-mono tracking-[0.3em] text-muted uppercase mb-6"
          >
            STRATA ARCHITECTURE STUDIO
          </motion.p>

          {/* Headline */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.12, ease: PREMIUM_EASE }}
          >
            <h1 className="text-[clamp(2.8rem,7vw,6rem)] font-black leading-[0.88] tracking-[-0.055em] text-primary uppercase mb-6">
              BUILD AI SYSTEMS<br />THAT SELL
            </h1>
          </motion.div>

          {/* Supporting copy */}
          <motion.p
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.24, ease: PREMIUM_EASE }}
            className="text-sm md:text-base font-sans leading-relaxed text-muted max-w-md mb-8"
          >
            Premium websites, funnels, and automation infrastructure for brands
            that need conversion, speed, and operational leverage.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.34, ease: PREMIUM_EASE }}
            className="flex flex-col sm:flex-row gap-3 mb-8"
          >
            <Button
              asChild
              variant="liquidDark"
              size="lg"
              className="rounded-full font-mono font-bold tracking-[0.18em] text-[10px] uppercase px-8 py-3 h-auto"
            >
              <Link to={CONTACT.requestDemoPath} className="flex items-center gap-2">
                Build my system
                <ArrowRight size={14} />
              </Link>
            </Button>

            <Button
              asChild
              variant="liquidLight"
              size="lg"
              className="rounded-full font-mono font-bold tracking-[0.18em] text-[10px] uppercase px-8 py-3 h-auto"
            >
              <Link to="/#selected-work">
                See the system
              </Link>
            </Button>
          </motion.div>

          {/* Proof chips */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: PREMIUM_EASE }}
            className="flex flex-wrap gap-2"
          >
            {proofChips.map(({ label, icon: Icon }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 bg-white/60 backdrop-blur-md border border-primary/10 rounded-full px-3 py-1.5 text-[9px] font-mono font-bold tracking-widest text-primary uppercase"
              >
                <Icon size={9} strokeWidth={2.5} />
                {label}
              </span>
            ))}
          </motion.div>
        </div>

        {/* ── Right Column — Video Browser ── */}
        <motion.div
          style={shouldReduceMotion ? undefined : { y: videoY, scale: videoScale, opacity: videoOpacity }}
          className="order-2 w-full [will-change:transform,opacity]"
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.28, ease: PREMIUM_EASE }}
        >
          {/* Browser card */}
          <div
            aria-hidden="true"
            className="w-full rounded-[28px] bg-white border border-border/60 shadow-[0_30px_90px_rgba(0,0,0,0.10)] overflow-hidden"
          >
            {/* Browser chrome top bar */}
            <div className="flex items-center gap-3 px-4 py-3 bg-[#F5F5F7] border-b border-border/50">
              {/* Traffic lights */}
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                <span className="w-3 h-3 rounded-full bg-[#28C840]" />
              </div>
              {/* URL pill */}
              <div className="flex-1 flex justify-center">
                <div className="bg-white/70 border border-border/60 rounded-md px-3 py-1 max-w-[260px] w-full flex items-center justify-center">
                  <span className="text-[10px] font-mono text-muted truncate">strata.ai/growth-command-center</span>
                </div>
              </div>
              <div className="w-[54px] flex-shrink-0" />
            </div>

            {/* Video content */}
            <div className="relative w-full" style={{ aspectRatio: '16/10' }}>
              <video
                src="/videos/strata-ai-dashboard-browser.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Founder card — bottom left, subtle */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.7, ease: PREMIUM_EASE }}
        className="relative z-10 mt-12 lg:mt-8"
      >
        <Link
          to="/about"
          className="inline-flex items-center gap-3 bg-primary text-white pl-3 pr-5 py-2.5 rounded-full max-w-xs shadow-lg border border-white/5 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          <div className="w-8 h-8 rounded-full bg-white/10 flex-shrink-0 border border-white/10 overflow-hidden">
            <img src="/founder.jpg" alt="Amirul Afiz" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col">
            <p className="text-[8px] font-mono font-bold tracking-widest text-white/40 uppercase">Founder-led Studio</p>
            <p className="text-[10px] font-mono text-white/80 leading-tight">Build with Amirul Afiz & Strata.</p>
          </div>
        </Link>
      </motion.div>
    </section>
  );
};
