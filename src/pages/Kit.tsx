import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Seo } from "../components/Seo";
import { KIT } from "../config/kit";
import { routeMetadata } from "../config/routeMetadata";

/*
 * /kit — The Solo Ops Kit.
 * Copy is the approved file vault/brain/strata-kit-page-copy-2026-10-05.md,
 * used word for word. Do not edit wording here without a new approved copy.
 */

/** The site-wide audit destination (same target as the nav AUDIT link). */
const AUDIT_HREF = "/#audit-outcome";

const linkClass =
  "text-gold underline underline-offset-4 transition-colors hover:text-goldHover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus";

const BuyButton = () => (
  <a
    href={KIT.checkoutUrl}
    target="_blank"
    rel="noreferrer"
    className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-gold px-6 py-4 text-center font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-void transition-colors duration-200 hover:bg-goldHover active:bg-goldActive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-focusOffset sm:px-8"
  >
    Get the Solo Ops Kit — US$99
    <ArrowRight size={16} aria-hidden="true" className="shrink-0" />
  </a>
);

type KitSectionProps = {
  id: string;
  heading: string;
  tone?: "surface" | "surface2";
  children: ReactNode;
};

/** Mirrors SectionShell's rhythm and heading scale, without its eyebrow/support slots. */
const KitSection = ({ id, heading, tone = "surface", children }: KitSectionProps) => (
  <section
    id={id}
    aria-labelledby={`${id}-heading`}
    className={`${tone === "surface2" ? "bg-surface2" : "bg-surface"} scroll-mt-[var(--section-scroll-offset)] border-t border-line py-20 md:py-28`}
  >
    <div className="mx-auto max-w-7xl px-5 sm:px-8 md:px-12">
      <h2
        id={`${id}-heading`}
        className="mb-10 max-w-4xl text-balance text-4xl font-black leading-[0.95] tracking-[-0.045em] text-primary md:mb-14 md:text-6xl"
      >
        {heading}
      </h2>
      {children}
    </div>
  </section>
);

const bodyText = "text-base leading-relaxed text-text2 md:text-lg";

const steps = [
  { title: "Map the work.", body: "One page showing your workflow from first contact to paid. Most owners have never seen theirs on paper." },
  { title: "Find the gap.", body: "One sentence naming the step where work actually disappears. Not a guess." },
  { title: "Score it.", body: "A clear yes, no or not-yet. The tie-break is already decided, so a borderline score still gives you an answer." },
  { title: "Set the boundaries.", body: "A written list, in your words, of what an AI worker must never decide without you." },
  { title: "Write the brief.", body: "One page someone could build from: what it does, what it never touches." },
];

const inside = [
  { title: "How to use it.", body: "The order to work in, and what \"done\" looks like." },
  { title: "Workflow map worksheet.", body: "One workflow, in your own words, from first contact to paid." },
  { title: "\"Where work disappears\" checklist.", body: "Eight questions, run against every step until one step keeps coming up." },
  { title: "Scoring checklist.", body: "Five questions and an explicit tie-break." },
  { title: "\"Never without approval\" triggers.", body: "Six situations an AI worker hands back to you, with space for your own." },
  { title: "AI worker brief.", body: "One page, filled in by you." },
  { title: "Worked example.", body: "The whole process for a two-person bike repair shop. It is a made-up business and the kit says so on the page. It shows what a finished answer looks like. It does not prove a result." },
  { title: "Getting it built.", body: "Three honest routes, including doing it yourself." },
];

const howItGoes = [
  { title: "Buy.", body: "Instant download, start today." },
  { title: "Work through it.", body: "About 1.5 to 2 hours, in one sitting or over a few days." },
  { title: "Take the brief.", body: "Build it yourself, hand it to a freelancer, or bring it to Strata." },
];

const faqs: { question: string; answer: ReactNode }[] = [
  { question: "Is it software?", answer: "No. It is two PDFs, A4 and US Letter, with fillable fields. Type into it or print it." },
  {
    question: "US$99 for worksheets?",
    answer: "You are paying for the process, not the paper. The worksheets make you do the work instead of reading about it, and the worked example shows a finished answer before you write yours. If it does not earn that back, you have 14 days.",
  },
  {
    question: "My business does not look like a bike shop.",
    answer: "It is not supposed to. The example is a demonstration of a finished answer, not a prediction of yours. A template that guessed your trade would get the details wrong, so the kit makes you write the true ones.",
  },
  { question: "Is there a version for my industry?", answer: "Not yet. We are not pretending otherwise." },
  { question: "Do I need to know anything about AI?", answer: "No. The kit starts from how your work runs, not from tools." },
  {
    question: "What if I would rather you did it for me?",
    answer: (
      <>
        That is the <Link to={AUDIT_HREF} className={linkClass}>Business Operations Audit</Link>.
      </>
    ),
  },
];

