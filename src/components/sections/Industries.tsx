import { motion } from 'framer-motion';
import { Users, ShoppingBag, Wrench, Briefcase, Cpu, Store } from 'lucide-react';

const industries = [
  {
    icon: <Users size={24} />,
    title: "Service Businesses",
    desc: "Malaysian SMEs that need a stronger digital foundation to explain their services, build trust, and capture serious enquiries.",
    tags: ["Lead Capture", "Service Flow"]
  },
  {
    icon: <ShoppingBag size={24} />,
    title: "E-commerce & Brands",
    desc: "Product-led brands requiring high-end visual clarity, technical SEO, and conversion-first online shopping experiences.",
    tags: ["Sales Systems", "Product Clarity"]
  },
  {
    icon: <Wrench size={24} />,
    title: "Repair & Technical",
    desc: "Businesses with complex service workflows that need clear location visibility, trust signals, and structured customer journeys.",
    tags: ["Workflow", "Trust Signal"]
  },
  {
    icon: <Briefcase size={24} />,
    title: "Professional Services",
    desc: "Consultants and agencies that need to project authority through a premium interface and streamlined intake systems.",
    tags: ["Authority", "Intake Flow"]
  },
  {
    icon: <Cpu size={24} />,
    title: "Operations-Heavy",
    desc: "B2B and operations-focused companies requiring internal systems or client portals built for scale and productivity.",
    tags: ["Internal Ops", "Scalability"]
  },
  {
    icon: <Store size={24} />,
    title: "Local Retail",
    desc: "Retailers looking to bridge the gap between their physical presence and a high-converting digital storefront.",
    tags: ["Storefront", "Local Reach"]
  }
];

export const Industries = () => {
  return (
    <section id="industries" className="py-24 md:py-32 bg-[#fcfbf9] border-b border-border/50 scroll-mt-[120px]">
      <div className="container mx-auto px-6 md:px-12">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16 md:mb-24">
          <div className="max-w-2xl">
            <p className="text-xs font-mono tracking-widest text-muted uppercase mb-4">Core Focus</p>
            <h2 className="text-5xl md:text-6xl font-display font-bold leading-none tracking-tight text-primary uppercase">
              Industries We <br/> Architect For
            </h2>
          </div>
          <p className="text-sm font-mono text-muted max-w-sm uppercase tracking-widest leading-relaxed">
            We build for serious operators across Malaysia's most critical business sectors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {industries.map((industry, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group border border-primary/5 bg-white p-8 md:p-10 rounded-[32px] hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
            >
              <div className="mb-8 w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                {industry.icon}
              </div>
              <h3 className="text-xl font-display font-bold text-primary mb-4 tracking-tight uppercase">{industry.title}</h3>
              <p className="text-primary/60 font-sans text-sm leading-relaxed mb-8">
                {industry.desc}
              </p>
              <div className="flex flex-wrap gap-2">
                {industry.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="text-[9px] font-mono font-bold tracking-widest uppercase px-3 py-1 bg-primary/[0.03] border border-primary/5 rounded-full text-primary/40">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
};
