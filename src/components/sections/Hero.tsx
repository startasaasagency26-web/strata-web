import { motion } from 'framer-motion';

export const Hero = () => {
  return (
    <section className="relative min-h-[80vh] md:min-h-[90vh] flex flex-col justify-center overflow-hidden px-4 md:px-12 pt-24 pb-12">
      
      {/* Top Eyebrow Copy */}
      <div className="absolute top-24 md:top-32 left-4 md:left-12 z-20 max-w-[280px]">
        <p className="text-xs font-mono tracking-widest text-primary leading-relaxed uppercase">
          Engineering tomorrow's digital ecosystems today
        </p>
      </div>

      {/* Main Massive Typography Background Layer */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none overflow-hidden mt-12 md:mt-0">
        <h1 className="text-[25vw] md:text-[22vw] font-display font-bold leading-[0.8] tracking-tighter text-primary whitespace-nowrap opacity-95">
          BUILD
        </h1>
        <h1 className="text-[25vw] md:text-[22vw] font-display font-bold leading-[0.8] tracking-tighter text-primary whitespace-nowrap opacity-95">
          FUTURES
        </h1>
      </div>

      {/* 3D Object Placeholder Centerpiece */}
      <div className="relative z-10 w-full flex items-center justify-center mt-32 md:mt-12 h-[50vh] md:h-[60vh] pointer-events-none">
        {/* We use a stylized chrome-like abstract structure as placeholder for the 3D visual */}
        <motion.div 
          animate={{ y: [-10, 10, -10] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          className="relative w-[300px] h-[400px] md:w-[450px] md:h-[600px] flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-white via-[#E5E5E2] to-[#C8C8C8] rounded-[60px] shadow-2xl border border-white rotate-12 transform origin-center mix-blend-overlay opacity-80" />
          <div className="absolute inset-10 bg-gradient-to-bl from-white via-transparent to-[#4B4B4B] rounded-[40px] shadow-inner border border-white/50 -rotate-6 backdrop-blur-sm" />
          <div className="absolute inset-20 bg-primary/5 rounded-[20px] backdrop-blur-md border border-white/80 rotate-3 flex items-center justify-center">
             <span className="font-mono text-xs tracking-widest text-muted">3D_ASSET_RENDER</span>
          </div>
        </motion.div>
      </div>

      {/* Floating Pills (Positioned around the hero) */}
      <div className="absolute z-20 top-1/3 left-[10%] md:left-[20%]">
        <div className="glass-pill px-6 py-2 rounded-full font-mono text-xs font-bold tracking-widest">
          DESIGN
        </div>
      </div>
      <div className="absolute z-20 top-[45%] right-[5%] md:right-[15%]">
        <div className="glass-pill px-6 py-2 rounded-full font-mono text-xs font-bold tracking-widest">
          DEVELOP
        </div>
      </div>
      <div className="absolute z-20 bottom-1/3 left-[5%] md:left-[15%]">
        <div className="glass-pill px-6 py-2 rounded-full font-mono text-xs font-bold tracking-widest">
          OPTIMIZE
        </div>
      </div>
      <div className="absolute z-20 bottom-[20%] right-[10%] md:right-[25%] hidden md:block">
        <div className="glass-pill px-6 py-2 rounded-full font-mono text-xs font-bold tracking-widest">
          SCALE
        </div>
      </div>

      {/* Bottom Content Area */}
      <div className="absolute bottom-4 md:bottom-12 left-4 md:left-12 right-4 md:right-12 z-20 flex flex-col md:flex-row justify-between items-end gap-8">
        
        {/* Subheadline and tags */}
        <div className="max-w-md">
          <p className="text-sm md:text-base font-mono tracking-wide text-primary uppercase mb-6 leading-relaxed">
            We don't just design websites — we architect digital systems that convert, scale, and compound.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="border border-primary/30 rounded-full px-4 py-1.5 text-xs font-mono font-bold tracking-widest">PREMIUM INTERFACE</span>
            <span className="border border-primary/30 rounded-full px-4 py-1.5 text-xs font-mono font-bold tracking-widest">FAST ARCHITECTURE</span>
          </div>
        </div>

        {/* Founder Card */}
        <div className="bg-primary text-white p-4 md:p-6 rounded-[24px] max-w-sm flex items-center gap-4 shadow-xl">
          <div className="w-12 h-12 rounded-full bg-white/20 flex-shrink-0 border border-white/10" />
          <p className="text-xs font-mono leading-relaxed">
            Hi, we're Strata — your digital architecture partner for the next decade. Let's engineer your next era.
          </p>
        </div>

      </div>
    </section>
  );
};
