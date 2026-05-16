import { Cpu, LayoutDashboard, MessageSquare, Search, Server, Shield, TrendingUp, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const systemStack = [
  { icon: <Zap size={24} />, name: 'Landing Pages', desc: 'Fast, conversion-focused pages built to capture demand.' },
  { icon: <LayoutDashboard size={24} />, name: 'CRM Pipelines', desc: 'Structured lead stages so every enquiry has a clear next action.' },
  { icon: <MessageSquare size={24} />, name: 'WhatsApp / Email Automation', desc: 'Follow-up flows that reduce delay and manual chasing.' },
  { icon: <TrendingUp size={24} />, name: 'Analytics + Tracking', desc: 'Visibility into traffic, conversion, lead flow, and campaign performance.' },
  { icon: <Cpu size={24} />, name: 'Content Production Workflow', desc: 'Repeatable system for short-form assets, hooks, captions, and creative testing.' },
  { icon: <Server size={24} />, name: 'Paid Media Execution', desc: 'Campaign structure for Meta and TikTok to distribute and test demand.' },
  { icon: <Search size={24} />, name: 'SEO Foundation', desc: 'Technical foundations that help the site stay indexable, fast, and structured.' },
  { icon: <Shield size={24} />, name: 'Performance + Security', desc: 'Fast, stable, and secure implementation using modern web standards.' },
];

export const Technology = () => {
  return (
    <section id="tech" className="py-24 md:py-32 relative bg-surface border-b border-border/50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
          <div>
            <p className="text-xs font-mono tracking-widest text-muted uppercase mb-4">System Stack</p>
            <h2 className="text-4xl md:text-5xl font-display font-bold leading-none tracking-tight text-primary max-w-lg">
              THE STACK BEHIND THE SYSTEM.
            </h2>
          </div>
          <p className="text-sm font-sans text-muted max-w-md leading-relaxed">
            Strata uses modern web, CRM, automation, tracking, and media workflows to build systems that can be launched, measured, and improved.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {systemStack.map((tech, idx) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="bg-background border border-border/50 p-6 rounded-[16px] flex items-start gap-4 hover:border-primary/30 hover:bg-white transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center text-primary shrink-0">
                {tech.icon}
              </div>
              <div>
                <h3 className="font-mono font-bold tracking-widest text-sm text-primary mb-1 uppercase">{tech.name}</h3>
                <p className="text-muted font-sans text-sm leading-relaxed">{tech.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
