import { motion, useReducedMotion } from 'framer-motion';

export const BrowserBuilder = ({ className = '' }: { className?: string }) => {
  const prefersReducedMotion = useReducedMotion();
  const DURATION = 20; // Slightly longer for the 4-stage process

  // Helper for staggered build animations
  const getBuildAnim = (startSec: number) => {
    if (prefersReducedMotion) return { opacity: 1, y: 0 };
    const start = startSec / DURATION;
    const fadeIn = (startSec + 0.8) / DURATION;
    const fadeOutStart = 18.5 / DURATION;
    const fadeOutEnd = 19 / DURATION;

    return {
      opacity: [0, 0, 1, 1, 0, 0],
      y: [20, 20, 0, 0, -10, -10],
      transition: {
        duration: DURATION,
        repeat: Infinity,
        ease: [0.22, 1, 0.36, 1] as const,
        times: [0, start, fadeIn, fadeOutStart, fadeOutEnd, 1]
      }
    };
  };

  // Scroll animation with 4 distinct pauses
  const scrollAnim = prefersReducedMotion ? {} : {
    y: ["0%", "0%", "-20%", "-20%", "-40%", "-40%", "-60%", "-60%", "0%", "0%"],
    transition: {
      duration: DURATION,
      repeat: Infinity,
      ease: [0.45, 0, 0.55, 1] as const,
      times: [
        0, 
        4.5/DURATION,  // Stage 1: Design
        6.5/DURATION,  // Scroll to Develop
        8.5/DURATION,  // Stage 2: Develop
        10.5/DURATION, // Scroll to Optimize
        12.5/DURATION, // Stage 3: Optimize
        14.5/DURATION, // Scroll to Scale
        17.5/DURATION, // Stage 4: Scale / Final
        19.5/DURATION, // Reset
        1
      ]
    }
  };

  const gridAnim = prefersReducedMotion ? { opacity: 0 } : {
    opacity: [0, 0.4, 0.4, 0, 0, 0],
    transition: {
      duration: DURATION,
      repeat: Infinity,
      ease: "linear" as const,
      times: [0, 0.05, 3.5/DURATION, 4.5/DURATION, 18.5/DURATION, 1]
    }
  };

  const Pill = ({ label, className = "", delay = 0 }: { label: string, className?: string, delay: number }) => (
    <motion.div 
      animate={getBuildAnim(delay)}
      className={`absolute z-30 px-4 py-1.5 rounded-full bg-white text-black text-[9px] font-mono font-bold tracking-[0.2em] shadow-xl border border-white/20 whitespace-nowrap ${className}`}
    >
      {label}
    </motion.div>
  );

  return (
    <div className={`relative perspective-[1200px] ${className}`}>
      {/* Outer Browser Window */}
      <motion.div 
        initial={{ opacity: 0, y: 40, rotateX: 5 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full h-full rounded-2xl md:rounded-[32px] border border-white/15 bg-[#0A0A0A]/85 backdrop-blur-3xl shadow-[0_40px_120px_-20px_rgba(0,0,0,1)] overflow-hidden flex flex-col relative"
      >
        {/* Browser Header */}
        <div className="h-10 md:h-12 border-b border-white/10 flex items-center px-4 md:px-6 shrink-0 bg-white/[0.04] relative z-40">
          <div className="flex gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
            <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
            <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 w-1/3 md:w-1/4 h-5 rounded-full bg-white/5 border border-white/10 flex items-center px-3">
             <div className="w-1.5 h-1.5 rounded-full bg-white/10 mr-2" />
             <div className="w-full h-1 rounded-full bg-white/5" />
          </div>
        </div>

        {/* Browser Canvas */}
        <div className="flex-1 relative overflow-hidden bg-[#050505]">
          
          {/* Engineering Grid Overlay */}
          <motion.div 
            animate={gridAnim}
            className="absolute inset-0 pointer-events-none z-20"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
              backgroundPosition: 'center top'
            }}
          />

          {/* Scrolling Content Wrapper */}
          <motion.div 
            animate={scrollAnim}
            className="absolute top-0 left-0 right-0 flex flex-col relative z-10 origin-top"
          >
            {/* Stage 1: DESIGN */}
            <section className="relative w-full shrink-0 flex flex-col gap-6 p-6 md:p-10 border-b border-white/5 bg-black/20">
              <Pill label="DESIGN" delay={0.8} className="top-10 right-6 md:right-10" />
              
              <motion.div animate={getBuildAnim(0.5)} className="w-full flex justify-between items-center py-2">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-white rounded-sm" />
                  <div className="w-16 h-1.5 bg-white/30 rounded-full" />
                </div>
                <div className="w-20 h-6 bg-white rounded-full" />
              </motion.div>

              <div className="flex flex-col gap-4 py-8 items-center text-center">
                <motion.div animate={getBuildAnim(1.2)} className="w-3/4 h-10 bg-white rounded-lg" />
                <motion.div animate={getBuildAnim(1.4)} className="w-1/2 h-10 bg-white/40 rounded-lg" />
                <motion.div animate={getBuildAnim(1.6)} className="w-1/3 h-2 bg-white/20 rounded-full mt-2" />
                <motion.div animate={getBuildAnim(1.8)} className="w-[85%] aspect-[16/6] bg-gradient-to-br from-white/10 to-transparent border border-white/10 rounded-2xl mt-6 relative overflow-hidden">
                   <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent opacity-40" />
                </motion.div>
              </div>
            </section>

            {/* Stage 2: DEVELOP */}
            <section className="relative w-full shrink-0 flex flex-col gap-8 p-6 md:p-10 border-b border-white/5 bg-white/[0.01]">
              <Pill label="DEVELOP" delay={4.0} className="top-10 right-6 md:right-10" />
              
              <motion.div animate={getBuildAnim(4.5)} className="w-40 h-6 bg-white rounded" />
              <div className="grid grid-cols-2 gap-4">
                {[4.8, 5.0, 5.2, 5.4].map((delay, i) => (
                  <motion.div key={i} animate={getBuildAnim(delay)} className="p-5 rounded-xl border border-white/10 bg-white/[0.03] flex flex-col gap-3">
                    <div className="w-6 h-6 rounded bg-white/10" />
                    <div className="w-3/4 h-2 bg-white/60 rounded-full" />
                    <div className="w-full h-1 bg-white/20 rounded-full" />
                  </motion.div>
                ))}
              </div>
              <motion.div animate={getBuildAnim(5.8)} className="w-full p-4 rounded-lg bg-black border border-white/5 font-mono text-[8px] text-white/40 space-y-2">
                <div className="w-1/2 h-1.5 bg-white/10 rounded-full" />
                <div className="w-3/4 h-1.5 bg-white/10 rounded-full" />
                <div className="w-2/3 h-1.5 bg-white/10 rounded-full" />
              </motion.div>
            </section>

            {/* Stage 3: OPTIMIZE */}
            <section className="relative w-full shrink-0 flex flex-col gap-10 p-6 md:p-10 border-b border-white/5">
              <Pill label="OPTIMIZE" delay={9.0} className="top-10 right-6 md:right-10" />
              
              <div className="flex flex-col gap-4">
                <motion.div animate={getBuildAnim(9.5)} className="w-56 h-8 bg-white rounded" />
                <motion.div animate={getBuildAnim(9.7)} className="w-3/4 h-2.5 bg-white/30 rounded-full" />
              </div>

              <div className="flex justify-between gap-4 py-4">
                {[10.0, 10.3, 10.6].map((delay, i) => (
                  <motion.div key={i} animate={getBuildAnim(delay)} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full aspect-square rounded-full border-2 border-white/10 flex items-center justify-center">
                       <div className="w-8 h-8 rounded-full border border-white/40 border-t-white" />
                    </div>
                    <div className="w-12 h-2 bg-white/40 rounded-full" />
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-col gap-6">
                {[11.0, 11.3].map((delay, i) => (
                  <motion.div key={i} animate={getBuildAnim(delay)} className="w-full h-12 rounded-xl bg-white/5 border border-white/10 flex items-center px-4 justify-between">
                     <div className="w-1/3 h-2 bg-white/40 rounded-full" />
                     <div className="w-10 h-4 bg-white/80 rounded" />
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Stage 4: SCALE */}
            <section className="relative w-full shrink-0 flex flex-col gap-10 p-6 md:p-10 pb-20">
              <Pill label="SCALE" delay={14.0} className="top-10 right-6 md:right-10" />
              
              <div className="flex flex-col items-center text-center gap-6 py-10">
                <motion.div animate={getBuildAnim(14.5)} className="w-3/4 h-12 bg-white rounded-xl" />
                <motion.div animate={getBuildAnim(14.8)} className="w-1/2 h-4 bg-white/30 rounded-full" />
                <motion.div animate={getBuildAnim(15.2)} className="flex gap-4 mt-4">
                   <div className="w-24 h-10 rounded-full bg-white" />
                   <div className="w-24 h-10 rounded-full border border-white/20" />
                </motion.div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 {[15.5, 15.8].map((delay, i) => (
                   <motion.div key={i} animate={getBuildAnim(delay)} className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] flex flex-col gap-4">
                      <div className="w-1/3 h-2 bg-white/20 rounded-full" />
                      <div className="w-full h-6 bg-white/80 rounded" />
                      <div className="w-full h-10 bg-white/10 rounded-full mt-2" />
                   </motion.div>
                 ))}
              </div>

              {/* Final Bottom Banner */}
              <motion.div animate={getBuildAnim(16.5)} className="w-full py-16 rounded-[32px] bg-white flex flex-col items-center gap-4 text-black mt-10">
                 <div className="w-1/2 h-8 bg-black rounded" />
                 <div className="w-28 h-10 bg-black text-white rounded-full flex items-center justify-center text-[10px] font-bold tracking-widest uppercase">Start Project</div>
              </motion.div>
            </section>

          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};
