import { GlassCard } from '../ui/GlassCard';
import { Monitor, Code2, LineChart, Wrench } from 'lucide-react';
import { motion } from 'framer-motion';

const services = [
  {
    icon: <Monitor size={32} className="text-primary" />,
    title: "Premium Website Design",
    description: "Cinematic interfaces tailored to your brand identity. We design conversion-first layouts that look beautiful and perform exceptionally.",
    glowColor: 'blue' as const
  },
  {
    icon: <Code2 size={32} className="text-secondary" />,
    title: "Web Development",
    description: "Robust, scalable front-end architecture using React and Next.js. We build sites that load instantly and handle complex interactions smoothly.",
    glowColor: 'purple' as const
  },
  {
    icon: <LineChart size={32} className="text-primary" />,
    title: "SEO & Performance Optimization",
    description: "Technical SEO foundations built-in from day one. We ensure your website ranks higher and loads faster than the competition.",
    glowColor: 'blue' as const
  },
  {
    icon: <Wrench size={32} className="text-secondary" />,
    title: "Website Maintenance & Growth",
    description: "Continuous optimization, security updates, and feature expansions to ensure your digital presence scales with your business.",
    glowColor: 'purple' as const
  }
];

export const Services = () => {
  return (
    <section id="services" className="py-24 md:py-32 relative">
      <div className="container mx-auto px-6 md:px-12">
        
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">Expertise that drives results</h2>
          <p className="text-muted text-lg">
            We provide an end-to-end service, from visual identity to robust technical deployment, ensuring a seamless experience.
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
            >
              <GlassCard interactive glowColor={service.glowColor} className="h-full">
                <div className="mb-6 w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-serif text-white mb-4">{service.title}</h3>
                <p className="text-muted leading-relaxed">
                  {service.description}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
};
