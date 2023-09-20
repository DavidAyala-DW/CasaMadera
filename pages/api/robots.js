import groq from 'groq'
import { getConfigValue } from '@/lib/config'
import { getClient } from '@/lib/sanity.server'

export default async function handler(req, res) {
  const siteId = getConfigValue('sanitySiteId')
  const baseUrl = await getClient().fetch(
    groq`*[_type == 'siteSettings' && site == $siteId][0].baseUrl`,
    { siteId }
  )

  const robots = `
    User-agent: *
    Disallow:

    Sitemap: ${new URL('sitemap.xml', baseUrl)}
  `

  res.status(200).send(robots)
}
