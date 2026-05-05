import { ArrowRight, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

export const FinalCTA = () => {
  return (
    <section className="relative py-32 md:py-48 overflow-hidden bg-primary text-white">
      
      {/* Brutalist geometric accents */}
      <div className="absolute top-0 left-0 w-full h-px bg-white/20" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-white/20" />
      <div className="absolute top-0 left-6 w-px h-full bg-white/10 hidden md:block" />
      <div className="absolute top-0 right-6 w-px h-full bg-white/10 hidden md:block" />

      <div className="container mx-auto px-6 md:px-12 relative z-10 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl w-full"
        >
          <div className="flex justify-center mb-12">
            <div className="w-16 h-16 border-2 border-white/20 rounded-full flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-white/10 animate-pulse" />
              <div className="w-2 h-2 bg-white rounded-full" />
            </div>
          </div>
          
          <h2 className="text-4xl md:text-7xl lg:text-8xl font-display font-bold leading-[0.9] tracking-tighter mb-8 uppercase">
            Ready to architect your <br/> business presence online?
          </h2>
          
          <p className="text-white/70 font-sans text-lg md:text-xl max-w-2xl mx-auto mb-16 leading-relaxed">
            Book a Strata strategy call. We’ll confirm your scope, recommend the right package, and start once the deposit is paid.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="group relative inline-flex items-center justify-center gap-4 bg-white text-primary px-10 py-6 rounded-full font-mono font-bold tracking-widest uppercase hover:bg-surface transition-colors duration-300 w-full sm:w-auto">
              <span>Book Strategy Call</span>
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white group-hover:bg-primary/90 transition-colors duration-300 group-hover:translate-x-1">
                <ArrowRight size={16} />
              </div>
            </button>

            <button className="group inline-flex items-center justify-center gap-4 border border-white/30 text-white px-10 py-6 rounded-full font-mono font-bold tracking-widest uppercase hover:bg-white/10 transition-colors duration-300 w-full sm:w-auto">
              <MessageSquare size={20} className="text-white/70" />
              <span>WhatsApp Us</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

