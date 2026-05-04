import { motion } from 'framer-motion';

const benefits = [
  { num: "01", title: "CONVERSION FIRST", desc: "Every pixel is engineered to guide users toward your primary objective. We build systems that perform, not just pretty pictures." },
  { num: "02", title: "PREMIUM INTERFACE", desc: "A luxury aesthetic that positions your brand as an industry leader. We utilize advanced typography, spacing, and motion." },
  { num: "03", title: "FAST RESPONSIVE", desc: "Mobile must be flawless. We build natively responsive frontends that load in milliseconds across all devices." },
  { num: "04", title: "SEO FOUNDATION", desc: "Technical SEO built into the core architecture, ensuring search engines index and rank your content effectively." },
  { num: "05", title: "SCALABLE ARCHITECTURE", desc: "Built on modern frameworks like React and Next.js, your site is ready to grow and integrate with future technologies." },
  { num: "06", title: "LONG-TERM SYSTEMS", desc: "We don't do disposable websites. We build enduring digital assets that compound in value over time." }
];

export const Benefits = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-background border-y border-border/50">
      <div className="container mx-auto px-6 md:px-12">
        
        <div className="flex flex-col md:flex-row gap-12 md:gap-24 mb-16">
          <h2 className="text-4xl md:text-6xl font-display font-bold leading-[0.9] tracking-tighter text-primary max-w-md uppercase">
            Why serious brands choose Strata.
          </h2>
          <div className="flex-1 max-w-lg border-l border-primary/20 pl-6 md:pl-12">
            <p className="text-base font-sans text-primary mb-6 leading-relaxed">
              We don't rely on generic templates or bloated builders. Every line of code and interface decision is crafted to ensure your digital presence is faster, more secure, and higher converting than your competition.
            </p>
            <p className="text-sm font-mono tracking-widest text-muted uppercase">
              The Strata Advantage
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 border-t border-border/50 pt-12">
          {benefits.map((benefit, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group flex flex-col"
            >
              <div className="flex items-end justify-between border-b border-border/50 pb-4 mb-4">
                <h3 className="text-lg font-mono font-bold tracking-widest text-primary">{benefit.title}</h3>
                <span className="text-sm font-mono text-muted">{benefit.num}</span>
              </div>
              <p className="text-muted font-sans text-sm leading-relaxed">
                {benefit.desc}
              </p>
            </motion.div>
          ))}
        </div>
          
      </div>
    </section>
  );
};
