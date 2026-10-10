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
    description: "Strata helps growing businesses find where quotations, orders, service requests and approvals stall, then defines the first controlled workflow worth improving.",
  },
  about: {
    path: "/about",
    title: "About Strata | Business Systems Built Around Real Work",
    description: "Founded in mid-2025, Strata helps growing businesses diagnose and improve critical workflows while developing Strata Core as an AI Workforce Management platform.",
  },
  pricing: {
    path: "/pricing",
    title: "Workflow Implementation Pricing | Strata",
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
  kit: {
    path: "/kit",
    title: "Solo Ops Kit: Find Where Work Disappears | Strata",
    description: "A 27-page fillable PDF for owner-operators. Map one workflow, find the step where work disappears, and decide where AI should and shouldn't run. US$99.",
  },
  websites: {
    path: "/websites",
    title: "Websites That Bring Enquiries You Follow Up | Strata",
    description: "Strata designs, builds and sets up business websites, then routes every enquiry to your WhatsApp or email. Quoted per project after a short call.",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${SITE_URL}/websites#service`,
      name: "Website design, build and setup",
      serviceType: "Website design and development",
      url: `${SITE_URL}/websites`,
      description: "Strata designs, builds and sets up business websites, then routes every enquiry to your WhatsApp or email. Quoted per project after a short call.",
      provider: { "@id": `${SITE_URL}/#organization` },
    },
  },
  privacy: {
    path: "/privacy",
    title: "Privacy Policy | Strata Growth Technologies",
    description: "What Strata Growth Technologies collects when you visit the site, contact us or buy The Solo Ops Kit, why, who processes it, and the rights you have over it.",
  },
  terms: {
    path: "/terms",
    title: "Terms of Use | Strata Growth Technologies",
    description: "The terms for using the Strata website, working with Strata on a done-for-you engagement, and buying The Solo Ops Kit, including the 14-day refund.",
  },
} as const satisfies Record<string, RouteMetadata>;

export const routes = Object.values(routeMetadata) satisfies readonly RouteMetadata[];
