import { ArrowRight, Check } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { CONTACT } from '../config/contact';
import { WhatsAppChoice } from '../components/WhatsAppChoice';
import { cn } from '../lib/utils';
import { Button } from '../components/ui/liquid-glass-button';
import { Seo } from '../components/Seo';

const systemFlowSteps = [
  'Audit Revenue Leaks',
  'Map Customer Journey',
  'Design Sales Process',
  'Deploy AI Employees',
  'Train the Team',
  'Review Outcomes',
];

const coreDeliverables = [
  'Revenue-process audit and implementation roadmap',
  'Conversion-focused landing page or offer-flow build',
  'Lead-capture and CRM configuration for the agreed process',
  'Approved WhatsApp or email follow-up workflow setup',
  'Staff ownership, handoff and notification rules',
  'Booking and appointment-flow configuration where required',
  'Reporting setup with agreed commercial definitions',
  'Implementation documentation and team handover',
];

const pricingFactors = [
  {
    num: '01',
    title: 'Average Customer Value',
    desc: 'Higher-value customers generate greater commercial return, supporting higher acquisition and infrastructure investment.',
  },
  {
    num: '02',
    title: 'Gross Margin',
    desc: 'The system architecture and acquisition strategy must make clean commercial sense relative to your margins.',
  },
  {
    num: '03',
    title: 'Lead Volume',
    desc: 'Higher enquiry volume requires expanded automation, lead routing rules, database capacity, and tracking infrastructure.',
  },
  {
    num: '04',
    title: 'Sales Capacity',
    desc: 'System scope depends on your team\'s current bandwidth to receive, respond to, and convert active inbound demand.',
  },
  {
    num: '05',
    title: 'Complexity & Integrations',
    desc: 'Multiple locations, custom CRM workflows, staff roles, third-party software, or legacy integrations increase setup scope.',
  },
];

const expandedScopeReasons = [
  'Multiple branch or office locations',
  'Multiple offer funnels & audience segments',
  'High lead volume requiring custom routing',
  'Custom CRM architecture & team permissions',
  'Advanced third-party API integrations',
  'Complex multi-stage automation workflows',
  'Multiple sales or customer service teams',
  'High-ticket multi-step sales processes',
  'Custom executive reporting & dashboards',
  'Heavy legacy database & software integrations',
];

const packages = [
  {
    name: 'Foundation',
    tagline: 'One repetitive role, taken off your team.',
    setup: 'From RM 3,500',
    monthly: 'From RM 3,500 / mo',
    summary: 'For simpler or lower-volume operations with one clearly repetitive job function worth removing first.',
    includes: [
      'One AI Employee covering a single job function',
      'One department or workflow in scope',
      'Core channel and workflow configuration',
      'Your operating rules, limits and escalation points',
      'Reporting on the agreed outcome',
    ],
    featured: false,
  },
  {
    name: 'Growth',
    tagline: 'A complete AI Revenue Workforce.',
    setup: 'From RM 5,000',
    monthly: 'RM 5,000 / mo',
    summary: 'The primary engagement. One end-to-end revenue operation owned from first enquiry through to handoff to your closer.',
    includes: [
      'A complete department or end-to-end workflow',
      'Specialised AI Employees working together with defined handoffs',
      'Integrations across your existing tools where required',
      'Shared operating rules, approvals and permissions',
      'Owner dashboard, reporting and continuous optimisation',
    ],
    featured: true,
  },
  {
    name: 'Scale',
    tagline: 'Multiple workflows, multiple departments.',
    setup: 'From RM 7,500',
    monthly: 'From RM 7,500 / mo',
    summary: 'For operations spanning several departments, locations or teams, where breadth and governance drive the work.',
    includes: [
      'Several workflows or departments in scope',
      'A broader workforce coordinated across functions',
      'Higher-complexity integrations and routing',
      'Role-based permissions and approval limits',
      'Expanded reporting and operational support',
    ],
    featured: false,
  },
  {
    name: 'Enterprise',
    tagline: 'A workforce designed around your business.',
    setup: 'Custom',
    monthly: 'From RM 10,000 / mo',
    summary: 'For businesses whose scope, governance or rollout requirements exceed a standard engagement.',
    includes: [
      'Custom workforce size and design',
      'Bespoke integrations and data requirements',
      'Governance, permissions and audit requirements',
      'Phased rollout across teams or locations',
    ],
    featured: false,
  },
];

