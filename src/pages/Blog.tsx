import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Seo } from '../components/Seo';
import { articles } from '../content/blog';
import { articlePath, formatArticleDate } from '../content/blog-parse';
import { routeMetadata } from '../config/routeMetadata';

export const Blog = () => (
  <div className="relative min-h-screen bg-background pb-24 pt-32 md:pb-32 md:pt-40">
    <Seo {...routeMetadata.blog} />

    <section className="mx-auto max-w-7xl px-5 sm:px-8 md:px-12">
      <div className="mb-16 max-w-3xl">
        <p className="mb-4 font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-accent">
          FIELD NOTES
        </p>
        <h1 className="text-4xl font-black uppercase leading-[0.95] tracking-[-0.045em] text-primary md:text-6xl">
          Notes on revenue operations
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
          Where revenue leaks in small and medium businesses, what an AI workforce actually does, and
          what we are learning while building Strata Core.
        </p>
      </div>

      {articles.length === 0 ? (
        <div className="rounded-[28px] border border-border/60 bg-surface p-8 md:p-12">
          <h2 className="text-2xl font-bold text-text">Nothing published yet</h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted md:text-base">
            The first notes are being written. In the meantime, the fastest way to find out where your
            own revenue is leaking is to walk one workflow through with us.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {articles.map((article) => (
            <article
              key={article.slug}
              className="group flex flex-col rounded-[28px] border border-border/60 bg-surface p-8 transition-colors duration-300 hover:border-gold/40"
            >
              <div className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
                <span className="text-accent">{article.category}</span>
                <span>{formatArticleDate(article.publishedAt)}</span>
                <span>{article.readingTime} min read</span>
              </div>

              <h2 className="text-2xl font-bold leading-tight text-text">
                <Link
                  to={articlePath(article.slug)}
                  className="transition-colors duration-200 hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
                >
                  {article.title}
                </Link>
              </h2>

              <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">
                {article.description}
              </p>

              <Link
                to={articlePath(article.slug)}
                aria-label={`Read ${article.title}`}
                className="mt-8 inline-flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-text transition-colors duration-200 hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
              >
                Read the note
                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </article>
          ))}
        </div>
      )}
    </section>
  </div>
);
