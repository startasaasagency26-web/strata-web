import { motion } from 'framer-motion';

const steps = [
  {
    num: "01",
    title: "Brand Direction",
    description: "We define the visual language, typography, and mood that aligns perfectly with your brand's premium positioning."
  },
  {
    num: "02",
    title: "Wireframe & Strategy",
    description: "Structuring the user journey for maximum conversion, ensuring intuitive navigation and clear information architecture."
  },
  {
    num: "03",
    title: "High-Fidelity UI Design",
    description: "Crafting the pixel-perfect cinematic interfaces, integrating glassmorphism, glow effects, and modern aesthetics."
  },
  {
    num: "04",
    title: "Responsive Development",
    description: "Translating the design into a fast, scalable React architecture, fully optimized for mobile, tablet, and desktop."
  },
  {
    num: "05",
    title: "Launch & Optimization",
    description: "Rigorous testing, SEO setup, and performance tuning before deploying the site to a global edge network."
  }
];

export const Process = () => {
  return (
    <section id="process" className="py-24 md:py-32 relative bg-black/40">
      <div className="container mx-auto px-6 md:px-12">
        
        <div className="mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
            <span className="text-xs font-medium text-white tracking-wider uppercase">How we work</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-white max-w-2xl">
            A structured approach to <span className="text-primary">premium delivery</span>
          </h2>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-[27px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-secondary/20 to-transparent transform md:-translate-x-1/2" />

          <div className="space-y-12 md:space-y-24">
            {steps.map((step, idx) => (
              <div key={idx} className={`relative flex flex-col md:flex-row items-start md:items-center ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                
                {/* Node */}
                <div className="absolute left-0 md:left-1/2 top-0 md:top-1/2 transform -translate-x-1/2 md:-translate-y-1/2 w-[56px] h-[56px] bg-background border-2 border-primary rounded-full flex items-center justify-center z-10 shadow-[0_0_20px_rgba(0,85,255,0.4)]">
                  <span className="text-white font-serif font-bold text-lg">{step.num}</span>
                </div>

                {/* Content */}
                <div className={`ml-20 md:ml-0 md:w-1/2 ${idx % 2 === 0 ? 'md:pl-20' : 'md:pr-20 text-left md:text-right'}`}>
                  <motion.div
                    initial={{ opacity: 0, x: idx % 2 === 0 ? 30 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="p-6 md:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] transition-colors"
                  >
                    <h3 className="text-2xl font-serif text-white mb-3">{step.title}</h3>
                    <p className="text-muted leading-relaxed">{step.description}</p>
                  </motion.div>
                </div>

              </div>
            ))}
          </div>
        </div>
        
      </div>
    </section>
  );
};
