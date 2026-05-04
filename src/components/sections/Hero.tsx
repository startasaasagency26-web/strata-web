import { BrowserBuilder } from '../BrowserBuilder';

export const Hero = () => {
  return (
    <section className="relative min-h-[80vh] md:min-h-[90vh] flex flex-col justify-center overflow-hidden px-4 md:px-12 pt-24 pb-12">
      
      {/* Top Eyebrow Copy */}
      <div className="absolute top-24 md:top-32 left-4 md:left-12 z-20 max-w-[280px]">
        <p className="text-xs font-mono tracking-widest text-primary leading-relaxed uppercase">
          Engineering tomorrow's digital ecosystems today
        </p>
      </div>

      {/* Main Hero Composition Container */}
      <div className="relative flex-1 flex flex-col items-center justify-center py-20 md:py-0">
        
        {/* Background Typography (Behind Browser) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none overflow-hidden z-0">
          <h1 className="text-[24vw] md:text-[22vw] font-display font-bold leading-[0.8] tracking-tighter text-primary whitespace-nowrap opacity-[0.98]">
            BUILD
          </h1>
          <h1 className="text-[24vw] md:text-[22vw] font-display font-bold leading-[0.8] tracking-tighter text-primary whitespace-nowrap opacity-[0.98]">
            FUTURES
          </h1>
        </div>

        {/* Animated Browser Builder (Overlapping Typography) */}
        <div className="relative z-10 w-full flex items-center justify-center md:justify-end md:pr-[8%] lg:pr-[12%] mt-8 md:mt-32 pointer-events-none">
          <BrowserBuilder className="w-[92%] md:w-[clamp(520px,44vw,780px)] h-[340px] md:h-[clamp(360px,32vw,540px)]" />
        </div>

        {/* Floating Pills (Positioned around the composition) */}
        <div className="absolute z-20 top-[20%] left-[5%] md:left-[15%] pointer-events-auto">
          <div className="glass-pill px-6 py-2 rounded-full font-mono text-[10px] md:text-xs font-bold tracking-widest">
            DESIGN
          </div>
        </div>
        <div className="absolute z-20 top-[35%] right-[2%] md:right-[10%] pointer-events-auto">
          <div className="glass-pill px-6 py-2 rounded-full font-mono text-[10px] md:text-xs font-bold tracking-widest">
            DEVELOP
          </div>
        </div>
        <div className="absolute z-20 bottom-[35%] left-[2%] md:left-[8%] pointer-events-auto">
          <div className="glass-pill px-6 py-2 rounded-full font-mono text-[10px] md:text-xs font-bold tracking-widest">
            OPTIMIZE
          </div>
        </div>
        <div className="absolute z-20 bottom-[25%] right-[8%] md:right-[20%] hidden md:block pointer-events-auto">
          <div className="glass-pill px-6 py-2 rounded-full font-mono text-[10px] md:text-xs font-bold tracking-widest">
            SCALE
          </div>
        </div>
      </div>

      {/* Bottom Content Area */}
      <div className="relative mt-auto z-30 flex flex-col md:flex-row justify-between items-end gap-8 pb-4 md:pb-0">
        
        {/* Subheadline and tags */}
        <div className="max-w-md">
          <p className="text-sm md:text-base font-mono tracking-wide text-primary uppercase mb-6 leading-relaxed">
            We don't just design websites — we architect digital systems that convert, scale, and compound.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="border border-primary/30 rounded-full px-4 py-1.5 text-[10px] font-mono font-bold tracking-widest">PREMIUM INTERFACE</span>
            <span className="border border-primary/30 rounded-full px-4 py-1.5 text-[10px] font-mono font-bold tracking-widest">FAST ARCHITECTURE</span>
          </div>
        </div>

        {/* Founder Card */}
        <div className="bg-primary text-white p-5 md:p-6 rounded-[28px] max-w-sm flex items-center gap-4 shadow-2xl border border-white/5">
          <div className="w-12 h-12 rounded-full bg-white/10 flex-shrink-0 border border-white/10 flex items-center justify-center overflow-hidden">
             <div className="w-6 h-6 bg-white/20 rounded-sm rotate-45" />
          </div>
          <p className="text-[11px] font-mono leading-relaxed text-white/90">
            Hi, we're Strata — your digital architecture partner for the next decade. Let's engineer your next era.
          </p>
        </div>
      </div>
    </section>
  );
};
