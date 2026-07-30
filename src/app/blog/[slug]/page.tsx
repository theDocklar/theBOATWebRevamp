import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { client } from '../../../../sanity/lib/client'
import { urlForImage } from '../../../../sanity/lib/image'
import { PortableText } from '@portabletext/react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ContactSection from '@/components/ContactSection'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const query = `*[_type == "blog" && slug.current == $slug][0]`
  const post = await client.fetch(query, { slug: params.slug })

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription,
    keywords: post.keyword ? [post.keyword] : undefined,
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription,
      type: 'article',
      url: `https://theboatgrp.com/blog/${params.slug}`,
      images: post.mainImage ? [{ url: urlForImage(post.mainImage).url() }] : [],
    },
    alternates: {
      canonical: `https://theboatgrp.com/blog/${params.slug}`,
    }
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const query = `*[_type == "blog" && slug.current == $slug][0]`
  const post = await client.fetch(query, { slug: params.slug })

  if (!post) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-[#f9f9f9]">
      <Navbar />
      <article className="max-w-4xl mx-auto px-5 md:px-8 py-32 md:py-40">
        <header className="mb-12">
          <h1 className="text-4xl md:text-6xl font-display uppercase leading-[0.9] tracking-tight text-[#0f0f0f] mb-6">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-black/60 font-medium">
            {post.author && <span>By {post.author}</span>}
            {post.author && post.publishedAt && <span>•</span>}
            {post.publishedAt && <span>{new Date(post.publishedAt).toLocaleDateString()}</span>}
            {post.readTime && <span>•</span>}
            {post.readTime && <span>{post.readTime}</span>}
          </div>
        </header>

        {post.mainImage && (
          <div className="w-full aspect-[21/9] rounded-2xl overflow-hidden mb-12">
            <img 
              src={urlForImage(post.mainImage).url()} 
              alt={post.title} 
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:uppercase prose-p:font-body prose-a:text-[#f04b25]">
          <PortableText value={post.body} />
        </div>
      </article>
      <ContactSection />
      <Footer />
    </main>
  )
}
