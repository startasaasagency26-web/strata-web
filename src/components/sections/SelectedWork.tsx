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
    type: "jarmor"
  },
  {
    title: "THUNDERFIX SERVICE WEBSITE",
    category: "SERVICE BUSINESS WEBSITE",
    detail: "BRANCH FLOW + ENQUIRY SYSTEM",
    description: "A repair business website built around trust, service clarity, branch discovery, Google/Waze navigation, and WhatsApp-led customer enquiries.",
    mobileImage: "/work/thunderfix-mobile.png",
    imageAlt: "Thunderfix mobile service website preview",
    href: "https://thunderfix.online",
    type: "thunderfix"
  },
  {
    title: "ONE MOBILE ROS APP",
    category: "DIGITAL GROWTH SYSTEM",
    detail: "OPERATIONS DASHBOARD + KPI TRACKING",
    description: "An internal repair operations system that turns jobs, revenue, technician performance, attribution, and pipeline visibility into a clean owner dashboard.",
    type: "ros"
  }
];

const JArmorMockup = ({ image }: { image?: string }) => (
  <div className="relative w-full h-full flex items-center justify-center">
    {/* Floating Product Card */}
    <div className="absolute top-[15%] -right-[5%] w-[45%] aspect-[3/4] bg-white rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.1)] border border-border/10 p-3 flex flex-col gap-2 transition-transform duration-700 group-hover:translate-x-2 group-hover:-translate-y-2 z-0">
      <div className="w-full aspect-square bg-[#0A0A0A] rounded-lg overflow-hidden flex items-center justify-center p-2">
        <div className="w-full h-full border border-primary/20 rounded flex items-center justify-center">
          <div className="text-[6px] font-mono text-primary/40 tracking-tighter uppercase">Product Detail</div>
        </div>
      </div>
      <div className="w-3/4 h-1.5 bg-primary/10 rounded" />
      <div className="w-1/2 h-1 bg-primary/5 rounded" />
    </div>

    {/* Phone Frame */}
    <div className="relative w-[155px] md:w-[175px] aspect-[9/19.5] bg-[#0A0A0A] rounded-[32px] border-[6px] border-[#111111] shadow-2xl overflow-hidden z-10 transition-transform duration-700 group-hover:-translate-y-2">
      <div className="absolute inset-0 bg-white">
        {image && <img src={image} alt="" className="w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 transition-opacity" />}
      </div>
      <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-12 h-3 bg-black rounded-full opacity-40 z-20" />
    </div>

    {/* Brand Tag */}
    <div className="absolute bottom-[20%] -left-[5%] bg-[#0A0A0A] text-white px-3 py-1.5 rounded-lg shadow-xl flex items-center gap-2 border border-white/10 transition-transform duration-700 group-hover:-translate-x-2 group-hover:translate-y-2 z-20">
      <div className="w-2 h-2 rounded-full bg-primary" />
      <span className="text-[10px] font-mono font-bold tracking-widest uppercase">J-ARMOR</span>
    </div>
  </div>
);

const ThunderfixMockup = ({ image }: { image?: string }) => (
  <div className="relative w-full h-full flex items-center justify-center">
    {/* Branch Card */}
    <div className="absolute top-[20%] -left-[10%] w-[50%] bg-white rounded-xl shadow-[0_15px_35px_rgba(0,0,0,0.08)] border border-border/20 p-3 flex flex-col gap-2.5 transition-transform duration-700 group-hover:-translate-x-3 group-hover:-translate-y-1 z-20">
      <div className="flex justify-between items-start">
        <div className="w-8 h-1.5 bg-primary/20 rounded" />
        <div className="w-3 h-3 rounded-full bg-green-500/20 flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
        </div>
      </div>
      <div className="w-full h-1 bg-primary/5 rounded" />
      <div className="flex gap-1.5">
        <div className="flex-grow h-4 bg-primary/5 rounded flex items-center justify-center">
          <div className="w-full h-full bg-primary/5 rounded" />
        </div>
        <div className="w-8 h-4 bg-primary rounded flex items-center justify-center">
          <div className="w-4 h-0.5 bg-white/20 rounded" />
        </div>
      </div>
    </div>

    {/* Phone Frame */}
    <div className="relative w-[155px] md:w-[175px] aspect-[9/19.5] bg-[#FDFDFD] rounded-[32px] border-[6px] border-[#F0F0F0] shadow-2xl overflow-hidden z-10 transition-transform duration-700 group-hover:-translate-y-2">
      <div className="absolute inset-0 bg-white">
        {image && <img src={image} alt="" className="w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 transition-opacity" />}
      </div>
      <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-12 h-3 bg-black rounded-full opacity-10 z-20" />
    </div>

    {/* Action Pill */}
    <div className="absolute bottom-[25%] -right-[5%] bg-white text-primary px-4 py-2 rounded-full shadow-lg flex items-center gap-2 border border-border/20 transition-transform duration-700 group-hover:translate-x-2 group-hover:translate-y-2 z-20">
      <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
      <span className="text-[10px] font-mono font-bold tracking-widest uppercase">ENQUIRY LIVE</span>
    </div>
  </div>
);

