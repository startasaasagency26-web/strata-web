import { motion } from 'framer-motion';
import { AlertTriangle, ArrowRight, Layers, MessageSquareX, UserCheck, ZapOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CONTACT } from '../../config/contact';
import { Button } from '../ui/liquid-glass-button';

const problemPoints = [
  {
    icon: <MessageSquareX className="text-amber-600 shrink-0" size={22} />,
    title: 'Enquiries Disappear in WhatsApp',
    desc: 'Leads arrive from ads or social media but sit in personal messaging apps without tracking, ownership, or structured records.',
  },
  {
    icon: <ZapOff className="text-amber-600 shrink-0" size={22} />,
    title: 'Follow-Up Depends on Staff Memory',
    desc: 'Without automated reminders and task flows, prospects go cold while team members juggle manual follow-up chasers.',
  },
  {
    icon: <Layers className="text-amber-600 shrink-0" size={22} />,
    title: 'Disconnected Software Silos',
    desc: 'Form builders, messaging apps, spreadsheets, and CRMs run independently with zero automatic synchronization.',
  },
  {
    icon: <AlertTriangle className="text-amber-600 shrink-0" size={22} />,
    title: 'Blind Spot in Sales Pipeline',
    desc: 'Owners and managers cannot see where leads drop off, which team members need support, or why revenue is leaking.',
  },
];

export const BusinessProblem = () => {
  return (
    <section id="business-problem" className="relative border-t border-border/50 bg-[#FBFBFC] py-24 md:py-32 scroll-mt-[100px]">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mx-auto max-w-4xl text-center mb-16 md:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 text-[10px] font-mono tracking-[0.3em] text-muted uppercase"
          >
            THE COMMERCIAL REALITY
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black leading-tight tracking-[-0.04em] text-primary uppercase mb-6"
          >
            Your problem isn't always lead generation. <br className="hidden md:block" />
            <span className="text-primary/60">Sometimes the system behind the lead is broken.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.18 }}
            className="mx-auto max-w-2xl font-sans text-muted text-base md:text-lg leading-relaxed"
          >
            Most growing businesses waste up to 40% of their marketing budget because inbound enquiries fall into fragmented tools, delayed responses, and unmonitored staff workflows.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 max-w-5xl mx-auto">
          {problemPoints.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="bg-white border border-border/60 rounded-[28px] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:border-border transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="mb-5 flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <span className="font-mono text-[10px] font-bold text-muted uppercase tracking-widest">
                    SYSTEM LEAK 0{idx + 1}
                  </span>
                </div>
                <h3 className="text-xl font-mono font-bold text-primary mb-3 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-muted font-sans text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto bg-primary text-white rounded-[32px] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl"
        >
          <div className="max-w-xl text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/80 font-mono text-[9px] font-bold uppercase tracking-widest mb-4">
              <UserCheck size={13} className="text-emerald-400" />
              THE STRATA SOLUTION
            </div>
            <h4 className="text-2xl md:text-3xl font-black tracking-tight mb-3">
              One connected revenue operating system.
            </h4>
            <p className="text-white/70 text-sm md:text-base font-sans leading-relaxed">
              Strata replaces fragmented tools with a single commercial infrastructure that captures every lead, automates follow-up, and keeps your pipeline fully visible.
            </p>
          </div>

          <Button
            asChild
            variant="glassOnDark"
            size="lg"
            className="rounded-full font-mono font-bold tracking-widest text-[10px] uppercase px-8 h-14 shrink-0 w-full md:w-auto"
          >
            <Link to={CONTACT.requestDemoPath} className="flex items-center justify-center gap-2">
              Book a Revenue Systems Audit
              <ArrowRight size={14} />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
