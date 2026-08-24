import { ArrowRight, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CONTACT } from '../config/contact';
import { Button } from '../components/ui/liquid-glass-button';

const systemFlowSteps = [
  'Customers',
  'Sales',
  'Jobs',
  'Inventory',
  'Purchasing',
  'Finance',
];

const coreDeliverables = [
  'Unified customer records and communication history',
  'Sales pipeline, ownership, and next-action controls',
  'Job tracking from intake through completion',
  'Inventory levels, movements, and reorder visibility',
  'Purchasing workflows and supplier records',
  'Finance handoffs and operational reporting',
  'Role-based rules, approvals, and team permissions',
  'Governed AI Employees with complete audit trails',
];

const pricingFactors = [
  {
    num: '01',
    title: 'Locations',
    desc: 'Additional branches require location-aware records, permissions, workflows, and reporting.',
  },
  {
    num: '02',
    title: 'Operational Complexity',
    desc: 'More services, handoffs, approval paths, and exceptions require a broader operating configuration.',
  },
  {
    num: '03',
    title: 'Data Migration',
    desc: 'The volume, quality, and structure of existing customer and operational data affect migration scope.',
  },
  {
    num: '04',
    title: 'Integrations',
    desc: 'Connections to existing finance, messaging, inventory, and specialist systems increase implementation scope.',
  },
  {
    num: '05',
    title: 'Team Size',
    desc: 'Larger teams require more roles, access controls, approval levels, onboarding, and operating rules.',
  },
];

const expandedScopeReasons = [
  'Multiple branch or office locations',
  'Multiple departments or service lines',
  'Complex job routing and approval chains',
  'Custom operating roles and team permissions',
  'Advanced third-party API integrations',
  'Complex multi-stage automation workflows',
  'Multiple sales, service, or operations teams',
  'Multi-stage job and purchasing workflows',
  'Custom operational and finance reporting',
  'Heavy legacy database & software integrations',
];

const quotingSteps = [
  {
    num: '01',
    title: 'QUALIFY THE BUSINESS',
    desc: 'We verify your operating model, team structure, locations, and current systems to confirm whether Strata Core fits.',
  },
  {
    num: '02',
    title: 'ASSESS SCOPE & COMPLEXITY',
    desc: 'We review workflow complexity, migration requirements, branch locations, team size, and required integrations.',
  },
  {
    num: '03',
    title: 'QUOTE WITHIN APPROVED BAND',
    desc: 'Final implementation and monthly investment are proposed from the operating scope, migration work, and integration requirements.',
  },
];

const faqs = [
  {
    question: 'What is Strata Core?',
    answer: 'Strata Core is an AI operating layer for service businesses. It connects customers, sales, jobs, inventory, purchasing, and finance, while governed AI Employees act inside company rules, approvals, and audit trails.',
  },
  {
    question: 'Why does pricing vary if Strata Core is one product?',
    answer: 'Strata Core uses the same core operating architecture for every business. Pricing varies with the number of locations, operational complexity, data migration, integrations, and team size.',
  },
  {
    question: 'What is the difference between Standard and Expanded Scope?',
    answer: 'Standard (from RM 5,000/mo) covers one operating structure with core customer, sales, job, inventory, purchasing, finance, and AI controls. Expanded Scope (from RM 7,500/mo) covers additional locations, departments, migration work, approval layers, or custom integrations.',
  },
  {
    question: 'What happens during the Strata Core audit?',
    answer: 'We map your current workflows, operating rules, approvals, roles, and connected systems. The result defines whether Strata Core fits and what must be configured, migrated, or integrated.',
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
            <span className="text-primary/70">Priced Around Your Operating Scope.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
            className="text-muted font-sans text-base md:text-xl leading-relaxed max-w-3xl mx-auto mb-10"
          >
            Strata Core connects customers, sales, jobs, inventory, purchasing, finance, and governed AI Employees in one operating layer. Pricing varies with locations, operational complexity, data migration, integrations, and team size.
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
                Book a Strata Core Audit
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
              Strata Core uses one connected operating architecture. Scope changes only where locations, workflows, data, integrations, or team controls require more configuration.
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
            Starting Investment
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
                <span className="block text-[10px] font-mono text-muted mt-1">System, governance &amp; support</span>
              </div>
              <div className="md:border-l md:border-border/50 md:pl-6">
                <span className="block font-mono text-[10px] uppercase tracking-widest text-muted mb-1">CONNECTED AREAS</span>
                <span className="font-mono text-2xl font-bold text-primary">SIX CORE</span>
                <span className="block text-[10px] font-mono text-muted mt-1">Customers through finance</span>
              </div>
            </div>

            <p className="text-sm font-sans text-muted leading-relaxed mb-8">
              Final investment depends on locations, operational complexity, data migration, required integrations, and team size.
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
                  Book a Strata Core Audit
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
              "We do not price by niche. We price by operating scope, migration work, and delivery complexity."
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
                EXPANDED INFRASTRUCTURE
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
                  Book a Strata Core Audit
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
          <p className="text-[10px] font-mono tracking-[0.3em] text-muted uppercase mb-3">OPTIONAL ADD-ONS</p>
          <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-primary uppercase mb-3">
            Optional Strata Core Support &amp; SLA Add-ons
          </h2>
          <p className="text-sm font-sans text-muted max-w-2xl mx-auto">
            Optional post-launch add-ons for businesses requiring ongoing uptime monitoring, technical SLA maintenance, and continuous optimization after Strata Core installation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="bg-white border border-border/60 rounded-[24px] p-6 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="font-display font-bold text-xl text-primary mb-1">Monitor</h3>
              <p className="font-mono text-lg font-bold text-primary mb-4">RM 299/mo</p>
              <ul className="grid gap-2.5 text-xs text-muted font-sans border-t border-border/40 pt-4">
                <li className="flex items-center gap-2"><Check size={14} className="text-primary shrink-0" /> Core system uptime checks</li>
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
                <li className="flex items-center gap-2"><Check size={14} className="text-primary shrink-0" /> Monthly operating-system review</li>
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
              Ready to scope your operating layer?
            </h3>
            <p className="text-white/80 font-sans text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-10">
              Book a Strata Core audit. We’ll map your workflows, rules, approvals, and systems, then specify the implementation scope.
            </p>
            <Button
              asChild
              variant="glassOnDark"
              size="lg"
              className="w-full sm:w-auto h-auto py-5 px-10 rounded-full font-mono text-[11px] font-bold uppercase tracking-[0.18em]"
            >
              <Link to={CONTACT.requestDemoPath} className="flex items-center justify-center gap-3">
                <span>Book a Strata Core Audit</span>
                <ArrowRight size={15} />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
