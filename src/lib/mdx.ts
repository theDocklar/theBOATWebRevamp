import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content');

export interface ServiceFrontmatter {
  title: string;
  metaTitle: string;
  metaDescription: string;
  slug: string;
  pillar: string;
  keyword: string;
  intent: 'transactional' | 'commercial' | 'informational';
  difficulty: number;
  monthlyVolume: string;
  geoTarget?: string;
  publishedAt: string;
  updatedAt?: string;
}

export interface BlogFrontmatter {
  title: string;
  metaTitle: string;
  metaDescription: string;
  slug: string;
  keyword: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  readTime: string;
}

export function getContentBySlug<T>(
  type: 'services' | 'blog',
  slug: string
): { frontmatter: T; content: string } {
  const fullPath = path.join(contentDirectory, type, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    frontmatter: data as T,
    content,
  };
}

export function getAllContentSlugs(type: 'services' | 'blog'): string[] {
  const dir = path.join(contentDirectory, type);
  const files = fs.readdirSync(dir);
  return files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx$/, ''));
}

export function getAllContent<T>(type: 'services' | 'blog'): Array<{
  slug: string;
  frontmatter: T;
  content: string;
}> {
  const slugs = getAllContentSlugs(type);
  return slugs.map((slug) => ({
    slug,
    ...getContentBySlug<T>(type, slug),
  }));
}
