import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ContactSection from '@/components/ContactSection'
import { client } from '../../../sanity/lib/client'

export const metadata = {
  title: 'Services — theBOAT',
  description: 'Our services: Web development, AI Automation, Agentic Commerce.',
}

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
                <h2 className="text-3xl font-display uppercase mb-4 group-hover:text-[#f04b25] transition-colors">
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
