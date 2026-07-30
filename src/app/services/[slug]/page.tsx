import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { client } from '../../../../sanity/lib/client'
import { urlForImage } from '../../../../sanity/lib/image'
import { PortableText } from '@portabletext/react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ContactSection from '@/components/ContactSection'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const query = `*[_type == "service" && slug.current == $slug][0]`
  const service = await client.fetch(query, { slug: params.slug })

  if (!service) {
    return {
      title: 'Service Not Found',
    }
  }

  return {
    title: service.metaTitle || service.title,
    description: service.metaDescription,
    keywords: service.keyword ? [service.keyword] : undefined,
    openGraph: {
      title: service.metaTitle || service.title,
      description: service.metaDescription,
      type: 'website',
      url: `https://theboatgrp.com/services/${params.slug}`,
    },
    alternates: {
      canonical: `https://theboatgrp.com/services/${params.slug}`,
    }
  }
}

export default async function ServicePage({ params }: { params: { slug: string } }) {
  const query = `*[_type == "service" && slug.current == $slug][0]`
  const service = await client.fetch(query, { slug: params.slug })

  if (!service) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-[#f9f9f9]">
      <Navbar />
      <article className="max-w-4xl mx-auto px-5 md:px-8 py-32 md:py-40">
        <header className="mb-12">
          <div className="flex gap-2 mb-4">
            {service.pillar && (
              <span className="px-3 py-1 bg-black/5 text-sm font-medium rounded-full">
                {service.pillar}
              </span>
            )}
            {service.intent && (
              <span className="px-3 py-1 bg-[#f04b25]/10 text-[#f04b25] text-sm font-medium rounded-full uppercase">
                {service.intent}
              </span>
            )}
          </div>
          
          <h1 className="text-4xl md:text-6xl font-display uppercase leading-[0.9] tracking-tight text-[#0f0f0f] mb-6">
            {service.title}
          </h1>
          
          {service.metaDescription && (
            <p className="text-xl text-black/60 leading-relaxed font-body">
              {service.metaDescription}
            </p>
          )}
        </header>

        <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:uppercase prose-p:font-body prose-a:text-[#f04b25]">
          <PortableText value={service.body} />
        </div>
      </article>
      <ContactSection />
      <Footer />
    </main>
  )
}
