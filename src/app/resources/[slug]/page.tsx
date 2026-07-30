import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { client } from '../../../../../sanity/lib/client'
import { urlForImage } from '../../../../../sanity/lib/image'
import { PortableText } from '@portabletext/react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ContactSection from '@/components/ContactSection'
import { ArrowUpRight, Download } from 'lucide-react'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const query = `*[_type == "resource" && slug.current == $slug][0]`
  const resource = await client.fetch(query, { slug: params.slug })

  if (!resource) {
    return {
      title: 'Resource Not Found',
    }
  }

  return {
    title: resource.metaTitle || resource.title,
    description: resource.metaDescription,
    openGraph: {
      title: resource.metaTitle || resource.title,
      description: resource.metaDescription,
      type: 'article',
      url: `https://theboatgrp.com/resources/${params.slug}`,
      images: resource.mainImage ? [{ url: urlForImage(resource.mainImage).url() }] : [],
    },
    alternates: {
      canonical: `https://theboatgrp.com/resources/${params.slug}`,
    }
  }
}

export default async function ResourcePage({ params }: { params: { slug: string } }) {
  const query = `*[_type == "resource" && slug.current == $slug][0] {
    ...,
    "fileUrl": file.asset->url
  }`
  const resource = await client.fetch(query, { slug: params.slug })

  if (!resource) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-[#f9f9f9]">
      <Navbar />
      <article className="max-w-4xl mx-auto px-5 md:px-8 py-32 md:py-40">
        <header className="mb-12">
          {resource.category && (
             <div className="mb-6">
                <span className="px-3 py-1 bg-black/5 text-sm font-medium rounded-full">
                  {resource.category}
                </span>
             </div>
          )}
          <h1 className="text-4xl md:text-6xl font-display uppercase leading-[0.9] tracking-tight text-[#0f0f0f] mb-6">
            {resource.title}
          </h1>
        </header>

        {resource.mainImage && (
          <div className="w-full aspect-[21/9] rounded-2xl overflow-hidden mb-12">
            <img 
              src={urlForImage(resource.mainImage).url()} 
              alt={resource.title} 
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:uppercase prose-p:font-body prose-a:text-[#f04b25] mb-12">
          {resource.body && <PortableText value={resource.body} />}
        </div>

        {(resource.fileUrl || resource.link) && (
          <div className="flex flex-wrap gap-4 mt-12 p-6 bg-white border border-black/5 rounded-2xl">
            {resource.fileUrl && (
               <a 
                 href={resource.fileUrl} 
                 target="_blank"
                 rel="noopener noreferrer"
                 className="inline-flex items-center gap-2 px-6 py-3 bg-[#0f0f0f] text-white rounded-full font-medium hover:bg-black/80 transition-colors"
               >
                 <Download size={18} />
                 Download Resource
               </a>
            )}
            {resource.link && (
               <a 
                 href={resource.link} 
                 target="_blank"
                 rel="noopener noreferrer"
                 className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#0f0f0f] border border-black/10 rounded-full font-medium hover:border-black/30 transition-colors"
               >
                 <ArrowUpRight size={18} />
                 Visit Link
               </a>
            )}
          </div>
        )}
      </article>
      <ContactSection />
      <Footer />
    </main>
  )
}
