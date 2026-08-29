import { Helmet } from "react-helmet-async";
import { SITE_URL, type RouteMetadata } from "../config/routeMetadata";

type SeoProps = RouteMetadata;

export const Seo = ({
  title,
  description,
  path,
  ogType = "website",
  ogImage,
  imageAlt,
  publishedTime,
  modifiedTime,
  jsonLd,
}: SeoProps) => {
  const canonical = `${SITE_URL}${path}`;
  const absoluteOgImage = ogImage ? new URL(ogImage, SITE_URL).toString() : undefined;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {absoluteOgImage && <meta property="og:image" content={absoluteOgImage} />}
      {imageAlt && <meta property="og:image:alt" content={imageAlt} />}
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {absoluteOgImage && <meta name="twitter:image" content={absoluteOgImage} />}
      {imageAlt && <meta name="twitter:image:alt" content={imageAlt} />}
      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  );
};
