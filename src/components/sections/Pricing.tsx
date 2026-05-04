import { GlassCard } from '../ui/GlassCard';
import { Button } from '../ui/Button';
import { Check } from 'lucide-react';

const plans = [
  {
    name: "Strata Launch",
    price: "$599",
    description: "Perfect for new brands needing a strong foundation.",
    features: [
      "Custom 3-Page Website",
      "Mobile Responsive Design",
      "Basic SEO Setup",
      "Contact Form Integration",
      "2 Rounds of Revisions"
    ],
    featured: false,
    cta: "Start Project"
  },
  {
    name: "Strata Growth",
    price: "$1,895",
    description: "Comprehensive solution for growing businesses.",
    features: [
      "Up to 8 Custom Pages",
      "Premium Animations",
      "Advanced SEO Optimization",
      "CMS Integration",
      "Performance Optimization",
      "Priority Support"
    ],
    featured: true,
    cta: "Book Strategy Call"
  },
  {
    name: "Strata Scale",
    price: "$3,995+",
    description: "Custom web applications and enterprise sites.",
    features: [
      "Unlimited Pages",
      "Custom Web App Functionality",
      "E-commerce Integration",
      "Advanced Database Setup",
      "Dedicated Project Manager",
      "24/7 Technical Support"
    ],
    featured: false,
    cta: "Contact Sales"
  }
];

export const Pricing = () => {
  return (
    <section id="pricing" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[600px] bg-secondary/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">Transparent investment</h2>
          <p className="text-muted text-lg">
            Choose the right foundation for your business. No hidden fees, just premium delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center max-w-6xl mx-auto">
          {plans.map((plan, idx) => (
            <GlassCard 
              key={idx} 
              className={`flex flex-col h-full ${plan.featured ? 'border-primary shadow-[0_0_30px_rgba(0,85,255,0.2)] md:scale-105 z-10' : 'border-white/10'}`}
            >
              {plan.featured && (
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary to-secondary" />
              )}
              
              <div className="mb-8">
                <h3 className="text-xl font-medium text-white mb-2">{plan.name}</h3>
                <p className="text-muted text-sm min-h-[40px]">{plan.description}</p>
              </div>
              
              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-serif text-white">{plan.price}</span>
                  {plan.name !== "Strata Scale" && <span className="text-muted">/project</span>}
                </div>
              </div>
              
              <div className="flex-grow">
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3">
                      <Check className="text-primary shrink-0 mt-0.5" size={18} />
                      <span className="text-sm text-white/80">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <Button 
                variant={plan.featured ? 'primary' : 'outline'} 
                className="w-full"
              >
                {plan.cta}
              </Button>
            </GlassCard>
          ))}
        </div>
        
      </div>
    </section>
  );
};
