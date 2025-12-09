import Head from 'next/head';

export default function SEO({
  title = "SPEED Trust - Environmental Sustainability & Youth Empowerment",
  description = "Southern Pothigai Environmental and Educational Development Trust promotes environmental protection, rural youth skill development, and sustainable agriculture across South India.",
  keywords = "environmental trust, sustainability, youth empowerment, Tamil Nadu, tree plantation, water body restoration, sustainable agriculture, rural development, SPEED Trust",
  ogImage = "/images/logo.png",
  ogType = "website",
  canonical,
  noindex = false,
}) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://speedtrust.org.in';
  const fullUrl = canonical ? `${siteUrl}${canonical}` : siteUrl;
  const fullImageUrl = ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {noindex && <meta name="robots" content="noindex,nofollow" />}

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="SPEED Trust" />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />

      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />

      {/* Favicon */}
      <link rel="icon" href="/images/logo.png" />
      <link rel="apple-touch-icon" href="/images/logo.png" />

      {/* Viewport */}
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />

      {/* Theme color */}
      <meta name="theme-color" content="#1c4a2b" />
    </Head>
  );
}
