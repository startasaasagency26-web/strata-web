import { ArrowRight, MessageSquare } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { CONTACT } from '../../config/contact';
import { WhatsAppChoice } from '../WhatsAppChoice';
import { Button } from '../ui/liquid-glass-button';

const systemCards = [
  {
    label: 'CONTEXT',
    position: 'left-[10%] top-[18%] rotate-[-4deg]',
    visibility: 'md:block',
  },
  {
    label: 'OWNERSHIP',
    position: 'right-[12%] top-[20%] rotate-[3deg]',
    visibility: 'md:block',
  },
  {
    label: 'RULES',
    position: 'left-[20%] top-[41%] rotate-[2deg]',
    visibility: 'lg:block',
  },
  {
    label: 'APPROVALS',
    position: 'right-[21%] top-[43%] rotate-[-2deg]',
    visibility: 'lg:block',
  },
  {
    label: 'OUTCOMES',
    position: 'left-1/2 top-[31%] -translate-x-1/2 rotate-[1deg]',
    visibility: 'md:block',
  },
] as const;

export const FinalCTA = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="final-cta" aria-labelledby="final-cta-heading" className="relative mx-2 overflow-hidden rounded-[32px] border border-gold/30 bg-surface2 py-32 text-text shadow-2xl shadow-gold/5 md:mx-6 md:rounded-[48px] md:py-48">
      {/* Strategy architecture field */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-x-0 top-0 h-[62%] opacity-60 [mask-image:linear-gradient(to_bottom,black_0%,black_45%,transparent_100%)] md:opacity-80">
          <div className="final-cta-blueprint absolute left-1/2 top-[-22%] h-[138%] w-[145%] md:w-[118%]" />

          <svg
            className="absolute left-1/2 top-[10%] hidden h-[54%] w-[78%] max-w-6xl -translate-x-1/2 text-text md:block"
            viewBox="0 0 1000 360"
            fill="none"
            role="presentation"
          >
            <path
              d="M110 260V180H285V118H430M890 248V172H705V112H575M265 292H398V230H500V148M735 295H610V230H500V148"
              stroke="currentColor"
              strokeOpacity="0.16"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d="M110 180H170M830 172H890M398 230H438M562 230H610"
              stroke="currentColor"
              strokeOpacity="0.28"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
            {[110, 285, 430, 575, 705, 890, 500].map((x, index) => (
              <circle
                key={`${x}-${index}`}
                cx={x}
                cy={[260, 180, 118, 112, 172, 248, 148][index]}
                r="3"
                fill="currentColor"
                fillOpacity="0.22"
              />
            ))}
          </svg>

          <div className="absolute left-1/2 top-[45%] hidden h-px w-[70%] max-w-5xl -translate-x-1/2 bg-gradient-to-r from-transparent via-gold/10 to-transparent md:block" />

          {systemCards.map((card) => (
            <div
              key={card.label}
              className={`absolute hidden ${card.visibility} ${card.position}`}
            >
              <div
                className="flex h-14 min-w-[8.25rem] items-center justify-between gap-5 border border-border bg-surface2 px-4 shadow-[inset_0_1px_0_rgb(var(--gold)/0.08),0_18px_50px_rgb(var(--scrim)/0.34)] backdrop-blur-[2px]"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.35em] text-muted">
                  {card.label}
                </span>
                <span className="h-1.5 w-1.5 shrink-0 rounded-full border border-border bg-surface2 shadow-[0_0_18px_rgb(var(--gold)/0.3)]" />
              </div>
            </div>
          ))}
        </div>

        <div className="absolute inset-x-0 top-[34%] h-[58%] bg-[radial-gradient(ellipse_at_center,rgb(var(--gold)/0.15)_0%,rgb(var(--gold)/0.055)_34%,transparent_72%)]" />

        <div className="hidden lg:block">
          <span className="absolute left-[1.35rem] top-[18%] font-mono text-[11px] uppercase tracking-[0.55em] text-muted [writing-mode:vertical-rl]">
            Context
          </span>
          <span className="absolute right-[1.35rem] top-[25%] font-mono text-[11px] uppercase tracking-[0.55em] text-muted [writing-mode:vertical-rl]">
            Ownership
          </span>
          <span className="absolute left-[1.35rem] bottom-[16%] font-mono text-[11px] uppercase tracking-[0.55em] text-muted [writing-mode:vertical-rl]">
            Outcomes
          </span>
        </div>
      </div>

      {/* Brutalist geometric accents */}
      <div className="absolute left-0 top-0 z-20 h-px w-full bg-surface2" />
      <div className="absolute bottom-0 left-0 z-20 h-px w-full bg-surface2" />
      <div className="absolute left-6 top-0 z-20 hidden h-full w-px bg-surface2 md:block" />
      <div className="absolute right-6 top-0 z-20 hidden h-full w-px bg-surface2 md:block" />

      <div className="container relative z-10 mx-auto flex flex-col items-center px-6 text-center md:px-12">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-4xl"
        >
          <div className="mb-12 flex justify-center md:mb-14">
            <div className="relative flex h-20 w-20 items-center justify-center md:h-24 md:w-24">
              <div className="absolute inset-0 rounded-full border border-border" />
              <div className="absolute inset-3 rounded-full border border-border" />
              <div className="absolute inset-6 rounded-full border border-border" />
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgb(var(--gold)/0.14)_0%,transparent_62%)]" />
              <div className="absolute inset-0 overflow-hidden rounded-full">
                <span className="absolute left-1/2 top-1/2 h-px w-1/2 origin-left bg-gradient-to-r from-gold/35 to-transparent" />
              </div>
              <div className="final-cta-pulse-ring absolute h-4 w-4 rounded-full border border-border" />
              <div className="relative h-2 w-2 rounded-full bg-surface shadow-[0_0_22px_rgb(var(--gold)/0.7)]" />
            </div>
          </div>

          <h2 id="final-cta-heading" className="mb-8 text-4xl font-black uppercase leading-[0.9] tracking-[-0.05em] text-text md:text-7xl lg:text-8xl">
            Make your operating <br /> system explicit.
          </h2>

          <p className="mx-auto mb-10 max-w-2xl font-sans text-lg leading-relaxed text-muted md:text-xl">
            Bring one critical workflow. We'll map where context breaks, ownership blurs and decisions depend on memory.
          </p>

          {/* What happens during audit box */}
          <div className="mx-auto mb-12 max-w-2xl bg-surface2 border border-border rounded-[24px] p-6 text-left backdrop-blur-sm">
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-muted mb-3">
              WHAT WE MAP WITH YOU:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans text-muted">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-surface2 shrink-0" />
                The signal that starts the workflow
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-surface2 shrink-0" />
                The decisions and business rules involved
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-surface2 shrink-0" />
                The people, records and approval boundaries
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-surface2 shrink-0" />
                The outcome that should be visible
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
            <Button 
              asChild 
              variant="glassOnDark"
              size="lg"
              className="w-full sm:w-auto h-auto py-6 px-10 rounded-full font-mono font-bold uppercase tracking-widest"
            >
              <a href={`${CONTACT.mailto}?subject=Business%20Operations%20Audit`} className="flex items-center justify-center gap-4">
                <span>Book a business operations audit</span>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-surface2 transition-colors duration-300">
                  <ArrowRight size={16} />
                </div>
              </a>
            </Button>

            <WhatsAppChoice className="group inline-flex w-full items-center justify-center gap-4 rounded-full border border-border px-10 py-6 font-mono font-bold uppercase tracking-widest text-text transition-colors duration-300 hover:bg-surface3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus sm:w-auto">
              <MessageSquare size={20} className="text-muted" />
              <span>WhatsApp Us</span>
            </WhatsAppChoice>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
