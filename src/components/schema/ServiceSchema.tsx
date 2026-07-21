interface ServiceSchemaProps {
  name: string;
  description: string;
  url: string;
  areaServed?: string[];
  provider?: {
    name: string;
    url: string;
  };
}

export default function ServiceSchema({
  name,
  description,
  url,
  areaServed = ["Sri Lanka", "United Arab Emirates", "United States", "United Kingdom", "Australia"],
  provider = {
    name: "theBOAT",
    url: "https://theboatgrp.com"
  }
}: ServiceSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": name,
    "description": description,
    "url": url,
    "provider": {
      "@type": "Organization",
      "name": provider.name,
      "url": provider.url
    },
    "areaServed": areaServed.map(area => ({
      "@type": "Place",
      "name": area
    })),
    "serviceType": "Technology Services"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
