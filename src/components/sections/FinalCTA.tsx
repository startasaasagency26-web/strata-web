import { Button } from '../ui/Button';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const FinalCTA = () => {
  return (
    <section className="relative py-32 overflow-hidden border-t border-white/10">
      
      {/* Cinematic Digital Grid Horizon Background */}
      <div className="absolute inset-0 perspective-[1000px]">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-primary/10" />
        <div 
          className="absolute bottom-0 inset-x-0 h-64 border-t border-primary/30"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0, 85, 255, 0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 85, 255, 0.2) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            transform: 'rotateX(60deg) scale(2)',
            transformOrigin: 'bottom center',
          }}
        />
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-background via-background/80 to-transparent" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-5xl md:text-7xl font-serif text-white mb-8 leading-[1.1]">
            Launch a website that finally looks as serious as the business behind it.
          </h2>
          
          <Button variant="primary" size="lg" className="gap-2 text-lg px-10 h-16 shadow-[0_0_40px_rgba(0,85,255,0.6)]">
            Book a Strategy Call <ArrowRight />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
