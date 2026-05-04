import { motion } from 'framer-motion';

const steps = [
  { num: "01", title: "DISCOVER", desc: "Deep dive into business logic, user flow, and technical requirements to define scope." },
  { num: "02", title: "ARCHITECT", desc: "Wireframing the conversion funnel and planning the data structures and tech stack." },
  { num: "03", title: "DESIGN", desc: "Crafting the premium visual interface, defining typography, motion, and interaction states." },
  { num: "04", title: "BUILD", desc: "Translating the design into a fast, scalable frontend architecture using modern frameworks." },
  { num: "05", title: "LAUNCH", desc: "Rigorous QA testing, accessibility audits, and performance tuning before deployment." },
  { num: "06", title: "OPTIMIZE", desc: "Post-launch monitoring, SEO tracking, and iterative growth system improvements." }
];

export const Process = () => {
  return (
    <section id="process" className="py-24 md:py-32 relative bg-surface border-b border-border/50">
      <div className="container mx-auto px-6 md:px-12">
        
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <p className="text-xs font-mono tracking-widest text-muted uppercase mb-4">Phase Delivery System</p>
            <h2 className="text-4xl md:text-5xl font-display font-bold leading-none tracking-tight text-primary">
              TECHNICAL BLUEPRINT
            </h2>
          </div>
          <div className="font-mono text-xs text-primary max-w-xs uppercase tracking-widest border border-border/50 p-4 bg-background">
            <span className="block mb-2 text-muted">Status:</span>
            Standardized Deployment Protocol Active
          </div>
        </div>

        {/* Blueprint Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-border/50 border border-border/50">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-surface p-8 md:p-10 group hover:bg-background transition-colors duration-300 relative overflow-hidden"
            >
              {/* Blueprint Grid Background Pattern (Subtle) */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:20px_20px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center justify-between mb-8">
                  <span className="text-4xl font-display font-bold text-primary/10 group-hover:text-primary transition-colors duration-300">{step.num}</span>
                  <div className="w-2 h-2 rounded-full bg-border group-hover:bg-primary transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-mono font-bold tracking-widest text-primary mb-4">{step.title}</h3>
                <p className="text-muted font-sans text-sm leading-relaxed mt-auto">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
};
