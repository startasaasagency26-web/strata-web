import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { cwd } from "node:process";
import { routes, SITE_URL, type RouteMetadata } from "../src/config/routeMetadata.ts";

type TagIdentity = {
  attribute: string;
  value: string;
};

type ManagedHeadTag = {
  tagName: "link" | "meta" | "script" | "title";
  identity?: TagIdentity;
  markup: string;
};

const distDirectory = resolve(cwd(), "dist");

const escapeHtml = (value: string) => value
  .replaceAll("&", "&amp;")
  .replaceAll('"', "&quot;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;");

const absoluteUrl = (path: string) => new URL(path, SITE_URL).toString();

const metaTag = (attribute: "name" | "property", key: string, content: string): ManagedHeadTag => ({
  tagName: "meta",
  identity: { attribute, value: key },
  markup: `<meta ${attribute}="${key}" content="${escapeHtml(content)}" data-seo-default />`,
});

const routeHeadTags = (route: RouteMetadata): ManagedHeadTag[] => {
  const canonical = absoluteUrl(route.path);
  const tags: ManagedHeadTag[] = [
    {
      tagName: "title",
      markup: `<title>${escapeHtml(route.title)}</title>`,
    },
    metaTag("name", "description", route.description),
    {
      tagName: "link",
      identity: { attribute: "rel", value: "canonical" },
      markup: `<link rel="canonical" href="${canonical}" data-seo-default />`,
    },
    metaTag("property", "og:url", canonical),
    metaTag("property", "og:title", route.title),
    metaTag("property", "og:description", route.description),
    metaTag("name", "twitter:title", route.title),
    metaTag("name", "twitter:description", route.description),
  ];

  if (route.ogType) tags.push(metaTag("property", "og:type", route.ogType));

  if (route.ogImage) {
    const imageUrl = absoluteUrl(route.ogImage);
    tags.push(metaTag("property", "og:image", imageUrl));
    tags.push(metaTag("name", "twitter:image", imageUrl));
  }

  if (route.imageAlt) {
    tags.push(metaTag("property", "og:image:alt", route.imageAlt));
    tags.push(metaTag("name", "twitter:image:alt", route.imageAlt));
  }

  if (route.publishedTime) tags.push(metaTag("property", "article:published_time", route.publishedTime));
  if (route.modifiedTime) tags.push(metaTag("property", "article:modified_time", route.modifiedTime));

  if (route.jsonLd) {
    tags.push({
      tagName: "script",
      identity: { attribute: "data-seo-key", value: "route-json-ld" },
      markup: `<script type="application/ld+json" data-seo-key="route-json-ld" data-seo-default>${JSON.stringify(route.jsonLd).replaceAll("<", "\\u003c")}</script>`,
    });
  }

  return tags;
};

const attributeValue = (tag: string, attribute: string) => {
  const match = tag.match(new RegExp(`\\s${attribute}=(?:"([^"]*)"|'([^']*)')`, "i"));
  return match?.[1] ?? match?.[2];
};

const replaceManagedTag = (html: string, tag: ManagedHeadTag) => {
  const isPaired = tag.tagName === "script" || tag.tagName === "title";
  const expression = isPaired
    ? new RegExp(`<${tag.tagName}\\b[^>]*>[\\s\\S]*?<\\/${tag.tagName}>`, "gi")
    : new RegExp(`<${tag.tagName}\\b[^>]*>`, "gi");
  let replaced = false;

  const updatedHtml = html.replace(expression, (candidate) => {
    const matchesIdentity = !tag.identity
      || attributeValue(candidate, tag.identity.attribute)?.toLowerCase() === tag.identity.value.toLowerCase();

    if (!replaced && matchesIdentity) {
      replaced = true;
      return tag.markup;
    }

    return candidate;
  });

  return replaced ? updatedHtml : updatedHtml.replace("</head>", `    ${tag.markup}\n  </head>`);
};

const renderRouteHtml = (template: string, route: RouteMetadata) => routeHeadTags(route)
  .reduce((html, tag) => replaceManagedTag(html, tag), template);

const outputPathForRoute = (path: string) => path === "/"
  ? join(distDirectory, "index.html")
  : join(distDirectory, path.slice(1), "index.html");

const renderSitemap = () => {
  const urls = routes
    .map((route) => `  <url>\n    <loc>${escapeHtml(absoluteUrl(route.path))}</loc>\n  </url>`)
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
};

const template = await readFile(join(distDirectory, "index.html"), "utf8");

for (const route of routes) {
  const outputPath = outputPathForRoute(route.path);
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, renderRouteHtml(template, route), "utf8");
}

await writeFile(join(distDirectory, "sitemap.xml"), renderSitemap(), "utf8");

console.log(`Prerendered ${routes.length} routes and generated dist/sitemap.xml.`);