const quotingSteps = [
  {
    num: '01',
    title: 'QUALIFY THE BUSINESS',
    desc: 'We verify whether your offer, market, margins and sales capacity are commercially suitable for an AI workforce deployment.',
  },
  {
    num: '02',
    title: 'ASSESS ECONOMICS & COMPLEXITY',
    desc: 'We review customer value, lead volume, operational workflows, branch locations, and required integrations.',
  },
  {
    num: '03',
    title: 'QUOTE WITHIN APPROVED BAND',
    desc: 'Final implementation and monthly investment are proposed based on the required infrastructure and commercial opportunity.',
  },
];

const faqs = [
  {
    question: 'Is this a product I log into today?',
    answer: 'No. Strata Core, the platform this is built towards, is still in development and is not sold here. What you are buying is a scoped deployment: we configure and run the agreed workflow for your business, with reporting you can see. Some of that delivery is handled by our team behind the scenes while the platform matures. We would rather tell you that up front than oversell a dashboard.',
  },
  {
    question: 'What exactly is an AI workforce?',
    answer: 'AI Employees are configured to own specific, repetitive parts of a job - handling enquiries, qualifying, chasing follow-ups, keeping records straight. They run against your rules, limits and approval points, and a human stays in control of anything consequential. Strata scopes the work, configures the employees, integrates them with the tools you already use, and reports on the outcome.'
  },
  {
    question: 'Why does pricing vary?',
    answer: 'The work changes with lead volume, number of locations, staff roles, existing tools, integrations and the complexity of the revenue process. We quote the implementation and ongoing service around that real delivery scope.',
  },
  {
    question: 'Is ad spend included in the monthly fee?',
    answer: 'No. Ad spend is billed directly by Meta or TikTok to your business account. Strata\'s monthly fee covers only the campaign, operations, maintenance and improvement work agreed in your scope.',
  },
  {
    question: 'What is the difference between Growth and Scale?',
    answer: 'Growth (RM 5,000/mo) covers one complete workflow or department end to end - for most businesses that is the revenue operation. Scale (from RM 7,500/mo) is for several workflows or departments at once, multiple locations, larger teams, or heavier integration and governance requirements.',
  },
  {
    question: 'What happens during the AI Workforce Audit?',
    answer: 'We review how enquiries arrive, who owns each handoff, where follow-up fails, what customers are worth and which tools are already in place. You leave with a recommended scope, timeline and investment band - whether or not you go ahead.',
  },
];

