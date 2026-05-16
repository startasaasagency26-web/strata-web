import { motion } from 'framer-motion';
import { Users, ShoppingBag, Wrench, Briefcase, Cpu, Store } from 'lucide-react';

const industries = [
  {
    icon: <Users size={24} />,
    title: 'Service Businesses',
    desc: 'Built for operators who need clearer enquiry capture, stronger trust signals, CRM structure, and follow-up that turns service interest into pipeline.',
    tags: ['Lead Capture', 'Follow-Up'],
  },
  {
    icon: <Wrench size={24} />,
    title: 'Repair & Technical',
    desc: 'Built for teams that depend on local visibility, trust, booking flow, and a follow-up system that turns repair interest into scheduled jobs.',
    tags: ['Local Demand', 'Booked Jobs'],
  },
  {
    icon: <Briefcase size={24} />,
    title: 'Professional Services',
    desc: 'Built for consultants and firms that need authority-building content, structured intake, CRM control, and a more reliable path from enquiry to call.',
    tags: ['Authority', 'Intake Flow'],
  },
  {
    icon: <Store size={24} />,
    title: 'Local Retail',
    desc: 'Built for retailers that need content, paid media, offer pages, and enquiry flows that connect foot traffic, online attention, and customer follow-up.',
    tags: ['Local Reach', 'Offer Flow'],
  },
  {
    icon: <ShoppingBag size={24} />,
    title: 'Ecommerce & Brands',
    desc: 'Built for product-led brands that need demand creation, conversion pages, campaign tracking, and a clearer flow from product interest to purchase.',
    tags: ['Conversion Flow', 'Campaign Tracking'],
  },
  {
    icon: <Cpu size={24} />,
    title: 'Operations-Heavy',
    desc: 'Built for businesses with complex handoffs that need CRM stages, task flow, reporting visibility, and automation that keeps teams aligned.',
    tags: ['CRM Stages', 'Team Flow'],
  },
];

export const Industries = () => {
  return (
    <section id="industries" className="py-24 md:py-32 bg-[#fcfbf9] border-b border-border/50 scroll-mt-[120px]">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16 md:mb-24">
          <div className="max-w-3xl">
            <p className="text-xs font-mono tracking-widest text-muted uppercase mb-4">Core Focus</p>
            <h2 className="text-5xl md:text-6xl font-display font-bold leading-none tracking-tight text-primary uppercase">
              Built for service businesses that depend on leads, trust, and follow-up.
            </h2>
          </div>
          <p className="text-sm font-mono text-muted max-w-sm uppercase tracking-widest leading-relaxed">
            Growth systems for operators who need demand captured, organized, and followed through.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {industries.map((industry, idx) => (
            <motion.div
              key={industry.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group border border-primary/5 bg-white p-8 md:p-10 rounded-[32px] hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
            >
              <div className="mb-8 w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                {industry.icon}
              </div>
              <h3 className="text-xl font-display font-bold text-primary mb-4 tracking-tight uppercase">{industry.title}</h3>
              <p className="text-primary/60 font-sans text-sm leading-relaxed mb-8">
                {industry.desc}
              </p>
              <div className="flex flex-wrap gap-2">
                {industry.tags.map((tag) => (
                  <span key={tag} className="text-[9px] font-mono font-bold tracking-widest uppercase px-3 py-1 bg-primary/[0.03] border border-primary/5 rounded-full text-primary/40">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
