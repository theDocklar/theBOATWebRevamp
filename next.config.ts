import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/services/shopify-sri-lanka", destination: "/shopify-development-sri-lanka", permanent: true },
      { source: "/services/agentic-commerce", destination: "/services/agentic-commerce-shopify", permanent: true },
      { source: "/services/ai-automation-sri-lanka", destination: "/services/ai-automation", permanent: true },
      { source: "/services/ai-agents-sri-lanka", destination: "/services/ai-automation", permanent: true },
      { source: "/services/ai-agents", destination: "/services/ai-automation", permanent: true },
    ];
  },
};

export default nextConfig;