const ROSMockup = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    {/* Dashboard Base */}
    <div className="relative w-[180px] md:w-[200px] aspect-[9/16] bg-[#FDFDFD] rounded-2xl shadow-2xl border border-border/10 overflow-hidden transition-transform duration-700 group-hover:-translate-y-2 flex flex-col p-3 gap-3">
      {/* Header */}
      <div className="flex justify-between items-center shrink-0">
        <div className="w-16 h-2 bg-primary/10 rounded" />
        <div className="w-6 h-6 rounded-lg bg-primary/5" />
      </div>
      
      {/* KPI Blocks */}
      <div className="grid grid-cols-2 gap-2 shrink-0">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="bg-surface rounded-lg border border-border/10 p-2.5 space-y-1.5">
            <div className="w-full h-1 bg-primary/5 rounded" />
            <div className="w-2/3 h-2.5 bg-primary/20 rounded" />
          </div>
        ))}
      </div>

      {/* Chart Block */}
      <div className="bg-surface rounded-xl border border-border/10 p-3 flex flex-col gap-3 flex-grow min-h-0">
        <div className="w-14 h-1 bg-primary/10 rounded" />
        <div className="flex-grow flex items-end gap-1 pt-1 min-h-0 pb-1">
          {[40, 60, 45, 80, 55, 70, 50, 75].map((h, i) => (
            <div key={i} style={{ height: `${h}%` }} className="flex-grow bg-primary/10 rounded-t-[2px] transition-all duration-700 group-hover:bg-primary/20" />
          ))}
        </div>
      </div>

      {/* List Block */}
      <div className="space-y-2 shrink-0">
        {[1, 2].map(i => (
          <div key={i} className="flex items-center gap-2 bg-surface p-2 rounded-lg border border-border/5">
            <div className="w-6 h-6 rounded bg-primary/5" />
            <div className="flex-grow space-y-1">
              <div className="w-full h-1 bg-primary/10 rounded" />
              <div className="w-1/2 h-1 bg-primary/5 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Floating KPI Tag */}
    <div className="absolute top-[10%] -left-[10%] bg-[#0A0A0A] text-white px-3 py-2 rounded-lg shadow-xl flex flex-col gap-1 border border-white/10 transition-transform duration-700 group-hover:-translate-x-2 group-hover:-translate-y-2 z-20">
      <span className="text-[8px] font-mono text-white/40 uppercase tracking-tighter">REVENUE TRACKER</span>
      <span className="text-[12px] font-mono font-bold tracking-tight text-primary uppercase">ACTIVE</span>
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
              {/* Premium Art-Directed Preview Composition */}
              <div className="h-[300px] md:h-[340px] w-full bg-[#E9E8E4] rounded-[18px] relative overflow-hidden flex items-center justify-center p-8 border border-border/30">
                {project.type === 'jarmor' && <JArmorMockup image={project.mobileImage} />}
                {project.type === 'thunderfix' && <ThunderfixMockup image={project.mobileImage} />}
                {project.type === 'ros' && <ROSMockup />}
                
                {/* Subtle Ground Shadow */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-32 h-2 bg-black/5 blur-2xl rounded-full" />
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
                  <span className="text-[10px] font-mono font-bold tracking-widest text-primary/60 group-hover:text-primary transition-colors uppercase truncate max-w-[180px]">
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
