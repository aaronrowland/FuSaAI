import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { articleMeta } from '../src/article-meta.js'

const distDirectory = resolve('dist')
const template = await readFile(resolve(distDirectory, 'index.html'), 'utf8')
const configuredSiteUrl = process.env.SITE_URL?.replace(/\/$/, '') || ''
const insightsPath = '/insights/'
const insightsTitle = 'Technical Insights — Criticality Consulting'
const insightsDescription = 'Technical notes on semiconductor functional safety, FMEDA, diagnostic coverage, integration assumptions and applied AI.'

const escapeHtml = (value) => value
  .replaceAll('&', '&amp;')
  .replaceAll('"', '&quot;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')

const replaceMeta = (html, property, value, attribute = 'property') => {
  const pattern = new RegExp(`(<meta ${attribute}="${property}" content=")[^"]*("\\s*/?>)`)
  return html.replace(pattern, `$1${escapeHtml(value)}$2`)
}

const absoluteUrl = (path) => configuredSiteUrl ? `${configuredSiteUrl}${path}` : path

const renderPage = ({ route, title, description, type, structuredData }) => {
  const socialImage = absoluteUrl('/social-card.png')
  let html = template.replace(/<title>.*?<\/title>/, `<title>${escapeHtml(title)}</title>`)
  html = replaceMeta(html, 'description', description, 'name')
  html = replaceMeta(html, 'og:type', type)
  html = replaceMeta(html, 'og:title', title)
  html = replaceMeta(html, 'og:description', description)
  html = replaceMeta(html, 'og:url', absoluteUrl(route))
  html = replaceMeta(html, 'og:image', socialImage)
  html = replaceMeta(html, 'twitter:title', title, 'name')
  html = replaceMeta(html, 'twitter:description', description, 'name')
  html = replaceMeta(html, 'twitter:image', socialImage, 'name')
  html = html.replace('<script id="structured-data" type="application/ld+json"></script>', `<script id="structured-data" type="application/ld+json">${JSON.stringify(structuredData)}</script>`)
  if (configuredSiteUrl) html = html.replace('</head>', `    <link rel="canonical" href="${absoluteUrl(route)}" />\n  </head>`)
  return html
}

const writeRoute = async (route, html) => {
  const routeDirectory = resolve(distDirectory, route.slice(1))
  await mkdir(routeDirectory, { recursive: true })
  await writeFile(resolve(routeDirectory, 'index.html'), html)
}

const insightsStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Criticality Insights',
  description: insightsDescription,
  url: absoluteUrl(insightsPath),
  hasPart: articleMeta.map((article) => ({
    '@type': 'Article',
    headline: article.title,
    url: absoluteUrl(`${insightsPath}${article.slug}/`)
  }))
}

await writeRoute(insightsPath, renderPage({
  route: insightsPath,
  title: insightsTitle,
  description: insightsDescription,
  type: 'website',
  structuredData: insightsStructuredData
}))

for (const article of articleMeta) {
  const route = `${insightsPath}${article.slug}/`
  const legacyRoute = `/fieldnotes/${article.slug}/`
  const title = `${article.title} — Criticality Insights`
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.standfirst,
    datePublished: article.isoDate,
    mainEntityOfPage: absoluteUrl(route),
    author: { '@type': 'Organization', name: 'Criticality Consulting' },
    publisher: { '@type': 'Organization', name: 'Criticality Consulting' }
  }

  await writeRoute(route, renderPage({
    route,
    title,
    description: article.standfirst,
    type: 'article',
    structuredData
  }))

  const redirectTarget = absoluteUrl(route)
  const redirectHtml = `<!doctype html><html lang="en"><head><meta charset="UTF-8"/><meta name="robots" content="noindex"/><meta http-equiv="refresh" content="0; url=${redirectTarget}"/><link rel="canonical" href="${redirectTarget}"/><title>Redirecting to Criticality Insights</title><script>window.location.replace(${JSON.stringify(route)} + window.location.search + window.location.hash)</script></head><body><p>This technical note has moved to <a href="${route}">${escapeHtml(title)}</a>.</p></body></html>`
  await writeRoute(legacyRoute, redirectHtml)
}

if (configuredSiteUrl) {
  const urls = [
    { path: '/', lastmod: articleMeta[0].isoDate },
    { path: insightsPath, lastmod: articleMeta[0].isoDate },
    ...articleMeta.map((article) => ({ path: `${insightsPath}${article.slug}/`, lastmod: article.isoDate }))
  ]
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(({ path, lastmod }) => `  <url><loc>${configuredSiteUrl}${path}</loc><lastmod>${lastmod}</lastmod></url>`).join('\n')}\n</urlset>\n`
  await writeFile(resolve(distDirectory, 'sitemap.xml'), sitemap)
  await writeFile(resolve(distDirectory, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${configuredSiteUrl}/sitemap.xml\n`)
}
