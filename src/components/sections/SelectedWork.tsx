import { ArrowUpRight } from 'lucide-react';

const projects = [
  {
    title: "J-ARMOR BRAND WEBSITE",
    category: "BRAND WEBSITE",
    detail: "Product Brand + Trust Architecture",
    description: "A product-led brand website built to communicate protection, quality, product clarity, and customer trust through a polished digital presence.",
    image: "/work/jarmor-brand-website.png",
    imageAlt: "J-Armor brand website homepage preview",
    href: "https://www.j-armor.net",
    type: "image"
  },
  {
    title: "THUNDERFIX SERVICE WEBSITE",
    category: "SERVICE BUSINESS WEBSITE",
    detail: "Branch Flow + Enquiry System",
    description: "A repair business website built around trust, service clarity, branch discovery, Google/Waze navigation, and WhatsApp-led customer enquiries.",
    image: "/work/thunderfix-service-website.png",
    imageAlt: "Thunderfix service business website preview",
    href: "https://thunderfix.online",
    type: "image"
  },
  {
    title: "ONE MOBILE ROS APP",
    category: "DIGITAL GROWTH SYSTEM",
    detail: "Operations Dashboard + KPI Tracking",
    description: "An internal repair operations system that turns jobs, revenue, technician performance, attribution, and pipeline visibility into a clean owner dashboard.",
    type: "dashboard"
  }
];

const DashboardMockup = () => (
  <div className="p-4 flex flex-col gap-4 h-full bg-white">
    {/* KPI Grid */}
    <div className="grid grid-cols-4 gap-2">
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="h-12 bg-surface rounded border border-border/20 p-2 flex flex-col justify-between">
          <div className="w-full h-1 bg-primary/10 rounded" />
          <div className="w-2/3 h-2 bg-primary/20 rounded" />
        </div>
      ))}
    </div>
    
    {/* Revenue Chart */}
    <div className="flex-grow bg-surface rounded border border-border/20 p-3 flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <div className="w-24 h-2 bg-primary/20 rounded" />
        <div className="w-12 h-1.5 bg-primary/10 rounded" />
      </div>
      <div className="flex-grow flex items-end gap-1.5 pt-4">
        {[40, 70, 50, 90, 60, 80, 45, 85, 55, 75].map((h, i) => (
          <div key={i} style={{ height: `${h}%` }} className="flex-grow bg-primary/10 rounded-t-sm transition-all duration-500 group-hover:bg-primary/20" />
        ))}
      </div>
    </div>

    {/* Status Rows */}
    <div className="space-y-2">
      {[1, 2].map(i => (
        <div key={i} className="h-8 bg-surface rounded border border-border/20 flex items-center px-3 justify-between">
          <div className="w-32 h-1.5 bg-primary/10 rounded" />
          <div className="w-12 h-4 bg-primary/5 rounded-full" />
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
              className="group flex flex-col h-full bg-surface border border-border/50 p-2 rounded-[24px] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] hover:border-primary/20 motion-reduce:transform-none motion-reduce:transition-none"
            >
              {/* Browser Mockup Area */}
              <div className="h-64 md:h-80 w-full bg-[#E5E5E2] rounded-[16px] relative overflow-hidden flex flex-col border border-border/30">
                {/* Browser Header */}
                <div className="h-8 w-full border-b border-border/40 bg-surface flex items-center px-4 gap-1.5 shrink-0">
                  <div className="w-2 h-2 rounded-full bg-border" />
                  <div className="w-2 h-2 rounded-full bg-border" />
                  <div className="w-2 h-2 rounded-full bg-border" />
                </div>
                
                {/* Mockup Canvas */}
                <div className="flex-grow overflow-hidden relative group-hover:scale-[1.03] transition-transform duration-700 ease-out">
                  {project.type === 'image' ? (
                    <div className="absolute inset-x-4 -bottom-10 top-4 bg-white rounded-t-xl border-x border-t border-border/30 shadow-lg overflow-hidden">
                      <img 
                        src={project.image} 
                        alt={project.imageAlt} 
                        className="w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                      />
                    </div>
                  ) : (
                    <div className="absolute inset-x-4 -bottom-10 top-4 bg-white rounded-t-xl border-x border-t border-border/30 shadow-lg overflow-hidden opacity-90 group-hover:opacity-100 transition-opacity duration-500">
                      <DashboardMockup />
                    </div>
                  )}
                </div>
              </div>
              
              {/* Content Panel */}
              <div className="p-6 md:p-8 flex-grow flex flex-col bg-white rounded-[16px] mt-2 border border-border/50 transition-colors duration-300 group-hover:border-primary/10">
                <div className="text-[10px] font-mono font-bold text-muted mb-4 tracking-widest uppercase opacity-60 group-hover:opacity-100 transition-opacity">
                  {project.category}
                </div>
                <h3 className="text-xl md:text-2xl font-display font-bold text-primary mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted font-sans text-xs md:text-sm leading-relaxed mb-8 flex-grow">
                  {project.description}
                </p>
                
                <div className="inline-flex items-center justify-between w-full pt-6 border-t border-border/50 group-hover:border-primary/10 transition-colors">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-primary/60 group-hover:text-primary transition-colors uppercase">
                    {project.detail}
                  </span>
                  <div className="w-10 h-10 rounded-full bg-surface group-hover:bg-primary group-hover:text-white transition-all duration-300 flex items-center justify-center">
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
