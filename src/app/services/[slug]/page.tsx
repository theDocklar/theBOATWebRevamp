import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { client } from '../../../../sanity/lib/client'
import { urlForImage } from '../../../../sanity/lib/image'
import { PortableText } from '@portabletext/react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ContactSection from '@/components/ContactSection'
import { portableTextComponents } from '@/components/PortableTextComponents'

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const query = `*[_type == "service" && slug.current == $slug][0]`
  const service = await client.fetch(query, { slug })

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
      url: `https://theboatgrp.com/services/${slug}`,
    },
    alternates: {
      canonical: `https://theboatgrp.com/services/${slug}`,
    }
  }
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const query = `*[_type == "service" && slug.current == $slug][0]`
  const service = await client.fetch(query, { slug })

  if (!service) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-[#f9f9f9]">
      <Navbar />
      <article className="max-w-4xl mx-auto px-5 md:px-8 py-32 md:py-40">
        <header className="mb-12">
          <div className="flex flex-wrap gap-2 mb-6">
            {service.pillar && (
              <span className="px-3.5 py-1.5 bg-black/5 text-sm font-medium rounded-full text-[#2a2a2a]">
                {service.pillar}
              </span>
            )}
            {service.intent && (
              <span className="px-3.5 py-1.5 bg-[#f04b25]/8 text-[#f04b25] text-xs font-semibold rounded-full uppercase tracking-wide">
                {service.intent}
              </span>
            )}
            {service.geoTarget && (
              <span className="px-3.5 py-1.5 bg-black/5 text-xs font-medium rounded-full text-black/50">
                📍 {service.geoTarget}
              </span>
            )}
          </div>
          
          <h1 className="text-4xl md:text-6xl font-display uppercase leading-[0.9] tracking-tight text-[#0f0f0f] mb-6">
            {service.title}
          </h1>
          
          {service.metaDescription && (
            <p className="text-lg text-black/50 leading-relaxed max-w-2xl mb-8">
              {service.metaDescription}
            </p>
          )}

          {(service.keyword || service.monthlyVolume || service.difficulty) && (
            <div className="flex flex-wrap gap-4 text-xs text-black/35 font-medium border-t border-black/6 pt-6">
              {service.keyword && (
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f04b25]" />
                  Keyword: {service.keyword}
                </span>
              )}
              {service.monthlyVolume && (
                <span>Volume: {service.monthlyVolume}/mo</span>
              )}
              {service.difficulty && (
                <span>Difficulty: {service.difficulty}/100</span>
              )}
            </div>
          )}
        </header>

        <div className="article-content">
          <PortableText value={service.body} components={portableTextComponents} />
        </div>
      </article>
      <ContactSection />
      <Footer />
    </main>
  )
}

