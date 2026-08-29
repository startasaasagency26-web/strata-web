import { parseArticle, publishedArticles, type Article } from "./blog-parse";

/**
 * Browser-side article reader. Vite inlines the markdown at build time, so no
 * runtime fetch and no filesystem access. Parsing itself lives in blog-parse.ts,
 * shared with the build reader in scripts/blog-fs.ts.
 */

const files = import.meta.glob<string>("/content/blog/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

const slugFromPath = (path: string) => path.split("/").pop()!.replace(/\.md$/, "");

export const articles: Article[] = publishedArticles(
  Object.entries(files).map(([path, raw]) => parseArticle(raw, slugFromPath(path))),
);

export const articleBySlug = (slug: string) => articles.find((article) => article.slug === slug);

export type { Article };
