import { motion } from 'framer-motion';

const benefits = [
  { num: '01', title: 'DEMAND CREATION', desc: 'Short-form content and paid media create consistent attention instead of relying on random referrals.' },
  { num: '02', title: 'LEAD CAPTURE', desc: 'Landing pages and forms turn attention into structured enquiries.' },
  { num: '03', title: 'CRM CONTROL', desc: 'Leads stop disappearing into WhatsApp because every enquiry enters a clear pipeline.' },
  { num: '04', title: 'AUTOMATED FOLLOW-UP', desc: 'Prospects are followed up without depending entirely on staff memory or manual chasing.' },
  { num: '05', title: 'SALES VISIBILITY', desc: 'Owners can see where leads are stuck, what needs action, and where revenue is leaking.' },
  { num: '06', title: 'OPTIMIZATION LOOP', desc: 'Media, funnel, CRM, and follow-up improve based on real campaign and lead-flow data.' },
];

export const Benefits = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-background border-y border-border/50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row gap-12 md:gap-24 mb-16">
          <h2 className="text-4xl md:text-6xl font-display font-bold leading-[0.9] tracking-tighter text-primary max-w-md uppercase">
            Why the system works.
          </h2>
          <div className="flex-1 max-w-lg border-l border-primary/20 pl-6 md:pl-12">
            <p className="text-base font-sans text-primary mb-6 leading-relaxed">
              Demand creation, lead capture, CRM control, and follow-up cannot operate as disconnected pieces. Strata connects them into a system owners can see, run, and improve.
            </p>
            <p className="text-sm font-mono tracking-widest text-muted uppercase">
              The Strata Operating Layer
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 border-t border-border/50 pt-12">
          {benefits.map((benefit, idx) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group flex flex-col"
            >
              <div className="flex items-end justify-between border-b border-border/50 pb-4 mb-4">
                <h3 className="text-lg font-mono font-bold tracking-widest text-primary">{benefit.title}</h3>
                <span className="text-sm font-mono text-muted">{benefit.num}</span>
              </div>
              <p className="text-muted font-sans text-sm leading-relaxed">
                {benefit.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
