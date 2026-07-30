import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ContactSection from '@/components/ContactSection'
import { client } from '../../../sanity/lib/client'
import { urlForImage } from '../../../sanity/lib/image'

export const metadata = {
  title: 'Resources — theBOAT',
  description: 'Helpful resources, guides, and tools from theBOAT.',
}

export default async function ResourcesIndexPage() {
  const query = `*[_type == "resource"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    metaDescription,
    category,
    mainImage
  }`
  const resources = await client.fetch(query)

  return (
    <main className="min-h-screen bg-[#f9f9f9]">
      <Navbar />
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-32 md:py-40">
        <h1 className="text-5xl md:text-7xl font-display uppercase leading-[0.9] tracking-tight text-[#0f0f0f] mb-12">
          Resources
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resources.map((resource: any) => (
            <a 
              key={resource._id} 
              href={`/resources/${resource.slug.current}`}
              className="block group"
            >
              <div className="p-6 bg-white rounded-2xl border border-black/5 hover:border-black/20 transition-all flex flex-col h-full">
                {resource.mainImage && (
                  <div className="w-full aspect-[16/9] rounded-xl overflow-hidden mb-6">
                    <img 
                      src={urlForImage(resource.mainImage).url()} 
                      alt={resource.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex flex-col flex-grow">
                  {resource.category && (
                    <span className="inline-block px-3 py-1 bg-black/5 text-xs font-medium rounded-full mb-4 w-fit">
                      {resource.category}
                    </span>
                  )}
                  <h2 className="text-2xl font-display uppercase mb-3 group-hover:text-[#f04b25] transition-colors">
                    {resource.title}
                  </h2>
                  <p className="text-black/60 mb-4 line-clamp-3">
                    {resource.metaDescription}
                  </p>
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
