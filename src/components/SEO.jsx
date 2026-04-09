import { Helmet } from 'react-helmet-async';

/**
 * SEO component for per-page meta tags.
 * @param {object} props
 * @param {string} props.title - Page title
 * @param {string} props.description - Meta description
 * @param {string} props.path - URL path (e.g., /perda-poupanca)
 * @param {string} [props.type] - Open Graph type
 */
export default function SEO({ title, description, path = '', type = 'website' }) {
  const baseUrl = 'https://quantoperdi.netlify.app';
  const fullUrl = `${baseUrl}${path}`;
  const siteName = 'QuantoPerdi';
  const fullTitle = `${title} | ${siteName}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="pt_BR" />
      <meta property="og:image" content={`${baseUrl}/cover.png`} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${baseUrl}/cover.png`} />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": siteName,
          "url": fullUrl,
          "description": description,
          "applicationCategory": "FinanceApplication",
          "operatingSystem": "All",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "BRL"
          }
        })}
      </script>
    </Helmet>
  );
}
