import groq from 'groq'
import { getConfigValue } from '@/lib/config'
import { getClient } from '@/lib/sanity.server'

export default async function handler(req, res) {
  const siteId = getConfigValue('sanitySiteId')
  const routeDocType = getConfigValue('sanityRouteDocType')
  const locationDocType = getConfigValue('sanityLocationDocType')
  const privateEventsDocType = getConfigValue('sanityPrivateEventsDocType')

  const { baseUrl, pageSlugs, locationSlugs, menuSlugs, privateEventsSlugs } =
    await getClient().fetch(
      groq`
        {
          'baseUrl': *[_type == 'siteSettings' && site == $siteId][0].baseUrl,
          'pageSlugs': *[_type == $routeDocType && !page -> seo.isHidden] {
            'slug': slug.current,
          },
          'locationSlugs': *[_type == $locationDocType && !comming_soon && !locationPageSeo.isHidden] {
            'slug': 'locations/' + slug.current,
          },
          'menuSlugs': *[_type == $locationDocType && !comming_soon && !menuPageSeo.isHidden] {
            'slug': 'menus/' + slug.current,
          },
          'privateEventsSlugs': *[_type == $privateEventsDocType && !seo.isHidden] {
            'slug': 'private-events/' + slug.current,
          },
        }
      `,
      { siteId, routeDocType, locationDocType, privateEventsDocType }
    )

  const urls = [pageSlugs, locationSlugs, menuSlugs, privateEventsSlugs]
    .flat()
    .map(
      ({ slug }) => `
        <url>
          <loc>${new URL(slug, baseUrl)}</loc>
        </url>
      `
    )

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls.join('\n')}
    </urlset>
  `

  res.status(200).send(sitemap)
}
