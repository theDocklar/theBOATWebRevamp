import { type SchemaTypeDefinition } from 'sanity'
import blog from './blog'
import service from './service'
import resource from './resource'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blog, service, resource],
}
