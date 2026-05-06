import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const BuildWithUs = () => {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-6 py-20 lg:px-20 lg:py-32">
      <div className="mx-auto max-w-4xl text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 block font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-primary/40"
        >
          BUILD WITH STRATA
        </motion.span>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8 text-5xl font-black tracking-tight text-primary md:text-7xl lg:text-8xl"
        >
          Opportunities Coming Soon
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mb-16 max-w-2xl text-lg leading-relaxed text-primary/60 md:text-xl"
        >
          We’re building a space for future collaborators, creatives, developers, strategists, and operators who want to work with Strata. This page is not open yet.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-6"
        >
          <Link 
            to="/" 
            className="group flex h-14 items-center justify-center gap-3 rounded-full border border-primary/10 bg-white px-8 text-[11px] font-bold uppercase tracking-widest text-primary transition-all hover:bg-primary/5 active:scale-95"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
          <Link 
            to="/request-demo" 
            className="group flex h-14 items-center justify-center gap-3 rounded-full bg-primary px-8 text-[11px] font-bold uppercase tracking-widest text-white transition-all active:scale-95"
          >
            Request a Diagnostic
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
      
      {/* Decorative element */}
      <div className="fixed top-1/2 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.02] blur-[120px]" />
    </div>
  );
};
