import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ContactSection from '@/components/ContactSection'
import { client } from '../../../sanity/lib/client'
import { urlForImage } from '../../../sanity/lib/image'
import { SITE_URL, OG_DEFAULTS, TWITTER_DEFAULTS } from '@/lib/seo'

const PAGE_URL = `${SITE_URL}/resources`
const TITLE = 'Resources'
const SOCIAL_TITLE = 'Resources · theBOAT'
const DESCRIPTION = 'Helpful resources, guides, and tools from theBOAT.'

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
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'theBOAT Resources' }],
  },
  twitter: {
    ...TWITTER_DEFAULTS,
    card: 'summary_large_image',
    title: SOCIAL_TITLE,
    description: DESCRIPTION,
    images: ['/og.png'],
  },
}

export const revalidate = 60; // Revalidate every 60 seconds


const TYPE_CONFIG: Record<string, { label: string; route: string; color: string }> = {
  blog: { label: 'Blog', route: '/blog', color: 'bg-[#f04b25]/10 text-[#f04b25]' },
  service: { label: 'Service', route: '/services', color: 'bg-[#1a6bf0]/10 text-[#1a6bf0]' },
  resource: { label: 'Resource', route: '/resources', color: 'bg-black/5 text-black/70' },
}

export default async function ResourcesIndexPage() {
  const query = `*[_type in ["resource", "blog", "service"]] | order(publishedAt desc) {
    _id,
    _type,
    title,
    slug,
    metaDescription,
    category,
    mainImage,
    author,
    pillar,
    publishedAt
  }`
  const items = await client.fetch(query)

  return (
    <main className="min-h-screen bg-[#f9f9f9]">
      <Navbar />
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-32 md:py-40">
        <h1 className="text-5xl md:text-7xl font-display uppercase leading-[0.9] tracking-tight text-[#0f0f0f] mb-12">
          Resources
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item: any) => {
            const config = TYPE_CONFIG[item._type] || TYPE_CONFIG.resource
            const href = `${config.route}/${item.slug?.current}`
            const subtitle = item.category || item.pillar || null

            return (
              <a 
                key={item._id} 
                href={href}
                className="block group"
              >
                <div className="p-6 bg-white rounded-2xl border border-black/5 hover:border-black/20 transition-all flex flex-col h-full">
                  {item.mainImage?.asset && (
                    <div className="w-full aspect-[16/9] rounded-xl overflow-hidden mb-6">
                      <img 
                        src={urlForImage(item.mainImage)?.width(600)?.url()} 
                        alt={item.title} 
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="flex flex-col flex-grow">
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${config.color}`}>
                        {config.label}
                      </span>
                      {subtitle && (
                        <span className="inline-block px-3 py-1 bg-black/5 text-xs font-medium rounded-full">
                          {subtitle}
                        </span>
                      )}
                    </div>
                    <h2 className="text-2xl font-display uppercase mb-3 text-[#0f0f0f] group-hover:text-[#f04b25] transition-colors">
                      {item.title}
                    </h2>
                    <p className="text-black/60 mb-4 line-clamp-3">
                      {item.metaDescription}
                    </p>
                    <div className="mt-auto flex items-center gap-3 text-sm text-black/40 font-medium">
                      {item.author && <span>by {item.author}</span>}
                      {item.publishedAt && (
                        <span>{new Date(item.publishedAt).toLocaleDateString()}</span>
                      )}
                    </div>
                  </div>
                </div>
              </a>
            )
          })}
        </div>
      </section>
      <ContactSection />
      <Footer />
    </main>
  )
}
