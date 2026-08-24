import { ArrowRight, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CONTACT } from '../config/contact';
import { Button } from '../components/ui/liquid-glass-button';

const systemFlowSteps = [
  'Audit Revenue Leaks',
  'Map Customer Journey',
  'Design Sales Process',
  'Configure Tools',
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

const quotingSteps = [
  {
    num: '01',
    title: 'QUALIFY THE BUSINESS',
    desc: 'We verify whether your offer, market, margins and sales capacity are commercially suitable for a Revenue Systems engagement.',
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
    question: 'What is Strata Revenue Systems?',
    answer: 'Strata Revenue Systems is a paid service engagement. We diagnose where revenue work is breaking, design the agreed process, configure the required tools and hand the working system over to your team.',
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
    question: 'What is the difference between Standard and Expanded Scope?',
    answer: 'Standard (from RM 5,000/mo) covers one bounded revenue operation. Expanded Scope (from RM 7,500/mo) is for multiple locations, heavier lead volume, larger teams, additional workflows or custom integrations.',
  },
  {
    question: 'What happens during the Revenue Systems Audit?',
    answer: 'We review how enquiries arrive, who owns each handoff, where follow-up fails, what customers are worth and which tools are already in place. You leave with a recommended service scope, timeline and investment band.',
  },
];

export const Pricing = () => {
  return (
    <div className="relative pt-32 pb-24 md:pt-40 md:pb-32 bg-background min-h-screen">
      
      {/* SECTION 1 — HERO */}
      <section className="container mx-auto px-6 md:px-12 mb-20 md:mb-28">
        <div className="text-center max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] font-mono tracking-[0.3em] text-muted uppercase mb-4"
          >
            STRATA REVENUE SYSTEMS
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-7xl font-display font-bold leading-none tracking-tight text-text mb-8 uppercase"
          >
            Practical revenue operations. <br />
            <span className="text-text/70">Delivered around your business economics.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
            className="text-muted font-sans text-base md:text-xl leading-relaxed max-w-3xl mx-auto mb-10"
          >
            This is the work customers can buy today. Strata audits the revenue process, designs the required handoffs, configures the agreed tools and supports execution. Pricing varies with customer value, sales economics, complexity, locations and integrations.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24 }}
            className="flex justify-center"
          >
            <Button
              asChild
              variant="glassStrong"
              className="w-full sm:w-auto h-auto rounded-full px-8 py-5 font-mono text-[11px] font-bold uppercase tracking-[0.18em]"
            >
              <Link to={CONTACT.requestDemoPath} className="flex items-center justify-center gap-2">
                Book a Revenue Systems Audit
                <ArrowRight size={14} />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2 — WHAT THE ENGAGEMENT INCLUDES */}
      <section className="container mx-auto px-6 md:px-12 mb-24 md:mb-32">
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

      {/* SECTION 3 — PUBLIC INVESTMENT (MAIN COMMERCIAL ANCHOR) */}
      <section className="container mx-auto px-6 md:px-12 mb-24 md:mb-32">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-[10px] font-mono tracking-[0.3em] text-muted uppercase mb-3">COMMERCIAL INVESTMENT</p>
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-text uppercase">
            Starting Investment
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <article className="relative overflow-hidden rounded-[32px] border-2 border-gold bg-surface p-8 md:p-14 shadow-[0_24px_72px_rgb(var(--scrim)/0.08)]">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-border/60">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.28em] text-muted block mb-1">
                  STANDARD IMPLEMENTATION
                </span>
                <h3 className="text-3xl md:text-4xl font-black text-text uppercase tracking-tight">
                  Strata Revenue Systems
                </h3>
              </div>
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-gold text-void font-mono text-[9px] font-bold uppercase tracking-widest">
                MOST RECOMMENDED
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 p-6 rounded-2xl bg-surface border border-border/50">
              <div>
                <span className="block font-mono text-[10px] uppercase tracking-widest text-muted mb-1">IMPLEMENTATION</span>
                <span className="font-mono text-2xl font-bold text-text">FROM RM 5,000</span>
                <span className="block text-[10px] font-mono text-muted mt-1">One-time setup &amp; build</span>
              </div>
              <div className="md:border-l md:border-border/50 md:pl-6">
                <span className="block font-mono text-[10px] uppercase tracking-widest text-muted mb-1">MONTHLY OPERATING FEE</span>
                <span className="font-mono text-2xl font-bold text-text">FROM RM 5,000 / MO</span>
                <span className="block text-[10px] font-mono text-muted mt-1">Ongoing delivery &amp; improvement</span>
              </div>
              <div className="md:border-l md:border-border/50 md:pl-6">
                <span className="block font-mono text-[10px] uppercase tracking-widest text-muted mb-1">AD SPEND</span>
                <span className="font-mono text-2xl font-bold text-text">SEPARATE</span>
                <span className="block text-[10px] font-mono text-muted mt-1">Billed directly by ad platforms</span>
              </div>
            </div>

            <p className="text-sm font-sans text-muted leading-relaxed mb-8">
              Final investment depends on your customer value, gross margin, monthly lead volume, sales team capacity, locations, operational complexity, and required software integrations.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-border/50">
              <span className="font-mono text-xs text-muted uppercase tracking-widest">
                Recommended for qualified service operations
              </span>
              <Button
                asChild
                variant="glassStrong"
                size="lg"
                className="w-full sm:w-auto h-auto py-4 px-8 rounded-full font-mono text-[10px] font-bold uppercase tracking-widest"
              >
                <Link to={CONTACT.requestDemoPath} className="flex items-center justify-center gap-2">
                  Book a Revenue Systems Audit
                  <ArrowRight size={14} />
                </Link>
              </Button>
            </div>
          </article>
        </div>
      </section>

      {/* SECTION 4 — HOW WE PRICE (DETERMINATION FACTORS) */}
      <section className="container mx-auto px-6 md:px-12 mb-24 md:mb-32">
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
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
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
      <section className="container mx-auto px-6 md:px-12 mb-24 md:mb-32">
        <div className="bg-surface2 text-text rounded-[32px] border border-gold/30 p-8 md:p-14 shadow-2xl shadow-gold/5 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 relative z-10 items-center">
            <div>
              <span className="mb-3 block font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-muted">
                EXPANDED INFRASTRUCTURE
              </span>
              <h2 className="mb-6 text-4xl md:text-5xl font-black uppercase leading-tight text-text">
                Expanded Scope
              </h2>
              <p className="mb-8 font-sans text-base md:text-lg text-muted leading-relaxed max-w-lg">
                For growing businesses requiring more delivery work than the standard Revenue Systems engagement.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8 p-5 rounded-2xl bg-surface2 border border-border">
                <div>
                  <span className="block font-mono text-[9px] uppercase tracking-widest text-muted mb-1">IMPLEMENTATION</span>
                  <span className="font-mono text-xl font-bold text-text">RM 7,500+</span>
                </div>
                <div>
                  <span className="block font-mono text-[9px] uppercase tracking-widest text-muted mb-1">MONTHLY FEE</span>
                  <span className="font-mono text-xl font-bold text-text">RM 7,500+ / MO</span>
                </div>
              </div>

              <p className="mb-8 font-sans text-xs text-muted leading-relaxed">
                Expanded Scope adds the implementation, routing, permissions and integration work required by more complex operations.
              </p>

              <Button
                asChild
                variant="glassOnDark"
                size="lg"
                className="w-full sm:w-auto h-auto py-4 px-8 rounded-full font-mono text-[10px] font-bold uppercase tracking-widest"
              >
                <Link to={CONTACT.requestDemoPath} className="flex items-center justify-center gap-2">
                  Book a Revenue Systems Audit
                  <ArrowRight size={14} />
                </Link>
              </Button>
            </div>

            <div className="bg-surface2 border border-border rounded-[24px] p-6 md:p-8">
              <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-muted mb-6 border-b border-border pb-3">
                Common Triggers for Expanded Scope:
              </h4>
              <ul className="grid grid-cols-1 gap-3.5">
                {expandedScopeReasons.map((reason) => (
                  <li key={reason} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-positiveSoft shrink-0" />
                    <span className="text-xs md:text-sm font-sans text-muted">{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 — HOW QUOTING WORKS */}
      <section className="container mx-auto px-6 md:px-12 mb-24 md:mb-32">
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

      {/* SECTION 7 — POST-LAUNCH SUPPORT (SYSTEM CARE) */}
      <section className="container mx-auto px-6 md:px-12 mb-24 md:mb-32">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-[10px] font-mono tracking-[0.3em] text-muted uppercase mb-3">OPTIONAL ADD-ONS</p>
          <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-text uppercase mb-3">
            Optional Support &amp; SLA Add-ons
          </h2>
          <p className="text-sm font-sans text-muted max-w-2xl mx-auto">
            Optional post-launch services for businesses requiring uptime monitoring, technical maintenance and ongoing improvement after implementation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="bg-surface border border-border/60 rounded-[24px] p-6 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="font-display font-bold text-xl text-text mb-1">Monitor</h3>
              <p className="font-mono text-lg font-bold text-text mb-4">RM 299/mo</p>
              <ul className="grid gap-2.5 text-xs text-muted font-sans border-t border-border/40 pt-4">
                <li className="flex items-center gap-2"><Check size={14} className="text-text shrink-0" /> CRM &amp; funnel uptime checks</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-text shrink-0" /> Bug fixes &amp; error resolution</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-text shrink-0" /> Basic ticket support</li>
              </ul>
            </div>
          </div>

          <div className="bg-surface border-2 border-gold rounded-[24px] p-6 shadow-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-display font-bold text-xl text-text">Support</h3>
                <span className="text-[8px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 bg-gold text-void rounded-full">POPULAR</span>
              </div>
              <p className="font-mono text-lg font-bold text-text mb-4">RM 599/mo</p>
              <ul className="grid gap-2.5 text-xs text-muted font-sans border-t border-border/40 pt-4">
                <li className="flex items-center gap-2"><Check size={14} className="text-text shrink-0" /> Everything in Monitor</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-text shrink-0" /> Up to 2 hours of changes/month</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-text shrink-0" /> Form &amp; integration health checks</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-text shrink-0" /> Minor copy &amp; layout updates</li>
              </ul>
            </div>
          </div>

          <div className="bg-surface border border-border/60 rounded-[24px] p-6 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="font-display font-bold text-xl text-text mb-1">Growth</h3>
              <p className="font-mono text-lg font-bold text-text mb-4">RM 999/mo</p>
              <ul className="grid gap-2.5 text-xs text-muted font-sans border-t border-border/40 pt-4">
                <li className="flex items-center gap-2"><Check size={14} className="text-text shrink-0" /> Everything in Support</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-text shrink-0" /> Monthly pipeline &amp; funnel review</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-text shrink-0" /> Priority 24-hour response SLA</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8 — STRATA CORE PLATFORM VISION */}
      <section className="container mx-auto px-6 md:px-12 mb-24 md:mb-32">
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
                Strata Core is being designed as a shared platform for company data, rules, permissions and controlled assistance across multiple interfaces. It is not included in the Revenue Systems prices above and is not presented as a finished product.
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
      <section className="container mx-auto px-6 md:px-12 mb-24 md:mb-32">
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
              Book a Revenue Systems Audit. We'll map the current process, review your customer economics and specify the implementation work, timeline and ongoing service scope.
            </p>
            <Button
              asChild
              variant="glassOnDark"
              size="lg"
              className="w-full sm:w-auto h-auto py-5 px-10 rounded-full font-mono text-[11px] font-bold uppercase tracking-[0.18em]"
            >
              <Link to={CONTACT.requestDemoPath} className="flex items-center justify-center gap-3">
                <span>Book a Revenue Systems Audit</span>
                <ArrowRight size={15} />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
