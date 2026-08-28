import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { WhatsAppChoice } from "../components/WhatsAppChoice";
import { cn } from "../lib/utils";
import { Seo } from "../components/Seo";

export const About = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="flex flex-col pt-32 md:pt-40">
      <Seo
        title="About Strata | Business Systems Built Around Real Work"
        description="Founded in mid-2025, Strata delivers Revenue Systems engagements for growing businesses today while shaping the in-development Strata Core platform with design partners."
        path="/about"
      />
      {/* SECTION 1 — HERO */}
      <section className="relative px-5 pb-20 sm:px-8 md:px-12 lg:pb-32">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
          >
            <span className="mb-4 block font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-muted">
              ABOUT STRATA
            </span>
            <h1 className="mb-8 text-5xl font-black leading-[1.1] tracking-[-0.04em] text-text md:text-7xl lg:text-8xl">
              Business systems built around how work really happens
            </h1>
            <p className="mb-10 max-w-xl text-lg leading-relaxed text-muted md:text-xl">
              Founded in mid-2025, Strata delivers Revenue Systems engagements for growing businesses today while shaping the in-development Strata Core platform with design partners.
            </p>
            <div className="flex flex-wrap gap-4">
              <WhatsAppChoice source="about / hero" className="group relative flex h-14 items-center justify-center overflow-hidden rounded-full bg-gold px-8 text-sm font-bold uppercase tracking-widest text-void transition-colors hover:bg-goldHover active:bg-goldActive active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-focusOffset">
                <span className="relative z-10">Book Revenue Audit</span>
              </WhatsAppChoice>
              <Link to="/about#selected-work" className="group relative flex h-14 items-center justify-center overflow-hidden rounded-full border border-gold/10 bg-surface px-8 text-sm font-bold uppercase tracking-widest text-text transition-all hover:bg-gold/5 active:scale-95">
                <span className="relative z-10">View Selected Work</span>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.8, delay: shouldReduceMotion ? 0 : 0.2 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-[32px] border border-gold/5 bg-surface2 p-4 shadow-2xl">
              <div className="aspect-[3/4] overflow-hidden rounded-[24px]">
                <img
                  src="/founder.jpg"
                  alt="Amirul Afiz / Nick"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="mt-6 flex flex-col items-center text-center">
                <span className="text-sm font-bold uppercase tracking-widest text-text">
                  Amirul Afiz / Nick
                </span>
                <span className="mt-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
                  Founder, Strata Agency
                </span>
              </div>
            </div>
            {/* Subtle credential label */}
            <div className="absolute -bottom-4 -right-4 rounded-2xl bg-gold p-4 text-void shadow-xl lg:right-4">
              <div className="font-mono text-[8px] font-bold uppercase tracking-widest opacity-60">
                Founder Role
              </div>
              <div className="mt-1 text-xs font-bold uppercase tracking-wider">
                Revenue Systems Architect
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2 — ORIGIN STORY */}
      <section className="bg-surface px-5 py-24 sm:px-8 md:px-12 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
          >
            <div className="mb-8 flex items-center gap-4">
              <span className="rounded-full bg-gold/5 px-4 py-1.5 font-mono text-[10px] font-bold uppercase tracking-widest text-text/60">
                Founded in Mid-2025
              </span>
            </div>
            <h2 className="mb-10 text-4xl font-black tracking-[-0.03em] text-text md:text-5xl lg:text-6xl">
              Built From Real Business Operations, Not Theory
            </h2>
            <div className="space-y-6 text-lg leading-relaxed text-text/60 md:text-xl">
              <p>
                Strata was founded in mid-2025 after seeing the same problem across too many small and medium businesses: they were generating attention, but had no system to capture it, follow up on it, or convert it.
              </p>
              <p>
                The pieces existed in isolation — a website, a WhatsApp inbox, some content, sometimes ads — but nothing connected them. Enquiries arrived and quietly disappeared, and nobody could see where.
              </p>
              <p className="font-bold text-text">
                Strata was built to solve that gap.
              </p>
              <p>
                We build the revenue infrastructure behind the business: lead capture, CRM structure, automated follow-up, and reporting owners can actually see and run.
              </p>
            </div>
          </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — FOUNDER SECTION */}
      <section className="px-5 py-24 sm:px-8 md:px-12 lg:py-32">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 lg:grid-cols-2 lg:items-start">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
          >
            <span className="mb-4 block font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-muted">
              FOUNDER-LED
            </span>
            <h2 className="mb-8 text-4xl font-black tracking-tight text-text md:text-5xl lg:text-6xl">
              Led by Amirul Afiz, Built for Practical Execution
            </h2>
            <div className="space-y-6 text-lg leading-relaxed text-text/60">
              <p>
                Amirul Afiz, also known as Nick, is the founder of Strata. His work combines lead capture, CRM structure, follow-up automation, media execution, and practical business operations.
              </p>
              <p>
                Strata’s approach is shaped by hands-on experience building for service businesses, local brands, e-commerce, and internal systems — not just designing pages that look good.
              </p>
              <p>
                The goal is simple: build a system that makes the business easier to trust, easier to understand, and easier to buy from — and that stops losing leads on the way there.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.6, delay: shouldReduceMotion ? 0 : 0.2 }}
            className="rounded-[32px] border border-gold/10 bg-surface p-8 shadow-xl lg:p-12"
          >
            <h3 className="mb-8 text-xl font-bold uppercase tracking-widest text-text">
              Founder Highlights
            </h3>
            <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {[
                "Lead capture pages and enquiry forms",
                "CRM pipeline setup and lead stages",
                "WhatsApp and email follow-up automation",
                "Reporting and lead-flow visibility",
                "Landing pages and sales pages",
                "Mobile responsive build standards",
                "Technical SEO foundations",
                "Short-form content and paid media systems",
                "AI-assisted content and workflow systems",
                "Business operations and customer journey systems",
              ].map((highlight) => (
                <li key={highlight} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-text" />
                  <span className="text-sm font-medium leading-tight text-text/70">
                    {highlight}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3.5 — SALES SPECIALIST SECTION */}
      <section className="bg-surface px-5 py-24 sm:px-8 md:px-12 lg:py-32">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.8 }}
            className="order-1 lg:order-1 relative"
          >
            <div className="relative overflow-hidden rounded-[32px] border border-gold/5 bg-surface p-4 shadow-2xl">
              <div className="aspect-[3/4] overflow-hidden rounded-[24px]">
                <img
                  src="/Khai.jpeg"
                  alt="Khairul Azril - Sales Specialist & Manager"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="mt-6 flex flex-col items-center text-center px-4 pb-4">
                <span className="text-sm font-bold uppercase tracking-widest text-text">
                  Khairul Azril
                </span>
                <span className="mt-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
                  Sales Specialist & Manager
                </span>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                   {["Client Communication", "Sales Strategy", "Follow-Up"].map((skill) => (
                     <span key={skill} className="rounded-full bg-gold/5 px-3 py-1 text-[8px] font-bold uppercase tracking-wider text-text/60">
                       {skill}
                     </span>
                   ))}
                </div>
              </div>
            </div>
            {/* Credibility Badge */}
            <div className="absolute -top-4 -left-4 rounded-2xl bg-gold p-4 text-void shadow-xl lg:left-4">
              <div className="font-mono text-[8px] font-bold uppercase tracking-widest opacity-60">
                Credibility
              </div>
              <div className="mt-1 text-xs font-bold uppercase tracking-wider">
                10+ Years Experience
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.6, delay: shouldReduceMotion ? 0 : 0.2 }}
            className="order-2 lg:order-2"
          >
            <span className="mb-4 block font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-muted">
              CLIENT RELATIONSHIPS
            </span>
            <h2 className="mb-8 text-4xl font-black tracking-tight text-text md:text-5xl lg:text-6xl">
              Sales Guidance Backed by Real Customer Experience
            </h2>
            <p className="mb-10 text-lg leading-relaxed text-text/60">
              Khairul Azril supports Strata as a Sales Specialist & Manager, bringing over 10 years of frontline sales, customer service, telemarketing, store operations, and team supervision experience. His role is to help business owners feel understood, clarify what they actually need, and guide them toward the right digital solution without confusion or pressure.
            </p>
            
            <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2">
              {[
                {
                  title: "10+ Years Experience",
                  desc: "In customer-facing sales and service roles across multiple industries."
                },
                {
                  title: "Skilled Communicator",
                  desc: "Expert in prospect communication, follow-up, and objection handling."
                },
                {
                  title: "Solution Oriented",
                  desc: "Translates business pain points into clear website and system requirements."
                },
                {
                  title: "Multilingual Support",
                  desc: "Fluent in English, Bahasa Melayu, and Mandarin for diverse Malaysian businesses."
                }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/5 text-text">
                    <CheckCircle2 size={14} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-tight text-text">{item.title}</h4>
                    <p className="mt-1 text-xs leading-relaxed text-text/50">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-[32px] border border-gold/5 bg-surface2 p-8 lg:p-10">
              <p className="mb-8 text-sm font-medium italic text-text/70">
                "Speak with a team that understands both revenue systems and real customer conversations."
              </p>
              <WhatsAppChoice source="about / sales" className="group relative flex h-14 items-center justify-center overflow-hidden rounded-full bg-gold px-8 text-sm font-bold uppercase tracking-widest text-void transition-colors hover:bg-goldHover active:bg-goldActive active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-focusOffset">
                <span className="relative z-10">Request Diagnosis</span>
              </WhatsAppChoice>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 4 — WHAT STRATA BUILDS */}
      <section className="px-5 py-24 sm:px-8 md:px-12 lg:py-32">
        <div className="mx-auto max-w-7xl">
        <div className="mb-16">
          <span className="mb-4 block font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-muted text-center lg:text-left">
            CAPABILITIES
          </span>
          <h2 className="mb-4 text-4xl font-black tracking-[-0.03em] text-text text-center md:text-5xl lg:text-6xl lg:text-left">
            Revenue Infrastructure and Growth Media Systems
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:grid-rows-2 lg:gap-6">
          {[
            {
              title: "Revenue System Design",
              desc: "We map the customer journey, commercial handoffs, owners and controls before tools are configured.",
              className: "md:col-span-2 md:row-span-1",
              icon: <div className="h-6 w-6 rounded-md border-2 border-gold/20" />
            },
            {
              title: "Lead Capture Infrastructure",
              desc: "We build pages and forms that turn attention into structured enquiries with a clear next destination.",
              className: "md:col-span-2 md:row-span-1",
              icon: <div className="h-6 w-6 rounded-full border-2 border-gold/20" />
            },
            {
              title: "Follow-Up Operations",
              desc: "We configure ownership, reminders and approved communication flows so next actions do not depend on memory.",
              className: "md:col-span-2 md:row-span-1",
              icon: <div className="h-6 w-6 rotate-45 border-2 border-gold/20" />
            },
            {
              title: "Growth Media Execution",
              desc: "We create and manage the content and paid-media work that feeds the revenue system, with reporting owners can read.",
              className: "md:col-span-2 md:row-span-1",
              icon: <div className="h-6 w-6 rounded-lg bg-gold/5 flex items-center justify-center"><div className="h-2 w-2 rounded-full bg-gold/20" /></div>
            },
          ].map((card, idx) => (
            <motion.div
              key={card.title}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: shouldReduceMotion ? 0 : idx * 0.1 }}
              className={cn(
                "group flex flex-col justify-between rounded-[28px] border border-border/60 bg-surface p-8",
                card.className
              )}
            >
              <div>
                <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-background transition-colors group-hover:bg-gold group-hover:text-void">
                   {card.icon}
                </div>
                <h3 className="mb-4 text-xl font-bold uppercase tracking-tight text-text">
                  {card.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted">
                  {card.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
        </div>
      </section>

      {/* SECTION 5 — PORTFOLIO PROOF */}
      <section id="selected-work" className="scroll-mt-[var(--section-scroll-offset)] px-5 py-24 sm:px-8 md:px-12 lg:py-32">
        <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <span className="mb-4 block font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-muted">
            SELECTED WORK
          </span>
          <h2 className="text-4xl font-black tracking-tight text-text md:text-5xl lg:text-6xl">
            Real Projects Across Brand, Service, and Operations
          </h2>
        </div>

        <div className="mx-auto max-w-6xl space-y-4">
          {[
            {
              name: "J-ARMOR",
              description: "Product positioning and digital conversion funnel.",
              href: "https://www.j-armor.net",
            },
            {
              name: "J-ARMOR SHOP",
              description: "E-commerce revenue engine and product sales system.",
              href: "https://www.j-armor.shop",
            },
            {
              name: "THUNDERFIX",
              description: "Service business lead capture and conversion infrastructure.",
              href: "https://www.thunderfix.online",
            },
            {
              name: "ONESPECIALIST",
              description: "Local service lead generation and enquiry routing system.",
              href: "https://www.onespecialist.my",
            },
            {
              name: "1MOBILE ROS",
              description: "Internal repair operations and CRM workflow system.",
              href: null,
              badge: "INTERNAL INFRASTRUCTURE",
            },
          ].map((project, idx) => {
            const isLinked = Boolean(project.href);
            
            const content = (
              <div className="flex w-full items-center justify-between px-8 py-6">
                <div>
                  <h4 className="text-sm font-bold tracking-widest text-text">
                    {project.name}
                  </h4>
                  <p className="mt-1 text-xs text-text/50">
                    {project.description}
                  </p>
                </div>
                
                {isLinked ? (
                  <ArrowUpRight className="h-5 w-5 text-text/20 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-gold group-focus-visible:translate-x-1 group-focus-visible:-translate-y-1" />
                ) : (
                  <span className="rounded-full bg-gold/5 px-3 py-1 font-mono text-[8px] font-bold uppercase tracking-widest text-muted">
                    {project.badge}
                  </span>
                )}
              </div>
            );

            const commonClasses = "flex items-center justify-between rounded-2xl border border-gold/5 bg-surface transition-all duration-300 outline-none";

            return isLinked ? (
              <motion.a
                key={project.name}
                href={project.href!}
                target="_blank"
                rel="noopener noreferrer"
                initial={shouldReduceMotion ? false : { opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: shouldReduceMotion ? 0 : idx * 0.1 }}
                className={cn(
                  commonClasses,
                  "group block hover:bg-surface3 hover:shadow-md hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-focus focus-visible:border-gold/20"
                )}
                aria-label={`Open ${project.name} website in a new tab`}
              >
                {content}
              </motion.a>
            ) : (
              <motion.article
                key={project.name}
                initial={shouldReduceMotion ? false : { opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: shouldReduceMotion ? 0 : idx * 0.1 }}
                className={commonClasses}
                aria-label={`${project.name} is an internal system project`}
              >
                {content}
              </motion.article>
            );
          })}
        </div>
        </div>
      </section>

      {/* SECTION 6 — PROCESS OVERVIEW */}
      <section className="mx-2 rounded-[32px] border border-gold/30 bg-surface2 px-5 py-24 text-text shadow-2xl shadow-gold/5 sm:px-8 md:mx-6 md:px-12 lg:py-32">
        <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-muted">
              OUR PROCESS
            </p>
            <h2 className="text-4xl font-black uppercase tracking-tight text-text md:text-5xl lg:text-6xl">
              HOW WE BUILD YOUR INFRASTRUCTURE.
            </h2>
          </div>
          <p className="max-w-md text-xs font-mono uppercase text-muted">
            A structured execution flow designed to eliminate revenue leakage and build scalable sales operations.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              step: "Step 1",
              title: "System Diagnosis",
              desc: "We audit lead intake, enquiry handling, WhatsApp response times, and follow-up leakage to identify revenue bottlenecks.",
            },
            {
              step: "Step 2",
              title: "Infrastructure Design",
              desc: "We design intake, ownership, handoffs, approval rules and staff notification points around the real workflow.",
            },
            {
              step: "Step 3",
              title: "System Implementation",
              desc: "We implement the agreed tools, workflows, communication steps and reporting structure as a scoped service engagement.",
            },
            {
              step: "Step 4",
              title: "Revenue Optimization",
              desc: "We refine content angles, paid ad campaigns, conversion flows, and team execution to maximize deal throughput.",
            },
          ].map((step, idx) => (
            <motion.div
              key={step.title}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: shouldReduceMotion ? 0 : idx * 0.1 }}
              className="relative flex flex-col pt-8"
            >
              <div className="mb-6 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
                {step.step}
              </div>
              <h3 className="mb-4 text-xl font-bold uppercase tracking-tight">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted">
                {step.desc}
              </p>
              {idx < 3 && (
                <div className="absolute right-0 top-10 hidden h-px w-full bg-border lg:block" />
              )}
            </motion.div>
          ))}
        </div>
        </div>
      </section>

      {/* SECTION 7 — BELIEF SECTION */}
      <section className="px-5 py-24 text-center sm:px-8 md:px-12 lg:py-32">
        <div className="mx-auto max-w-7xl">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.8 }}
          className="mx-auto max-w-4xl"
        >
          <h2 className="mb-10 text-4xl font-black tracking-tight text-text md:text-5xl lg:text-7xl">
            A Business System Should Produce Revenue, Not Administrative Drag.
          </h2>
          <div className="space-y-6 text-lg leading-relaxed text-text/60 md:text-xl">
            <p>
              Strata believes digital systems should not be isolated brochures or static websites. They must function as active revenue infrastructure.
            </p>
            <p>
              A complete system ensures every inbound enquiry is captured, qualified, assigned, and followed up without relying on manual memory.
            </p>
            <p className="font-bold text-text">
              That is the execution standard behind every Strata install.
            </p>
          </div>
        </motion.div>
        </div>
      </section>

      {/* SECTION 8 — FINAL CTA */}
      <section className="px-5 pb-24 sm:px-8 md:px-12 lg:pb-32">
        <div className="mx-auto max-w-7xl">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.8 }}
          className="relative overflow-hidden rounded-[48px] border border-gold/30 bg-surface2 px-8 py-20 text-center text-text shadow-[0_0_80px_rgb(var(--gold)/0.08)] lg:py-32"
        >
          {/* Subtle ambient radial glow behind text */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/5 blur-[120px]" />

          <div className="relative z-10 mx-auto max-w-4xl">
            <div className="relative mb-8">
              {/* Glow layer duplicate */}
              <div
                aria-hidden="true"
                className="absolute inset-0 flex items-center justify-center text-center font-display text-4xl font-black uppercase leading-[1.1] tracking-tight text-muted blur-2xl md:text-5xl lg:text-7xl"
              >
                Ready to Stop Leaking Revenue?
              </div>

              {/* Main Headline with text-shadow */}
              <motion.h2 
                animate={shouldReduceMotion ? undefined : { opacity: [0.9, 1, 0.9] }}
                transition={shouldReduceMotion ? undefined : {
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative z-10 font-display text-4xl font-black uppercase leading-[1.1] tracking-tight text-text drop-shadow-[0_0_18px_rgb(var(--gold)/0.25)] md:text-5xl lg:text-7xl"
              >
                Ready to Stop Leaking Revenue?
              </motion.h2>
            </div>

            <p className="mb-12 text-lg text-muted md:text-xl">
              Request a Strata diagnosis and we’ll show you where leads are being lost between attention, capture, and follow-up.
            </p>
            
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <WhatsAppChoice source="about / final-cta" className="group relative flex h-16 w-full items-center justify-center overflow-hidden rounded-full bg-surface px-10 text-sm font-bold uppercase tracking-widest text-text transition-transform active:scale-95 sm:w-auto">
                <span className="relative z-10">Request Diagnosis</span>
              </WhatsAppChoice>
              <Link to="/about#selected-work" className="group relative flex h-16 w-full items-center justify-center overflow-hidden rounded-full border border-border px-10 text-sm font-bold uppercase tracking-widest text-text transition-all hover:bg-surface3 active:scale-95 sm:w-auto">
                <span className="relative z-10">View Selected Work</span>
              </Link>
            </div>
          </div>

          {/* Background decorative elements */}
          <div className="absolute -left-1/4 -top-1/4 h-[600px] w-[600px] rounded-full bg-gold/5 blur-[120px]" />
          <div className="absolute -right-1/4 -bottom-1/4 h-[600px] w-[600px] rounded-full bg-gold/5 blur-[120px]" />
        </motion.div>
        </div>
      </section>
    </div>
  );
};