export const Pricing = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative pt-32 pb-24 md:pt-40 md:pb-32 bg-background min-h-screen">
      <Seo
        title="AI Workforce Management | Strata Pricing"
        description="Strata audits where work repeats, designs the handoffs, deploys and governs the AI Employees that own it, and reports on the result. Pricing moves with customer value, volume, complexity, locations and integrations."
        path="/pricing"
      />
      
      {/* SECTION 1 — HERO */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 md:px-12 mb-20 md:mb-28">
        <div className="text-center max-w-4xl mx-auto">
          <motion.p
            initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] font-mono tracking-[0.3em] text-muted uppercase mb-4"
          >
            AI WORKFORCE MANAGEMENT
          </motion.p>
          <motion.h1
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : undefined, delay: shouldReduceMotion ? 0 : 0.1 }}
            className="text-4xl md:text-7xl font-display font-bold leading-none tracking-tight text-text mb-8 uppercase"
          >
            Put the repetitive work <br />
            <span className="text-text/70">on an AI workforce.</span>
          </motion.h1>
          <motion.p
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : undefined, delay: shouldReduceMotion ? 0 : 0.18 }}
            className="text-muted font-sans text-base md:text-xl leading-relaxed max-w-3xl mx-auto mb-10"
          >
            This is the work you can buy today. Strata audits where the work repeats, designs the handoffs, deploys and governs the AI Employees that own it, and reports on the result. Pricing moves with customer value, volume, complexity, locations and integrations.
          </motion.p>
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : undefined, delay: shouldReduceMotion ? 0 : 0.24 }}
            className="flex justify-center"
          >
            <Button
              asChild
              variant="glassStrong"
              className="w-full sm:w-auto h-auto rounded-full px-8 py-5 font-mono text-[11px] font-bold uppercase tracking-[0.18em]"
            >
              <WhatsAppChoice source="pricing / hero" className="flex items-center justify-center gap-2">
                Book an AI Workforce Audit
                <ArrowRight size={14} />
              </WhatsAppChoice>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2 — WHAT THE ENGAGEMENT INCLUDES */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 md:px-12 mb-24 md:mb-32">
        <div className="bg-surface border border-border/60 rounded-[32px] p-8 md:p-14 shadow-sm">
          <div className="max-w-3xl mb-12">
            <p className="text-[10px] font-mono tracking-[0.3em] text-muted uppercase mb-3">SCOPED SERVICE</p>
            <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-text uppercase mb-4">
              What Strata Performs
            </h2>
            <p className="text-muted font-sans text-sm md:text-base leading-relaxed">
              Every engagement follows the same disciplined path, but the work is scoped to the gaps, tools and operating realities of your business.
            </p>
          </div>

          {/* Connected Flow Diagram */}
          <div className="relative mb-14">
            <div className="hidden lg:block absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-border/70" aria-hidden="true" />
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-6 lg:gap-3">
              {systemFlowSteps.map((step, idx) => (
                <div key={step} className="relative">
                  <div className="relative z-10 flex min-h-[76px] items-center justify-between rounded-[18px] border border-border/60 bg-surface px-4 py-3 shadow-[0_8px_24px_rgb(var(--scrim)/0.03)] lg:flex-col lg:items-start lg:justify-between">
                    <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-muted">
                      0{idx + 1}
                    </span>
                    <span className="text-right font-mono text-xs font-bold uppercase tracking-wider text-text lg:text-left leading-snug">
                      {step}
                    </span>
                  </div>
                  {idx < systemFlowSteps.length - 1 && (
                    <div className="flex justify-center py-1.5 text-text/35 lg:absolute lg:right-[-1.0rem] lg:top-1/2 lg:z-20 lg:-translate-y-1/2 lg:bg-surface lg:px-1 lg:py-0">
                      <ArrowRight size={14} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Standardized Core Deliverables */}
          <div className="border-t border-border/50 pt-10">
            <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-text mb-6">
              Typical Work Included in a Standard Engagement:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-3.5 gap-x-6">
              {coreDeliverables.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <Check className="mt-0.5 shrink-0 text-text" size={15} />
                  <span className="text-sm font-sans text-muted leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 - THE WORKFORCE LADDER (MAIN COMMERCIAL ANCHOR) */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 md:px-12 mb-24 md:mb-32">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-[10px] font-mono tracking-[0.3em] text-muted uppercase mb-3">COMMERCIAL INVESTMENT</p>
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-text uppercase mb-4">
            Scope &amp; Investment
          </h2>
          <p className="text-muted font-sans text-sm md:text-base leading-relaxed">
            Every engagement is scoped to the work being removed. Implementation is quoted separately from the monthly fee, and both move with the complexity of your operation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {packages.map((pkg, idx) => (
            <motion.article
              key={pkg.name}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: shouldReduceMotion ? 0 : undefined, delay: shouldReduceMotion ? 0 : idx * 0.07 }}
              className={cn(
                'relative flex flex-col rounded-[32px] bg-surface p-7 md:p-8',
                pkg.featured
                  ? 'border-2 border-gold shadow-[0_24px_72px_rgb(var(--scrim)/0.08)]'
                  : 'border border-border/60 shadow-sm',
              )}
            >
              {pkg.featured && (
                <span className="absolute -top-3 left-7 inline-flex items-center rounded-full bg-gold px-4 py-1.5 font-mono text-[9px] font-bold uppercase tracking-widest text-void">
                  MOST DEPLOYED
                </span>
              )}

              <div className="mb-6 pb-6 border-b border-border/60">
                <h3 className="text-2xl font-display font-bold uppercase tracking-tight text-text mb-2">
                  {pkg.name}
                </h3>
                <p className="font-sans text-sm text-text/70 leading-relaxed">{pkg.tagline}</p>
              </div>

              <div className="mb-6 space-y-4">
                <div>
                  <span className="block font-mono text-[9px] uppercase tracking-widest text-muted mb-1">MONTHLY</span>
                  <span className="font-mono text-xl font-bold text-text">{pkg.monthly}</span>
                </div>
                <div className="pt-3 border-t border-border/40">
                  <span className="block font-mono text-[9px] uppercase tracking-widest text-muted mb-1">IMPLEMENTATION</span>
                  <span className="font-mono text-base font-bold text-text">{pkg.setup}</span>
                  <span className="block text-[10px] font-mono text-muted mt-1">One-time, billed separately</span>
                </div>
              </div>

              <p className="mb-6 font-sans text-xs text-muted leading-relaxed">{pkg.summary}</p>

              <ul className="mb-8 grid gap-3 border-t border-border/40 pt-5">
                {pkg.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 shrink-0 text-text" size={14} />
                    <span className="font-sans text-xs text-muted leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              <WhatsAppChoice
                source={'pricing / ' + pkg.name}
                ariaLabel={'Discuss the ' + pkg.name + ' scope on WhatsApp'}
                className={cn(
                  'mt-auto flex h-12 w-full items-center justify-center gap-2 rounded-full font-mono text-[10px] font-bold uppercase tracking-widest transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-focusOffset',
                  pkg.featured
                    ? 'bg-gold text-void hover:bg-goldHover active:bg-goldActive'
                    : 'border border-border text-text hover:bg-surface3',
                )}
              >
                Discuss {pkg.name}
                <ArrowRight size={13} />
              </WhatsAppChoice>
            </motion.article>
          ))}
        </div>

        <div className="mt-8 mx-auto max-w-3xl rounded-[24px] border border-border/60 bg-surface px-6 py-5 text-center">
          <p className="font-sans text-xs text-muted leading-relaxed">
            <span className="font-mono font-bold uppercase tracking-widest text-text">Ad spend is separate.</span>
            {' '}Media budget is billed directly to your business by Meta or TikTok. Third-party usage such as WhatsApp Business messaging, premium data or unusually high AI consumption is passed through at cost.
          </p>
        </div>
      </section>

      {/* SECTION 4 — HOW WE PRICE (DETERMINATION FACTORS) */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 md:px-12 mb-24 md:mb-32">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
          <div className="max-w-2xl">
            <p className="text-[10px] font-mono tracking-[0.3em] text-muted uppercase mb-4">PRICING LOGIC</p>
            <h2 className="text-4xl md:text-5xl font-display font-bold leading-none tracking-tight text-text uppercase">
              What Determines Your Investment
            </h2>
          </div>
          <div className="max-w-md border-l border-gold/20 pl-6">
            <p className="text-sm font-sans text-text font-medium leading-relaxed mb-1">
              "We do not price by niche. We price by value, economics, and delivery complexity."
            </p>
            <p className="text-[10px] font-mono text-muted uppercase tracking-widest">
              Commercial Pricing Principles
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pricingFactors.map((factor, idx) => (
            <motion.div
              key={factor.title}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: shouldReduceMotion ? 0 : undefined, delay: shouldReduceMotion ? 0 : idx * 0.08 }}
              className="bg-surface border border-border/60 rounded-[28px] p-8 flex flex-col justify-between hover:shadow-lg transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-border/40">
                  <h3 className="font-mono text-base font-bold uppercase tracking-wider text-text">{factor.title}</h3>
                  <span className="font-mono text-xs font-bold text-muted">{factor.num}</span>
                </div>
                <p className="text-muted font-sans text-sm leading-relaxed">
                  {factor.desc}
                </p>
              </div>
            </motion.div>
          ))}

          {/* Summary Card */}
          <div className="bg-surface2 text-text rounded-[28px] border border-gold/25 p-8 flex flex-col justify-between shadow-lg shadow-gold/5">
            <div>
              <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-muted block mb-3">
                NO RANDOM DISCOUNTS
              </span>
              <h3 className="text-xl font-bold uppercase tracking-tight text-text mb-3">
                Fair &amp; Value-Based
              </h3>
              <p className="text-muted font-sans text-xs md:text-sm leading-relaxed">
                Your investment is mapped strictly to the required infrastructure scope and commercial value created.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-border font-mono text-[10px] uppercase tracking-widest text-muted">
              Commercial Integrity
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — EXPANDED SCOPE */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 md:px-12 mb-24 md:mb-32">
        <div className="bg-surface2 text-text rounded-[32px] border border-gold/30 p-8 md:p-14 shadow-2xl shadow-gold/5 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 relative z-10 items-center">
            <div>
              <span className="mb-3 block font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-muted">
                SCOPE DRIVERS
              </span>
              <h2 className="mb-6 text-4xl md:text-5xl font-black uppercase leading-tight text-text">
                What Moves You Up
              </h2>
              <p className="mb-8 font-sans text-base md:text-lg text-muted leading-relaxed max-w-lg">
                Most businesses land on Growth. These are the conditions that push a deployment into Scale or Enterprise - and the honest reasons a quote comes back higher.
              </p>

              <p className="mb-8 font-sans text-xs text-muted leading-relaxed">
                None of these change the method. They change how much implementation, routing, permission and integration work sits underneath it - which is what the Scale and Enterprise bands pay for.
              </p>

              <Button
                asChild
                variant="glassOnDark"
                size="lg"
                className="w-full sm:w-auto h-auto py-4 px-8 rounded-full font-mono text-[10px] font-bold uppercase tracking-widest"
              >
                <WhatsAppChoice source="pricing / scope-drivers" className="flex items-center justify-center gap-2">
                  Book an AI Workforce Audit
                  <ArrowRight size={14} />
                </WhatsAppChoice>
              </Button>
            </div>

            <div className="bg-surface border border-border rounded-[24px] p-6 md:p-8">
              <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-muted mb-6 border-b border-border pb-3">
                Common Triggers For A Larger Scope:
              </h4>
              <ul className="grid grid-cols-1 gap-3.5">
                {expandedScopeReasons.map((reason) => (
                  <li key={reason} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                    <span className="text-xs md:text-sm font-sans text-muted">{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 — HOW QUOTING WORKS */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 md:px-12 mb-24 md:mb-32">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-[10px] font-mono tracking-[0.3em] text-muted uppercase mb-3">TRANSPARENT PROCESS</p>
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-text uppercase">
            How Quoting Works
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {quotingSteps.map((step) => (
            <div key={step.num} className="bg-surface border border-border/60 rounded-[28px] p-8 flex flex-col justify-between">
              <div>
                <span className="font-mono text-2xl font-bold text-text/20 block mb-4">{step.num}</span>
                <h3 className="font-mono text-base font-bold uppercase tracking-wider text-text mb-3">{step.title}</h3>
                <p className="text-muted font-sans text-sm leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 8 — STRATA CORE PLATFORM VISION */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 md:px-12 mb-24 md:mb-32">
        <div className="rounded-[32px] border border-gold/30 bg-surface2 p-8 text-text shadow-xl shadow-gold/5 md:p-14">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-3xl">
              <p className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-muted">
                STRATA CORE · IN DEVELOPMENT · UNPRICED
              </p>
              <h2 className="text-3xl font-black uppercase tracking-tight text-text md:text-5xl">
                A separate platform vision for connected business operations.
              </h2>
              <p className="mt-6 text-sm leading-relaxed text-muted md:text-base">
                Strata Core is being designed as a shared platform for company data, rules, permissions and controlled assistance across multiple interfaces. It is not included in the prices above and is not presented as a finished product.
              </p>
            </div>
            <Button
              asChild
              variant="glassOnDark"
              size="lg"
              className="h-auto w-full rounded-full px-8 py-5 font-mono text-[11px] font-bold uppercase tracking-[0.18em] lg:w-auto"
            >
              <a href={`${CONTACT.mailto}?subject=Strata%20Core%20Vision%20Demo`} className="flex items-center justify-center gap-3">
                <span>Vision Demo</span>
                <ArrowRight size={15} />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 9 — FAQ & FINAL CTA */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 md:px-12 mb-24 md:mb-32">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[10px] font-mono tracking-[0.3em] text-muted uppercase mb-3">COMMON QUESTIONS</p>
            <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-text uppercase">
              Commercial FAQ
            </h2>
          </div>
          
          <div className="grid gap-6 mb-16">
            {faqs.map((faq) => (
              <div key={faq.question} className="bg-surface/50 border border-border/50 rounded-2xl p-6 md:p-8">
                <h4 className="text-lg md:text-xl font-bold font-sans text-text mb-3">{faq.question}</h4>
                <p className="text-sm md:text-base font-sans text-muted leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>

          {/* Final Conversion Block */}
          <div className="bg-surface2 text-text rounded-[32px] border border-gold/30 p-8 md:p-14 text-center shadow-xl shadow-gold/5">
            <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-6 text-text">
              Ready to price the work your revenue process needs?
            </h3>
            <p className="text-muted font-sans text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-10">
              Book an AI Workforce Audit. We'll map the current process, review your customer economics and specify the deployment scope, timeline and ongoing service.
            </p>
            <Button
              asChild
              variant="glassOnDark"
              size="lg"
              className="w-full sm:w-auto h-auto py-5 px-10 rounded-full font-mono text-[11px] font-bold uppercase tracking-[0.18em]"
            >
              <WhatsAppChoice source="pricing / final-cta" className="flex items-center justify-center gap-3">
                <span>Book an AI Workforce Audit</span>
                <ArrowRight size={15} />
              </WhatsAppChoice>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
