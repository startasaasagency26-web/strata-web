import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: 'What is Strata Core?',
    answer: 'Strata Core is our single-product revenue operating system for local service businesses. It connects short-form content, Meta/TikTok ads, landing pages, WhatsApp CRM, AI qualification, automated follow-up, and reporting into one unified commercial engine.',
  },
  {
    question: 'How do the components inside Strata Core work together?',
    answer: 'Strata Core combines Layer 1 (Growth Media / Attention Creation) with Layer 2 (Revenue Infrastructure / Lead Capture & CRM). They function as integrated layers inside one system, ensuring inbound attention is automatically qualified and converted.',
  },
  {
    question: 'Is ad spend included in Strata Core?',
    answer: 'No. Ad spend is paid directly by your business account to Meta or TikTok. Strata\'s fee covers system implementation, campaign management, video content production, workflow automation, and monthly optimization.',
  },
  {
    question: 'Do I need to film video content myself?',
    answer: 'No. Strata handles short-form video production using our specialized media workflow, including scripts, hooks, editing, captions, and creative direction.',
  },
  {
    question: 'Do you guarantee specific revenue or lead numbers?',
    answer: 'No. We do not make unverified revenue guarantees. Strata builds the infrastructure, qualification pipeline, and campaign execution layer to significantly reduce lead leakage and improve follow-up consistency.',
  },
  {
    question: 'What happens after I book a Revenue Audit?',
    answer: 'We review your existing lead path, diagnose where enquiries are being dropped or delayed, verify your business economics, and provide a clear Strata Core implementation plan.',
  },
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
              <h2 className="text-4xl md:text-5xl font-display font-bold leading-none tracking-tight text-text mb-6">SYSTEM <br /> QUERIES</h2>
              <p className="text-muted font-sans text-sm leading-relaxed">
                Clear answers about how Strata installs revenue infrastructure, media systems, and follow-up workflows.
              </p>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="border-t border-border/50">
              {faqs.map((faq, idx) => {
                const isOpen = openIdx === idx;
                const panelId = `faq-panel-${idx}`;
                const buttonId = `faq-button-${idx}`;

                return (
                  <div
                    key={faq.question}
                    className="border-b border-border/50 group"
                  >
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenIdx(isOpen ? null : idx)}
                      className="w-full py-6 md:py-8 flex items-center justify-between text-left rounded-2xl focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    >
                      <span className={`text-base md:text-lg font-mono font-bold tracking-wide pr-8 transition-colors ${isOpen ? 'text-text' : 'text-text/70 group-hover:text-gold'}`}>
                        {faq.question}
                      </span>
                      <div className={`shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${isOpen ? 'bg-gold text-void border-gold' : 'bg-transparent text-text border-border/50 group-hover:border-gold'}`}>
                        {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                      </div>
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          id={panelId}
                          role="region"
                          aria-labelledby={buttonId}
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
