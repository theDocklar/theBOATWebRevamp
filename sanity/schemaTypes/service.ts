import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'service',
  title: 'Service Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'metaTitle',
      title: 'Meta Title (SEO)',
      type: 'string',
      description: 'Title used for search engines and browser tabs.',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description (SEO)',
      type: 'text',
      description: 'Description for search engines.',
    }),
    defineField({
      name: 'keyword',
      title: 'Target Keyword (SEO)',
      type: 'string',
    }),
    defineField({
      name: 'pillar',
      title: 'Content Pillar',
      type: 'string',
    }),
    defineField({
      name: 'intent',
      title: 'Search Intent',
      type: 'string',
      options: {
        list: [
          {title: 'Transactional', value: 'transactional'},
          {title: 'Commercial', value: 'commercial'},
          {title: 'Informational', value: 'informational'},
        ],
      },
    }),
    defineField({
      name: 'difficulty',
      title: 'Keyword Difficulty',
      type: 'number',
    }),
    defineField({
      name: 'monthlyVolume',
      title: 'Monthly Search Volume',
      type: 'string',
    }),
    defineField({
      name: 'geoTarget',
      title: 'Geo Target',
      type: 'string',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
    defineField({
      name: 'body',
      title: 'Body Content',
      type: 'array',
      of: [
        {type: 'block'},
        {type: 'image', options: {hotspot: true}},
      ],
    }),
  ],
})
