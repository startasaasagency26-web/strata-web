import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { GlassCard } from '../ui/GlassCard';
import { ArrowRight, Code, Zap, Globe } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 -left-64 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-start text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-medium text-white tracking-wider uppercase">Premium Digital Agency</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-serif text-white leading-[1.1] mb-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
              Websites with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-secondary drop-shadow-[0_0_15px_rgba(138,43,226,0.6)]">Depth</span>, Speed, and Authority.
            </h1>
            
            <p className="text-lg md:text-xl text-muted mb-10 max-w-xl leading-relaxed">
              Strata Web builds premium digital foundations for serious brands — cinematic interfaces, conversion-first structure, mobile-ready experiences, and fast, scalable websites.
            </p>
            
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="primary" size="lg" className="gap-2">
                Book a Strategy Call <ArrowRight size={18} />
              </Button>
              <Button variant="outline" size="lg">
                View Our Work
              </Button>
            </div>
          </motion.div>
          
          {/* Right Floating UI */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative lg:h-[600px] flex items-center justify-center perspective-[2000px]"
          >
            <div className="relative w-full max-w-lg preserve-3d rotate-y-[-10deg] rotate-x-[5deg]">
              
              {/* Main Dashboard Card */}
              <GlassCard className="relative z-20 border-white/20 shadow-2xl bg-black/60 backdrop-blur-2xl p-6">
                <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <div className="text-xs text-muted font-mono bg-white/5 px-2 py-0.5 rounded">strata-web.agency</div>
                </div>
                
                <div className="space-y-4">
                  <div className="h-32 rounded-lg bg-gradient-to-r from-primary/20 to-secondary/20 border border-white/5 flex items-center justify-center">
                    <Globe className="text-white/50" size={32} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-20 rounded-lg bg-white/5 border border-white/5 p-4 flex flex-col justify-between">
                      <Zap className="text-primary" size={16} />
                      <div>
                        <div className="text-white font-medium text-lg">99.9%</div>
                        <div className="text-xs text-muted">Uptime</div>
                      </div>
                    </div>
                    <div className="h-20 rounded-lg bg-white/5 border border-white/5 p-4 flex flex-col justify-between">
                      <Code className="text-secondary" size={16} />
                      <div>
                        <div className="text-white font-medium text-lg">React</div>
                        <div className="text-xs text-muted">Stack</div>
                      </div>
                    </div>
                  </div>
                </div>
              </GlassCard>
              
              {/* Floating Element 1 */}
              <motion.div 
                animate={{ y: [-10, 10, -10] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                className="absolute -right-12 -top-12 z-30"
              >
                <GlassCard className="p-4 flex items-center gap-4 bg-black/80 backdrop-blur-xl border-primary/30 shadow-[0_0_30px_rgba(0,85,255,0.2)]">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    <Zap size={20} />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">Lighthouse Score</div>
                    <div className="text-xs text-primary font-mono mt-1">100 / 100 / 100</div>
                  </div>
                </GlassCard>
              </motion.div>

              {/* Floating Element 2 */}
              <motion.div 
                animate={{ y: [10, -10, 10] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                className="absolute -left-8 -bottom-8 z-30"
              >
                <GlassCard className="p-4 flex items-center gap-3 bg-black/80 backdrop-blur-xl border-white/10">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <div className="text-sm text-white font-medium">Conversion Optimized</div>
                </GlassCard>
              </motion.div>
              
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};
