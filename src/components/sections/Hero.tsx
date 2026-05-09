import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BrowserBuilder } from '../BrowserBuilder';

const PREMIUM_EASE = [0.22, 1, 0.36, 1] as const;

export const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const assetScrollY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const assetScrollScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const assetScrollRotateX = useTransform(scrollYProgress, [0, 1], [0, 6]);
  const assetScrollRotateY = useTransform(scrollYProgress, [0, 1], [0, -4]);
  const assetScrollOpacity = useTransform(scrollYProgress, [0, 0.85, 1], [1, 0.92, 0.85]);

  return (
    <section ref={heroRef} className="relative min-h-[80vh] md:min-h-[90vh] flex flex-col justify-center overflow-hidden px-4 md:px-12 pt-24 pb-12">
      
      {/* Top Eyebrow Copy */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: PREMIUM_EASE }}
        className="absolute top-24 md:top-32 left-4 md:left-12 z-20 max-w-[280px]"
      >
        <p className="text-[10px] font-mono tracking-[0.3em] text-muted leading-relaxed uppercase">
          STRATA ARCHITECTURE STUDIO
        </p>
      </motion.div>

      {/* Main Hero Composition - Vertical Stack */}
      <div className="flex-1 flex flex-col items-center justify-center pt-16 md:pt-24 pb-12 md:pb-24">
        
        {/* Main Headline - Fully readable and dominant */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, delay: 0.18, ease: PREMIUM_EASE }}
          className="relative flex flex-col items-center justify-center gap-2 md:gap-4 pointer-events-none select-none overflow-hidden mt-4 md:mt-6"
        >
          <h1 className="text-[clamp(2.5rem,12vw,21rem)] font-black leading-[0.85] tracking-[-0.06em] text-primary whitespace-nowrap uppercase">
            BUILD SYSTEMS
          </h1>
          <h1 className="text-[clamp(2.5rem,12vw,21rem)] font-black leading-[0.85] tracking-[-0.06em] text-primary whitespace-nowrap uppercase">
            THAT SELL
          </h1>
        </motion.div>

        {/* Animated Browser Builder - Placed BELOW the headline */}
        <motion.div
          style={shouldReduceMotion ? undefined : {
            y: assetScrollY,
            scale: assetScrollScale,
            rotateX: assetScrollRotateX,
            rotateY: assetScrollRotateY,
            opacity: assetScrollOpacity,
            transformPerspective: 1400,
            transformStyle: 'preserve-3d',
          }}
          className="relative w-full flex items-center justify-center mt-6 md:mt-12 pointer-events-none z-10 [will-change:transform,opacity]"
        >
          <motion.div
            initial={shouldReduceMotion ? false : {
              opacity: 0,
              scale: 0.84,
              y: 80,
              rotateX: 8,
              rotateY: -10,
              filter: 'blur(6px)',
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              rotateX: 0,
              rotateY: 0,
              filter: 'blur(0px)',
            }}
            transition={{ duration: 1.25, delay: 0.42, ease: PREMIUM_EASE }}
            className="w-full flex items-center justify-center [transform-style:preserve-3d] [will-change:transform,opacity,filter]"
          >
            <BrowserBuilder className="w-[94%] md:w-[clamp(620px,48vw,860px)] h-[360px] md:h-[clamp(380px,30vw,520px)] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)]" />
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Content Area */}
      <div className="relative mt-auto z-30 flex flex-col md:flex-row justify-between items-end gap-8 pb-4 md:pb-0">
        
        {/* Subheadline and tags */}
        <div className="max-w-md">
          <p className="text-sm md:text-base font-mono tracking-wide text-muted uppercase mb-6 leading-relaxed">
            We architect digital systems that convert, scale, and compound.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="bg-white/50 backdrop-blur-md border border-primary/10 rounded-full px-4 py-1.5 text-[9px] font-mono font-bold tracking-widest text-primary uppercase">PREMIUM INTERFACE</span>
            <span className="bg-white/50 backdrop-blur-md border border-primary/10 rounded-full px-4 py-1.5 text-[9px] font-mono font-bold tracking-widest text-primary uppercase">FAST ARCHITECTURE</span>
          </div>
        </div>

        {/* Founder Card */}
        <Link to="/about" className="bg-primary text-white p-5 md:p-6 rounded-[24px] max-w-sm flex items-center gap-4 shadow-xl border border-white/5 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl active:scale-[0.98]">
          <div className="w-12 h-12 rounded-full bg-white/10 flex-shrink-0 border border-white/10 flex items-center justify-center overflow-hidden">
             <img src="/founder.jpg" alt="Amirul Afiz" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col">
            <p className="text-[9px] font-mono font-bold tracking-widest text-white/40 uppercase mb-1">Founder-led Studio</p>
            <p className="text-[10px] font-mono leading-tight text-white/80 uppercase">
              Build your digital foundation with Amirul Afiz & Strata.
            </p>
          </div>
        </Link>
      </div>
    </section>
  );
};
