const fs = require('fs')

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  transform: async (config, path) => {
    const noIndexRegex = /<meta.*noindex/gim
    const basePath = '.next/server/pages'
    const filePath = `${basePath + path}.html`

    if (fs.existsSync(filePath)) {
      try {
        const data = await fs.promises.readFile(filePath, 'utf8')

        if (data.match(noIndexRegex)) {
          console.log('ignored file:', filePath)

          return null
        }
      } catch (error) {
        console.error('err', error)
      }
    }

    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs || [],
    }
  },
}