const NumberedCards = ({ items, columns }: { items: { title: string; body: string }[]; columns: string }) => (
  <ol className={`grid gap-4 ${columns}`}>
    {items.map((item, index) => (
      <li key={item.title} className="flex flex-col rounded-[28px] border border-border/60 bg-surface p-6 md:p-7">
        <span className="font-mono text-xs font-bold tracking-[0.2em] text-accent">{String(index + 1).padStart(2, "0")}</span>
        <h3 className="mt-4 text-lg font-bold leading-snug text-text md:text-xl">{item.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">{item.body}</p>
      </li>
    ))}
  </ol>
);

export const Kit = () => (
  <div className="flex flex-col">
    <Seo {...routeMetadata.kit} />

    {/* Hero */}
    <section aria-labelledby="kit-heading" className="px-5 pb-20 pt-32 sm:px-8 md:px-12 md:pt-40 lg:pb-28">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-4xl">
          <p className="mb-6 font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-accent">
            SOLO OPS KIT · PDF · US$99
          </p>
          <h1
            id="kit-heading"
            className="text-balance text-[clamp(2.5rem,9vw,3rem)] font-black leading-[1] tracking-[-0.045em] text-text md:text-7xl"
          >
            Find where your work disappears, before you hand any of it to AI.
          </h1>
          <p className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-muted md:text-xl">
            A 27-page fillable workbook that walks you through the review Strata runs for client businesses, on your own
            business, in 1.5 to 2 hours. You finish with one mapped workflow, one named gap, and a written brief for your
            first AI worker, including what it must never touch.
          </p>

          <div className="mt-10 flex flex-col items-start gap-4">
            <BuyButton />
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
              Instant download · A4 and US Letter PDFs · 14-day refund
            </p>
            <a
              href="#whats-inside"
              className="mt-2 inline-flex min-h-11 items-center font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-text transition-colors hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
            >
              See what's inside ↓
            </a>
          </div>
        </div>
      </div>
    </section>

    {/* Section 1 */}
    <KitSection id="who-its-for" heading="Built for the owner who is also the operations department." tone="surface2">
      <div className={`max-w-3xl space-y-6 ${bodyText}`}>
        <p>
          You run a service business with one to five people. It might be cleaning, bookkeeping, HVAC, landscaping, a
          studio, a workshop. The country does not matter. Somewhere a customer makes contact, you agree the job, the
          work gets done, someone confirms it, and you get paid. That is the only thing this kit assumes.
        </p>
        <p>
          Everything specific to you comes from you: your steps, your gap, what your business cannot undo. The kit does
          not need to know your trade. You do.
        </p>
        <p>It is a PDF. Type straight into it, or print it and write by hand. You need nothing else to work through it.</p>
      </div>
    </KitSection>

    {/* Section 2 */}
    <KitSection id="five-steps" heading="Five steps, done once, on your own business.">
      <NumberedCards items={steps} columns="sm:grid-cols-2 lg:grid-cols-5" />
    </KitSection>

    {/* Section 3 */}
    <KitSection id="what-you-leave-with" heading="What you have when you finish." tone="surface2">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <ul className="rounded-[28px] border border-gold/25 bg-surface p-7 md:p-9">
          {[
            "A mapped workflow",
            "One sentence naming where work disappears",
            "A written decision on where an AI worker goes first, and what it must never touch",
          ].map((item) => (
            <li key={item} className="flex gap-4 border-b border-line py-4 text-lg font-bold leading-snug text-text first:pt-0 last:border-b-0 last:pb-0">
              <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className={`max-w-xl self-center ${bodyText}`}>
          It does not build anything. It tells you what is worth building, and gives you a brief to take to a
          freelancer, to your own developer, or to Strata.
        </p>
      </div>
    </KitSection>

    {/* Section 4 */}
    <KitSection id="one-line-from-inside" heading="Here is one line from inside.">
      <div className={`max-w-3xl space-y-8 ${bodyText}`}>
        <p>Six situations in the kit are ones an AI worker must hand back to you. This is one of them:</p>
        <blockquote className="border-l-2 border-gold pl-6 text-3xl font-black leading-tight tracking-[-0.03em] text-text md:text-5xl">
          "It can't be undone once it happens."
        </blockquote>
        <p>
          That is a judgement call, not a feature list. The scoring checklist works the same way. On a borderline score
          it tells you which "no" means stop, and which only means you have not written the answer down clearly yet.
        </p>
        <p>
          If that is the level of thinking you want, the rest is written at the same level. If it is not, do not buy it.
        </p>
      </div>
    </KitSection>

    {/* Section 5 */}
    <KitSection id="whats-inside" heading="What's inside." tone="surface2">
      <ul className="grid gap-4 md:grid-cols-2">
        {inside.map((item) => (
          <li key={item.title} className="rounded-[28px] border border-border/60 bg-surface p-6 md:p-7">
            <p className="text-base leading-relaxed text-muted md:text-lg">
              <strong className="font-bold text-text">{item.title}</strong> {item.body}
            </p>
          </li>
        ))}
      </ul>
    </KitSection>

    {/* Section 6 */}
    <KitSection id="honest" heading="New product, no reviews yet.">
      <div className={`max-w-3xl space-y-6 ${bodyText}`}>
        <p>
          The kit is new. There are no testimonials on this page because there are none, and we will not write any.
        </p>
        <p>
          What is not new is the process inside it. It is the review Strata Growth Technologies runs as paid client work
          before recommending where, or whether, an AI worker goes into a business. The kit is the thinking behind that,
          written so you can run it yourself.
        </p>
        <p className="rounded-[28px] border border-gold/25 bg-surface2 p-6 font-bold text-text md:p-8">
          If it is not useful once you are inside it, ask within 14 days and get a full refund. No questions asked.
        </p>
      </div>
    </KitSection>

    {/* Section 7 */}
    <KitSection id="not-for" heading="Skip it if:" tone="surface2">
      <ul className={`max-w-3xl border-t border-line ${bodyText}`}>
        {[
          <>You do not have a business to run it on yet. It assumes real customers and real work.</>,
          <>You want a ready-made automation to copy. This is the thinking, not the build.</>,
          <>
            You want someone else to work it out and build it. That is Strata's{" "}
            <Link to={AUDIT_HREF} className={linkClass}>Business Operations Audit</Link>, a different, larger engagement.
          </>,
          <>Several steps are broken and depend on each other. Talk to Strata instead.</>,
        ].map((item, index) => (
          <li key={index} className="flex gap-4 border-b border-line py-5">
            <span aria-hidden="true" className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </KitSection>

    {/* Section 8 */}
    <KitSection id="how-it-goes" heading="How it goes.">
      <NumberedCards items={howItGoes} columns="md:grid-cols-3" />
    </KitSection>

    {/* FAQ */}
    <KitSection id="faq" heading="FAQ" tone="surface2">
      <div className="grid gap-4 md:grid-cols-2">
        {faqs.map((faq) => (
          <div key={faq.question} className="rounded-2xl border border-border/50 bg-surface/50 p-6 md:p-8">
            <h3 className="mb-3 font-sans text-lg font-bold text-text md:text-xl">{faq.question}</h3>
            <p className="font-sans text-sm leading-relaxed text-muted md:text-base">{faq.answer}</p>
          </div>
        ))}
      </div>
    </KitSection>

    {/* Closing block */}
    <section aria-labelledby="kit-closing-heading" className="border-t border-line bg-surface px-5 py-20 sm:px-8 md:px-12 md:py-28">
      <div className="mx-auto max-w-4xl rounded-[32px] border border-gold/30 bg-surface2 px-6 py-14 text-center shadow-2xl shadow-gold/5 md:rounded-[48px] md:px-12 md:py-20">
        <h2
          id="kit-closing-heading"
          className="text-balance text-4xl font-black leading-[0.95] tracking-[-0.045em] text-primary md:text-6xl"
        >
          One price. No upsell.
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted md:text-lg">
          US$99. No bundle, no premium tier. Instant download once you pay. 14-day refund.
        </p>
        <div className="mt-10 flex justify-center">
          <BuyButton />
        </div>
        <p className="mt-10 font-mono text-[11px] font-bold uppercase leading-relaxed tracking-[0.16em] text-muted">
          Sold by Strata Growth Technologies through Gumroad.{" "}
          <Link to="/privacy" className="transition-colors hover:text-gold">Privacy</Link>
          {" · "}
          <Link to="/terms" className="transition-colors hover:text-gold">Terms</Link>
        </p>
      </div>
    </section>
  </div>
);
