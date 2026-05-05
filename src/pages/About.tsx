import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

export const About = () => {
  return (
    <div className="flex flex-col">
      {/* SECTION 1 — HERO */}
      <section className="relative px-6 py-20 lg:px-20 lg:py-32">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="mb-4 block font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-primary/40">
              ABOUT STRATA
            </span>
            <h1 className="mb-8 text-5xl font-black leading-[1.1] tracking-tight text-primary md:text-7xl lg:text-8xl">
              Digital Architecture Built for Real Business Growth
            </h1>
            <p className="mb-10 max-w-xl text-lg leading-relaxed text-primary/60 md:text-xl">
              Founded in mid-2025, Strata is a founder-led digital architecture studio helping Malaysian SMEs build websites, service platforms, and web systems that create trust, clarify offers, and capture better enquiries.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="group relative flex h-14 items-center justify-center overflow-hidden rounded-full bg-primary px-8 text-sm font-bold uppercase tracking-widest text-white transition-transform active:scale-95">
                <span className="relative z-10">Book a Strategy Call</span>
              </button>
              <Link to="/#selected-work" className="group relative flex h-14 items-center justify-center overflow-hidden rounded-full border border-primary/10 bg-white px-8 text-sm font-bold uppercase tracking-widest text-primary transition-all hover:bg-primary/5 active:scale-95">
                <span className="relative z-10">View Selected Work</span>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-[32px] border border-primary/5 bg-[#f8f7f2] p-4 shadow-2xl">
              <div className="aspect-[3/4] overflow-hidden rounded-[24px]">
                <img
                  src="/founder.jpg"
                  alt="Amirul Afiz / Nick"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="mt-6 flex flex-col items-center text-center">
                <span className="text-sm font-bold uppercase tracking-widest text-primary">
                  Amirul Afiz / Nick
                </span>
                <span className="mt-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-primary/40">
                  Founder, Strata Agency
                </span>
              </div>
            </div>
            {/* Subtle credential label */}
            <div className="absolute -bottom-4 -right-4 rounded-2xl bg-primary p-4 text-white shadow-xl lg:right-4">
              <div className="font-mono text-[8px] font-bold uppercase tracking-widest opacity-60">
                Founder Role
              </div>
              <div className="mt-1 text-xs font-bold uppercase tracking-wider">
                Digital Architect
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2 — ORIGIN STORY */}
      <section className="bg-[#fcfbf9] px-6 py-24 lg:px-20 lg:py-32">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-8 flex items-center gap-4">
              <span className="rounded-full bg-primary/5 px-4 py-1.5 font-mono text-[10px] font-bold uppercase tracking-widest text-primary/60">
                Founded in Mid-2025
              </span>
            </div>
            <h2 className="mb-10 text-4xl font-black tracking-tight text-primary md:text-5xl lg:text-6xl">
              Built From Real Business Operations, Not Theory
            </h2>
            <div className="space-y-6 text-lg leading-relaxed text-primary/60 md:text-xl">
              <p>
                Strata was founded in mid-2025 after seeing the same problem across too many small and medium businesses: their websites existed, but they did not actually support the business.
              </p>
              <p>
                Many sites looked decent on the surface, but failed where it mattered — unclear offers, weak trust signals, poor mobile experience, no clear customer journey, and no practical lead capture structure.
              </p>
              <p className="font-bold text-primary">
                Strata was built to solve that gap.
              </p>
              <p>
                We design and build digital foundations that connect brand presentation with real business outcomes: enquiries, clarity, customer confidence, and operational flow.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3 — FOUNDER SECTION */}
      <section className="px-6 py-24 lg:px-20 lg:py-32">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="mb-4 block font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-primary/40">
              FOUNDER-LED
            </span>
            <h2 className="mb-8 text-4xl font-black tracking-tight text-primary md:text-5xl lg:text-6xl">
              Led by Amirul Afiz, Built for Practical Execution
            </h2>
            <div className="space-y-6 text-lg leading-relaxed text-primary/60">
              <p>
                Amirul Afiz, also known as Nick, is the founder of Strata and a conversion-focused business website builder. His work combines website design, customer journey structure, AI-assisted workflows, and practical business operations.
              </p>
              <p>
                Strata’s approach is shaped by hands-on experience building for service businesses, local brands, e-commerce, and internal systems — not just designing pages that look good.
              </p>
              <p>
                The goal is simple: build digital assets that make the business easier to trust, easier to understand, and easier to buy from.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-[32px] border border-primary/10 bg-white p-8 shadow-xl lg:p-12"
          >
            <h3 className="mb-8 text-xl font-bold uppercase tracking-widest text-primary">
              Founder Highlights
            </h3>
            <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {[
                "Business website development",
                "Service business websites",
                "E-commerce website building",
                "Landing pages and sales pages",
                "Website redesign and optimization",
                "Mobile responsive design",
                "Basic SEO setup",
                "Lead capture and contact forms",
                "AI-assisted content and workflow systems",
                "Business operations and customer journey systems",
              ].map((highlight) => (
                <li key={highlight} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-primary" />
                  <span className="text-sm font-medium leading-tight text-primary/70">
                    {highlight}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* SECTION 4 — WHAT STRATA BUILDS */}
      <section className="bg-[#f4f2ed] px-6 py-24 lg:px-20 lg:py-32">
        <div className="mb-16">
          <span className="mb-4 block font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-primary/40 text-center lg:text-left">
            CAPABILITIES
          </span>
          <h2 className="mb-4 text-4xl font-black tracking-tight text-primary text-center md:text-5xl lg:text-6xl lg:text-left">
            Websites, Platforms, and Systems With Structure
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Business Websites",
              desc: "Clean, conversion-focused websites built to explain your offer, build trust, and guide visitors toward enquiry.",
            },
            {
              title: "Service Business Platforms",
              desc: "Websites for repair shops, local services, clinics, consultants, and operators that need clear service flow, location visibility, and customer action.",
            },
            {
              title: "E-Commerce Experiences",
              desc: "Product-led websites and stores designed around product clarity, customer education, and online sales.",
            },
            {
              title: "AI-Assisted Workflow Systems",
              desc: "Practical web systems and AI-assisted workflows that improve content planning, internal operations, customer handling, and business productivity.",
            },
          ].map((card, idx) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group flex flex-col justify-between rounded-[32px] border border-primary/5 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              <div>
                <div className="mb-6 h-12 w-12 rounded-2xl bg-primary/5 flex items-center justify-center transition-colors group-hover:bg-primary group-hover:text-white">
                   <div className="h-6 w-6 rounded-md border-2 border-current opacity-30" />
                </div>
                <h3 className="mb-4 text-xl font-bold uppercase tracking-tight text-primary">
                  {card.title}
                </h3>
                <p className="text-sm leading-relaxed text-primary/60">
                  {card.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 5 — PORTFOLIO PROOF */}
      <section className="px-6 py-24 lg:px-20 lg:py-32">
        <div className="mb-16 text-center">
          <span className="mb-4 block font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-primary/40">
            SELECTED WORK
          </span>
          <h2 className="text-4xl font-black tracking-tight text-primary md:text-5xl lg:text-6xl">
            Real Projects Across Brand, Service, and Operations
          </h2>
        </div>

        <div className="mx-auto max-w-6xl space-y-4">
          {[
            {
              title: "J-ARMOR",
              desc: "Brand website for product positioning and customer education.",
            },
            {
              title: "J-ARMOR SHOP",
              desc: "E-commerce product store built for online sales.",
            },
            {
              title: "THUNDERFIX",
              desc: "Service business website with modern layout, trust structure, and conversion-focused customer flow.",
            },
            {
              title: "ONESPECIALIST",
              desc: "Local service website structured for lead generation.",
            },
            {
              title: "1MOBILE ROS",
              desc: "Operational web system / dashboard built around repair business visibility, workflow, and customer flow.",
            },
          ].map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex items-center justify-between rounded-2xl border border-primary/5 bg-[#fcfbf9] px-8 py-6 transition-all hover:bg-white hover:shadow-md"
            >
              <div>
                <h4 className="text-sm font-bold tracking-widest text-primary">
                  {project.title}
                </h4>
                <p className="mt-1 text-xs text-primary/50">
                  {project.desc}
                </p>
              </div>
              <ArrowUpRight className="h-5 w-5 text-primary/20 transition-all hover:text-primary" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 6 — STRATA APPROACH */}
      <section className="bg-primary px-6 py-24 text-white lg:px-20 lg:py-32">
        <div className="mb-16">
          <span className="mb-4 block font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">
            THE STRATA METHOD
          </span>
          <h2 className="text-4xl font-black tracking-tight text-white md:text-5xl lg:text-6xl">
            Not Decoration. Structure.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              step: "Step 1",
              title: "Clarify the Business",
              desc: "We define the offer, audience, trust gaps, customer journey, and conversion goal before design begins.",
            },
            {
              step: "Step 2",
              title: "Architect the Pages",
              desc: "We structure the website around clarity, proof, service flow, mobile experience, and enquiry action.",
            },
            {
              step: "Step 3",
              title: "Build the Digital Asset",
              desc: "We develop a clean, responsive, performance-conscious website or system that supports the business.",
            },
            {
              step: "Step 4",
              title: "Optimize the Customer Path",
              desc: "We refine calls-to-action, lead capture, SEO basics, content flow, and customer decision points.",
            },
          ].map((step, idx) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative flex flex-col pt-8"
            >
              <div className="mb-6 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                {step.step}
              </div>
              <h3 className="mb-4 text-xl font-bold uppercase tracking-tight">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-white/60">
                {step.desc}
              </p>
              {idx < 3 && (
                <div className="absolute right-0 top-10 hidden h-px w-full bg-white/10 lg:block" />
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 7 — BELIEF SECTION */}
      <section className="px-6 py-24 text-center lg:px-20 lg:py-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-4xl"
        >
          <h2 className="mb-10 text-4xl font-black tracking-tight text-primary md:text-5xl lg:text-7xl">
            A Website Should Not Just Exist. It Should Work.
          </h2>
          <div className="space-y-6 text-lg leading-relaxed text-primary/60 md:text-xl">
            <p>
              Strata believes a website is not just a digital brochure. It is part of the business system.
            </p>
            <p>
              A strong website should make people understand what you do, why they should trust you, how to take action, and what makes your business different.
            </p>
            <p className="font-bold text-primary">
              That is the standard behind every Strata build.
            </p>
          </div>
        </motion.div>
      </section>

      {/* SECTION 8 — FINAL CTA */}
      <section className="px-6 pb-24 lg:px-20 lg:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-[48px] bg-primary px-8 py-20 text-center text-white lg:py-32"
        >
          <div className="relative z-10 mx-auto max-w-3xl">
            <h2 className="mb-8 text-4xl font-black tracking-tight md:text-5xl lg:text-7xl leading-tight">
              Ready to Build a Digital Foundation That Supports Your Business?
            </h2>
            <p className="mb-12 text-lg text-white/60 md:text-xl">
              Book a Strata strategy call and we’ll help clarify the right website, platform, or system for your business stage.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button className="group relative flex h-16 w-full items-center justify-center overflow-hidden rounded-full bg-white px-10 text-sm font-bold uppercase tracking-widest text-primary transition-transform active:scale-95 sm:w-auto">
                <span className="relative z-10">Book a Strategy Call</span>
              </button>
              <Link to="/#selected-work" className="group relative flex h-16 w-full items-center justify-center overflow-hidden rounded-full border border-white/20 px-10 text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-white/10 active:scale-95 sm:w-auto">
                <span className="relative z-10">View Selected Work</span>
              </Link>
            </div>
          </div>

          {/* Background decorative elements */}
          <div className="absolute -left-1/4 -top-1/4 h-[600px] w-[600px] rounded-full bg-white/5 blur-[120px]" />
          <div className="absolute -right-1/4 -bottom-1/4 h-[600px] w-[600px] rounded-full bg-white/5 blur-[120px]" />
        </motion.div>
      </section>
    </div>
  );
};
