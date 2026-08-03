import { PortableTextComponents } from '@portabletext/react'
import { urlForImage } from '../../sanity/lib/image'

export const portableTextComponents: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="article-h1">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="article-h2">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="article-h3">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="article-h4">{children}</h4>
    ),
    normal: ({ children }) => (
      <p className="article-p">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="article-blockquote">{children}</blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="article-ul">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="article-ol">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="article-li">{children}</li>
    ),
    number: ({ children }) => (
      <li className="article-li">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-[#0f0f0f]">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic text-[#2a2a2a]">{children}</em>
    ),
    code: ({ children }) => (
      <code className="article-inline-code">{children}</code>
    ),
    link: ({ children, value }) => {
      const href = value?.href || ''
      const isExternal = href.startsWith('http')
      return (
        <a
          href={href}
          className="article-link"
          {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {children}
          {isExternal && (
            <svg className="inline-block ml-1 w-3.5 h-3.5 -mt-0.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2h8v8M14 2L6 10" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </a>
      )
    },
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null
      const imgUrl = urlForImage(value)?.width(1200)?.url()
      if (!imgUrl) return null
      return (
        <figure className="article-figure">
          <img
            src={imgUrl}
            alt={value.alt || ''}
            className="article-img"
            loading="lazy"
          />
          {value.alt && (
            <figcaption className="article-figcaption">{value.alt}</figcaption>
          )}
        </figure>
      )
    },
  },
}
