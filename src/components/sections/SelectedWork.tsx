import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "../ui/liquid-glass-button";

const EASE = [0.22, 1, 0.36, 1] as const;

type Project = {
  title: string;
  category: string;
  description: string;
  tags: string[];
  cta: string;
  href: string;
  image: string;
  imageAlt: string;
  urlLabel: string;
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
    image: "/work/jarmor-desktop.png",
    imageAlt: "J-Armor desktop brand website preview",
    urlLabel: "j-armor.net",
  },
  {
    title: "THUNDERFIX SERVICE WEBSITE",
    category: "SERVICE BUSINESS WEBSITE",
    description:
      "A repair business website built around trust, service clarity, branch discovery, Google/Waze navigation, and WhatsApp-led customer enquiries.",
    tags: ["Service Website", "Branch Flow", "Enquiry System"],
    cta: "View Project",
    href: "https://thunderfix.online",
    image: "/work/thunderfix-desktop.png",
    imageAlt: "Thunderfix desktop service website preview",
    urlLabel: "thunderfix.online",
  },
  {
    title: "ONE MOBILE ROS APP",
    category: "DIGITAL GROWTH SYSTEM",
    description:
      "An internal repair operations system that turns jobs, revenue, technician performance, attribution, and pipeline visibility into a clean owner dashboard.",
    tags: ["Operations Dashboard", "KPI Tracking", "Revenue Visibility"],
    cta: "View System",
    href: "#",
    image: "/work/One Mobile ROS Dashboard.png",
    imageAlt: "One Mobile ROS owner dashboard preview",
    urlLabel: "onemobile.app/ros",
  },
];

// ── Browser preview with chrome ─────────────────────────────────────────────

type ImageFit = "contain" | "cover";

interface ProjectPreviewProps {
  project: Project;
  imageFit?: ImageFit;
  imagePosition?: string;
}

const ProjectPreview = ({
  project,
  imageFit = "contain",
  imagePosition = "top",
}: ProjectPreviewProps) => {
  const [error, setError] = useState(false);

  return (
    <div className="relative w-full overflow-hidden rounded-[24px] border border-black/[0.09] bg-[#f7f7f8] shadow-[0_24px_72px_-16px_rgba(0,0,0,0.22)]">
      {/* Browser chrome */}
      <div className="flex h-11 items-center gap-3 border-b border-black/[0.07] bg-[#F2F2F4] px-5">
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
          <span className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
          <span className="h-3 w-3 rounded-full bg-[#28C840]" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="bg-white/80 border border-black/[0.07] rounded-md px-3 py-0.5 max-w-[200px] w-full flex items-center justify-center">
            <span className="text-[10px] font-mono text-muted/80 truncate">{project.urlLabel}</span>
          </div>
        </div>
        <div className="w-[54px] flex-shrink-0" />
      </div>

      {/* Screenshot */}
      <div className="relative w-full aspect-[16/10] bg-[#f5f5f7] overflow-hidden">
        {error ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#f0f0f0] p-6 text-center">
            <div className="mb-2 h-10 w-10 rounded-full bg-black/5 flex items-center justify-center">
              <div className="h-5 w-5 rounded-sm border-2 border-black/10" />
            </div>
            <p className="font-mono text-[9px] font-bold uppercase tracking-widest text-black/25">
              Preview unavailable
            </p>
          </div>
        ) : (
          <img
            src={project.image}
            alt={project.imageAlt}
            className="absolute inset-0 h-full w-full transition-transform duration-700 group-hover:scale-[1.012]"
            style={{
              objectFit: imageFit,
              objectPosition: imagePosition,
            }}
            onError={() => setError(true)}
          />
        )}
      </div>
    </div>
  );
};

// ── Section ──────────────────────────────────────────────────────────────────

export const SelectedWork = () => {
  return (
    <section
      id="selected-work"
      className="relative border-b border-border/50 bg-background py-24 md:py-32 scroll-mt-[80px]"
    >
      <div className="container mx-auto px-6 md:px-12">

        {/* Header */}
        <div className="mb-16 md:mb-24 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="text-[10px] font-mono tracking-[0.3em] text-muted uppercase mb-4">
              PORTFOLIO ARCHITECTURE
            </p>
            <h2 className="mb-5 font-black text-5xl md:text-6xl uppercase leading-none tracking-[-0.04em] text-primary">
              SELECTED WORK
            </h2>
            <p className="max-w-lg font-sans text-sm leading-relaxed text-muted md:text-base">
              Real digital architecture built across product brands, service businesses, and internal growth systems.
            </p>
          </div>
          <a
            href="#"
            className="group inline-flex w-fit items-center gap-2 border-b border-primary pb-1 font-mono text-[10px] font-bold uppercase tracking-widest text-primary transition-all duration-300 hover:gap-4"
          >
            <span>View All Projects</span>
            <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Project cards — stacked editorial layout */}
        <div className="flex flex-col gap-8 md:gap-10">
          {projects.map((project, index) => {
            const isEven = index % 2 === 0; // text left, preview right

            return (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: index * 0.06, ease: EASE }}
                className="group relative bg-white/80 backdrop-blur-xl border border-border/60 rounded-[36px] p-6 md:p-10 lg:p-12 shadow-[0_8px_40px_rgba(0,0,0,0.05)] hover:-translate-y-1 hover:shadow-[0_20px_64px_rgba(0,0,0,0.09)] transition-all duration-500 overflow-hidden"
              >
                {/* Inner grid: text + preview */}
                <div
                  className={`grid grid-cols-1 lg:grid-cols-[0.40fr_0.60fr] gap-8 lg:gap-12 items-start ${
                    !isEven ? "lg:[direction:rtl]" : ""
                  }`}
                >
                  {/* Text column */}
                  <div className={`flex flex-col justify-start ${!isEven ? "lg:[direction:ltr]" : ""}`}>
                    <p className="mb-4 font-mono text-[9px] font-bold uppercase tracking-[0.28em] text-muted/70">
                      {project.category}
                    </p>
                    <h3 className="mb-4 font-black text-2xl md:text-3xl uppercase leading-tight tracking-[-0.03em] text-primary">
                      {project.title}
                    </h3>
                    <p className="mb-6 font-sans text-sm md:text-base leading-relaxed text-muted max-w-sm">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-primary/[0.07] bg-background px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-widest text-primary/60"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    {project.href === "#" ? (
                      <Button
                        variant="liquidGhost"
                        size="sm"
                        className="w-fit font-mono text-[10px] font-bold uppercase tracking-widest cursor-default"
                        disabled
                      >
                        {project.cta}
                      </Button>
                    ) : (
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex"
                      >
                        <Button
                          variant="liquidLight"
                          size="sm"
                          className="font-mono text-[10px] font-bold uppercase tracking-widest gap-1.5"
                        >
                          {project.cta}
                          <ArrowUpRight size={12} />
                        </Button>
                      </a>
                    )}
                  </div>

                  {/* Preview column */}
                  <div className={`w-full ${!isEven ? "lg:[direction:ltr]" : ""}`}>
                    <ProjectPreview
                      project={project}
                      imageFit="contain"
                      imagePosition="top"
                    />
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
