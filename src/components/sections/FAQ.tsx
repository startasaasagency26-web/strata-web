import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: 'What does Strata actually build?',
    answer: 'Strata builds revenue infrastructure and growth media systems: landing pages, CRM pipelines, automations, content assets, paid media workflows, and performance reporting.',
  },
  {
    question: 'Do I need both systems?',
    answer: 'No. If you already have demand, start with Revenue Infrastructure. If you need more attention and traffic, start with Growth Media System. If both are weak, install the full system.',
  },
  {
    question: 'Is ad spend included?',
    answer: 'No. Ad spend is paid directly by the client to Meta or TikTok. Strata\'s fee covers strategy, media management, content production, system build, and optimization depending on scope.',
  },
  {
    question: 'Do I need to film content?',
    answer: 'No. Strata can produce short-form video assets using an AI-assisted production workflow, including scripts, hooks, captions, and creative direction.',
  },
  {
    question: 'Do you guarantee results?',
    answer: 'No. Strata does not guarantee specific revenue, ROAS, or lead volume. Strata builds the system, strategy, execution, and optimization layer. Results depend on offer, market, budget, and follow-through.',
  },
  {
    question: 'What happens after the strategy call?',
    answer: 'Strata diagnoses the current leak, recommends the right system, scopes the engagement, and provides a clear implementation plan.',
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
              <h2 className="text-4xl md:text-5xl font-display font-bold leading-none tracking-tight text-primary mb-6">SYSTEM <br /> QUERIES</h2>
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
