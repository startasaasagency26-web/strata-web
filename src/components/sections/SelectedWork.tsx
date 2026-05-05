import { ArrowUpRight } from "lucide-react";

type ProjectVariant = "jarmor" | "thunderfix" | "ros";

type Project = {
  title: string;
  category: string;
  description: string;
  tags: string[];
  cta: string;
  href: string;
  variant: ProjectVariant;
};

const projects: Project[] = [
  {
    title: "J-ARMOR BRAND WEBSITE",
    category: "BRAND WEBSITE",
    description:
      "A product-led brand website built to communicate protection, quality, product clarity, and customer trust through a polished digital presence.",
    tags: ["Product Brand", "Trust Architecture", "Premium UI"],
    cta: "View Project",
    href: "https://www.j-armor.net",
    variant: "jarmor",
  },
  {
    title: "THUNDERFIX SERVICE WEBSITE",
    category: "SERVICE BUSINESS WEBSITE",
    description:
      "A repair business website built around trust, service clarity, branch discovery, Google/Waze navigation, and WhatsApp-led customer enquiries.",
    tags: ["Service Website", "Branch Flow", "Enquiry System"],
    cta: "View Project",
    href: "https://thunderfix.online",
    variant: "thunderfix",
  },
  {
    title: "ONE MOBILE ROS APP",
    category: "DIGITAL GROWTH SYSTEM",
    description:
      "An internal repair operations system that turns jobs, revenue, technician performance, attribution, and pipeline visibility into a clean owner dashboard.",
    tags: ["Operations Dashboard", "KPI Tracking", "Revenue Visibility"],
    cta: "View System",
    href: "#",
    variant: "ros",
  },
];

const BrowserChrome = ({ children }: { children: React.ReactNode }) => (
  <div className="relative w-full overflow-hidden rounded-[24px] border border-black/10 bg-[#f8f7f2] shadow-[0_30px_80px_-40px_rgba(0,0,0,0.35)]">
    <div className="flex h-11 items-center gap-2 border-b border-black/10 bg-[#f4f2ed] px-5">
      <span className="h-3 w-3 rounded-full bg-[#ef6a5b]" />
      <span className="h-3 w-3 rounded-full bg-[#f3bd4f]" />
      <span className="h-3 w-3 rounded-full bg-[#61c454]" />
      <div className="mx-auto h-3 w-40 rounded-full bg-white/80" />
    </div>
    {children}
  </div>
);

const JarmorPreview = () => (
  <BrowserChrome>
    <div className="relative min-h-[320px] overflow-hidden bg-[#050505] p-8 text-white">
      <div className="absolute right-8 top-8 rounded-full border border-[#bfa449]/40 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.25em] text-[#d2b45c]">
        Partner
      </div>

      <div className="relative z-10 max-w-[320px]">
        <div className="mb-10 text-4xl font-black tracking-tight text-[#d2b45c]">
          J-ARMOR
        </div>

        <div className="mb-6 inline-flex rounded-full border border-[#d2b45c]/30 bg-[#d2b45c]/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.25em] text-[#d2b45c]">
          Built to Protect
        </div>

        <h3 className="mb-6 text-5xl font-black leading-[0.92] tracking-tight">
          Protection.
          <br />
          <span className="italic text-[#d2b45c]">Precision.</span>
          <br />
          Scale.
        </h3>

        <p className="max-w-[280px] text-sm leading-relaxed text-white/60">
          Premium screen protection systems built for retail-ready application and trust.
        </p>
      </div>

      <div className="absolute bottom-8 right-8 h-44 w-36 rounded-[28px] border border-[#d2b45c]/20 bg-gradient-to-br from-[#1a1a1a] to-black shadow-2xl" />
      <div className="absolute bottom-0 left-0 h-px w-full bg-[#d2b45c]/30" />
    </div>
  </BrowserChrome>
);

const ThunderfixPreview = () => (
  <BrowserChrome>
    <div className="relative min-h-[320px] overflow-hidden bg-[#f5f1e8] p-8">
      <div className="mb-10 flex items-center justify-between">
        <div className="text-2xl font-black tracking-tight text-black">thunderFix</div>
        <div className="rounded-full bg-black px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-white">
          Repair Lab
        </div>
      </div>

      <div className="max-w-[420px]">
        <div className="mb-5 inline-flex rounded-full bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-black/50 shadow-sm">
          One of the best repair labs in the region
        </div>

        <h3 className="mb-6 text-5xl font-black leading-[0.9] tracking-tight text-black">
          Surgical Precision
          <br />
          <span className="text-black/35">For Your Tech</span>
        </h3>

        <p className="max-w-[380px] text-sm leading-relaxed text-black/55">
          Restore devices with service clarity, branch discovery, directions, and WhatsApp-led enquiries.
        </p>
      </div>

      <div className="absolute bottom-8 right-8 w-64 rounded-[22px] border border-black/10 bg-white p-5 shadow-2xl">
        <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-black/45">
          Branch Finder
        </div>
        <div className="mb-4 h-20 rounded-2xl bg-[#e6e1d6]" />
        <div className="flex gap-2">
          <div className="flex-1 rounded-full bg-black px-4 py-3 text-center text-[10px] font-bold uppercase tracking-widest text-white">
            WhatsApp
          </div>
          <div className="flex-1 rounded-full bg-[#d1ad5f] px-4 py-3 text-center text-[10px] font-bold uppercase tracking-widest text-white">
            Waze
          </div>
        </div>
      </div>
    </div>
  </BrowserChrome>
);

