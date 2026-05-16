import { ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CONTACT } from '../config/contact';
import { Button } from '../components/ui/liquid-glass-button';

export const Pricing = () => {
  return (
    <div className="relative pt-32 pb-24 md:pt-40 md:pb-32 bg-background min-h-screen">
      {/* Hero */}
      <section className="container mx-auto px-6 md:px-12 mb-24 md:mb-32">
        <div className="text-center max-w-4xl mx-auto">
          <p className="text-xs font-mono tracking-widest text-muted uppercase mb-4">SYSTEMS OFFER</p>
          <h1 className="text-5xl md:text-7xl font-display font-bold leading-none tracking-tight text-primary mb-8">
            Choose the system your business needs next.
          </h1>
          <p className="text-muted font-sans text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-10">
            Start with the leak. If demand is weak, build the media system. If follow-up and conversion are weak, build the revenue infrastructure. If both are weak, install the full system.
          </p>
          <Button
            asChild
            variant="glassStrong"
            className="w-fit h-auto rounded-full px-8 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.18em]"
          >
            <Link to={CONTACT.requestDemoPath} className="flex items-center gap-2">
              Book Strategy Call
              <ArrowRight size={14} />
            </Link>
          </Button>
        </div>
      </section>

      {/* Revenue Infrastructure */}
      <section className="container mx-auto px-6 md:px-12 mb-24 md:mb-32">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-primary mb-4">
            Revenue Infrastructure
          </h2>
          <p className="text-lg md:text-xl font-sans text-muted max-w-3xl mb-4">
            For businesses that already have demand but lose leads through weak landing pages, poor follow-up, or no CRM structure.
          </p>
          <p className="text-sm font-mono tracking-widest text-primary uppercase font-bold">
            Purpose: Capture and convert demand.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <PricingCard
            title="Foundation"
            price="RM 8,500"
            bestFor="One offer, one funnel, one CRM pipeline."
            features={[
              "Single funnel",
              "CRM essential setup",
              "Core automations",
              "Lead capture",
              "Basic analytics",
              "Handover documentation",
            ]}
          />
          <PricingCard
            title="Growth"
            price="RM 14,500"
            bestFor="Multiple offers, stronger automation, and staff accountability."
            features={[
              "Up to 3 funnels",
              "CRM advanced setup",
              "Multiple pipelines or offer flows",
              "Full automation",
              "Staff accountability rules",
              "Analytics and reporting setup",
            ]}
            featured
          />
          <PricingCard
            title="Scale"
            price="From RM 20,000"
            bestFor="Complex operations, upsells, and third-party integrations."
            features={[
              "Custom funnel system",
              "Advanced CRM structure",
              "Upsell paths",
              "Complex workflows",
              "Third-party integrations",
              "Custom operations logic",
            ]}
          />
        </div>
        <div className="mt-10">
          <div className="bg-surface/50 rounded-2xl p-6 md:p-8 border border-border/50 mb-10">
            <h4 className="font-bold text-primary mb-4 uppercase text-sm tracking-wider">What's Included Across All Tiers:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8">
              {[
                "Conversion-focused landing page / sales page",
                "Lead capture form",
                "CRM pipeline setup",
                "WhatsApp / email / SMS follow-up automation",
                "Staff workflow and task assignment rules",
                "Thank-you page",
                "Mobile-first build",
                "Analytics setup",
                "Basic on-page SEO",
                "Onboarding, staff training documentation, and handover"
              ].map(item => (
                <div key={item} className="flex items-start gap-3">
                  <Check className="mt-0.5 shrink-0 text-primary/70" size={15} />
                  <span className="text-sm font-sans text-muted">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center">
            <Button
              asChild
              variant="glass"
              className="w-full sm:w-fit h-auto rounded-full px-8 py-5 font-mono text-[10px] font-bold uppercase tracking-[0.18em]"
            >
              <Link to={CONTACT.requestDemoPath} className="flex items-center gap-2">
                Diagnose My Revenue System
                <ArrowRight size={13} />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Growth Media System */}
      <section className="container mx-auto px-6 md:px-12 mb-24 md:mb-32">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-primary mb-4">
            Growth Media System
          </h2>
          <p className="text-lg md:text-xl font-sans text-muted max-w-3xl mb-4">
            For businesses that need consistent content, paid media, and a repeatable engine for demand creation.
          </p>
          <p className="text-sm font-mono tracking-widest text-primary uppercase font-bold">
            Purpose: Create and feed demand.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <PricingCard
            title="Content Only"
            price="RM 3,500/mo"
            features={[
              "12 short-form videos per month",
              "Organic content for Meta + TikTok",
              "Script, hook, and caption per video",
              "Monthly content calendar",
            ]}
          />
          <PricingCard
            title="Content + Ads"
            subtitle="1 Platform"
            price="RM 5,500/mo"
            features={[
              "12 short-form videos per month",
              "4 paid ad creatives",
              "16 total assets",
              "Ad management on Meta or TikTok",
              "Monthly reporting",
            ]}
          />
          <PricingCard
            title="Content + Ads"
            subtitle="Both Platforms"
            price="RM 7,500/mo"
            features={[
              "16 short-form videos per month",
              "8 paid ad creatives",
              "24 total assets",
              "Meta + TikTok ad management",
              "Monthly reporting and optimization",
            ]}
            featured
          />
          <PricingCard
            title="Full Growth Media System"
            price="RM 9,500/mo"
            features={[
              "20 short-form videos per month",
              "12 paid ad creatives",
              "32 total assets",
              "Meta + TikTok ad management",
              "Monthly strategy session",
              "Performance review and optimization",
            ]}
          />
        </div>

        <div className="mt-10">
          <div className="bg-surface/50 rounded-2xl p-6 md:p-8 border border-border/50 mb-10">
             <h4 className="font-bold text-primary mb-4 uppercase text-sm tracking-wider">System Deliverables:</h4>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-3 gap-x-6 mb-8">
              {[
                "Short-form video assets",
                "Scripts, hooks, and captions",
                "Organic content system",
                "Paid ad creatives",
                "Meta / TikTok campaign management",
                "Monthly media calendar",
                "Weekly buyer-pain content themes",
                "Performance reporting and optimization notes",
              ].map(item => (
                <div key={item} className="flex items-start gap-3">
                  <Check className="mt-0.5 shrink-0 text-primary/70" size={15} />
                  <span className="text-sm font-sans text-muted">{item}</span>
                </div>
              ))}
            </div>
            
            <div className="pt-6 border-t border-border/50 text-sm font-sans text-muted space-y-2">
              <p><strong className="text-primary">Important note:</strong> Ad spend is not included. Client pays Meta and TikTok directly.</p>
              <p><strong className="text-primary">Recommended minimum ad spend:</strong> RM 1,500–RM 2,000 per platform per month.</p>
              <p><strong className="text-primary">Minimum commitment:</strong> 3 months.</p>
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              asChild
              variant="glass"
              className="w-full sm:w-fit h-auto rounded-full px-8 py-5 font-mono text-[10px] font-bold uppercase tracking-[0.18em]"
            >
              <Link to={CONTACT.requestDemoPath} className="flex items-center gap-2">
                Build My Media System
                <ArrowRight size={13} />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Full System Install */}
      <section className="container mx-auto px-6 md:px-12 mb-24 md:mb-32">
        <div className="mx-auto overflow-hidden rounded-[32px] border border-primary bg-[#111111] text-white shadow-[0_28px_80px_rgba(0,0,0,0.30)] relative">
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 p-8 md:p-14 relative z-10">
            <div>
              <p className="mb-4 text-[11px] font-mono font-bold uppercase tracking-[0.3em] text-white/50">
                Flagship Offer
              </p>
              <h2 className="mb-6 text-4xl md:text-5xl font-black leading-none tracking-[-0.04em] text-white">
                Full System Install
              </h2>
              <p className="mb-8 font-sans text-lg md:text-xl text-white/70 leading-relaxed max-w-lg">
                For businesses ready to connect media, funnel, CRM, automation, and follow-up into one growth engine.
              </p>
              <p className="mb-8 font-sans text-base text-white/60 leading-relaxed max-w-lg">
                This is the complete Strata system: media creates demand, revenue infrastructure captures it, automation follows up, and the sales pipeline gives the business control.
              </p>
              <div className="mb-8">
                <p className="text-4xl md:text-5xl font-mono font-bold text-white mb-2">RM 30,000</p>
                <p className="text-sm font-mono text-white/50 uppercase tracking-widest">Saves approximately RM 4,000.</p>
                <p className="text-sm font-mono text-white/50 uppercase tracking-widest mt-2">Growth Media System continuation from Month 4 onwards: RM 7,500/mo.</p>
              </div>
              <Button
                asChild
                variant="glassOnDark"
                className="w-full sm:w-fit h-auto rounded-full px-8 py-5 font-mono text-[11px] font-bold uppercase tracking-[0.18em]"
              >
                <Link to={CONTACT.requestDemoPath} className="flex items-center justify-center gap-2">
                  Book Full System Strategy Call
                  <ArrowRight size={13} />
                </Link>
              </Button>
            </div>
            
            <div className="flex flex-col justify-center">
              <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-white/50 mb-6 border-b border-white/10 pb-4">
                What's Included
              </h4>
              <ul className="grid gap-5">
                {[
                  "Revenue Infrastructure Foundation",
                  "System Care Plan for first 3 months",
                  "Growth Media System for 3 months",
                  "Content + Ads on both platforms",
                  "Onboarding and strategy",
                  "Monthly check-ins",
                ].map((feature) => (
                  <li key={feature} className="flex items-start gap-4">
                    <div className="mt-0.5 shrink-0 rounded-full bg-white/10 p-1">
                      <Check className="text-white" size={14} />
                    </div>
                    <span className="text-base font-sans leading-relaxed text-white/80">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* System Care Plan */}
      <section className="container mx-auto px-6 md:px-12 mb-24 md:mb-32">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-primary mb-4">
            System Care Plan
          </h2>
          <p className="text-lg font-sans text-muted">
            For keeping the funnel, CRM, automations, and technical system healthy after launch.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <PricingCard
            title="Monitor"
            price="RM 299/mo"
            features={[
              "CRM / funnel uptime checks",
              "Bug fixes",
              "Basic ticket support",
            ]}
            compact
          />
          <PricingCard
            title="Support"
            price="RM 599/mo"
            features={[
              "Everything in Monitor",
              "Up to 2 hours of changes",
              "Form checks",
              "CRM integration monitoring",
              "Minor copy / layout updates",
            ]}
            compact
          />
          <PricingCard
            title="Growth"
            price="RM 999/mo"
            features={[
              "Everything in Support",
              "Monthly pipeline / funnel performance review",
              "Priority response within 24 hours",
            ]}
            compact
          />
        </div>
      </section>

      {/* Which one should you choose */}
      <section className="container mx-auto px-6 md:px-12 mb-24 md:mb-32">
        <div className="max-w-4xl mx-auto bg-surface rounded-[24px] md:rounded-[32px] p-8 md:p-12 border border-border/50">
          <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-primary mb-8 text-center">
            Which system do you need first?
          </h2>
          
          <div className="grid gap-4 mb-10">
            <ComparisonRow 
              situation="You get leads but lose follow-up."
              recommendation="Revenue Infrastructure"
            />
            <ComparisonRow 
              situation="Your ads are running but leads are not converting."
              recommendation="Revenue Infrastructure"
            />
            <ComparisonRow 
              situation="You do not post consistently."
              recommendation="Growth Media System"
            />
            <ComparisonRow 
              situation="You need organic content and paid media."
              recommendation="Growth Media System"
            />
            <ComparisonRow 
              situation="You need media, funnel, CRM, automation, and follow-up together."
              recommendation="Full System Install"
              highlight
            />
          </div>

          <div className="flex justify-center">
            <Button
              asChild
              variant="glassStrong"
              className="w-full sm:w-fit h-auto rounded-full px-8 py-5 font-mono text-[10px] font-bold uppercase tracking-[0.18em]"
            >
              <Link to={CONTACT.requestDemoPath} className="flex items-center justify-center gap-2">
                Book Strategy Call
                <ArrowRight size={13} />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container mx-auto px-6 md:px-12 mb-24 md:mb-32">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-primary">
              Frequently Asked Questions
            </h2>
          </div>
          
          <div className="grid gap-6">
            <FaqItem 
              question="Do I need both systems?"
              answer="No. If you already have demand, start with Revenue Infrastructure. If you need more attention and traffic, start with Growth Media System. If both are weak, install the full system."
            />
            <FaqItem 
              question="Is ad spend included?"
              answer="No. Ad spend is paid directly by the client to Meta or TikTok. Strata’s fee covers strategy, content production, campaign management, system build, and optimization depending on scope."
            />
            <FaqItem 
              question="Do I need to film content?"
              answer="No. Strata can produce short-form video assets using an AI-assisted production workflow, including scripts, hooks, captions, and creative direction."
            />
            <FaqItem 
              question="Why is there a 3-month minimum for Growth Media System?"
              answer="Because the first month is testing and calibration. Real optimization starts after enough content, campaign, and lead-flow data is collected."
            />
            <FaqItem 
              question="Do you guarantee results?"
              answer="No. Strata does not guarantee specific revenue, ROAS, or lead volume. Strata builds the system, strategy, execution, and optimization layer. Results depend on the offer, market, budget, and follow-through."
            />
            <FaqItem 
              question="What happens after I book a strategy call?"
              answer="Strata diagnoses the current leak, recommends the right system, scopes the engagement, and provides a clear implementation plan."
            />
          </div>
        </div>
      </section>
    </div>
  );
};

// Sub-components

const PricingCard = ({ 
  title, subtitle, price, bestFor, features, featured, compact 
}: { 
  title: string, subtitle?: string, price: string, bestFor?: string, features: string[], featured?: boolean, compact?: boolean 
}) => (
  <article
    className={`flex h-full flex-col overflow-hidden rounded-[24px] border transition-all duration-500 bg-white ${
      featured
        ? 'border-[#111111] border-2 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.12)]'
        : 'border-border/50 shadow-sm hover:border-primary/20 hover:shadow-xl'
    } ${compact ? 'p-6' : 'p-8 md:p-10'}`}
  >
    <div className={`mb-6 ${compact ? '' : 'pb-6 border-b border-border/50'}`}>
      <h3 className={`font-display font-bold text-primary ${compact ? 'text-xl md:text-2xl mb-2' : 'text-2xl md:text-3xl mb-1'}`}>
        {title}
      </h3>
      {subtitle && (
        <p className="text-sm font-sans text-muted mb-3 font-medium">{subtitle}</p>
      )}
      <div className={`font-mono font-bold text-primary tracking-tight ${compact ? 'text-lg mt-3' : 'text-2xl mt-4'}`}>
        {price}
      </div>
      {bestFor && (
        <p className="mt-4 text-sm font-sans leading-relaxed text-muted font-medium">
          "{bestFor}"
        </p>
      )}
    </div>

    <ul className="grid gap-3 mt-auto">
      {features.map((feature) => (
        <li key={feature} className="flex items-start gap-3">
          <Check className="mt-0.5 shrink-0 text-primary/70" size={compact ? 14 : 15} />
          <span className={`font-sans text-muted leading-relaxed ${compact ? 'text-xs' : 'text-sm'}`}>{feature}</span>
        </li>
      ))}
    </ul>
  </article>
);

const ComparisonRow = ({ situation, recommendation, highlight }: { situation: string, recommendation: string, highlight?: boolean }) => (
  <div className={`flex flex-col md:flex-row md:items-center justify-between p-5 md:p-6 rounded-2xl border ${highlight ? 'bg-primary/5 border-primary/20' : 'bg-white border-border/50'}`}>
    <div className="mb-3 md:mb-0">
      <p className="text-[10px] font-mono uppercase tracking-widest text-muted mb-1">Situation</p>
      <p className="text-sm md:text-base font-sans font-medium text-primary">"{situation}"</p>
    </div>
    <div className="md:text-right">
      <p className="text-[10px] font-mono uppercase tracking-widest text-muted mb-1">Recommendation</p>
      <p className={`text-sm md:text-base font-mono font-bold tracking-tight uppercase ${highlight ? 'text-primary' : 'text-primary/80'}`}>{recommendation}</p>
    </div>
  </div>
);

const FaqItem = ({ question, answer }: { question: string, answer: string }) => (
  <div className="bg-surface/50 border border-border/50 rounded-2xl p-6 md:p-8">
    <h4 className="text-lg md:text-xl font-bold font-sans text-primary mb-3">{question}</h4>
    <p className="text-sm md:text-base font-sans text-muted leading-relaxed">{answer}</p>
  </div>
);
