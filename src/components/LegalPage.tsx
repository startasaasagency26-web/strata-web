import type { ReactNode } from "react";
import { Seo } from "./Seo";
import type { RouteMetadata } from "../config/routeMetadata";

type LegalPageProps = {
  meta: RouteMetadata;
  eyebrow: string;
  title: string;
  /** Human-readable date, e.g. "5 October 2026". */
  lastUpdated: string;
  /** ISO date for the <time> element, e.g. "2026-10-05". */
  lastUpdatedIso: string;
  children: ReactNode;
};

/**
 * Shared shell for /privacy and /terms. Uses the blog article column and the
 * .article-body typography (src/index.css) so legal copy reads like the rest
 * of the site without a second type system.
 */
export const LegalPage = ({ meta, eyebrow, title, lastUpdated, lastUpdatedIso, children }: LegalPageProps) => (
  <div className="relative min-h-screen bg-background pb-24 pt-32 md:pb-32 md:pt-40">
    <Seo {...meta} />

    <article className="mx-auto max-w-3xl px-5 sm:px-8 md:px-12">
      <header>
        <p className="mb-4 font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-accent">
          {eyebrow}
        </p>
        <h1 className="text-4xl font-black uppercase leading-[0.95] tracking-[-0.045em] text-primary md:text-5xl">
          {title}
        </h1>
        <p className="mt-6 border-t border-border/50 pt-6 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-muted">
          Last updated: <time dateTime={lastUpdatedIso}>{lastUpdated}</time>
        </p>
      </header>

      <div className="article-body mt-10 break-words">{children}</div>
    </article>
  </div>
);
