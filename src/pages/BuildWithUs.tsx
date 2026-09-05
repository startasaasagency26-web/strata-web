import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { WhatsAppChoice } from "../components/WhatsAppChoice";
import { Seo } from "../components/Seo";
import { routeMetadata } from "../config/routeMetadata";

export const BuildWithUs = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-5 pb-20 pt-32 sm:px-8 md:px-12 md:pt-40 lg:pb-32">
      <Seo {...routeMetadata.buildWithUs} />
      <div className="mx-auto max-w-4xl text-center">
        <motion.span
          initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 block font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-muted"
        >
          BUILD WITH STRATA
        </motion.span>
        
        <motion.h1
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.6, delay: shouldReduceMotion ? 0 : 0.1 }}
          className="mb-8 text-5xl font-black tracking-tight text-text md:text-7xl lg:text-8xl"
        >
          Opportunities Coming Soon
        </motion.h1>

        <motion.p
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.6, delay: shouldReduceMotion ? 0 : 0.2 }}
          className="mx-auto mb-16 max-w-2xl text-lg leading-relaxed text-text/60 md:text-xl"
        >
          We’re building a space for future collaborators, creatives, developers, strategists, and operators who want to work with Strata. This page is not open yet.
        </motion.p>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.6, delay: shouldReduceMotion ? 0 : 0.3 }}
          className="flex flex-wrap justify-center gap-6"
        >
          <Link 
            to="/" 
            className="group flex h-14 items-center justify-center gap-3 rounded-full border border-gold/10 bg-surface px-8 text-[11px] font-bold uppercase tracking-widest text-text transition-all hover:bg-gold/5 active:scale-95"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
          <WhatsAppChoice message="Hi Strata — I'd like to book a Business Operations Audit." source="build-with-us"
            className="group flex h-14 items-center justify-center gap-3 rounded-full bg-gold px-8 text-[11px] font-bold uppercase tracking-widest text-void transition-all hover:bg-goldHover active:bg-goldActive active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-focusOffset"
          >
            Book Operations Audit
            <ArrowRight size={16} />
          </WhatsAppChoice>
        </motion.div>
      </div>
      
      {/* Decorative element */}
      <div className="fixed top-1/2 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/[0.02] blur-[120px]" />
    </div>
  );
};
