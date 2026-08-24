import { motion } from 'framer-motion';
import { CheckCircle2, Users, ShoppingBag, Wrench, Briefcase, Cpu, Store } from 'lucide-react';

const icpCriteria = [
  'Businesses that already generate active enquiries or traffic',
  'Operations relying heavily on WhatsApp, calls, forms, or social leads',
  'Companies with active sales, intake, or customer service staff',
  'Teams manually managing follow-ups across disconnected tools',
  'Operators spending money/resources generating demand without full pipeline visibility',
  'Growing businesses ready for automation without tearing down their operation',
];

const industries = [
  {
    icon: <Users size={24} />,
    title: 'Service Businesses',
    desc: 'Operators needing structured lead capture, CRM deal stages, and automated WhatsApp follow-up that turns service enquiries into booked clients.',
    tags: ['Lead Capture', 'CRM Stages'],
  },
  {
    icon: <Wrench size={24} />,
    title: 'Repair & Technical',
    desc: 'Branch networks and technical services relying on location discovery, instant WhatsApp booking flows, and job-tracking visibility.',
    tags: ['Local Demand', 'Booked Jobs'],
  },
  {
    icon: <Briefcase size={24} />,
    title: 'Professional Services',
    desc: 'Consultants and advisory firms requiring intake qualification, calendar routing, and automated follow-up before sales calls.',
    tags: ['Intake Flow', 'AI Qualify'],
  },
  {
    icon: <Store size={24} />,
    title: 'Retail & Multi-Location',
    desc: 'Retail brands connecting online ad campaigns, offer landing pages, and customer messaging into centralized lead management.',
    tags: ['Offer Landing', 'Multi-Channel'],
  },
  {
    icon: <ShoppingBag size={24} />,
    title: 'Ecommerce & Brands',
    desc: 'Product brands combining high-converting store landers, post-purchase communication, and automated customer re-engagement.',
    tags: ['Conversion Assets', 'Re-engagement'],
  },
  {
    icon: <Cpu size={24} />,
    title: 'Operations-Heavy',
    desc: 'Businesses with multi-stage handoffs needing staff accountability, status triggers, and executive reporting visibility.',
    tags: ['Team Workflows', 'Pipeline Views'],
  },
];

export const Industries = () => {
  return (
    <section id="industries" className="py-24 md:py-32 bg-surface border-b border-border/50 scroll-mt-[100px]">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16 md:mb-20">
          <div className="max-w-3xl">
            <p className="text-[10px] font-mono tracking-[0.3em] text-muted uppercase mb-4">TARGET PARTNERS</p>
            <h2 className="text-4xl md:text-6xl font-display font-bold leading-none tracking-tight text-text uppercase">
              Who Strata Is Built For.
            </h2>
          </div>
          <p className="text-xs font-mono text-muted max-w-sm uppercase tracking-widest leading-relaxed">
            Strata partners with growing businesses that need integrated revenue infrastructure rather than one-off agency services.
          </p>
        </div>

        {/* ICP Criteria Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 bg-surface border border-border/70 rounded-[32px] p-8 md:p-12 shadow-[0_10px_40px_rgb(var(--scrim)/0.04)] max-w-5xl mx-auto"
        >
          <h3 className="font-mono text-xs font-bold tracking-[0.24em] text-muted uppercase mb-8">
            Ideal Client Characteristics (ICP)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {icpCriteria.map((item) => (
              <div key={item} className="flex items-start gap-3.5">
                <CheckCircle2 size={18} className="text-text mt-0.5 shrink-0" />
                <span className="font-sans text-sm md:text-base font-medium text-text/80 leading-snug">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Industry Application Examples */}
        <div className="mb-8">
          <p className="font-mono text-[10px] font-bold tracking-[0.28em] text-muted uppercase text-center mb-10">
            Proven System Applications
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {industries.map((industry, idx) => (
              <motion.div
                key={industry.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="group border border-gold/5 bg-surface p-8 rounded-[28px] hover:shadow-xl transition-all duration-500 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="mb-6 w-12 h-12 rounded-2xl bg-gold/5 flex items-center justify-center text-text group-hover:bg-gold group-hover:text-void transition-all duration-300">
                    {industry.icon}
                  </div>
                  <h4 className="text-xl font-display font-bold text-text mb-3 tracking-tight uppercase">{industry.title}</h4>
                  <p className="text-text/60 font-sans text-sm leading-relaxed mb-6">
                    {industry.desc}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {industry.tags.map((tag) => (
                    <span key={tag} className="text-[9px] font-mono font-bold tracking-widest uppercase px-3 py-1 bg-gold/[0.03] border border-gold/5 rounded-full text-text/50">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
