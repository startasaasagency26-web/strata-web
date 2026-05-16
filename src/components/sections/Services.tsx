import { ArrowRight, ChartNoAxesCombined, Clapperboard, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CONTACT } from '../../config/contact';
import { Button } from '../ui/liquid-glass-button';

const systems = [
  {
    icon: <ChartNoAxesCombined size={26} className="text-primary" />,
    title: 'Revenue Infrastructure',
    subtitle: 'Capture and convert demand.',
    description:
      'For businesses that already have attention, referrals, ads, or enquiries - but lose leads because the capture and follow-up system is weak.',
    bullets: [
      'Landing page / sales page',
      'Lead capture form',
      'CRM pipeline setup',
      'WhatsApp / email follow-up automation',
      'Staff task flow',
      'Analytics and handover',
    ],
    cta: 'Diagnose My Revenue System',
  },
  {
    icon: <Clapperboard size={26} className="text-primary" />,
    title: 'Growth Media System',
    subtitle: 'Create and feed demand.',
    description:
      'For businesses that need consistent content, paid media, and a repeatable system for creating attention.',
    bullets: [
      'Short-form video assets',
      'Hooks, scripts, and captions',
      'Organic content system',
      'Paid ad creatives',
      'Meta / TikTok campaign management',
      'Monthly media calendar',
      'Performance reporting',
    ],
    cta: 'Build My Media System',
  },
];

export const Services = () => {
  return (
    <section id="services" className="py-24 md:py-32 border-t border-border/50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16 md:mb-24">
          <div className="max-w-2xl">
            <p className="text-[10px] font-mono tracking-[0.3em] text-muted uppercase mb-4">STRATA SYSTEMS</p>
            <h2 className="text-5xl md:text-6xl font-black leading-none tracking-[-0.04em] text-primary">
              Two systems. <br /> One growth engine.
            </h2>
          </div>
          <p className="text-[11px] font-mono text-muted max-w-md uppercase leading-relaxed">
            Growth does not come from disconnected content, ads, websites, and WhatsApp messages. Strata connects the media layer and revenue layer into one operating system.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {systems.map((system, idx) => (
            <motion.article
              key={system.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="bento-card group flex min-h-[520px] flex-col justify-between p-8 md:p-10"
            >
              <div>
                <div className="mb-8 w-14 h-14 rounded-2xl border border-border flex items-center justify-center bg-background group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  <div className="group-hover:text-white transition-colors duration-500">
                    {system.icon}
                  </div>
                </div>
                <p className="mb-3 text-[10px] font-mono font-bold tracking-[0.28em] text-muted uppercase">
                  {system.subtitle}
                </p>
                <h3 className="text-3xl md:text-4xl font-black text-primary mb-5 tracking-[-0.04em] uppercase">
                  {system.title}
                </h3>
                <p className="text-muted text-sm md:text-base font-sans leading-relaxed mb-8 max-w-xl">
                  {system.description}
                </p>
                <ul className="grid gap-3 mb-10">
                  {system.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3 text-sm font-sans text-primary/70">
                      <Check size={15} className="mt-0.5 shrink-0 text-primary" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Button
                asChild
                variant={idx === 0 ? 'glassStrong' : 'glass'}
                className="w-fit h-auto rounded-full px-6 py-4 font-mono text-[10px] font-bold uppercase tracking-[0.18em]"
              >
                <Link to={CONTACT.requestDemoPath} className="flex items-center gap-2">
                  {system.cta}
                  <ArrowRight size={13} />
                </Link>
              </Button>
            </motion.article>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-14 max-w-3xl text-center text-2xl md:text-4xl font-black tracking-[-0.04em] text-primary"
        >
          Media creates demand. Infrastructure captures and converts it.
        </motion.p>
      </div>
    </section>
  );
};
