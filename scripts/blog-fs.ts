import { readdir, readFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { cwd } from "node:process";
import { articleToRoute, parseArticle, publishedArticles, type Article } from "../src/content/blog-parse.ts";

/**
 * Build-side article reader. The browser equivalent is src/content/blog.ts;
 * both delegate every parsing decision to blog-parse.ts so the prerendered HTML
 * and the running site can never disagree about an article.
 */

const articlesDirectory = resolve(cwd(), "content", "blog");

export const loadArticles = async (): Promise<Article[]> => {
  let filenames: string[];

  try {
    filenames = (await readdir(articlesDirectory)).filter((name) => name.endsWith(".md"));
  } catch {
    // No content/blog yet — a site with no articles still has to build.
    return [];
  }

  const parsed = await Promise.all(
    filenames.map(async (name) =>
      parseArticle(await readFile(join(articlesDirectory, name), "utf8"), name.replace(/\.md$/, "")),
    ),
  );

  return publishedArticles(parsed);
};

export const loadArticleRoutes = async () => (await loadArticles()).map(articleToRoute);
