import { notFound } from 'next/navigation';
import { getContentBySlug, getAllContentSlugs, ServiceFrontmatter } from '@/lib/mdx';
import { ServiceSchema, BreadcrumbSchema, LocalBusinessSchema } from '@/components/schema';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactSection from '@/components/ContactSection';
import { Metadata } from 'next';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const markdownComponents = {
  h1: ({ ...props }) => <h1 className="text-4xl font-bold mt-8 mb-4 text-white" {...props} />,
  h2: ({ ...props }) => <h2 className="text-3xl font-bold mt-8 mb-4 text-white" {...props} />,
  h3: ({ ...props }) => <h3 className="text-2xl font-semibold mt-6 mb-3 text-white" {...props} />,
  h4: ({ ...props }) => <h4 className="text-xl font-semibold mt-4 mb-2 text-white" {...props} />,
  p: ({ ...props }) => <p className="mb-4 leading-relaxed text-lg text-gray-300" {...props} />,
  ul: ({ ...props }) => <ul className="list-disc list-outside ml-6 mb-4 space-y-2 text-gray-300" {...props} />,
  ol: ({ ...props }) => <ol className="list-decimal list-outside ml-6 mb-4 space-y-2 text-gray-300" {...props} />,
  li: ({ ...props }) => <li className="text-lg text-gray-300" {...props} />,
  a: ({ ...props }) => <a className="text-[#f04b25] hover:underline font-medium" {...props} />,
  blockquote: ({ ...props}) => (
    <blockquote className="border-l-4 border-[#f04b25] pl-4 italic my-4 text-gray-400" {...props} />
  ),
  table: ({ ...props }) => (
    <div className="markdown-table-wrapper">
      <table className="markdown-table" {...props} />
    </div>
  ),
  thead: ({ ...props }) => <thead {...props} />,
  tbody: ({ ...props }) => <tbody {...props} />,
  tr: ({ ...props }) => <tr {...props} />,
  th: ({ ...props }) => <th {...props} />,
  td: ({ ...props }) => <td {...props} />,
  code: ({ inline, className, children, ...props }: any) => {
    const isInline = inline;
    return isInline ? (
      <code className="markdown-inline-code" {...props}>
        {children}
      </code>
    ) : (
      <code {...props}>
        {children}
      </code>
    );
  },
  pre: ({ children, ...props }: any) => (
    <pre className="markdown-pre" {...props}>
      {children}
    </pre>
  ),
  strong: ({ ...props }) => <strong className="font-bold text-white" {...props} />,
  em: ({ ...props }) => <em className="italic text-gray-300" {...props} />,
  hr: ({ ...props }) => <hr className="my-8 border-[#333]" {...props} />,
};

export async function generateStaticParams() {
  const slugs = getAllContentSlugs('services');
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  try {
    const { slug } = await params;
    const { frontmatter } = getContentBySlug<ServiceFrontmatter>('services', slug);
    
    return {
      title: frontmatter.metaTitle,
      description: frontmatter.metaDescription,
      openGraph: {
        title: frontmatter.metaTitle,
        description: frontmatter.metaDescription,
        url: `https://theboatgrp.com/services/${slug}`,
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: frontmatter.metaTitle,
        description: frontmatter.metaDescription,
      },
      alternates: {
        canonical: `https://theboatgrp.com/services/${slug}`,
      },
    };
  } catch {
    return {
      title: 'Service Not Found',
    };
  }
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  let frontmatter: ServiceFrontmatter;
  let content: string;

  try {
    const result = getContentBySlug<ServiceFrontmatter>('services', slug);
    frontmatter = result.frontmatter;
    content = result.content;
  } catch {
    notFound();
  }

  const breadcrumbs = [
    { name: 'Home', url: 'https://theboatgrp.com' },
    { name: 'Services', url: 'https://theboatgrp.com/services' },
    { name: frontmatter.title, url: `https://theboatgrp.com/services/${slug}` },
  ];

  return (
    <>
      <ServiceSchema
        name={frontmatter.title}
        description={frontmatter.metaDescription}
        url={`https://theboatgrp.com/services/${slug}`}
        areaServed={frontmatter.geoTarget ? [frontmatter.geoTarget] : undefined}
      />
      <BreadcrumbSchema items={breadcrumbs} />
      {frontmatter.geoTarget && (frontmatter.geoTarget === "Sri Lanka" || frontmatter.geoTarget === "UAE") && (
        <LocalBusinessSchema location={frontmatter.geoTarget === "Sri Lanka" ? "Colombo" : "Dubai"} />
      )}

      <Navbar />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="text-sm text-muted-foreground mb-2">
                {frontmatter.pillar} {frontmatter.geoTarget && `• ${frontmatter.geoTarget}`}
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                {frontmatter.title}
              </h1>
            </div>
          </div>
        </section>

        {/* Markdown Content */}
        <section className="container mx-auto px-4 pb-16">
          <div className="max-w-4xl mx-auto">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={markdownComponents}
            >
              {content}
            </ReactMarkdown>
          </div>
        </section>

        {/* Contact CTA */}
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
