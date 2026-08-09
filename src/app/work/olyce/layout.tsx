import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Olyce: Streamlined Digital Architecture & Solutions",
  description:
    "Discover how Olyce simplifies digital product development and infrastructure. Get scalable, efficient solutions for your next big project. Learn more today.",
  openGraph: {
    title: "Olyce: Streamlined Digital Architecture & Solutions",
    description:
      "Discover how Olyce simplifies digital product development and infrastructure. Get scalable, efficient solutions for your next big project.",
    type: "article",
    images: ["/olyce/Screenshot 2026-06-06 at 14.12.21.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Olyce: Streamlined Digital Architecture & Solutions",
    description:
      "Discover how Olyce simplifies digital product development and infrastructure. Get scalable, efficient solutions for your next big project.",
    images: ["/olyce/Screenshot 2026-06-06 at 14.12.21.png"],
  },
};

export default function OlyceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