const RosPreview = () => (
  <BrowserChrome>
    <div className="relative min-h-[320px] overflow-hidden bg-[#f4f4f1] p-7">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-[0.24em] text-black/40">
            One Mobile ROS
          </div>
          <div className="mt-2 text-2xl font-black tracking-tight text-black">
            Owner Dashboard
          </div>
        </div>
        <div className="rounded-full bg-black px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-white">
          Live Ops
        </div>
      </div>

      <div className="mb-5 grid grid-cols-4 gap-3">
        {["Revenue", "Active Jobs", "Completed", "Close Rate"].map((label) => (
          <div key={label} className="rounded-2xl border border-black/10 bg-white p-4">
            <div className="mb-4 h-2 w-12 rounded-full bg-black/15" />
            <div className="mb-2 h-5 w-20 rounded bg-black/20" />
            <div className="text-[9px] font-bold uppercase tracking-[0.18em] text-black/35">
              {label}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-[1.25fr_0.75fr] gap-4">
        <div className="rounded-[22px] border border-black/10 bg-white p-5">
          <div className="mb-6 flex items-center justify-between">
            <div className="h-2 w-28 rounded-full bg-black/15" />
            <div className="h-5 w-14 rounded-full bg-black/5" />
          </div>
          <div className="flex h-32 items-end gap-2">
            {[35, 52, 42, 76, 61, 88, 57, 70, 48, 82].map((height, index) => (
              <div
                key={index}
                className="flex-1 rounded-t bg-black/15"
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {["Attribution", "Pipeline", "Technicians"].map((label) => (
            <div key={label} className="rounded-2xl border border-black/10 bg-white p-4">
              <div className="mb-3 text-[9px] font-bold uppercase tracking-[0.18em] text-black/35">
                {label}
              </div>
              <div className="space-y-2">
                <div className="h-2 rounded-full bg-black/15" />
                <div className="h-2 w-2/3 rounded-full bg-black/10" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </BrowserChrome>
);

const ProjectPreview = ({ variant }: { variant: ProjectVariant }) => {
  if (variant === "jarmor") return <JarmorPreview />;
  if (variant === "thunderfix") return <ThunderfixPreview />;
  return <RosPreview />;
};

export const SelectedWork = () => {
  return (
    <section id="work" className="relative border-b border-border/50 bg-background py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-14 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <h2 className="mb-6 font-display text-5xl font-bold uppercase leading-none tracking-tight text-primary md:text-6xl">
              SELECTED WORK
            </h2>
            <p className="max-w-lg font-sans text-sm leading-relaxed text-muted md:text-base">
              Real digital architecture built across product brands, service businesses, and internal growth systems.
            </p>
          </div>

          <a
            href="#"
            className="group inline-flex w-fit items-center gap-2 border-b border-primary pb-1 font-mono text-xs font-bold uppercase tracking-widest text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4"
          >
            <span>View All Projects</span>
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 motion-reduce:transition-none"
            />
          </a>
        </div>

        <div className="space-y-10 md:space-y-16">
          {projects.map((project, index) => {
            const reverse = index % 2 === 1;

            return (
              <article
                key={project.title}
                className="group overflow-hidden rounded-[32px] border border-border/50 bg-surface shadow-[0_24px_80px_-60px_rgba(0,0,0,0.45)] transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/20 hover:shadow-[0_34px_90px_-55px_rgba(0,0,0,0.5)] motion-reduce:transform-none motion-reduce:transition-none"
              >
                <div
                  className={[
                    "grid min-h-[520px] grid-cols-1 lg:grid-cols-[1.35fr_0.65fr]",
                    reverse ? "lg:grid-cols-[0.65fr_1.35fr]" : "",
                  ].join(" ")}
                >
                  <div
                    className={[
                      "relative flex items-center justify-center overflow-hidden bg-[#e9e8e4] p-6 md:p-10 lg:p-12",
                      reverse ? "lg:order-2" : "",
                    ].join(" ")}
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.9),rgba(255,255,255,0)_55%)]" />
                    <div className="relative w-full transition-transform duration-500 group-hover:scale-[1.01] motion-reduce:transition-none">
                      <ProjectPreview variant={project.variant} />
                    </div>
                  </div>

                  <div className="flex flex-col justify-center bg-white p-8 md:p-12">
                    <div className="mb-8 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-muted/70">
                      {project.category}
                    </div>

                    <h3 className="mb-6 max-w-sm font-display text-3xl font-bold uppercase leading-[0.95] tracking-tight text-primary md:text-4xl">
                      {project.title}
                    </h3>

                    <p className="mb-8 max-w-sm font-sans text-sm leading-relaxed text-muted md:text-base">
                      {project.description}
                    </p>

                    <div className="mb-10 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-border/70 bg-surface px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-widest text-primary/65 transition-colors group-hover:border-primary/20 group-hover:text-primary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto border-t border-border/60 pt-8">
                      <a
                        href={project.href}
                        target={project.href === "#" ? undefined : "_blank"}
                        rel={project.href === "#" ? undefined : "noreferrer"}
                        className="group/link inline-flex items-center gap-4 font-mono text-xs font-bold uppercase tracking-widest text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4"
                      >
                        <span>{project.cta}</span>
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-surface text-primary transition-all duration-300 group-hover/link:bg-primary group-hover/link:text-white">
                          <ArrowUpRight
                            size={17}
                            className="transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 motion-reduce:transition-none"
                          />
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
