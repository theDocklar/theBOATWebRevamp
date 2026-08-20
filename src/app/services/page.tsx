import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ContactSection from '@/components/ContactSection'
import { client } from '../../../sanity/lib/client'
import { SITE_URL, OG_DEFAULTS, TWITTER_DEFAULTS } from '@/lib/seo'

const PAGE_URL = `${SITE_URL}/services`
const TITLE = 'Services — theBOAT'
const DESCRIPTION = 'Our services: Web development, AI Automation, Agentic Commerce.'

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    ...OG_DEFAULTS,
    type: 'website',
    url: PAGE_URL,
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'theBOAT Services' }],
  },
  twitter: {
    ...TWITTER_DEFAULTS,
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/og.png'],
  },
}

export const revalidate = 60;


export default async function ServicesIndexPage() {
  const query = `*[_type == "service"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    metaDescription,
    pillar
  }`
  const services = await client.fetch(query)

  return (
    <main className="min-h-screen bg-[#f9f9f9]">
      <Navbar />
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-32 md:py-40">
        <h1 className="text-5xl md:text-7xl font-display uppercase leading-[0.9] tracking-tight text-[#0f0f0f] mb-12">
          Services
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service: any) => (
            <a 
              key={service._id} 
              href={`/services/${service.slug.current}`}
              className="block group"
            >
              <div className="p-8 bg-white rounded-3xl border border-black/5 hover:border-black/20 transition-all">
                {service.pillar && (
                  <span className="inline-block px-3 py-1 bg-black/5 text-sm font-medium rounded-full mb-4">
                    {service.pillar}
                  </span>
                )}
                <h2 className="text-3xl font-display uppercase mb-4 text-[#0f0f0f] group-hover:text-[#f04b25] transition-colors">
                  {service.title}
                </h2>
                <p className="text-black/60 text-lg line-clamp-2">
                  {service.metaDescription}
                </p>
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
