import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ContactSection from '@/components/ContactSection'
import { ArrowRight, Bot, Camera, Code2, ShoppingCart, Workflow } from 'lucide-react'
import { client } from '../../../sanity/lib/client'
import { SITE_URL, OG_DEFAULTS, TWITTER_DEFAULTS } from '@/lib/seo'

const PAGE_URL = `${SITE_URL}/services`
const TITLE = 'Services'
const SOCIAL_TITLE = 'Services · theBOAT'
const DESCRIPTION =
  "Web development, AI workflow automation, agentic commerce, and creative studio. Fixed scopes, published pricing, and a team that stays after launch."

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
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'theBOAT Services' }],
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

const coreServices = [
  {
    num: '01',
    icon: Code2,
    title: 'Web development',
    href: '/services/web-development-colombo',
    body: "Custom web apps, dashboards, and product builds for founders who need something specific shipped, not a template with a logo swapped in. Fixed 8-week sprints, clickable prototype inside 48 hours, code you own at the end.",
  },
  {
    num: '02',
    icon: Bot,
    title: 'AI workflow automation',
    href: '/services/ai-automation',
    body: "Your team is probably losing 20–30 hours a month to work that could run itself. We find it, wire n8n and Make into your existing stack, and hand over a running system, not a slide deck.",
  },
  {
    num: '03',
    icon: ShoppingCart,
    title: 'Shopify development',
    href: '/shopify-development-sri-lanka',
    body: "Shopify storefronts built for Sri Lankan and international brands, from $3k for a full build to $500/mo ongoing management. Payment gateways, catalogue structure, and mobile-first checkout, scoped before we start.",
  },
  {
    num: '04',
    icon: Workflow,
    title: 'Agentic commerce on Shopify',
    href: '/services/agentic-commerce-shopify',
    body: "For stores already doing real volume: automated pricing, inventory, and campaign management that reacts to your data in real time instead of waiting on a person to check a dashboard.",
  },
  {
    num: '05',
    icon: Camera,
    title: 'Creative studio',
    href: '/frames',
    body: "Product photography, brand identities, lookbooks, and packaging, done by people who understand why it needs to convert, not just look good. The same systems-first precision applied to creative work.",
  },
]

export default async function ServicesIndexPage() {
  const query = `*[_type == "service"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    metaDescription,
    pillar
  }`
  const cmsServices = await client.fetch(query)

  return (
    <main className="min-h-screen bg-[#f9f9f9]">
      <Navbar />
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-32 md:py-40">
        <h1 className="text-5xl md:text-7xl font-display uppercase leading-[0.9] tracking-tight text-[#0f0f0f] mb-8">
          Services
        </h1>
        <p className="text-xl md:text-2xl text-black/60 leading-relaxed max-w-3xl mb-16">
          Five things we&apos;re actually good at: web development, AI workflow automation,
          Shopify builds, agentic commerce, and creative work. Early-stage founders get a
          build partner. Growing teams get their ops fixed. Everything else we leave to
          people who are better at it.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {coreServices.map((service) => {
            const Icon = service.icon
            return (
              <a
                key={service.num}
                href={service.href}
                className="group block bg-white border border-black/[0.08] rounded-2xl p-8 hover:border-black/[0.18] hover:shadow-[0_8px_32px_rgba(14,14,12,0.08)] transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-7">
                  <div className="w-11 h-11 rounded-xl bg-black/[0.05] flex items-center justify-center group-hover:bg-[#f04b25]/10 transition-colors duration-200">
                    <Icon size={18} className="text-black/50 group-hover:text-[#f04b25] transition-colors duration-200" />
                  </div>
                  <span className="text-xs text-black/20 font-mono">{service.num}</span>
                </div>
                <h2 className="text-2xl font-bold text-black mb-3">{service.title}</h2>
                <p className="text-sm text-black/45 leading-relaxed mb-6">{service.body}</p>
                <span className="flex items-center gap-1.5 text-sm text-[#f04b25] group-hover:gap-2.5 transition-all duration-150">
                  Learn more
                  <ArrowRight size={14} />
                </span>
              </a>
            )
          })}
        </div>

        <div className="mt-20 pt-16 border-t border-black/[0.08] grid md:grid-cols-[1fr_2fr] gap-12">
          <div>
            <p className="text-xs font-mono text-black/30 uppercase tracking-widest mb-4">
              How we work
            </p>
          </div>
          <div className="space-y-6 text-lg text-black/70 leading-relaxed max-w-2xl">
            <p>
              Every engagement starts the same way: twelve focused questions, no sales pitch,
              until we can draw the actual system on a whiteboard. From there you get a
              clickable prototype or a workflow map inside 48 hours, a fixed scope, and a
              price before any work begins.
            </p>
            <p>
              We&apos;ve shipped a court-booking platform, a luxury travel site, a
              real-time marketing dashboard, and the automation layer behind several
              growing SMBs. See the full case studies on{' '}
              <a href="/work" className="text-[#f04b25] hover:underline">
                our work page
              </a>
              , or book a free scoping call to talk through what you&apos;re building.
            </p>
          </div>
        </div>

        {cmsServices.length > 0 && (
          <div className="mt-20 pt-16 border-t border-black/[0.08]">
            <p className="text-xs font-mono text-black/30 uppercase tracking-widest mb-8">
              More from the studio
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {cmsServices.map((service: any) => (
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
                    <h3 className="text-3xl font-display uppercase mb-4 text-[#0f0f0f] group-hover:text-[#f04b25] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-black/60 text-lg line-clamp-2">
                      {service.metaDescription}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </section>
      <ContactSection />
      <Footer />
    </main>
  )
}
