import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ContactSection from '@/components/ContactSection'
import { client } from '../../../sanity/lib/client'
import { SITE_URL, OG_DEFAULTS, TWITTER_DEFAULTS } from '@/lib/seo'

const PAGE_URL = `${SITE_URL}/blog`
const TITLE = 'Blog'
const SOCIAL_TITLE = 'Blog · theBOAT'
const DESCRIPTION = 'Insights on automation, web development, and agentic workflows.'

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    ...OG_DEFAULTS,
    type: 'website',
    url: PAGE_URL,
    title: SOCIAL_TITLE,
    description: DESCRIPTION,
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'theBOAT Blog' }],
  },
  twitter: {
    ...TWITTER_DEFAULTS,
    card: 'summary_large_image',
    title: SOCIAL_TITLE,
    description: DESCRIPTION,
    images: ['/og.png'],
  },
}

export const revalidate = 60;


export default async function BlogIndexPage() {
  const query = `*[_type == "blog"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    metaDescription,
    publishedAt,
    author
  }`
  const posts = await client.fetch(query)

  return (
    <main className="min-h-screen bg-[#f9f9f9]">
      <Navbar />
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-32 md:py-40">
        <h1 className="text-5xl md:text-7xl font-display uppercase leading-[0.9] tracking-tight text-[#0f0f0f] mb-12">
          Blog
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post: any) => (
            <a 
              key={post._id} 
              href={`/blog/${post.slug.current}`}
              className="block group"
            >
              <div className="p-6 bg-white rounded-2xl border border-black/5 hover:border-black/20 transition-all">
                <h2 className="text-2xl font-display uppercase mb-3 text-[#0f0f0f] group-hover:text-[#f04b25] transition-colors">
                  {post.title}
                </h2>
                <p className="text-black/60 mb-4 line-clamp-3">
                  {post.metaDescription}
                </p>
                <div className="text-sm text-black/40 font-medium">
                  {post.publishedAt && new Date(post.publishedAt).toLocaleDateString()}
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>
      <ContactSection />
      <Footer />
    </main>
  )
}
