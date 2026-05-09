import { Link } from 'react-router-dom';
import { BrowserBuilder } from '../BrowserBuilder';

export const Hero = () => {
  return (
    <section className="relative min-h-[80vh] md:min-h-[90vh] flex flex-col justify-center overflow-hidden px-4 md:px-12 pt-24 pb-12">
      
      {/* Top Eyebrow Copy */}
      <div className="absolute top-24 md:top-32 left-4 md:left-12 z-20 max-w-[280px]">
        <p className="text-xs font-mono tracking-widest text-primary leading-relaxed uppercase">
          AI-POWERED DIGITAL AGENCY
        </p>
      </div>

      {/* Main Hero Composition - Vertical Stack */}
      <div className="flex-1 flex flex-col items-center justify-center pt-16 md:pt-24 pb-12 md:pb-24">
        
        {/* Main Headline - Fully readable and dominant */}
        <div className="relative flex flex-col items-center justify-center pointer-events-none select-none overflow-hidden">
          <h1 className="text-[clamp(2rem,14vw,24rem)] font-display font-bold leading-[0.8] tracking-tighter text-primary whitespace-nowrap">
            BUILD SYSTEMS
          </h1>
          <h1 className="text-[clamp(2rem,14vw,24rem)] font-display font-bold leading-[0.8] tracking-tighter text-primary whitespace-nowrap">
            THAT SELL
          </h1>
        </div>

        {/* Animated Browser Builder - Placed BELOW the headline */}
        <div className="relative w-full flex items-center justify-center mt-6 md:mt-12 pointer-events-none z-10">
          <BrowserBuilder className="w-[94%] md:w-[clamp(620px,48vw,860px)] h-[360px] md:h-[clamp(380px,30vw,520px)]" />
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
        <Link to="/about" className="bg-primary text-white p-5 md:p-6 rounded-[28px] max-w-sm flex items-center gap-4 shadow-2xl border border-white/5 transition-transform hover:scale-[1.02] active:scale-[0.98]">
          <div className="w-12 h-12 rounded-full bg-white/10 flex-shrink-0 border border-white/10 flex items-center justify-center overflow-hidden">
             <img src="/founder.jpg" alt="Amirul Afiz" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col">
            <p className="text-[10px] font-mono font-bold tracking-widest text-white/50 uppercase mb-1">Founder-led Studio</p>
            <p className="text-[11px] font-mono leading-tight text-white/90 uppercase">
              Build your digital foundation with Amirul Afiz & Strata.
            </p>
          </div>
        </Link>
      </div>
    </section>
  );
};
