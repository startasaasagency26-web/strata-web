export const SITE_URL = "https://www.strataagency.tech";

export type RouteMetadata = {
  path: string;
  title: string;
  description: string;
  ogType?: string;
  ogImage?: string;
  imageAlt?: string;
  publishedTime?: string;
  modifiedTime?: string;
  jsonLd?: Record<string, unknown> | readonly unknown[];
};

export const routeMetadata = {
  home: {
    path: "/",
    title: "Business Operations Audit | Strata Growth Technologies",
    description: "Strata helps established Malaysian businesses find where quotations, orders, service requests and approvals stall, then defines the first controlled workflow worth improving.",
  },
  about: {
    path: "/about",
    title: "About Strata | Business Systems Built Around Real Work",
    description: "Founded in mid-2025, Strata helps established businesses diagnose and improve critical workflows while developing Strata Core as an AI Workforce Management platform.",
  },
  pricing: {
    path: "/pricing",
    title: "AI Workforce Management | Strata Pricing",
    description: "Explore scoped implementation packages for one controlled workflow or a broader AI workforce. Strata Core remains in development and unpriced.",
  },
  blog: {
    path: "/blog",
    title: "Notes on Business Operations | Strata",
    description: "Field notes on recurring workflow problems, what a governed AI workforce should do, and what we are learning while developing Strata Core.",
  },
  buildWithUs: {
    path: "/build-with-us",
    title: "Build With Strata | Opportunities Coming Soon",
    description: "We’re building a space for future collaborators, creatives, developers, strategists, and operators who want to work with Strata. This page is not open yet.",
  },
} as const satisfies Record<string, RouteMetadata>;

export const routes = Object.values(routeMetadata) satisfies readonly RouteMetadata[];
