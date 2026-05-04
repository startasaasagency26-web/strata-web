import { Server, Smartphone, Zap, Search, Shield, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

const techStack = [
  { icon: <Zap size={24} />, name: "React & Next.js", desc: "For lightning-fast, reactive interfaces." },
  { icon: <Smartphone size={24} />, name: "Responsive UI", desc: "Flawless mobile, tablet, and desktop layouts." },
  { icon: <Search size={24} />, name: "SEO Built-in", desc: "Structured data and semantic HTML standard." },
  { icon: <Server size={24} />, name: "CMS Ready", desc: "Easily manage your content at scale." },
  { icon: <Cpu size={24} />, name: "Automation Ready", desc: "Integrate with any modern CRM or API." },
  { icon: <Shield size={24} />, name: "Security First", desc: "Enterprise-grade security best practices." }
];

export const Technology = () => {
  return (
    <section id="tech" className="py-24 md:py-32 relative bg-surface border-b border-border/50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
          <div>
            <p className="text-xs font-mono tracking-widest text-muted uppercase mb-4">Tech Stack</p>
            <h2 className="text-4xl md:text-5xl font-display font-bold leading-none tracking-tight text-primary max-w-lg">
              MODERN WEB CAPABILITIES
            </h2>
          </div>
          <p className="text-sm font-sans text-muted max-w-sm leading-relaxed">
            We don't build on legacy platforms. We utilize the latest web technologies to deliver an unfair advantage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {techStack.map((tech, idx) => (
            <motion.div 
              key={idx}
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
