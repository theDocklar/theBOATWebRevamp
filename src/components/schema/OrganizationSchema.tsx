export default function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "theBOAT",
    "legalName": "theBOAT Group",
    "url": "https://theboatgrp.com",
    "logo": "https://theboatgrp.com/logo.png",
    "foundingDate": "2020",
    "description": "Systems-first automation and web studio building AI agents, workflow automation, custom web applications, and premium commerce experiences.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Colombo",
      "addressCountry": "LK"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Business Inquiries",
      "email": "hello@theboatgrp.com"
    },
    "areaServed": [
      {
        "@type": "Country",
        "name": "Sri Lanka"
      },
      {
        "@type": "Country",
        "name": "United Arab Emirates"
      },
      {
        "@type": "Country",
        "name": "United States"
      },
      {
        "@type": "Country",
        "name": "United Kingdom"
      },
      {
        "@type": "Country",
        "name": "Australia"
      }
    ],
    "sameAs": [
      "https://www.linkedin.com/company/theboatgrp"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
