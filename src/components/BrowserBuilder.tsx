import { motion, useReducedMotion } from 'framer-motion';

export const BrowserBuilder = ({ className = '' }: { className?: string }) => {
  const prefersReducedMotion = useReducedMotion();
  const DURATION = 14; // Total loop duration in seconds

  // Helper to generate synchronized staggered animations
  const getBuildAnim = (startSec: number) => {
    if (prefersReducedMotion) return {};

    const start = startSec / DURATION;
    const fadeIn = (startSec + 0.6) / DURATION; // 0.6s fade duration
    const fadeOutStart = 12 / DURATION; // Start fading out at 12s
    const fadeOutEnd = 12.5 / DURATION;

    return {
      opacity: [0, 0, 1, 1, 0, 0],
      y: [15, 15, 0, 0, -10, -10],
      scale: [0.95, 0.95, 1, 1, 0.95, 0.95],
      transition: {
        duration: DURATION,
        repeat: Infinity,
        ease: "easeOut",
        times: [0, start, fadeIn, fadeOutStart, fadeOutEnd, 1]
      }
    };
  };

  // Scroll animation for the inner canvas
  const scrollAnim = prefersReducedMotion ? {} : {
    y: ["0%", "0%", "-55%", "-55%", "0%", "0%"],
    transition: {
      duration: DURATION,
      repeat: Infinity,
      ease: "easeInOut",
      // Scroll starts at 4.5s, ends at 8.5s. Rests until 12s. Snaps back at end.
      times: [0, 4.5/DURATION, 8.5/DURATION, 12/DURATION, 12.5/DURATION, 1]
    }
  };

  // Blueprint overlay animation
  const gridAnim = prefersReducedMotion ? { opacity: 0 } : {
    opacity: [0, 0.5, 0.5, 0, 0, 0],
    transition: {
      duration: DURATION,
      repeat: Infinity,
      ease: "linear",
      times: [0, 0.1, 3/DURATION, 4/DURATION, 12/DURATION, 1]
    }
  };

  return (
    <div className={`relative w-full max-w-[800px] mx-auto perspective-[1200px] ${className}`}>
      
      {/* Outer Browser Window */}
      <motion.div 
        initial={{ opacity: 0, y: 20, rotateX: 5 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="w-full h-[400px] md:h-[600px] rounded-2xl md:rounded-[24px] border border-white/10 bg-[#0A0A0A]/90 backdrop-blur-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col relative"
      >
        {/* Browser Header */}
        <div className="h-10 md:h-12 border-b border-white/5 flex items-center px-4 md:px-6 shrink-0 bg-white/[0.02] relative z-20">
          <div className="flex gap-2">
            <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-white/20" />
            <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-white/20" />
            <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-white/20" />
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 w-1/3 md:w-1/4 h-4 rounded-full bg-white/5 border border-white/5" />
        </div>

        {/* Browser Canvas */}
        <div className="flex-1 relative overflow-hidden bg-[#050505]">
          
          {/* Engineering Grid Overlay */}
          <motion.div 
            animate={gridAnim}
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
              backgroundPosition: 'center center'
            }}
          />

          {/* Scrolling Content Wrapper */}
          <motion.div 
            animate={scrollAnim}
            className="absolute top-0 left-0 right-0 p-4 md:p-8 flex flex-col gap-6 md:gap-10 pb-20 relative z-10 origin-top"
          >
            
            {/* Nav Pill */}
            <motion.div animate={getBuildAnim(0.2)} className="w-full flex justify-between items-center bg-white/5 border border-white/10 rounded-full px-4 md:px-6 py-3 backdrop-blur-md">
              <div className="w-6 h-6 rounded bg-white" />
              <div className="hidden md:flex gap-4">
                <div className="w-12 h-2 rounded-full bg-white/30" />
                <div className="w-12 h-2 rounded-full bg-white/30" />
                <div className="w-12 h-2 rounded-full bg-white/30" />
              </div>
              <div className="w-20 h-6 rounded-full bg-white" />
            </motion.div>

            {/* Hero Section */}
            <div className="flex flex-col items-center justify-center pt-8 md:pt-12 pb-6 text-center gap-4">
              <motion.div animate={getBuildAnim(0.8)} className="w-24 h-4 rounded-full bg-white/20 mb-2" />
              <motion.div animate={getBuildAnim(1.0)} className="w-3/4 h-10 md:h-16 rounded-lg bg-gradient-to-r from-white to-white/60" />
              <motion.div animate={getBuildAnim(1.2)} className="w-1/2 h-10 md:h-16 rounded-lg bg-gradient-to-r from-white/80 to-white/40" />
              <motion.div animate={getBuildAnim(1.5)} className="w-1/3 h-3 rounded-full bg-white/30 mt-4" />
              <motion.div animate={getBuildAnim(1.6)} className="w-1/4 h-3 rounded-full bg-white/30" />
              
              <motion.div animate={getBuildAnim(1.9)} className="flex gap-3 mt-6">
                <div className="w-28 h-10 rounded-full bg-white" />
                <div className="w-28 h-10 rounded-full bg-transparent border border-white/30" />
              </motion.div>
            </div>

            {/* Main Visual Asset */}
            <motion.div animate={getBuildAnim(2.4)} className="w-full aspect-[21/9] rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent relative overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent" />
              <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center bg-white/5 backdrop-blur-sm">
                <div className="w-4 h-4 rounded-full bg-white" />
              </div>
            </motion.div>

            {/* Services Grid */}
            <div className="w-full flex justify-between items-end mt-8 mb-2">
              <motion.div animate={getBuildAnim(3.0)} className="w-32 h-6 rounded-md bg-white/80" />
              <motion.div animate={getBuildAnim(3.1)} className="w-16 h-4 rounded-full bg-white/30" />
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {[3.4, 3.6, 3.8].map((delay, i) => (
                <motion.div key={i} animate={getBuildAnim(delay)} className={`aspect-square rounded-xl bg-white/[0.03] border border-white/10 p-4 flex flex-col justify-between ${i === 2 ? 'hidden md:flex' : ''}`}>
                  <div className="w-8 h-8 rounded-full bg-white/10" />
                  <div className="space-y-2">
                    <div className="w-2/3 h-3 rounded bg-white/60" />
                    <div className="w-1/2 h-2 rounded bg-white/20" />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Testimonial Block */}
            <motion.div animate={getBuildAnim(4.2)} className="mt-12 w-full max-w-[80%] mx-auto flex flex-col items-center text-center gap-4 py-8">
              <div className="flex gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((_, i) => (
                  <div key={i} className="w-3 h-3 rounded-full bg-white" />
                ))}
              </div>
              <div className="w-full h-4 rounded bg-white/80" />
              <div className="w-5/6 h-4 rounded bg-white/80" />
              <div className="w-4/6 h-4 rounded bg-white/80" />
              <div className="flex items-center gap-3 mt-4">
                <div className="w-10 h-10 rounded-full bg-white/20" />
                <div className="flex flex-col gap-1 text-left">
                  <div className="w-16 h-3 rounded bg-white/60" />
                  <div className="w-12 h-2 rounded bg-white/30" />
                </div>
              </div>
            </motion.div>

            {/* Pricing Section */}
            <div className="mt-12 w-full flex flex-col md:flex-row gap-4">
              {[4.6, 4.8].map((delay, i) => (
                <motion.div key={i} animate={getBuildAnim(delay)} className="flex-1 rounded-2xl bg-white/5 border border-white/10 p-5 md:p-6 flex flex-col gap-4">
                  <div className="w-1/3 h-4 rounded bg-white/50" />
                  <div className="w-1/2 h-8 rounded bg-white mt-2" />
                  <div className="w-full h-px bg-white/10 my-2" />
                  <div className="flex flex-col gap-3">
                    {[1, 2, 3, 4].map((_, j) => (
                      <div key={j} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-white/20" />
                        <div className="w-2/3 h-2 rounded bg-white/30" />
                      </div>
                    ))}
                  </div>
                  <div className={`w-full h-10 rounded-full mt-4 ${i === 1 ? 'bg-white' : 'bg-white/10'}`} />
                </motion.div>
              ))}
            </div>

            {/* Footer */}
            <motion.div animate={getBuildAnim(5.2)} className="mt-16 border-t border-white/10 pt-8 flex justify-between items-center pb-8">
               <div className="w-8 h-8 rounded bg-white/40" />
               <div className="flex gap-4">
                 <div className="w-8 h-2 rounded bg-white/20" />
                 <div className="w-8 h-2 rounded bg-white/20" />
                 <div className="w-8 h-2 rounded bg-white/20" />
               </div>
            </motion.div>

          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};
