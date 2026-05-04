import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "What does Strata Web build?",
    answer: "We build premium, conversion-focused websites and web applications. This ranges from luxury landing pages and corporate sites to complex interactive web apps using modern frameworks like React and Next.js."
  },
  {
    question: "Is the website mobile responsive?",
    answer: "Absolutely. We employ a mobile-first philosophy. Every website is meticulously crafted to ensure a flawless experience across all devices—smartphones, tablets, and desktops."
  },
  {
    question: "Can you optimize for SEO?",
    answer: "Yes, technical SEO is built directly into our development process. We ensure proper semantic HTML, lightning-fast load times, metadata optimization, and structured data setup."
  },
  {
    question: "How long does a website take?",
    answer: "A standard landing page takes 2-3 weeks, while comprehensive multi-page corporate sites or web applications can take 6-12 weeks depending on complexity and features required."
  },
  {
    question: "Can this be expanded later?",
    answer: "Yes. We build with scalability in mind. Our code architecture allows for easy expansion, whether you need to add e-commerce capabilities, new pages, or complex integrations in the future."
  }
];

export const FAQ = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 relative bg-black/40 border-t border-white/5">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div 
                key={idx} 
                className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden transition-colors hover:bg-white/[0.04]"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className="text-lg font-medium text-white">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0 ml-4"
                  >
                    <ChevronDown className={isOpen ? "text-primary" : "text-muted"} size={20} />
                  </motion.div>
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
                      <div className="px-6 pb-6 pt-2 text-muted leading-relaxed">
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
    </section>
  );
};
