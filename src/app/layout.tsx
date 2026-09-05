import type { Metadata, Viewport } from "next";
import { Anton, Poppins } from "next/font/google";
import { Toaster } from "sonner";
import { GoogleAnalytics } from "@next/third-parties/google";
import LocalBusinessSchema from "@/components/schema/LocalBusinessSchema";
import { CONTACT } from "@/lib/constants";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0f0f0f",
  colorScheme: "dark",
};

const anton = Anton({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-display",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
});

const SITE_URL = "https://theboatgrp.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "theBOAT · Automation & Web Studio · Colombo, Sri Lanka",
    template: "%s · theBOAT",
  },
  description:
    "theBOAT is a systems-first automation and web studio in Colombo, Sri Lanka: Shopify stores, custom web apps, and AI-driven workflows that run themselves.",
  authors: [{ name: "theBOAT", url: SITE_URL }],
  creator: "theBOAT",
  publisher: "theBOAT",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "theBOAT",
    title: "theBOAT · Automation & Web Studio · Colombo, Sri Lanka",
    description:
      "Systems-first automation and web studio. We build Shopify stores, custom web apps, agentic workflows, and brand identities that help businesses run faster.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "theBOAT · Automation & Web Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "theBOAT · Automation & Web Studio · Colombo, Sri Lanka",
    description:
      "Systems-first automation and web studio. Shopify, custom apps, agentic workflows, brand identities.",
    images: ["/og.png"],
    creator: "@theboatgrp",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/fav.png", type: "image/png", sizes: "48x48" },
      { url: "/logo.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [
      { url: "/fav.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
  },
  category: "technology",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "theBOAT",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
      description:
        "Systems-first automation and web studio based in Colombo, Sri Lanka. Building Shopify stores, custom web apps, agentic workflows, and brand identities.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Colombo",
        addressCountry: "LK",
      },
      telephone: CONTACT.phone,
      areaServed: ["LK", "AE", "GB", "US", "AU"],
      serviceType: [
        "Web Development",
        "Business Automation",
        "Shopify Development",
        "Brand Identity Design",
        "UI/UX Design",
      ],
      sameAs: ["https://www.linkedin.com/company/theboatgrp"],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "theBOAT",
      alternateName: [
        "theBOAT Group",
        "theBOAT Studio",
        "theBOAT Automation & Web Studio",
      ],
      publisher: { "@id": `${SITE_URL}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE_URL}/?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "ItemList",
      "@id": `${SITE_URL}/#sitenavigation`,
      name: "Site Navigation",
      itemListElement: [
        {
          "@type": "SiteNavigationElement",
          position: 1,
          name: "Services",
          description: "Shopify, custom web apps, and autonomous workflows",
          url: `${SITE_URL}/services`,
        },
        {
          "@type": "SiteNavigationElement",
          position: 2,
          name: "Work",
          description: "Client case studies and engineering portfolio",
          url: `${SITE_URL}/work`,
        },
        {
          "@type": "SiteNavigationElement",
          position: 3,
          name: "Stores",
          description: "Live Shopify storefronts and ecommerce architectures",
          url: `${SITE_URL}/stores`,
        },
        {
          "@type": "SiteNavigationElement",
          position: 4,
          name: "Blog",
          description: "Engineering and automation benchmarks",
          url: `${SITE_URL}/blog`,
        },
        {
          "@type": "SiteNavigationElement",
          position: 5,
          name: "Contact",
          description: "Start a project or book an architecture discovery call",
          url: `${SITE_URL}/#contact`,
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${poppins.variable} h-full`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LocalBusinessSchema location="Colombo" />
      </head>
      <body className="min-h-full" suppressHydrationWarning>
        {children}
        <Toaster
          theme="dark"
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#0f0f0f",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#ffffff",
            },
          }}
        />
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
      </body>
    </html>
  );
}
