import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

type Project = {
  title: string;
  category: string;
  description: string;
  tags: string[];
  cta: string;
  href: string;
  image: string;
  imageAlt: string;
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
  },
];

/**
 * Image component mimicking next/image for Vite environment
 */
const Image = ({
  src,
  alt,
  fill,
  className,
  onError,
}: {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  onError?: () => void;
}) => {
  return (
    <img
      src={src}
      alt={alt}
      className={cn(className, fill && "absolute inset-0 h-full w-full")}
      onError={onError}
    />
  );
};

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

const ProjectImage = ({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) => {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center bg-[#f0f0f0] p-6 text-center">
        <div className="mb-2 h-12 w-12 rounded-full bg-black/5 flex items-center justify-center">
          <div className="h-6 w-6 rounded-sm border-2 border-black/10" />
        </div>
        <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-black/30">
          Project preview unavailable
        </p>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={cn(
        "object-cover object-top transition-transform duration-700 group-hover:scale-[1.015]"
      )}
      onError={() => setError(true)}
    />
  );
};

const ProjectPreview = ({ project }: { project: Project }) => {
  return (
    <div className="relative w-full overflow-hidden rounded-[24px] border border-black/10 bg-[#f7f5ef] shadow-[0_30px_80px_-35px_rgba(0,0,0,0.35)]">
      {/* Browser Chrome */}
      <div className="flex h-10 items-center gap-2 border-b border-black/10 bg-[#f4f2ed] px-5">
        <div className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#ef6a5b]" />
          <span className="h-3 w-3 rounded-full bg-[#f3bd4f]" />
          <span className="h-3 w-3 rounded-full bg-[#61c454]" />
        </div>
        <div className="mx-auto h-3 w-32 md:w-40 rounded-full bg-white/80" />
      </div>

      {/* Main Preview Area with Responsive Height */}
      <div className="relative h-[300px] w-full overflow-hidden bg-black sm:h-[380px] lg:h-[430px]">
        <ProjectImage
          src={project.image}
          alt={project.imageAlt}
        />
      </div>
    </div>
  );
};

export const SelectedWork = () => {
  return (
    <section id="selected-work" className="relative border-b border-border/50 bg-background py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-14 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="text-[10px] font-mono tracking-[0.3em] text-muted uppercase mb-4">PORTFOLIO ARCHITECTURE</p>
            <h2 className="mb-6 font-black text-5xl uppercase leading-none tracking-[-0.04em] text-primary md:text-6xl">
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
            <ArrowUpRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 lg:gap-6">
          {projects.map((project, index) => {
            const isFirst = index === 0;
            const isLast = index === projects.length - 1;

            return (
              <article
                key={project.title}
                className={cn(
                  "bento-card group relative flex flex-col",
                  isFirst ? "md:col-span-4" : isLast ? "md:col-span-6" : "md:col-span-2"
                )}
              >
                <div className="mb-8 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-muted/60">
                  {project.category}
                </div>

                <div className="flex flex-col lg:flex-row gap-8 items-start">
                  <div className="flex-1">
                    <h3 className="mb-4 font-black text-2xl uppercase leading-tight tracking-[-0.03em] text-primary">
                      {project.title}
                    </h3>
                    <p className="mb-6 font-sans text-sm leading-relaxed text-muted max-w-sm">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-primary/5 bg-background px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-widest text-primary/60"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <a
                      href={project.href}
                      target={project.href === "#" ? undefined : "_blank"}
                      className="group/link inline-flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-widest text-primary hover:text-accent transition-colors"
                    >
                      <span>{project.cta}</span>
                      <ArrowUpRight size={12} className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    </a>
                  </div>

                  <div className={cn(
                    "relative w-full overflow-hidden rounded-xl border border-black/5 bg-background shadow-2xl transition-all duration-500 group-hover:scale-[1.02]",
                    isLast ? "lg:w-2/3 aspect-[16/9]" : "aspect-[4/3] lg:w-1/2"
                  )}>
                    <ProjectPreview project={project} />
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
