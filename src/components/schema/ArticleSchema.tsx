interface ArticleSchemaProps {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  imageUrl?: string;
}

export default function ArticleSchema({
  title,
  description,
  url,
  publishedAt,
  updatedAt,
  author,
  imageUrl = "https://theboatgrp.com/logo.png"
}: ArticleSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "url": url,
    "datePublished": publishedAt,
    "dateModified": updatedAt || publishedAt,
    "author": {
      "@type": "Organization",
      "name": author,
      "url": "https://theboatgrp.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "theBOAT",
      "url": "https://theboatgrp.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://theboatgrp.com/logo.png"
      }
    },
    "image": imageUrl
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
