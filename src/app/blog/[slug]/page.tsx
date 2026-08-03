import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { client } from '../../../../sanity/lib/client'
import { urlForImage } from '../../../../sanity/lib/image'
import { PortableText } from '@portabletext/react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ContactSection from '@/components/ContactSection'
import { portableTextComponents } from '@/components/PortableTextComponents'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const query = `*[_type == "blog" && slug.current == $slug][0]`
  const post = await client.fetch(query, { slug })

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
      url: `https://theboatgrp.com/blog/${slug}`,
      images: post.mainImage ? [{ url: urlForImage(post.mainImage).url() }] : [],
    },
    alternates: {
      canonical: `https://theboatgrp.com/blog/${slug}`,
    }
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const query = `*[_type == "blog" && slug.current == $slug][0]`
  const post = await client.fetch(query, { slug })

  if (!post) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-[#f9f9f9]">
      <Navbar />
      <article className="max-w-4xl mx-auto px-5 md:px-8 py-32 md:py-40">
        <header className="mb-12">
          {post.keyword && (
            <span className="inline-block px-3.5 py-1.5 bg-[#f04b25]/8 text-[#f04b25] text-xs font-semibold rounded-full uppercase tracking-wide mb-6">
              {post.keyword}
            </span>
          )}
          <h1 className="text-4xl md:text-6xl font-display uppercase leading-[0.9] tracking-tight text-[#0f0f0f] mb-6">
            {post.title}
          </h1>
          {post.metaDescription && (
            <p className="text-lg text-black/50 leading-relaxed mb-8 max-w-2xl">
              {post.metaDescription}
            </p>
          )}
          <div className="flex items-center gap-3 text-sm text-black/40 font-medium border-t border-black/6 pt-6">
            {post.author && (
              <span className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-[#0f0f0f] text-white flex items-center justify-center text-xs font-bold">
                  {post.author.charAt(0).toUpperCase()}
                </span>
                {post.author}
              </span>
            )}
            {post.author && post.publishedAt && <span className="text-black/20">·</span>}
            {post.publishedAt && <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>}
            {post.readTime && <span className="text-black/20">·</span>}
            {post.readTime && <span>{post.readTime}</span>}
          </div>
        </header>

        {post.mainImage?.asset && (
          <div className="w-full aspect-[21/9] rounded-2xl overflow-hidden mb-12 shadow-lg">
            <img 
              src={urlForImage(post.mainImage)?.width(1400)?.url()} 
              alt={post.title} 
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        )}

        <div className="article-content">
          <PortableText value={post.body} components={portableTextComponents} />
        </div>
      </article>
      <ContactSection />
      <Footer />
    </main>
  )
}

