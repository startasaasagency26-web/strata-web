import { Monitor, Code2, LineChart, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

const services = [
  {
    icon: <Monitor size={24} className="text-primary" />,
    title: "Web Design Systems",
    description: "Premium interfaces built on scalable design systems. We engineer digital environments that reflect luxury and conversion logic.",
    tags: ["UI/UX", "Design Systems", "Prototyping"]
  },
  {
    icon: <Code2 size={24} className="text-primary" />,
    title: "Web Development",
    description: "Robust, high-performance frontend architecture. We build sites that load instantly and handle complex interactions seamlessly.",
    tags: ["React/Next.js", "Headless CMS", "Animations"]
  },
  {
    icon: <LineChart size={24} className="text-primary" />,
    title: "SEO & Performance",
    description: "Technical search optimization and speed engineering built-in from day one to ensure you dominate your market.",
    tags: ["Technical SEO", "Core Web Vitals", "Analytics"]
  },
  {
    icon: <Cpu size={24} className="text-primary" />,
    title: "Automation & Growth Systems",
    description: "Continuous optimization, automated lead capture, and CRM integrations to make your website a compounding asset.",
    tags: ["Marketing Automation", "CRM Sync", "Conversion"]
  }
];

export const Services = () => {
  return (
    <section id="services" className="py-24 md:py-32 border-t border-border/50">
      <div className="container mx-auto px-6 md:px-12">
        
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16 md:mb-24">
          <div className="max-w-2xl">
            <p className="text-xs font-mono tracking-widest text-muted uppercase mb-4">Service Architecture</p>
            <h2 className="text-5xl md:text-6xl font-display font-bold leading-none tracking-tight text-primary">
              ENGINEERED TO <br/> COMPOUND
            </h2>
          </div>
          <p className="text-sm font-mono text-muted max-w-sm">
            End-to-end digital architecture from visual interface to technical deployment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group border border-border/50 bg-white/50 backdrop-blur-sm p-8 md:p-12 rounded-[24px] hover:bg-white hover:shadow-xl transition-all duration-300"
            >
              <div className="mb-8 w-14 h-14 rounded-full border border-border flex items-center justify-center bg-surface group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                {/* Clone element to change color on hover if needed, but icon classes work fine */}
                <div className="group-hover:text-white transition-colors duration-300">
                  {service.icon}
                </div>
              </div>
              <h3 className="text-2xl font-display font-bold text-primary mb-4 tracking-wide">{service.title}</h3>
              <p className="text-muted font-sans leading-relaxed mb-8">
                {service.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {service.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="text-[10px] font-mono tracking-widest uppercase px-3 py-1 bg-surface border border-border/50 rounded-full text-primary">
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
