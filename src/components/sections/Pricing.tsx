import { Check } from 'lucide-react';

const mainPackages = [
  {
    name: "STRATA START",
    price: "RM1,500",
    description: "Best for small businesses, new brands, and solo operators who need one strong digital foundation to explain their services and capture enquiries quickly.",
    features: [
      "One-page landing website",
      "Up to 6 structured sections",
      "Mobile responsive design",
      "WhatsApp button",
      "Contact form",
      "Google Maps integration",
      "Basic SEO title & meta setup"
    ],
    featured: false,
    cta: "START WITH STRATA"
  },
  {
    name: "STRATA LAUNCH",
    price: "RM2,800",
    description: "Best for SMEs that need a complete digital presence with clear pages, credible structure, and essential business information.",
    features: [
      "5 core pages (Home, About, etc.)",
      "Premium semi-custom design",
      "Mobile responsive layout",
      "WhatsApp link & Contact form",
      "Google Maps integration",
      "Basic on-page SEO",
      "Analytics & Speed optimization",
      "SSL & launch setup"
    ],
    featured: true,
    cta: "BUILD MY DIGITAL FOUNDATION"
  },
  {
    name: "STRATA GROWTH",
    price: "RM4,800",
    description: "Best for growing SMEs that want stronger positioning, better lead capture, SEO structure, and service-focused content architecture.",
    features: [
      "Up to 10 pages",
      "Conversion-focused structure",
      "Service landing pages",
      "SEO foundation",
      "Built-in analytics",
      "Speed optimization",
      "Better content architecture",
      "Designed for growth"
    ],
    featured: false,
    cta: "GROW MY ONLINE PRESENCE"
  },
  {
    name: "STRATA SCALE",
    price: "From RM9,800",
    description: "Best for businesses that need custom systems, ecommerce, product catalogues, dashboards, integrations, or advanced digital architecture.",
    features: [
      "Custom page architecture",
      "Ecommerce / Product catalogue",
      "Payment gateway integration",
      "CRM / API integrations",
      "Admin system options",
      "Headless CMS option",
      "Advanced performance setup",
      "Scope-based custom build"
    ],
    featured: false,
    cta: "DISCUSS CUSTOM PROJECT"
  }
];

const carePlans = [
  {
    name: "CARE BASIC",
    price: "RM199/month",
    description: "Essential website maintenance including security, backups, and uptime checks."
  },
  {
    name: "CARE STANDARD",
    price: "RM399/month",
    description: "Includes key updates, maintenance, and 1 hour of content edits per month."
  },
  {
    name: "CARE GROWTH",
    price: "RM799/month",
    description: "Includes analytics review, SEO checks, priority support, and performance monitoring."
  }
];

export const Pricing = () => {
  return (
    <section id="products" className="relative border-b border-border/50 bg-surface py-24 md:py-32 scroll-mt-[120px]">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* Header Section */}
        <div className="text-center max-w-4xl mx-auto mb-16 md:mb-24">
          <p className="text-xs font-mono tracking-widest text-muted uppercase mb-4">WEBSITE PACKAGES</p>
          <h2 className="text-4xl md:text-6xl font-display font-bold leading-none tracking-tight text-primary mb-6">
            DIGITAL ARCHITECTURE FOR MALAYSIAN SMEs
          </h2>
          <p className="text-muted font-sans text-base md:text-lg leading-relaxed">
            We architect clear, credible, mobile-responsive digital foundations that help Malaysian businesses build trust, explain their services, and capture more enquiries online.
          </p>
        </div>

        {/* Main Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-4 items-start max-w-7xl mx-auto">
          {mainPackages.map((plan, idx) => (
            <div 
              key={idx} 
              className={`flex flex-col h-full bg-white border rounded-[24px] overflow-hidden transition-all duration-500 group cursor-default relative ${
                plan.featured 
                  ? 'border-[#111111] border-2 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] z-10 hover:-translate-y-[8px] hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.25)]' 
                  : 'border-border/50 shadow-sm hover:border-primary/30 hover:-translate-y-[6px] hover:shadow-2xl'
              }`}
            >
              {plan.featured && (
                <div className="absolute top-4 right-6">
                  <span className="bg-primary text-white text-[8px] font-mono font-bold tracking-[0.2em] px-3 py-1 rounded-full uppercase">
                    RECOMMENDED
                  </span>
                </div>
              )}

              <div className={`p-6 border-b transition-colors duration-300 ${
                plan.featured ? 'bg-white border-[#111111]/10 text-primary' : 'bg-surface/50 border-border/50 text-primary group-hover:bg-white'
              }`}>
                <h3 className={`text-sm font-mono font-bold tracking-widest uppercase mb-4 ${plan.featured ? 'text-primary' : 'text-muted opacity-80'}`}>
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-4xl font-display font-bold text-primary">{plan.price}</span>
                </div>
                <p className={`text-xs font-sans leading-relaxed min-h-[60px] ${plan.featured ? 'text-primary/70' : 'text-muted'}`}>
                  {plan.description}
                </p>
              </div>
              
              <div className="p-6 flex-grow flex flex-col bg-white">
                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2">
                      <Check className={`${plan.featured ? 'text-primary' : 'text-muted'} shrink-0 mt-0.5`} size={14} />
                      <span className="text-xs font-sans text-muted leading-tight">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button 
                  className={`w-full py-4 rounded-full font-mono text-[10px] font-bold tracking-widest uppercase transition-all duration-300 transform group-hover:scale-[1.02] ${
                    plan.featured 
                      ? 'bg-primary text-white hover:bg-primary/90 shadow-md' 
                      : 'bg-white border border-border text-primary hover:bg-primary hover:text-white'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Care Plans Section */}
        <div className="max-w-5xl mx-auto mt-24">
          <div className="text-center mb-12">
            <p className="text-xs font-mono tracking-widest text-muted uppercase mb-4">OPTIONAL WEBSITE CARE</p>
            <h3 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4">
              Keep Your Digital Architecture Secure, Updated, and Performing
            </h3>
            <p className="text-muted font-sans text-sm md:text-base max-w-2xl mx-auto">
              Choose a monthly care plan if you want Strata to handle maintenance, updates, monitoring, and ongoing improvements after launch.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {carePlans.map((plan, idx) => (
              <div key={idx} className="p-8 bg-white border border-border/50 rounded-[20px] hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <h4 className="text-xs font-mono font-bold tracking-widest uppercase text-muted mb-2">{plan.name}</h4>
                <p className="text-2xl font-display font-bold text-primary mb-3">{plan.price}</p>
                <p className="text-xs font-sans text-muted leading-relaxed">{plan.description}</p>
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </section>
  );
};

