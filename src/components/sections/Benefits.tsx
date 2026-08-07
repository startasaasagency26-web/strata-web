import { motion } from 'framer-motion';

const benefits = [
  { num: '01', title: 'EVERY LEAD CAPTURED', desc: 'No inbound enquiry falls through the cracks regardless of whether it arrives via landing page, WhatsApp, call, or ad form.' },
  { num: '02', title: 'EVERY ENQUIRY FOLLOWED UP', desc: 'Automated WhatsApp and email communication sequences ensure zero leads go cold waiting for a manual response.' },
  { num: '03', title: 'EVERY OPPORTUNITY VISIBLE', desc: 'Clear pipeline visibility allows management to see exactly where leads sit, who owns them, and where deals get stuck.' },
  { num: '04', title: 'AUTOMATED WHERE SMART', desc: 'Repetitive intake, scoring, reminders, and task handoffs are automated so staff focus strictly on high-value closing.' },
  { num: '05', title: 'ONE CONNECTED SYSTEM', desc: 'Replaces scattered spreadsheets and messaging groups with a single infrastructure connecting marketing directly to sales.' },
  { num: '06', title: 'CONTINUOUS OPTIMIZATION', desc: 'Traffic quality, conversion rates, and pipeline speed are measured and continuously improved based on live operational data.' },
];

export const Benefits = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-background border-y border-border/50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row gap-12 md:gap-24 mb-16">
          <h2 className="text-4xl md:text-6xl font-display font-bold leading-[0.9] tracking-tighter text-primary max-w-md uppercase">
            Built for commercial outcomes.
          </h2>
          <div className="flex-1 max-w-lg border-l border-primary/20 pl-6 md:pl-12">
            <p className="text-base font-sans text-primary mb-6 leading-relaxed">
              Technical capabilities mean nothing if they don't produce clear business results. Strata measures success by captured demand, pipeline velocity, and revenue conversion.
            </p>
            <p className="text-sm font-mono tracking-widest text-muted uppercase">
              The Strata Standard
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
                <h3 className="text-base md:text-lg font-mono font-bold tracking-wider text-primary">{benefit.title}</h3>
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
