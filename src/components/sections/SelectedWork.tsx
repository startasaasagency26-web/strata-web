import { ArrowUpRight } from 'lucide-react';

const projects = [
  {
    title: "J-Armor Brand Website",
    category: "BRAND WEBSITE",
    tags: ["Product Brand", "Trust Architecture", "Premium UI"],
    description: "A product-led brand website built to communicate protection, quality, product clarity, and customer trust through a polished digital presence.",
    desktopImage: "/work/jarmor-desktop.jpg",
    imageAlt: "J-Armor brand website desktop preview",
    href: "https://www.j-armor.net",
    type: "jarmor",
    ctaText: "View Project"
  },
  {
    title: "Thunderfix Service Website",
    category: "SERVICE BUSINESS WEBSITE",
    tags: ["Service Website", "Branch Flow", "Enquiry System"],
    description: "A repair business website built around trust, service clarity, branch discovery, Google/Waze navigation, and WhatsApp-led customer enquiries.",
    desktopImage: "/work/thunderfix-desktop.jpg",
    imageAlt: "Thunderfix service website desktop preview",
    href: "https://thunderfix.online",
    type: "thunderfix",
    ctaText: "View Project"
  },
  {
    title: "One Mobile ROS App",
    category: "DIGITAL GROWTH SYSTEM",
    tags: ["Operations Dashboard", "KPI Tracking", "Revenue Visibility"],
    description: "An internal repair operations system that turns jobs, revenue, technician performance, attribution, and pipeline visibility into a clean owner dashboard.",
    desktopImage: "/work/one-mobile-ros-dashboard.jpg",
    imageAlt: "One Mobile ROS dashboard preview",
    type: "ros",
    ctaText: "View System"
  }
];

const BrowserMockup = ({ image, alt }: { image?: string; alt?: string }) => (
  <div className="w-full h-full flex items-center justify-center p-4 lg:p-8">
    <div className="relative w-full aspect-video bg-white rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-border/10 overflow-hidden transition-transform duration-700 group-hover:scale-[1.015]">
      {/* Browser Top Bar */}
      <div className="h-8 bg-[#F5F3EF] border-b border-border/10 flex items-center px-4 gap-2 relative z-10">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 w-[40%] h-5 bg-white rounded-md border border-border/5 flex items-center px-2">
          <div className="w-full h-1 bg-primary/5 rounded-full" />
        </div>
      </div>
      {/* Browser Content */}
      <div className="absolute inset-0 pt-8 bg-[#F9F9F9]">
        {image ? (
          <img src={image} alt={alt} className="w-full h-full object-cover object-top opacity-95 group-hover:opacity-100 transition-opacity" />
        ) : (
          <div className="w-full h-full flex flex-col p-6 gap-4 animate-pulse">
            <div className="w-1/3 h-8 bg-primary/5 rounded" />
            <div className="w-full aspect-[2/1] bg-primary/5 rounded" />
          </div>
        )}
      </div>
    </div>
  </div>
);

