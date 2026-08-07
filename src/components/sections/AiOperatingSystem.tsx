import { motion } from 'framer-motion';
import { Bot, Brain, Database, LineChart, Megaphone, MessageSquarePlus, Workflow } from 'lucide-react';

const modules = [
  {
    icon: <Megaphone className="text-primary shrink-0" size={24} />,
    title: '1. Acquisition',
    desc: 'Traffic and demand generation via media, search, and paid channels.',
    badge: 'Demand Layer',
  },
  {
    icon: <MessageSquarePlus className="text-primary shrink-0" size={24} />,
    title: '2. Capture',
    desc: 'High-converting landing pages, structured forms, WhatsApp, and inbound widgets.',
    badge: 'Intake Layer',
  },
  {
    icon: <Brain className="text-primary shrink-0" size={24} />,
    title: '3. Intelligence',
    desc: 'AI lead qualification, customer context extraction, and automated lead scoring.',
    badge: 'AI Layer',
  },
  {
    icon: <Database className="text-primary shrink-0" size={24} />,
    title: '4. CRM',
    desc: 'Centralized lead records, history, status tags, and deal stage tracking.',
    badge: 'Core Records',
  },
  {
    icon: <Workflow className="text-primary shrink-0" size={24} />,
    title: '5. Automation',
    desc: 'Automated WhatsApp & email follow-up flows, task triggers, and delay reduction.',
    badge: 'Execution Layer',
  },
  {
    icon: <Bot className="text-primary shrink-0" size={24} />,
    title: '6. Sales Operations',
    desc: 'Pipeline visibility, staff task assignment, notifications, and team handoffs.',
    badge: 'Workflow Layer',
  },
  {
    icon: <LineChart className="text-primary shrink-0" size={24} />,
    title: '7. Analytics',
    desc: 'Real-time performance visibility, conversion tracking, and optimization data.',
    badge: 'Reporting Layer',
  },
];

export const AiOperatingSystem = () => {
  return (
    <section id="ai-operating-system" className="relative border-b border-border/50 bg-background py-24 md:py-32 scroll-mt-[100px]">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16 md:mb-20">
          <div className="max-w-3xl">
            <p className="text-[10px] font-mono tracking-[0.3em] text-muted uppercase mb-4">THE OPERATING LAYER</p>
            <h2 className="text-4xl md:text-6xl font-black leading-tight tracking-[-0.04em] text-primary uppercase">
              Meet the Strata AI Operating System
            </h2>
          </div>
          <p className="text-sm font-sans text-muted max-w-md leading-relaxed">
            A connected operating layer that helps businesses capture every opportunity, respond faster, automate repetitive work, maintain visibility across the sales pipeline, and turn more demand into revenue.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((mod, idx) => (
            <motion.div
              key={mod.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.06 }}
              className="bg-surface border border-border/60 rounded-[28px] p-7 flex flex-col justify-between hover:border-primary/30 hover:bg-white transition-all duration-300 group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-border flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    {mod.icon}
                  </div>
                  <span className="text-[9px] font-mono font-bold uppercase tracking-widest px-3 py-1 bg-white border border-border/60 rounded-full text-muted">
                    {mod.badge}
                  </span>
                </div>
                <h3 className="text-xl font-mono font-bold text-primary mb-3 uppercase tracking-tight">
                  {mod.title}
                </h3>
                <p className="text-muted font-sans text-sm leading-relaxed">
                  {mod.desc}
                </p>
              </div>
            </motion.div>
          ))}

          {/* Module Summary Card */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.42 }}
            className="bg-primary text-white rounded-[28px] p-8 flex flex-col justify-between"
          >
            <div>
              <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-white/50 block mb-4">
                COMMERCIAL RESULT
              </span>
              <h3 className="text-2xl font-black uppercase tracking-tight mb-4 text-white">
                Zero Leaks. <br /> Total Visibility.
              </h3>
              <p className="text-white/75 font-sans text-sm leading-relaxed">
                All 7 modules operate together as one infrastructure. No missing leads, no forgotten follow-ups, and full pipeline transparency.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-white/10 font-mono text-[10px] uppercase tracking-widest text-white/50">
              Strata Operating Infrastructure
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
