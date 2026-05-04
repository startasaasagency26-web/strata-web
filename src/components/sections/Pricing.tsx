import { Check } from 'lucide-react';

const plans = [
  {
    name: "LAUNCH",
    price: "$5k",
    description: "For emerging brands needing a strong, conversion-focused digital foundation.",
    features: [
      "Custom 5-Page Architecture",
      "Native Responsive Design",
      "Core SEO Implementation",
      "Analytics Integration",
      "Standard Performance Tuning"
    ],
    featured: false,
    cta: "Start Project"
  },
  {
    name: "GROWTH",
    price: "$15k",
    description: "Comprehensive scalable systems for established businesses looking to dominate.",
    features: [
      "Up to 15 Custom Pages",
      "Advanced Motion & Interactions",
      "Technical SEO Foundation",
      "Headless CMS Integration",
      "Premium Performance Score",
      "Dedicated Strategy Sessions"
    ],
    featured: true,
    cta: "Book Consultation"
  },
  {
    name: "SCALE",
    price: "$40k",
    description: "Bespoke digital ecosystems and web applications for enterprise operations.",
    features: [
      "Unlimited Page Architecture",
      "Custom Web App Functionality",
      "Complex API Integrations",
      "Advanced Database Architecture",
      "Dedicated Engineering Team",
      "Ongoing Retainer Options"
    ],
    featured: false,
    cta: "Contact Partners"
  }
];

export const Pricing = () => {
  return (
    <section id="pricing" className="py-24 md:py-32 relative bg-surface border-b border-border/50">
      <div className="container mx-auto px-6 md:px-12">
        
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <p className="text-xs font-mono tracking-widest text-muted uppercase mb-4">Engagement Models</p>
          <h2 className="text-5xl md:text-6xl font-display font-bold leading-none tracking-tight text-primary mb-6">INVESTMENT ARCHITECTURE</h2>
          <p className="text-muted font-sans text-sm md:text-base leading-relaxed">
            We don't do cheap. We build premium, high-converting digital assets that generate compounding ROI for your business. Choose your deployment tier.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-start max-w-6xl mx-auto">
          {plans.map((plan, idx) => (
            <div 
              key={idx} 
              className={`flex flex-col h-full bg-white border rounded-[24px] overflow-hidden transition-all duration-300 ${plan.featured ? 'border-primary shadow-xl md:-mt-4 md:mb-4' : 'border-border/50 shadow-sm hover:shadow-md'}`}
            >
              <div className={`p-8 border-b ${plan.featured ? 'bg-primary text-white border-primary' : 'bg-surface border-border/50 text-primary'}`}>
                <h3 className="text-xl font-mono font-bold tracking-widest uppercase mb-4">{plan.name}</h3>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-sm font-mono opacity-80">Starting at</span>
                  <span className={`text-5xl font-display font-bold ${plan.featured ? 'text-white' : 'text-primary'}`}>{plan.price}</span>
                </div>
                <p className={`text-sm font-sans leading-relaxed min-h-[60px] ${plan.featured ? 'text-white/80' : 'text-muted'}`}>{plan.description}</p>
              </div>
              
              <div className="p-8 flex-grow flex flex-col bg-white">
                <ul className="space-y-4 mb-8 flex-grow">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3">
                      <Check className="text-primary shrink-0 mt-0.5" size={16} />
                      <span className="text-sm font-sans text-muted">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button 
                  className={`w-full py-4 rounded-full font-mono text-xs font-bold tracking-widest uppercase transition-colors ${
                    plan.featured 
                      ? 'bg-primary text-white hover:bg-primary/90' 
                      : 'bg-surface border border-border/50 text-primary hover:bg-border/20'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
};
