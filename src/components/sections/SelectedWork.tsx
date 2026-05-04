import { ArrowUpRight } from 'lucide-react';

const projects = [
  {
    title: "Brand Website",
    category: "Web Design & Development",
    metric: "+140% Conversion Rate",
    description: "A premium booking experience with cinematic animations and seamless user flow."
  },
  {
    title: "Service Business Website",
    category: "Brand & Front-end",
    metric: "0.8s Load Time",
    description: "High-performance interface featuring interactive product demos and structural layouts."
  },
  {
    title: "Digital Growth System",
    category: "Web Application",
    metric: "10k+ Active Users",
    description: "A complex analytics dashboard simplified through intuitive, clean UI."
  }
];

export const SelectedWork = () => {
  return (
    <section id="work" className="py-24 md:py-32 relative bg-background border-b border-border/50">
      <div className="container mx-auto px-6 md:px-12">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-5xl md:text-6xl font-display font-bold leading-none tracking-tight text-primary mb-6">SELECTED WORK</h2>
            <p className="text-muted font-sans text-sm md:text-base max-w-md leading-relaxed">
              We don't just build websites; we engineer digital experiences that drive tangible business growth.
            </p>
          </div>
          <button className="inline-flex items-center gap-2 font-mono text-xs font-bold tracking-widest text-primary hover:text-primary/70 transition-colors border-b border-primary pb-1 uppercase">
            View All Projects <ArrowUpRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <div key={idx} className="group flex flex-col h-full bg-surface border border-border/50 p-2 rounded-[24px] hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
              {/* Mockup Image Area - Clean monochrome styling */}
              <div className="h-64 md:h-80 w-full bg-[#E5E5E2] rounded-[16px] relative overflow-hidden flex items-center justify-center border border-border/50">
                <div className="absolute inset-x-8 -bottom-10 top-16 bg-white rounded-t-xl border-x border-t border-border shadow-md overflow-hidden flex flex-col">
                  <div className="h-6 w-full border-b border-border bg-surface flex items-center px-3 gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-border" />
                    <div className="w-2 h-2 rounded-full bg-border" />
                    <div className="w-2 h-2 rounded-full bg-border" />
                  </div>
                  <div className="p-4 grid grid-cols-2 gap-3 opacity-30 group-hover:opacity-100 transition-opacity duration-500 flex-grow bg-white">
                    <div className="h-24 bg-surface rounded border border-border/30" />
                    <div className="h-24 bg-surface rounded border border-border/30" />
                    <div className="h-16 col-span-2 bg-surface rounded border border-border/30" />
                  </div>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6 md:p-8 flex-grow flex flex-col bg-white rounded-[16px] mt-2 border border-border/50">
                <div className="text-[10px] font-mono font-bold text-muted mb-4 tracking-widest uppercase">{project.category}</div>
                <h3 className="text-2xl font-display font-bold text-primary mb-3 group-hover:text-primary/80 transition-colors">{project.title}</h3>
                <p className="text-muted font-sans text-sm leading-relaxed mb-8 flex-grow">
                  {project.description}
                </p>
                
                <div className="inline-flex items-center justify-between w-full pt-6 border-t border-border/50">
                  <span className="text-xs font-mono font-bold tracking-widest text-primary">{project.metric}</span>
                  <ArrowUpRight className="text-muted group-hover:text-primary transition-colors" size={18} />
                </div>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
};
