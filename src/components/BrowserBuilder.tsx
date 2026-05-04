import { motion, useReducedMotion } from 'framer-motion';

export const BrowserBuilder = ({ className = '' }: { className?: string }) => {
  const prefersReducedMotion = useReducedMotion();
  const DURATION = 18; // Longer duration for a premium, deliberate feel

  // Helper for staggered build animations
  const getBuildAnim = (startSec: number) => {
    if (prefersReducedMotion) return { opacity: 1, y: 0 };

    const start = startSec / DURATION;
    const fadeIn = (startSec + 0.8) / DURATION;
    const fadeOutStart = 16 / DURATION;
    const fadeOutEnd = 16.5 / DURATION;

    return {
      opacity: [0, 0, 1, 1, 0, 0],
      y: [20, 20, 0, 0, -10, -10],
      transition: {
        duration: DURATION,
        repeat: Infinity,
        ease: [0.22, 1, 0.36, 1] as const, // Premium quint ease
        times: [0, start, fadeIn, fadeOutStart, fadeOutEnd, 1]
      }
    };
  };

  // Refined scroll animation: Pause Top -> Scroll 35% -> Pause -> Scroll 70% -> Pause -> Reset
  const scrollAnim = prefersReducedMotion ? {} : {
    y: ["0%", "0%", "-35%", "-35%", "-70%", "-70%", "0%", "0%"],
    transition: {
      duration: DURATION,
      repeat: Infinity,
      ease: [0.45, 0, 0.55, 1] as const, // Smooth ease-in-out
      times: [
        0, 
        4.5/DURATION,  // Stay at top until 4.5s
        6.5/DURATION,  // Finish first scroll at 6.5s
        8.5/DURATION,  // Pause until 8.5s
        10.5/DURATION, // Finish second scroll at 10.5s
        13.5/DURATION, // Pause at bottom until 13.5s
        16.5/DURATION, // Smooth reset to top
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
      times: [0, 0.05, 3.5/DURATION, 4.5/DURATION, 16/DURATION, 1]
    }
  };

  return (
    <div className={`relative perspective-[1200px] ${className}`}>
      {/* Outer Browser Window */}
      <motion.div 
        initial={{ opacity: 0, y: 40, rotateX: 5 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full h-full rounded-2xl md:rounded-[28px] border border-white/15 bg-[#0A0A0A]/85 backdrop-blur-3xl shadow-[0_40px_100px_-20px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col relative group"
      >
        {/* Browser Header (Chrome style) */}
        <div className="h-10 md:h-12 border-b border-white/10 flex items-center px-4 md:px-6 shrink-0 bg-white/[0.03] relative z-30">
          <div className="flex gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
            <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
            <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 w-1/3 md:w-1/4 h-5 rounded-full bg-white/5 border border-white/5 flex items-center px-3">
            <div className="w-2 h-2 rounded-full bg-white/10 mr-2" />
            <div className="w-full h-1.5 rounded-full bg-white/5" />
          </div>
        </div>

        {/* Browser Canvas */}
        <div className="flex-1 relative overflow-hidden bg-[#050505]">
          
          {/* Engineering Grid Overlay */}
          <motion.div 
            animate={gridAnim}
            className="absolute inset-0 pointer-events-none z-20"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)`,
              backgroundSize: '32px 32px',
              backgroundPosition: 'center top'
            }}
          />

          {/* Scrolling Content Wrapper */}
          <motion.div 
            animate={scrollAnim}
            className="absolute top-0 left-0 right-0 flex flex-col relative z-10 origin-top"
          >
            {/* 1. Mini Website Header */}
            <motion.header animate={getBuildAnim(0.5)} className="w-full h-16 px-6 md:px-10 flex items-center justify-between border-b border-white/5 bg-black/40 backdrop-blur-md shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-white rounded-sm" />
                <div className="w-16 h-2 rounded-full bg-white/40" />
              </div>
              <div className="hidden md:flex gap-6">
                <div className="w-10 h-1.5 rounded-full bg-white/20" />
                <div className="w-10 h-1.5 rounded-full bg-white/20" />
                <div className="w-10 h-1.5 rounded-full bg-white/20" />
              </div>
              <div className="w-20 h-7 rounded-full bg-white" />
            </motion.header>

            {/* 2. Premium Hero Section */}
            <section className="px-6 md:px-10 pt-12 md:pt-16 pb-12 flex flex-col items-center text-center gap-6">
              <motion.div animate={getBuildAnim(1.0)} className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-[8px] font-mono tracking-widest text-white/60 uppercase">
                Architecture v2.0
              </motion.div>
              <div className="flex flex-col gap-3 items-center">
                <motion.div animate={getBuildAnim(1.2)} className="w-full max-w-[85%] h-8 md:h-12 bg-white rounded-md" />
                <motion.div animate={getBuildAnim(1.4)} className="w-2/3 h-8 md:h-12 bg-white/60 rounded-md" />
              </div>
              <motion.div animate={getBuildAnim(1.7)} className="w-3/4 max-w-[400px] h-3 bg-white/20 rounded-full mt-2" />
              <motion.div animate={getBuildAnim(1.9)} className="flex gap-4 mt-4">
                <div className="w-28 h-10 rounded-full bg-white" />
                <div className="w-28 h-10 rounded-full border border-white/20" />
              </motion.div>

              {/* Hero Image/Visual Card */}
              <motion.div animate={getBuildAnim(2.3)} className="w-full mt-10 aspect-[16/8] rounded-2xl bg-gradient-to-br from-white/10 via-white/5 to-transparent border border-white/10 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent opacity-50" />
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full" />
                </div>
              </motion.div>
            </section>

            {/* 3. Service Cards */}
            <section className="px-6 md:px-10 py-12 flex flex-col gap-8 bg-white/[0.02]">
              <div className="flex justify-between items-end">
                <motion.div animate={getBuildAnim(2.8)} className="w-32 h-6 bg-white/80 rounded" />
                <motion.div animate={getBuildAnim(3.0)} className="w-20 h-3 bg-white/20 rounded-full" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[3.2, 3.4, 3.6, 3.8].map((delay, i) => (
                  <motion.div key={i} animate={getBuildAnim(delay)} className="p-5 rounded-xl border border-white/10 bg-white/[0.03] flex flex-col gap-4">
                    <div className="w-8 h-8 rounded-lg bg-white/10" />
                    <div className="flex flex-col gap-2">
                      <div className="w-3/4 h-3 bg-white/70 rounded" />
                      <div className="w-full h-1.5 bg-white/20 rounded-full" />
                      <div className="w-1/2 h-1.5 bg-white/20 rounded-full" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* 4. Process / Feature Strip */}
            <section className="px-6 md:px-10 py-16 flex flex-col gap-10">
              <motion.div animate={getBuildAnim(4.2)} className="w-48 h-6 bg-white rounded" />
              <div className="flex flex-col gap-6">
                {[4.5, 4.8, 5.1].map((delay, i) => (
                  <motion.div key={i} animate={getBuildAnim(delay)} className="flex items-start gap-5">
                    <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-[10px] text-white/40 font-mono">
                      0{i+1}
                    </div>
                    <div className="flex-1 pt-2 flex flex-col gap-3">
                      <div className="w-1/3 h-3 bg-white/60 rounded" />
                      <div className="w-full h-px bg-white/10" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* 5. Pricing / Conversion Area */}
            <section className="px-6 md:px-10 py-16 flex flex-col gap-8 bg-white/[0.02]">
              <motion.div animate={getBuildAnim(5.5)} className="w-40 h-8 bg-white mx-auto rounded" />
              <div className="grid grid-cols-2 gap-4 mt-4">
                {[5.8, 6.1].map((delay, i) => (
                  <motion.div key={i} animate={getBuildAnim(delay)} className={`p-6 rounded-2xl border ${i === 1 ? 'border-white/30 bg-white/5' : 'border-white/10 bg-black'} flex flex-col gap-4 shadow-xl`}>
                    <div className="w-1/2 h-3 bg-white/40 rounded" />
                    <div className="w-3/4 h-8 bg-white rounded mt-1" />
                    <div className="flex flex-col gap-3 mt-4">
                      <div className="w-full h-1.5 bg-white/20 rounded-full" />
                      <div className="w-full h-1.5 bg-white/20 rounded-full" />
                      <div className="w-2/3 h-1.5 bg-white/20 rounded-full" />
                    </div>
                    <div className={`w-full h-10 rounded-full mt-4 ${i === 1 ? 'bg-white' : 'bg-white/10 border border-white/10'}`} />
                  </motion.div>
                ))}
              </div>
            </section>

            {/* 6. Final CTA Section */}
            <motion.section animate={getBuildAnim(6.5)} className="px-6 md:px-10 py-16 mb-20">
              <div className="w-full py-12 rounded-2xl bg-white flex flex-col items-center gap-6 text-black">
                <div className="w-3/4 h-8 bg-black/90 rounded mx-auto" />
                <div className="w-1/2 h-3 bg-black/30 rounded-full mx-auto" />
                <div className="px-8 py-3 bg-black text-white rounded-full text-[10px] font-bold tracking-widest mt-2 uppercase">
                  Deploy Now
                </div>
              </div>
            </motion.section>

          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};
