import type { Metadata } from "next";
import { Anton, Poppins } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "theBOAT — Systems-first Automation Studio",
  description:
    "We don't just build websites. We build operational systems that help your business run smoother — from Shopify to custom automations.",
  keywords: ["automation studio", "B2B", "Shopify", "web development", "Colombo"],
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
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
      <body className="min-h-full">{children}</body>
    </html>
  );
}
