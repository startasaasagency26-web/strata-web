import { ArrowRight, Check, ArrowRightLeft, Layers, ShieldCheck, TrendingUp, Users, Wrench } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CONTACT } from '../config/contact';
import { Button } from '../components/ui/liquid-glass-button';

const systemFlowSteps = [
  'Meta Ads',
  'Landing Page',
  'WhatsApp CRM',
  'AI Qualification',
  'Automated Follow-Up',
  'Booking & Reporting',
];

const coreDeliverables = [
  'Conversion-focused landing page / offer flow',
  'Direct WhatsApp & multi-channel lead capture',
  'Centralized WhatsApp CRM & pipeline management',
  'AI qualification agents & automated lead scoring',
  'Automated WhatsApp & email follow-up sequences',
  'Staff task assignment & team handoff rules',
  'Booking calendar integration & appointment flow',
  'Executive reporting dashboard & conversion analytics',
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
    desc: 'We verify whether your offer, market, margins, and sales capacity are commercially suitable for Strata Core.',
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
    question: 'What is Strata Core?',
    answer: 'Strata Core is our standardized AI-powered revenue operating system. It connects Meta advertising, landing pages, WhatsApp CRM, AI qualification, automated follow-up, booking, and reporting into one unified commercial infrastructure.',
  },
  {
    question: 'Why does pricing vary if Strata Core is one product?',
    answer: 'Strata Core uses the same core operating architecture for all clients. However, setup complexity, lead volume, number of locations, custom integrations, and team routing vary depending on your business economics.',
  },
  {
    question: 'Is ad spend included in the monthly fee?',
    answer: 'No. Ad spend is billed directly by Meta or TikTok to your business account. Strata\'s monthly fee covers system operation, campaign execution, AI qualification, automation maintenance, and optimization.',
  },
  {
    question: 'What is the difference between Standard and Expanded Scope?',
    answer: 'Standard (from RM 5,000/mo) covers a single business operation with core funnels, CRM, AI, and follow-up. Expanded Scope (from RM 7,500/mo) is designed for multi-location businesses, heavy lead volume, complex sales teams, or custom software integrations.',
  },
  {
    question: 'Do you offer a lower-tier package for early or smaller businesses?',
    answer: 'For select early-stage or lower-ticket local operations with simpler requirements, we occasionally deploy a Founding Floor setup during our discovery phase. However, our main public commercial anchor is RM 5,000/month to ensure full operational support.',
  },
  {
    question: 'What happens during the Revenue Systems Audit?',
    answer: 'During the audit, we analyze your current lead flow, customer value, margin structure, conversion drop-offs, and software tools to determine if Strata Core is a fit and specify your exact implementation scope.',
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
            STRATA CORE
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-7xl font-display font-bold leading-none tracking-tight text-primary mb-8 uppercase"
          >
            One Operating System. <br />
            <span className="text-primary/70">Priced Around Your Business Economics.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
            className="text-muted font-sans text-base md:text-xl leading-relaxed max-w-3xl mx-auto mb-10"
          >
            Strata Core connects demand generation, lead capture, WhatsApp CRM, AI qualification, automated follow-up, booking, and reporting into one revenue operating system. Pricing varies based on customer value, sales economics, operational complexity, locations, and required integrations.
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

      {/* SECTION 2 — WHAT STRATA CORE INCLUDES */}
      <section className="container mx-auto px-6 md:px-12 mb-24 md:mb-32">
        <div className="bg-surface border border-border/60 rounded-[32px] p-8 md:p-14 shadow-sm">
          <div className="max-w-3xl mb-12">
            <p className="text-[10px] font-mono tracking-[0.3em] text-muted uppercase mb-3">PRODUCT ARCHITECTURE</p>
            <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-primary uppercase mb-4">
              What Strata Core Includes
            </h2>
            <p className="text-muted font-sans text-sm md:text-base leading-relaxed">
              Strata Core is standardized around the same high-converting commercial system. Scope changes only where your business economics or operational complexity require more infrastructure.
            </p>
          </div>

          {/* Connected Flow Diagram */}
          <div className="relative mb-14">
            <div className="hidden lg:block absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-border/70" aria-hidden="true" />
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-6 lg:gap-3">
              {systemFlowSteps.map((step, idx) => (
                <div key={step} className="relative">
                  <div className="relative z-10 flex min-h-[76px] items-center justify-between rounded-[18px] border border-border/60 bg-white px-4 py-3 shadow-[0_8px_24px_rgba(0,0,0,0.03)] lg:flex-col lg:items-start lg:justify-between">
                    <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-muted">
                      0{idx + 1}
                    </span>
                    <span className="text-right font-mono text-xs font-bold uppercase tracking-wider text-primary lg:text-left leading-snug">
                      {step}
                    </span>
                  </div>
                  {idx < systemFlowSteps.length - 1 && (
                    <div className="flex justify-center py-1.5 text-primary/35 lg:absolute lg:right-[-1.0rem] lg:top-1/2 lg:z-20 lg:-translate-y-1/2 lg:bg-surface lg:px-1 lg:py-0">
                      <ArrowRight size={14} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Standardized Core Deliverables */}
          <div className="border-t border-border/50 pt-10">
            <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-primary mb-6">
              Standardized System Deliverables Across Every Implementation:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-3.5 gap-x-6">
              {coreDeliverables.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <Check className="mt-0.5 shrink-0 text-primary" size={15} />
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
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-primary uppercase">
            Standard Investment Anchor
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <article className="relative overflow-hidden rounded-[32px] border-2 border-primary bg-white p-8 md:p-14 shadow-[0_24px_72px_rgba(0,0,0,0.08)]">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-border/60">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.28em] text-muted block mb-1">
                  STANDARD IMPLEMENTATION
                </span>
                <h3 className="text-3xl md:text-4xl font-black text-primary uppercase tracking-tight">
                  Strata Core
                </h3>
              </div>
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary text-white font-mono text-[9px] font-bold uppercase tracking-widest">
                MOST RECOMMENDED
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 p-6 rounded-2xl bg-surface border border-border/50">
              <div>
                <span className="block font-mono text-[10px] uppercase tracking-widest text-muted mb-1">IMPLEMENTATION</span>
                <span className="font-mono text-2xl font-bold text-primary">FROM RM 5,000</span>
                <span className="block text-[10px] font-mono text-muted mt-1">One-time setup &amp; build</span>
              </div>
              <div className="md:border-l md:border-border/50 md:pl-6">
                <span className="block font-mono text-[10px] uppercase tracking-widest text-muted mb-1">MONTHLY OPERATING FEE</span>
                <span className="font-mono text-2xl font-bold text-primary">FROM RM 5,000 / MO</span>
                <span className="block text-[10px] font-mono text-muted mt-1">System, AI &amp; media ops</span>
              </div>
              <div className="md:border-l md:border-border/50 md:pl-6">
                <span className="block font-mono text-[10px] uppercase tracking-widest text-muted mb-1">AD SPEND</span>
                <span className="font-mono text-2xl font-bold text-primary">SEPARATE</span>
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
            <h2 className="text-4xl md:text-5xl font-display font-bold leading-none tracking-tight text-primary uppercase">
              What Determines Your Investment
            </h2>
          </div>
          <div className="max-w-md border-l border-primary/20 pl-6">
            <p className="text-sm font-sans text-primary font-medium leading-relaxed mb-1">
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
              className="bg-white border border-border/60 rounded-[28px] p-8 flex flex-col justify-between hover:shadow-lg transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-border/40">
                  <h3 className="font-mono text-base font-bold uppercase tracking-wider text-primary">{factor.title}</h3>
                  <span className="font-mono text-xs font-bold text-muted">{factor.num}</span>
                </div>
                <p className="text-muted font-sans text-sm leading-relaxed">
                  {factor.desc}
                </p>
              </div>
            </motion.div>
          ))}

          {/* Summary Card */}
          <div className="bg-primary text-white rounded-[28px] p-8 flex flex-col justify-between">
            <div>
              <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-white/50 block mb-3">
                NO RANDOM DISCOUNTS
              </span>
              <h3 className="text-xl font-bold uppercase tracking-tight text-white mb-3">
                Fair &amp; Value-Based
              </h3>
              <p className="text-white/75 font-sans text-xs md:text-sm leading-relaxed">
                Your investment is mapped strictly to the required infrastructure scope and commercial value created.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 font-mono text-[10px] uppercase tracking-widest text-white/50">
              Commercial Integrity
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — EXPANDED SCOPE */}
      <section className="container mx-auto px-6 md:px-12 mb-24 md:mb-32">
        <div className="bg-[#111113] text-white rounded-[32px] p-8 md:p-14 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 relative z-10 items-center">
            <div>
              <span className="mb-3 block font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">
                HIGH COMPLEXITY &amp; ENTERPRISE
              </span>
              <h2 className="mb-6 text-4xl md:text-5xl font-black uppercase leading-tight text-white">
                Expanded Scope
              </h2>
              <p className="mb-8 font-sans text-base md:text-lg text-white/75 leading-relaxed max-w-lg">
                For growing businesses requiring additional infrastructure beyond the standard Strata Core implementation.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8 p-5 rounded-2xl bg-white/5 border border-white/10">
                <div>
                  <span className="block font-mono text-[9px] uppercase tracking-widest text-white/50 mb-1">IMPLEMENTATION</span>
                  <span className="font-mono text-xl font-bold text-white">RM 7,500+</span>
                </div>
                <div>
                  <span className="block font-mono text-[9px] uppercase tracking-widest text-white/50 mb-1">MONTHLY FEE</span>
                  <span className="font-mono text-xl font-bold text-white">RM 7,500+ / MO</span>
                </div>
              </div>

              <p className="mb-8 font-sans text-xs text-white/60 leading-relaxed">
                Expanded Scope uses the same Strata Core system architecture with additional infrastructure, routing logic, and integrations built around operational requirements.
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

            <div className="bg-white/5 border border-white/10 rounded-[24px] p-6 md:p-8">
              <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-white/50 mb-6 border-b border-white/10 pb-3">
                Common Triggers for Expanded Scope:
              </h4>
              <ul className="grid grid-cols-1 gap-3.5">
                {expandedScopeReasons.map((reason) => (
                  <li key={reason} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                    <span className="text-xs md:text-sm font-sans text-white/80">{reason}</span>
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
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-primary uppercase">
            How Quoting Works
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {quotingSteps.map((step) => (
            <div key={step.num} className="bg-surface border border-border/60 rounded-[28px] p-8 flex flex-col justify-between">
              <div>
                <span className="font-mono text-2xl font-bold text-primary/20 block mb-4">{step.num}</span>
                <h3 className="font-mono text-base font-bold uppercase tracking-wider text-primary mb-3">{step.title}</h3>
                <p className="text-muted font-sans text-sm leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 7 — POST-LAUNCH SUPPORT (SYSTEM CARE) */}
      <section className="container mx-auto px-6 md:px-12 mb-24 md:mb-32">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-[10px] font-mono tracking-[0.3em] text-muted uppercase mb-3">ONGOING MAINTENANCE</p>
          <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-primary uppercase mb-3">
            Post-Launch Support &amp; System Care
          </h2>
          <p className="text-sm font-sans text-muted max-w-2xl mx-auto">
            Available for businesses requiring ongoing uptime monitoring, technical maintenance, and minor updates after implementation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="bg-white border border-border/60 rounded-[24px] p-6 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="font-display font-bold text-xl text-primary mb-1">Monitor</h3>
              <p className="font-mono text-lg font-bold text-primary mb-4">RM 299/mo</p>
              <ul className="grid gap-2.5 text-xs text-muted font-sans border-t border-border/40 pt-4">
                <li className="flex items-center gap-2"><Check size={14} className="text-primary shrink-0" /> CRM &amp; funnel uptime checks</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-primary shrink-0" /> Bug fixes &amp; error resolution</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-primary shrink-0" /> Basic ticket support</li>
              </ul>
            </div>
          </div>

          <div className="bg-white border-2 border-primary rounded-[24px] p-6 shadow-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-display font-bold text-xl text-primary">Support</h3>
                <span className="text-[8px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 bg-primary text-white rounded-full">POPULAR</span>
              </div>
              <p className="font-mono text-lg font-bold text-primary mb-4">RM 599/mo</p>
              <ul className="grid gap-2.5 text-xs text-muted font-sans border-t border-border/40 pt-4">
                <li className="flex items-center gap-2"><Check size={14} className="text-primary shrink-0" /> Everything in Monitor</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-primary shrink-0" /> Up to 2 hours of changes/month</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-primary shrink-0" /> Form &amp; integration health checks</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-primary shrink-0" /> Minor copy &amp; layout updates</li>
              </ul>
            </div>
          </div>

          <div className="bg-white border border-border/60 rounded-[24px] p-6 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="font-display font-bold text-xl text-primary mb-1">Growth</h3>
              <p className="font-mono text-lg font-bold text-primary mb-4">RM 999/mo</p>
              <ul className="grid gap-2.5 text-xs text-muted font-sans border-t border-border/40 pt-4">
                <li className="flex items-center gap-2"><Check size={14} className="text-primary shrink-0" /> Everything in Support</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-primary shrink-0" /> Monthly pipeline &amp; funnel review</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-primary shrink-0" /> Priority 24-hour response SLA</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8 — FAQ & FINAL CTA */}
      <section className="container mx-auto px-6 md:px-12 mb-24 md:mb-32">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[10px] font-mono tracking-[0.3em] text-muted uppercase mb-3">COMMON QUESTIONS</p>
            <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-primary uppercase">
              Commercial FAQ
            </h2>
          </div>
          
          <div className="grid gap-6 mb-16">
            {faqs.map((faq) => (
              <div key={faq.question} className="bg-surface/50 border border-border/50 rounded-2xl p-6 md:p-8">
                <h4 className="text-lg md:text-xl font-bold font-sans text-primary mb-3">{faq.question}</h4>
                <p className="text-sm md:text-base font-sans text-muted leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>

          {/* Final Conversion Block */}
          <div className="bg-primary text-white rounded-[32px] p-8 md:p-14 text-center shadow-xl">
            <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-6 text-white">
              Ready to price your revenue operating system?
            </h3>
            <p className="text-white/80 font-sans text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-10">
              Book a Revenue Systems Audit. We'll map your current lead flow, review your customer economics, and specify your exact Strata Core implementation scope.
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
