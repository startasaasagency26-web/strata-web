import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Seo } from '../components/Seo';
import { WhatsAppChoice } from '../components/WhatsAppChoice';
import { articleBySlug } from '../content/blog';
import { articlePath, articleToRoute, formatArticleDate } from '../content/blog-parse';
import { SITE_URL } from '../config/routeMetadata';

const NotFound = () => (
  <div className="relative min-h-screen bg-background pb-24 pt-32 md:pb-32 md:pt-40">
    <Seo
      path="/blog"
      title="Note not found | Strata"
      description="That note does not exist or has been removed."
    />
    <section className="mx-auto max-w-3xl px-5 sm:px-8 md:px-12">
      <p className="mb-4 font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-accent">404</p>
      <h1 className="text-4xl font-black uppercase leading-[0.95] tracking-[-0.045em] text-primary md:text-5xl">
        That note does not exist
      </h1>
      <p className="mt-6 text-base leading-relaxed text-muted">
        It may have been renamed or removed. Everything currently published is on the index.
      </p>
      <Link
        to="/blog"
        className="mt-10 inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-text transition-colors duration-200 hover:bg-surface3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
      >
        <ArrowLeft size={14} />
        All notes
      </Link>
    </section>
  </div>
);

export const BlogArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? articleBySlug(slug) : undefined;

  if (!article) return <NotFound />;

  const canonical = new URL(articlePath(article.slug), SITE_URL).toString();
  const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(canonical)}`;

  return (
    <div className="relative min-h-screen bg-background pb-24 pt-32 md:pb-32 md:pt-40">
      <Seo {...articleToRoute(article)} />

      <article className="mx-auto max-w-3xl px-5 sm:px-8 md:px-12">
        <Link
          to="/blog"
          className="mb-10 inline-flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted transition-colors duration-200 hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
        >
          <ArrowLeft size={14} />
          All notes
        </Link>

        <header>
          <div className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
            <span className="text-accent">{article.category}</span>
            <time dateTime={article.publishedAt}>{formatArticleDate(article.publishedAt)}</time>
            <span>{article.readingTime} min read</span>
          </div>

          <h1 className="text-4xl font-black uppercase leading-[0.95] tracking-[-0.045em] text-primary md:text-5xl">
            {article.title}
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-text2">{article.description}</p>

          <div className="mt-8 flex items-center gap-4 border-t border-border/50 pt-8">
            <img
              src="/founder.jpg"
              alt=""
              className="h-11 w-11 shrink-0 rounded-full object-cover"
            />
            <div>
              <span className="block text-sm font-bold text-text">Amirul Afiz</span>
              <span className="block font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
                Founder, Strata
              </span>
            </div>
          </div>

          {article.updatedAt !== article.publishedAt && (
            <p className="mt-6 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
              Updated {formatArticleDate(article.updatedAt)}
            </p>
          )}
        </header>

        {/* Markdown rendered at build time by src/content/blog-parse.ts. */}
        <div
          className="article-body mt-12"
          dangerouslySetInnerHTML={{ __html: article.bodyHtml }}
        />

        <footer className="mt-16 rounded-[28px] border border-border/60 bg-surface p-8 md:p-10">
          <h2 className="text-2xl font-bold leading-tight text-text">
            Want this mapped in your own business?
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted md:text-base">
            Bring one recurring workflow. We will walk it end to end and show you where the context,
            ownership and follow-up break down.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <WhatsAppChoice
              message="Hi Strata — I'd like to book a Business Operations Audit."
              source={`blog / ${article.slug}`}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gold px-8 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-void transition-colors duration-200 hover:bg-goldHover active:bg-goldActive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-focusOffset"
            >
              Book an audit
              <ArrowRight size={14} />
            </WhatsAppChoice>

            <a
              href={shareUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-full border border-border px-8 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-text transition-colors duration-200 hover:bg-surface3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
            >
              Share on Facebook
            </a>
          </div>
        </footer>
      </article>
    </div>
  );
};
