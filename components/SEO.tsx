import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'project';
  schema?: Record<string, any>;
}

const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  image = 'https://storage.googleapis.com/studiovalkenier/logo.png', 
  url = 'https://studiovalkenier.nl/', 
  type = 'website',
  schema 
}) => {
  const siteTitle = "Studio Valkenier";
  const fullTitle = title === siteTitle ? title : `${title} | ${siteTitle}`;

  // Default Organization Schema
  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": "ArchitectureFirm",
    "name": "Studio Valkenier",
    "url": "https://studiovalkenier.nl",
    "logo": "https://storage.googleapis.com/studiovalkenier/logo.png",
    "image": "https://storage.googleapis.com/studiovalkenier/studio.JPG",
    "description": "Studio Valkenier is een multidisciplinair ontwerpbureau dat zich breed beweegt binnen stedelijk ontwerp, architectuur, interieurontwerp en conceptontwikkeling.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Kastrupstraat 11G",
      "addressLocality": "Amsterdam",
      "postalCode": "1043 CR",
      "addressCountry": "NL"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 52.3888, 
      "longitude": 4.8383 
    },
    "telephone": "+31 20 215 7360",
    "email": "info@studiovalkenier.nl",
    "founder": [
      {
        "@type": "Person",
        "name": "Wouter Valkenier"
      },
      {
        "@type": "Person",
        "name": "Mijke de Kok"
      }
    ]
  };

  const jsonLd = schema ? { ...defaultSchema, ...schema } : defaultSchema;

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
    </Helmet>
  );
};

export default SEO;