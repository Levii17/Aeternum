/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://aeternum.dev',
  generateRobotsTxt: true,
  transform: async (config, path) => {
    const dynamics = [
      { loc: '/privacy-policy', priority: 0.5, lastmod: new Date().toISOString() },
      { loc: '/terms', priority: 0.5, lastmod: new Date().toISOString() },
      { loc: '/cookies', priority: 0.5, lastmod: new Date().toISOString() },
    ]

    return {
      ...dynamics.find(dynamic => dynamic.loc === path),
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    }
  },
}