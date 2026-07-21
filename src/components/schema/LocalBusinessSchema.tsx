interface LocalBusinessSchemaProps {
  location: "Colombo" | "Dubai";
}

export default function LocalBusinessSchema({ location }: LocalBusinessSchemaProps) {
  const locations = {
    Colombo: {
      addressLocality: "Colombo",
      addressRegion: "Western Province",
      addressCountry: "LK",
      geo: {
        latitude: "6.9271",
        longitude: "79.8612"
      }
    },
    Dubai: {
      addressLocality: "Dubai",
      addressRegion: "Dubai",
      addressCountry: "AE",
      geo: {
        latitude: "25.2048",
        longitude: "55.2708"
      }
    }
  };

  const locationData = locations[location];

  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `theBOAT ${location}`,
    "image": "https://theboatgrp.com/logo.png",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": locationData.addressLocality,
      "addressRegion": locationData.addressRegion,
      "addressCountry": locationData.addressCountry
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": locationData.geo.latitude,
      "longitude": locationData.geo.longitude
    },
    "url": "https://theboatgrp.com",
    "telephone": "+94-XX-XXX-XXXX", // Replace with actual
    "priceRange": "$$$",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