const DashboardMockup = ({ image, alt }: { image?: string; alt?: string }) => (
  <div className="w-full h-full flex items-center justify-center p-4 lg:p-8">
    <div className="relative w-full aspect-[16/10] bg-[#FDFDFD] rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-border/10 overflow-hidden transition-transform duration-700 group-hover:scale-[1.015] flex">
      {/* Sidebar */}
      <div className="w-[18%] h-full bg-[#F5F3EF] border-r border-border/10 p-4 flex flex-col gap-4 shrink-0">
        <div className="w-10 h-10 rounded-lg bg-primary/10 mb-4" />
        {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-full h-2 bg-primary/5 rounded" />)}
      </div>
      {/* Content Area */}
      <div className="flex-grow p-6 flex flex-col gap-6 bg-white overflow-hidden">
        {image ? (
          <img src={image} alt={alt} className="w-full h-full object-cover object-top opacity-95 group-hover:opacity-100 transition-opacity" />
        ) : (
          <>
            <div className="flex justify-between items-center">
              <div className="w-32 h-6 bg-primary/10 rounded" />
              <div className="w-24 h-8 bg-primary rounded-lg" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-24 bg-surface rounded-xl border border-border/5 p-4 flex flex-col justify-between">
                  <div className="w-12 h-1.5 bg-primary/5 rounded" />
                  <div className="w-full h-4 bg-primary/10 rounded" />
                </div>
              ))}
            </div>
            <div className="flex-grow bg-surface rounded-xl border border-border/5 p-6 flex flex-col gap-4">
              <div className="w-40 h-2 bg-primary/10 rounded" />
              <div className="flex-grow flex items-end gap-2 pt-4">
                {[40, 70, 50, 90, 65, 80, 55, 75, 45, 85, 60, 95].map((h, i) => (
                  <div key={i} style={{ height: `${h}%` }} className="flex-grow bg-primary/5 rounded-t-[2px] transition-all duration-700 group-hover:bg-primary/20" />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
      
      {/* Floating KPI Tag */}
      <div className="absolute top-10 right-10 bg-[#0A0A0A] text-white px-4 py-2.5 rounded-xl shadow-2xl flex flex-col gap-1 border border-white/10 transition-transform duration-700 group-hover:translate-x-2 group-hover:-translate-y-2 z-20">
        <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest">LIVE OPS</span>
        <span className="text-[13px] font-mono font-bold tracking-tight text-primary uppercase">SYSTEM ACTIVE</span>
      </div>
    </div>
  </div>
);

export const SelectedWork = () => {
  return (
    <section id="work" className="py-24 md:py-32 relative bg-background border-b border-border/50 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-6">
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

        {/* Desktop Layout: Stacked Horizontal Cards */}
        <div className="hidden lg:flex flex-col gap-20">
          {projects.map((project, idx) => (
            <div 
              key={idx} 
              className={`group flex items-stretch bg-surface border border-border/30 rounded-[32px] overflow-hidden min-h-[500px] transition-all duration-700 hover:-translate-y-1.5 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] hover:border-primary/20 ${idx % 2 === 1 ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {/* Image Area - 65% */}
              <div className="w-[65%] bg-[#E9E8E4] relative overflow-hidden flex items-center justify-center">
                {project.type === 'ros' ? (
                  <DashboardMockup image={project.desktopImage} alt={project.imageAlt} />
                ) : (
                  <BrowserMockup image={project.desktopImage} alt={project.imageAlt} />
                )}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[60%] h-4 bg-black/5 blur-[40px] rounded-full" />
              </div>

              {/* Content Area - 35% */}
              <div className="w-[35%] p-12 flex flex-col justify-center bg-white border-x border-border/10">
                <div className="text-[11px] font-mono font-bold text-muted mb-6 tracking-[0.2em] uppercase opacity-60">
                  {project.category}
                </div>
                <h3 className="text-3xl font-display font-bold text-primary mb-5 leading-tight">
                  {project.title}
                </h3>
                <p className="text-muted font-sans text-sm leading-relaxed mb-8">
                  {project.description}
                </p>
                
                {/* Tag Cloud */}
                <div className="flex flex-wrap gap-2 mb-10">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-surface border border-border/10 rounded-full text-[10px] font-mono font-bold text-primary/70 uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-auto pt-8 border-t border-border/50">
                  <a 
                    href={project.href} 
                    className="inline-flex items-center gap-3 text-[11px] font-mono font-bold tracking-[0.15em] text-primary uppercase group/btn"
                  >
                    <span>{project.ctaText}</span>
                    <div className="w-9 h-9 rounded-full bg-surface group-hover/btn:bg-primary group-hover/btn:text-white transition-all duration-300 flex items-center justify-center">
                      <ArrowUpRight size={16} className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </div>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile/Tablet Layout: Horizontal Scroll Carousel */}
        <div className="lg:hidden relative">
          <div className="flex overflow-x-auto scroll-snap-x mandatory gap-6 pb-12 hide-scrollbar px-1">
            {projects.map((project, idx) => (
              <div 
                key={idx} 
                className="flex-none w-[86vw] md:w-[80vw] scroll-snap-align-start group bg-surface border border-border/30 rounded-[28px] overflow-hidden flex flex-col shadow-sm transition-all duration-500 hover:shadow-xl"
              >
                {/* Image Area */}
                <div className="w-full aspect-[4/3] bg-[#E9E8E4] relative overflow-hidden flex items-center justify-center">
                  {project.type === 'ros' ? (
                    <DashboardMockup image={project.desktopImage} alt={project.imageAlt} />
                  ) : (
                    <BrowserMockup image={project.desktopImage} alt={project.imageAlt} />
                  )}
                </div>

                {/* Content Area */}
                <div className="p-8 flex flex-col bg-white flex-grow">
                  <div className="text-[10px] font-mono font-bold text-muted mb-4 tracking-widest uppercase opacity-60">
                    {project.category}
                  </div>
                  <h3 className="text-2xl font-display font-bold text-primary mb-4 leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-muted font-sans text-xs leading-relaxed mb-8">
                    {project.description}
                  </p>

                  <div className="mt-auto pt-6 border-t border-border/50 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="text-[8px] font-mono font-bold text-primary/60 uppercase">
                          • {tag}
                        </span>
                      ))}
                    </div>
                    <a 
                      href={project.href} 
                      className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-primary"
                    >
                      <ArrowUpRight size={18} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Swipe Indicator */}
          <div className="mt-4 flex items-center justify-center gap-3 md:hidden">
            <span className="text-[10px] font-mono font-bold text-muted/40 uppercase tracking-[0.2em]">Swipe to explore</span>
            <div className="flex gap-1.5">
              {projects.map((_, i) => (
                <div key={i} className="w-1 h-1 rounded-full bg-primary/10" />
              ))}
            </div>
          </div>
        </div>
        
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .scroll-snap-x { scroll-snap-type: x mandatory; }
        .scroll-snap-align-start { scroll-snap-align: start; }
      `}} />
    </section>
  );
};
