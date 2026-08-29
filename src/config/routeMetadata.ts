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
    title: "Strata Core | One Controlled Business Flow",
    description: "Strata Core is being designed to connect the facts, rules, owners and approvals behind everyday operations—so teams can move from customer conversation to revenue without losing context.",
  },
  about: {
    path: "/about",
    title: "About Strata | Business Systems Built Around Real Work",
    description: "Founded in mid-2025, Strata delivers Revenue Systems engagements for growing businesses today while shaping the in-development Strata Core platform with design partners.",
  },
  pricing: {
    path: "/pricing",
    title: "AI Workforce Management | Strata Pricing",
    description: "Strata audits where work repeats, designs the handoffs, deploys and governs the AI Employees that own it, and reports on the result. Pricing moves with customer value, volume, complexity, locations and integrations.",
  },
  buildWithUs: {
    path: "/build-with-us",
    title: "Build With Strata | Opportunities Coming Soon",
    description: "We’re building a space for future collaborators, creatives, developers, strategists, and operators who want to work with Strata. This page is not open yet.",
  },
} as const satisfies Record<string, RouteMetadata>;

export const routes = Object.values(routeMetadata) satisfies readonly RouteMetadata[];
