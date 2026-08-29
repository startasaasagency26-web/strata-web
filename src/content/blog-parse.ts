import { marked } from "marked";
// Explicit .ts extension: this module is also compiled under tsconfig.node.json
// (via scripts/blog-fs.ts), where NodeNext resolution requires it.
import { SITE_URL, type RouteMetadata } from "../config/routeMetadata.ts";

/**
 * The single markdown/frontmatter parser.
 *
 * Both readers depend on this and nothing else: the browser reader
 * (src/content/blog.ts, via import.meta.glob) and the build reader
 * (scripts/blog-fs.ts, via node:fs). There is deliberately no second
 * implementation — two parsers drift, and a drift here means the site and the
 * prerendered HTML disagree about what an article says.
 */

export const BLOG_CATEGORIES = [
  "Revenue Leaks",
  "AI Workforce",
  "Operations Teardowns",
  "Building Strata Core",
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export interface Article {
  slug: string;
  title: string;
  description: string;
  category: BlogCategory;
  publishedAt: string;
  updatedAt: string;
  ogImage?: string;
  readingTime: number;
  draft: boolean;
  bodyHtml: string;
}

const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;

const unquote = (value: string) => {
  const trimmed = value.trim();
  const quoted = /^"([\s\S]*)"$/.exec(trimmed) ?? /^'([\s\S]*)'$/.exec(trimmed);
  return quoted ? quoted[1] : trimmed;
};

const parseFrontmatter = (block: string) => {
  const fields: Record<string, string> = {};

  for (const line of block.split(/\r?\n/)) {
    if (!line.trim() || line.trimStart().startsWith("#")) continue;
    const separator = line.indexOf(":");
    if (separator === -1) continue;
    fields[line.slice(0, separator).trim()] = unquote(line.slice(separator + 1));
  }

  return fields;
};

/** ~200 words per minute, rounded up, floored at one. */
const estimateReadingTime = (markdown: string) =>
  Math.max(1, Math.round(markdown.trim().split(/\s+/).length / 200));

const isCategory = (value: string): value is BlogCategory =>
  (BLOG_CATEGORIES as readonly string[]).includes(value);

/**
 * `fallbackSlug` comes from the filename, so an article that omits `slug`
 * still resolves to the URL an author would expect from the file they created.
 */
export const parseArticle = (raw: string, fallbackSlug: string): Article => {
  const match = FRONTMATTER.exec(raw);

  if (!match) {
    throw new Error(`${fallbackSlug}.md is missing its frontmatter block.`);
  }

  const fields = parseFrontmatter(match[1]);
  const markdown = raw.slice(match[0].length);

  const required = ["title", "description", "category", "publishedAt"] as const;
  const missing = required.filter((key) => !fields[key]);

  if (missing.length > 0) {
    throw new Error(`${fallbackSlug}.md is missing required frontmatter: ${missing.join(", ")}`);
  }

  if (!isCategory(fields.category)) {
    throw new Error(
      `${fallbackSlug}.md has an unknown category "${fields.category}". Expected one of: ${BLOG_CATEGORIES.join(", ")}`,
    );
  }

  const publishedAt = fields.publishedAt;
  const readingTime = Number(fields.readingTime);

  return {
    slug: fields.slug || fallbackSlug,
    title: fields.title,
    description: fields.description,
    category: fields.category,
    publishedAt,
    updatedAt: fields.updatedAt || publishedAt,
    ogImage: fields.ogImage || undefined,
    readingTime: Number.isFinite(readingTime) && readingTime > 0 ? readingTime : estimateReadingTime(markdown),
    draft: fields.draft === "true",
    bodyHtml: marked.parse(markdown, { async: false, gfm: true, breaks: false }),
  };
};

export const articlePath = (slug: string) => `/blog/${slug}`;

/**
 * Articles reach the prerenderer as ordinary routes, so scripts/prerender.ts
 * needs no article-specific branch — it iterates whatever `routes` contains.
 */
export const articleToRoute = (article: Article): RouteMetadata => {
  const canonical = new URL(articlePath(article.slug), SITE_URL).toString();
  const image = article.ogImage ? new URL(article.ogImage, SITE_URL).toString() : undefined;

  return {
    path: articlePath(article.slug),
    title: article.title,
    description: article.description,
    ogType: "article",
    ogImage: article.ogImage,
    publishedTime: article.publishedAt,
    modifiedTime: article.updatedAt,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: article.title,
      description: article.description,
      datePublished: article.publishedAt,
      dateModified: article.updatedAt,
      mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
      author: { "@type": "Person", name: "Amirul Afiz" },
      publisher: { "@id": `${SITE_URL}/#organization` },
      ...(image ? { image } : {}),
    },
  };
};

/** Drafts never ship. Newest first. */
export const publishedArticles = (articles: Article[]) =>
  articles
    .filter((article) => !article.draft)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

export const formatArticleDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
