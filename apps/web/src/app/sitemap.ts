import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  // Only the implemented homepage has indexable content in Phase 1.
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (!siteUrl) return [];
  return [{ url: new URL('/', siteUrl).toString(), changeFrequency: 'monthly', priority: 1 }];
}
