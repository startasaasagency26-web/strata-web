import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

type ProjectPreviewType = "desktop" | "mobile" | "dashboard";

type Project = {
  title: string;
  category: string;
  description: string;
  tags: string[];
  cta: string;
  href: string;
  image: string;
  imageAlt: string;
  previewType: ProjectPreviewType;
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
    previewType: "desktop",
  },
  {
    title: "THUNDERFIX SERVICE WEBSITE",
    category: "SERVICE BUSINESS WEBSITE",
    description:
      "A repair business website built around trust, service clarity, branch discovery, Google/Waze navigation, and WhatsApp-led customer enquiries.",
    tags: ["Service Website", "Branch Flow", "Enquiry System"],
    cta: "View Project",
    href: "https://thunderfix.online",
    image: "/work/thunderfix-mobile.png",
    imageAlt: "Thunderfix mobile service website preview",
    previewType: "mobile",
  },
  {
    title: "ONE MOBILE ROS APP",
    category: "DIGITAL GROWTH SYSTEM",
    description:
      "An internal repair operations system that turns jobs, revenue, technician performance, attribution, and pipeline visibility into a clean owner dashboard.",
    tags: ["Operations Dashboard", "KPI Tracking", "Revenue Visibility"],
    cta: "View System",
    href: "#",
    image: "/work/one-mobile-ros-dashboard.png",
    imageAlt: "One Mobile ROS owner dashboard preview",
    previewType: "dashboard",
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
  sizes?: string;
  className?: string;
  onError?: () => void;
}) => {
  return (
    <img
      src={src}
      alt={alt}
      className={cn(
        className,
        fill && "absolute inset-0 h-full w-full"
      )}
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
  previewType,
}: {
  src: string;
  alt: string;
  previewType: ProjectPreviewType;
}) => {
  const [error, setError] = useState(false);

  const scaleClass =
    previewType === "mobile"
      ? "group-hover:scale-[1.02]"
      : "group-hover:scale-[1.015]";

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
        "object-cover object-top transition-transform duration-700",
        scaleClass
      )}
      onError={() => setError(true)}
    />
  );
};

const ProjectPreview = ({ project }: { project: Project }) => {
  if (project.previewType === "mobile") {
    return (
      <div className="flex h-[420px] items-center justify-center rounded-[28px] bg-[#ebe9e4] p-8">
        <div className="relative aspect-[9/19.5] w-[190px] overflow-hidden rounded-[34px] border-[7px] border-black bg-black shadow-2xl transition-all duration-500 group-hover:shadow-[0_40px_100px_-30px_rgba(0,0,0,0.5)]">
          <ProjectImage
            src={project.image}
            alt={project.imageAlt}
            previewType="mobile"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-[24px] border border-black/10 bg-black shadow-2xl transition-all duration-500 group-hover:shadow-[0_40px_100px_-30px_rgba(0,0,0,0.5)]">
      <div className="flex h-10 items-center gap-2 border-b border-black/10 bg-[#f4f2ed] px-5">
        <div className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#ef6a5b]" />
          <span className="h-3 w-3 rounded-full bg-[#f3bd4f]" />
          <span className="h-3 w-3 rounded-full bg-[#61c454]" />
        </div>
        <div className="mx-auto h-3 w-40 rounded-full bg-white/80" />
      </div>

      <div className="relative h-[360px] w-full overflow-hidden bg-black">
        <ProjectImage
          src={project.image}
          alt={project.imageAlt}
          previewType={project.previewType}
        />
      </div>
    </div>
  );
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
                className="group overflow-hidden rounded-[32px] border border-border/50 bg-surface shadow-[0_24px_80px_-60px_rgba(0,0,0,0.45)] transition-all duration-[400ms] cubic-bezier(0.16,1,0.3,1) hover:-translate-y-[6px] hover:border-primary/20 hover:shadow-[0_34px_90px_-55px_rgba(0,0,0,0.5)] motion-reduce:transform-none motion-reduce:transition-none"
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
                      <ProjectPreview project={project} />
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
