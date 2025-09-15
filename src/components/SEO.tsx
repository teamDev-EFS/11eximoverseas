import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

const SEO = ({
  title = "The11EximOverSeas - Premium Agricultural Products Export",
  description = "Connecting India's finest agricultural products to global markets with excellence, sustainability, and unwavering commitment to quality.",
  keywords = "agricultural exports, premium rice, spices, jaggery, global trade, India exports, agricultural products, international trade",
  image = "/og-image.jpg",
  url = "https://the11eximoverseas.com",
  type = "website",
}: SEOProps) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="The11EximOverSeas Ventures" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="The11EximOverSeas" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <link rel="canonical" href={url} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "The11EximOverSeas Ventures",
          url: "https://the11eximoverseas.com",
          logo: "https://the11eximoverseas.com/favicon.svg",
          description: description,
          address: {
            "@type": "PostalAddress",
            streetAddress: "81, Vishwakarma Nagar",
            addressLocality: "Indore",
            addressRegion: "Madhya Pradesh",
            postalCode: "452001",
            addressCountry: "IN",
          },
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+91-9617270009",
            contactType: "customer service",
            email: "the11eximoverseas@gmail.com",
          },
          sameAs: [
            "https://linkedin.com/company/the11eximoverseas",
            "https://twitter.com/the11eximoverseas",
          ],
        })}
      </script>
    </Helmet>
  );
};

export default SEO;
