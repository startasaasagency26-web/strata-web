import { ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CONTACT } from '../../config/contact';
import { Button } from '../ui/liquid-glass-button';

const offers = [
  {
    title: 'Revenue Infrastructure',
    copy: 'For businesses that already have demand but lose leads through weak landing pages, poor follow-up, or no CRM structure.',
    includes: [
      'Landing page / sales page',
      'Lead capture',
      'CRM pipeline',
      'Follow-up automation',
      'Staff task flow',
      'Analytics and handover',
    ],
    pricing: 'Scoped after strategy call',
    cta: 'Diagnose My Revenue System',
    featured: true,
  },
  {
    title: 'Growth Media System',
    copy: 'For businesses that need consistent content, paid media, and a repeatable engine for demand creation.',
    includes: [
      'Short-form video assets',
      'Scripts, hooks, captions',
      'Organic content system',
      'Paid ad creatives',
      'Meta / TikTok campaign management',
      'Reporting and optimization',
    ],
    pricing: 'Monthly execution plan',
    cta: 'Build My Media System',
    featured: false,
  },
];

const fullSystemIncludes = [
  'Revenue Infrastructure',
  'Growth Media System',
  'System Care setup',
  'Content + ads',
  'CRM + automation',
  'Strategy and onboarding',
];

export const Pricing = () => {
  return (
    <section id="products" className="relative border-b border-border/50 bg-surface py-24 md:py-32 scroll-mt-[120px]">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center max-w-4xl mx-auto mb-16 md:mb-24">
          <p className="text-xs font-mono tracking-widest text-muted uppercase mb-4">SYSTEMS OFFER</p>
          <h2 className="text-4xl md:text-6xl font-display font-bold leading-none tracking-tight text-primary mb-6">
            Choose the system your business needs next.
          </h2>
          <p className="text-muted font-sans text-base md:text-lg leading-relaxed">
            Start with the leak. If demand is weak, build the media system. If follow-up and conversion are weak, build the revenue infrastructure. If both are weak, install the full system.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-stretch max-w-6xl mx-auto">
          {offers.map((offer) => (
            <article
              key={offer.title}
              className={`flex h-full flex-col overflow-hidden rounded-[28px] border bg-white transition-all duration-500 ${
                offer.featured
                  ? 'border-[#111111] border-2 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)]'
                  : 'border-border/50 shadow-sm hover:border-primary/30 hover:shadow-2xl'
              }`}
            >
              <div className="border-b border-border/50 bg-surface/50 p-8 md:p-10">
                <p className="mb-4 text-[10px] font-mono font-bold uppercase tracking-[0.28em] text-muted">
                  {offer.pricing}
                </p>
                <h3 className="mb-5 text-3xl md:text-4xl font-display font-bold tracking-tight text-primary">
                  {offer.title}
                </h3>
                <p className="font-sans text-sm md:text-base leading-relaxed text-muted">
                  {offer.copy}
                </p>
              </div>

              <div className="flex flex-grow flex-col p-8 md:p-10">
                <ul className="mb-10 grid gap-3">
                  {offer.includes.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="mt-0.5 shrink-0 text-primary" size={15} />
                      <span className="text-sm font-sans text-muted leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  variant={offer.featured ? 'glassStrong' : 'glass'}
                  className="mt-auto w-full h-auto rounded-full px-6 py-5 font-mono text-[10px] font-bold uppercase tracking-[0.18em]"
                >
                  <Link to={CONTACT.requestDemoPath} className="flex items-center justify-center gap-2">
                    {offer.cta}
                    <ArrowRight size={13} />
                  </Link>
                </Button>
              </div>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-8 max-w-6xl overflow-hidden rounded-[32px] border border-primary bg-primary text-white shadow-[0_28px_80px_rgba(0,0,0,0.20)]">
          <div className="grid grid-cols-1 gap-8 p-8 md:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:p-12">
            <div>
              <p className="mb-4 text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-white/45">
                Full System Install
              </p>
              <h3 className="mb-6 text-3xl md:text-5xl font-black leading-none tracking-[-0.04em] text-white">
                For businesses ready to connect media, funnel, CRM, automation, and follow-up into one growth engine.
              </h3>
              <p className="font-mono text-xs font-bold uppercase tracking-widest text-white/55">
                Custom proposal based on scope
              </p>
            </div>

            <div className="flex flex-col justify-between gap-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {fullSystemIncludes.map((feature) => (
                  <div key={feature} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    <Check className="mt-0.5 shrink-0 text-white" size={15} />
                    <span className="text-sm font-sans leading-relaxed text-white/70">{feature}</span>
                  </div>
                ))}
              </div>

              <Button
                asChild
                variant="glassOnDark"
                className="w-full sm:w-fit h-auto rounded-full px-8 py-5 font-mono text-[10px] font-bold uppercase tracking-[0.18em]"
              >
                <Link to={CONTACT.requestDemoPath} className="flex items-center justify-center gap-2">
                  Book Full System Strategy Call
                  <ArrowRight size={13} />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-6xl rounded-[24px] border border-border/50 bg-white p-6 md:flex md:items-center md:justify-between md:gap-8 md:p-8">
          <div>
            <p className="mb-2 text-xs font-mono font-bold uppercase tracking-widest text-primary">
              Need a simpler website build?
            </p>
            <p className="max-w-2xl font-sans text-sm leading-relaxed text-muted">
              For businesses that only need a clean digital foundation, Strata also offers website build options.
            </p>
          </div>
          <Button
            asChild
            variant="glass"
            className="mt-6 w-full h-auto rounded-full px-6 py-4 font-mono text-[10px] font-bold uppercase tracking-[0.18em] md:mt-0 md:w-auto"
          >
            <Link to={CONTACT.requestDemoPath}>
              Ask About Website Build Options
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
