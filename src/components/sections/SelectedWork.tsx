import { GlassCard } from '../ui/GlassCard';
import { ArrowUpRight } from 'lucide-react';

const projects = [
  {
    title: "Luxury Service Website",
    category: "Web Design & Development",
    metric: "+140% Conversion Rate",
    description: "A premium booking experience with cinematic animations and seamless user flow.",
    color: "from-blue-500/20 to-transparent"
  },
  {
    title: "AI Agency Landing Page",
    category: "Brand & Front-end",
    metric: "0.8s Load Time",
    description: "Dark mode SaaS interface featuring interactive product demos and WebGL elements.",
    color: "from-purple-500/20 to-transparent"
  },
  {
    title: "Business Growth Dashboard",
    category: "Web Application",
    metric: "10k+ Active Users",
    description: "A complex analytics dashboard simplified through intuitive glassmorphism UI.",
    color: "from-indigo-500/20 to-transparent"
  }
];

export const SelectedWork = () => {
  return (
    <section id="work" className="py-24 md:py-32 relative">
      <div className="container mx-auto px-6 md:px-12">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">Selected Work</h2>
            <p className="text-muted text-lg">
              We don't just build websites; we engineer digital experiences that drive tangible business growth.
            </p>
          </div>
          <button className="inline-flex items-center gap-2 text-white hover:text-primary transition-colors font-medium pb-2 border-b border-white/20 hover:border-primary">
            View All Projects <ArrowUpRight size={18} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, idx) => (
            <GlassCard key={idx} interactive className="group flex flex-col h-full p-0 overflow-hidden">
              {/* Mockup Image Area */}
              <div className={`h-64 w-full bg-gradient-to-b ${project.color} border-b border-white/5 relative overflow-hidden flex items-center justify-center`}>
                <div className="absolute inset-x-8 -bottom-10 top-12 bg-black/80 rounded-t-xl border-x border-t border-white/10 shadow-2xl backdrop-blur-md overflow-hidden">
                  <div className="h-6 w-full border-b border-white/10 bg-white/5 flex items-center px-3 gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-white/20" />
                    <div className="w-2 h-2 rounded-full bg-white/20" />
                    <div className="w-2 h-2 rounded-full bg-white/20" />
                  </div>
                  <div className="p-4 grid grid-cols-2 gap-3 opacity-50 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="h-20 bg-white/5 rounded" />
                    <div className="h-20 bg-white/5 rounded" />
                    <div className="h-10 col-span-2 bg-white/5 rounded" />
                  </div>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6 flex-grow flex flex-col">
                <div className="text-xs font-medium text-primary mb-3 tracking-wider uppercase">{project.category}</div>
                <h3 className="text-xl font-serif text-white mb-3 group-hover:text-primary transition-colors">{project.title}</h3>
                <p className="text-muted text-sm leading-relaxed mb-6 flex-grow">
                  {project.description}
                </p>
                
                <div className="inline-flex items-center justify-between w-full pt-4 border-t border-white/5">
                  <span className="text-sm font-mono text-white/80">{project.metric}</span>
                  <ArrowUpRight className="text-muted group-hover:text-white transition-colors" size={18} />
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
        
      </div>
    </section>
  );
};
