import { Helmet } from 'react-helmet-async';

const SITE_NAME = 'ExamTools';
const SITE_URL = 'https://examtools.in';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

const DEFAULT_DESCRIPTION =
  'Free online tools for Indian students: resize passport photo to 50KB, compress PDF for SSC forms, merge PDFs, convert images, and calculate CGPA. 100% free, secure, no upload required.';

const DEFAULT_KEYWORDS =
  'resize image to 50kb, compress pdf for ssc form, passport photo resize online, merge pdf free, cgpa to percentage calculator india, resize signature to 20kb, convert text to pdf, free word counter online, remove image background, free student tools online';

/**
 * SEO Component — Renders dynamic <head> tags via react-helmet-async.
 * Use on every page for full SEO coverage.
 *
 * @param {string}   title        - Page-specific title (appended with site name)
 * @param {string}   description  - Page-specific meta description (max ~160 chars)
 * @param {string}   keywords     - Comma-separated target keywords
 * @param {string}   url          - Canonical URL for this page
 * @param {string}   image        - OG image URL (defaults to site-wide OG image)
 * @param {string}   type         - OG type: 'website' | 'article'
 * @param {string}   articleDate  - ISO date string for blog posts
 * @param {boolean}  noIndex      - Set true for 404 / error pages
 * @param {object}   jsonLd       - Optional JSON-LD structured data object
 */
export default function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords = DEFAULT_KEYWORDS,
  url = SITE_URL,
  image = DEFAULT_OG_IMAGE,
  type = 'website',
  articleDate,
  noIndex = false,
  jsonLd,
}) {
  const fullTitle = title
    ? `${title} | ${SITE_NAME}`
    : `${SITE_NAME} | Free Exam Preparation Tools for Students`;

  const canonicalUrl = url.startsWith('http') ? url : `${SITE_URL}${url}`;

  return (
    <Helmet>
      {/* ── Core ──────────────────────────────────────────── */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content={noIndex ? 'noindex, nofollow' : 'index, follow'} />
      <link rel="canonical" href={canonicalUrl} />

      {/* ── Open Graph ────────────────────────────────────── */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={`${title || SITE_NAME} — ExamTools`} />
      <meta property="og:locale" content="en_IN" />
      {articleDate && <meta property="article:published_time" content={articleDate} />}

      {/* ── Twitter Card ──────────────────────────────────── */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@examtoolsin" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* ── JSON-LD Structured Data ───────────────────────── */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
}
