import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { articleMeta } from '../src/article-meta.js'

const distDirectory = resolve('dist')
const template = await readFile(resolve(distDirectory, 'index.html'), 'utf8')
const configuredSiteUrl = process.env.SITE_URL?.replace(/\/$/, '') || ''

const escapeHtml = (value) => value
  .replaceAll('&', '&amp;')
  .replaceAll('"', '&quot;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')

const replaceMeta = (html, property, value, attribute = 'property') => {
  const pattern = new RegExp(`(<meta ${attribute}="${property}" content=")[^"]*("\\s*/?>)`)
  return html.replace(pattern, `$1${escapeHtml(value)}$2`)
}

for (const article of articleMeta) {
  const route = `/fieldnotes/${article.slug}/`
  const title = `${article.title} — Criticality Fieldnotes`
  const canonicalUrl = configuredSiteUrl ? `${configuredSiteUrl}${route}` : route
  const socialImage = configuredSiteUrl ? `${configuredSiteUrl}/social-card.png` : '/social-card.png'
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.standfirst,
    datePublished: article.isoDate,
    mainEntityOfPage: canonicalUrl,
    author: { '@type': 'Organization', name: 'Criticality Consulting' },
    publisher: { '@type': 'Organization', name: 'Criticality Consulting' }
  }

  let html = template.replace(/<title>.*?<\/title>/, `<title>${escapeHtml(title)}</title>`)
  html = replaceMeta(html, 'description', article.standfirst, 'name')
  html = replaceMeta(html, 'og:type', 'article')
  html = replaceMeta(html, 'og:title', title)
  html = replaceMeta(html, 'og:description', article.standfirst)
  html = replaceMeta(html, 'og:url', canonicalUrl)
  html = replaceMeta(html, 'og:image', socialImage)
  html = replaceMeta(html, 'twitter:title', title, 'name')
  html = replaceMeta(html, 'twitter:description', article.standfirst, 'name')
  html = replaceMeta(html, 'twitter:image', socialImage, 'name')
  html = html.replace('<script id="structured-data" type="application/ld+json"></script>', `<script id="structured-data" type="application/ld+json">${JSON.stringify(structuredData)}</script>`)

  if (configuredSiteUrl) html = html.replace('</head>', `    <link rel="canonical" href="${canonicalUrl}" />\n  </head>`)

  const routeDirectory = resolve(distDirectory, route.slice(1))
  await mkdir(routeDirectory, { recursive: true })
  await writeFile(resolve(routeDirectory, 'index.html'), html)
}

if (configuredSiteUrl) {
  const urls = [
    { path: '/', lastmod: articleMeta[0].isoDate },
    ...articleMeta.map((article) => ({ path: `/fieldnotes/${article.slug}/`, lastmod: article.isoDate }))
  ]
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(({ path, lastmod }) => `  <url><loc>${configuredSiteUrl}${path}</loc><lastmod>${lastmod}</lastmod></url>`).join('\n')}\n</urlset>\n`
  await writeFile(resolve(distDirectory, 'sitemap.xml'), sitemap)
  await writeFile(resolve(distDirectory, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${configuredSiteUrl}/sitemap.xml\n`)
}
