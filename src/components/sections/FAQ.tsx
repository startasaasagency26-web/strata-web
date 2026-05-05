import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: "WHAT EXACTLY DOES STRATA BUILD?",
    answer: "We engineer premium, conversion-focused websites and web applications. This ranges from luxury landing pages and corporate sites to complex interactive web apps using modern frameworks like React and Next.js."
  },
  {
    question: "IS THE ARCHITECTURE MOBILE RESPONSIVE?",
    answer: "Absolutely. We employ a mobile-first philosophy. Every interface is meticulously crafted to ensure flawless performance and accessibility across all devices and screen sizes."
  },
  {
    question: "HOW IS SEO HANDLED?",
    answer: "Technical SEO is built directly into our deployment protocol. We ensure proper semantic HTML, lightning-fast load times, Core Web Vitals optimization, and structured data setup."
  },
  {
    question: "WHAT IS THE DEPLOYMENT TIMELINE?",
    answer: "A standard brand foundation takes 2-4 weeks. Comprehensive multi-page corporate systems or web applications take 6-12 weeks depending on technical complexity and feature requirements."
  },
  {
    question: "CAN THE SYSTEM BE SCALED LATER?",
    answer: "Yes. We build modular, scalable architectures. Our code structure allows for seamless expansion, whether you need to add e-commerce capabilities, complex integrations, or new product verticals in the future."
  }
];

export const FAQ = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="relative border-b border-border/50 bg-surface py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-12 max-w-5xl">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          
          <div className="lg:col-span-4">
            <div className="sticky top-24">
              <p className="text-xs font-mono tracking-widest text-muted uppercase mb-4">Knowledge Base</p>
              <h2 className="text-4xl md:text-5xl font-display font-bold leading-none tracking-tight text-primary mb-6">SYSTEM <br/> QUERIES</h2>
              <p className="text-muted font-sans text-sm leading-relaxed">
                Clear answers to common questions about our technical capabilities and deployment processes.
              </p>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="border-t border-border/50">
              {faqs.map((faq, idx) => {
                const isOpen = openIdx === idx;
                return (
                  <div 
                    key={idx} 
                    className="border-b border-border/50 group"
                  >
                    <button
                      onClick={() => setOpenIdx(isOpen ? null : idx)}
                      className="w-full py-6 md:py-8 flex items-center justify-between text-left focus:outline-none"
                    >
                      <span className={`text-base md:text-lg font-mono font-bold tracking-wide pr-8 transition-colors ${isOpen ? 'text-primary' : 'text-primary/70 group-hover:text-primary'}`}>
                        {faq.question}
                      </span>
                      <div className={`shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${isOpen ? 'bg-primary text-white border-primary' : 'bg-transparent text-primary border-border/50 group-hover:border-primary'}`}>
                        {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                      </div>
                    </button>
                    
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="pb-8 pt-2 pr-12 text-muted font-sans leading-relaxed text-sm md:text-base">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
        
      </div>
    </section>
  );
};
