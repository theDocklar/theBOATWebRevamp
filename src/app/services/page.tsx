import { getAllContent, ServiceFrontmatter } from '@/lib/mdx';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services | theBOAT - AI Automation & Web Development',
  description: 'Explore our services: AI agent development, workflow automation, custom web applications, and agentic commerce solutions.',
  alternates: {
    canonical: 'https://theboatgrp.com/services',
  },
};

export default function ServicesPage() {
  const services = getAllContent<ServiceFrontmatter>('services');

  // Group by pillar
  const groupedServices = services.reduce((acc, service) => {
    const pillar = service.frontmatter.pillar;
    if (!acc[pillar]) {
      acc[pillar] = [];
    }
    acc[pillar].push(service);
    return acc;
  }, {} as Record<string, typeof services>);

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <section className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Services</h1>
            <p className="text-xl text-muted-foreground mb-12 max-w-3xl">
              Systems-first automation and web development services built for scale.
            </p>

            {Object.entries(groupedServices).map(([pillar, pillarServices]) => (
              <div key={pillar} className="mb-16">
                <h2 className="text-3xl font-bold mb-6">{pillar}</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {pillarServices.map((service) => (
                    <Link
                      key={service.slug}
                      href={`/services/${service.slug}`}
                      className="block p-6 border rounded-lg hover:border-primary transition-colors"
                    >
                      <h3 className="text-xl font-semibold mb-2">
                        {service.frontmatter.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {service.frontmatter.metaDescription}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{service.frontmatter.intent}</span>
                        {service.frontmatter.geoTarget && (
                          <span>• {service.frontmatter.geoTarget}</span>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
