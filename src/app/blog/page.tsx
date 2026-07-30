import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ContactSection from '@/components/ContactSection'
import { client } from '../../../sanity/lib/client'

export const metadata = {
  title: 'Blog — theBOAT',
  description: 'Insights on automation, web development, and agentic workflows.',
}

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
                <h2 className="text-2xl font-display uppercase mb-3 group-hover:text-[#f04b25] transition-colors">
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
