import { ArrowUpRight } from 'lucide-react';

const projects = [
  {
    title: "J-ARMOR BRAND WEBSITE",
    category: "BRAND WEBSITE",
    detail: "PRODUCT BRAND + TRUST ARCHITECTURE",
    description: "A product-led brand website built to communicate protection, quality, product clarity, and customer trust through a polished digital presence.",
    mobileImage: "/work/jarmor-mobile.png",
    imageAlt: "J-Armor mobile brand website preview",
    href: "https://www.j-armor.net",
    type: "image"
  },
  {
    title: "THUNDERFIX SERVICE WEBSITE",
    category: "SERVICE BUSINESS WEBSITE",
    detail: "BRANCH FLOW + ENQUIRY SYSTEM",
    description: "A repair business website built around trust, service clarity, branch discovery, Google/Waze navigation, and WhatsApp-led customer enquiries.",
    mobileImage: "/work/thunderfix-mobile.png",
    imageAlt: "Thunderfix mobile service website preview",
    href: "https://thunderfix.online",
    type: "image"
  },
  {
    title: "ONE MOBILE ROS APP",
    category: "DIGITAL GROWTH SYSTEM",
    detail: "OPERATIONS DASHBOARD + KPI TRACKING",
    description: "An internal repair operations system that turns jobs, revenue, technician performance, attribution, and pipeline visibility into a clean owner dashboard.",
    type: "dashboard"
  }
];

const MobileDashboardMockup = () => (
  <div className="flex flex-col h-full bg-[#FDFDFD] p-4 gap-4 overflow-hidden">
    {/* Header */}
    <div className="flex justify-between items-center shrink-0">
      <div className="flex flex-col gap-1">
        <div className="w-16 h-2.5 bg-primary/20 rounded" />
        <div className="w-10 h-1 bg-primary/5 rounded" />
      </div>
      <div className="w-7 h-7 rounded-lg bg-primary/5 border border-primary/10 flex items-center justify-center">
        <div className="w-3 h-3 bg-primary/20 rounded-sm" />
      </div>
    </div>

    {/* KPI Grid 2x2 */}
    <div className="grid grid-cols-2 gap-3 shrink-0">
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="bg-surface rounded-xl border border-border/10 p-3 space-y-2">
          <div className="w-8 h-1 bg-primary/10 rounded" />
          <div className="w-full h-3 bg-primary/20 rounded" />
          <div className="w-1/2 h-1 bg-primary/5 rounded" />
        </div>
      ))}
    </div>
    
    {/* Revenue/Main Chart Area */}
    <div className="bg-surface rounded-2xl border border-border/10 p-4 flex flex-col gap-4 flex-grow min-h-0">
      <div className="flex justify-between items-center shrink-0">
        <div className="w-24 h-2 bg-primary/10 rounded" />
        <div className="w-8 h-3 bg-primary/5 rounded-full" />
      </div>
      <div className="flex-grow flex items-end gap-1.5 pb-1 min-h-0">
        {[40, 65, 50, 90, 70, 55, 80, 60, 45, 75].map((h, i) => (
          <div key={i} style={{ height: `${h}%` }} className="flex-grow bg-primary/10 rounded-t-[3px] transition-all duration-700 group-hover:bg-primary/20" />
        ))}
      </div>
    </div>

    {/* Attribution / Active Jobs List */}
    <div className="space-y-2.5 pb-2 shrink-0">
      <div className="w-20 h-1.5 bg-primary/10 rounded mb-1" />
      {[1, 2].map(i => (
        <div key={i} className="flex items-center gap-3 bg-surface p-2.5 rounded-xl border border-border/5">
          <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center">
            <div className="w-3 h-3 border-2 border-primary/20 rounded-full" />
          </div>
          <div className="flex-grow space-y-1.5">
            <div className="w-full h-2 bg-primary/10 rounded" />
            <div className="w-3/4 h-1.5 bg-primary/5 rounded" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const SelectedWork = () => {
  return (
    <section id="work" className="py-24 md:py-32 relative bg-background border-b border-border/50">
      <div className="container mx-auto px-6 md:px-12">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-5xl md:text-6xl font-display font-bold leading-none tracking-tight text-primary mb-6 uppercase">SELECTED WORK</h2>
            <p className="text-muted font-sans text-sm md:text-base max-w-lg leading-relaxed">
              Real digital architecture built across product brands, service businesses, and internal growth systems.
            </p>
          </div>
          <button className="group inline-flex items-center gap-2 font-mono text-xs font-bold tracking-widest text-primary transition-all relative overflow-hidden pb-1 uppercase">
            <span className="relative z-10">View All Projects</span>
            <ArrowUpRight size={16} className="relative z-10 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <div 
              key={idx} 
              className="group flex flex-col h-full bg-surface border border-border/50 p-2 rounded-[24px] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.12)] hover:border-primary/20 motion-reduce:transform-none motion-reduce:transition-none"
            >
              {/* Premium Mobile Showcase Composition */}
              <div className="h-[300px] md:h-[340px] lg:h-[360px] w-full bg-[#E9E8E4] rounded-[18px] relative overflow-hidden flex items-center justify-center p-8 border border-border/30">
                {/* Phone Frame - Controlled Composition */}
                <div className="relative w-[150px] md:w-[170px] lg:w-[185px] aspect-[9/19.5] bg-[#111111] rounded-[30px] md:rounded-[34px] border-[5px] md:border-[7px] border-[#111111] shadow-2xl overflow-hidden transition-all duration-700 ease-out group-hover:-translate-y-2 group-hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]">
                  {/* Phone Screen */}
                  <div className="absolute inset-0 bg-white overflow-hidden">
                    {project.type === 'image' ? (
                      <img 
                        src={project.mobileImage} 
                        alt={project.imageAlt} 
                        className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                      />
                    ) : (
                      <div className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-[1.02]">
                        <MobileDashboardMockup />
                      </div>
                    )}
                  </div>
                  {/* Minimal Subtle Notch */}
                  <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-12 h-3 bg-black rounded-full opacity-40 z-10" />
                </div>
                
                {/* Subtle Ground Shadow */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-24 h-2 bg-black/5 blur-xl rounded-full" />
              </div>
              
              {/* Content Panel */}
              <div className="p-6 md:p-8 flex-grow flex flex-col bg-white rounded-[18px] mt-2 border border-border/50 transition-colors duration-300 group-hover:border-primary/10">
                <div className="text-[10px] font-mono font-bold text-muted mb-4 tracking-widest uppercase opacity-60 group-hover:opacity-100 transition-opacity">
                  {project.category}
                </div>
                <h3 className="text-xl md:text-2xl font-display font-bold text-primary mb-3 group-hover:text-primary transition-colors leading-tight">
                  {project.title}
                </h3>
                <p className="text-muted font-sans text-xs md:text-sm leading-relaxed mb-10 flex-grow">
                  {project.description}
                </p>
                
                <div className="inline-flex items-center justify-between w-full pt-6 border-t border-border/50 group-hover:border-primary/10 transition-colors mt-auto">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-primary/60 group-hover:text-primary transition-colors uppercase truncate max-w-[200px]">
                    {project.detail}
                  </span>
                  <div className="w-10 h-10 rounded-full bg-surface group-hover:bg-primary group-hover:text-white transition-all duration-300 flex items-center justify-center shrink-0">
                    <ArrowUpRight className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" size={18} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
};
